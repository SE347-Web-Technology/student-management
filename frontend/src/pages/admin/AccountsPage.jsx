// [SV2] Quản lý tài khoản người dùng & cấp tài khoản liên kết hồ sơ (A15)
import { useEffect, useState } from "react";
import { DataTable, InputField, Modal, SelectField, Toast } from "../../components/index.js";
import { accountService } from "../../services/accountService.js";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [unlinked, setUnlinked] = useState({ teachers: [], students: [] });
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState({ username: "", password: "123", role: "PHU_HUYNH", linkedId: "" });
  const [toast, setToast] = useState({ message: "", type: "success" });

  const load = async () => {
    const [accs, targets] = await Promise.all([
      accountService.getAll(),
      accountService.getUnlinkedTargets(),
    ]);
    setAccounts(accs);
    setUnlinked(targets);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await accountService.create(form);
      setOpenCreate(false);
      setForm({ username: "", password: "123", role: "PHU_HUYNH", linkedId: "" });
      setToast({ message: "Đã cấp tài khoản và liên kết hồ sơ thành công.", type: "success" });
      load();
    } catch (err) {
      setToast({ message: err.message, type: "danger" });
    }
  };

  const handleToggle = async (id) => {
    await accountService.toggleActive(id);
    setToast({ message: "Đã cập nhật trạng thái tài khoản.", type: "success" });
    load();
  };

  const targetOptions =
    form.role === "GIAO_VIEN"
      ? unlinked.teachers.map((t) => ({ value: t.id, label: `GV: ${t.hoTen}` }))
      : form.role === "PHU_HUYNH"
      ? unlinked.students.map((s) => ({ value: s.id, label: `HS: ${s.hoTen}` }))
      : [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý tài khoản người dùng (A15)</h1>
          <p className="page-subtitle">Cấp tài khoản theo 3 vai trò và liên kết với hồ sơ Giáo viên / Học sinh</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpenCreate(true)}>
          + Cấp tài khoản mới
        </button>
      </div>

      <Toast message={toast.message} type={toast.type} />

      <div className="card">
        <DataTable
          data={accounts}
          columns={[
            { key: "username", title: "Tên đăng nhập" },
            { key: "fullName", title: "Họ tên / Hồ sơ liên kết" },
            { key: "role", title: "Vai trò" },
            {
              key: "isActive",
              title: "Trạng thái",
              render: (r) => (
                <span className={`badge ${r.isActive ? "badge-success" : "badge-danger"}`}>
                  {r.isActive ? "Đang hoạt động" : "Đã khóa"}
                </span>
              ),
            },
            {
              key: "actions",
              title: "Thao tác",
              render: (r) => (
                <button type="button" className="btn btn-outline btn-sm" onClick={() => handleToggle(r.id)}>
                  {r.isActive ? "Khóa" : "Mở khóa"}
                </button>
              ),
            },
          ]}
        />
      </div>

      <Modal isOpen={openCreate} title="Cấp tài khoản người dùng mới (A15)" onClose={() => setOpenCreate(false)}>
        <form onSubmit={handleCreate}>
          <SelectField
            label="Vai trò tài khoản"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value, linkedId: "" })}
            options={[
              { value: "PHU_HUYNH", label: "Học sinh / Phụ huynh (PHU_HUYNH)" },
              { value: "GIAO_VIEN", label: "Giáo viên (GIAO_VIEN)" },
              { value: "GIAO_VU", label: "Giáo vụ (GIAO_VU)" },
            ]}
          />
          {form.role !== "GIAO_VU" && (
            <SelectField
              label={form.role === "GIAO_VIEN" ? "Liên kết hồ sơ Giáo viên chưa có tài khoản" : "Liên kết hồ sơ Học sinh chưa có tài khoản"}
              value={form.linkedId}
              onChange={(e) => setForm({ ...form, linkedId: e.target.value })}
              options={[
                { value: "", label: "-- Chọn hồ sơ liên kết --" },
                ...targetOptions,
              ]}
            />
          )}
          <InputField
            label="Tên đăng nhập *"
            placeholder="Ví dụ: hs03 hoặc gv03"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <InputField
            label="Mật khẩu khởi tạo *"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">Tạo và liên kết tài khoản</button>
        </form>
      </Modal>
    </div>
  );
}
