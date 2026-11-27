// [SV2] Hộp thoại Modal dùng chung cho thêm/sửa/xem chi tiết/xác nhận
export default function Modal({ isOpen, title, onClose, children, maxWidth = "600px" }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 100,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflowY: "auto",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ fontSize: "1.05rem", color: "var(--color-primary)" }}>{title}</h3>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
            Đóng
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
