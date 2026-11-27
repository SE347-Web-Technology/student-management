-- Khởi tạo 10 bảng dữ liệu cốt lõi cho Website Quản lý Học sinh (PostgreSQL)

CREATE TABLE IF NOT EXISTS TAIKHOAN (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('GIAO_VU', 'GIAO_VIEN', 'PHU_HUYNH')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS GIAOVIEN (
    id BIGSERIAL PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    taikhoan_id BIGINT UNIQUE REFERENCES TAIKHOAN(id)
);

CREATE TABLE IF NOT EXISTS NAMHOC (
    id BIGSERIAL PRIMARY KEY,
    ten_namhoc VARCHAR(20) NOT NULL UNIQUE,
    ngay_batdau DATE NOT NULL,
    ngay_ketthuc DATE NOT NULL CHECK (ngay_ketthuc > ngay_batdau)
);

CREATE TABLE IF NOT EXISTS LOP (
    id BIGSERIAL PRIMARY KEY,
    ten_lop VARCHAR(30) NOT NULL,
    khoi SMALLINT NOT NULL CHECK (khoi IN (10, 11, 12)),
    namhoc_id BIGINT NOT NULL REFERENCES NAMHOC(id),
    gvcn_id BIGINT REFERENCES GIAOVIEN(id),
    CONSTRAINT uq_lop_namhoc UNIQUE (ten_lop, namhoc_id)
);

CREATE TABLE IF NOT EXISTS HOCSINH (
    id BIGSERIAL PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    ngay_sinh DATE NOT NULL,
    gioi_tinh VARCHAR(10) CHECK (gioi_tinh IN ('NAM', 'NU', 'KHAC')),
    dia_chi VARCHAR(255),
    ten_phu_huynh VARCHAR(100),
    quan_he_phu_huynh VARCHAR(50),
    sdt_phu_huynh VARCHAR(15),
    email VARCHAR(150),
    lop_id BIGINT REFERENCES LOP(id),
    taikhoan_id BIGINT UNIQUE REFERENCES TAIKHOAN(id)
);

CREATE TABLE IF NOT EXISTS MONHOC (
    id BIGSERIAL PRIMARY KEY,
    ten_mon VARCHAR(100) NOT NULL,
    khoi_ap_dung SMALLINT NOT NULL CHECK (khoi_ap_dung IN (10, 11, 12)),
    CONSTRAINT uq_mon_khoi UNIQUE (ten_mon, khoi_ap_dung)
);

CREATE TABLE IF NOT EXISTS PHANCONG (
    id BIGSERIAL PRIMARY KEY,
    monhoc_id BIGINT NOT NULL REFERENCES MONHOC(id),
    lop_id BIGINT NOT NULL REFERENCES LOP(id),
    giaovien_id BIGINT NOT NULL REFERENCES GIAOVIEN(id),
    hocky SMALLINT NOT NULL CHECK (hocky IN (1, 2)),
    CONSTRAINT uq_phancong UNIQUE (monhoc_id, lop_id, hocky)
);

CREATE TABLE IF NOT EXISTS DIEM (
    id BIGSERIAL PRIMARY KEY,
    hocsinh_id BIGINT NOT NULL REFERENCES HOCSINH(id),
    phancong_id BIGINT NOT NULL REFERENCES PHANCONG(id),
    loai_diem VARCHAR(20) NOT NULL CHECK (loai_diem IN ('THUONG_XUYEN', 'GIUA_KY', 'CUOI_KY')),
    thu_tu SMALLINT NOT NULL DEFAULT 1,
    gia_tri NUMERIC(4,2) NOT NULL CHECK (gia_tri >= 0 AND gia_tri <= 10),
    CONSTRAINT uq_diem UNIQUE (hocsinh_id, phancong_id, loai_diem, thu_tu)
);

CREATE TABLE IF NOT EXISTS DIEMDANH (
    id BIGSERIAL PRIMARY KEY,
    hocsinh_id BIGINT NOT NULL REFERENCES HOCSINH(id),
    phancong_id BIGINT NOT NULL REFERENCES PHANCONG(id),
    ngay DATE NOT NULL,
    buoi_hoc VARCHAR(10) NOT NULL CHECK (buoi_hoc IN ('SANG', 'CHIEU')),
    trang_thai VARCHAR(20) NOT NULL CHECK (trang_thai IN ('CO_MAT', 'VANG_CO_PHEP', 'VANG_KHONG_PHEP')),
    CONSTRAINT uq_diemdanh UNIQUE (hocsinh_id, phancong_id, ngay, buoi_hoc)
);

CREATE TABLE IF NOT EXISTS KYLUAT (
    id BIGSERIAL PRIMARY KEY,
    hocsinh_id BIGINT NOT NULL REFERENCES HOCSINH(id),
    loai VARCHAR(20) NOT NULL CHECK (loai IN ('KY_LUAT', 'KHEN_THUONG')),
    noi_dung TEXT NOT NULL,
    hinh_thuc VARCHAR(255),
    ngay_ghinhan DATE NOT NULL,
    nguoi_ghinhan_id BIGINT NOT NULL REFERENCES TAIKHOAN(id),
    nguoi_xacnhan_id BIGINT REFERENCES TAIKHOAN(id)
);
