// [SV3] Trang Nhập điểm trực tuyến (TX1, TX2, GK, CK) & tự động tính ĐTB môn (T02, T03, M02)
import { useEffect, useState } from "react";
import { DataTable, Toast } from "../../components/index.js";
import { gradeService } from "../../services/gradeService.js";
import { catalogService } from "../../services/catalogService.js";
import { calcSubjectAverage, classifyGrade } from "../../utils/gradeCalculator.js";
import { isValidScore } from "../../utils/validators.js";

export default function GradeEntryPage() {
  const [rows, setRows] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [monhocId, setMonhocId] = useState(1);
  const [hocky, setHocky] = useState(1);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    catalogService.getSubjects().then(setSubjects);
  }, []);

  useEffect(() => {
    gradeService.getGrades({ monhocId, hocky }).then(setRows);
  }, [monhocId, hocky]);

  const updateField = (hocsinhId, updater) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.hocsinhId !== hocsinhId) return r;
        const nextRow = updater(r);
        const avg = calcSubjectAverage(nextRow.thuongXuyen, nextRow.giuaKy, nextRow.cuoiKy);
        return {
          ...nextRow,
          diemTrungBinh: avg,
          xepLoai: classifyGrade(avg),
          dat: avg !== null && avg >= 5.0,
        };
      })
    );
  };

  const handleSave = async () => {
    for (const r of rows) {
      if (!isValidScore(r.giuaKy) || !isValidScore(r.cuoiKy)) {
        setToast({ message: `Điểm của ${r.hoTen} phải nằm trong khoảng 0 đến 10.`, type: "danger" });
        return;
      }
    }
    await gradeService.saveBatch(rows);
    setToast({ message: "Đã lưu bảng điểm và cập nhật điểm trung bình.", type: "success" });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Nhập điểm môn học (T02, T03, M02)</h1>
          <p className="page-subtitle">Nhập trực tiếp trên lưới – Tự động tính ĐTB theo hệ số (TX:1, GK:2, CK:3)</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Lưu bảng điểm
        </button>
      </div>

      <Toast message={toast.message} type={toast.type} />

      <div className="card">
        <div className="toolbar">
          <select
            className="input-inline"
            value={monhocId}
            onChange={(e) => setMonhocId(Number(e.target.value))}
          >
            {subjects.map((m) => (
              <option key={m.id} value={m.id}>{m.tenMon} (Khối {m.khoiApDung})</option>
            ))}
          </select>
          <select
            className="input-inline"
            value={hocky}
            onChange={(e) => setHocky(Number(e.target.value))}
          >
            <option value={1}>Học kỳ 1</option>
            <option value={2}>Học kỳ 2</option>
          </select>
        </div>

        <DataTable
          data={rows}
          columns={[
            { key: "hoTen", title: "Họ và tên" },
            { key: "tenLop", title: "Lớp" },
            {
              key: "tx1",
              title: "TX 1",
              render: (r) => (
                <input
                  type="number"
                  step="0.5"
                  className="score-input"
                  value={r.thuongXuyen?.[0] ?? ""}
                  onChange={(e) =>
                    updateField(r.hocsinhId, (old) => ({
                      ...old,
                      thuongXuyen: [e.target.value, old.thuongXuyen?.[1] ?? ""],
                    }))
                  }
                />
              ),
            },
            {
              key: "tx2",
              title: "TX 2",
              render: (r) => (
                <input
                  type="number"
                  step="0.5"
                  className="score-input"
                  value={r.thuongXuyen?.[1] ?? ""}
                  onChange={(e) =>
                    updateField(r.hocsinhId, (old) => ({
                      ...old,
                      thuongXuyen: [old.thuongXuyen?.[0] ?? "", e.target.value],
                    }))
                  }
                />
              ),
            },
            {
              key: "giuaKy",
              title: "Giữa kỳ",
              render: (r) => (
                <input
                  type="number"
                  step="0.5"
                  className={`score-input ${!isValidScore(r.giuaKy) ? "invalid" : ""}`}
                  value={r.giuaKy}
                  onChange={(e) =>
                    updateField(r.hocsinhId, (old) => ({ ...old, giuaKy: e.target.value }))
                  }
                />
              ),
            },
            {
              key: "cuoiKy",
              title: "Cuối kỳ",
              render: (r) => (
                <input
                  type="number"
                  step="0.5"
                  className={`score-input ${!isValidScore(r.cuoiKy) ? "invalid" : ""}`}
                  value={r.cuoiKy}
                  onChange={(e) =>
                    updateField(r.hocsinhId, (old) => ({ ...old, cuoiKy: e.target.value }))
                  }
                />
              ),
            },
            { key: "diemTrungBinh", title: "ĐTB môn", render: (r) => r.diemTrungBinh ?? "—" },
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
