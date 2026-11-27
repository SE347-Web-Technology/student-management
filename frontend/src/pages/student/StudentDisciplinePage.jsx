// [SV3] Xem thông tin Kỷ luật – Khen thưởng cá nhân (P04)
import { useEffect, useState } from "react";
import { DataTable } from "../../components/index.js";
import { disciplineService } from "../../services/disciplineService.js";
import { authService } from "../../services/authService.js";

export default function StudentDisciplinePage() {
  const [items, setItems] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    disciplineService.getAll({ hocsinhId: user?.linkedId || 1 }).then(setItems);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Kỷ luật – Khen thưởng cá nhân (P04)</h1>
          <p className="page-subtitle">Thông tin ghi nhận thành tích và rèn luyện trong năm học</p>
        </div>
      </div>
      <div className="card">
        <DataTable
          data={items}
          columns={[
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
