# 💱 VND Price Converter - Chrome Extension

Tự động phát hiện giá USD trên mọi trang web và hiển thị giá VND tương đương ngay bên cạnh.

**Ví dụ:** `$19.99` → `$19.99 (~510.000đ)`

## ✨ Tính năng

- Phát hiện tự động các dạng giá USD: `$19.99`, `$1,000`, `USD 50`, `US$10`
- Hiển thị VND inline ngay cạnh giá gốc
- Tỷ giá real-time từ [frankfurter.app](https://frankfurter.app), cache 1 giờ
- Fallback tỷ giá 25.500 VND/USD khi offline
- Toggle bật/tắt nhanh từ popup
- Hỗ trợ trang dynamic (SPA) qua MutationObserver

## 🔧 Cài đặt (Load Unpacked)

1. Clone hoặc tải repo này
2. Mở Chrome, vào `chrome://extensions/`
3. Bật **Developer mode** (góc trên phải)
4. Click **Load unpacked** → chọn thư mục `vnd-price-converter/`
5. Extension sẽ xuất hiện trên toolbar

## 🔒 Quyền (Permissions)

| Permission | Lý do |
|------------|-------|
| `storage` | Lưu cache tỷ giá và trạng thái bật/tắt |
| `alarms` | Tự động cập nhật tỷ giá mỗi giờ |

Extension sử dụng declarative content scripts (khai báo trong manifest) để phát hiện giá USD trên trang web. Không cần thêm quyền truy cập tab nào khác.

**Không thu thập bất kỳ dữ liệu người dùng nào.**

## 📦 Submit lên Chrome Web Store

1. Nén thư mục extension thành file `.zip`
2. Vào [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Trả phí đăng ký $5 (một lần)
4. Click **New Item** → upload file `.zip`
5. Điền thông tin:
   - **Tên:** VND Price Converter
   - **Mô tả:** Tự động chuyển đổi giá USD sang VND trên mọi trang web
   - **Category:** Productivity
   - **Single purpose:** Chuyển đổi giá USD hiển thị trên trang web sang VND
6. Upload screenshot và icon
7. Submit để review (thường 1-3 ngày)

## 📁 Cấu trúc

```
vnd-price-converter/
├── manifest.json      # Manifest V3
├── background.js      # Service worker - fetch tỷ giá
├── content.js         # Content script - scan & convert giá
├── popup.html         # Popup UI
├── popup.css          # Popup styles
├── popup.js           # Popup logic
├── icons/             # Extension icons
└── README.md
```

## License

MIT
