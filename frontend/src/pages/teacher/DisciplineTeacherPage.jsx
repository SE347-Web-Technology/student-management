// [SV3] Ghi nhận kỷ luật / khen thưởng học sinh (T05)
import { useEffect, useState } from "react";
import { DataTable, InputField, SelectField, Toast } from "../../components/index.js";
import { disciplineService } from "../../services/disciplineService.js";
import { studentService } from "../../services/studentService.js";

export default function DisciplineTeacherPage() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    hocsinhId: 1,
    loai: "KHEN_THUONG",
    noiDung: "",
    hinhThuc: "",
    ngayGhinhan: "2026-11-26",
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    Promise.all([disciplineService.getAll(), studentService.getAll()]).then(([disc, stus]) => {
      setItems(disc);
      setStudents(stus);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await disciplineService.create(form);
    setItems((prev) => [created, ...prev]);
    setForm({ ...form, noiDung: "", hinhThuc: "" });
    setToast("Đã ghi nhận thông tin thành công.");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Ghi nhận Kỷ luật – Khen thưởng (T05)</h1>
          <p className="page-subtitle">Lập bản ghi khen thưởng hoặc nhắc nhở rèn luyện</p>
        </div>
      </div>
      <Toast message={toast} />
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <SelectField
              label="Học sinh"
              value={form.hocsinhId}
              onChange={(e) => setForm({ ...form, hocsinhId: Number(e.target.value) })}
              options={students.map((s) => ({ value: s.id, label: `${s.hoTen} (${s.tenLop})` }))}
            />
            <SelectField
              label="Loại ghi nhận"
              value={form.loai}
              onChange={(e) => setForm({ ...form, loai: e.target.value })}
              options={[
                { value: "KHEN_THUONG", label: "Khen thưởng" },
                { value: "KY_LUAT", label: "Kỷ luật" },
              ]}
            />
            <InputField label="Nội dung *" value={form.noiDung} onChange={(e) => setForm({ ...form, noiDung: e.target.value })} required />
            <InputField label="Hình thức" value={form.hinhThuc} onChange={(e) => setForm({ ...form, hinhThuc: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary">Lưu ghi nhận</button>
        </form>
      </div>
      <div className="card">
        <DataTable
          data={items}
          columns={[
            { key: "hoTen", title: "Học sinh" },
            { key: "loai", title: "Loại" },
            { key: "noiDung", title: "Nội dung" },
            { key: "hinhThuc", title: "Hình thức" },
            { key: "ngayGhinhan", title: "Ngày" },
          ]}
        />
      </div>
    </div>
  );
}
