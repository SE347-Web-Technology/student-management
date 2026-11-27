// [SV1] Trang khuôn mẫu cho khu vực Đăng nhập (C01, M01)
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <Outlet />
      </div>
    </div>
  );
}
