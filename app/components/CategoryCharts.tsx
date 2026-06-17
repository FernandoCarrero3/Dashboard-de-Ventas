"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import type { Categoria } from "@/app/types";

interface CategoryChartsProps {
  categorias: Categoria[];
  darkMode: boolean;
}

const PIE_COLORS = [
  "#00e5cc",
  "rgba(0,229,204,0.7)",
  "rgba(0,229,204,0.5)",
  "rgba(0,229,204,0.35)",
  "rgba(0,229,204,0.2)",
  "rgba(0,229,204,0.1)",
];

export default function CategoryCharts({ categorias, darkMode }: CategoryChartsProps) {
  const d = darkMode;
  const surface = d ? "#141414" : "#ffffff";
  const border = d ? "#222" : "#e8e4dc";
  const text = d ? "#e8e4dc" : "#0a0a0a";
  const textMuted = d ? "#555" : "#999";
  const accent = "#00e5cc";

  const total = categorias.reduce((a, c) => a + c.valor, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="chart-card">
          <div className="chart-title">
            VENTAS POR CATEGORÍA
            <span>unidades</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categorias} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={border} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: textMuted, fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="nombre"
                tick={{ fill: textMuted, fontSize: 9, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 0, fontSize: 11, fontFamily: "var(--font-mono)" }}
                labelStyle={{ color: text }}
                itemStyle={{ color: accent }}
              />
              <Bar dataKey="valor" fill={accent} radius={0} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

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
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 0, fontSize: 11, fontFamily: "var(--font-mono)" }}
                labelStyle={{ color: text }}
                itemStyle={{ color: accent }}
                formatter={(value, name) => [`${value}`, name]}
              />
              <Legend
                iconType="circle"
                iconSize={6}
                formatter={(value) => (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: textMuted, letterSpacing: "0.08em" }}>
                    {value.toUpperCase()}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">
          RESUMEN POR CATEGORÍA
          <span>valor acumulado</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          {categorias.map((cat, i) => {
            const pct = Math.round((cat.valor / total) * 100);
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.08em" }}>
                    {cat.nombre.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: accent }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ height: "3px", background: border, borderRadius: "0", overflow: "hidden" }}>
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
  );
}
