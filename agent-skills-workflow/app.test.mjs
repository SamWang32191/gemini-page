import test from "node:test";
import assert from "node:assert/strict";

import * as app from "./app.mjs";

const { computeSummary, filterStages, getConnections, getStageById, workflowStages } = app;
const lifecycleConnections = [
  ["define", "plan"],
  ["plan", "build"],
  ["build", "verify"],
  ["verify", "review"],
  ["review", "simplify"],
  ["simplify", "ship"]
];

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

test("flow map viewport leaves horizontal breathing room around every node", () => {
  assert.equal(typeof app.getFlowMapViewport, "function");

  const layout = app.getFlowNodeLayout();
  const viewport = app.getFlowMapViewport();
  const minLeft = Math.min(...workflowStages.map((stage) => stage.x));
  const maxRight = Math.max(...workflowStages.map((stage) => stage.x + layout.width));

  assert.ok(minLeft >= viewport.minHorizontalGap, `left gap ${minLeft}px is too tight`);
  assert.ok(
    viewport.width - maxRight >= viewport.minHorizontalGap,
    `right gap ${viewport.width - maxRight}px is too tight`
  );
});

test("compact flow map fits narrow pages without horizontal clipping", () => {
  assert.equal(typeof app.getFlowMapMode, "function");
  assert.equal(typeof app.getFlowStagePosition, "function");

  const mode = app.getFlowMapMode(716);
  const layout = app.getFlowNodeLayout(mode);
  const viewport = app.getFlowMapViewport(mode);

  assert.equal(mode, "compact");
  assert.ok(viewport.width <= 720, `compact viewport ${viewport.width}px is wider than the page`);

  for (const stage of workflowStages) {
    const position = app.getFlowStagePosition(stage, mode);
    assert.ok(position.x >= viewport.minHorizontalGap, `${stage.id} clips on the left`);
    assert.ok(
      position.x + layout.width <= viewport.width - viewport.minHorizontalGap,
      `${stage.id} clips on the right`
    );
  }
});

test("compact flow map connection curves stay inside the viewport", () => {
  assert.equal(typeof app.getFlowConnectionPath, "function");

  const mode = "compact";
  const viewport = app.getFlowMapViewport(mode);
  for (const [from, to] of lifecycleConnections) {
    const source = getStageById(from);
    const target = getStageById(to);
    const path = app.getFlowConnectionPath(source, target, mode);
    const values = path.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const xValues = values.filter((_, index) => index % 2 === 0);

    for (const x of xValues) {
      assert.ok(x >= 0, `${from}->${to} connection leaves compact viewport on the left`);
      assert.ok(x <= viewport.width, `${from}->${to} connection leaves compact viewport on the right`);
    }
  }
});
