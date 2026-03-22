const STORAGE_KEYS = {
  prompts: "nlsf.prompts",
  exports: "nlsf.exports",
  panelState: "nlsf.panelState",
  artifactLibrary: "nlsf.artifactLibrary",
  floatingLayout: "nlsf.floatingLayout",
  artifactNativeMenus: "nlsf.artifactNativeMenus"
};

const NOTEBOOKLM_BATCHEXECUTE_URL = "https://notebooklm.google.com/_/LabsTailwindUi/data/batchexecute";
const RPC_METHODS = {
  LIST_ARTIFACTS: "gArtLc",
  GET_NOTES_AND_MIND_MAPS: "cFji9"
};

const ARTIFACT_TYPE_META = {
  audio: { label: "音频概览", shortLabel: "音频", icon: "音频" },
  video: { label: "视频概览", shortLabel: "视频", icon: "视频" },
  note: { label: "笔记", shortLabel: "笔记", icon: "笔记" },
  report: { label: "报告", shortLabel: "报告", icon: "报告" },
  study_guide: { label: "学习指南", shortLabel: "指南", icon: "指南" },
  briefing_doc: { label: "简报文档", shortLabel: "简报", icon: "简报" },
  blog_post: { label: "博客文章", shortLabel: "文章", icon: "文章" },
  quiz: { label: "测验", shortLabel: "测验", icon: "测验" },
  flashcards: { label: "闪卡", shortLabel: "闪卡", icon: "闪卡" },
  mind_map: { label: "思维导图", shortLabel: "导图", icon: "导图" },
  infographic: { label: "信息图", shortLabel: "信息图", icon: "信息图" },
  slide_deck: { label: "演示文稿", shortLabel: "PPT", icon: "演示" },
  data_table: { label: "数据表格", shortLabel: "表格", icon: "表格" },
  unknown: { label: "其他产物", shortLabel: "其他", icon: "产物" }
};

const DEFAULT_ARTIFACT_FOLDERS = [
  { id: "folder-default-unfiled", name: "未归档" },
  { id: "folder-default-courseware", name: "课件产物" },
  { id: "folder-default-revision", name: "复习资料" }
];

const PANEL_CSS = ``;

const GLOBAL_UI_CSS = ``;

const PANEL_WIDTH = 380;
const PANEL_MARGIN = 20;
const TOGGLE_MARGIN = 22;
const TOGGLE_DEFAULT_TOP = 88;
const PANEL_DEFAULT_TOP = 24;
const ARTIFACT_NATIVE_ACTIONS = [
  { id: "open", label: "打开", icon: "↗", nativeLabels: [] },
  { id: "rename", label: "重命名", icon: "名", nativeLabels: ["重命名"] },
  { id: "download", label: "下载", icon: "下", nativeLabels: ["下载"] },
  { id: "share", label: "分享", icon: "享", nativeLabels: ["分享"] },
  { id: "export-google-sheet", label: "导出到 Google 表格", icon: "表", nativeLabels: ["导出到 Google 表格"] },
  { id: "export-google-doc", label: "导出到 Google 文档", icon: "文", nativeLabels: ["导出到 Google 文档"] },
  { id: "convert-to-source", label: "转换为来源", icon: "源", nativeLabels: ["转换为来源"] },
  { id: "convert-all-notes-to-sources", label: "将所有笔记转换为来源", icon: "笔", nativeLabels: ["将所有笔记转换为来源"] },
  { id: "slide-pdf", label: "下载 PDF 文档 (.pdf)", icon: "PDF", nativeLabels: ["下载 PDF 文档 (.pdf)"] },
  { id: "slide-pptx", label: "下载 PowerPoint (.pptx)", icon: "PPT", nativeLabels: ["下载 PowerPoint (.pptx)"] },
  { id: "view-custom-prompt", label: "查看自定义提示", icon: "提", nativeLabels: ["查看自定义提示"] },
  { id: "play-slideshow", label: "开始播放幻灯片", icon: "播", nativeLabels: ["开始播放幻灯片"] },
  { id: "modify", label: "修改", icon: "改", nativeLabels: ["修改"] },
  { id: "delete", label: "删除", icon: "删", nativeLabels: ["删除"], danger: true, confirmLabels: ["删除", "确认删除"] }
];

const ARTIFACT_ACTIONS_BY_KIND = {
  infographic: ["rename", "download", "share", "delete"],
  quiz: ["rename", "share", "delete"],
  data_table: ["rename", "export-google-sheet", "share", "delete"],
  note: ["convert-to-source", "convert-all-notes-to-sources", "export-google-doc", "export-google-sheet", "delete"],
  slide_deck: ["rename", "slide-pdf", "slide-pptx", "share", "view-custom-prompt", "play-slideshow", "modify", "delete"],
  video: ["rename", "download", "share", "delete"],
  audio: ["rename", "download", "share", "delete"],
  study_guide: ["rename", "export-google-doc", "export-google-sheet", "view-custom-prompt", "delete"],
  mind_map: ["delete"]
};

const DEFAULT_PROMPTS = [
  {
    id: crypto.randomUUID(),
    title: "课程总结",
    content: "请总结当前主题的核心概念、关键例子和容易混淆的点。",
    tags: ["课程", "总结"],
    variables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: "考点提炼",
    content: "请提炼当前资料里最可能考到的知识点，并用简洁语言解释。",
    tags: ["考试"],
    variables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const state = {
  prompts: [],
  exports: [],
  artifactLibrary: {},
  panelOpen: true,
  activeTab: "export",
  selectedTurnIds: [],
  promptFilter: "",
  editingPromptId: null,
  promptComposerOpen: false,
  artifactCommandFeedback: "",
  exportFormat: "markdown",
  selectedArtifactKind: "mind-map",
  selectedArtifactItemId: "",
  selectedArtifactIdsByKind: {},
  selectedArtifactFolderId: "all",
  expandedArtifactFolders: { all: true },
  artifactContextMenu: null,
  artifactContextAnchorKey: "",
  artifactAvailability: null,
  artifactAvailabilityNotebookId: "",
  artifactNativeMenus: {},
  artifactNativeMenuMap: {},
  artifactInspecting: false,
  artifactNativeMenuInspecting: false,
  artifactFolderDraft: "",
  renamingFolderId: null,
  renamingFolderDraft: "",
  subfolderTargetId: null,
  subfolderDraft: "",
  artifactDomItemsCache: {},
  floatingLayout: {
    toggle: { x: null, y: TOGGLE_DEFAULT_TOP },
    panel: { x: null, y: PANEL_DEFAULT_TOP }
  },
  dragSuppressClickUntil: 0
};

let root;
let panel;
let observer;
let toggleButton;
let dragState = null;

boot().catch((error) => {
  console.error("[NotebookLM Study Flow] init failed", error);
});

async function boot() {
  if (!window.chrome?.storage?.local || !window.chrome?.runtime) {
    return;
  }

  await hydrateState();
  injectPanel();
  await inspectArtifactAvailability(false);
  renderAll();
  startObservers();
}

function isExtensionContextValid() {
  try {
    return Boolean(window.chrome?.runtime?.id);
  } catch {
    return false;
  }
}

async function safeStorageSet(payload) {
  if (!isExtensionContextValid() || !window.chrome?.storage?.local) {
    return;
  }

  try {
    await chrome.storage.local.set(payload);
  } catch (error) {
    if (String(error).includes("Extension context invalidated")) {
      return;
    }
    throw error;
  }
}

async function hydrateState() {
  const stored = await chrome.storage.local.get(Object.values(STORAGE_KEYS));
  state.prompts = stored[STORAGE_KEYS.prompts] || DEFAULT_PROMPTS;
  state.exports = stored[STORAGE_KEYS.exports] || [];
  state.panelOpen = stored[STORAGE_KEYS.panelState] ?? true;
  state.artifactLibrary = stored[STORAGE_KEYS.artifactLibrary] || {};
  state.artifactNativeMenus = stored[STORAGE_KEYS.artifactNativeMenus] || {};
  state.floatingLayout = normalizeFloatingLayout(stored[STORAGE_KEYS.floatingLayout]);
  await persistPrompts();
}

function injectPanel() {
  if (document.getElementById("nlsf-host")) {
    return;
  }

  const host = document.createElement("div");
  host.id = "nlsf-host";
  document.documentElement.appendChild(host);
  root = host.attachShadow({ mode: "open" });

  const shell = document.createElement("div");
  shell.className = "nlsf-shell";
  shell.innerHTML = `
    <button class="nlsf-toggle" data-drag-handle="toggle" type="button" aria-label="打开学习流">学习流</button>
    <aside class="nlsf-panel ${state.panelOpen ? "is-open" : ""}">
      <header class="nlsf-panel__header" data-drag-handle="panel">
        <div>
          <p class="nlsf-kicker">NotebookLM</p>
          <h2>学习流</h2>
        </div>
        <button class="nlsf-icon-btn" data-action="toggle-panel" type="button" aria-label="关闭面板">×</button>
      </header>
      <nav class="nlsf-tabs">
        <button class="nlsf-tab is-active" data-tab="export" type="button">导出</button>
        <button class="nlsf-tab" data-tab="prompts" type="button">提示词</button>
        <button class="nlsf-tab" data-tab="artifact" type="button">产物</button>
        <button class="nlsf-tab" data-tab="artifact-manager" type="button">管理器</button>
      </nav>
      <section class="nlsf-content">
        <div class="nlsf-view is-active" data-view="export"></div>
        <div class="nlsf-view" data-view="prompts"></div>
        <div class="nlsf-view" data-view="artifact"></div>
        <div class="nlsf-view" data-view="artifact-manager"></div>
      </section>
      <div class="nlsf-context-menu-container"></div>
    </aside>
  `;

  root.appendChild(shell);
  if (PANEL_CSS.trim()) {
    const style = document.createElement("style");
    style.textContent = PANEL_CSS;
    root.appendChild(style);
  } else {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("src/styles.css");
    root.appendChild(link);
  }

  panel = root.querySelector(".nlsf-panel");
  toggleButton = root.querySelector(".nlsf-toggle");
  root.addEventListener("click", handleClick);
  root.addEventListener("input", handleInput);
  root.addEventListener("change", handleChange);
  root.addEventListener("mousedown", handleMouseDown);
  root.addEventListener("contextmenu", handleContextMenu);
  root.addEventListener("dragstart", handleDragStart);
  root.addEventListener("dragover", handleDragOver);
  root.addEventListener("drop", handleDrop);
  window.addEventListener("mousemove", handleWindowMouseMove, true);
  window.addEventListener("mouseup", handleWindowMouseUp, true);
  window.addEventListener("resize", handleWindowResize);
}

function startObservers() {
  observer = new MutationObserver(() => {
    renderExportView();
    renderArtifactView();
    renderArtifactManagerView();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function handleClick(event) {
  if (Date.now() < state.dragSuppressClickUntil) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (event.target.closest(".nlsf-toggle")) {
    togglePanel(true);
    return;
  }

  const tab = event.target.closest("[data-tab]");
  if (tab) {
    setActiveTab(tab.dataset.tab);
    return;
  }

  const contextMenuButton = findEventPathNode(event, (node) => node?.dataset?.action === "open-artifact-context-menu");
  if (contextMenuButton) {
    event.preventDefault();
    event.stopPropagation();
    openArtifactContextMenuFromButton(contextMenuButton.dataset.artifactKey, contextMenuButton);
    return;
  }

  const artifactRow = findEventPathNode(event, (node) => node?.dataset?.artifactRow === "true");
  const clickedInteractiveInsideRow = artifactRow
    ? findEventPathNode(
        event,
        (node) => node !== artifactRow && (node?.tagName === "BUTTON" || node?.getAttribute?.("role") === "button" || node?.tagName === "A")
      )
    : null;
  if (clickedInteractiveInsideRow) {
    return;
  }
  if (artifactRow && !findEventPathNode(event, (node) => node?.classList?.contains?.("nlsf-context-menu"))) {
    const artifactKey = artifactRow.dataset.artifactKey || "";
    if (artifactKey) {
      closeArtifactContextMenu();
      void openArtifactInStudio(artifactKey);
      return;
    }
  }

  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    if (state.artifactContextMenu) {
      closeArtifactContextMenu();
    }
    return;
  }

  const { action } = actionTarget.dataset;

  if (action === "toggle-panel") {
    togglePanel(false);
  } else if (action === "export-selected") {
    exportSelectedTurns(actionTarget.dataset.format);
  } else if (action === "export-session") {
    exportSession(actionTarget.dataset.format);
  } else if (action === "clear-export-log") {
    state.exports = [];
    persistExports().then(renderExportView);
  } else if (action === "toggle-turn") {
    toggleTurnSelection(actionTarget.dataset.id);
    renderExportView();
  } else if (action === "set-export-format") {
    state.exportFormat = actionTarget.dataset.format;
    renderExportView();
  } else if (action === "set-artifact-kind") {
    state.selectedArtifactKind = actionTarget.dataset.kind;
    state.selectedArtifactItemId = "";
    pruneSelectedArtifactIdsForKind(state.selectedArtifactKind);
    renderArtifactView();
  } else if (action === "toggle-artifact-item") {
    toggleArtifactItemSelection(actionTarget.dataset.itemId || "");
    renderArtifactView();
  } else if (action === "select-all-artifact-items") {
    selectAllArtifactItemsForCurrentKind();
    renderArtifactView();
  } else if (action === "clear-artifact-selection") {
    clearArtifactSelectionForCurrentKind();
    renderArtifactView();
  } else if (action === "export-artifact-selected") {
    void exportSelectedArtifacts(actionTarget.dataset.commandKind);
  } else if (action === "artifact-select-folder") {
    state.selectedArtifactFolderId = actionTarget.dataset.folderId || "all";
    renderArtifactView();
  } else if (action === "toggle-artifact-folder-expand") {
    toggleArtifactFolderExpand(actionTarget.dataset.folderId || "all");
  } else if (action === "create-artifact-folder") {
    void createArtifactFolder();
  } else if (action === "delete-artifact-folder") {
    void deleteArtifactFolder(actionTarget.dataset.folderId || "");
  } else if (action === "start-create-subfolder") {
    state.subfolderTargetId = actionTarget.dataset.folderId || "";
    state.subfolderDraft = "";
    state.expandedArtifactFolders[actionTarget.dataset.folderId] = true;
    renderArtifactManagerView();
  } else if (action === "cancel-create-subfolder") {
    state.subfolderTargetId = null;
    state.subfolderDraft = "";
    renderArtifactManagerView();
  } else if (action === "confirm-create-subfolder") {
    void createArtifactSubfolder();
  } else if (action === "start-rename-folder") {
    const folderId = actionTarget.dataset.folderId || "";
    const notebookId = getNotebookId();
    const library = notebookId ? getArtifactLibraryForNotebook(notebookId) : null;
    const folder = library?.folders.find((f) => f.id === folderId);
    state.renamingFolderId = folderId;
    state.renamingFolderDraft = folder?.name || "";
    renderArtifactManagerView();
  } else if (action === "cancel-rename-folder") {
    state.renamingFolderId = null;
    state.renamingFolderDraft = "";
    renderArtifactManagerView();
  } else if (action === "confirm-rename-folder") {
    void renameArtifactFolder(actionTarget.dataset.folderId || "");
  } else if (action === "open-artifact-in-studio") {
    closeArtifactContextMenu();
    void openArtifactInStudio(actionTarget.dataset.artifactKey);
  } else if (action === "move-artifact-to-folder") {
    closeArtifactContextMenu();
    void moveArtifactToFolder(actionTarget.dataset.artifactKey, actionTarget.dataset.folderId || "folder-default-unfiled");
  } else if (action === "delete-artifact") {
    closeArtifactContextMenu();
    void deleteArtifactInStudio(actionTarget.dataset.artifactKey);
  } else if (action === "export-artifact-item") {
    closeArtifactContextMenu();
    void exportArtifactFromMenu(actionTarget.dataset.artifactKey, actionTarget.dataset.commandKind);
  } else if (action === "run-artifact-native-action") {
    closeArtifactContextMenu();
    void runArtifactNativeAction(actionTarget.dataset.artifactKey, actionTarget.dataset.nativeActionId);
  } else if (action === "open-prompt-editor") {
    openPromptComposer(actionTarget.dataset.id || null);
  } else if (action === "close-prompt-editor") {
    closePromptComposer();
  } else if (action === "save-prompt") {
    savePromptFromForm();
  } else if (action === "edit-prompt") {
    startPromptEdit(actionTarget.dataset.id);
  } else if (action === "cancel-prompt-edit") {
    cancelPromptEdit();
  } else if (action === "insert-prompt") {
    insertPrompt(actionTarget.dataset.id);
  } else if (action === "delete-prompt") {
    deletePrompt(actionTarget.dataset.id);
  } else if (action === "export-artifact") {
    void exportSelectedArtifacts(actionTarget.dataset.commandKind);
  } else if (action === "inspect-artifacts") {
    inspectArtifactAvailability(true);
  }
}

function findEventPathNode(event, predicate) {
  const path = typeof event.composedPath === "function" ? event.composedPath() : [];
  for (const node of path) {
    if (node && predicate(node)) {
      return node;
    }
  }
  return null;
}

function handleContextMenu(event) {
  const artifactRow = event.target.closest?.("[data-artifact-row]");
  if (!artifactRow) {
    if (state.artifactContextMenu) {
      closeArtifactContextMenu();
    }
    return;
  }

  event.preventDefault();
  const artifactKey = artifactRow.dataset.artifactKey || "";
  if (!artifactKey) {
    return;
  }

  openArtifactContextMenu(artifactKey, event.clientX, event.clientY);
}

function handleMouseDown(event) {
  if (event.button === 0) {
    const dragHandle = findEventPathNode(event, (node) => node?.dataset?.dragHandle);
    if (dragHandle && !findEventPathNode(event, (node) => node !== dragHandle && isInteractiveNode(node))) {
      startFloatingDrag(dragHandle.dataset.dragHandle, event);
      return;
    }
  }

  if (event.button !== 2) {
    return;
  }

  const artifactRow = event.target.closest?.("[data-artifact-row]");
  if (!artifactRow) {
    return;
  }

  event.preventDefault();
  const artifactKey = artifactRow.dataset.artifactKey || "";
  if (!artifactKey) {
    return;
  }

  openArtifactContextMenu(artifactKey, event.clientX, event.clientY);
}

function handleInput(event) {
  if (event.target.name === "prompt-filter") {
    state.promptFilter = event.target.value.trim().toLowerCase();
    renderPromptView();
  } else if (event.target.name === "artifact-folder-draft") {
    state.artifactFolderDraft = event.target.value;
  } else if (event.target.name === "folder-rename-draft") {
    state.renamingFolderDraft = event.target.value;
  } else if (event.target.name === "subfolder-draft") {
    state.subfolderDraft = event.target.value;
  }
}

function handleChange(event) {
  if (event.target.name === "artifact-item-select") {
    state.selectedArtifactItemId = event.target.value || "";
    renderArtifactView();
  } else if (event.target.name === "artifact-folder-filter") {
    state.selectedArtifactFolderId = event.target.value || "all";
    renderArtifactView();
  }
}

function togglePanel(forceOpen) {
  state.panelOpen = typeof forceOpen === "boolean" ? forceOpen : !state.panelOpen;
  if (panel) {
    panel.classList.toggle("is-open", state.panelOpen);
  }

  if (state.panelOpen) {
    state.floatingLayout = {
      ...state.floatingLayout,
      panel: getPanelPositionForOpen()
    };
  } else {
    state.floatingLayout = {
      ...state.floatingLayout,
      toggle: {
        x: state.floatingLayout.panel.x,
        y: state.floatingLayout.panel.y
      }
    };
  }

  applyFloatingLayout();
  void persistFloatingLayout();
  void safeStorageSet({ [STORAGE_KEYS.panelState]: state.panelOpen });
}

function setActiveTab(tabName) {
  state.activeTab = tabName;
  for (const button of root.querySelectorAll(".nlsf-tab")) {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  }

  for (const view of root.querySelectorAll(".nlsf-view")) {
    view.classList.toggle("is-active", view.dataset.view === tabName);
  }

  if (tabName === "export") {
    renderExportView();
  } else if (tabName === "artifact") {
    renderArtifactView();
  } else if (tabName === "artifact-manager") {
    renderArtifactManagerView();
  } else if (tabName === "prompts") {
    renderPromptView();
  }
}

function renderAll() {
  renderExportView();
  renderArtifactView();
  renderArtifactManagerView();
  renderPromptView();
  applyFloatingLayout();
}

function renderExportView() {
  const view = root.querySelector('[data-view="export"]');
  if (!view) {
    return;
  }

  const turns = collectConversationTurns();
  const conversationReady = isConversationTabActive();
  if (!state.selectedTurnIds.length && turns[0]) {
    state.selectedTurnIds = [turns[0].id];
  }
  const selectedCount = turns.filter((turn) => state.selectedTurnIds.includes(turn.id)).length;
  const history = state.exports.slice(0, 5);
  const fmt = state.exportFormat;
  const selectedLabel = selectedCount ? `已选 ${selectedCount} 项` : "尚未选择对话";

  view.innerHTML = `
    <section class="nlsf-section">
      <div class="nlsf-toolbar">
        <div class="nlsf-toolbar-copy">
          <h3>导出</h3>
          <p class="nlsf-muted">${conversationReady ? `已识别 ${turns.length} 条对话片段，可整理为更干净的知识笔记。` : '请先切到 NotebookLM 的对话页，再开始捕获对话内容。'}</p>
        </div>
      </div>
      <div class="nlsf-card">
        <span class="nlsf-label">导出格式</span>
        <div class="nlsf-format-row">
          <button class="nlsf-format-btn ${fmt === 'markdown' ? 'is-active' : ''}" data-action="set-export-format" data-format="markdown" type="button">Markdown</button>
          <button class="nlsf-format-btn ${fmt === 'json' ? 'is-active' : ''}" data-action="set-export-format" data-format="json" type="button">JSON</button>
        </div>
        <div class="nlsf-pill-row">
          <span class="nlsf-badge nlsf-badge--soft">${selectedLabel}</span>
          <span class="nlsf-badge nlsf-badge--soft">${turns.length} 条已捕获</span>
        </div>
        <div class="nlsf-btn-row">
          <button class="nlsf-btn nlsf-btn--primary" data-action="export-selected" data-format="${fmt}" type="button" ${selectedCount && conversationReady ? '' : 'disabled'}>导出勾选内容</button>
          <button class="nlsf-btn" data-action="export-session" data-format="${fmt}" type="button" ${turns.length && conversationReady ? '' : 'disabled'}>导出整段会话</button>
        </div>
      </div>
    </section>
    <section class="nlsf-section">
      <div class="nlsf-section-heading">
        <h3>识别到的对话</h3>
        <span class="nlsf-badge">${selectedCount}/${turns.length || 0}</span>
      </div>
      <div class="nlsf-message-list">
        ${turns.length ? turns.map((turn, index) => renderTurnItem(turn, index)).join('') : '<p class="nlsf-empty">暂无捕获的对话。</p>'}
      </div>
      <div class="nlsf-floating-bar">
        <strong>已选 ${selectedCount} 项</strong>
        <button class="nlsf-btn nlsf-btn--primary" data-action="export-selected" data-format="${fmt}" type="button" ${selectedCount && conversationReady ? '' : 'disabled'}>导出为 ${fmt === "markdown" ? "Markdown" : "JSON"}</button>
      </div>
    </section>
    <section class="nlsf-section">
      <div class="nlsf-section-heading">
        <h3>最近导出</h3>
        <button class="nlsf-link" data-action="clear-export-log" type="button">清空记录</button>
      </div>
      <div class="nlsf-history-list">
        ${history.length ? history.map(renderHistoryItem).join('') : '<p class="nlsf-empty">还没有导出记录。</p>'}
      </div>
    </section>
  `;
}

function renderArtifactView() {
  const view = root.querySelector('[data-view="artifact"]');
  if (!view) {
    return;
  }

  const notebookId = getNotebookId();
  if (notebookId && !state.artifactInspecting && state.artifactAvailabilityNotebookId !== notebookId) {
    state.artifactAvailability = null;
    state.artifactAvailabilityNotebookId = notebookId;
    state.selectedArtifactItemId = "";
    void inspectArtifactAvailability(false);
  }

  if (["study_guide", "briefing_doc", "blog_post"].includes(state.selectedArtifactKind)) {
    state.selectedArtifactKind = "report";
  }
  const kind = state.selectedArtifactKind;
  const feedback = state.artifactCommandFeedback;
  const isError = Boolean(feedback) && feedback.includes("失败");
  const availability = state.artifactAvailability;
  const artifactItems = getArtifactItemsForKind(kind, availability);
  const selectedArtifactIds = getSelectedArtifactIdsForKind(kind, availability);
  const selectedCount = selectedArtifactIds.length;
  const selectedArtifactItem = getSelectedArtifactItem(kind, availability);
  const artifactOptions = [
    { kind: 'mind-map', icon: '导图', label: '思维导图', supported: availability?.mindMap?.supported ?? null },
    { kind: 'slide-pdf', icon: 'PDF', label: '演示文稿 PDF', supported: availability?.slideDeck?.pdfSupported ?? null },
    { kind: 'slide-pptx', icon: 'PPTX', label: '演示文稿 PPTX', supported: availability?.slideDeck?.pptxPossible ?? null }
  ];
  artifactOptions.push(
    { kind: "audio", icon: "Audio", label: "音频", supported: (availability?.byKind?.audio || []).some((item) => item?.links?.primary) },
    { kind: "video", icon: "Video", label: "视频", supported: (availability?.byKind?.video || []).some((item) => item?.links?.primary) },
    { kind: "infographic", icon: "Info", label: "信息图", supported: (availability?.byKind?.infographic || []).some((item) => item?.links?.primary) }
  );
  artifactOptions.push(
    { kind: "quiz", icon: "Quiz", label: "测验", supported: (availability?.byKind?.quiz || []).length > 0 },
    { kind: "flashcards", icon: "Cards", label: "闪卡", supported: (availability?.byKind?.flashcards || []).length > 0 },
    { kind: "report", icon: "Report", label: "报告", supported: (availability?.byKind?.report || []).length > 0 },
    { kind: "data_table", icon: "CSV", label: "数据表", supported: (availability?.byKind?.data_table || []).length > 0 }
  );

  artifactOptions.push(
    { kind: "note", icon: "Note", label: "Note", supported: (availability?.note?.items || []).length > 0 }
  );

  const mergedReportKinds = ["report", "study_guide", "briefing_doc", "blog_post"];
  const reportSupported = mergedReportKinds.some((k) => (availability?.byKind?.[k] || []).length > 0);
  const normalizedArtifactOptions = artifactOptions
    .filter((opt) => !["study_guide", "briefing_doc", "blog_post"].includes(opt.kind))
    .map((opt) => {
      if (opt.kind === "report") return { ...opt, supported: reportSupported, label: "报告" };
      if (opt.kind === "audio") return { ...opt, label: "音频" };
      if (opt.kind === "video") return { ...opt, label: "视频" };
      if (opt.kind === "infographic") return { ...opt, label: "信息图" };
      if (opt.kind === "quiz") return { ...opt, label: "测验" };
      if (opt.kind === "flashcards") return { ...opt, label: "闪卡" };
      if (opt.kind === "data_table") return { ...opt, label: "数据表" };
      return opt;
    });
  artifactOptions.length = 0;
  artifactOptions.push(...normalizedArtifactOptions);
  const optionLabelMap = {
    report: "Report",
    audio: "Audio",
    video: "Video",
    infographic: "Infographic",
    quiz: "Quiz",
    flashcards: "Flashcards",
    data_table: "Data Table",
    note: "Notes"
  };
  for (const opt of artifactOptions) {
    if (optionLabelMap[opt.kind]) {
      opt.label = optionLabelMap[opt.kind];
    }
  }

  const statusText = notebookId
    ? state.artifactInspecting
      ? "正在同步当前笔记本的产物状态"
      : "笔记本已连接，可检查并导出现有产物"
    : "请先打开一个具体的 NotebookLM 笔记本";

  view.innerHTML = `
    <section class="nlsf-section">
      <div class="nlsf-status-banner ${notebookId ? '' : 'is-warning'}">
        <span>${escapeHtml(statusText)}</span>
        <button class="nlsf-link" data-action="inspect-artifacts" type="button" ${notebookId ? '' : 'disabled'}>重新识别</button>
      </div>
      <div class="nlsf-card">
        <span class="nlsf-label">当前笔记本</span>
        ${notebookId ? `<div class="nlsf-code">${escapeHtml(notebookId)}</div>` : `<p class="nlsf-empty">请先在 NotebookLM 中打开一个具体笔记本。</p>`}
      </div>
    </section>
    <section class="nlsf-section">
      <div class="nlsf-section-heading">
        <h3>产物检查器</h3>
        <span class="nlsf-badge nlsf-badge--soft">${artifactItems.length}</span>
      </div>
      <div class="nlsf-artifact-grid">
        ${artifactOptions.map(opt => `
          <button class="nlsf-artifact-card ${kind === opt.kind ? 'is-active' : ''}" data-action="set-artifact-kind" data-kind="${opt.kind}" type="button">
            <span class="nlsf-artifact-icon">${opt.icon}</span>
            <span class="nlsf-artifact-label">${opt.label}</span>
            <span class="nlsf-tag">${formatArtifactSupport(opt.supported)}</span>
          </button>
        `).join('')}
      </div>
      
    </section>
    <section class="nlsf-section">
      <div class="nlsf-section-heading">
        <h3>选择产物</h3>
      </div>
      <div class="nlsf-card">
        <span class="nlsf-label">具体文件</span>
        <div class="nlsf-section-heading">
          <span class="nlsf-label">Items</span>
          <span class="nlsf-badge nlsf-badge--soft">${selectedCount}/${artifactItems.length}</span>
        </div>
        <div class="nlsf-pill-row">
          <button class="nlsf-btn" data-action="select-all-artifact-items" type="button" ${artifactItems.length ? "" : "disabled"}>Select All</button>
          <button class="nlsf-btn" data-action="clear-artifact-selection" type="button" ${selectedCount ? "" : "disabled"}>Clear</button>
        </div>
        <div class="nlsf-message-list">
          ${artifactItems.length
            ? artifactItems.map((item) => {
                const checked = selectedArtifactIds.includes(String(item.id));
                return `
                  <button class="nlsf-message-item ${checked ? "is-selected" : ""}" data-action="toggle-artifact-item" data-item-id="${escapeAttribute(item.id)}" type="button" aria-pressed="${checked ? "true" : "false"}">
                    <span class="nlsf-check ${checked ? "is-checked" : ""}" aria-hidden="true">${checked ? "✓" : ""}</span>
                    <span class="nlsf-message-body">
                      <strong>${escapeHtml(item.label)}</strong>
                      <small>${escapeHtml(item.meta)}</small>
                    </span>
                  </button>
                `;
              }).join("")
            : '<p class="nlsf-empty">No exportable items in this type.</p>'}
        </div>
        <div class="nlsf-form">
          <select id="nlsf-artifact-item-select" name="artifact-item-select" style="display:none" ${artifactItems.length ? "" : "disabled"}>
            ${artifactItems.length
              ? artifactItems.map((item) => `<option value="${escapeAttribute(item.id)}" ${selectedArtifactItem?.id === item.id ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")
              : '<option value="">当前类型下没有可导出的产物</option>'}
          </select>
        </div>
        <div class="nlsf-btn-row">
          <button class="nlsf-btn nlsf-btn--primary" data-action="export-artifact" data-command-kind="${kind}" type="button" ${canExportSelectedArtifact(kind, availability, notebookId) ? '' : 'disabled'}>直接导出</button>
        </div>
        ${selectedArtifactItem ? `<div class="nlsf-code">${escapeHtml(selectedArtifactItem.meta)}</div>` : ""}
        ${feedback ? `<div class="nlsf-feedback ${isError ? 'nlsf-feedback--error' : ''}">${escapeHtml(feedback)}</div>` : ''}
      </div>
    </section>
  `;
}

function renderArtifactManagerView() {
  const view = root.querySelector('[data-view="artifact-manager"]');
  if (!view) {
    return;
  }

  const notebookId = getNotebookId();
  if (notebookId && !state.artifactInspecting && state.artifactAvailabilityNotebookId !== notebookId) {
    state.artifactAvailability = null;
    state.artifactAvailabilityNotebookId = notebookId;
    state.selectedArtifactItemId = "";
    void inspectArtifactAvailability(false);
  }

  const availability = state.artifactAvailability;
  const unifiedItems = getUnifiedArtifactItems(availability);
  const folders = getVisibleFolders(notebookId, unifiedItems);
  const library = notebookId ? getArtifactLibraryForNotebook(notebookId) : null;
  const customFolderCount = library?.folders?.length || 0;
  const feedback = state.artifactCommandFeedback;
  const isError = Boolean(feedback) && (feedback.includes("失败") || feedback.includes("没有"));
  const statusText = notebookId
    ? state.artifactInspecting
      ? "正在同步当前笔记本的产物目录"
      : "把当前笔记本里的产物整理成你自己的目录"
    : "请先打开一个具体的 NotebookLM 笔记本";

  view.innerHTML = `
    <section class="nlsf-section">
      <div class="nlsf-status-banner ${notebookId ? '' : 'is-warning'}">
        <span>${escapeHtml(statusText)}</span>
        <button class="nlsf-link" data-action="inspect-artifacts" type="button" ${notebookId ? '' : 'disabled'}>刷新目录</button>
      </div>
    </section>
    <section class="nlsf-section">
      <div class="nlsf-artifact-manager">
        <div class="nlsf-card nlsf-artifact-manager__card">
          <div class="nlsf-section-heading">
            <h3>文件夹</h3>
            <span class="nlsf-badge nlsf-badge--soft">${customFolderCount}</span>
          </div>
          <div class="nlsf-form nlsf-form--inline">
            <input name="artifact-folder-draft" type="text" value="${escapeAttribute(state.artifactFolderDraft)}" placeholder="新建文件夹，例如：课程展示" />
            <button class="nlsf-btn" data-action="create-artifact-folder" type="button" ${notebookId ? "" : "disabled"}>新建</button>
          </div>
          <div class="nlsf-file-tree">
            ${folders.map((folder) => renderArtifactFolderSection(folder, unifiedItems, library, notebookId)).join("")}
          </div>
          ${feedback ? `<div class="nlsf-feedback ${isError ? 'nlsf-feedback--error' : ''}">${escapeHtml(feedback)}</div>` : ''}
        </div>
      </div>
    </section>
  `;

  renderArtifactContextMenuOverlay();
}

function renderArtifactContextMenu(notebookId) {
  const menuState = state.artifactContextMenu;
  if (!menuState?.artifactKey) {
    return "";
  }

  const artifact = getArtifactItemByKey(menuState.artifactKey);
  if (!artifact) {
    return "";
  }

  const library = notebookId ? getArtifactLibraryForNotebook(notebookId) : null;
  const allFolders = library ? library.folders : DEFAULT_ARTIFACT_FOLDERS;
  // Build ordered list: root folders followed by their children
  const orderedFolders = [];
  for (const f of allFolders.filter((f) => !f.parentId)) {
    orderedFolders.push({ ...f, isChild: false });
    for (const child of allFolders.filter((c) => c.parentId === f.id)) {
      orderedFolders.push({ ...child, isChild: true });
    }
  }
  const folders = orderedFolders.filter((folder) => folder.id !== artifact.folderId);
  const nativeItems = getArtifactContextNativeActions(artifact);

  return `
    <div class="nlsf-context-menu" style="left:${menuState.x}px; top:${menuState.y}px;">
      ${nativeItems.map((item) => `
        <button class="nlsf-context-menu__item ${item.danger ? "nlsf-context-menu__item--danger" : ""}" data-action="${item.action}" data-artifact-key="${escapeAttribute(artifact.key)}"${item.nativeActionId ? ` data-native-action-id="${escapeAttribute(item.nativeActionId)}"` : ""}${item.commandKind ? ` data-command-kind="${escapeAttribute(item.commandKind)}"` : ""} type="button">
          <span class="nlsf-context-menu__icon">${escapeHtml(item.icon)}</span>
          <span>${escapeHtml(item.label)}</span>
        </button>
      `).join("")}
      <div class="nlsf-context-menu__divider"></div>
      <div class="nlsf-context-menu__label">移入文件夹</div>
      ${folders.length
        ? folders.map((folder) => `
          <button class="nlsf-context-menu__item nlsf-context-menu__item--folder-target${folder.isChild ? " nlsf-context-menu__item--folder-child" : ""}" data-action="move-artifact-to-folder" data-artifact-key="${escapeAttribute(artifact.key)}" data-folder-id="${escapeAttribute(folder.id)}" type="button">
            <span class="nlsf-context-menu__icon">${folder.isChild ? "└" : ""}</span>
            <span>${escapeHtml(folder.name)}</span>
          </button>
        `).join("")
        : '<div class="nlsf-context-menu__empty">没有可移动的目标文件夹</div>'}
    </div>
  `;
}

function getArtifactContextNativeActions(artifact) {
  if (!artifact) {
    return [];
  }

  const actionIds = ["open", ...(ARTIFACT_ACTIONS_BY_KIND[artifact.kind] || ["delete"])];
  return actionIds
    .map((actionId) => getArtifactNativeActionMeta(actionId))
    .filter(Boolean)
    .map((item) => {
      if (item.id === "delete") {
        return { action: "delete-artifact", label: item.label, icon: item.icon, danger: true };
      }
      if (item.id === "open") {
        return { action: "open-artifact-in-studio", label: item.label, icon: item.icon };
      }
      return { action: "run-artifact-native-action", label: item.label, icon: item.icon, nativeActionId: item.id };
    });
}

function renderPromptView() {
  const view = root.querySelector('[data-view="prompts"]');
  if (!view) {
    return;
  }

  const promptInputReady = Boolean(findPromptInput());
  const editingPrompt = state.prompts.find((prompt) => prompt.id === state.editingPromptId) || null;
  const prompts = state.prompts.filter((prompt) => {
    if (!state.promptFilter) {
      return true;
    }

    const haystack = `${prompt.title} ${prompt.tags.join(" ")} ${prompt.content}`.toLowerCase();
    return haystack.includes(state.promptFilter);
  });

  if (state.promptComposerOpen) {
    view.innerHTML = `
      <section class="nlsf-section">
        <button class="nlsf-back" data-action="close-prompt-editor" type="button">← 返回目录</button>
        <div class="nlsf-toolbar-copy">
          <h3>${editingPrompt ? "编辑模板" : "新建模板"}</h3>
          <p class="nlsf-muted">${editingPrompt ? "在这里润色已有提示词，保存后会覆盖旧版本。" : "一个安静的编辑区，用来写下你最常用的提问框架。"}</p>
        </div>
      </section>
      <section class="nlsf-card">
        <div class="nlsf-editor">
          <input class="nlsf-editor-title" name="prompt-title" type="text" value="${escapeAttribute(editingPrompt?.title || "")}" placeholder="模板标题" />
          <div>
            <span class="nlsf-label">标签</span>
            <input name="prompt-tags" type="text" value="${escapeAttribute((editingPrompt?.tags || []).join(", "))}" placeholder="例如：总结，考试，复盘" />
          </div>
          <div>
            <span class="nlsf-label">正文</span>
            <textarea name="prompt-content" rows="9" placeholder="提示词正文，支持 {{course}} 和 {{date}}。">${escapeHtml(editingPrompt?.content || "")}</textarea>
          </div>
          <div class="nlsf-btn-row">
            <button class="nlsf-btn nlsf-btn--primary" data-action="save-prompt" type="button">${editingPrompt ? "保存修改" : "保存模板"}</button>
            <button class="nlsf-btn" data-action="close-prompt-editor" type="button">取消</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  view.innerHTML = `
    <section class="nlsf-section">
      <div class="nlsf-toolbar">
        <div class="nlsf-toolbar-copy">
          <h3>提示词目录</h3>
          <p class="nlsf-muted">${promptInputReady ? "在这里收藏能反复调用的提问框架，并一键插入当前输入框。" : "先打开 NotebookLM 对话页，插入按钮才会接管当前输入框。"}</p>
        </div>
      </div>
      <div class="nlsf-search">
        <input name="prompt-filter" type="search" value="${escapeAttribute(state.promptFilter)}" placeholder="搜索框架..." />
      </div>
    </section>
    <section class="nlsf-section">
      <div class="nlsf-section-heading">
        <h3>模板收藏</h3>
        <span class="nlsf-badge">${prompts.length}</span>
      </div>
      <div class="nlsf-prompt-list">
        ${prompts.length ? prompts.map(renderPromptItem).join("") : '<p class="nlsf-empty">未找到匹配的模板。</p>'}
      </div>
      <button class="nlsf-fab" data-action="open-prompt-editor" type="button" aria-label="新建提示词">+</button>
    </section>
  `;
}

function renderTurnItem(turn, index) {
  const selected = state.selectedTurnIds.includes(turn.id);
  const preview = truncate(turn.userText || turn.assistantText || "", 88);
  return `
    <button class="nlsf-message-item ${selected ? "is-selected" : ""}" data-action="toggle-turn" data-id="${turn.id}" type="button" aria-pressed="${selected ? "true" : "false"}">
      <span class="nlsf-check">${selected ? "&#10003;" : ""}</span>
      <span class="nlsf-message-copy">
        <span class="nlsf-message-role">对话 ${index + 1}</span>
        <span class="nlsf-message-preview">${escapeHtml(preview)}</span>
        <span class="nlsf-message-time">${selected ? "已纳入本次整理" : "点击勾选加入导出"}</span>
      </span>
    </button>
  `;
}

function renderHistoryItem(item) {
  return `
    <article class="nlsf-history-item">
      <strong>${escapeHtml(item.fileName)}</strong>
      <span>${escapeHtml(item.format.toUpperCase())}</span>
      <time>${formatDate(item.exportedAt)}</time>
    </article>
  `;
}

function renderPromptItem(prompt) {
  return `
    <article class="nlsf-prompt-item">
      <span class="nlsf-prompt-meta">提示词模板</span>
      <strong>${escapeHtml(prompt.title)}</strong>
      <p class="nlsf-prompt-body">${escapeHtml(prompt.content)}</p>
      <div class="nlsf-tag-row">
        ${prompt.tags.map((tag) => `<span class="nlsf-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="nlsf-inline-actions">
        <button data-action="insert-prompt" data-id="${prompt.id}" type="button">插入</button>
        <button data-action="edit-prompt" data-id="${prompt.id}" type="button">编辑</button>
        <button class="nlsf-btn--danger" data-action="delete-prompt" data-id="${prompt.id}" type="button">删除</button>
      </div>
    </article>
  `;
}

function renderArtifactFolderChip(folder, selectedFolderId) {
  return `
    <button
      class="nlsf-folder-chip ${selectedFolderId === folder.id ? "is-active" : ""}"
      data-action="artifact-select-folder"
      data-folder-id="${escapeAttribute(folder.id)}"
      data-folder-drop="${escapeAttribute(folder.id)}"
      type="button"
    >
      <span>${escapeHtml(folder.name)}</span>
      <span class="nlsf-folder-chip-count">${folder.count}</span>
    </button>
  `;
}

function renderArtifactFolderTreeItem(folder, selectedFolderId) {
  const isSelected = selectedFolderId === folder.id;
  const icon = folder.id === "all" ? "全部" : "文件夹";
  return `
    <button
      class="nlsf-file-tree__item ${isSelected ? "is-active" : ""}"
      data-action="artifact-select-folder"
      data-folder-id="${escapeAttribute(folder.id)}"
      data-folder-drop="${escapeAttribute(folder.id)}"
      type="button"
    >
      <span class="nlsf-file-tree__icon">${icon}</span>
      <span class="nlsf-file-tree__name">${escapeHtml(folder.name)}</span>
      <span class="nlsf-file-tree__count">${folder.count}</span>
    </button>
  `;
}

function renderArtifactFolderSection(folder, allItems, library, notebookId, depth = 0) {
  const expanded = isArtifactFolderExpanded(folder.id);
  const deletable = isCustomArtifactFolder(folder.id);
  const isAll = folder.id === "all";
  const isRenaming = state.renamingFolderId === folder.id;
  const isAddingSubfolder = state.subfolderTargetId === folder.id;
  const directItems = getFilteredArtifactItems(allItems, folder.id);
  const childFolders = (!isAll && library) ? library.folders.filter((f) => f.parentId === folder.id) : [];
  const canAddSub = deletable && depth < 4;

  const nameContent = isRenaming
    ? `<input class="nlsf-folder-rename-input" name="folder-rename-draft" value="${escapeAttribute(state.renamingFolderDraft)}" data-folder-id="${escapeAttribute(folder.id)}" type="text" />`
    : `<span class="nlsf-file-tree__name">${escapeHtml(folder.name)}</span>`;

  const actionsContent = deletable && !isRenaming ? `
    <div class="nlsf-folder-actions">
      ${canAddSub ? `<button class="nlsf-folder-action-btn" data-action="start-create-subfolder" data-folder-id="${escapeAttribute(folder.id)}" type="button" title="新建子文件夹">+</button>` : ""}
      <button class="nlsf-folder-action-btn" data-action="start-rename-folder" data-folder-id="${escapeAttribute(folder.id)}" type="button" title="重命名">改</button>
      <button class="nlsf-folder-action-btn nlsf-folder-action-btn--danger" data-action="delete-artifact-folder" data-folder-id="${escapeAttribute(folder.id)}" type="button" title="删除文件夹">×</button>
    </div>
  ` : isRenaming ? `
    <div class="nlsf-folder-actions">
      <button class="nlsf-folder-action-btn" data-action="confirm-rename-folder" data-folder-id="${escapeAttribute(folder.id)}" type="button">确定</button>
      <button class="nlsf-folder-action-btn" data-action="cancel-rename-folder" type="button">取消</button>
    </div>
  ` : "";

  return `
    <section class="nlsf-folder-section${depth > 0 ? " nlsf-folder-section--child" : ""}">
      <div class="nlsf-folder-section__header" ${deletable ? `draggable="true" data-folder-drag-id="${escapeAttribute(folder.id)}"` : ""}>
        <button
          class="nlsf-file-tree__item ${expanded ? "is-active" : ""}"
          data-action="toggle-artifact-folder-expand"
          data-folder-id="${escapeAttribute(folder.id)}"
          data-folder-drop="${escapeAttribute(folder.id)}"
          type="button"
        >
          <span class="nlsf-file-tree__chevron">${expanded ? "▼" : "▶"}</span>
          <span class="nlsf-file-tree__icon">${isAll ? "全" : "夹"}</span>
          ${nameContent}
          <span class="nlsf-file-tree__count">${folder.count}</span>
        </button>
        ${actionsContent}
      </div>
      ${expanded ? renderArtifactFolderChildren(folder, directItems, childFolders, allItems, library, notebookId, isAddingSubfolder, depth) : ""}
    </section>
  `;
}

function renderArtifactFolderChildren(folder, directItems, childFolders, allItems, library, notebookId, isAddingSubfolder, depth) {
  const childSections = childFolders.map((child) => {
    const childWithCount = { ...child, count: allItems.filter((i) => i.folderId === child.id).length };
    return renderArtifactFolderSection(childWithCount, allItems, library, notebookId, depth + 1);
  }).join("");

  const subfolderForm = isAddingSubfolder ? `
    <div class="nlsf-subfolder-create">
      <input name="subfolder-draft" type="text" value="${escapeAttribute(state.subfolderDraft)}" placeholder="子文件夹名称" />
      <button class="nlsf-folder-action-btn" data-action="confirm-create-subfolder" type="button">确定</button>
      <button class="nlsf-folder-action-btn" data-action="cancel-create-subfolder" type="button">取消</button>
    </div>
  ` : "";

  if (!directItems.length && !childFolders.length && !isAddingSubfolder) {
    return `
      <div class="nlsf-folder-children">
        <div class="nlsf-file-empty nlsf-file-empty--nested">
          <p class="nlsf-muted">${escapeHtml(folder.name)} 里还没有产物。</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="nlsf-folder-children">
      ${subfolderForm}
      ${childSections}
      ${directItems.map((item) => renderArtifactManagerItem(item)).join("")}
    </div>
  `;
}

function renderArtifactLibraryItem(item, notebookId) {
  const meta = getArtifactKindMeta(item.kind);
  const folders = getVisibleFolders(notebookId, getUnifiedArtifactItems(state.artifactAvailability)).filter((folder) => folder.id !== "all");
  const currentFolder = folders.find((folder) => folder.id === item.folderId);

  return `
    <article class="nlsf-artifact-entry" draggable="true" data-artifact-key="${escapeAttribute(item.key)}">
      <div class="nlsf-artifact-entry__top">
        <span class="nlsf-tag">${escapeHtml(meta.shortLabel)}</span>
        <span class="nlsf-meta">${escapeHtml(formatArtifactCreatedAt(item.createdAt))}</span>
      </div>
      <strong>${escapeHtml(item.title)}</strong>
      <p class="nlsf-muted">${escapeHtml(meta.label)}${currentFolder ? ` · 当前位于「${currentFolder.name}」` : ""}</p>
      <div class="nlsf-inline-actions">
        <button data-action="open-artifact-in-studio" data-artifact-key="${escapeAttribute(item.key)}" type="button">在 Studio 中打开</button>
        <button data-action="move-artifact-to-folder" data-artifact-key="${escapeAttribute(item.key)}" data-folder-id="folder-default-unfiled" type="button">移回未归档</button>
      </div>
    </article>
  `;
}

function renderArtifactManagerItem(item) {
  const meta = getArtifactKindMeta(item.kind);
  const menuOpen = state.artifactContextAnchorKey === item.key;
  return `
    <article class="nlsf-artifact-row ${menuOpen ? "is-menu-open" : ""}" draggable="true" data-artifact-key="${escapeAttribute(item.key)}" data-artifact-row="true">
      <span class="nlsf-artifact-row__type">${escapeHtml(meta.shortLabel)}</span>
      <strong class="nlsf-artifact-row__title">${escapeHtml(item.title)}</strong>
      <button class="nlsf-artifact-row__more" data-action="open-artifact-context-menu" data-artifact-key="${escapeAttribute(item.key)}" type="button" aria-label="更多">⋯</button>
    </article>
  `;
}

function collectConversationTurns() {
  const messageNodes = Array.from(document.querySelectorAll(".message-text-content"));
  const turns = [];

  for (let index = 0; index < messageNodes.length - 1; index += 2) {
    const questionNode = messageNodes[index];
    const answerNode = messageNodes[index + 1];
    const question = normalizeText(questionNode.textContent || "");
    const answerText = normalizeText(answerNode.textContent || "");
    const answerMarkdown = extractNodeMarkdown(answerNode);

    if (!question || !answerText || isAnswerSubheading(question)) {
      continue;
    }

    turns.push({
      id: questionNode.dataset.nlsfId || attachSyntheticId(questionNode, "turn"),
      userText: question,
      assistantText: answerText,
      assistantMarkdown: answerMarkdown || answerText,
      citations: collectCitations(answerNode)
    });
  }

  return turns;
}

function isAnswerSubheading(text) {
  return /^\d+\./.test(text);
}

function collectCitations(scope) {
  if (!scope) {
    return [];
  }

  const citations = new Set();
  for (const button of scope.querySelectorAll("button")) {
    const text = normalizeText(button.textContent || "");
    if (/^\d+\s*:/.test(text)) {
      citations.add(text);
    }
  }

  return Array.from(citations);
}

function extractNodeMarkdown(node) {
  if (!(node instanceof Element)) {
    return "";
  }

  const renderedText = normalizeRenderedText(node.innerText || node.textContent || "");
  if (!renderedText) {
    return "";
  }

  const heuristicMarkdown = cleanupMarkdown(applyMarkdownHeuristics(renderedText));
  return cleanupMarkdown(choosePreferredMarkdown(renderedText, heuristicMarkdown));
}

function normalizeRenderedText(value) {
  return (value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isLikelyChapterTitle(value) {
  return /^\u7b2c[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e070-9]+\u7ae0/.test(value);
}

function isLikelySectionTitle(value) {
  if (/^(#{1,6}\s|> |\s*[-*+] |\s*\d+\. )/.test(value)) {
    return false;
  }

  return /^\d+(\.\d+){1,3}\s+\S+/.test(value);
}

function isLikelyCallout(value) {
  return /^\u3010[^\u3011]+\u3011$/.test(value);
}

function applyMarkdownHeuristics(value) {
  const lines = normalizeRenderedText(value).split("\n");
  const normalizedLines = [];
  let firstContentHandled = false;

  for (const originalLine of lines) {
    const line = originalLine.replace(/[ \t]+$/g, "");
    const trimmed = line.trim();

    if (!trimmed) {
      normalizedLines.push("");
      continue;
    }

    if (!firstContentHandled) {
      if (!/^(#{1,6}\s|> |\s*[-*+] |\s*\d+\. )/.test(trimmed) && isLikelyChapterTitle(trimmed)) {
        normalizedLines.push(`# ${trimmed}`);
      } else {
        normalizedLines.push(line);
      }
      firstContentHandled = true;
      continue;
    }

    if (isLikelyCallout(trimmed)) {
      normalizedLines.push(`> **${trimmed}**`);
      continue;
    }

    if (isLikelySectionTitle(trimmed)) {
      normalizedLines.push(`## ${trimmed}`);
      continue;
    }

    normalizedLines.push(line);
  }

  return normalizedLines.join("\n");
}

function cleanupInlineText(value) {
  return value
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanupMarkdown(value) {
  return value
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeMarkdownText(value) {
  return (value || "").replace(/\u00a0/g, " ");
}

function choosePreferredMarkdown(rawRenderedText, mappedMarkdown) {
  if (!rawRenderedText) {
    return mappedMarkdown;
  }

  if (!mappedMarkdown) {
    return rawRenderedText;
  }

  return scoreMarkdownCandidate(mappedMarkdown) >= scoreMarkdownCandidate(rawRenderedText)
    ? mappedMarkdown
    : rawRenderedText;
}

function scoreMarkdownCandidate(value) {
  const text = value || "";
  let score = 0;

  score += (text.match(/\n/g) || []).length;
  score += (text.match(/^(#{1,6}|\s*[-*+] |\s*\d+\. |> )/gm) || []).length * 4;
  score += (text.match(/\*\*[^*]+\*\*/g) || []).length * 2;
  score += (text.match(/```/g) || []).length * 3;
  score += (text.match(/^---$/gm) || []).length * 3;

  return score;
}




async function exportSelectedTurns(format) {
  const turns = collectConversationTurns();
  const selectedTurns = turns.filter((turn) => state.selectedTurnIds.includes(turn.id));
  if (!selectedTurns.length) {
    return;
  }

  const payload = buildExportPayload(selectedTurns);
  await downloadPayload(payload, format, "selected");
}

async function exportSession(format) {
  const turns = collectConversationTurns();
  if (!turns.length) {
    return;
  }

  const payload = buildExportPayload(turns);
  await downloadPayload(payload, format, "session");
}

function buildExportPayload(turns) {
  return {
    notebookName: getNotebookName(),
    exportedAt: new Date().toISOString(),
    pageUrl: location.href,
    turns: turns.map((turn) => ({
      id: turn.id,
      user: turn.userText,
      assistant: turn.assistantText,
      assistantMarkdown: turn.assistantMarkdown || turn.assistantText,
      citations: turn.citations
    }))
  };
}

async function downloadPayload(payload, format, scope) {
  const fileName = buildFileName(scope, format);
  const body = format === "json" ? JSON.stringify(payload, null, 2) : toMarkdown(payload);
  const encodedBody = `\uFEFF${body}`;
  const blob = new Blob([encodedBody], { type: `${format === "json" ? "application/json" : "text/markdown"};charset=utf-8` });
  const url = await blobToDataUrl(blob);

  const response = await chrome.runtime.sendMessage({
    type: "nlsf:download",
    payload: {
      url,
      filename: fileName
    }
  });

  if (!response?.ok) {
    console.error("[NotebookLM Study Flow] download failed", response?.error);
    return;
  }

  state.exports.unshift({ fileName, format, exportedAt: payload.exportedAt });
  state.exports = state.exports.slice(0, 20);
  await persistExports();
  renderExportView();
}

function toMarkdown(payload) {
  const lines = [
    `# ${payload.notebookName}`,
    "",
    `- Exported At: ${payload.exportedAt}`,
    `- Source URL: ${payload.pageUrl}`,
    ""
  ];

  for (const turn of payload.turns) {
    lines.push("## User");
    lines.push("");
    lines.push(turn.user);
    lines.push("");
    lines.push("## Assistant");
    lines.push("");
    lines.push(turn.assistantMarkdown || turn.assistant);
    lines.push("");

    if (turn.citations.length) {
      lines.push(`Citations: ${turn.citations.join(", ")}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

function buildFileName(scope, format) {
  const notebookName = slugify(getNotebookName());
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const extension = format === "json" ? "json" : "md";
  return `notebooklm-study-flow/${notebookName}-${scope}-${stamp}.${extension}`;
}

function getNotebookName() {
  const heading = document.querySelector("h1");
  return normalizeText(heading?.textContent || "NotebookLM Export");
}

function getNotebookId() {
  const match = location.pathname.match(/\/notebook\/([a-f0-9-]+)/i);
  return match ? match[1] : "";
}

function formatArtifactSupport(supported) {
  if (supported === true) {
    return '支持';
  }
  if (supported === false) {
    return '不支持';
  }
  return state.artifactInspecting ? '识别中' : '待识别';
}

function getArtifactKindMeta(kind) {
  return ARTIFACT_TYPE_META[kind] || ARTIFACT_TYPE_META.unknown;
}

function getArtifactLibraryForNotebook(notebookId) {
  const existing = state.artifactLibrary[notebookId];
  if (existing?.folders?.length) {
    return existing;
  }

  return {
    folders: DEFAULT_ARTIFACT_FOLDERS.map((folder) => ({ ...folder })),
    assignments: {}
  };
}

function ensureArtifactLibraryForNotebook(notebookId) {
  const current = getArtifactLibraryForNotebook(notebookId);
  if (!state.artifactLibrary[notebookId]) {
    state.artifactLibrary[notebookId] = current;
  }
  return state.artifactLibrary[notebookId];
}

function getArtifactVariant(item) {
  if (Array.isArray(item?.[9]) && Array.isArray(item[9][1]) && item[9][1].length) {
    return item[9][1][0] ?? null;
  }
  return null;
}

function getReportSubtype(title) {
  const lowered = String(title || "").toLowerCase();
  if (
    lowered.startsWith("briefing doc")
    || lowered.startsWith("study guide")
    || lowered.startsWith("blog post")
    || lowered.startsWith("report")
  ) {
    return "report";
  }
  return "report";
}

function mapArtifactIconToKind(iconName) {
  const icon = String(iconName || "").trim();
  if (!icon) {
    return "";
  }
  if (icon === "sticky_note_2") return "note";
  if (icon === "tablet") return "slide_deck";
  if (icon === "flowchart") return "mind_map";
  if (icon === "subscriptions") return "video";
  if (icon === "audio_magic_eraser") return "audio";
  if (icon === "auto_tab_group") return "study_guide";
  if (icon === "stacked_bar_chart") return "infographic";
  if (icon === "quiz") return "quiz";
  if (icon === "table_view") return "data_table";
  return "";
}

function collectArtifactLibraryKindHints() {
  const hints = {};
  const rows = Array.from(document.querySelectorAll("artifact-library-item, artifact-library-note"));
  for (const row of rows) {
    const text = normalizeUiText(row.textContent || "");
    const title = extractArtifactLibraryTitle(text);
    const icon = (text.split(" ")[0] || "").trim()
      || row.querySelector(".material-symbols-outlined, mat-icon, .google-symbols, .material-icons")?.textContent
      || "";
    const kind = mapArtifactIconToKind(icon);
    if (title && kind) {
      hints[title] = kind;
    }
  }
  return hints;
}

function parseArtifactLibraryRelativeTimestamp(text, fallbackIndex) {
  const value = normalizeUiText(text);
  const now = Date.now();
  const minuteMatch = value.match(/(\d+)\s*分钟前/);
  if (minuteMatch) {
    return now - Number(minuteMatch[1]) * 60 * 1000;
  }
  const hourMatch = value.match(/(\d+)\s*小时前/);
  if (hourMatch) {
    return now - Number(hourMatch[1]) * 60 * 60 * 1000;
  }
  const dayMatch = value.match(/(\d+)\s*天前/);
  if (dayMatch) {
    return now - Number(dayMatch[1]) * 24 * 60 * 60 * 1000;
  }
  return now - fallbackIndex;
}

function collectArtifactLibraryDomItems() {
  const rows = Array.from(document.querySelectorAll("artifact-library-item, artifact-library-note"));
  return rows.map((row, index) => {
    const text = normalizeUiText(row.textContent || "");
    const title = extractArtifactLibraryTitle(text);
    const icon = (text.split(" ")[0] || "").trim()
      || row.querySelector(".material-symbols-outlined, mat-icon, .google-symbols, .material-icons")?.textContent
      || "";
    const kind = mapArtifactIconToKind(icon);
    const primaryButton = row.querySelector('button[aria-labelledby], button[aria-describedby], button');
    const labelledBy = String(primaryButton?.getAttribute?.("aria-labelledby") || "").trim();
    const describedBy = String(primaryButton?.getAttribute?.("aria-describedby") || "").trim();
    const labelId = labelledBy || describedBy;
    const realIdMatch = labelId.match(/(?:artifact|note)-labels-(.+)$/i);
    const realId = realIdMatch ? realIdMatch[1] : "";
    const isNote = /^ARTIFACT-LIBRARY-NOTE$/i.test(row.tagName);
    return {
      id: realId,
      labelId,
      title,
      kind,
      createdAt: parseArtifactLibraryRelativeTimestamp(text, index),
      rowKind: isNote ? "note" : "artifact"
    };
  }).filter((item) => item.title && item.kind === "note");
}

function resolveArtifactKindHint(title, hints) {
  const expected = normalizeUiText(title || "");
  if (!expected) {
    return "";
  }
  if (hints[expected]) {
    return hints[expected];
  }

  const entries = Object.entries(hints);
  const fuzzy = entries.find(([key]) => expected.includes(key) || key.includes(expected));
  return fuzzy?.[1] || "";
}

function extractArtifactLibraryTitle(text) {
  const value = normalizeUiText(text);
  if (!value) {
    return "";
  }

  return value
    .replace(/ more_vert$/i, "")
    .replace(/ play_arrow more_vert$/i, "")
    .replace(/^[^\s]+ /, "")
    .replace(/ \d+ 个来源 · .*$/i, "")
    .replace(/ \d+ 小时前$/i, "")
    .replace(/ \d+ 天前$/i, "")
    .trim();
}

function mapStudioArtifactKind(item) {
  const typeCode = Number(item?.[2] || 0);
  const variant = getArtifactVariant(item);

  if (typeCode === 1) return "audio";
  if (typeCode === 2) return getReportSubtype(item?.[1]);
  if (typeCode === 3) return "video";
  if (typeCode === 4) return variant === 1 ? "flashcards" : variant === 2 ? "quiz" : "unknown";
  if (typeCode === 7) return "infographic";
  if (typeCode === 8) return "slide_deck";
  if (typeCode === 9) return "data_table";
  return "unknown";
}

function getUnifiedArtifactItems(availability) {
  if (!availability) {
    return [];
  }

  const notebookId = availability.notebookId || getNotebookId();
  const library = notebookId ? getArtifactLibraryForNotebook(notebookId) : { folders: DEFAULT_ARTIFACT_FOLDERS, assignments: {} };
  const kindHints = collectArtifactLibraryKindHints();
  const liveDomItems = collectArtifactLibraryDomItems();
  let domItems = liveDomItems;
  if (notebookId) {
    if (liveDomItems.length) {
      state.artifactDomItemsCache[notebookId] = liveDomItems;
    } else if (Array.isArray(state.artifactDomItemsCache[notebookId])) {
      // Keep mapped notes/folders visible while Studio detail panels hide the list DOM.
      domItems = state.artifactDomItemsCache[notebookId];
    }
  }
  const items = [];

  for (const item of availability.mindMap?.items || []) {
    const folderId = library.assignments[`mind_map:${item.id}`] || "folder-default-unfiled";
    items.push({
      key: `mind_map:${item.id}`,
      id: item.id,
      title: item.title || "未命名思维导图",
      createdAt: item.createdAt,
      kind: "mind_map",
      folderId,
      openTitle: item.title || "未命名思维导图",
      exportable: true
    });
  }

  for (const item of availability.allStudioItems || []) {
    const hintedKind = resolveArtifactKindHint(item.title || "", kindHints);
    const kind = hintedKind || item.kind || mapStudioArtifactKind(item.raw);
    const stableKey = `studio:${item.id}`;
    const legacyKey = `${kind}:${item.id}`;
    const folderId = library.assignments[stableKey] || library.assignments[legacyKey] || "folder-default-unfiled";
    items.push({
      key: stableKey,
      id: item.id,
      title: item.title || "未命名产物",
      createdAt: item.createdAt,
      kind,
      folderId,
      openTitle: item.title || "未命名产物",
      exportable: kind === "slide_deck" || kind === "mind_map"
    });
  }

  const existingTitles = new Set(items.map((item) => normalizeUiText(item.title || "")));
  for (const item of domItems) {
    const normalizedTitle = normalizeUiText(item.title);
    if (existingTitles.has(normalizedTitle)) {
      continue;
    }
    const stableKey = item.id ? `${item.kind}:${item.id}` : `dom:${slugify(item.title)}`;
    const folderId = library.assignments[stableKey] || "folder-default-unfiled";
    items.push({
      key: stableKey,
      id: item.id || stableKey,
      title: item.title,
      createdAt: item.createdAt,
      kind: item.kind,
      folderId,
      openTitle: item.title,
      domLabelId: item.labelId || "",
      rowKind: item.rowKind || "",
      exportable: false
    });
    existingTitles.add(normalizedTitle);
  }

  return items.sort((left, right) => Number(right.createdAt || 0) - Number(left.createdAt || 0));
}

function getVisibleFolders(notebookId, items) {
  const library = notebookId ? getArtifactLibraryForNotebook(notebookId) : { folders: DEFAULT_ARTIFACT_FOLDERS, assignments: {} };
  const rootFolders = library.folders.filter((f) => !f.parentId);
  const folders = rootFolders.map((folder) => ({
    ...folder,
    count: items.filter((item) => item.folderId === folder.id).length
  }));

  return [
    { id: "all", name: "全部产物", count: items.length },
    ...folders
  ];
}

function getFilteredArtifactItems(items, folderId) {
  if (!folderId || folderId === "all") {
    return items;
  }
  return items.filter((item) => item.folderId === folderId);
}

function renderArtifactAvailabilitySummary(availability, notebookId) {
  if (!notebookId) {
    return '';
  }
  if (state.artifactInspecting) {
    return '<div class="nlsf-card"><p class="nlsf-muted">正在检查当前笔记本里已存在的思维导图与演示文稿。</p></div>';
  }
  if (!availability) {
    return '<div class="nlsf-card"><p class="nlsf-muted">还没有识别结果，点击“重新识别”即可开始同步。</p></div>';
  }
  return `
    <div class="nlsf-card">
      <span class="nlsf-label">识别摘要</span>
      <p class="nlsf-muted">思维导图：已完成 ${availability.mindMap.completedCount}${availability.mindMap.latestTitle ? `，最新为《${escapeHtml(availability.mindMap.latestTitle)}》` : ''}。</p>
      <p class="nlsf-muted">演示文稿：已完成 ${availability.slideDeck.completedCount}，其中 PDF 可导出 ${availability.slideDeck.pdfReadyCount || 0} 份，PPTX 可导出 ${availability.slideDeck.pptxReadyCount || 0} 份${availability.slideDeck.latestTitle ? `，最新为《${escapeHtml(availability.slideDeck.latestTitle)}》` : ''}。</p>
    </div>
  `;
}

function canExportSelectedArtifact(kind, availability, notebookId) {
  if (!notebookId || !availability) {
    return false;
  }
  return getSelectedArtifactIdsForKind(kind, availability).length > 0;
}

function getSelectedArtifactIdsForKind(kind, availability) {
  const key = kind || state.selectedArtifactKind;
  const itemIds = new Set(getArtifactItemsForKind(key, availability).map((item) => String(item.id)));
  const selected = Array.isArray(state.selectedArtifactIdsByKind?.[key]) ? state.selectedArtifactIdsByKind[key] : [];
  const pruned = selected.filter((id) => itemIds.has(String(id)));

  if (!state.selectedArtifactIdsByKind) {
    state.selectedArtifactIdsByKind = {};
  }
  if (pruned.length !== selected.length) {
    state.selectedArtifactIdsByKind[key] = pruned;
  }
  return pruned;
}

function pruneSelectedArtifactIdsForKind(kind) {
  getSelectedArtifactIdsForKind(kind, state.artifactAvailability);
}

function setSelectedArtifactIdsForKind(kind, ids) {
  if (!state.selectedArtifactIdsByKind) {
    state.selectedArtifactIdsByKind = {};
  }
  state.selectedArtifactIdsByKind[kind] = Array.from(new Set((ids || []).map((id) => String(id))));
}

function toggleArtifactItemSelection(itemId) {
  if (!itemId) {
    return;
  }
  const kind = state.selectedArtifactKind;
  const current = getSelectedArtifactIdsForKind(kind, state.artifactAvailability);
  const exists = current.includes(String(itemId));
  const next = exists ? current.filter((id) => id !== String(itemId)) : [...current, String(itemId)];
  setSelectedArtifactIdsForKind(kind, next);
}

function selectAllArtifactItemsForCurrentKind() {
  const kind = state.selectedArtifactKind;
  const items = getArtifactItemsForKind(kind, state.artifactAvailability);
  setSelectedArtifactIdsForKind(kind, items.map((item) => String(item.id)));
}

function clearArtifactSelectionForCurrentKind() {
  setSelectedArtifactIdsForKind(state.selectedArtifactKind, []);
}

function formatArtifactCreatedAt(value) {
  if (!value) {
    return "时间未知";
  }
  return new Date(value).toLocaleString();
}

function getArtifactItemsForKind(kind, availability) {
  if (!availability) {
    return [];
  }

  if (kind === "mind-map") {
    return (availability.mindMap?.items || []).map((item) => ({
      id: item.id,
      label: `${item.title || "未命名思维导图"} · ${formatArtifactCreatedAt(item.createdAt)}`,
      meta: `标题：${item.title || "未命名"} | 创建时间：${formatArtifactCreatedAt(item.createdAt)} | ID：${item.id}`,
      item
    }));
  }

  if (kind === "slide-pdf") {
    return (availability.slideDeck?.items || [])
      .filter((item) => item.pdfUrl)
      .map((item) => ({
        id: item.id,
        label: `${item.title || "未命名演示文稿"} · ${formatArtifactCreatedAt(item.createdAt)} · PDF`,
        meta: `标题：${item.title || "未命名"} | 创建时间：${formatArtifactCreatedAt(item.createdAt)} | PDF | ID：${item.id}`,
        item
      }));
  }

  if (kind === "slide-pptx") {
    return (availability.slideDeck?.items || [])
      .filter((item) => item.pptxUrl)
      .map((item) => ({
        id: item.id,
        label: `${item.title || "未命名演示文稿"} · ${formatArtifactCreatedAt(item.createdAt)} · PPTX`,
        meta: `标题：${item.title || "未命名"} | 创建时间：${formatArtifactCreatedAt(item.createdAt)} | PPTX | ID：${item.id}`,
        item
      }));
  }

  if (
    kind === "audio"
    || kind === "video"
    || kind === "infographic"
    || kind === "quiz"
    || kind === "flashcards"
    || kind === "report"
    || kind === "note"
    || kind === "data_table"
  ) {
    const items = kind === "report"
      ? [
          ...(availability.byKind?.report || []),
          ...(availability.byKind?.study_guide || []),
          ...(availability.byKind?.briefing_doc || []),
          ...(availability.byKind?.blog_post || [])
        ]
      : kind === "note"
        ? (availability.note?.items || []).map((item) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt,
            content: item.content,
            kind: "note",
            exportFormats: ["markdown", "json"],
            raw: item.raw || item
          }))
      : (availability.byKind?.[kind] || []);
    return items
      .map((item) => ({
        id: item.id,
        label: `${item.title || kind} · ${formatArtifactCreatedAt(item.createdAt)}`,
        meta: `Title: ${item.title || kind} | Time: ${formatArtifactCreatedAt(item.createdAt)} | Type: ${kind} | Formats: ${(item.exportFormats || []).join(", ") || "structured"} | ID: ${item.id}`,
        item
      }));
  }

  return [];
}

function getSelectedArtifactItem(kind, availability) {
  const items = getArtifactItemsForKind(kind, availability);
  if (!items.length) {
    return null;
  }

  const selectedIds = getSelectedArtifactIdsForKind(kind, availability);
  if (selectedIds.length) {
    const byBatchSelection = items.find((item) => selectedIds.includes(String(item.id)));
    if (byBatchSelection) {
      return byBatchSelection;
    }
  }

  const explicit = items.find((item) => item.id === state.selectedArtifactItemId);
  if (explicit) {
    return explicit;
  }

  state.selectedArtifactItemId = items[0].id;
  return items[0];
}

function getPageBootstrapText() {
  const scriptText = Array.from(document.scripts || [])
    .map((script) => script.textContent || "")
    .join("\n");

  return `${document.documentElement?.innerHTML || ""}\n${scriptText}`;
}

function extractNotebookAuthContext() {
  const haystack = getPageBootstrapText();
  const csrfMatch = haystack.match(/"SNlM0e":"([^"]+)"/);
  const sessionMatch = haystack.match(/"FdrFJe":"([^"]+)"/);

  if (!csrfMatch?.[1] || !sessionMatch?.[1]) {
    throw new Error("未能从当前 NotebookLM 页面提取认证参数，请先刷新页面后重试。");
  }

  return {
    csrfToken: csrfMatch[1],
    sessionId: sessionMatch[1]
  };
}

function encodeRpcRequest(rpcId, params) {
  return [[[rpcId, JSON.stringify(params), null, "generic"]]];
}

function buildRpcBody(rpcId, params, csrfToken) {
  const request = JSON.stringify(encodeRpcRequest(rpcId, params));
  return `f.req=${encodeURIComponent(request)}&at=${encodeURIComponent(csrfToken)}&`;
}

function stripAntiXssiPrefix(responseText) {
  if (!responseText.startsWith(")]}'")) {
    return responseText;
  }
  return responseText.replace(/^\)\]\}'\r?\n/, "");
}

function parseChunkedRpcResponse(responseText) {
  const cleaned = stripAntiXssiPrefix(responseText).trim();
  if (!cleaned) {
    return [];
  }

  const chunks = [];
  const lines = cleaned.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      continue;
    }

    if (/^\d+$/.test(line)) {
      const payloadLine = lines[index + 1];
      if (!payloadLine) {
        continue;
      }
      try {
        chunks.push(JSON.parse(payloadLine));
      } catch {}
      index += 1;
      continue;
    }

    try {
      chunks.push(JSON.parse(line));
    } catch {}
  }

  return chunks;
}

function extractRpcResult(chunks, rpcId) {
  for (const chunk of chunks) {
    if (!Array.isArray(chunk)) {
      continue;
    }

    const items = Array.isArray(chunk[0]) ? chunk : [chunk];
    for (const item of items) {
      if (!Array.isArray(item) || item.length < 3) {
        continue;
      }

      if (item[0] === "er" && item[1] === rpcId) {
        throw new Error(`NotebookLM RPC 返回错误：${item[2] ?? "unknown"}`);
      }

      if (item[0] === "wrb.fr" && item[1] === rpcId) {
        const result = item[2];
        if (typeof result === "string") {
          try {
            return JSON.parse(result);
          } catch {
            return result;
          }
        }
        return result;
      }
    }
  }

  throw new Error(`NotebookLM RPC 未返回预期结果：${rpcId}`);
}

async function callNotebookRpc(rpcId, params, notebookId, { allowNull = false } = {}) {
  const auth = extractNotebookAuthContext();
  const query = new URLSearchParams({
    rpcids: rpcId,
    "source-path": `/notebook/${notebookId}`,
    "f.sid": auth.sessionId,
    hl: "en",
    rt: "c"
  });

  const response = await fetch(`${NOTEBOOKLM_BATCHEXECUTE_URL}?${query.toString()}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: buildRpcBody(rpcId, params, auth.csrfToken)
  });

  if (!response.ok) {
    throw new Error(`NotebookLM 请求失败：HTTP ${response.status}`);
  }

  const text = await response.text();
  const chunks = parseChunkedRpcResponse(text);
  const result = extractRpcResult(chunks, rpcId);
  if (result == null && !allowNull) {
    throw new Error(`NotebookLM 返回空结果：${rpcId}`);
  }
  return result;
}

async function listStudioArtifactsRaw(notebookId) {
  const result = await callNotebookRpc(
    RPC_METHODS.LIST_ARTIFACTS,
    [[2], notebookId, 'NOT artifact.status = "ARTIFACT_STATUS_SUGGESTED"'],
    notebookId,
    { allowNull: true }
  );

  if (Array.isArray(result?.[0])) {
    return result[0];
  }
  if (Array.isArray(result)) {
    return result;
  }
  return [];
}

async function listMindMapsRaw(notebookId) {
  const result = await callNotebookRpc(
    RPC_METHODS.GET_NOTES_AND_MIND_MAPS,
    [notebookId],
    notebookId,
    { allowNull: true }
  );

  const allItems = Array.isArray(result?.[0]) ? result[0] : [];
  return allItems.filter((item) => {
    if (!Array.isArray(item) || !item.length) {
      return false;
    }
    if (item[1] == null && item[2] === 2) {
      return false;
    }

    const content = typeof item[1] === "string"
      ? item[1]
      : Array.isArray(item[1]) && typeof item[1][1] === "string"
        ? item[1][1]
        : "";

    return content.includes('"children":') || content.includes('"nodes":');
  });
}

async function listNotesRaw(notebookId) {
  const result = await callNotebookRpc(
    RPC_METHODS.GET_NOTES_AND_MIND_MAPS,
    [notebookId],
    notebookId,
    { allowNull: true }
  );

  const allItems = Array.isArray(result?.[0]) ? result[0] : [];
  return allItems.filter((item) => {
    if (!Array.isArray(item) || !item.length) {
      return false;
    }
    const content = typeof item[1] === "string"
      ? item[1]
      : Array.isArray(item[1]) && typeof item[1][1] === "string"
        ? item[1][1]
        : "";
    if (!content) {
      return false;
    }
    return !content.includes('"children":') && !content.includes('"nodes":');
  });
}

function parseStudioArtifactTimestamp(item) {
  if (Array.isArray(item?.[15]) && item[15].length > 0) {
    const value = Number(item[15][0]);
    return Number.isFinite(value) ? value : 0;
  }
  return 0;
}

function parseMindMapTimestamp(item) {
  if (
    Array.isArray(item?.[1]) &&
    Array.isArray(item[1][2]) &&
    Array.isArray(item[1][2][2]) &&
    item[1][2][2].length > 0
  ) {
    const value = Number(item[1][2][2][0]);
    return Number.isFinite(value) ? value : 0;
  }
  return 0;
}

function collectHttpUrlsFromValue(value, bucket = []) {
  if (typeof value === "string") {
    if (value.startsWith("http")) {
      bucket.push(value);
    }
    return bucket;
  }
  if (Array.isArray(value)) {
    for (const child of value) {
      collectHttpUrlsFromValue(child, bucket);
    }
    return bucket;
  }
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) {
      collectHttpUrlsFromValue(child, bucket);
    }
  }
  return bucket;
}

function classifyArtifactDownloadUrls(rawItem) {
  const allUrls = Array.from(new Set(collectHttpUrlsFromValue(rawItem)));
  const byExt = {
    pdf: "",
    pptx: "",
    json: "",
    csv: "",
    markdown: "",
    html: "",
    text: "",
    media: "",
    image: "",
    primary: ""
  };

  const pick = (matcher) => allUrls.find((url) => matcher(url)) || "";
  const lower = (url) => url.toLowerCase();

  byExt.pdf = pick((url) => lower(url).includes(".pdf"));
  byExt.pptx = pick((url) => lower(url).includes(".pptx"));
  byExt.json = pick((url) => lower(url).includes(".json"));
  byExt.csv = pick((url) => lower(url).includes(".csv"));
  byExt.markdown = pick((url) => /\.md(?:own)?(\?|$)/i.test(url));
  byExt.html = pick((url) => /\.html?(\?|$)/i.test(url));
  byExt.text = pick((url) => /\.txt(\?|$)/i.test(url));
  byExt.media = pick((url) => /\.(mp3|m4a|wav|ogg|aac|mp4|webm|mov)(\?|$)/i.test(url));
  byExt.image = pick((url) => /\.(png|jpg|jpeg|webp|gif|svg)(\?|$)/i.test(url));

  byExt.primary = byExt.media
    || byExt.image
    || byExt.csv
    || byExt.markdown
    || byExt.html
    || byExt.text
    || byExt.json
    || byExt.pdf
    || byExt.pptx
    || allUrls[0]
    || "";

  return byExt;
}

function getKindExportFormats(kind, links) {
  if (kind === "mind_map") {
    return ["json"];
  }
  if (kind === "note") {
    return ["markdown", "json"];
  }
  if (kind === "slide_deck") {
    return [links.pdf ? "pdf" : "", links.pptx ? "pptx" : ""].filter(Boolean);
  }
  if (kind === "data_table") {
    return [links.csv ? "csv" : links.primary ? "file" : ""].filter(Boolean);
  }
  if (kind === "audio") {
    return [links.media ? "audio" : links.primary ? "file" : ""].filter(Boolean);
  }
  if (kind === "video") {
    return [links.media ? "video" : links.primary ? "file" : ""].filter(Boolean);
  }
  if (kind === "infographic") {
    return [links.image ? "image" : links.primary ? "file" : ""].filter(Boolean);
  }
  if (kind === "quiz" || kind === "flashcards") {
    return [links.json ? "json" : "", links.markdown ? "markdown" : "", links.html ? "html" : "", links.primary ? "file" : ""].filter(Boolean);
  }
  if (kind === "report") {
    return [links.markdown ? "markdown" : "", links.html ? "html" : "", links.json ? "json" : "", links.text ? "txt" : "", links.primary ? "file" : ""].filter(Boolean);
  }
  return [links.primary ? "file" : ""].filter(Boolean);
}

function buildArtifactAvailabilityFromRaw(notebookId, studioArtifacts, mindMaps, notes) {
  const completedStudioItems = studioArtifacts
    .filter((item) => Array.isArray(item) && item[4] === 3)
    .map((item) => {
      const kind = mapStudioArtifactKind(item);
      const links = classifyArtifactDownloadUrls(item);
      return {
        id: String(item[0] || ""),
        title: String(item[1] || ""),
        createdAt: parseStudioArtifactTimestamp(item),
        kind,
        raw: item,
        links,
        exportFormats: getKindExportFormats(kind, links)
      };
    })
    .sort((left, right) => right.createdAt - left.createdAt);

  const slideDecks = studioArtifacts.filter((item) => Array.isArray(item) && item[2] === 8);
  const completedSlideDecks = slideDecks.filter((item) => item[4] === 3);

  const slideCandidates = completedSlideDecks
    .map((item) => {
      const metadata = Array.isArray(item[16]) ? item[16] : [];
      const pdfUrl = typeof metadata[3] === "string" && metadata[3].startsWith("http") ? metadata[3] : "";
      const pptxUrl = typeof metadata[4] === "string" && metadata[4].startsWith("http") ? metadata[4] : "";
      return {
        id: String(item[0] || ""),
        title: String(item[1] || ""),
        createdAt: parseStudioArtifactTimestamp(item),
        pdfUrl,
        pptxUrl
      };
    })
    .sort((left, right) => right.createdAt - left.createdAt);

  const latestPdf = slideCandidates.find((item) => item.pdfUrl);
  const latestPptx = slideCandidates.find((item) => item.pptxUrl);

  const mindMapCandidates = mindMaps
    .map((item) => {
      const title = Array.isArray(item[1]) && typeof item[1][4] === "string" ? item[1][4] : "Mind Map";
      const content = typeof item[1] === "string"
        ? item[1]
        : Array.isArray(item[1]) && typeof item[1][1] === "string"
          ? item[1][1]
          : "";

      return {
        id: String(item[0] || ""),
        title,
        createdAt: parseMindMapTimestamp(item),
        content
      };
    })
    .sort((left, right) => right.createdAt - left.createdAt);

  const latestMindMap = mindMapCandidates[0] || null;
  const noteCandidates = (notes || [])
    .map((item) => {
      const title = Array.isArray(item[1]) && typeof item[1][4] === "string" ? item[1][4] : "Note";
      const content = typeof item[1] === "string"
        ? item[1]
        : Array.isArray(item[1]) && typeof item[1][1] === "string"
          ? item[1][1]
          : "";
      const id = String(item[0] || "");
      return {
        id,
        title,
        createdAt: parseMindMapTimestamp(item),
        content,
        kind: "note",
        raw: item,
        links: {},
        exportFormats: ["markdown", "json"]
      };
    })
    .filter((item) => item.content)
    .sort((left, right) => right.createdAt - left.createdAt);
  const latestNote = noteCandidates[0] || null;
  const itemsForByKind = [...completedStudioItems, ...noteCandidates];

  return {
    ok: true,
    notebookId,
    allStudioItems: completedStudioItems,
    mindMap: {
      count: mindMaps.length,
      completedCount: mindMaps.length,
      latestTitle: latestMindMap?.title || "",
      supported: Boolean(latestMindMap),
      latestContent: latestMindMap?.content || "",
      items: mindMapCandidates
    },
    note: {
      count: noteCandidates.length,
      completedCount: noteCandidates.length,
      latestTitle: latestNote?.title || "",
      supported: Boolean(latestNote),
      latestContent: latestNote?.content || "",
      items: noteCandidates
    },
    slideDeck: {
      count: slideDecks.length,
      completedCount: completedSlideDecks.length,
      latestTitle: slideCandidates[0]?.title || "",
      pdfSupported: Boolean(latestPdf?.pdfUrl),
      pptxPossible: Boolean(latestPptx?.pptxUrl),
      pdfReadyCount: slideCandidates.filter((item) => item.pdfUrl).length,
      pptxReadyCount: slideCandidates.filter((item) => item.pptxUrl).length,
      latestPdfUrl: latestPdf?.pdfUrl || "",
      latestPptxUrl: latestPptx?.pptxUrl || "",
      items: slideCandidates
    },
    byKind: itemsForByKind.reduce((acc, item) => {
      const key = item.kind || "unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {})
  };
}

async function inspectArtifactAvailability(forceRefresh) {
  const notebookId = getNotebookId();
  if (!notebookId) {
    state.artifactAvailability = null;
    state.artifactAvailabilityNotebookId = '';
    state.artifactNativeMenuMap = {};
    state.artifactInspecting = false;
    renderArtifactView();
    return;
  }

  if (!forceRefresh && state.artifactAvailabilityNotebookId === notebookId && state.artifactAvailability) {
    state.artifactNativeMenuMap = state.artifactNativeMenus?.[notebookId] || {};
    return;
  }

  state.artifactInspecting = true;
  state.artifactAvailabilityNotebookId = notebookId;
  if (forceRefresh) {
    state.artifactCommandFeedback = '';
  }
  renderArtifactView();

  try {
    const [studioArtifacts, mindMaps, notes] = await Promise.all([
      listStudioArtifactsRaw(notebookId),
      listMindMapsRaw(notebookId),
      listNotesRaw(notebookId)
    ]);
    state.artifactAvailability = buildArtifactAvailabilityFromRaw(notebookId, studioArtifacts, mindMaps, notes);
    state.artifactNativeMenuMap = state.artifactNativeMenus?.[notebookId] || {};
    state.artifactCommandFeedback = `识别完成：思维导图 ${state.artifactAvailability.mindMap.completedCount} 个，笔记 ${state.artifactAvailability.note?.completedCount || 0} 个，PPT ${state.artifactAvailability.slideDeck.completedCount} 个。`;
    state.artifactCommandFeedback = `识别完成：思维导图 ${state.artifactAvailability.mindMap.completedCount} 个，PPT ${state.artifactAvailability.slideDeck.completedCount} 个。`;
    state.artifactCommandFeedback = `识别完成：思维导图 ${state.artifactAvailability.mindMap.completedCount} 个，笔记 ${state.artifactAvailability.note?.completedCount || 0} 个，PPT ${state.artifactAvailability.slideDeck.completedCount} 个。`;
  } catch (error) {
    state.artifactAvailability = {
      mindMap: { supported: false, completedCount: 0, latestTitle: '', items: [] },
      note: { supported: false, completedCount: 0, latestTitle: '', items: [] },
      slideDeck: { pdfSupported: false, pptxPossible: false, completedCount: 0, latestTitle: '', items: [] }
    };
    state.artifactNativeMenuMap = state.artifactNativeMenus?.[notebookId] || {};
    state.artifactCommandFeedback = `识别失败：${String(error)}`;
  }

  state.artifactInspecting = false;
  renderArtifactView();
  renderArtifactManagerView();
}

async function exportArtifactLegacy(kind) {
  const notebookId = getNotebookId();
  if (!notebookId) {
    state.artifactCommandFeedback = '当前页面没有识别到 notebook id。';
    renderArtifactView();
    return;
  }

  const config = {
    'mind-map': { artifactType: 'mind-map', format: 'json' },
    'slide-pdf': { artifactType: 'slide-deck', format: 'pdf' },
    'slide-pptx': { artifactType: 'slide-deck', format: 'pptx' },
    audio: { artifactType: 'audio', format: 'auto' },
    video: { artifactType: 'video', format: 'auto' },
    infographic: { artifactType: 'infographic', format: 'auto' },
    quiz: { artifactType: 'quiz', format: 'structured' },
    flashcards: { artifactType: 'flashcards', format: 'structured' },
    report: { artifactType: 'report', format: 'structured' },
    study_guide: { artifactType: 'study_guide', format: 'structured' },
    briefing_doc: { artifactType: 'briefing_doc', format: 'structured' },
    blog_post: { artifactType: 'blog_post', format: 'structured' },
    data_table: { artifactType: 'data_table', format: 'structured' }
  }[kind];

  if (!config) {
    return;
  }

  if (!state.artifactAvailability || state.artifactAvailabilityNotebookId !== notebookId) {
    await inspectArtifactAvailability(true);
  }

  const availability = state.artifactAvailability;
  const selectedArtifact = getSelectedArtifactItem(kind, availability);
  if (!selectedArtifact || !canExportSelectedArtifact(kind, availability, notebookId)) {
    state.artifactCommandFeedback = "当前 notebook 还没有可导出的对应产物。";
    renderArtifactView();
    return;
  }

  state.artifactCommandFeedback = '正在通过扩展直接导出...';
  renderArtifactView();

  try {
    if (kind === "mind-map") {
      const raw = selectedArtifact.item?.content || "";
      const jsonText = formatMindMapJson(raw);
      const fileName = buildArtifactFileName(getNotebookName(), selectedArtifact.item?.title || "mind-map", "json");
      const blob = new Blob([`\uFEFF${jsonText}`], { type: "application/json;charset=utf-8" });
      const url = await blobToDataUrl(blob);

      const response = await chrome.runtime.sendMessage({
        type: "nlsf:download",
        payload: {
          url,
          filename: fileName
        }
      });

      if (!response?.ok) {
        throw new Error(response?.error || "思维导图下载失败");
      }

      state.artifactCommandFeedback = `导出完成：${fileName}`;
      renderArtifactView();
      return;
    }

    const url = kind === "slide-pptx"
      ? selectedArtifact.item?.pptxUrl
      : kind === "slide-pdf"
        ? selectedArtifact.item?.pdfUrl
        : chooseDirectExportUrl(selectedArtifact.item, kind);

    if (!url) {
      throw new Error("没有找到可用的下载地址。");
    }

    const extension = kind === "slide-pptx"
      ? "pptx"
      : kind === "slide-pdf"
        ? "pdf"
        : inferFileExtensionFromUrl(url);

    const fileName = buildArtifactFileName(
      getNotebookName(),
      selectedArtifact.item?.title || config.artifactType || "artifact",
      extension
    );

    const response = await chrome.runtime.sendMessage({
      type: "nlsf:download-direct",
      payload: {
        url,
        filename: fileName
      }
    });

    if (!response?.ok) {
      throw new Error(response?.error || "下载失败");
    }

    state.artifactCommandFeedback = `导出完成：${fileName}`;
  } catch (error) {
    state.artifactCommandFeedback = `导出失败：${String(error)}`;
  }

  renderArtifactView();
}

function formatMindMapJson(rawContent) {
  try {
    return JSON.stringify(JSON.parse(rawContent), null, 2);
  } catch {
    return rawContent || "{}";
  }
}

function buildArtifactFileName(notebookName, artifactType, extension) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `notebooklm-study-flow/${slugify(notebookName)}-${artifactType}-${stamp}.${extension}`;
}

function inferFileExtensionFromUrl(url) {
  const value = String(url || "").toLowerCase();
  if (!value) {
    return "bin";
  }

  const match = value.match(/\.([a-z0-9]{2,6})(?:[?#]|$)/i);
  if (match?.[1]) {
    return match[1];
  }

  if (value.includes("mime=audio") || value.includes("/audio/")) return "mp3";
  if (value.includes("mime=video") || value.includes("/video/")) return "mp4";
  if (value.includes("mime=image") || value.includes("/image/")) return "png";
  if (value.includes("pdf")) return "pdf";
  if (value.includes("pptx")) return "pptx";
  if (value.includes("html")) return "html";
  if (value.includes("markdown") || value.includes(".md")) return "md";
  if (value.includes("text") || value.includes(".txt")) return "txt";
  if (value.includes("json")) return "json";
  if (value.includes("csv")) return "csv";
  return "bin";
}

function chooseDirectExportUrl(item, kind) {
  const links = item?.links || {};
  if (kind === "data_table") {
    return links.csv || links.primary || "";
  }
  if (kind === "quiz" || kind === "flashcards") {
    return links.json || links.markdown || links.html || links.primary || "";
  }
  if (kind === "report") {
    return links.markdown || links.html || links.text || links.json || links.primary || "";
  }
  if (kind === "audio" || kind === "video" || kind === "infographic") {
    return links.primary || "";
  }
  return links.primary || "";
}

function collectArtifactTextCandidates(value, bucket = []) {
  if (typeof value === "string") {
    const text = value.trim();
    if (text && !text.startsWith("http")) {
      bucket.push(text);
    }
    return bucket;
  }
  if (Array.isArray(value)) {
    for (const child of value) {
      collectArtifactTextCandidates(child, bucket);
    }
    return bucket;
  }
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) {
      collectArtifactTextCandidates(child, bucket);
    }
  }
  return bucket;
}

function buildStructuredArtifactFallback(item, kind) {
  const raw = item?.raw;
  const title = item?.title || kind || "artifact";
  if (!raw) {
    return null;
  }

  if (kind === "quiz" || kind === "flashcards" || kind === "data_table") {
    return {
      extension: "json",
      mime: "application/json;charset=utf-8",
      content: JSON.stringify(raw, null, 2)
    };
  }

  if (kind === "note") {
    const noteText = String(item?.content || "").trim();
    if (noteText) {
      return {
        extension: "md",
        mime: "text/markdown;charset=utf-8",
        content: `# ${title}\n\n${noteText}`
      };
    }
    return {
      extension: "json",
      mime: "application/json;charset=utf-8",
      content: JSON.stringify(raw, null, 2)
    };
  }

  if (kind === "report") {
    const candidates = Array.from(new Set(collectArtifactTextCandidates(raw)));
    const longText = candidates
      .filter((text) => text.length > 20)
      .sort((a, b) => b.length - a.length)
      .slice(0, 20);

    if (longText.length) {
      return {
        extension: "md",
        mime: "text/markdown;charset=utf-8",
        content: `# ${title}\n\n${longText.join("\n\n")}`
      };
    }
  }

  return {
    extension: "json",
    mime: "application/json;charset=utf-8",
    content: JSON.stringify(raw, null, 2)
  };
}

async function exportSelectedArtifacts(kind) {
  const notebookId = getNotebookId();
  if (!notebookId) {
    state.artifactCommandFeedback = "No notebook id on current page.";
    renderArtifactView();
    return;
  }

  if (!state.artifactAvailability || state.artifactAvailabilityNotebookId !== notebookId) {
    await inspectArtifactAvailability(true);
  }
  const availability = state.artifactAvailability;
  const selectedIds = getSelectedArtifactIdsForKind(kind, availability);
  if (!selectedIds.length) {
    state.artifactCommandFeedback = "Please select at least one artifact.";
    renderArtifactView();
    return;
  }

  const originalSelection = [...selectedIds];
  let successCount = 0;
  let failCount = 0;

  for (let index = 0; index < originalSelection.length; index += 1) {
    const id = originalSelection[index];
    setSelectedArtifactIdsForKind(kind, [id]);
    state.selectedArtifactItemId = id;
    state.artifactCommandFeedback = `Exporting ${index + 1}/${originalSelection.length}...`;
    renderArtifactView();

    await exportArtifact(kind);
    const feedback = String(state.artifactCommandFeedback || "").toLowerCase();
    const failed = feedback.includes("失败") || feedback.includes("failed") || feedback.includes("error");
    if (failed) {
      failCount += 1;
    } else {
      successCount += 1;
    }
  }

  setSelectedArtifactIdsForKind(kind, originalSelection);
  state.artifactCommandFeedback = failCount
    ? `Batch done. Success ${successCount}, failed ${failCount}.`
    : `Batch done. Success ${successCount}/${originalSelection.length}.`;
  renderArtifactView();
}

async function exportArtifact(kind) {
  const notebookId = getNotebookId();
  if (!notebookId) {
    state.artifactCommandFeedback = "当前页面没有识别到 notebook id。";
    renderArtifactView();
    return;
  }

  const config = {
    "mind-map": { artifactType: "mind-map", format: "json" },
    "slide-pdf": { artifactType: "slide-deck", format: "pdf" },
    "slide-pptx": { artifactType: "slide-deck", format: "pptx" },
    audio: { artifactType: "audio", format: "auto" },
    video: { artifactType: "video", format: "auto" },
    infographic: { artifactType: "infographic", format: "auto" },
    quiz: { artifactType: "quiz", format: "structured" },
    flashcards: { artifactType: "flashcards", format: "structured" },
    report: { artifactType: "report", format: "structured" },
    note: { artifactType: "note", format: "structured" },
    data_table: { artifactType: "data_table", format: "structured" }
  }[kind];

  if (!config) {
    return;
  }

  if (!state.artifactAvailability || state.artifactAvailabilityNotebookId !== notebookId) {
    await inspectArtifactAvailability(true);
  }

  const availability = state.artifactAvailability;
  const selectedArtifact = getSelectedArtifactItem(kind, availability);
  if (!selectedArtifact || !canExportSelectedArtifact(kind, availability, notebookId)) {
    state.artifactCommandFeedback = "当前 notebook 还没有可导出的对应产物。";
    renderArtifactView();
    return;
  }

  state.artifactCommandFeedback = "正在通过扩展执行导出...";
  renderArtifactView();

  try {
    if (kind === "mind-map") {
      const raw = selectedArtifact.item?.content || "";
      const jsonText = formatMindMapJson(raw);
      const fileName = buildArtifactFileName(getNotebookName(), selectedArtifact.item?.title || "mind-map", "json");
      const blob = new Blob([`\uFEFF${jsonText}`], { type: "application/json;charset=utf-8" });
      const url = await blobToDataUrl(blob);

      const response = await chrome.runtime.sendMessage({
        type: "nlsf:download",
        payload: {
          url,
          filename: fileName
        }
      });

      if (!response?.ok) {
        throw new Error(response?.error || "思维导图下载失败");
      }

      state.artifactCommandFeedback = `导出完成：${fileName}`;
      renderArtifactView();
      return;
    }

    const directUrl = kind === "slide-pptx"
      ? selectedArtifact.item?.pptxUrl
      : kind === "slide-pdf"
        ? selectedArtifact.item?.pdfUrl
        : chooseDirectExportUrl(selectedArtifact.item, kind);

    if (directUrl) {
      const extension = kind === "slide-pptx"
        ? "pptx"
        : kind === "slide-pdf"
          ? "pdf"
          : inferFileExtensionFromUrl(directUrl);

      const fileName = buildArtifactFileName(
        getNotebookName(),
        selectedArtifact.item?.title || config.artifactType || "artifact",
        extension
      );

      const response = await chrome.runtime.sendMessage({
        type: "nlsf:download-direct",
        payload: {
          url: directUrl,
          filename: fileName
        }
      });

      if (!response?.ok) {
        throw new Error(response?.error || "下载失败");
      }

      state.artifactCommandFeedback = `导出完成：${fileName}`;
      renderArtifactView();
      return;
    }

    const structured = buildStructuredArtifactFallback(selectedArtifact.item, kind);
    if (!structured) {
      throw new Error("没有可用下载地址，且无法构建结构化导出。");
    }

    const fileName = buildArtifactFileName(
      getNotebookName(),
      selectedArtifact.item?.title || config.artifactType || "artifact",
      structured.extension
    );
    const blob = new Blob([`\uFEFF${structured.content}`], { type: structured.mime });
    const dataUrl = await blobToDataUrl(blob);
    const response = await chrome.runtime.sendMessage({
      type: "nlsf:download",
      payload: {
        url: dataUrl,
        filename: fileName
      }
    });

    if (!response?.ok) {
      throw new Error(response?.error || "结构化导出失败");
    }

    state.artifactCommandFeedback = `导出完成：${fileName}`;
  } catch (error) {
    state.artifactCommandFeedback = `导出失败：${String(error)}`;
  }

  renderArtifactView();
}

function savePromptFromForm() {
  const titleInput = root.querySelector('input[name="prompt-title"]');
  const tagsInput = root.querySelector('input[name="prompt-tags"]');
  const contentInput = root.querySelector('textarea[name="prompt-content"]');
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) {
    return;
  }

  const now = new Date().toISOString();
  const tags = splitTags(tagsInput.value);
  const variables = Array.from(content.matchAll(/\{\{(.*?)\}\}/g)).map((match) => match[1].trim());

  if (state.editingPromptId) {
    state.prompts = state.prompts.map((prompt) => {
      if (prompt.id !== state.editingPromptId) {
        return prompt;
      }

      return {
        ...prompt,
        title,
        content,
        tags,
        variables,
        updatedAt: now
      };
    });
  } else {
    state.prompts.unshift({
      id: crypto.randomUUID(),
      title,
      content,
      tags,
      variables,
      createdAt: now,
      updatedAt: now
    });
  }

  clearPromptForm();

  persistPrompts().then(renderPromptView);
}

function deletePrompt(promptId) {
  state.prompts = state.prompts.filter((prompt) => prompt.id !== promptId);
  if (state.editingPromptId === promptId) {
    clearPromptForm();
  }
  persistPrompts().then(renderPromptView);
}

function startPromptEdit(promptId) {
  const prompt = state.prompts.find((item) => item.id === promptId);
  if (!prompt) {
    return;
  }

  openPromptComposer(promptId);
}

function cancelPromptEdit() {
  clearPromptForm();
  renderPromptView();
}

function clearPromptForm() {
  state.editingPromptId = null;
  state.promptComposerOpen = false;
}

function openPromptComposer(promptId = null) {
  state.editingPromptId = promptId;
  state.promptComposerOpen = true;
  renderPromptView();
}

function closePromptComposer() {
  clearPromptForm();
  renderPromptView();
}

function insertPrompt(promptId) {
  const prompt = state.prompts.find((item) => item.id === promptId);
  const editor = findPromptInput();
  if (!prompt || !editor) {
    return;
  }

  const content = applyTemplateVariables(prompt.content);
  editor.focus();
  editor.value = content;
  editor.dispatchEvent(new Event("input", { bubbles: true }));
}

function findPromptInput() {
  const selectors = [
    "textarea.query-box-input",
    "textarea",
    '[contenteditable="true"]'
  ];

  for (const selector of selectors) {
    const node = document.querySelector(selector);
    if (node && isVisible(node)) {
      return node;
    }
  }

  return null;
}

function isConversationTabActive() {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const activeIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  if (activeIndex === 1) {
    return true;
  }

  return Boolean(findPromptInput());
}

function applyTemplateVariables(content) {
  return content.replace(/\{\{(.*?)\}\}/g, (_, rawKey) => {
    const key = rawKey.trim();
    if (key === "course") {
      return getNotebookName();
    }
    if (key === "date") {
      return new Date().toLocaleDateString();
    }
    return "";
  });
}

async function persistPrompts() {
  await safeStorageSet({ [STORAGE_KEYS.prompts]: state.prompts });
}

async function persistExports() {
  await safeStorageSet({ [STORAGE_KEYS.exports]: state.exports });
}

async function persistArtifactLibrary() {
  await safeStorageSet({ [STORAGE_KEYS.artifactLibrary]: state.artifactLibrary });
}

async function createArtifactFolder() {
  const notebookId = getNotebookId();
  const name = state.artifactFolderDraft.trim();
  if (!notebookId || !name) {
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);
  const folderId = `folder-${crypto.randomUUID()}`;
  library.folders.push({
    id: folderId,
    name,
    parentId: null
  });
  state.expandedArtifactFolders[folderId] = true;
  state.artifactFolderDraft = "";
  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

function getFolderDepth(library, folderId) {
  let depth = 0;
  let current = library.folders.find((f) => f.id === folderId);
  while (current?.parentId) {
    depth++;
    current = library.folders.find((f) => f.id === current.parentId);
  }
  return depth;
}

function isCustomArtifactFolder(folderId) {
  return Boolean(folderId) && folderId !== "all" && folderId !== "folder-default-unfiled";
}

async function createArtifactSubfolder() {
  const notebookId = getNotebookId();
  const parentId = state.subfolderTargetId;
  const name = state.subfolderDraft.trim();
  if (!notebookId || !parentId || !name) {
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);
  if (getFolderDepth(library, parentId) >= 4) {
    return;
  }
  const folderId = `folder-${crypto.randomUUID()}`;
  library.folders.push({ id: folderId, name, parentId });
  state.expandedArtifactFolders[folderId] = true;
  state.expandedArtifactFolders[parentId] = true;
  state.subfolderTargetId = null;
  state.subfolderDraft = "";
  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

async function renameArtifactFolder(folderId) {
  const notebookId = getNotebookId();
  const name = state.renamingFolderDraft.trim();
  if (!notebookId || !folderId || !name) {
    state.renamingFolderId = null;
    state.renamingFolderDraft = "";
    renderArtifactManagerView();
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);
  const folder = library.folders.find((f) => f.id === folderId);
  if (folder) {
    folder.name = name;
  }
  state.renamingFolderId = null;
  state.renamingFolderDraft = "";
  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

async function moveFolderToParent(folderId, newParentId) {
  const notebookId = getNotebookId();
  if (!notebookId || !folderId || !isCustomArtifactFolder(folderId)) {
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);
  const folder = library.folders.find((f) => f.id === folderId);
  if (!folder) {
    return;
  }

  // "all" drop target means move to root
  if (newParentId === "all") {
    folder.parentId = null;
  } else if (isCustomArtifactFolder(newParentId)) {
    const target = library.folders.find((f) => f.id === newParentId);
    if (!target) {
      return;
    }
    // Allow max depth 4 (5 levels total): target depth + 1 must not exceed 4
    if (getFolderDepth(library, newParentId) >= 4) {
      return;
    }
    // Can't drop a folder onto itself or onto one of its own descendants
    const getDescendants = (id) => {
      const children = library.folders.filter((f) => f.parentId === id).map((f) => f.id);
      return children.flatMap((cid) => [cid, ...getDescendants(cid)]);
    };
    if (newParentId === folderId || getDescendants(folderId).includes(newParentId)) {
      return;
    }
    folder.parentId = newParentId;
    state.expandedArtifactFolders[newParentId] = true;
  }

  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

async function deleteArtifactFolder(folderId) {
  const notebookId = getNotebookId();
  if (!notebookId || !isCustomArtifactFolder(folderId)) {
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);

  // Collect child folder IDs before deletion
  const childFolderIds = library.folders.filter((f) => f.parentId === folderId).map((f) => f.id);

  library.folders = library.folders.filter((folder) => folder.id !== folderId);

  // Promote children to root level
  for (const folder of library.folders) {
    if (folder.parentId === folderId) {
      folder.parentId = null;
    }
  }

  for (const key of Object.keys(library.assignments)) {
    if (library.assignments[key] === folderId || childFolderIds.includes(library.assignments[key])) {
      library.assignments[key] = "folder-default-unfiled";
    }
  }

  delete state.expandedArtifactFolders[folderId];
  if (state.selectedArtifactFolderId === folderId) {
    state.selectedArtifactFolderId = "all";
  }

  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

function isArtifactFolderExpanded(folderId) {
  return state.expandedArtifactFolders[folderId] ?? folderId === "all";
}

function toggleArtifactFolderExpand(folderId) {
  state.expandedArtifactFolders[folderId] = !isArtifactFolderExpanded(folderId);
  renderArtifactManagerView();
}

function getArtifactItemByKey(artifactKey) {
  const availability = state.artifactAvailability;
  const items = getUnifiedArtifactItems(availability);
  return items.find((item) => item.key === artifactKey) || null;
}

async function moveArtifactToFolder(artifactKey, folderId) {
  const notebookId = getNotebookId();
  if (!notebookId || !artifactKey || !folderId) {
    return;
  }

  const library = ensureArtifactLibraryForNotebook(notebookId);
  library.assignments[artifactKey] = folderId;
  const artifact = getArtifactItemByKey(artifactKey);
  if (artifact?.id) {
    for (const key of Object.keys(library.assignments)) {
      if (key !== artifactKey && key.endsWith(`:${artifact.id}`)) {
        delete library.assignments[key];
      }
    }
  }
  await persistArtifactLibrary();
  renderArtifactView();
  renderArtifactManagerView();
}

function handleDragStart(event) {
  // Check if dragging a folder header
  const folderHeader = event.target.closest?.("[data-folder-drag-id]");
  if (folderHeader && event.dataTransfer) {
    event.dataTransfer.setData("application/nlsf-folder-id", folderHeader.dataset.folderDragId || "");
    event.dataTransfer.effectAllowed = "move";
    return;
  }

  const artifact = event.target.closest?.("[data-artifact-key]");
  if (!artifact || !event.dataTransfer) {
    return;
  }

  event.dataTransfer.setData("text/plain", artifact.dataset.artifactKey || "");
  event.dataTransfer.effectAllowed = "move";
}

function handleDragOver(event) {
  const dropTarget = event.target.closest?.("[data-folder-drop]");
  if (!dropTarget) {
    return;
  }
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDrop(event) {
  const dropTarget = event.target.closest?.("[data-folder-drop]");
  if (!dropTarget || !event.dataTransfer) {
    return;
  }

  event.preventDefault();
  const folderId = dropTarget.dataset.folderDrop;

  const draggedFolderId = event.dataTransfer.getData("application/nlsf-folder-id");
  if (draggedFolderId) {
    if (draggedFolderId !== folderId) {
      void moveFolderToParent(draggedFolderId, folderId);
    }
    return;
  }

  const artifactKey = event.dataTransfer.getData("text/plain");
  if (!artifactKey || !folderId) {
    return;
  }
  void moveArtifactToFolder(artifactKey, folderId);
}

function normalizeUiText(value) {
  return normalizeText(String(value || "")).toLowerCase();
}

function getArtifactSearchTerms(artifact) {
  if (!artifact) {
    return [];
  }

  const terms = new Set();
  const id = String(artifact.id || "").trim();
  const title = normalizeUiText(artifact.openTitle || artifact.title || "");
  const key = String(artifact.key || "").trim();
  if (id) terms.add(id);
  if (title) terms.add(title);
  if (key) terms.add(key);
  return Array.from(terms);
}

function escapeCssValue(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(String(value));
  }
  return String(value).replace(/["\\]/g, "\\$&");
}

function findStudioArtifactNodeById(artifactId) {
  const id = String(artifactId || "").trim();
  if (!id || id.startsWith("dom:")) {
    return null;
  }

  const escapedId = escapeCssValue(id);
  const directSelectors = [
    `button[aria-labelledby*="${escapedId}"]`,
    `button[aria-describedby*="${escapedId}"]`,
    `button[jslog*="${escapedId}"]`,
    `[id="artifact-labels-${escapedId}"]`,
    `[id="note-labels-${escapedId}"]`
  ];

  for (const selector of directSelectors) {
    const match = document.querySelector(selector);
    if (!match) {
      continue;
    }
    const clickable = match.tagName === "BUTTON" ? match : getClickableAncestor(match);
    if (clickable && isVisible(clickable)) {
      return clickable;
    }
  }

  const labeledNode = document.getElementById(`artifact-labels-${id}`);
  const labeledButton = getClickableAncestor(labeledNode);
  if (labeledButton && isVisible(labeledButton)) {
    return labeledButton;
  }

  const noteLabeledNode = document.getElementById(`note-labels-${id}`);
  const noteLabeledButton = getClickableAncestor(noteLabeledNode);
  if (noteLabeledButton && isVisible(noteLabeledButton)) {
    return noteLabeledButton;
  }

  return null;
}

function getClickableAncestor(node) {
  return node?.closest?.(
    'button, [role="button"], a, [tabindex], article, li, [data-testid], [data-id], [jsaction]'
  ) || node || null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getNodeLabelReferenceText(node) {
  if (!node?.getAttribute) {
    return "";
  }

  const ids = [
    node.getAttribute("aria-labelledby"),
    node.getAttribute("aria-describedby")
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(/\s+/))
    .map((value) => value.trim())
    .filter(Boolean);

  if (!ids.length) {
    return "";
  }

  return normalizeUiText(
    ids
      .map((id) => document.getElementById(id)?.textContent || "")
      .filter(Boolean)
      .join(" ")
  );
}

function findStudioArtifactMoreButtonById(artifactId) {
  const id = String(artifactId || "").trim();
  if (!id || id.startsWith("dom:")) {
    return null;
  }

  const escapedId = escapeCssValue(id);
  const selectors = [
    `button.artifact-more-button[jslog*="${escapedId}"]`,
    `button[aria-label="更多"][jslog*="${escapedId}"]`
  ];

  for (const selector of selectors) {
    const button = document.querySelector(selector);
    if (button && isVisible(button)) {
      return button;
    }
  }

  return null;
}

function findArtifactLibraryMoreButtonByTitle(title) {
  const expected = normalizeUiText(title || "");
  if (!expected) {
    return null;
  }

  const rows = Array.from(document.querySelectorAll("artifact-library-item, artifact-library-note"));
  for (const row of rows) {
    const text = normalizeUiText(row.textContent || "");
    if (!text.includes(expected)) {
      continue;
    }
    const button = row.querySelector("button.artifact-more-button");
    if (button && isVisible(button)) {
      return button;
    }
  }

  return null;
}

function findVisibleMenuItemByLabel(label) {
  const expected = normalizeUiText(label);
  return Array.from(document.querySelectorAll('[role="menuitem"], button'))
    .filter((node) => isVisible(node))
    .find((node) => normalizeUiText(node.textContent || node.getAttribute?.("aria-label") || "").includes(expected)) || null;
}

function findVisibleDialogConfirmButton(labels) {
  const normalizedLabels = labels.map((label) => normalizeUiText(label));
  return Array.from(document.querySelectorAll('button, [role="button"]'))
    .filter((node) => isVisible(node))
    .find((node) => {
      const text = normalizeUiText(node.textContent || node.getAttribute?.("aria-label") || "");
      return normalizedLabels.some((label) => text === label || text.includes(label));
    }) || null;
}

async function ensureStudioArtifactListVisible() {
  const hasArtifactList = () =>
    document.querySelectorAll("artifact-library-item, artifact-library-note").length > 0;

  if (hasArtifactList()) {
    return;
  }

  const closePatterns = [
    "关闭演示文稿",
    "关闭思维导图视图",
    "关闭音频概览视图",
    "关闭视频概览视图",
    "关闭报告视图",
    "关闭闪卡视图",
    "关闭测验视图",
    "关闭信息图视图",
    "关闭数据表格视图",
    "关闭",
    "视图"
  ];

  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (hasArtifactList()) {
      return;
    }

    const closeButton = Array.from(document.querySelectorAll('button, [role="button"]'))
      .filter((node) => isVisible(node))
      .find((node) => {
        const text = normalizeUiText(node.getAttribute?.("aria-label") || node.textContent || "");
        if (!text) {
          return false;
        }
        if (text.includes("收起 studio 面板")) {
          return false;
        }
        return closePatterns.some((pattern) => text.includes(normalizeUiText(pattern)));
      });

    if (closeButton) {
      closeButton.click();
      await sleep(420);
      continue;
    }

    const studioCrumb = Array.from(document.querySelectorAll("navigation *, [role='navigation'] *"))
      .filter((node) => isVisible(node))
      .find((node) => normalizeUiText(node.textContent || node.getAttribute?.("aria-label") || "") === "studio");
    const clickableStudioCrumb = getClickableAncestor(studioCrumb);
    if (clickableStudioCrumb && clickableStudioCrumb !== studioCrumb) {
      clickableStudioCrumb.click();
      await sleep(420);
      continue;
    }

    break;
  }
}

function scoreStudioCandidate(node, terms, titleTerm) {
  let score = 0;
  const text = normalizeUiText(node.textContent || "");
  const html = normalizeUiText(node.getAttribute?.("aria-label") || "");
  const labelText = getNodeLabelReferenceText(node);
  const attrs = normalizeUiText([
    node.id,
    node.getAttribute?.("data-id"),
    node.getAttribute?.("data-testid"),
    node.getAttribute?.("href"),
    node.getAttribute?.("jslog"),
    node.getAttribute?.("jsaction")
  ].filter(Boolean).join(" "));

  for (const term of terms) {
    if (!term) continue;
    if (attrs.includes(term)) score += 8;
    if (text === term || html === term || labelText === term) score += 7;
    if (text.includes(term) || html.includes(term) || labelText.includes(term)) score += 5;
  }

  if (titleTerm) {
    if (text === titleTerm || html === titleTerm || labelText === titleTerm) score += 10;
    else if (text.includes(titleTerm) || html.includes(titleTerm) || labelText.includes(titleTerm)) score += 6;
  }

  score -= Math.min((text || labelText).length, 240) / 240;
  return score;
}

function findStudioArtifactNode(artifact) {
  if (!artifact) {
    return null;
  }

  const byId = findStudioArtifactNodeById(artifact.id);
  if (byId) {
    return byId;
  }

  const terms = getArtifactSearchTerms(artifact);
  const titleTerm = normalizeUiText(artifact.openTitle || artifact.title || "");
  const selectors = [
    "button",
    "[role='button']",
    "a",
    "article",
    "[data-testid]",
    "[data-id]",
    "[jsaction]",
    "[tabindex]"
  ];

  const candidates = Array.from(document.querySelectorAll(selectors.join(",")))
    .filter((node) => isVisible(node))
    .map((node) => ({
      node: getClickableAncestor(node),
      score: scoreStudioCandidate(node, terms, titleTerm)
    }))
    .filter((entry) => entry.node && entry.score > 0)
    .sort((left, right) => right.score - left.score);

  return candidates[0]?.node || null;
}

function findStudioTabButton() {
  const candidates = Array.from(document.querySelectorAll('[role="tab"], button, [role="button"]'));
  const labels = ["studio", "工作室", "产物", "artifacts"];
  return candidates.find((node) => {
    if (!isVisible(node)) {
      return false;
    }
    const text = normalizeUiText(node.textContent || node.getAttribute?.("aria-label") || "");
    return labels.some((label) => text.includes(label));
  }) || null;
}

async function ensureStudioTabActive() {
  const tab = findStudioTabButton();
  if (!tab) {
    return false;
  }

  const selected = tab.getAttribute("aria-selected");
  if (selected === "true" || tab.getAttribute("aria-pressed") === "true") {
    return true;
  }

  tab.click();
  await new Promise((resolve) => setTimeout(resolve, 280));
  return true;
}

async function openArtifactInStudio(artifactKey) {
  const artifact = getArtifactItemByKey(artifactKey);
  if (!artifact) {
    state.artifactCommandFeedback = "没有找到这个产物。";
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  await ensureStudioTabActive();
  await ensureStudioArtifactListVisible();
  const target = findStudioArtifactNode(artifact);
  if (!target) {
    state.artifactCommandFeedback = `没有在当前 Studio 页面建立《${artifact.title}》的映射；我已经尝试切到 Studio 并按标题/ID 查找。`;
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  target.scrollIntoView({ block: "center", behavior: "smooth" });
  target.click();
  state.artifactCommandFeedback = `已尝试在 Studio 中打开《${artifact.title}》。`;
  renderArtifactView();
  renderArtifactManagerView();
}

function openArtifactContextMenu(artifactKey, clientX, clientY) {
  const menuWidth = 212;
  const menuHeight = 280;
  const margin = 8;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

  const fixedX = Math.min(Math.max(margin, clientX - 12), Math.max(margin, viewportWidth - menuWidth - margin));
  const fixedY = Math.min(Math.max(margin, clientY - 8), Math.max(margin, viewportHeight - menuHeight - margin));

  const prevKey = state.artifactContextAnchorKey;
  state.artifactContextMenu = {
    artifactKey,
    x: fixedX,
    y: fixedY
  };
  state.artifactContextAnchorKey = artifactKey;

  syncMenuOpenHighlight(prevKey, artifactKey);
  renderArtifactContextMenuOverlay();
}

function openArtifactContextMenuFromButton(artifactKey, button) {
  const rect = button.getBoundingClientRect();
  openArtifactContextMenu(artifactKey, rect.right - 200, rect.top + 4);
}

function getArtifactContextMenuAnchorRoot() {
  return root?.querySelector(".nlsf-content")
    || root?.querySelector(".nlsf-view.is-active")
    || root?.querySelector(".nlsf-panel")
    || null;
}

function closeArtifactContextMenu() {
  const prevKey = state.artifactContextAnchorKey;
  state.artifactContextMenu = null;
  state.artifactContextAnchorKey = "";

  syncMenuOpenHighlight(prevKey, "");
  renderArtifactContextMenuOverlay();
}

function syncMenuOpenHighlight(prevKey, newKey) {
  if (prevKey && prevKey !== newKey) {
    const prevRows = root?.querySelectorAll(`.nlsf-artifact-row[data-artifact-key="${CSS.escape(prevKey)}"]`) || [];
    for (const row of prevRows) {
      row.classList.remove("is-menu-open");
    }
  }
  if (newKey) {
    const newRows = root?.querySelectorAll(`.nlsf-artifact-row[data-artifact-key="${CSS.escape(newKey)}"]`) || [];
    for (const row of newRows) {
      row.classList.add("is-menu-open");
    }
  }
}

function renderArtifactContextMenuOverlay() {
  const container = root?.querySelector(".nlsf-context-menu-container");
  if (!container) {
    return;
  }

  const notebookId = getNotebookId();
  container.innerHTML = renderArtifactContextMenu(notebookId);
}

function normalizeFloatingLayout(layout) {
  const toggle = layout?.toggle || {};
  const panelLayout = layout?.panel || {};
  return {
    toggle: {
      x: Number.isFinite(toggle.x) ? toggle.x : null,
      y: Number.isFinite(toggle.y) ? toggle.y : TOGGLE_DEFAULT_TOP
    },
    panel: {
      x: Number.isFinite(panelLayout.x) ? panelLayout.x : null,
      y: Number.isFinite(panelLayout.y) ? panelLayout.y : PANEL_DEFAULT_TOP
    }
  };
}

function getViewportBounds() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || 0
  };
}

function clampPosition(position, width, height, margin) {
  const viewport = getViewportBounds();
  return {
    x: Math.min(Math.max(margin, position.x), Math.max(margin, viewport.width - width - margin)),
    y: Math.min(Math.max(margin, position.y), Math.max(margin, viewport.height - height - margin))
  };
}

function getDefaultTogglePosition() {
  const viewport = getViewportBounds();
  const width = toggleButton?.getBoundingClientRect?.().width || 104;
  return {
    x: Math.max(TOGGLE_MARGIN, viewport.width - width - TOGGLE_MARGIN),
    y: TOGGLE_DEFAULT_TOP
  };
}

function getDefaultPanelPosition() {
  const viewport = getViewportBounds();
  const width = Math.min(PANEL_WIDTH, Math.max(320, viewport.width - PANEL_MARGIN * 2));
  return {
    x: Math.max(PANEL_MARGIN, viewport.width - width - PANEL_MARGIN),
    y: PANEL_DEFAULT_TOP
  };
}

function getPanelPositionForOpen() {
  const current = state.floatingLayout?.panel || {};
  if (Number.isFinite(current.x) && Number.isFinite(current.y)) {
    return current;
  }

  const togglePosition = state.floatingLayout?.toggle || getDefaultTogglePosition();
  const viewport = getViewportBounds();
  const width = Math.min(PANEL_WIDTH, Math.max(320, viewport.width - PANEL_MARGIN * 2));
  return clampPosition({
    x: Number.isFinite(togglePosition.x) ? Math.min(togglePosition.x, viewport.width - width - PANEL_MARGIN) : getDefaultPanelPosition().x,
    y: Number.isFinite(togglePosition.y) ? Math.max(PANEL_MARGIN, togglePosition.y - 8) : PANEL_DEFAULT_TOP
  }, width, Math.max(520, viewport.height - PANEL_MARGIN * 2), PANEL_MARGIN);
}

function applyFloatingLayout() {
  if (!toggleButton || !panel) {
    return;
  }

  const viewport = getViewportBounds();
  const toggleWidth = toggleButton.getBoundingClientRect().width || 104;
  const toggleHeight = toggleButton.getBoundingClientRect().height || 46;
  const panelWidth = Math.min(PANEL_WIDTH, Math.max(320, viewport.width - PANEL_MARGIN * 2));
  const panelHeight = Math.max(420, viewport.height - PANEL_MARGIN * 2);

  const nextToggle = clampPosition(
    Number.isFinite(state.floatingLayout?.toggle?.x) ? state.floatingLayout.toggle : getDefaultTogglePosition(),
    toggleWidth,
    toggleHeight,
    TOGGLE_MARGIN
  );
  const nextPanel = clampPosition(
    Number.isFinite(state.floatingLayout?.panel?.x) ? state.floatingLayout.panel : getDefaultPanelPosition(),
    panelWidth,
    panelHeight,
    PANEL_MARGIN
  );

  state.floatingLayout = {
    toggle: nextToggle,
    panel: nextPanel
  };

  toggleButton.style.left = `${nextToggle.x}px`;
  toggleButton.style.top = `${nextToggle.y}px`;
  toggleButton.style.right = "auto";

  panel.style.left = `${nextPanel.x}px`;
  panel.style.top = `${nextPanel.y}px`;
  panel.style.right = "auto";
}

function persistFloatingLayout() {
  return safeStorageSet({ [STORAGE_KEYS.floatingLayout]: state.floatingLayout });
}

function isInteractiveNode(node) {
  return Boolean(node?.tagName && ["BUTTON", "INPUT", "TEXTAREA", "SELECT", "A"].includes(node.tagName));
}

function startFloatingDrag(kind, event) {
  const position = kind === "panel"
    ? (state.floatingLayout?.panel || getDefaultPanelPosition())
    : (state.floatingLayout?.toggle || getDefaultTogglePosition());
  dragState = {
    kind,
    originX: event.clientX,
    originY: event.clientY,
    startX: position.x ?? 0,
    startY: position.y ?? 0,
    moved: false
  };
  event.preventDefault();
}

function handleWindowMouseMove(event) {
  if (!dragState) {
    return;
  }

  const deltaX = event.clientX - dragState.originX;
  const deltaY = event.clientY - dragState.originY;
  if (!dragState.moved && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
    dragState.moved = true;
  }

  const viewport = getViewportBounds();
  if (dragState.kind === "panel") {
    const width = Math.min(PANEL_WIDTH, Math.max(320, viewport.width - PANEL_MARGIN * 2));
    const height = Math.max(420, viewport.height - PANEL_MARGIN * 2);
    state.floatingLayout.panel = clampPosition({
      x: dragState.startX + deltaX,
      y: dragState.startY + deltaY
    }, width, height, PANEL_MARGIN);
  } else {
    const width = toggleButton?.getBoundingClientRect?.().width || 104;
    const height = toggleButton?.getBoundingClientRect?.().height || 46;
    state.floatingLayout.toggle = clampPosition({
      x: dragState.startX + deltaX,
      y: dragState.startY + deltaY
    }, width, height, TOGGLE_MARGIN);
  }

  applyFloatingLayout();
}

function handleWindowMouseUp() {
  if (!dragState) {
    return;
  }

  if (dragState.moved) {
    state.dragSuppressClickUntil = Date.now() + 180;
    void persistFloatingLayout();
  }
  dragState = null;
}

function handleWindowResize() {
  applyFloatingLayout();
  void persistFloatingLayout();
}

function getArtifactNativeActionMeta(actionId) {
  return ARTIFACT_NATIVE_ACTIONS.find((item) => item.id === actionId) || null;
}

async function openStudioArtifactMenu(artifact) {
  await ensureStudioTabActive();
  await ensureStudioArtifactListVisible();

  const moreButton = findStudioArtifactMoreButtonById(artifact.id) || findArtifactLibraryMoreButtonByTitle(artifact.title);
  if (!moreButton) {
    return null;
  }

  moreButton.click();
  await sleep(180);
  return moreButton;
}

function findVisibleMenuItemByLabels(labels) {
  for (const label of labels) {
    const match = findVisibleMenuItemByLabel(label);
    if (match) {
      return match;
    }
  }
  return null;
}

function shouldInspectArtifactNativeMenus(items) {
  if (!items.length) {
    return false;
  }
  return items.some((item) => !Array.isArray(state.artifactNativeMenuMap?.[item.key]));
}

function persistArtifactNativeMenus() {
  return safeStorageSet({ [STORAGE_KEYS.artifactNativeMenus]: state.artifactNativeMenus });
}

function identifyArtifactNativeActionId(rawLabel) {
  const normalized = normalizeUiText(rawLabel || "");
  if (!normalized) {
    return "";
  }

  const meta = ARTIFACT_NATIVE_ACTIONS.find((item) => (item.nativeLabels || []).some((label) => normalized.includes(normalizeUiText(label))));
  return meta?.id || "";
}

function getVisibleNativeMenuItems() {
  const overlays = Array.from(document.querySelectorAll('[role="menu"], .mat-mdc-menu-panel, .cdk-overlay-pane'))
    .filter((node) => {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    })
    .sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      return (rightRect.width * rightRect.height) - (leftRect.width * leftRect.height);
    });
  const overlay = overlays[0];
  if (!overlay) {
    return [];
  }

  return Array.from(overlay.querySelectorAll('[role="menuitem"], button, [tabindex]'))
    .map((node) => normalizeUiText(node.textContent || node.getAttribute?.("aria-label") || ""))
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);
}

async function inspectArtifactNativeMenus(forceRefresh) {
  const notebookId = getNotebookId();
  if (!notebookId || !state.artifactAvailability || state.artifactAvailabilityNotebookId !== notebookId) {
    return;
  }
  if (state.artifactNativeMenuInspecting) {
    return;
  }

  const items = getUnifiedArtifactItems(state.artifactAvailability);
  if (!items.length) {
    return;
  }

  const pendingItems = forceRefresh
    ? items
    : items.filter((item) => !Array.isArray(state.artifactNativeMenuMap?.[item.key]));
  if (!pendingItems.length) {
    return;
  }

  state.artifactNativeMenuInspecting = true;
  if (forceRefresh) {
    state.artifactNativeMenuMap = {};
  }

  try {
    await ensureStudioTabActive();
    await ensureStudioArtifactListVisible();
    const nextMap = { ...state.artifactNativeMenuMap };

    for (const item of pendingItems) {
      const moreButton = findStudioArtifactMoreButtonById(item.id) || findArtifactLibraryMoreButtonByTitle(item.title);
      if (!moreButton) {
        nextMap[item.key] = [];
        continue;
      }

      moreButton.click();
      await sleep(220);
      const rawMenuItems = getVisibleNativeMenuItems();
      nextMap[item.key] = rawMenuItems
        .map((label) => identifyArtifactNativeActionId(label))
        .filter(Boolean)
        .filter((actionId, index, array) => actionId !== "open" && array.indexOf(actionId) === index);
      document.body.click();
      await sleep(120);
    }

    state.artifactNativeMenuMap = nextMap;
    state.artifactNativeMenus = {
      ...state.artifactNativeMenus,
      [notebookId]: nextMap
    };
    await persistArtifactNativeMenus();
  } finally {
    state.artifactNativeMenuInspecting = false;
    renderArtifactManagerView();
  }
}

async function runArtifactNativeAction(artifactKey, actionId) {
  const artifact = getArtifactItemByKey(artifactKey);
  const actionMeta = getArtifactNativeActionMeta(actionId);
  if (!artifact || !actionMeta) {
    return;
  }

  if (actionMeta.id === "open") {
    await openArtifactInStudio(artifactKey);
    return;
  }

  const moreButton = await openStudioArtifactMenu(artifact);
  if (!moreButton) {
    state.artifactCommandFeedback = `没有在 Studio 列表里定位到《${artifact.title}》的更多按钮。`;
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  const menuItem = findVisibleMenuItemByLabels(actionMeta.nativeLabels || []);
  if (!menuItem) {
    state.artifactCommandFeedback = `已经打开《${artifact.title}》的原生菜单，但没看到“${actionMeta.label}”。`;
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  menuItem.click();
  await sleep(240);

  const confirmButton = actionMeta.confirmLabels?.length ? findVisibleDialogConfirmButton(actionMeta.confirmLabels) : null;
  if (confirmButton) {
    confirmButton.click();
    await sleep(260);
  }

  state.artifactCommandFeedback = `已尝试在 Studio 中执行“${actionMeta.label}”：《${artifact.title}》。`;
  if (actionMeta.id === "delete" || actionMeta.id === "convert-to-source" || actionMeta.id === "convert-all-notes-to-sources") {
    await inspectArtifactAvailability(true);
  }
  renderArtifactView();
  renderArtifactManagerView();
}

async function deleteArtifactInStudio(artifactKey) {
  const artifact = getArtifactItemByKey(artifactKey);
  if (!artifact) {
    state.artifactCommandFeedback = "没有找到这个产物。";
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  await ensureStudioTabActive();
  await ensureStudioArtifactListVisible();

  const moreButton = findStudioArtifactMoreButtonById(artifact.id) || findArtifactLibraryMoreButtonByTitle(artifact.title);
  if (!moreButton) {
    state.artifactCommandFeedback = `没有在 Studio 列表里定位到《${artifact.title}》的更多按钮。`;
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  moreButton.click();
  await sleep(180);

  const deleteItem = findVisibleMenuItemByLabel("删除");
  if (!deleteItem) {
    state.artifactCommandFeedback = `已经找到《${artifact.title}》的菜单入口，但没看到删除选项。`;
    renderArtifactView();
    renderArtifactManagerView();
    return;
  }

  deleteItem.click();
  await sleep(220);

  const confirmButton = findVisibleDialogConfirmButton(["删除", "确认删除"]);
  if (confirmButton) {
    confirmButton.click();
    await sleep(260);
  }

  state.artifactCommandFeedback = `已尝试在 Studio 中删除《${artifact.title}》。`;
  await inspectArtifactAvailability(true);
  renderArtifactView();
  renderArtifactManagerView();
}

async function exportArtifactFromMenu(artifactKey, commandKind) {
  const artifact = getArtifactItemByKey(artifactKey);
  if (!artifact || !commandKind) {
    return;
  }

  state.selectedArtifactItemId = artifact.id;
  if (commandKind === "mind-map") {
    state.selectedArtifactKind = "mind-map";
  } else if (commandKind === "slide-pdf") {
    state.selectedArtifactKind = "slide-pdf";
  } else if (commandKind === "slide-pptx") {
    state.selectedArtifactKind = "slide-pptx";
  }

  renderArtifactView();
  await exportArtifact(commandKind);
  renderArtifactManagerView();
}

function attachSyntheticId(element, prefix) {
  const id = `${prefix}-${crypto.randomUUID()}`;
  element.dataset.nlsfId = id;
  return id;
}

function toggleTurnSelection(turnId) {
  if (!turnId) {
    return;
  }

  if (state.selectedTurnIds.includes(turnId)) {
    state.selectedTurnIds = state.selectedTurnIds.filter((id) => id !== turnId);
    return;
  }

  state.selectedTurnIds = [...state.selectedTurnIds, turnId];
}

function splitTags(input) {
  return input.split(",").map((item) => item.trim()).filter(Boolean);
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function truncate(value, maxLength) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-").replace(/^-+|-+$/g, "");
}

function formatDate(value) {
  return new Date(value).toLocaleString();
}

function isVisible(node) {
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value);
}





