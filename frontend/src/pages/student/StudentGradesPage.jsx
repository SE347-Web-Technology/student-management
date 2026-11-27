// [SV3] Tra cứu bảng điểm cá nhân chuẩn Responsive Desktop & Mobile (P02, M03)
import { useEffect, useState } from "react";
import { DataTable, StatCard } from "../../components/index.js";
import { gradeService } from "../../services/gradeService.js";
import { authService } from "../../services/authService.js";
import { classifyGrade } from "../../utils/gradeCalculator.js";

export default function StudentGradesPage() {
  const [grades, setGrades] = useState([]);
  const [hocky, setHocky] = useState(1);
  const user = authService.getCurrentUser();

  useEffect(() => {
    gradeService.getByStudent(user?.linkedId || 1, hocky).then(setGrades);
  }, [hocky]);

  const valid = grades.filter((g) => g.diemTrungBinh !== null);
  const avgHk = valid.length
    ? Number((valid.reduce((a, b) => a + b.diemTrungBinh, 0) / valid.length).toFixed(1))
    : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tra cứu kết quả học tập (P02, M03)</h1>
          <p className="page-subtitle">Bảng điểm chi tiết theo môn học và xếp loại học kỳ</p>
        </div>
        <select
          className="input-inline"
          value={hocky}
          onChange={(e) => setHocky(Number(e.target.value))}
        >
          <option value={1}>Học kỳ 1</option>
          <option value={2}>Học kỳ 2</option>
        </select>
      </div>

      <div className="grid-stats">
        <StatCard title="Điểm trung bình học kỳ" value={avgHk ?? "—"} subtitle={`Học kỳ ${hocky}`} />
        <StatCard title="Xếp loại học lực" value={classifyGrade(avgHk)} subtitle="Tính trên các môn đã có điểm" />
      </div>

      <div className="card">
        <DataTable
          data={grades}
          columns={[
            { key: "tenMon", title: "Môn học" },
            { key: "thuongXuyen", title: "Thường xuyên", render: (r) => (r.thuongXuyen || []).join(", ") },
            { key: "giuaKy", title: "Giữa kỳ" },
            { key: "cuoiKy", title: "Cuối kỳ" },
            { key: "diemTrungBinh", title: "ĐTB môn" },
            {
              key: "xepLoai",
              title: "Xếp loại",
              render: (r) => (
                <span className={`badge ${r.dat ? "badge-success" : "badge-danger"}`}>
                  {r.xepLoai}
                </span>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
