// [SV2] Cấu hình các quy định học vụ cơ bản (A14)
import { useEffect, useState } from "react";
import { InputField, Toast } from "../../components/index.js";
import { catalogService } from "../../services/catalogService.js";

export default function SettingsPage() {
  const [rules, setRules] = useState({ tuoiToiThieu: 15, tuoiToiDa: 20, siSoToiDa: 40, diemDatMon: 5.0 });
  const [toast, setToast] = useState("");

  useEffect(() => {
    catalogService.getRules().then(setRules);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await catalogService.updateRules(rules);
    setToast("Đã cập nhật quy định học vụ thành công.");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cấu hình quy định học vụ (A14)</h1>
          <p className="page-subtitle">Thiết lập giới hạn độ tuổi, sĩ số tối đa và ngưỡng điểm đạt</p>
        </div>
      </div>
      <Toast message={toast} />
      <div className="card" style={{ maxWidth: "520px" }}>
        <form onSubmit={handleSave}>
          <InputField label="Tuổi tối thiểu" type="number" value={rules.tuoiToiThieu} onChange={(e) => setRules({ ...rules, tuoiToiThieu: Number(e.target.value) })} />
          <InputField label="Tuổi tối đa" type="number" value={rules.tuoiToiDa} onChange={(e) => setRules({ ...rules, tuoiToiDa: Number(e.target.value) })} />
          <InputField label="Sĩ số lớp tối đa" type="number" value={rules.siSoToiDa} onChange={(e) => setRules({ ...rules, siSoToiDa: Number(e.target.value) })} />
          <InputField label="Điểm đạt môn" type="number" step="0.5" value={rules.diemDatMon} onChange={(e) => setRules({ ...rules, diemDatMon: Number(e.target.value) })} />
          <button type="submit" className="btn btn-primary">Lưu cấu hình</button>
        </form>
      </div>
    </div>
  );
}
