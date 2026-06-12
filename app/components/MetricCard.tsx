interface MetricCardProps {
  label: string;
  valor: string | number;
  delta: string;
}

export default function MetricCard({ label, valor, delta }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{valor}</div>
      <div className="metric-delta">↑ {delta}</div>
    </div>
  );
}
