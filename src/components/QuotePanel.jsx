export default function QuotePanel({ q }) {
  if (!q) return null;
  const changed = q.price - q.prevClose;
  const pct = q.prevClose ? (changed / q.prevClose) * 100 : 0;
  const up = changed >= 0;

  return (
    <div style={{
      background: "#fff",
      color: "#111827",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 16,
      width: 420,
      boxShadow: "0 8px 24px rgba(15,23,42,0.10)"
    }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{q.symbol}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>
        ${q.price?.toFixed(2) ?? "--"}
        <span style={{ fontSize: 16, marginLeft: 8, color: up ? "#16a34a" : "#dc2626" }}>
          {up ? "▲" : "▼"} {changed.toFixed(2)} ({pct.toFixed(2)}%)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        <Field label="Open" value={q.open} />
        <Field label="Prev Close" value={q.prevClose} />
        <Field label="High" value={q.high} />
        <Field label="Low" value={q.low} />
      </div>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        Updated: {q.ts.toLocaleTimeString()}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 12, opacity: 0.6 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value != null ? `$${value.toFixed(2)}` : "--"}</div>
    </div>
  );
}
