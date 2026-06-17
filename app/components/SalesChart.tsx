"use client";
import { useState } from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";
import type { PedidoPorMes } from "@/app/types";

interface SalesChartProps {
  datos: PedidoPorMes[];
  darkMode: boolean;
}

export default function SalesChart({ datos, darkMode }: SalesChartProps) {
  const [rango, setRango] = useState<number>(7);

  const d = darkMode;
  const surface = d ? "#141414" : "#ffffff";
  const border = d ? "#222" : "#e8e4dc";
  const text = d ? "#e8e4dc" : "#0a0a0a";
  const textMuted = d ? "#555" : "#999";
  const accent = "#00e5cc";
  const accentDim = d ? "rgba(0,229,204,0.08)" : "rgba(0,229,204,0.06)";

  const datosFiltrados = datos.slice(-rango);

  return (
    <div className="chart-card">
      <div className="chart-title">
        EVOLUCIÓN DE PEDIDOS
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[3, 5, 7].map((r) => (
            <button
              key={r}
              onClick={() => setRango(r)}
              style={{
                fontFamily: "var(--font-mono)",
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
          <XAxis
            dataKey="mes"
            tick={{ fill: textMuted, fontSize: 10, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: textMuted, fontSize: 10, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 0, fontSize: 11, fontFamily: "var(--font-mono)" }}
            labelStyle={{ color: text }}
            itemStyle={{ color: accent }}
          />
          <Area
            type="monotone"
            dataKey="pedidos"
            stroke={accent}
            strokeWidth={2}
            fill="url(#areaGrad)"
            dot={{ fill: accent, r: 3, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
