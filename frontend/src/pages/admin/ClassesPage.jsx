// [SV1] Quản lý lớp học theo khối 10, 11, 12 và xếp học sinh vào lớp (A06 - A08)
import { useEffect, useState } from "react";
import { DataTable, InputField, Modal, SelectField, Toast } from "../../components/index.js";
import { catalogService } from "../../services/catalogService.js";
import { studentService } from "../../services/studentService.js";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [khoiFilter, setKhoiFilter] = useState("");

  const [openCreate, setOpenCreate] = useState(false);
  const [classForm, setClassForm] = useState({ tenLop: "", khoi: 10, gvcnId: "" });

  const [assignClass, setAssignClass] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const loadData = async () => {
    const [clss, tchs, stus] = await Promise.all([
      catalogService.getClasses({ khoi: khoiFilter }),
      catalogService.getTeachers(),
      studentService.getAll(),
    ]);
    setClasses(clss);
    setTeachers(tchs);
    setStudents(stus);
  };

  useEffect(() => {
    loadData();
  }, [khoiFilter]);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      await catalogService.createClass(classForm);
      setOpenCreate(false);
      setClassForm({ tenLop: "", khoi: 10, gvcnId: "" });
      setToast({ message: "Đã tạo lớp học mới.", type: "success" });
      loadData();
    } catch (err) {
      setToast({ message: err.message, type: "danger" });
    }
  };

  const handleAssignStudent = async (e) => {
    e.preventDefault();
    if (!assignClass || !selectedStudentId) return;
    try {
      await catalogService.assignStudentToClass(assignClass.id, selectedStudentId);
      setAssignClass(null);
      setSelectedStudentId("");
      setToast({ message: `Đã xếp học sinh vào lớp ${assignClass.tenLop}.`, type: "success" });
      loadData();
    } catch (err) {
      setToast({ message: err.message, type: "danger" });
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý lớp học và xếp lớp (A06–A08)</h1>
          <p className="page-subtitle">Danh sách lớp theo khối, sĩ số (tối đa 40) và giáo viên chủ nhiệm</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpenCreate(true)}>
          + Tạo lớp mới
        </button>
      </div>

      <Toast message={toast.message} type={toast.type} />

      <div className="card">
        <div className="toolbar">
          <select
            className="input-inline"
            value={khoiFilter}
            onChange={(e) => setKhoiFilter(e.target.value)}
          >
            <option value="">Tất cả khối (10, 11, 12)</option>
            <option value="10">Khối 10</option>
            <option value="11">Khối 11</option>
            <option value="12">Khối 12</option>
          </select>
        </div>
        <DataTable
          data={classes}
          columns={[
            { key: "tenLop", title: "Tên lớp" },
            { key: "khoi", title: "Khối" },
            { key: "tenNamhoc", title: "Năm học" },
            { key: "tenGvcn", title: "Giáo viên chủ nhiệm" },
            { key: "siSo", title: "Sĩ số", render: (r) => `${r.siSo}/40` },
            {
              key: "actions",
              title: "Thao tác",
              render: (r) => (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setAssignClass(r);
                    setSelectedStudentId(students[0]?.id ? String(students[0].id) : "");
                  }}
                >
                  Xếp học sinh
                </button>
              ),
            },
          ]}
        />
      </div>

      <Modal isOpen={openCreate} title="Tạo lớp học mới (A06)" onClose={() => setOpenCreate(false)}>
        <form onSubmit={handleCreateClass}>
          <InputField
            label="Tên lớp *"
            placeholder="Ví dụ: 10A2"
            value={classForm.tenLop}
            onChange={(e) => setClassForm({ ...classForm, tenLop: e.target.value })}
            required
          />
          <SelectField
            label="Khối"
            value={classForm.khoi}
            onChange={(e) => setClassForm({ ...classForm, khoi: Number(e.target.value) })}
            options={[
              { value: 10, label: "Khối 10" },
              { value: 11, label: "Khối 11" },
              { value: 12, label: "Khối 12" },
            ]}
          />
          <SelectField
            label="Giáo viên chủ nhiệm"
            value={classForm.gvcnId}
            onChange={(e) => setClassForm({ ...classForm, gvcnId: e.target.value })}
            options={[
              { value: "", label: "-- Chọn sau --" },
              ...teachers.map((t) => ({ value: t.id, label: t.hoTen })),
            ]}
          />
          <button type="submit" className="btn btn-primary">Lưu lớp học</button>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(assignClass)}
        title={`Xếp học sinh vào lớp ${assignClass?.tenLop || ""} (A08)`}
        onClose={() => setAssignClass(null)}
      >
        <form onSubmit={handleAssignStudent}>
          <SelectField
            label="Chọn học sinh"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            options={students.map((s) => ({
              value: s.id,
              label: `${s.hoTen} (${s.tenLop})`,
            }))}
          />
          <button type="submit" className="btn btn-primary">Xác nhận xếp lớp</button>
        </form>
      </Modal>
    </div>
  );
}
