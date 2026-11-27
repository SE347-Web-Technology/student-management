// [SV2] Tra cứu và quản lý Kỷ luật – Khen thưởng toàn trường (A16)
import { useEffect, useState } from "react";
import { DataTable } from "../../components/index.js";
import { disciplineService } from "../../services/disciplineService.js";

export default function DisciplineAdminPage() {
  const [items, setItems] = useState([]);
  const [loai, setLoai] = useState("");

  useEffect(() => {
    disciplineService.getAll({ loai }).then(setItems);
  }, [loai]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Kỷ luật – Khen thưởng toàn trường (A16)</h1>
          <p className="page-subtitle">Theo dõi các bản ghi thành tích và vi phạm của học sinh</p>
        </div>
      </div>
      <div className="card">
        <div className="toolbar">
          <select className="input-inline" value={loai} onChange={(e) => setLoai(e.target.value)}>
            <option value="">Tất cả loại ghi nhận</option>
            <option value="KHEN_THUONG">Khen thưởng</option>
            <option value="KY_LUAT">Kỷ luật</option>
          </select>
        </div>
        <DataTable
          data={items}
          columns={[
            { key: "hoTen", title: "Học sinh" },
            { key: "tenLop", title: "Lớp" },
            {
              key: "loai",
              title: "Loại",
              render: (r) => (
                <span className={`badge ${r.loai === "KHEN_THUONG" ? "badge-success" : "badge-warning"}`}>
                  {r.loai === "KHEN_THUONG" ? "Khen thưởng" : "Kỷ luật"}
                </span>
              ),
            },
            { key: "noiDung", title: "Nội dung" },
            { key: "hinhThuc", title: "Hình thức" },
            { key: "ngayGhinhan", title: "Ngày ghi nhận" },
          ]}
        />
      </div>
    </div>
  );
}
