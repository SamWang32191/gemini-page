# Track Spec: 優化入口網站首頁與自動化工作流整合

## 概述 (Overview)
本 Track 旨在提升 `gemini-page` 入口網站的首頁視覺體驗，並導入標準化內容生產流程。我們將重構 `index.html` 以符合「卡片式佈局」與「互動式動畫」準則，並新增一個「Git 互動模擬器」頁面，作為 AI 自動化流水線的示範範例。

## 範圍 (Scope)
- **首頁重構**：更新 `index.html` 與相關 CSS，導入卡片風格並連結 `pages.json`。
- **全新示範頁面**：建立 `git-lab.html`，具備互動式 Git 基礎指令模擬。
- **工作流驗證**：確保所有變更符合 `product-guidelines.md` 與 `workflow.md`。

## 目標 (Goals)
- 讓首頁呈現 premium、state-of-the-art 的全端工程師風格。
- 驗證「從研究到生成」的 HTML 產出品質。
- 完善 `pages.json` 與頁面間的導航。

## 非目標 (Non-Goals)
- 本次不更動現有的其他技術頁面（如 Go-leaning 等）。
- 不涉及伺服器端開發。
