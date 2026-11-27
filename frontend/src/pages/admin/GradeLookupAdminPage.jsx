// [SV2] Tra cứu điểm học sinh toàn trường (A10)
import { useEffect, useState } from "react";
import { DataTable } from "../../components/index.js";
import { gradeService } from "../../services/gradeService.js";
import { catalogService } from "../../services/catalogService.js";

export default function GradeLookupAdminPage() {
  const [grades, setGrades] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({ lopId: "", monhocId: "", hocky: 1 });

  useEffect(() => {
    Promise.all([catalogService.getClasses(), catalogService.getSubjects()]).then(([clss, subjs]) => {
      setClasses(clss);
      setSubjects(subjs);
    });
  }, []);

  useEffect(() => {
    gradeService.getGrades(filters).then(setGrades);
  }, [filters]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tra cứu điểm toàn trường (A10)</h1>
          <p className="page-subtitle">Lọc bảng điểm thành phần, điểm trung bình và xếp loại học lực</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <select
            className="input-inline"
            value={filters.lopId}
            onChange={(e) => setFilters({ ...filters, lopId: e.target.value })}
          >
            <option value="">Tất cả lớp</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>Lớp {c.tenLop}</option>
            ))}
          </select>
          <select
            className="input-inline"
            value={filters.monhocId}
            onChange={(e) => setFilters({ ...filters, monhocId: e.target.value })}
          >
            <option value="">Tất cả môn học</option>
            {subjects.map((m) => (
              <option key={m.id} value={m.id}>{m.tenMon}</option>
            ))}
          </select>
          <select
            className="input-inline"
            value={filters.hocky}
            onChange={(e) => setFilters({ ...filters, hocky: Number(e.target.value) })}
          >
            <option value={1}>Học kỳ 1</option>
            <option value={2}>Học kỳ 2</option>
          </select>
        </div>

        <DataTable
          data={grades}
          columns={[
            { key: "hoTen", title: "Học sinh" },
            { key: "tenLop", title: "Lớp" },
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
