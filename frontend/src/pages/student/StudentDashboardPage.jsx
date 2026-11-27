// [SV3] Trang chủ Cổng Học sinh / Phụ huynh (P01)
import { useEffect, useState } from "react";
import { StatCard } from "../../components/index.js";
import { authService } from "../../services/authService.js";
import { studentService } from "../../services/studentService.js";
import { gradeService } from "../../services/gradeService.js";
import { attendanceService } from "../../services/attendanceService.js";
import { classifyGrade } from "../../utils/gradeCalculator.js";

export default function StudentDashboardPage() {
  const user = authService.getCurrentUser();
  const [student, setStudent] = useState(null);
  const [summary, setSummary] = useState({ avg: "—", rank: "—", absent: 0 });

  useEffect(() => {
    const hsId = user?.linkedId || 1;
    Promise.all([
      studentService.getById(hsId),
      gradeService.getByStudent(hsId, 1),
      attendanceService.getByStudent(hsId),
    ]).then(([stu, grades, atts]) => {
      setStudent(stu);
      const valid = grades.filter((g) => g.diemTrungBinh !== null);
      const avg = valid.length
        ? Number((valid.reduce((a, b) => a + b.diemTrungBinh, 0) / valid.length).toFixed(1))
        : null;
      const absent = atts.filter((a) => a.trangThai !== "CO_MAT").length;
      setSummary({
        avg: avg ?? "Chưa đủ điểm",
        rank: classifyGrade(avg),
        absent,
      });
    });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Trang chủ Học sinh / Phụ huynh (P01)</h1>
          <p className="page-subtitle">
            Xin chào {student?.hoTen || user?.fullName} – Năm học 2026-2027
          </p>
        </div>
      </div>

      <div className="grid-stats">
        <StatCard title="Lớp đang học" value={student?.tenLop || "—"} subtitle={`Mã HS: #${student?.id || 1}`} />
        <StatCard title="Điểm TB học kỳ I" value={summary.avg} subtitle={`Xếp loại: ${summary.rank}`} />
        <StatCard title="Số buổi vắng" value={summary.absent} subtitle="Trong học kỳ hiện tại" />
      </div>

      {student && (
        <div className="card">
          <h3 style={{ marginBottom: "10px" }}>Thông tin cá nhân</h3>
          <div className="grid-2" style={{ fontSize: "0.92rem" }}>
            <div><strong>Ngày sinh:</strong> {student.ngaySinh}</div>
            <div><strong>Email:</strong> {student.email}</div>
            <div><strong>Phụ huynh:</strong> {student.tenPhuHuynh}</div>
            <div><strong>SĐT liên hệ:</strong> {student.sdtPhuHuynh}</div>
          </div>
        </div>
      )}
    </div>
  );
}
