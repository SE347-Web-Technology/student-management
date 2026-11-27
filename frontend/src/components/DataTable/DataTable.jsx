// [SV2] Bảng dữ liệu dùng chung (SV2 có thể nâng cấp thêm phân trang/sort)
export default function DataTable({ columns = [], data = [], emptyText = "Chưa có dữ liệu." }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "#f8fafc", borderBottom: "2px solid var(--color-border)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, whiteSpace: "nowrap" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                style={{ textAlign: "center", padding: "20px", color: "var(--color-text-muted)" }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id ?? `${idx}`} style={{ borderBottom: "1px solid var(--color-border)" }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: "10px 12px" }}>
                    {col.render ? col.render(row, idx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
