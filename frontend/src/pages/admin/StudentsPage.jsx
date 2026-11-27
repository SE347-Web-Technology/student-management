// [SV1] Quản lý hồ sơ học sinh: Danh sách, Tìm kiếm, Thêm mới, Chỉnh sửa, Xem chi tiết, Xóa (A02 - A05)
import { useEffect, useState } from "react";
import { DataTable, InputField, Modal, SelectField, Toast } from "../../components/index.js";
import { studentService } from "../../services/studentService.js";
import { catalogService } from "../../services/catalogService.js";
import { isValidEmail, isValidStudentAge } from "../../utils/validators.js";

const EMPTY_FORM = {
  hoTen: "",
  ngaySinh: "2011-01-01",
  gioiTinh: "NAM",
  diaChi: "",
  tenPhuHuynh: "",
  quanHePhuHuynh: "Cha",
  sdtPhuHuynh: "",
  email: "",
  lopId: "",
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterLopId, setFilterLopId] = useState("");

  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | "view" | null
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: "", type: "success" });

  const loadData = async () => {
    const [stus, clss] = await Promise.all([
      studentService.getAll({ keyword, lopId: filterLopId }),
      catalogService.getClasses(),
    ]);
    setStudents(stus);
    setClasses(clss);
  };

  useEffect(() => {
    loadData();
  }, [keyword, filterLopId]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setModalMode("create");
  };

  const openEdit = (stu) => {
    setSelectedStudent(stu);
    setForm({
      hoTen: stu.hoTen || "",
      ngaySinh: stu.ngaySinh || "2011-01-01",
      gioiTinh: stu.gioiTinh || "NAM",
      diaChi: stu.diaChi || "",
      tenPhuHuynh: stu.tenPhuHuynh || "",
      quanHePhuHuynh: stu.quanHePhuHuynh || "Cha",
      sdtPhuHuynh: stu.sdtPhuHuynh || "",
      email: stu.email || "",
      lopId: stu.lopId || "",
    });
    setErrors({});
    setModalMode("edit");
  };

  const openView = (stu) => {
    setSelectedStudent(stu);
    setModalMode("view");
  };

  const validate = () => {
    const nextErr = {};
    if (!form.hoTen.trim()) nextErr.hoTen = "Vui lòng nhập họ tên học sinh.";
    if (!isValidStudentAge(form.ngaySinh)) {
      nextErr.ngaySinh = "Độ tuổi học sinh phải trong khoảng 15–20 tuổi.";
    }
    if (!isValidEmail(form.email)) nextErr.email = "Định dạng email không hợp lệ.";
    setErrors(nextErr);
    return Object.keys(nextErr).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (modalMode === "create") {
      await studentService.create(form);
      setToast({ message: "Đã tiếp nhận hồ sơ học sinh mới.", type: "success" });
    } else if (modalMode === "edit" && selectedStudent) {
      await studentService.update(selectedStudent.id, form);
      setToast({ message: "Đã cập nhật hồ sơ học sinh.", type: "success" });
    }
    setModalMode(null);
    loadData();
  };

  const handleDelete = async (stu) => {
    if (!window.confirm(`Xác nhận xóa hồ sơ học sinh "${stu.hoTen}"?`)) return;
    await studentService.remove(stu.id);
    setToast({ message: `Đã xóa hồ sơ ${stu.hoTen}.`, type: "warning" });
    loadData();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý hồ sơ học sinh (A02–A05)</h1>
          <p className="page-subtitle">Danh sách, tìm kiếm, tiếp nhận, chi tiết và chỉnh sửa hồ sơ</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tiếp nhận học sinh
        </button>
      </div>

      <Toast message={toast.message} type={toast.type} />

      <div className="card">
        <div className="toolbar">
          <input
            className="input-inline"
            placeholder="Tìm theo tên, mã HS hoặc lớp..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ minWidth: "240px" }}
          />
          <select
            className="input-inline"
            value={filterLopId}
            onChange={(e) => setFilterLopId(e.target.value)}
          >
            <option value="">Tất cả các lớp</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Lớp {c.tenLop}
              </option>
            ))}
          </select>
        </div>

        <DataTable
          data={students}
          columns={[
            { key: "id", title: "Mã HS" },
            { key: "hoTen", title: "Họ và tên" },
            { key: "ngaySinh", title: "Ngày sinh" },
            { key: "tenLop", title: "Lớp" },
            { key: "tenPhuHuynh", title: "Phụ huynh" },
            { key: "sdtPhuHuynh", title: "SĐT liên hệ" },
            {
              key: "actions",
              title: "Thao tác",
              render: (r) => (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => openView(r)}>
                    Xem
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(r)}>
                    Sửa
                  </button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(r)}>
                    Xóa
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <Modal
        isOpen={modalMode === "create" || modalMode === "edit"}
        title={modalMode === "create" ? "Tiếp nhận hồ sơ học sinh (A03)" : "Chỉnh sửa hồ sơ học sinh (A05)"}
        onClose={() => setModalMode(null)}
      >
        <form onSubmit={handleSave}>
          <div className="grid-2">
            <InputField
              label="Họ và tên *"
              value={form.hoTen}
              error={errors.hoTen}
              onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
            />
            <InputField
              label="Ngày sinh *"
              type="date"
              value={form.ngaySinh}
              error={errors.ngaySinh}
              onChange={(e) => setForm({ ...form, ngaySinh: e.target.value })}
            />
            <SelectField
              label="Giới tính"
              value={form.gioiTinh}
              onChange={(e) => setForm({ ...form, gioiTinh: e.target.value })}
              options={[
                { value: "NAM", label: "Nam" },
                { value: "NU", label: "Nữ" },
                { value: "KHAC", label: "Khác" },
              ]}
            />
            <SelectField
              label="Xếp vào lớp"
              value={form.lopId}
              onChange={(e) => setForm({ ...form, lopId: e.target.value })}
              options={[
                { value: "", label: "-- Chưa xếp lớp --" },
                ...classes.map((c) => ({ value: c.id, label: c.tenLop })),
              ]}
            />
            <InputField
              label="Email liên hệ"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <InputField
              label="Địa chỉ"
              value={form.diaChi}
              onChange={(e) => setForm({ ...form, diaChi: e.target.value })}
            />
            <InputField
              label="Họ tên phụ huynh"
              value={form.tenPhuHuynh}
              onChange={(e) => setForm({ ...form, tenPhuHuynh: e.target.value })}
            />
            <InputField
              label="SĐT phụ huynh"
              value={form.sdtPhuHuynh}
              onChange={(e) => setForm({ ...form, sdtPhuHuynh: e.target.value })}
            />
          </div>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalMode(null)}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu hồ sơ
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={modalMode === "view" && Boolean(selectedStudent)}
        title="Chi tiết hồ sơ học sinh (A04)"
        onClose={() => setModalMode(null)}
      >
        {selectedStudent && (
          <div style={{ display: "grid", gap: "8px", fontSize: "0.92rem" }}>
            <div><strong>Mã HS:</strong> #{selectedStudent.id}</div>
            <div><strong>Họ và tên:</strong> {selectedStudent.hoTen}</div>
            <div><strong>Ngày sinh:</strong> {selectedStudent.ngaySinh}</div>
            <div><strong>Giới tính:</strong> {selectedStudent.gioiTinh}</div>
            <div><strong>Lớp hiện tại:</strong> {selectedStudent.tenLop}</div>
            <div><strong>Email:</strong> {selectedStudent.email || "—"}</div>
            <div><strong>Địa chỉ:</strong> {selectedStudent.diaChi || "—"}</div>
            <div><strong>Phụ huynh:</strong> {selectedStudent.tenPhuHuynh || "—"} ({selectedStudent.quanHePhuHuynh || "—"})</div>
            <div><strong>SĐT phụ huynh:</strong> {selectedStudent.sdtPhuHuynh || "—"}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
