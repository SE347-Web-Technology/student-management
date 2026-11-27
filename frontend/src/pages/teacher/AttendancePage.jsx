// [SV3] Điểm danh học sinh theo lớp / buổi học (T04)
import { useEffect, useState } from "react";
import { DataTable, Toast } from "../../components/index.js";
import { attendanceService } from "../../services/attendanceService.js";

export default function AttendancePage() {
  const [rows, setRows] = useState([]);
  const [ngay, setNgay] = useState("2026-11-24");
  const [buoiHoc, setBuoiHoc] = useState("SANG");
  const [toast, setToast] = useState("");

  useEffect(() => {
    attendanceService.getSession({ ngay, buoiHoc }).then(setRows);
  }, [ngay, buoiHoc]);

  const changeStatus = (id, trangThai) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, trangThai } : r)));
  };

  const handleSave = async () => {
    await attendanceService.saveBatch(rows);
    setToast("Đã lưu danh sách điểm danh buổi học.");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Điểm danh học sinh theo buổi (T04)</h1>
          <p className="page-subtitle">Đánh dấu Có mặt / Vắng có phép / Vắng không phép</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Lưu điểm danh
        </button>
      </div>
      <Toast message={toast} />
      <div className="card">
        <div className="toolbar">
          <input type="date" className="input-inline" value={ngay} onChange={(e) => setNgay(e.target.value)} />
          <select className="input-inline" value={buoiHoc} onChange={(e) => setBuoiHoc(e.target.value)}>
            <option value="SANG">Buổi Sáng</option>
            <option value="CHIEU">Buổi Chiều</option>
          </select>
        </div>
        <DataTable
          data={rows}
          columns={[
            { key: "hoTen", title: "Học sinh" },
            { key: "tenLop", title: "Lớp" },
            { key: "tenMon", title: "Môn học" },
            {
              key: "trangThai",
              title: "Trạng thái chuyên cần",
              render: (r) => (
                <select
                  className="input-inline"
                  value={r.trangThai}
                  onChange={(e) => changeStatus(r.id, e.target.value)}
                >
                  <option value="CO_MAT">Có mặt</option>
                  <option value="VANG_CO_PHEP">Vắng có phép</option>
                  <option value="VANG_KHONG_PHEP">Vắng không phép</option>
                </select>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
