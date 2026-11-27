# SE347.R11 - Nhóm 05 - Hệ thống quản lý học sinh

Đồ án môn học **Công nghệ Web và Ứng dụng (SE347)** – Đề tài: **Xây dựng Website Quản lý Học sinh**.

---

## 1. Thiết lập theo từng mảng (Front-end – Back-end – DevOps)

### 1.1. Front-end (`SV1`, `SV2`, `SV3`) — Chạy độc lập
Toàn bộ các màn hình (`C01`, `A01–A16`, `T01–T05`, `P01–P04`) đã được phác thảo đầy đủ luồng nghiệp vụ với **Mock Data (`VITE_USE_MOCK=true`)**:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`. Trên trang Đăng nhập có sẵn 3 nút đăng nhập nhanh cho **Giáo vụ**, **Giáo viên**, **Học sinh / Phụ huynh**.
- Khi Back-end hoàn thành API, đổi `VITE_USE_MOCK=false` trong `frontend/.env` để kết nối API thật theo [docs/API_CONTRACT.md](docs/API_CONTRACT.md).

### 1.2. Back-end (`SV4`, `SV5`) — Thiết kế khung CSDL & Dựng RESTful API
- Xem mô tả chi tiết **10 bảng thực thể cốt lõi** tại [database/README.md](database/README.md), thiết kế và tinh chỉnh cấu trúc bảng tại [database/schema/01_init_10_core_tables.sql](database/schema/01_init_10_core_tables.sql) (khi cần thêm/sửa cột hoặc dùng ORM).
- Bám sát danh sách endpoint và định dạng JSON trong [docs/API_CONTRACT.md](docs/API_CONTRACT.md) để ghép khớp trực tiếp với Front-end.
- Cấu trúc gói gợi ý nằm tại `backend/src/main/java/com/` ([backend/README.md](backend/README.md)) và file mẫu cấu hình tại `backend/src/main/resources/application.yml.example` (cổng mặc định `8080`, DB `student_management`).
- **Tự do chọn công nghệ:** Báo cáo hiện ghi mẫu Java 21 + Spring Boot; nếu `SV4` và `SV5` thống nhất dùng Node.js (Express / NestJS) hoặc Python (FastAPI) thì cứ thay ruột thư mục `backend/` cho phù hợp và báo Nhóm trưởng cập nhật lại tên công nghệ trong báo cáo.

### 1.3. DevOps & Seed Data (`SV6`) — Viết dữ liệu mẫu, Dựng PostgreSQL & Deploy
- Xem hướng dẫn chi tiết tại [deploy/README.md](deploy/README.md) (khởi tạo DB & cấu hình Deploy) và tham khảo cấu trúc 10 bảng tại [database/README.md](database/README.md) để viết/bổ sung dữ liệu mẫu.

```bash
cd deploy
docker compose up -d postgres
```

Lệnh trên tự động chạy:
1. `database/schema/01_init_10_core_tables.sql` (khung 10 bảng cốt lõi do Back-end thiết kế)
2. `database/seed/02_seed_sample_data.sql` (dữ liệu mẫu do DevOps viết và bổ sung)

Kiểm tra nhanh 10 bảng trong PostgreSQL:
```bash
docker exec -it se347_qlhs_postgres psql -U postgres -d student_management -c "\dt"
```

- Phụ trách viết/bổ sung dữ liệu mẫu tại `database/seed/02_seed_sample_data.sql`, viết `Dockerfile` đóng gói Front-end/Back-end, cấu hình Nginx (`deploy/nginx/default.conf`) và triển khai lên máy chủ (Cloud / VPS / Hosting).

---

## 2. Phân chia công việc 

| Vị trí | Thư mục / File phụ trách | Nhiệm vụ chính |
| :--- | :--- | :--- |
| **SV1 – Frontend 1** | `frontend/src/layouts/`, `frontend/src/pages/auth/`, `AdminDashboardPage`, `StudentsPage`, `ClassesPage`, `SubjectsAssignmentsPage` | Thiết kế Layout Template dùng chung (`MainLayout`, `AuthLayout`, logo/banner); Trang Đăng nhập (`C01`), Giáo vụ Cụm 1 (`A01–A09`); vẽ Sơ đồ Sitemap (`Hình 1.1`). |
| **SV2 – Frontend 2** | `frontend/src/components/`, `GradeLookupAdminPage`, `ReportsPage`, `SettingsPage`, `AccountsPage`, `DisciplineAdminPage` | Hoàn thiện bộ UI Component dùng chung (`DataTable`, `Modal`, `FormControls`, `StatCard`, `Toast`, `Header`, `Sidebar`, `Footer`); Giáo vụ Cụm 2 (`A10–A16`); vẽ Sơ đồ Use Case (`Hình 3.1`). |
| **SV3 – Frontend 3** | `frontend/src/pages/teacher/`, `frontend/src/pages/student/`, `frontend/src/styles/responsive.css` | Cổng Giáo viên (`T01–T05`: Trang chủ, Nhập điểm, Điểm danh, Kỷ luật) và Cổng Học sinh / Phụ huynh (`P01–P04`, `M03` chuẩn Responsive Mobile). |
| **SV4 – Backend 1** | `backend/src/main/java/com/` (`config/`, `security/`, `account/`, `student/`, `teacher/`), `database/schema/` | Thiết kế/tinh chỉnh schema (`TAIKHOAN`, `HOCSINH`, `GIAOVIEN`); API Đăng nhập/Phân quyền JWT + CRUD; vẽ Sơ đồ kiến trúc & module (`Hình 3.2, 3.3`). |
| **SV5 – Backend 2** | `backend/src/main/java/com/` (`catalog/`, `grade/`, `attendance/`, `discipline/`), `database/schema/` | Thiết kế/tinh chỉnh schema (`NAMHOC`, `LOP`, `MONHOC`, `PHANCONG`, `DIEM`, `DIEMDANH`, `KYLUAT`); API CRUD & tính điểm + Báo cáo; vẽ Biểu đồ tuần tự (`Hình 3.4–3.7`) & ERD (`Hình 3.8`). |
| **SV6 – DevOps & Deploy** | `database/seed/`, `deploy/` | Viết/hoàn thiện dữ liệu mẫu (`Seed Data`); dựng PostgreSQL, viết `Dockerfile`, cấu hình `docker-compose.yml` & `nginx/default.conf`; Deploy lên máy chủ & test tích hợp. |

---

## 3. Quy ước Git khi làm nhóm
- Không push trực tiếp vào nhánh `main` (nhánh `main` đã khóa, chỉ Nhóm trưởng duyệt merge qua Pull Request).
- Mỗi thành viên checkout đúng nhánh của mình để code:
  - `fe/sv1-layout-admin1`, `fe/sv2-components-admin2`, `fe/sv3-teacher-student`
  - `be/sv4-auth-student`, `be/sv5-catalog-grade`
  - `devops/sv6-deploy`
- Luồng làm việc chuẩn:
  ```bash
  git checkout <ten-nhanh-cua-ban>
  git fetch origin && git merge origin/main   # kéo code mới từ main trước khi code
  git add . && git commit -m "feat: ..."
  git push
  ```
- Sau khi hoàn thành từng phần việc, tạo **Pull Request -> `main`** trên GitHub để Nhóm trưởng kiểm tra và merge.
