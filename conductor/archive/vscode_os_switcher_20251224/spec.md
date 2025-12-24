# 功能規格書：VSCode 快捷鍵作業系統切換器 (OS Switcher)

## 1. 概述 (Overview)
此功能旨在為 `vscode-mac.html` 頁面新增一個作業系統切換機制，允許使用者在 macOS 與 Windows 的快捷鍵對應之間即時切換。為了確保技術正確性，將採用 **Data-Attribute 驅動** 的策略，明確定義每個指令在雙平台的真實快捷鍵，而非僅進行字串替換。

## 2. 核心功能 (Functional Requirements)

### 2.1 導航列切換按鈕
- **位置：** 放置於導航列 (Navbar) 的最右側。
- **樣式：** 採用按鈕或開關 (Toggle/Switch) 形式。
- **互動：** 點擊後即時切換全頁面的快捷鍵顯示。

### 2.2 雙平台數據架構 (Data-Driven Keybindings)
- **HTML 重構：** 將現有的靜態表格重構。每個快捷鍵的 `<tr>` 或 `<span>` 需包含兩個數據屬性：
  - `data-mac`: 存儲 macOS 快捷鍵組合 (例如 "⌘ + C")
  - `data-win`: 存儲 Windows 快捷鍵組合 (例如 "Ctrl + C")
- **預設狀態：** 頁面載入時預設顯示 macOS 版本。

### 2.3 內容動態更新邏輯
當切換模式時，JavaScript 將執行以下操作：
1. 遍歷所有帶有 `data-mac`/`data-win` 的元素。
2. 根據當前模式，讀取對應屬性值。
3. 動態重新生成 `<kbd>` 標籤並插入 DOM。
4. **文字與標籤更新：**
   - 導航列標籤：`Mac Edition` <-> `Windows Edition`
   - 頁面標題：包含對應 OS 名稱。
   - 外部連結：指向對應 OS 的官方 PDF。

## 3. 視覺與互動 (UI/UX)
- **Windows 樣式：** 使用純文字 (Ctrl, Alt) 而非符號，符合 Windows 使用者習慣。
- **過渡效果：** 確保 DOM 更新時無閃爍，可加入輕微的 Fade 效果。

## 4. 驗證準則 (Acceptance Criteria)
- [ ] 頁面 HTML 結構已重構，包含 `data-mac` 與 `data-win` 屬性。
- [ ] 點擊切換按鈕後，所有快捷鍵準確顯示為該平台的鍵位 (不只是符號替換，而是讀取正確設定)。
- [ ] 搜尋功能完全支援雙平台關鍵字 (搜尋 "Ctrl" 或 "Cmd" 都能找到對應功能的快捷鍵)。
- [ ] 導航列與標題正確反映當前模式。

## 5. 範疇外 (Out of Scope)
- Linux 專用設定 (視同 Windows)。
