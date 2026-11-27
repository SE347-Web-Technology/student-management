// [SV2] Báo cáo tổng kết môn học và tổng kết học kỳ (A11 - A13)
import { useEffect, useState } from "react";
import { DataTable, StatCard } from "../../components/index.js";
import { gradeService } from "../../services/gradeService.js";
import { catalogService } from "../../services/catalogService.js";

export default function ReportsPage() {
  const [tab, setTab] = useState("subject"); // "subject" | "semester"
  const [subjects, setSubjects] = useState([]);
  const [monhocId, setMonhocId] = useState(1);
  const [hocky, setHocky] = useState(1);
  const [subjectRows, setSubjectRows] = useState([]);
  const [semesterRows, setSemesterRows] = useState([]);

  useEffect(() => {
    catalogService.getSubjects().then(setSubjects);
  }, []);

  useEffect(() => {
    gradeService.getSubjectReport({ monhocId, hocky }).then(setSubjectRows);
    gradeService.getSemesterReport({ hocky }).then(setSemesterRows);
  }, [monhocId, hocky]);

  const totalStudents = subjectRows.reduce((a, b) => a + b.siSo, 0);
  const totalPass = subjectRows.reduce((a, b) => a + b.soDat, 0);
  const passRate = totalStudents ? `${Math.round((totalPass / totalStudents) * 100)}%` : "0%";

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Báo cáo thống kê tổng kết (A11–A13)</h1>
          <p className="page-subtitle">Thống kê sĩ số, số lượng đạt và tỷ lệ đạt theo môn học / học kỳ</p>
        </div>
        <div className="toolbar">
          <button
            type="button"
            className={`btn ${tab === "subject" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("subject")}
          >
            Tổng kết môn học (A11)
          </button>
          <button
            type="button"
            className={`btn ${tab === "semester" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab("semester")}
          >
            Tổng kết học kỳ (A12)
          </button>
        </div>
      </div>

      <div className="grid-stats">
        <StatCard title="Tổng lượt đánh giá" value={totalStudents} subtitle={`Học kỳ ${hocky}`} />
        <StatCard title="Số lượng đạt" value={totalPass} subtitle="ĐTB >= 5.0" />
        <StatCard title="Tỷ lệ đạt" value={passRate} subtitle="Toàn bộ các lớp có điểm" />
      </div>

      <div className="card">
        <div className="toolbar">
          {tab === "subject" && (
            <select
              className="input-inline"
              value={monhocId}
              onChange={(e) => setMonhocId(Number(e.target.value))}
            >
              {subjects.map((m) => (
                <option key={m.id} value={m.id}>{m.tenMon}</option>
              ))}
            </select>
          )}
          <select
            className="input-inline"
            value={hocky}
            onChange={(e) => setHocky(Number(e.target.value))}
          >
            <option value={1}>Học kỳ 1</option>
            <option value={2}>Học kỳ 2</option>
          </select>
        </div>

        {tab === "subject" ? (
          <DataTable
            data={subjectRows}
            columns={[
              { key: "tenLop", title: "Lớp" },
              { key: "siSo", title: "Sĩ số" },
              { key: "soDat", title: "Số lượng đạt" },
              { key: "tyLeDat", title: "Tỷ lệ đạt" },
            ]}
          />
        ) : (
          <DataTable
            data={semesterRows}
            columns={[
              { key: "hoTen", title: "Học sinh" },
              { key: "tenLop", title: "Lớp" },
              { key: "diemTbHk", title: "ĐTB Học kỳ" },
              { key: "xepLoai", title: "Xếp loại" },
            ]}
          />
        )}
      </div>
    </div>
  );
}
