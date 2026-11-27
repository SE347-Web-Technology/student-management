// [SV2] Thanh điều hướng Sidebar tự đổi menu theo 3 vai trò (Sitemap Mục 1.5)
import { NavLink } from "react-router-dom";

const MENU_BY_ROLE = {
  GIAO_VU: [
    { to: "/admin/dashboard", label: "Trang chủ Giáo vụ (A01)" },
    { to: "/admin/students", label: "Quản lý học sinh (A02–A05)" },
    { to: "/admin/classes", label: "Lớp học & Xếp lớp (A06–A08)" },
    { to: "/admin/subjects", label: "Môn học & Phân công (A09)" },
    { to: "/admin/grades", label: "Tra cứu điểm trường (A10)" },
    { to: "/admin/reports", label: "Báo cáo tổng kết (A11–A13)" },
    { to: "/admin/settings", label: "Quy định học vụ (A14)" },
    { to: "/admin/accounts", label: "Quản lý tài khoản (A15)" },
    { to: "/admin/discipline", label: "Kỷ luật – Khen thưởng (A16)" },
  ],
  GIAO_VIEN: [
    { to: "/teacher/dashboard", label: "Trang chủ Giáo viên (T01)" },
    { to: "/teacher/grades", label: "Nhập & Tra cứu điểm (T02–T03)" },
    { to: "/teacher/attendance", label: "Điểm danh theo buổi (T04)" },
    { to: "/teacher/discipline", label: "Kỷ luật – Khen thưởng (T05)" },
  ],
  PHU_HUYNH: [
    { to: "/student/dashboard", label: "Trang chủ Cá nhân (P01)" },
    { to: "/student/grades", label: "Bảng điểm học tập (P02)" },
    { to: "/student/attendance", label: "Lịch sử điểm danh (P03)" },
    { to: "/student/discipline", label: "Kỷ luật – Khen thưởng (P04)" },
  ],
};

export default function Sidebar({ role, isOpen, onClose }) {
  const items = MENU_BY_ROLE[role] || [];

  return (
    <aside className={`main-layout-sidebar ${isOpen ? "open" : ""}`}>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          padding: "4px 10px 10px",
        }}
      >
        Danh mục chức năng
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            style={({ isActive }) => ({
              padding: "9px 12px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "var(--color-primary-light)" : "transparent",
              color: isActive ? "var(--color-primary)" : "var(--color-text)",
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
