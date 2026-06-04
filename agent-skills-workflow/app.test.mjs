import test from "node:test";
import assert from "node:assert/strict";

import * as app from "./app.mjs";

const { computeSummary, filterStages, getConnections, getStageById, workflowStages } = app;

test("workflow has the six lifecycle stages in order", () => {
  assert.deepEqual(
    workflowStages.map((stage) => stage.phase),
    ["DEFINE", "PLAN", "BUILD", "VERIFY", "REVIEW", "SIMPLIFY", "SHIP"]
  );
});

test("search finds skills, commands, and phase text", () => {
  assert.equal(filterStages("review").some((stage) => stage.id === "review"), true);
  assert.equal(filterStages("/ship").map((stage) => stage.id).join(","), "ship");
  assert.equal(filterStages("browser").some((stage) => stage.id === "verify"), true);
  assert.equal(filterStages("security-auditor").some((stage) => stage.id === "ship"), true);
});

test("command mode narrows results to commands and skill names", () => {
  assert.deepEqual(
    filterStages("debugging", "commands").map((stage) => stage.id),
    ["verify"]
  );
  assert.deepEqual(
    filterStages("GO", "commands").map((stage) => stage.id),
    []
  );
});

test("selected stage connections include adjacent lifecycle links", () => {
  assert.deepEqual(getConnections("build"), [
    ["plan", "build"],
    ["build", "verify"]
  ]);
});

test("summary counts unique commands and skills", () => {
  const summary = computeSummary();
  assert.equal(summary.commands, 7);
  assert.equal(summary.skills >= 15, true);
});

test("unknown stage id returns null", () => {
  assert.equal(getStageById("missing"), null);
});

test("flow node text keeps title, command, and card edges separated", () => {
  assert.equal(typeof app.getFlowNodeLayout, "function");

  const layout = app.getFlowNodeLayout();
  for (const stage of workflowStages) {
    const lastTitleBaseline = layout.titleY + layout.titleLineGap * (stage.nodeTitle.length - 1);
    const titleCommandGap = layout.commandY - lastTitleBaseline;
    const bottomGap = layout.height - layout.commandY;

    assert.ok(
      titleCommandGap >= layout.minTitleCommandGap,
      `${stage.id} title-to-command gap ${titleCommandGap}px is too tight`
    );
    assert.ok(
      bottomGap >= layout.minBottomGap,
      `${stage.id} command bottom gap ${bottomGap}px is too tight`
    );
  }
});
