# NotebookLM Study Flow

`NotebookLM Study Flow` is a pure Chrome extension for improving the NotebookLM study workflow.

## Current features

- Export selected chat turns or the current session as `Markdown` / `JSON`
- Save, edit, delete, and insert reusable prompt templates
- Inspect existing NotebookLM artifacts in the current notebook
- Export a specific existing artifact directly from the extension:
  - `Mind Map -> JSON`
  - `Slide Deck -> PDF`
  - `Slide Deck -> PPTX` when the selected artifact actually exposes a `pptx_url`

## Load the extension

1. Open Chrome and go to `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select:
   `C:\Users\34667\Desktop\notebooklm`

## Project structure

- `manifest.json`: extension manifest and permissions
- `src/background.js`: download bridge for extension-triggered file saves
- `src/content.js`: main NotebookLM page integration and UI logic
- `src/styles.css`: extension panel styles
- `src/popup.html`: popup entry page
- `src/options.html`: lightweight options/help page
- `exports/`: downloaded test artifacts kept locally for verification

## Current artifact behavior

The artifact page now works fully inside the extension and no longer depends on local Python scripts or Native Messaging.

It can:

- detect artifact availability from the current NotebookLM page context
- list concrete exportable items for each supported artifact kind
- let you choose one exact artifact before exporting
- download existing artifact files directly

Current scope:

- supports exporting existing artifacts
- does not yet create new artifacts from inside the extension

## Known limitations

- NotebookLM DOM or internal RPC changes may break selectors or artifact parsing
- `PPTX` export depends on the selected slide deck actually exposing a real `pptx_url`
- older slide deck artifacts may only support `PDF`
- chat export formatting is still heuristic and may not perfectly match NotebookLM's rendered structure

## Notes

- The old local Python script layer and Native Host bridge were removed from this project because the current artifact flow is now handled directly in the extension.
- Existing files under `exports/` were intentionally kept as your local verification outputs.
