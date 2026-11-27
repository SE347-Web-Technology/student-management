-- [SV6] Dữ liệu mẫu (Seed Data) phục vụ kiểm thử đồng bộ Frontend - Backend - Deploy
-- Lưu ý: password_hash đang đặt tạm chuỗi demo bcrypt/plain để các bạn Backend thay bằng hash thực tế khi cài auth.

INSERT INTO TAIKHOAN (id, username, password_hash, role, is_active) VALUES
  (1, 'giaovu', '$2a$10$demo_hash_123', 'GIAO_VU', TRUE),
  (2, 'gv01',   '$2a$10$demo_hash_123', 'GIAO_VIEN', TRUE),
  (3, 'gv02',   '$2a$10$demo_hash_123', 'GIAO_VIEN', TRUE),
  (4, 'hs01',   '$2a$10$demo_hash_123', 'PHU_HUYNH', TRUE),
  (5, 'hs02',   '$2a$10$demo_hash_123', 'PHU_HUYNH', TRUE)
ON CONFLICT (username) DO NOTHING;

INSERT INTO GIAOVIEN (id, ho_ten, taikhoan_id) VALUES
  (1, 'Trần Văn Hùng', 2),
  (2, 'Lê Thị Thu Hà', 3),
  (3, 'Phạm Minh Đức', NULL)
ON CONFLICT DO NOTHING;

INSERT INTO NAMHOC (id, ten_namhoc, ngay_batdau, ngay_ketthuc) VALUES
  (1, '2026-2027', '2026-09-05', '2027-05-25')
ON CONFLICT (ten_namhoc) DO NOTHING;

INSERT INTO LOP (id, ten_lop, khoi, namhoc_id, gvcn_id) VALUES
  (1, '10A1', 10, 1, 1),
  (2, '11A1', 11, 1, 2),
  (3, '12A1', 12, 1, 3)
ON CONFLICT ON CONSTRAINT uq_lop_namhoc DO NOTHING;

INSERT INTO HOCSINH (id, ho_ten, ngay_sinh, gioi_tinh, dia_chi, ten_phu_huynh, quan_he_phu_huynh, sdt_phu_huynh, email, lop_id, taikhoan_id) VALUES
  (1, 'Trần Minh Anh',    '2011-03-14', 'NU',  'TP. Thủ Đức, TP.HCM', 'Trần Quốc Bảo',  'Cha', '0909123456', 'minhanh@example.com',   1, 4),
  (2, 'Nguyễn Hoàng Nam', '2011-08-22', 'NAM', 'Quận 3, TP.HCM',       'Nguyễn Thị Lan', 'Mẹ',  '0912345678', 'hoangnam@example.com',  1, 5),
  (3, 'Phạm Gia Bảo',     '2011-11-05', 'NAM', 'Bình Thạnh, TP.HCM',   'Phạm Văn Dũng',  'Cha', '0988777666', 'giabao@example.com',    1, NULL),
  (4, 'Lê Ngọc Hân',      '2010-02-19', 'NU',  'Quận 1, TP.HCM',       'Lê Văn Tuấn',    'Cha', '0933111222', 'ngochan@example.com',   2, NULL),
  (5, 'Võ Khánh Linh',    '2011-06-10', 'NU',  'Quận 10, TP.HCM',      'Võ Thanh Hải',   'Cha', '0977555444', 'khanhlinh@example.com', NULL, NULL)
ON CONFLICT DO NOTHING;

INSERT INTO MONHOC (id, ten_mon, khoi_ap_dung) VALUES
  (1, 'Toán học',  10),
  (2, 'Ngữ văn',   10),
  (3, 'Tiếng Anh', 10),
  (4, 'Tin học',   10),
  (5, 'Toán học',  11)
ON CONFLICT ON CONSTRAINT uq_mon_khoi DO NOTHING;

INSERT INTO PHANCONG (id, monhoc_id, lop_id, giaovien_id, hocky) VALUES
  (1, 1, 1, 1, 1),
  (2, 2, 1, 2, 1),
  (3, 3, 1, 2, 1),
  (4, 5, 2, 1, 1)
ON CONFLICT ON CONSTRAINT uq_phancong DO NOTHING;

INSERT INTO DIEM (hocsinh_id, phancong_id, loai_diem, thu_tu, gia_tri) VALUES
  (1, 1, 'THUONG_XUYEN', 1, 8.5),
  (1, 1, 'THUONG_XUYEN', 2, 9.0),
  (1, 1, 'GIUA_KY',      1, 8.5),
  (1, 1, 'CUOI_KY',      1, 9.0),
  (2, 1, 'THUONG_XUYEN', 1, 7.0),
  (2, 1, 'GIUA_KY',      1, 6.5),
  (2, 1, 'CUOI_KY',      1, 7.0)
ON CONFLICT ON CONSTRAINT uq_diem DO NOTHING;

INSERT INTO DIEMDANH (hocsinh_id, phancong_id, ngay, buoi_hoc, trang_thai) VALUES
  (1, 1, '2026-11-24', 'SANG', 'CO_MAT'),
  (2, 1, '2026-11-24', 'SANG', 'VANG_CO_PHEP'),
  (3, 1, '2026-11-24', 'SANG', 'CO_MAT')
ON CONFLICT ON CONSTRAINT uq_diemdanh DO NOTHING;

INSERT INTO KYLUAT (hocsinh_id, loai, noi_dung, hinh_thuc, ngay_ghinhan, nguoi_ghinhan_id, nguoi_xacnhan_id) VALUES
  (1, 'KHEN_THUONG', 'Đạt giải Nhì Olympic Toán cấp trường', 'Giấy khen',          '2026-11-15', 2, 1),
  (2, 'KY_LUAT',     'Đi học trễ 2 buổi liên tiếp',          'Nhắc nhở trước lớp', '2026-11-20', 2, 1)
ON CONFLICT DO NOTHING;

-- Đồng bộ lại bộ đếm BIGSERIAL để lệnh INSERT mới từ Backend không bị trùng id
SELECT setval(pg_get_serial_sequence('taikhoan', 'id'), COALESCE((SELECT MAX(id) FROM taikhoan), 1));
SELECT setval(pg_get_serial_sequence('giaovien', 'id'), COALESCE((SELECT MAX(id) FROM giaovien), 1));
SELECT setval(pg_get_serial_sequence('namhoc',   'id'), COALESCE((SELECT MAX(id) FROM namhoc),   1));
SELECT setval(pg_get_serial_sequence('lop',      'id'), COALESCE((SELECT MAX(id) FROM lop),      1));
SELECT setval(pg_get_serial_sequence('hocsinh',  'id'), COALESCE((SELECT MAX(id) FROM hocsinh),  1));
SELECT setval(pg_get_serial_sequence('monhoc',   'id'), COALESCE((SELECT MAX(id) FROM monhoc),   1));
SELECT setval(pg_get_serial_sequence('phancong', 'id'), COALESCE((SELECT MAX(id) FROM phancong), 1));
