# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Ngôn ngữ làm việc

Claude luôn trả lời, giải thích và trao đổi với người dùng bằng **tiếng Việt**. Code, tên biến, tên file và commit message giữ nguyên tiếng Anh theo thông lệ, trừ khi người dùng yêu cầu khác.

## Tổng quan dự án

Trang profile cá nhân dành cho lập trình viên, thiết kế theo phong cách game **Valorant**. Đây là trang giới thiệu bản thân của chủ dự án (GitHub: https://github.com/lhnhidev), nên nội dung (giới thiệu, kỹ năng, dự án, liên hệ) lấy từ thông tin thật trên GitHub đó.

Trang tham khảo có sẵn của chủ dự án: https://lhnhidev.github.io/my-valorant/

## Tech Stack

- HTML, CSS, JavaScript (thuần)
- Tailwind CSS
- Framer animation (dùng cho hiệu ứng chuyển động)

## Quy tắc thiết kế

- Phong cách: mượt mà, ấn tượng nhưng hiện đại và tinh tế. Không làm rối mắt hay quá nặng hiệu ứng.
- Tham khảo thiết kế trên Figma:
  - https://www.figma.com/design/HdQSDT7ZwzRNZVJ8wtwdOK/PORTFOLIO-website---VALORANT-THEME----Community-?node-id=0-1&p=f&t=7HqwtlfH25yEHHNc-0
  - https://www.figma.com/design/gtO8kNJe2spwqMOsrGQY7w/My-Valorant-Website--Community-?node-id=0-1&p=f&t=8ZC74dcNQUmDlVLO-0
  - https://www.figma.com/design/jQNJhtTqoALHhG2CPs3f3C/game-add--Community-?node-id=0-1&p=f&t=ZzNfovVoqcfKecSW-0
  - https://www.figma.com/design/SQl2IsagjVpj4a6sdJfh3D/Valorant-Project--Community-?node-id=2-2278&p=f&t=lURTaKunfvWs9A1D-0
- Luôn responsive, hiển thị tốt trên laptop và mobile, và tương thích nhiều trình duyệt.

## Quy tắc bắt buộc

- Phải dùng hình ảnh của Valorant để trang trí, minh họa, nhưng không lạm dụng. Ưu tiên dùng làm nền và điểm nhấn trang trí.
- Bảng màu lấy theo bảng màu của Valorant.
- Hỗ trợ 3 ngôn ngữ: **Anh, Việt và Nhật** (nút EN / VI / JA). Mọi văn bản hiển thị trên giao diện phải có đủ ba phiên bản (thêm vào `js/i18n.js`), không hard-code một ngôn ngữ.

## Workflow

Sau khi code xong, luôn kiểm tra giao diện hiện tại:

1. Đã mang phong cách Valorant chưa (bảng màu, hình ảnh, bố cục).
2. Có lỗi font không.
3. Có lỗi animation không.
4. Đối chiếu lại với các thiết kế tham khảo để xác nhận style còn phù hợp.
5. Kiểm tra responsive trên laptop và mobile, cùng cả ba ngôn ngữ Anh/Việt/Nhật (chú ý font Noto Sans JP và việc ngắt dòng chữ Nhật).
