// [SV2] Thanh Header dùng chung trong Layout Template
export default function Header({ user, onToggleSidebar, onLogout }) {
  const roleLabel =
    user?.role === "GIAO_VU"
      ? "Giáo vụ"
      : user?.role === "GIAO_VIEN"
      ? "Giáo viên"
      : "Học sinh / Phụ huynh";

  return (
    <header
      style={{
        height: "var(--header-height)",
        background: "var(--color-primary)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          type="button"
          className="btn btn-outline mobile-menu-btn"
          onClick={onToggleSidebar}
          style={{ display: "none", padding: "6px 10px" }}
        >
          Menu
        </button>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>
            HỆ THỐNG QUẢN LÝ HỌC SINH THPT
          </div>
          <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>
            SE347.R11 – Nhóm 05
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ textAlign: "right", fontSize: "0.85rem" }}>
          <div style={{ fontWeight: 600 }}>{user?.fullName || "Khách"}</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>{roleLabel}</div>
        </div>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onLogout}
          style={{ padding: "6px 12px" }}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
