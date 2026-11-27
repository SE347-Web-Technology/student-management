// [SV3] Trang chủ Dashboard Giáo viên (T01)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable, StatCard } from "../../components/index.js";
import { catalogService } from "../../services/catalogService.js";
import { authService } from "../../services/authService.js";

export default function TeacherDashboardPage() {
  const [assignments, setAssignments] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    catalogService.getAssignments({ giaovienId: user?.linkedId || "" }).then(setAssignments);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Trang chủ Giáo viên (T01)</h1>
          <p className="page-subtitle">Xin chào {user?.fullName} – Danh sách lớp & môn được phân công</p>
        </div>
        <div className="toolbar">
          <Link to="/teacher/grades" className="btn btn-primary">Nhập điểm môn học</Link>
          <Link to="/teacher/attendance" className="btn btn-outline">Điểm danh buổi học</Link>
        </div>
      </div>

      <div className="grid-stats">
        <StatCard title="Số lớp phân công" value={assignments.length} subtitle="Học kỳ 1 (2026-2027)" />
        <StatCard title="Thao tác chính" value="Nhập điểm / Điểm danh" subtitle="Cập nhật trực tuyến" />
      </div>

      <div className="card">
        <DataTable
          data={assignments}
          columns={[
            { key: "tenLop", title: "Lớp" },
            { key: "tenMon", title: "Môn học" },
            { key: "hocky", title: "Học kỳ", render: (r) => `Học kỳ ${r.hocky}` },
          ]}
        />
      </div>
    </div>
  );
}
