// [SV3] Tra cứu lịch sử điểm danh cá nhân (P03)
import { useEffect, useState } from "react";
import { DataTable, StatCard } from "../../components/index.js";
import { attendanceService } from "../../services/attendanceService.js";
import { authService } from "../../services/authService.js";

const STATUS_LABEL = {
  CO_MAT: { text: "Có mặt", cls: "badge-success" },
  VANG_CO_PHEP: { text: "Vắng có phép", cls: "badge-warning" },
  VANG_KHONG_PHEP: { text: "Vắng không phép", cls: "badge-danger" },
};

export default function StudentAttendancePage() {
  const [rows, setRows] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    attendanceService.getByStudent(user?.linkedId || 1).then(setRows);
  }, []);

  const present = rows.filter((r) => r.trangThai === "CO_MAT").length;
  const absent = rows.length - present;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Lịch sử điểm danh chuyên cần (P03)</h1>
          <p className="page-subtitle">Theo dõi tình trạng có mặt / vắng theo buổi học</p>
        </div>
      </div>

      <div className="grid-stats">
        <StatCard title="Số buổi có mặt" value={present} />
        <StatCard title="Số buổi vắng" value={absent} />
      </div>

      <div className="card">
        <DataTable
          data={rows}
          columns={[
            { key: "ngay", title: "Ngày học" },
            { key: "tenMon", title: "Môn học" },
            { key: "buoiHoc", title: "Buổi" },
            {
              key: "trangThai",
              title: "Trạng thái",
              render: (r) => {
                const st = STATUS_LABEL[r.trangThai] || { text: r.trangThai, cls: "" };
                return <span className={`badge ${st.cls}`}>{st.text}</span>;
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
