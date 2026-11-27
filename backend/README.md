# Phân hệ Dịch vụ Web API - Backend (SV4, SV5)

Thư mục chứa mã nguồn RESTful Web API phục vụ Website Quản lý Học sinh.
Các bạn làm Backend (`SV4`, `SV5`) chịu trách nhiệm thiết kế/tinh chỉnh lược đồ CSDL tại `database/schema/01_init_10_core_tables.sql` và cài đặt đúng các endpoint JSON trong [docs/API_CONTRACT.md](../docs/API_CONTRACT.md).

> **Lưu ý chọn công nghệ:** Trong báo cáo hiện đang ghi mẫu **Java 21 + Spring Boot**. Nếu `SV4` và `SV5` muốn dùng **Node.js (Express / NestJS)** hoặc **Python (FastAPI)** để code nhanh hơn thì hoàn toàn thoải mái — chỉ cần tạo project trong thư mục `backend/` này, giữ đúng `docs/API_CONTRACT.md` và cập nhật lại tên công nghệ ở Mục 1.6, 1.7 và Bảng 3.15 trong file Word báo cáo là xong.

## Phân chia module giữa 2 bạn Backend:
1. **SV4 – Backend 1:** `config/`, `security/` (Đăng nhập, JWT, phân quyền), `account/` (`TAIKHOAN` + gắn `taikhoan_id`), `student/` (`HOCSINH`), `teacher/` (`GIAOVIEN`).
2. **SV5 – Backend 2:** `catalog/` (`NAMHOC`, `LOP`, `MONHOC`, `PHANCONG`), `grade/` (`DIEM` + tính ĐTB + báo cáo), `attendance/` (`DIEMDANH`), `discipline/` (`KYLUAT`).
