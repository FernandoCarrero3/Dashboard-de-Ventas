"use client";
import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function Home() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [rango, setRango] = useState(7);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dash-theme");
    if (saved) setDarkMode(saved === "dark");
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setDatos(data);
        setCargando(false);
      });
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("dash-theme", next ? "dark" : "light");
  };

  const d = darkMode;

  if (!mounted || cargando) {
    return (
      <div style={{
        minHeight: "100vh",
        background: d ? "#0a0a0a" : "#f7f5f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
        color: d ? "#00e5cc" : "#0a0a0a",
        fontSize: "0.8rem",
        letterSpacing: "0.15em",
      }}>
        CARGANDO_DATOS...
      </div>
    );
  }

  const { metricas, categorias, topProductos, pedidosPorMes } = datos;

  const bg = d ? "#0a0a0a" : "#f7f5f0";
  const surface = d ? "#141414" : "#ffffff";
  const border = d ? "#222" : "#e8e4dc";
  const text = d ? "#e8e4dc" : "#0a0a0a";
  const textMuted = d ? "#555" : "#999";
  const accent = "#00e5cc";
  const accentDim = d ? "rgba(0,229,204,0.08)" : "rgba(0,229,204,0.06)";

  const metricasList = [
    { label: "INGRESOS", valor: `${metricas.ingresosTotales.toLocaleString()}€`, delta: "+12.4%" },
    { label: "PEDIDOS", valor: metricas.totalPedidos, delta: "+8.1%" },
    { label: "TICKET_MED", valor: `${metricas.ticketMedio}€`, delta: "+3.7%" },
    { label: "PRODUCTOS", valor: metricas.totalProductos, delta: "0.0%" },
    { label: "CLIENTES", valor: metricas.totalClientes.toLocaleString(), delta: "+21.3%" },
  ];

  const datosFiltrados = pedidosPorMes.slice(-rango);

  const productosFiltrados = topProductos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const exportarCSV = (datos, nombreArchivo) => {
    const headers = Object.keys(datos[0]).join(";");
    const filas = datos.map((row) =>
      Object.values(row).map((v) => `"${v}"`).join(";")
    ).join("\n");
    const csv = `\uFEFF${headers}\n${filas}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nombreArchivo}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: ${bg};
          font-family: 'Syne', sans-serif;
          color: ${text};
          transition: background 0.3s, color 0.3s;
          min-height: 100vh;
          font-size: 16px;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 56px;
          background: ${surface};
          border-right: 1px solid ${border};
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          gap: 1.5rem;
          z-index: 100;
        }

        .sidebar-logo {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: ${accent};
          writing-mode: vertical-rl;
          letter-spacing: 0.2em;
          font-weight: 700;
        }

        .sidebar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${accent};
          margin-top: auto;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .main {
          margin-left: 56px;
          padding: 0;
          min-height: 100vh;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid ${border};
          background: ${surface};
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .topbar-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${text};
        }

        .topbar-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: ${accent};
          background: ${accentDim};
          border: 1px solid ${d ? "rgba(0,229,204,0.2)" : "rgba(0,229,204,0.3)"};
          padding: 0.2rem 0.6rem;
          letter-spacing: 0.1em;
        }

        .topbar-time {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${textMuted};
          letter-spacing: 0.05em;
        }

        .theme-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: ${textMuted};
          background: none;
          border: 1px solid ${border};
          padding: 0.35rem 0.75rem;
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: all 0.2s;
        }

        .theme-btn:hover {
          border-color: ${accent};
          color: ${accent};
        }

        .content {
          padding: 2rem;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${textMuted};
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: ${border};
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border: 1px solid ${border};
          margin-bottom: 2rem;
        }

        .metric-card {
          padding: 1.5rem;
          border-right: 1px solid ${border};
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }

        .metric-card:last-child { border-right: none; }

        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: ${accent};
          transform: scaleX(0);
          transition: transform 0.3s;
          transform-origin: left;
        }

        .metric-card:hover::before { transform: scaleX(1); }
        .metric-card:hover { background: ${accentDim}; }

        .metric-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${textMuted};
          letter-spacing: 0.12em;
          margin-bottom: 1rem;
        }

        .metric-value {
          font-family: 'Space Mono', monospace;
          font-size: 1.9rem;
          font-weight: 700;
          color: ${text};
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .metric-delta {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: ${accent};
          letter-spacing: 0.05em;
        }

        .charts {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: ${surface};
          border: 1px solid ${border};
          padding: 1.5rem;
        }

        .chart-title {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${textMuted};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chart-title span {
          color: ${accent};
          font-size: 0.58rem;
        }

        .table-card {
          background: ${surface};
          border: 1px solid ${border};
          overflow: hidden;
        }

        .table-head {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid ${border};
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: ${textMuted};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-count {
          color: ${accent};
        }

        table { width: 100%; border-collapse: collapse; }

        th {
          padding: 0.75rem 1.5rem;
          text-align: left;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: ${textMuted};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid ${border};
          font-weight: 400;
        }

        td {
          padding: 0.9rem 1.5rem;
          font-size: 0.92rem;
          color: ${text};
          border-bottom: 1px solid ${border};
        }

        tr:last-child td { border-bottom: none; }

        tr:hover td { background: ${accentDim}; }

        .td-mono {
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem;
        }

        .rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: ${accent};
          border: 1px solid ${d ? "rgba(0,229,204,0.2)" : "rgba(0,229,204,0.4)"};
          padding: 0.15rem 0.5rem;
          background: ${accentDim};
        }

        .cat-label {
          font-size: 0.8rem;
          color: ${textMuted};
          text-transform: capitalize;
          font-family: 'Space Mono', monospace;
        }

        .rank {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: ${textMuted};
        }

        @media (max-width: 1000px) {
          .charts { grid-template-columns: 1fr; }
          .metrics { grid-template-columns: repeat(3, 1fr); }
          .metric-card:nth-child(3) { border-right: none; }
          .metric-card:nth-child(4),
          .metric-card:nth-child(5) { border-top: 1px solid ${border}; }
        }

        @media (max-width: 600px) {
          .metrics { grid-template-columns: 1fr 1fr; }
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .content { padding: 1rem; }
          .topbar { padding: 1rem; }
        }

        .topbar-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${text};
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${d ? "#888" : "#444"};
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .metric-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${d ? "#666" : "#555"};
          letter-spacing: 0.12em;
          margin-bottom: 1rem;
        }

        .metric-value {
          font-family: 'Space Mono', monospace;
          font-size: 1.9rem;
          font-weight: 700;
          color: ${d ? "#e8e4dc" : "#0a0a0a"};
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .chart-title {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${d ? "#888" : "#444"};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        th {
          padding: 0.75rem 1.5rem;
          text-align: left;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: ${d ? "#666" : "#444"};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid ${border};
          font-weight: 400;
        }

        td {
          padding: 0.9rem 1.5rem;
          font-size: 0.92rem;
          font-weight: ${d ? "400" : "500"};
          color: ${d ? "#c8c4bc" : "#1a1209"};
          border-bottom: 1px solid ${border};
        }

        .cat-label {
          font-size: 0.8rem;
          color: ${d ? "#666" : "#555"};
          text-transform: capitalize;
          font-family: 'Space Mono', monospace;
        }

        .topbar-time {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: ${d ? "#555" : "#666"};
          letter-spacing: 0.05em;
        }

        .table-head {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid ${border};
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: ${d ? "#666" : "#444"};
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-logo">SALES</div>
        <div className="sidebar-dot" />
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">Analytics</div>
            <div className="topbar-tag">LIVE</div>
            <div className="topbar-time">{new Date().toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).toUpperCase()}</div>
          </div>
          <button
            onClick={() => exportarCSV([metricas], "metricas-dashboard")}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              padding: "0.35rem 0.75rem",
              border: `1px solid ${border}`,
              background: "transparent",
              color: textMuted,
              cursor: "pointer",
              letterSpacing: "0.1em",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = accent; e.target.style.color = accent; }}
            onMouseLeave={e => { e.target.style.borderColor = border; e.target.style.color = textMuted; }}
          >
            ↓ EXPORTAR MÉTRICAS
          </button>
          <button className="theme-btn" onClick={toggleTheme}>
            {d ? "[ LIGHT ]" : "[ DARK ]"}
          </button>
        </div>

        <div className="content">
          <div className="section-label">MÉTRICAS GENERALES</div>

          <div className="metrics">
            {metricasList.map((m, i) => (
              <div className="metric-card" key={i}>
                <div className="metric-label">{m.label}</div>
                <div className="metric-value">{m.valor}</div>
                <div className="metric-delta">↑ {m.delta}</div>
              </div>
            ))}
          </div>

          <div className="section-label">ANÁLISIS DE DATOS</div>

          <div className="charts">
            <div className="chart-card">
              <div className="chart-title">
                EVOLUCIÓN DE PEDIDOS
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[3, 5, 7].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRango(r)}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.58rem",
                        padding: "0.2rem 0.5rem",
                        border: `1px solid ${rango === r ? accent : border}`,
                        background: rango === r ? accentDim : "transparent",
                        color: rango === r ? accent : textMuted,
                        cursor: "pointer",
                        letterSpacing: "0.08em",
                        transition: "all 0.2s",
                      }}
                    >
                      {r === 3 ? "3M" : r === 5 ? "5M" : "1A"}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={datosFiltrados}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={accent} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={border} />
                  <XAxis dataKey="mes" tick={{ fill: textMuted, fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: textMuted, fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 0, fontSize: 11, fontFamily: "Space Mono" }}
                    labelStyle={{ color: text }}
                    itemStyle={{ color: accent }}
                  />
                  <Area type="monotone" dataKey="pedidos" stroke={accent} strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: accent, r: 3, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-title">
                VENTAS POR CATEGORÍA
                <span>unidades</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categorias} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={border} horizontal={false} />
                  <XAxis type="number" tick={{ fill: textMuted, fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="nombre" tick={{ fill: textMuted, fontSize: 9, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip
                    contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 0, fontSize: 11, fontFamily: "Space Mono" }}
                    labelStyle={{ color: text }}
                    itemStyle={{ color: accent }}
                  />
                  <Bar dataKey="valor" fill={accent} radius={0} opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section-label" style={{ marginTop: "2rem" }}>DISTRIBUCIÓN DE VENTAS</div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}>
            <div className="chart-card">
              <div className="chart-title">
                DISTRIBUCIÓN POR CATEGORÍA
                <span>% del total</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categorias}
                    dataKey="valor"
                    nameKey="nombre"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {categorias.map((_, i) => (
                      <Cell
                        key={i}
                        fill={[
                          "#00e5cc",
                          "rgba(0,229,204,0.7)",
                          "rgba(0,229,204,0.5)",
                          "rgba(0,229,204,0.35)",
                          "rgba(0,229,204,0.2)",
                          "rgba(0,229,204,0.1)",
                        ][i]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: surface,
                      border: `1px solid ${border}`,
                      borderRadius: 0,
                      fontSize: 11,
                      fontFamily: "Space Mono",
                    }}
                    labelStyle={{ color: text }}
                    itemStyle={{ color: accent }}
                    formatter={(value, name) => [`${value}`, name]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={6}
                    formatter={(value) => (
                      <span style={{ fontFamily: "Space Mono", fontSize: "0.62rem", color: textMuted, letterSpacing: "0.08em" }}>
                        {value.toUpperCase()}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-title">
                RESUMEN POR CATEGORÍA
                <span>valor acumulado</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                {categorias.map((cat, i) => {
                  const total = categorias.reduce((a, c) => a + c.valor, 0);
                  const pct = Math.round((cat.valor / total) * 100);
                  return (
                    <div key={i}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}>
                        <span style={{ fontFamily: "Space Mono", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.08em" }}>
                          {cat.nombre.toUpperCase()}
                        </span>
                        <span style={{ fontFamily: "Space Mono", fontSize: "0.65rem", color: accent }}>
                          {pct}%
                        </span>
                      </div>
                      <div style={{
                        height: "3px",
                        background: border,
                        borderRadius: "0",
                        overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: accent,
                          opacity: 1 - i * 0.12,
                          transition: "width 0.8s ease",
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="section-label">TOP PRODUCTOS</div>

          <div className="table-card">
            <div className="table-head">
              <span>TOP PRODUCTOS POR VALORACIÓN</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="BUSCAR..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.62rem",
                    background: "transparent",
                    border: `1px solid ${border}`,
                    color: text,
                    padding: "0.3rem 0.75rem",
                    outline: "none",
                    letterSpacing: "0.1em",
                    width: "140px",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = border}
                />
                <button
                  onClick={() => exportarCSV(productosFiltrados, "productos-dashboard")}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.6rem",
                    padding: "0.3rem 0.75rem",
                    border: `1px solid ${accent}`,
                    background: accentDim,
                    color: accent,
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = `rgba(0,229,204,0.15)`}
                  onMouseLeave={e => e.target.style.background = accentDim}
                >
                  ↓ EXPORTAR
                </button>
                <span className="table-count">{productosFiltrados.length} registros</span>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Rating</th>
                  <th>Votos</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p, i) => (
                  <tr key={i}>
                    <td><span className="rank">0{i + 1}</span></td>
                    <td>{p.nombre}</td>
                    <td><span className="cat-label">{p.categoria}</span></td>
                    <td><span className="td-mono">{p.precio}€</span></td>
                    <td><span className="rating-pill">★ {p.rating}</span></td>
                    <td><span className="td-mono">{p.votos}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}