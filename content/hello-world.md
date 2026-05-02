# Tại sao tôi tự xây dựng Blog từ đầu

Chào thế giới! Chào mừng bạn đến với trang web cá nhân và blog mới của tôi.

Là một Kỹ sư Phần mềm và Nghiên cứu sinh, tôi dành nhiều thời gian làm việc với các hệ thống phức tạp, mô hình học máy, và các framework nặng nề. Tuy nhiên, khi xây dựng một không gian cá nhân trên internet cho chính mình, tôi lại muốn một thứ gì đó khác biệt.

## Sự lựa chọn công nghệ Vanilla

Thay vì dùng ngay Next.js, React hay Astro, tôi quyết định xây dựng trang web này hoàn toàn bằng **Vanilla HTML, CSS và JavaScript**.

Lý do là:
1. **Sự Đơn Giản:** Không cần `npm install`, không có bước build phức tạp, không cần file cấu hình rườm rà.
2. **Hiệu Suất:** JS và CSS thuần cực kỳ nhanh. Trình duyệt đọc và xử lý chúng nguyên bản mà không gặp bất kỳ gánh nặng nào.
3. **Sự Kiểm Soát:** Tôi nắm quyền kiểm soát 100% tới từng pixel và hành vi của trang web.

### Cách thức hoạt động

Hệ thống blog thực chất rất đơn giản. Tôi có một file `posts.json` đóng vai trò như cơ sở dữ liệu:

```json
[
  {
    "id": "hello-world",
    "title": { "en": "Welcome", "vi": "Chào mừng" },
    "date": "May 02, 2026"
  }
]
```

Khi bạn bấm vào một bài viết, JavaScript chỉ việc gọi nội dung từ file Markdown trong thư mục `content/` và hiển thị nó bằng `marked.js`!

## Dự định sắp tới?

Tôi sẽ dùng không gian này để viết về:
- Xử lý ngôn ngữ tự nhiên (NLP)
- Nghiên cứu của tôi về Continual Learning (Học liên tục)
- Kinh nghiệm và kỹ thuật phần mềm
- Các dự án cá nhân

Cảm ơn bạn đã ghé thăm! Hãy kết nối với tôi trên GitHub hoặc LinkedIn nhé.
