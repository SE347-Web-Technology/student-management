// [SV2] Các thành phần ô nhập liệu biểu mẫu chuẩn hóa
export function InputField({ label, error, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "12px" }}>
      {label && <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>{label}</label>}
      <input
        {...props}
        style={{
          padding: "8px 11px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border)"}`,
          fontSize: "0.9rem",
          background: "#ffffff",
          ...(props.style || {}),
        }}
      />
      {error && <span style={{ fontSize: "0.78rem", color: "var(--color-danger)" }}>{error}</span>}
    </div>
  );
}

export function SelectField({ label, options = [], ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "12px" }}>
      {label && <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>{label}</label>}
      <select
        {...props}
        style={{
          padding: "8px 11px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          fontSize: "0.9rem",
          background: "#ffffff",
          ...(props.style || {}),
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
