// [SV1] Trang chủ Dashboard Giáo vụ (A01)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable, StatCard } from "../../components/index.js";
import { studentService } from "../../services/studentService.js";
import { catalogService } from "../../services/catalogService.js";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ students: 0, classes: 0, teachers: 0, subjects: 0 });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    Promise.all([
      studentService.getAll(),
      catalogService.getClasses(),
      catalogService.getTeachers(),
      catalogService.getSubjects(),
    ]).then(([stus, clss, tchs, subjs]) => {
      setCounts({
        students: stus.length,
        classes: clss.length,
        teachers: tchs.length,
        subjects: subjs.length,
      });
      setClasses(clss);
    });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Trang chủ Dashboard Giáo vụ (A01)</h1>
          <p className="page-subtitle">Tổng quan dữ liệu học vụ toàn trường năm học 2026-2027</p>
        </div>
      </div>

      <div className="grid-stats">
        <StatCard title="Tổng số học sinh" value={counts.students} subtitle="Hồ sơ đang theo học" />
        <StatCard title="Tổng số lớp học" value={counts.classes} subtitle="Khối 10, 11, 12" />
        <StatCard title="Đội ngũ giáo viên" value={counts.teachers} subtitle="Đang giảng dạy" />
        <StatCard title="Môn học" value={counts.subjects} subtitle="Chương trình THPT" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "10px" }}>Lối tắt nghiệp vụ</h3>
        <div className="toolbar">
          <Link to="/admin/students" className="btn btn-primary">+ Tiếp nhận học sinh</Link>
          <Link to="/admin/classes" className="btn btn-outline">Quản lý lớp & xếp lớp</Link>
          <Link to="/admin/accounts" className="btn btn-outline">Cấp tài khoản người dùng</Link>
          <Link to="/admin/reports" className="btn btn-outline">Xem báo cáo tổng kết</Link>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "10px" }}>Tình hình sĩ số các lớp</h3>
        <DataTable
          data={classes}
          columns={[
            { key: "tenLop", title: "Lớp" },
            { key: "khoi", title: "Khối" },
            { key: "tenGvcn", title: "Giáo viên chủ nhiệm" },
            { key: "siSo", title: "Sĩ số", render: (r) => `${r.siSo}/40` },
          ]}
        />
      </div>
    </div>
  );
}
