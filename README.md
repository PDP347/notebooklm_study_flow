# NotebookLM Study Flow

一个面向 `NotebookLM` 的 Chrome 扩展，把零散的学习过程整理成更稳定的工作流。

它当前聚焦 4 件事：

- 导出对话
- 复用提示词
- 整理 `Studio` 产物
- 批量导出可下载的产物

这不是一个“大而全的增强包”，而是一个偏学习场景的轻量侧边工作台。

## 项目定位

`NotebookLM Study Flow` 的目标是补上 `NotebookLM` 在学习沉淀场景下不够顺手的几块体验：

- 将对话整理后导出为 `Markdown / JSON`
- 把常用 prompt 做成可复用模板库
- 把 `Studio` 中越来越多的产物整理成可管理结构
- 对支持下载的产物做单个或批量导出

当前扩展主要适合：

- 学生
- 研究者
- 课程整理场景
- 重度使用 `NotebookLM` 做资料归纳的人

## 当前功能

### 1. 对话导出

- 识别当前 notebook 中的对话片段
- 支持多选
- 导出选中内容或整段会话
- 导出格式：
  - `Markdown`
  - `JSON`

### 2. 提示词库

- 保存 prompt 模板
- 编辑已有模板
- 删除模板
- 一键插入到 `NotebookLM` 输入框
- 支持基础变量替换：
  - `{{course}}`
  - `{{date}}`

### 3. 产物页

当前第三个 tab 的定位是：

`Studio 产物整理 + 类型归类 + 批量导出`

支持：

- 识别当前 notebook 中的 `Studio` 产物
- 按类型查看产物
- 选择具体产物
- 导出已支持的产物
- 在 `Studio` 中打开对应产物

已验证支持的导出类型：

- `Mind Map -> JSON`
- `Slide Deck -> PDF`
- `Slide Deck -> PPTX`

说明：

- `PPTX` 是否可导出，取决于该 slide deck 是否真的暴露了 `pptx_url`
- 较旧的 slide deck 可能只有 `PDF`

### 4. 产物管理器

第四个 tab 是独立的产物管理器视图。

支持：

- 识别当前 notebook 中的 `Studio` 产物与笔记
- 自定义文件夹
- 拖拽归类
- 删除文件夹
- 在 `Studio` 中打开对应产物

文件夹规则：

- `未归档` 不可删除
- 其他文件夹可删除
- 删除文件夹后，内部产物会自动回到 `未归档`


## 安装方式

### 本地加载

1. 打开 Chrome
2. 进入 `chrome://extensions`
3. 打开右上角 `开发者模式`
4. 点击 `加载已解压的扩展程序`
5. 选择当前项目目录：

```text
C:\Users\34667\Desktop\notebooklm
```

### 使用前提

- 需要登录可用的 `NotebookLM`
- 扩展运行在：
  - `https://notebooklm.google.com/*`

## 使用说明

### 导出 tab

- 打开某个 notebook
- 在对话页面选择需要的内容
- 选择导出格式
- 导出为 `Markdown` 或 `JSON`

### 提示词 tab

- 保存当前常用 prompt
- 在模板列表中编辑、删除或插入
- 直接回填到 `NotebookLM` 输入框

### 产物 tab

- 识别当前 notebook 中现有的 `Studio` 产物
- 选择具体产物或类型
- 对支持的项目执行导出

### 管理器 tab

- 创建文件夹
- 拖拽产物到不同文件夹
- 点开产物可尝试在 `Studio` 中定位并打开

## 项目结构

- [manifest.json](/C:/Users/34667/Desktop/notebooklm/manifest.json)
  Chrome 扩展配置、权限与入口

- [src/content.js](/C:/Users/34667/Desktop/notebooklm/src/content.js)
  主体逻辑文件，负责：
  - NotebookLM 页面集成
  - 面板注入
  - tab 视图
  - 对话导出
  - 提示词库
  - 产物识别与导出
  - 产物管理器

- [src/background.js](/C:/Users/34667/Desktop/notebooklm/src/background.js)
  下载相关逻辑

- [src/styles.css](/C:/Users/34667/Desktop/notebooklm/src/styles.css)
  面板与各模块样式

- [src/popup.html](/C:/Users/34667/Desktop/notebooklm/src/popup.html)
  扩展 popup

- [src/options.html](/C:/Users/34667/Desktop/notebooklm/src/options.html)
  说明 / 选项页

## 当前边界

这个项目现在是“纯扩展版”，不依赖：

- 本地 Python
- Native Messaging
- 本地常驻服务

也就是说，当前所有主要能力都在扩展内完成。

目前**不包含**：

- 通过扩展生成新的 `Studio` 产物
- 来源原文件导出
- 跨 notebook 自动化批处理
- 云同步

## 已知限制

- `NotebookLM` 的 DOM 和内部 RPC 变动可能会影响识别逻辑
- 对话导出的结构还原仍带启发式成分，不保证与页面渲染完全一致
- `在 Studio 中打开` 已经比早期版本稳定很多，但仍可能受页面结构变化影响
- 某些产物虽能识别，但不一定都支持统一格式导出

## 版本状态

当前版本：

- `v0.1.0`

项目已经具备日常使用基础，但仍在持续迭代中。

## 开发说明

如果你想继续本地开发：

1. 修改 [src/content.js](/C:/Users/34667/Desktop/notebooklm/src/content.js) 或 [src/styles.css](/C:/Users/34667/Desktop/notebooklm/src/styles.css)
2. 在 `chrome://extensions` 中刷新扩展
3. 回到 `NotebookLM` 页面强刷新验证

## License

当前仓库尚未添加正式许可证。  
如果后续准备公开分发，建议补充 `MIT` 或你偏好的开源许可证。
