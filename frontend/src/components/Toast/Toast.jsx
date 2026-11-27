// [SV2] Thông báo phản hồi nhanh (Toast notification)
export default function Toast({ message, type = "success" }) {
  if (!message) return null;
  const bg =
    type === "danger" ? "#fee2e2" : type === "warning" ? "#fef3c7" : "#dcfce7";
  const color =
    type === "danger"
      ? "var(--color-danger)"
      : type === "warning"
      ? "var(--color-warning)"
      : "var(--color-success)";

  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: "var(--radius-md)",
        background: bg,
        color,
        fontWeight: 600,
        fontSize: "0.9rem",
        marginBottom: "14px",
      }}
    >
      {message}
    </div>
  );
}
