# NotebookLM Study Flow

面向 `NotebookLM` 的 Chrome 扩展。  
目标是把学习过程中的对话、提示词和 Studio 产物整理成可复用、可导出的工作流。

## 功能概览

### 1. 对话导出
- 识别当前 NotebookLM 对话内容
- 支持多选导出
- 支持导出为 `Markdown` / `JSON`

### 2. 提示词库
- 保存、编辑、删除提示词模板
- 支持模板插入到 NotebookLM 输入框
- 支持变量占位（如 `{{course}}`、`{{date}}`）

### 3. 产物页（Tab 3）
- 识别当前 notebook 的 Studio 产物
- 按类型查看产物（如报告、闪卡、测验、信息图、音频、视频、PPT、思维导图、笔记等）
- 支持多选、全选、部分勾选后批量导出
- 支持在 Studio 中打开对应产物（受页面结构影响）

### 4. 管理器页（Tab 4）
- 自定义文件夹管理产物
- 拖拽归类
- 支持删除自建文件夹
- `未归档` 为保留文件夹，不可删除

## 安装方式（本地加载）

1. 打开 Chrome，进入 `chrome://extensions`
2. 打开右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择本项目根目录（即包含 `manifest.json` 的目录）

## 使用说明

### 导出 Tab
1. 打开某个 notebook 的对话页
2. 勾选需要导出的对话
3. 选择导出格式（Markdown/JSON）
4. 执行导出

### 提示词 Tab
1. 新建或编辑提示词模板
2. 按需插入到 NotebookLM 输入框
3. 进行复用

### 产物 Tab
1. 点击“重新识别”同步当前 notebook 产物
2. 切换产物类型
3. 勾选条目（支持全选/部分选择）
4. 批量导出所选产物

### 管理器 Tab
1. 新建文件夹
2. 将产物拖入目标文件夹
3. 需要时在 Studio 中定位打开

## 项目结构

- `manifest.json`：扩展清单与权限配置
- `src/content.js`：核心逻辑（面板注入、页面交互、导出流程、管理器）
- `src/background.js`：下载与后台消息处理
- `src/styles.css`：扩展样式
- `src/popup.html`：扩展弹窗
- `src/options.html`：扩展选项页

## 当前边界与限制

- 本项目是“纯扩展方案”，不依赖本地 Python/常驻服务/Native Messaging
- NotebookLM 的 DOM/RPC 变更可能影响识别与映射
- 不同产物类型的数据可用性不完全一致，导出能力存在差异
- “在 Studio 中打开”受 NotebookLM 前端结构变动影响

## 开发与调试

1. 修改 `src/content.js` 或 `src/styles.css`
2. 在 `chrome://extensions` 中刷新扩展
3. 回到 NotebookLM 页面刷新后验证

## 版本

当前处于持续迭代阶段，适合日常学习场景使用并持续小维护。

