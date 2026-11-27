// [SV2] Chân trang Footer dùng chung của Layout Template
export default function Footer() {
  return (
    <footer
      style={{
        padding: "14px 26px",
        borderTop: "1px solid var(--color-border)",
        background: "#ffffff",
        fontSize: "0.85rem",
        color: "var(--color-text-muted)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <span>Website Quản lý Học sinh THPT – Đồ án SE347.R11</span>
      <span>Nhóm 05 – Khoa Công nghệ Phần mềm, ĐH CNTT</span>
    </footer>
  );
}
