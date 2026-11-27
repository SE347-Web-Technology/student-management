// [SV1] Trang Đăng nhập dùng chung (C01, M01)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, Toast } from "../../components/index.js";
import { authService } from "../../services/authService.js";

export default function LoginPage() {
  const [username, setUsername] = useState("giaovu");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === "GIAO_VU") navigate("/admin/dashboard");
    else if (role === "GIAO_VIEN") navigate("/teacher/dashboard");
    else navigate("/student/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await authService.login(username, password);
      redirectByRole(user.role);
    } catch (err) {
      setError(err.message);
    }
  };

  const quickLogin = async (u) => {
    setError("");
    try {
      const user = await authService.login(u, "123");
      redirectByRole(user.role);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "var(--color-primary)" }}>ĐĂNG NHẬP HỆ THỐNG</h2>
        <p className="page-subtitle">Website Quản lý Học sinh THPT – SE347 Nhóm 05</p>
      </div>

      <Toast message={error} type="danger" />

      <form onSubmit={handleSubmit}>
        <InputField
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Đăng nhập
        </button>
      </form>

      <div style={{ marginTop: "18px", borderTop: "1px solid var(--color-border)", paddingTop: "14px" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "8px" }}>
          Vào nhanh chế độ Mock Data (tài khoản do Giáo vụ cấp):
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button type="button" className="btn btn-outline" onClick={() => quickLogin("giaovu")}>
            Giáo vụ
          </button>
          <button type="button" className="btn btn-outline" onClick={() => quickLogin("gv01")}>
            Giáo viên
          </button>
          <button type="button" className="btn btn-outline" onClick={() => quickLogin("hs01")}>
            Học sinh / PH
          </button>
        </div>
      </div>
    </div>
  );
}
