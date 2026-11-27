// Dữ liệu giả lập liên thông (Mock Store) khớp 100% với 10 bảng CSDL & docs/API_CONTRACT.md
// Khi thêm/sửa dữ liệu ở một trang (ví dụ thêm học sinh hoặc cấp tài khoản), các trang khác cập nhật theo ngay.

export const mockStore = {
  users: [
    {
      id: 1,
      username: "giaovu",
      password: "123",
      role: "GIAO_VU",
      fullName: "Nguyễn Thị Minh (Giáo vụ)",
      isActive: true,
      linkedId: null,
    },
    {
      id: 2,
      username: "gv01",
      password: "123",
      role: "GIAO_VIEN",
      fullName: "Trần Văn Hùng",
      isActive: true,
      linkedId: 1,
    },
    {
      id: 3,
      username: "gv02",
      password: "123",
      role: "GIAO_VIEN",
      fullName: "Lê Thị Thu Hà",
      isActive: true,
      linkedId: 2,
    },
    {
      id: 4,
      username: "hs01",
      password: "123",
      role: "PHU_HUYNH",
      fullName: "Trần Minh Anh",
      isActive: true,
      linkedId: 1,
    },
    {
      id: 5,
      username: "hs02",
      password: "123",
      role: "PHU_HUYNH",
      fullName: "Nguyễn Hoàng Nam",
      isActive: true,
      linkedId: 2,
    },
  ],

  teachers: [
    { id: 1, hoTen: "Trần Văn Hùng", taikhoanId: 2, username: "gv01" },
    { id: 2, hoTen: "Lê Thị Thu Hà", taikhoanId: 3, username: "gv02" },
    { id: 3, hoTen: "Phạm Minh Đức", taikhoanId: null, username: null },
  ],

  years: [
    { id: 1, tenNamhoc: "2026-2027", ngayBatdau: "2026-09-05", ngayKetthuc: "2027-05-25" },
  ],

  classes: [
    { id: 1, tenLop: "10A1", khoi: 10, namhocId: 1, tenNamhoc: "2026-2027", gvcnId: 1, tenGvcn: "Trần Văn Hùng" },
    { id: 2, tenLop: "11A1", khoi: 11, namhocId: 1, tenNamhoc: "2026-2027", gvcnId: 2, tenGvcn: "Lê Thị Thu Hà" },
    { id: 3, tenLop: "12A1", khoi: 12, namhocId: 1, tenNamhoc: "2026-2027", gvcnId: 3, tenGvcn: "Phạm Minh Đức" },
  ],

  students: [
    {
      id: 1,
      hoTen: "Trần Minh Anh",
      ngaySinh: "2011-03-14",
      gioiTinh: "NU",
      diaChi: "TP. Thủ Đức, TP.HCM",
      tenPhuHuynh: "Trần Quốc Bảo",
      quanHePhuHuynh: "Cha",
      sdtPhuHuynh: "0909123456",
      email: "minhanh@example.com",
      lopId: 1,
      taikhoanId: 4,
    },
    {
      id: 2,
      hoTen: "Nguyễn Hoàng Nam",
      ngaySinh: "2011-08-22",
      gioiTinh: "NAM",
      diaChi: "Quận 3, TP.HCM",
      tenPhuHuynh: "Nguyễn Thị Lan",
      quanHePhuHuynh: "Mẹ",
      sdtPhuHuynh: "0912345678",
      email: "hoangnam@example.com",
      lopId: 1,
      taikhoanId: 5,
    },
    {
      id: 3,
      hoTen: "Phạm Gia Bảo",
      ngaySinh: "2011-11-05",
      gioiTinh: "NAM",
      diaChi: "Bình Thạnh, TP.HCM",
      tenPhuHuynh: "Phạm Văn Dũng",
      quanHePhuHuynh: "Cha",
      sdtPhuHuynh: "0988777666",
      email: "giabao@example.com",
      lopId: 1,
      taikhoanId: null,
    },
    {
      id: 4,
      hoTen: "Lê Ngọc Hân",
      ngaySinh: "2010-02-19",
      gioiTinh: "NU",
      diaChi: "Quận 1, TP.HCM",
      tenPhuHuynh: "Lê Văn Tuấn",
      quanHePhuHuynh: "Cha",
      sdtPhuHuynh: "0933111222",
      email: "ngochan@example.com",
      lopId: 2,
      taikhoanId: null,
    },
    {
      id: 5,
      hoTen: "Võ Khánh Linh",
      ngaySinh: "2011-06-10",
      gioiTinh: "NU",
      diaChi: "Quận 10, TP.HCM",
      tenPhuHuynh: "Võ Thanh Hải",
      quanHePhuHuynh: "Cha",
      sdtPhuHuynh: "0977555444",
      email: "khanhlinh@example.com",
      lopId: null,
      taikhoanId: null,
    },
  ],

  subjects: [
    { id: 1, tenMon: "Toán học", khoiApDung: 10 },
    { id: 2, tenMon: "Ngữ văn", khoiApDung: 10 },
    { id: 3, tenMon: "Tiếng Anh", khoiApDung: 10 },
    { id: 4, tenMon: "Tin học", khoiApDung: 10 },
    { id: 5, tenMon: "Toán học", khoiApDung: 11 },
  ],

  assignments: [
    { id: 1, monhocId: 1, tenMon: "Toán học", lopId: 1, tenLop: "10A1", giaovienId: 1, tenGiaovien: "Trần Văn Hùng", hocky: 1 },
    { id: 2, monhocId: 2, tenMon: "Ngữ văn", lopId: 1, tenLop: "10A1", giaovienId: 2, tenGiaovien: "Lê Thị Thu Hà", hocky: 1 },
    { id: 3, monhocId: 3, tenMon: "Tiếng Anh", lopId: 1, tenLop: "10A1", giaovienId: 2, tenGiaovien: "Lê Thị Thu Hà", hocky: 1 },
    { id: 4, monhocId: 5, tenMon: "Toán học", lopId: 2, tenLop: "11A1", giaovienId: 1, tenGiaovien: "Trần Văn Hùng", hocky: 1 },
  ],

  grades: [
    { hocsinhId: 1, hoTen: "Trần Minh Anh", lopId: 1, tenLop: "10A1", monhocId: 1, tenMon: "Toán học", hocky: 1, thuongXuyen: [8.5, 9.0], giuaKy: 8.5, cuoiKy: 9.0, diemTrungBinh: 8.8, xepLoai: "Giỏi", dat: true },
    { hocsinhId: 1, hoTen: "Trần Minh Anh", lopId: 1, tenLop: "10A1", monhocId: 2, tenMon: "Ngữ văn", hocky: 1, thuongXuyen: [8.0, 8.0], giuaKy: 7.5, cuoiKy: 8.0, diemTrungBinh: 7.8, xepLoai: "Khá", dat: true },
    { hocsinhId: 1, hoTen: "Trần Minh Anh", lopId: 1, tenLop: "10A1", monhocId: 3, tenMon: "Tiếng Anh", hocky: 1, thuongXuyen: [9.0, 9.0], giuaKy: 8.5, cuoiKy: 9.0, diemTrungBinh: 8.9, xepLoai: "Giỏi", dat: true },
    { hocsinhId: 2, hoTen: "Nguyễn Hoàng Nam", lopId: 1, tenLop: "10A1", monhocId: 1, tenMon: "Toán học", hocky: 1, thuongXuyen: [7.0, 7.5], giuaKy: 6.5, cuoiKy: 7.0, diemTrungBinh: 6.9, xepLoai: "Khá", dat: true },
    { hocsinhId: 2, hoTen: "Nguyễn Hoàng Nam", lopId: 1, tenLop: "10A1", monhocId: 2, tenMon: "Ngữ văn", hocky: 1, thuongXuyen: [6.5, 7.0], giuaKy: 6.0, cuoiKy: 6.5, diemTrungBinh: 6.4, xepLoai: "Trung bình", dat: true },
    { hocsinhId: 3, hoTen: "Phạm Gia Bảo", lopId: 1, tenLop: "10A1", monhocId: 1, tenMon: "Toán học", hocky: 1, thuongXuyen: [5.0, 5.5], giuaKy: 4.5, cuoiKy: 4.5, diemTrungBinh: 4.7, xepLoai: "Yếu", dat: false },
  ],

  attendance: [
    { id: 1, phancongId: 1, hocsinhId: 1, hoTen: "Trần Minh Anh", tenLop: "10A1", tenMon: "Toán học", ngay: "2026-11-24", buoiHoc: "SANG", trangThai: "CO_MAT" },
    { id: 2, phancongId: 1, hocsinhId: 2, hoTen: "Nguyễn Hoàng Nam", tenLop: "10A1", tenMon: "Toán học", ngay: "2026-11-24", buoiHoc: "SANG", trangThai: "VANG_CO_PHEP" },
    { id: 3, phancongId: 1, hocsinhId: 3, hoTen: "Phạm Gia Bảo", tenLop: "10A1", tenMon: "Toán học", ngay: "2026-11-24", buoiHoc: "SANG", trangThai: "CO_MAT" },
  ],

  disciplines: [
    { id: 1, hocsinhId: 1, hoTen: "Trần Minh Anh", tenLop: "10A1", loai: "KHEN_THUONG", noiDung: "Đạt giải Nhì Olympic Toán cấp trường", hinhThuc: "Giấy khen", ngayGhinhan: "2026-11-15" },
    { id: 2, hocsinhId: 2, hoTen: "Nguyễn Hoàng Nam", tenLop: "10A1", loai: "KY_LUAT", noiDung: "Đi học trễ 2 buổi liên tiếp", hinhThuc: "Nhắc nhở trước lớp", ngayGhinhan: "2026-11-20" },
  ],

  rules: {
    tuoiToiThieu: 15,
    tuoiToiDa: 20,
    siSoToiDa: 40,
    diemDatMon: 5.0,
  },
};

// Backwards-compatible alias
export const MOCK_STUDENTS = mockStore.students;
