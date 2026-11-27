// [SV1] Quản lý môn học và phân công giảng dạy (A09)
import { useEffect, useState } from "react";
import { DataTable, InputField, Modal, SelectField, Toast } from "../../components/index.js";
import { catalogService } from "../../services/catalogService.js";

export default function SubjectsAssignmentsPage() {
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [openSubjModal, setOpenSubjModal] = useState(false);
  const [subjForm, setSubjForm] = useState({ tenMon: "", khoiApDung: 10 });

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({ lopId: 1, monhocId: 1, giaovienId: 1, hocky: 1 });
  const [toast, setToast] = useState({ message: "", type: "success" });

  const loadData = async () => {
    const [subjs, asgs, clss, tchs] = await Promise.all([
      catalogService.getSubjects(),
      catalogService.getAssignments(),
      catalogService.getClasses(),
      catalogService.getTeachers(),
    ]);
    setSubjects(subjs);
    setAssignments(asgs);
    setClasses(clss);
    setTeachers(tchs);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    await catalogService.createSubject(subjForm);
    setOpenSubjModal(false);
    setSubjForm({ tenMon: "", khoiApDung: 10 });
    setToast({ message: "Đã thêm môn học mới.", type: "success" });
    loadData();
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try {
      await catalogService.createAssignment(assignForm);
      setOpenAssignModal(false);
      setToast({ message: "Đã phân công giảng dạy thành công.", type: "success" });
      loadData();
    } catch (err) {
      setToast({ message: err.message, type: "danger" });
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý môn học & Phân công giảng dạy (A09)</h1>
          <p className="page-subtitle">Khai báo danh mục môn học và gán giáo viên bộ môn theo lớp/học kỳ</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-outline" onClick={() => setOpenSubjModal(true)}>
            + Thêm môn học
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setOpenAssignModal(true)}>
            + Tạo phân công
          </button>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />

      <div className="card">
        <h3 style={{ marginBottom: "10px" }}>Danh sách phân công giảng dạy</h3>
        <DataTable
          data={assignments}
          columns={[
            { key: "tenLop", title: "Lớp" },
            { key: "tenMon", title: "Môn học" },
            { key: "tenGiaovien", title: "Giáo viên phụ trách" },
            { key: "hocky", title: "Học kỳ", render: (r) => `HK ${r.hocky}` },
          ]}
        />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "10px" }}>Danh mục môn học</h3>
        <DataTable
          data={subjects}
          columns={[
            { key: "id", title: "Mã môn" },
            { key: "tenMon", title: "Tên môn học" },
            { key: "khoiApDung", title: "Khối áp dụng", render: (r) => `Khối ${r.khoiApDung}` },
          ]}
        />
      </div>

      <Modal isOpen={openSubjModal} title="Thêm môn học" onClose={() => setOpenSubjModal(false)}>
        <form onSubmit={handleAddSubject}>
          <InputField
            label="Tên môn học *"
            value={subjForm.tenMon}
            onChange={(e) => setSubjForm({ ...subjForm, tenMon: e.target.value })}
            required
          />
          <SelectField
            label="Khối áp dụng"
            value={subjForm.khoiApDung}
            onChange={(e) => setSubjForm({ ...subjForm, khoiApDung: Number(e.target.value) })}
            options={[
              { value: 10, label: "Khối 10" },
              { value: 11, label: "Khối 11" },
              { value: 12, label: "Khối 12" },
            ]}
          />
          <button type="submit" className="btn btn-primary">Lưu môn học</button>
        </form>
      </Modal>

      <Modal isOpen={openAssignModal} title="Phân công giảng dạy" onClose={() => setOpenAssignModal(false)}>
        <form onSubmit={handleAddAssignment}>
          <SelectField
            label="Lớp"
            value={assignForm.lopId}
            onChange={(e) => setAssignForm({ ...assignForm, lopId: Number(e.target.value) })}
            options={classes.map((c) => ({ value: c.id, label: c.tenLop }))}
          />
          <SelectField
            label="Môn học"
            value={assignForm.monhocId}
            onChange={(e) => setAssignForm({ ...assignForm, monhocId: Number(e.target.value) })}
            options={subjects.map((m) => ({ value: m.id, label: `${m.tenMon} (Khối ${m.khoiApDung})` }))}
          />
          <SelectField
            label="Giáo viên"
            value={assignForm.giaovienId}
            onChange={(e) => setAssignForm({ ...assignForm, giaovienId: Number(e.target.value) })}
            options={teachers.map((t) => ({ value: t.id, label: t.hoTen }))}
          />
          <SelectField
            label="Học kỳ"
            value={assignForm.hocky}
            onChange={(e) => setAssignForm({ ...assignForm, hocky: Number(e.target.value) })}
            options={[
              { value: 1, label: "Học kỳ 1" },
              { value: 2, label: "Học kỳ 2" },
            ]}
          />
          <button type="submit" className="btn btn-primary">Lưu phân công</button>
        </form>
      </Modal>
    </div>
  );
}
