# Đóng gói & Triển khai Website lên Máy chủ - DevOps (SV6)

Thư mục dành cho thành viên **SV6 – DevOps & Deploy**. Khi chạy Docker Compose tại đây, PostgreSQL sẽ tự động nạp **10 bảng dữ liệu ban đầu** và **dữ liệu mẫu**:

## 1. Khởi tạo PostgreSQL & các bảng dữ liệu ban đầu
File `docker-compose.yml` tự động mount 2 file SQL vào `/docker-entrypoint-initdb.d/`:
1. `../database/schema/01_init_10_core_tables.sql` — Tạo **10 bảng cốt lõi ban đầu**:
   `TAIKHOAN`, `GIAOVIEN`, `NAMHOC`, `LOP`, `HOCSINH`, `MONHOC`, `PHANCONG`, `DIEM`, `DIEMDANH`, `KYLUAT`.
2. `../database/seed/02_seed_sample_data.sql` — Nạp dữ liệu mẫu cho 3 vai trò (`giaovu`, `gv01`/`gv02`, `hs01`/`hs02`), năm học, lớp học, môn học, điểm số, điểm danh và kỷ luật.

Chạy lệnh khởi tạo:
```bash
docker compose up -d postgres
```

Kiểm tra nhanh 10 bảng vừa tạo:
```bash
docker exec -it se347_qlhs_postgres psql -U postgres -d student_management -c "\dt"
```

Nếu sửa file `.sql` và muốn nạp lại DB sạch từ đầu:
```bash
docker compose down -v
docker compose up -d postgres
```

## 2. Đóng gói & Deploy toàn hệ thống
- Viết `Dockerfile` cho `frontend/` (build React tĩnh và phục vụ qua `nginx/default.conf`) và `backend/` (sau khi team Backend chốt công nghệ).
- Bổ sung service `backend` và `frontend` vào `docker-compose.yml` để triển khai trọn bộ lên Cloud / VPS / Hosting.
