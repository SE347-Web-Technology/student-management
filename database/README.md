# Cơ sở dữ liệu PostgreSQL - 10 Bảng Thực Thể Cốt Lõi

Lược đồ cơ sở dữ liệu gồm **10 bảng thực thể cốt lõi**:
`TAIKHOAN`, `GIAOVIEN`, `NAMHOC`, `LOP`, `HOCSINH`, `MONHOC`, `PHANCONG`, `DIEM`, `DIEMDANH`, `KYLUAT`.

## Phân chia trách nhiệm
- **`database/schema/` (`SV4`, `SV5` – Back-end):** Thiết kế và tinh chỉnh cấu trúc bảng, khóa ngoại, ràng buộc dữ liệu tại [01_init_10_core_tables.sql](schema/01_init_10_core_tables.sql) cho khớp với code API/ORM.
- **`database/seed/` (`SV6` – DevOps):** Viết và bổ sung dữ liệu mẫu tại [02_seed_sample_data.sql](seed/02_seed_sample_data.sql) phục vụ kiểm thử đồng bộ và vận hành trên PostgreSQL.

Khởi chạy nhanh PostgreSQL (tự động tạo 10 bảng và nạp Seed Data):
```bash
cd ../deploy
docker compose up -d postgres
```

---

## 1. Danh mục 10 bảng dữ liệu cốt lõi

| STT | Bảng | Vai trò | Khóa chính |
| :---: | :--- | :--- | :---: |
| 1 | `TAIKHOAN` | Thông tin đăng nhập và vai trò (`GIAO_VU`, `GIAO_VIEN`, `PHU_HUYNH`) | `id` |
| 2 | `GIAOVIEN` | Hồ sơ giáo viên và tài khoản liên kết | `id` |
| 3 | `NAMHOC` | Mốc thời gian năm học | `id` |
| 4 | `LOP` | Lớp học theo khối `10, 11, 12` và năm học | `id` |
| 5 | `HOCSINH` | Hồ sơ học sinh, thông tin phụ huynh và lớp đang học | `id` |
| 6 | `MONHOC` | Danh mục môn học theo khối áp dụng | `id` |
| 7 | `PHANCONG` | Phân công giáo viên – lớp – môn học – học kỳ | `id` |
| 8 | `DIEM` | Điểm thành phần (`THUONG_XUYEN`, `GIUA_KY`, `CUOI_KY`) | `id` |
| 9 | `DIEMDANH` | Trạng thái điểm danh theo ngày và buổi học | `id` |
| 10 | `KYLUAT` | Bản ghi kỷ luật hoặc khen thưởng học sinh | `id` |

---

## 2. Cấu trúc chi tiết từng bảng

### 2.1. Bảng `TAIKHOAN`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh tài khoản |
| `username` | `varchar(50)` | `NOT NULL, UNIQUE` | Tên đăng nhập |
| `password_hash` | `varchar(255)` | `NOT NULL` | Mật khẩu đã băm |
| `role` | `varchar(20)` | `NOT NULL, CHECK` | `GIAO_VU`, `GIAO_VIEN` hoặc `PHU_HUYNH` |
| `is_active` | `boolean` | `NOT NULL, DEFAULT true` | Trạng thái hoạt động (mở / khóa) |

### 2.2. Bảng `GIAOVIEN`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh giáo viên |
| `ho_ten` | `varchar(100)` | `NOT NULL` | Họ và tên giáo viên |
| `taikhoan_id` | `bigint` | `FK, UNIQUE, NULL` | Tham chiếu `TAIKHOAN(id)` (tối đa 1 tài khoản) |

### 2.3. Bảng `NAMHOC`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh năm học |
| `ten_namhoc` | `varchar(20)` | `NOT NULL, UNIQUE` | Tên năm học (ví dụ: `2026-2027`) |
| `ngay_batdau` | `date` | `NOT NULL` | Ngày bắt đầu năm học |
| `ngay_ketthuc` | `date` | `NOT NULL, CHECK` | Phải lớn hơn `ngay_batdau` |

### 2.4. Bảng `LOP`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh lớp |
| `ten_lop` | `varchar(30)` | `NOT NULL` | Tên lớp (ví dụ: `10A1`) |
| `khoi` | `smallint` | `NOT NULL, CHECK` | Khối lớp (`10`, `11` hoặc `12`) |
| `namhoc_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `NAMHOC(id)` |
| `gvcn_id` | `bigint` | `FK, NULL` | Giáo viên chủ nhiệm; tham chiếu `GIAOVIEN(id)` |
| `uq_lop_namhoc` | `unique(ten_lop, namhoc_id)` | `UNIQUE` | Không trùng tên lớp trong cùng một năm học |

### 2.5. Bảng `HOCSINH`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh học sinh |
| `ho_ten` | `varchar(100)` | `NOT NULL` | Họ và tên học sinh |
| `ngay_sinh` | `date` | `NOT NULL` | Ngày sinh |
| `gioi_tinh` | `varchar(10)` | `CHECK` | `NAM`, `NU` hoặc `KHAC` |
| `dia_chi` | `varchar(255)` | `NULL` | Địa chỉ liên hệ |
| `ten_phu_huynh` | `varchar(100)` | `NULL` | Họ tên phụ huynh |
| `quan_he_phu_huynh` | `varchar(50)` | `NULL` | Quan hệ với học sinh (Cha, Mẹ...) |
| `sdt_phu_huynh` | `varchar(15)` | `NULL` | Số điện thoại phụ huynh |
| `email` | `varchar(150)` | `NULL` | Email liên hệ của học sinh / phụ huynh |
| `lop_id` | `bigint` | `FK, NULL` | Lớp đang theo học; tham chiếu `LOP(id)` |
| `taikhoan_id` | `bigint` | `FK, UNIQUE, NULL` | Tài khoản cổng Học sinh/Phụ huynh; tham chiếu `TAIKHOAN(id)` |

### 2.6. Bảng `MONHOC`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh môn học |
| `ten_mon` | `varchar(100)` | `NOT NULL` | Tên môn học |
| `khoi_ap_dung` | `smallint` | `NOT NULL, CHECK` | Khối áp dụng (`10`, `11` hoặc `12`) |
| `uq_mon_khoi` | `unique(ten_mon, khoi_ap_dung)` | `UNIQUE` | Không trùng môn học trong cùng một khối |

### 2.7. Bảng `PHANCONG`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh phân công |
| `monhoc_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `MONHOC(id)` |
| `lop_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `LOP(id)` |
| `giaovien_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `GIAOVIEN(id)` |
| `hocky` | `smallint` | `NOT NULL, CHECK` | Học kỳ (`1` hoặc `2`) |
| `uq_phancong` | `unique(monhoc_id, lop_id, hocky)` | `UNIQUE` | Một môn của một lớp chỉ có một giáo viên trong học kỳ |

### 2.8. Bảng `DIEM`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh điểm |
| `hocsinh_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `HOCSINH(id)` |
| `phancong_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `PHANCONG(id)` |
| `loai_diem` | `varchar(20)` | `NOT NULL, CHECK` | `THUONG_XUYEN`, `GIUA_KY` hoặc `CUOI_KY` |
| `thu_tu` | `smallint` | `NOT NULL, DEFAULT 1` | Thứ tự điểm cùng loại (cho phép nhiều điểm thường xuyên) |
| `gia_tri` | `numeric(4,2)` | `NOT NULL, CHECK` | Giá trị điểm từ `0` đến `10` |
| `uq_diem` | `unique(hocsinh_id, phancong_id, loai_diem, thu_tu)` | `UNIQUE` | Không trùng một đầu điểm |

### 2.9. Bảng `DIEMDANH`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh bản ghi điểm danh |
| `hocsinh_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `HOCSINH(id)` |
| `phancong_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `PHANCONG(id)` |
| `ngay` | `date` | `NOT NULL` | Ngày diễn ra buổi học |
| `buoi_hoc` | `varchar(10)` | `NOT NULL, CHECK` | `SANG` hoặc `CHIEU` |
| `trang_thai` | `varchar(20)` | `NOT NULL, CHECK` | `CO_MAT`, `VANG_CO_PHEP` hoặc `VANG_KHONG_PHEP` |
| `uq_diemdanh` | `unique(hocsinh_id, phancong_id, ngay, buoi_hoc)` | `UNIQUE` | Mỗi học sinh có một trạng thái trong một buổi học |

### 2.10. Bảng `KYLUAT`
| Cột | Kiểu dữ liệu PostgreSQL | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `bigserial` | `PK` | Định danh bản ghi |
| `hocsinh_id` | `bigint` | `FK, NOT NULL` | Tham chiếu `HOCSINH(id)` |
| `loai` | `varchar(20)` | `NOT NULL, CHECK` | `KY_LUAT` hoặc `KHEN_THUONG` |
| `noi_dung` | `text` | `NOT NULL` | Mô tả sự việc hoặc thành tích |
| `hinh_thuc` | `varchar(255)` | `NULL` | Hình thức xử lý hoặc khen thưởng |
| `ngay_ghinhan` | `date` | `NOT NULL` | Ngày ghi nhận |
| `nguoi_ghinhan_id` | `bigint` | `FK, NOT NULL` | Người lập bản ghi; tham chiếu `TAIKHOAN(id)` |
| `nguoi_xacnhan_id` | `bigint` | `FK, NULL` | Giáo vụ xác nhận; tham chiếu `TAIKHOAN(id)` |
