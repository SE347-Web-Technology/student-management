// [SV1] Trang khuôn mẫu Layout Template dùng chung toàn Website (Mục 4.1.1 & 4.1.2)
// Gồm: Header + Sidebar điều hướng theo vai trò + Vùng nội dung thay đổi (<Outlet />) + Footer
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { authService } from "../services/authService.js";
import "./layout.css";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <div className="main-layout">
      <Header
        user={user}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />
      <div className="main-layout-body">
        <Sidebar
          role={user?.role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="main-layout-workspace">
          <main className="main-layout-content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
