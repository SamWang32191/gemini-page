# 實作計畫：VSCode 快捷鍵雙平台切換功能

## 第一階段：基礎架構與 HTML 重構 (Foundation & HTML Restructure)
- [x] 任務 1：備份原始 `vscode-mac.html` 並建立開發環境。 (f93a547)
- [x] 任務 2：重構 `vscode-mac.html` 的表格結構。 (d7be94d)
    - 為每個 `<tr>` 加入 `data-mac` 與 `data-win` 屬性。
    - 預設將目前的 Mac 鍵位填入 `data-mac`。
    - 根據官方 PDF 填入對應的 Windows 鍵位至 `data-win`。
- [x] 任務 3：清理原有的靜態 `<kbd>` 標籤，準備由 JS 動態生成。 (293608c)
- [x] Task: Conductor - User Manual Verification '第一階段' (Protocol in workflow.md) (6e9ec1c)

## 第二階段：導航列 UI 與 切換邏輯 (UI & Logic)
- [x] 任務 1：在導航列右側新增切換按鈕。 (eeb754a)
    - 樣式：使用 Tailwind CSS 建立一個具備「Mac/Windows」狀態切換的按鈕。
    - 加入 ID `osSwitcher` 以供 JS 呼叫。
- [x] 任務 2：實作核心 JavaScript 切換邏輯。 (a516f87)
    - 監聽切換按鈕點擊事件。
    - 切換 `currentOS` 狀態 (mac/win)。
    - 遍歷所有帶有 `data-` 屬性的元素，更新其內部的 HTML (重新生成 `<kbd>` 標籤)。
    - 更新頁面標題、Navbar 標籤與官方下載連結。
- [x] 任務 3：確保搜尋功能相容性。 (29c10a7)
    - 調整搜尋 Script，使其在過濾時能讀取當前顯示的鍵位文字。
- [x] Task: Conductor - User Manual Verification '第二階段' (Protocol in workflow.md) (edd346c)

## 第三階段：優化與驗證 (Optimization & Verification)
- [ ] 任務 1：加入平滑過渡效果 (如內容變更時的微動畫)。
- [ ] 任務 2：執行全平台驗證 (Windows/Mac 顯示正確性檢查)。
- [ ] 任務 3：響應式佈局檢查 (確保手機版導航列按鈕不跑版)。
- [ ] Task: Conductor - User Manual Verification '第三階段' (Protocol in workflow.md)
