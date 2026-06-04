export const workflowStages = [
  {
    id: "define",
    phase: "DEFINE",
    title: "Spec before code",
    nodeTitle: ["Spec", "before code"],
    command: "/spec",
    color: "#0f766e",
    x: 70,
    y: 70,
    skills: ["interview-me", "idea-refine", "spec-driven-development"],
    output: "SPEC.md",
    body:
      "先釐清目標、使用者、範圍、驗收條件與邊界。對 agent 來說，這一步的價值是把模糊需求變成可檢查的工作契約。",
    behavior: [
      "問清楚目標、核心功能與驗收條件",
      "明確列出 always / ask first / never 的邊界",
      "把規格保存成 SPEC.md，得到確認後才進下一步"
    ]
  },
  {
    id: "plan",
    phase: "PLAN",
    title: "Small verifiable tasks",
    nodeTitle: ["Small", "tasks"],
    command: "/plan",
    color: "#2563eb",
    x: 330,
    y: 70,
    skills: ["planning-and-task-breakdown"],
    output: "tasks/plan.md, tasks/todo.md",
    body:
      "把規格拆成可驗證的垂直切片。每個 task 都要有依賴順序、驗收條件與驗證方法，避免一口氣做太大。",
    behavior: [
      "讀 SPEC.md 與相關程式碼",
      "建立 dependency graph",
      "用垂直切片拆 task，留下人工 review checkpoint"
    ]
  },
  {
    id: "build",
    phase: "BUILD",
    title: "One slice at a time",
    nodeTitle: ["One slice", "at a time"],
    command: "/build",
    color: "#b45309",
    x: 590,
    y: 70,
    skills: ["incremental-implementation", "test-driven-development"],
    output: "working code + focused commits",
    body:
      "每次只做下一個 pending task。先寫會失敗的測試，再用最小實作讓測試通過，跑 build 與回歸檢查後才移到下一片。",
    behavior: [
      "讀下一個 task 的 acceptance criteria",
      "RED → GREEN → REFACTOR",
      "每個 slice 維持可建置、可測試、可回退"
    ]
  },
  {
    id: "verify",
    phase: "VERIFY",
    title: "Tests are proof",
    nodeTitle: ["Tests", "are proof"],
    command: "/test",
    color: "#15803d",
    x: 650,
    y: 245,
    skills: ["test-driven-development", "debugging-and-error-recovery", "browser-testing-with-devtools"],
    output: "passing tests + runtime evidence",
    body:
      "不是看起來對就算完成。bug 要先用測試重現，瀏覽器功能要用實際 runtime 資料確認 DOM、console、network 與互動。",
    behavior: [
      "新功能先寫期望行為測試",
      "bug fix 先 reproduce，再 fix，再 guard",
      "瀏覽器相關問題用真實頁面驗證"
    ]
  },
  {
    id: "review",
    phase: "REVIEW",
    title: "Five-axis review",
    nodeTitle: ["Five-axis", "review"],
    command: "/review",
    color: "#be123c",
    x: 430,
    y: 245,
    skills: ["code-review-and-quality", "code-simplification", "security-and-hardening", "performance-optimization"],
    output: "Critical / Important / Suggestion findings",
    body:
      "合併前做五軸檢查：正確性、可讀性、架構、安全、效能。review 要用具體 file:line 與修正建議，而不是泛泛而談。",
    behavior: [
      "用正確性、可讀性、架構、安全、效能五軸檢查",
      "必要時套用 security 或 performance skill",
      "把 finding 分成 Critical、Important、Suggestion"
    ]
  },
  {
    id: "simplify",
    phase: "SIMPLIFY",
    title: "Clarity over cleverness",
    nodeTitle: ["Clarity", "over clever"],
    command: "/code-simplify",
    color: "#9333ea",
    x: 230,
    y: 245,
    skills: ["code-simplification", "code-review-and-quality"],
    output: "simpler code with unchanged behavior",
    body:
      "行為已被測試保護後，再把不必要的複雜度降下來。這一步不是順手重構，而是針對近期變更做可驗證的簡化。",
    behavior: [
      "先理解目的、caller、edge cases 與測試覆蓋",
      "用 guard clauses、拆分責任、命名改善等方式降低複雜度",
      "每次簡化後重新跑測試，確認行為沒有改變"
    ]
  },
  {
    id: "ship",
    phase: "SHIP",
    title: "GO / NO-GO",
    nodeTitle: ["GO", "NO-GO"],
    command: "/ship",
    color: "#4f46e5",
    x: 70,
    y: 245,
    skills: ["shipping-and-launch", "git-workflow-and-versioning", "ci-cd-and-automation"],
    personas: ["code-reviewer", "security-auditor", "test-engineer"],
    output: "ship decision + rollback plan",
    body:
      "/ship 是唯一被這個 repo 認可的多 persona orchestration：三個 persona 平行產出報告，主 agent 合併成 GO / NO-GO 與 rollback plan。",
    behavior: [
      "平行啟動 code-reviewer、security-auditor、test-engineer",
      "主 agent 合併 blocker、風險、測試缺口與基礎設施檢查",
      "沒有 rollback plan 不給 GO"
    ]
  }
];

export const repoTotals = {
  skills: 24,
  commands: 7,
  personas: 3
};

export const personas = [
  {
    name: "code-reviewer",
    color: "#be123c",
    focus: "五軸 code review，特別看 correctness、architecture 與 maintainability。"
  },
  {
    name: "security-auditor",
    color: "#b45309",
    focus: "威脅模型、OWASP、secrets、auth/authz 與 dependency 風險。"
  },
  {
    name: "test-engineer",
    color: "#2563eb",
    focus: "測試策略、coverage gaps、happy path、edge case 與 regression proof。"
  }
];

const connections = [
  ["define", "plan"],
  ["plan", "build"],
  ["build", "verify"],
  ["verify", "review"],
  ["review", "simplify"],
  ["simplify", "ship"]
];

let selectedId = "define";
let displayMode = "workflow";

export function getStageById(id) {
  return workflowStages.find((stage) => stage.id === id) ?? null;
}

export function getConnections(stageId) {
  return connections.filter(([from, to]) => from === stageId || to === stageId);
}

export function filterStages(query, mode = "workflow") {
  const normalized = query.trim().toLowerCase();
  if (!normalized && mode === "workflow") return workflowStages;

  return workflowStages.filter((stage) => {
    const searchable = [
      stage.phase,
      stage.title,
      stage.command,
      stage.output,
      stage.body,
      ...stage.skills,
      ...(stage.personas ?? []),
      ...stage.behavior
    ]
      .join(" ")
      .toLowerCase();

    return mode === "commands"
      ? stage.command.toLowerCase().includes(normalized) || stage.skills.join(" ").toLowerCase().includes(normalized)
      : searchable.includes(normalized);
  });
}

export function computeSummary(stages = workflowStages) {
  return {
    skills: new Set(stages.flatMap((stage) => stage.skills)).size,
    commands: new Set(stages.map((stage) => stage.command)).size,
    outputs: new Set(stages.map((stage) => stage.output)).size
  };
}

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function renderPhaseNav(stages) {
  const nav = document.querySelector("#phaseNav");
  nav.replaceChildren(
    ...stages.map((stage) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `phase-button${stage.id === selectedId ? " is-active" : ""}`;
      button.style.setProperty("--phase-color", stage.color);
      button.dataset.stageId = stage.id;
      button.setAttribute("aria-pressed", String(stage.id === selectedId));
      button.innerHTML = `
        <span class="phase-dot" aria-hidden="true"></span>
        <span>
          <span class="phase-name">${stage.phase}</span>
          <span class="phase-command">${stage.title}</span>
        </span>
        <span class="phase-command">${stage.command}</span>
      `;
      button.addEventListener("click", () => selectStage(stage.id));
      return button;
    })
  );
}

function renderFlowMap(visibleStages) {
  const canvas = document.querySelector("#flowCanvas");
  const visibleIds = new Set(visibleStages.map((stage) => stage.id));
  const svg = createSvgElement("svg");
  svg.setAttribute("class", "flow-map");
  svg.setAttribute("viewBox", "0 0 840 380");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Agent Skills lifecycle workflow map");

  const lineLayer = createSvgElement("g");
  connections.forEach(([from, to]) => {
    const source = getStageById(from);
    const target = getStageById(to);
    const line = createSvgElement("path");
    const isActive = from === selectedId || to === selectedId;
    line.setAttribute("class", `flow-line${isActive ? " is-active" : ""}`);
    line.setAttribute(
      "d",
      `M ${source.x + 170} ${source.y + 40} C ${source.x + 220} ${source.y + 40}, ${target.x - 50} ${target.y + 40}, ${target.x} ${target.y + 40}`
    );
    if (!visibleIds.has(from) || !visibleIds.has(to)) line.classList.add("is-muted");
    lineLayer.append(line);
  });

  const nodeLayer = createSvgElement("g");
  workflowStages.forEach((stage) => {
    const group = createSvgElement("g");
    const isVisible = visibleIds.has(stage.id);
    group.setAttribute("class", `flow-node${stage.id === selectedId ? " is-active" : ""}${isVisible ? "" : " is-muted"}`);
    group.style.setProperty("--phase-color", stage.color);
    group.setAttribute("transform", `translate(${stage.x}, ${stage.y})`);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${stage.phase}: ${stage.title}`);

    const rect = createSvgElement("rect");
    rect.setAttribute("width", "170");
    rect.setAttribute("height", "86");
    rect.setAttribute("rx", "8");

    const phase = createSvgElement("text");
    phase.setAttribute("class", "node-phase");
    phase.setAttribute("x", "16");
    phase.setAttribute("y", "24");
    phase.textContent = stage.phase;

    const title = createSvgElement("text");
    title.setAttribute("class", "node-title");
    title.setAttribute("x", "16");
    title.setAttribute("y", "45");
    stage.nodeTitle.forEach((line, index) => {
      const tspan = createSvgElement("tspan");
      tspan.setAttribute("x", "16");
      tspan.setAttribute("dy", index === 0 ? "0" : "19");
      tspan.textContent = line;
      title.append(tspan);
    });

    const command = createSvgElement("text");
    command.setAttribute("class", "node-command");
    command.setAttribute("x", "16");
    command.setAttribute("y", "72");
    command.textContent = stage.command;

    group.append(rect, phase, title, command);
    group.addEventListener("click", () => selectStage(stage.id));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectStage(stage.id);
      }
    });
    nodeLayer.append(group);
  });

  svg.append(lineLayer, nodeLayer);
  canvas.replaceChildren(svg);
}

function renderDetail(stage) {
  document.querySelector("#detailPhase").textContent = stage.phase;
  document.querySelector("#detailPhase").style.color = stage.color;
  document.querySelector("#detailTitle").textContent = stage.title;
  document.querySelector("#detailBody").textContent = stage.body;
  document.querySelector("#detailCommand").textContent = stage.command;
  document.querySelector("#detailSkills").textContent = stage.skills.join(", ");
  document.querySelector("#detailOutput").textContent = stage.output;
  document.querySelector("#behaviorTitle").textContent = `${stage.phase} agent 會做什麼`;

  const list = document.querySelector("#behaviorList");
  list.replaceChildren(
    ...stage.behavior.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    })
  );
}

function renderPersonas() {
  const stack = document.querySelector("#personaStack");
  stack.replaceChildren(
    ...personas.map((persona) => {
      const item = document.createElement("article");
      item.className = "persona-item";
      item.style.setProperty("--persona-color", persona.color);
      item.innerHTML = `<strong>${persona.name}</strong><span>${persona.focus}</span>`;
      return item;
    })
  );
}

function renderEmptyState() {
  const nav = document.querySelector("#phaseNav");
  nav.replaceChildren();
  document.querySelector("#flowCanvas").innerHTML = '<div class="empty-note">沒有符合搜尋條件的 workflow 階段。</div>';
}

function selectStage(stageId) {
  selectedId = stageId;
  render();
}

function setMode(mode) {
  displayMode = mode;
  document.querySelectorAll(".segment").forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  render();
}

function render() {
  const query = document.querySelector("#searchInput").value;
  const visibleStages = filterStages(query, displayMode);
  const selectedStage = getStageById(selectedId) ?? workflowStages[0];

  if (visibleStages.length === 0) {
    renderEmptyState();
  } else {
    renderPhaseNav(visibleStages);
    renderFlowMap(visibleStages);
  }

  renderDetail(selectedStage);
  renderPersonas();
}

function init() {
  document.querySelector("#skillCount").textContent = String(repoTotals.skills);
  document.querySelector("#searchInput").addEventListener("input", render);
  document.querySelector("#resetButton").addEventListener("click", () => {
    document.querySelector("#searchInput").value = "";
    selectedId = "define";
    render();
  });
  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });
  render();
}

if (typeof document !== "undefined") {
  init();
}
