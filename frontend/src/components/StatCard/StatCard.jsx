// [SV2] Thẻ thống kê Dashboard Card dùng chung
export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "6px" }}>
        {title}
      </div>
      <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "var(--color-primary)" }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
