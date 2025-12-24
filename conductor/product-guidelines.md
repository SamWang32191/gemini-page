# Product Guidelines - gemini-page

## 內容風格準則 (Tone & Style)
- **語調：專業且權威 (Professional & Authoritative)**。使用精確的技術術語，避免過於口語，文字應體現全端工程師的專業嚴謹性。
- **結構：** 優先使用列表 (Bullet points) 與標題層級，使技術重點能被快速掃描。
- **語言：** 內容主要以臺灣繁體中文為主，技術術語若無適當翻譯則保留原文（如：Git Rebase, Kubernetes Controller）。

## 視覺與 UI 準則 (Visual & UI Identity)
- **佈局：卡片式佈局 (Card-based Layout)**。每個技術主題或 Lab 模擬器應封裝在獨立的視覺卡片中，並如同 Dashboard 一般整齊排列。
- **互動：豐富且細緻的動畫 (Dynamic Animations)**。
  - 在使用者與模擬器互動時提供流暢的視覺反饋。
  - 滑鼠懸停 (Hover) 與狀態切換應具備微動效 (Micro-interactions)。
- **色彩：** 使用具備科技感的調色盤，確保高對比度且易於長時間閱讀。

## AI 生成與 Canvas 產出規範 (AI Content Standards)
- **響應式配置：** 產出的內容必須支援多尺寸螢幕，確保在主流瀏覽器中佈局不崩潰。
- **開發體驗 (DX)**：
  - 所有的程式碼區塊必須整合「一鍵複製」功能。
  - 命令列 (CLI) 範例應清楚區分輸入與輸出。
- **文件完整性**：
  - 必須使用語義化標籤 (Semantic HTML)，如 `<article>`, `<section>`, `<code>`, `<kbd>`。
  - 每個自動生成頁面應包含適當的 Metadata，以便 `pages.json` 管理。
