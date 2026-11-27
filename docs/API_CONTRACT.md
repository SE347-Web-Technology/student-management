# Bảng Chốt Giao Tiếp API Frontend – Backend (API Contract)

Tài liệu này là hợp đồng chung giữa **Frontend (`SV1`, `SV2`, `SV3`)** và **Backend (`SV4`, `SV5`)** để hai bên code song song độc lập dựa trên **10 bảng cốt lõi**.

- **Base URL:** `/api` (mặc định `http://localhost:8080/api`)
- **Xác thực:** Header `Authorization: Bearer <jwt_token>`
- **Định dạng ngày:** `YYYY-MM-DD` (ví dụ `2026-11-26`)
- **Vai trò (`role`):** `GIAO_VU` | `GIAO_VIEN` | `PHU_HUYNH`

---

## Tổng Hợp Toàn Bộ API

| STT | Module / Bảng | Method | Endpoint | Mô tả ngắn | Màn hình FE |
| :---: | :--- | :---: | :--- | :--- | :--- |
| 1 | `security` (`TAIKHOAN`) | `POST` | `/api/auth/login` | Đăng nhập, trả JWT + thông tin user | `C01, M01` |
| 2 | `security` (`TAIKHOAN`) | `POST` | `/api/auth/logout` | Đăng xuất phiên làm việc | `Header` (All) |
| 3 | `security` (`TAIKHOAN`) | `GET` | `/api/auth/me` | Lấy thông tin tài khoản đang đăng nhập | `MainLayout` |
| 4 | `account` (`TAIKHOAN`) | `GET` | `/api/accounts` | Danh sách tài khoản người dùng | `A15` |
| 5 | `account` (`TAIKHOAN`) | `POST` | `/api/accounts` | Cấp tài khoản mới & gắn hồ sơ GV/HS | `A15` |
| 6 | `account` (`TAIKHOAN`) | `PATCH` | `/api/accounts/{id}/status` | Khóa / mở khóa tài khoản | `A15` |
| 7 | `student` (`HOCSINH`) | `GET` | `/api/students` | Danh sách học sinh (tìm kiếm, lọc lớp) | `A01, A02, T05` |
| 8 | `student` (`HOCSINH`) | `GET` | `/api/students/{id}` | Xem chi tiết hồ sơ 1 học sinh | `A04, P01` |
| 9 | `student` (`HOCSINH`) | `POST` | `/api/students` | Tiếp nhận học sinh mới (tuổi 15–20) | `A03` |
| 10 | `student` (`HOCSINH`) | `PUT` | `/api/students/{id}` | Chỉnh sửa hồ sơ học sinh | `A05` |
| 11 | `student` (`HOCSINH`) | `DELETE` | `/api/students/{id}` | Xóa hồ sơ học sinh | `A02` |
| 12 | `teacher` (`GIAOVIEN`) | `GET` | `/api/teachers` | Danh sách giáo viên | `A01, A06, A09, A15` |
| 13 | `teacher` (`GIAOVIEN`) | `POST` | `/api/teachers` | Thêm hồ sơ giáo viên mới | `A09, A15` |
| 14 | `catalog` (`NAMHOC`) | `GET` | `/api/academic-years` | Danh sách năm học | `A01, A06` |
| 15 | `catalog` (`NAMHOC`) | `POST` | `/api/academic-years` | Tạo năm học mới | `A06` |
| 16 | `catalog` (`LOP`) | `GET` | `/api/classes` | Danh sách lớp học (lọc theo khối/năm) | `A01, A06, A07, A10` |
| 17 | `catalog` (`LOP`) | `POST` | `/api/classes` | Tạo lớp học mới | `A06` |
| 18 | `catalog` (`LOP`) | `PUT` | `/api/classes/{id}` | Cập nhật lớp học / GVCN | `A06` |
| 19 | `catalog` (`LOP`, `HOCSINH`) | `POST` | `/api/classes/{id}/assign-students` | Xếp học sinh vào lớp (tối đa 40) | `A08` |
| 20 | `catalog` (`MONHOC`) | `GET` | `/api/subjects` | Danh sách môn học (lọc theo khối) | `A09, A10, A11, T02` |
| 21 | `catalog` (`MONHOC`) | `POST` | `/api/subjects` | Thêm môn học mới | `A09` |
| 22 | `catalog` (`PHANCONG`) | `GET` | `/api/assignments` | Danh sách phân công giảng dạy | `A09, T01` |
| 23 | `catalog` (`PHANCONG`) | `POST` | `/api/assignments` | Tạo phân công giáo viên – lớp – môn | `A09` |
| 24 | `catalog` (Cấu hình) | `GET` | `/api/rules` | Lấy quy định học vụ (tuổi, sĩ số, điểm đạt) | `A14` |
| 25 | `catalog` (Cấu hình) | `PUT` | `/api/rules` | Cập nhật quy định học vụ cơ bản | `A14` |
| 26 | `grade` (`DIEM`) | `GET` | `/api/grades` | Tra cứu bảng điểm theo lớp/môn/học kỳ | `A10, T02, T03` |
| 27 | `grade` (`DIEM`) | `PUT` | `/api/grades/batch` | Lưu bảng điểm & tự động tính ĐTB, xếp loại | `T02, M02` |
| 28 | `grade` (`DIEM`) | `GET` | `/api/grades/student/{hocsinhId}` | Xem bảng điểm cá nhân theo học kỳ | `P01, P02, M03` |
| 29 | `grade` (`DIEM`) | `GET` | `/api/reports/subject` | Báo cáo tổng kết môn học (sĩ số, đạt, %) | `A11, A13` |
| 30 | `grade` (`DIEM`) | `GET` | `/api/reports/semester` | Báo cáo tổng kết học kỳ theo học sinh | `A12, A13` |
| 31 | `attendance` (`DIEMDANH`) | `GET` | `/api/attendance` | Lấy danh sách điểm danh theo buổi học | `T04` |
| 32 | `attendance` (`DIEMDANH`) | `PUT` | `/api/attendance/batch` | Lưu điểm danh cả lớp trong buổi học | `T04` |
| 33 | `attendance` (`DIEMDANH`) | `GET` | `/api/attendance/student/{hocsinhId}` | Xem lịch sử chuyên cần cá nhân | `P01, P03` |
| 34 | `discipline` (`KYLUAT`) | `GET` | `/api/disciplines` | Danh sách kỷ luật / khen thưởng | `A16, T05, P04` |
| 35 | `discipline` (`KYLUAT`) | `POST` | `/api/disciplines` | Ghi nhận khen thưởng / kỷ luật mới | `T05, A16` |

---

## Chi Tiết Request & Response

## Phần A – Phụ trách `SV4` (Auth, Tài khoản, Học sinh, Giáo viên)

### 1. Xác thực (`security`)
- `POST /api/auth/login`
  - Request: `{ "username": "giaovu", "password": "123" }`
  - Response `200`:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "id": 1,
        "username": "giaovu",
        "fullName": "Nguyễn Thị Minh (Giáo vụ)",
        "role": "GIAO_VU",
        "linkedId": null
      }
    }
    ```
  - Lưu ý `linkedId`:
    - Nếu `role = "GIAO_VIEN"` -> trả về `GIAOVIEN.id` tương ứng (`WHERE taikhoan_id = user.id`).
    - Nếu `role = "PHU_HUYNH"` -> trả về `HOCSINH.id` tương ứng (`WHERE taikhoan_id = user.id`).
- `POST /api/auth/logout` -> Response `200`: `{ "message": "Đăng xuất thành công" }`
- `GET /api/auth/me` -> Response `200`: thông tin `user` hiện tại.

### 2. Quản lý tài khoản (`account` – bảng `TAIKHOAN`)
- `GET /api/accounts` -> Danh sách tài khoản `[{ id, username, role, isActive, fullName, linkedId }]`
- `POST /api/accounts` -> Cấp tài khoản mới:
  - Request: `{ "username": "hs03", "password": "123", "role": "PHU_HUYNH", "linkedId": 3 }`
  - Logic: Tạo dòng trong `TAIKHOAN` (hash bcrypt). Nếu `role = GIAO_VIEN`, cập nhật `GIAOVIEN.taikhoan_id`; nếu `role = PHU_HUYNH`, cập nhật `HOCSINH.taikhoan_id`.
- `PATCH /api/accounts/{id}/status` -> Đổi trạng thái khóa/mở khóa `{ isActive: true | false }`

### 3. Quản lý hồ sơ học sinh (`student` – bảng `HOCSINH`)
- `GET /api/students?keyword=&lopId=` -> `[{ id, hoTen, ngaySinh, gioiTinh, diaChi, tenPhuHuynh, quanHePhuHuynh, sdtPhuHuynh, email, lopId, tenLop, taikhoanId }]`
- `GET /api/students/{id}` -> Chi tiết 1 học sinh
- `POST /api/students` -> Tiếp nhận học sinh mới (kiểm tra tuổi 15–20)
- `PUT /api/students/{id}` -> Cập nhật hồ sơ học sinh
- `DELETE /api/students/{id}` -> Xóa hồ sơ học sinh

### 4. Quản lý giáo viên (`teacher` – bảng `GIAOVIEN`)
- `GET /api/teachers` -> `[{ id, hoTen, taikhoanId, username }]`
- `POST /api/teachers` -> `{ hoTen }`

---

## Phần B – Phụ trách `SV5` (Lớp, Môn, Phân công, Quy định, Điểm, Điểm danh, Kỷ luật, Báo cáo)

### 5. Năm học, Lớp học, Môn học, Phân công & Quy định (`catalog` – `NAMHOC`, `LOP`, `MONHOC`, `PHANCONG`)
- `GET /api/academic-years` / `POST /api/academic-years`
- `GET /api/classes?namhocId=&khoi=` -> `[{ id, tenLop, khoi, namhocId, tenNamhoc, gvcnId, tenGvcn, siSo }]`
- `POST /api/classes` -> Tạo lớp mới `{ tenLop, khoi, namhocId, gvcnId }`
- `PUT /api/classes/{id}` -> Cập nhật lớp / GVCN
- `POST /api/classes/{id}/assign-students` -> Xếp học sinh vào lớp `{ studentIds: [1, 2] }` (kiểm tra sĩ số <= 40)
- `GET /api/subjects?khoi=` / `POST /api/subjects` -> Danh mục môn học (`MONHOC`)
- `GET /api/assignments?lopId=&hocky=&giaovienId=` / `POST /api/assignments` -> Phân công giảng dạy (`PHANCONG`)
- `GET /api/rules` / `PUT /api/rules` -> Cấu hình quy định cơ bản `{ tuoiToiThieu: 15, tuoiToiDa: 20, siSoToiDa: 40, diemDatMon: 5.0 }`

### 6. Điểm số & Báo cáo tổng kết (`grade` – bảng `DIEM`)
- `GET /api/grades?lopId=&monhocId=&hocky=` -> Bảng điểm theo lớp/môn/học kỳ:
  ```json
  [
    {
      "hocsinhId": 1,
      "hoTen": "Trần Minh Anh",
      "lopId": 1,
      "tenLop": "10A1",
      "monhocId": 1,
      "tenMon": "Toán học",
      "hocky": 1,
      "thuongXuyen": [8.5, 9.0],
      "giuaKy": 8.5,
      "cuoiKy": 9.0,
      "diemTrungBinh": 8.8,
      "xepLoai": "Giỏi",
      "dat": true
    }
  ]
  ```
- `PUT /api/grades/batch` -> Lưu bảng điểm giáo viên vừa nhập và tự động tính lại `diemTrungBinh`, `xepLoai`.
- `GET /api/grades/student/{hocsinhId}?hocky=` -> Bảng điểm cá nhân (Cổng Học sinh / Phụ huynh `P02`).
- `GET /api/reports/subject?monhocId=&hocky=` -> Báo cáo tổng kết môn học (`A11`).
- `GET /api/reports/semester?hocky=` -> Báo cáo tổng kết học kỳ (`A12`).

### 7. Điểm danh (`attendance` – bảng `DIEMDANH`)
- `GET /api/attendance?phancongId=&ngay=&buoiHoc=` -> Danh sách điểm danh buổi học (`CO_MAT`, `VANG_CO_PHEP`, `VANG_KHONG_PHEP`)
- `PUT /api/attendance/batch` -> Lưu trạng thái điểm danh cả lớp trong buổi học
- `GET /api/attendance/student/{hocsinhId}` -> Lịch sử chuyên cần cá nhân (`P03`)

### 8. Kỷ luật – Khen thưởng (`discipline` – bảng `KYLUAT`)
- `GET /api/disciplines?hocsinhId=&loai=` -> Danh sách khen thưởng / kỷ luật
- `POST /api/disciplines` -> Tạo bản ghi mới `{ hocsinhId, loai, noiDung, hinhThuc, ngayGhinhan }`
