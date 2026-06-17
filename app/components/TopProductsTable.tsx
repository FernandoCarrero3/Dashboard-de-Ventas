"use client";
import { useState } from "react";
import type { Producto } from "@/app/types";
import { exportarCSV } from "@/app/lib";

interface TopProductsTableProps {
  productos: Producto[];
  darkMode: boolean;
}

export default function TopProductsTable({ productos, darkMode }: TopProductsTableProps) {
  const [busqueda, setBusqueda] = useState<string>("");

  const d = darkMode;
  const border = d ? "#222" : "#e8e4dc";
  const text = d ? "#e8e4dc" : "#0a0a0a";
  const accent = "#00e5cc";
  const accentDim = d ? "rgba(0,229,204,0.08)" : "rgba(0,229,204,0.06)";

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
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
              fontFamily: "var(--font-mono)",
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
            onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = border; }}
          />
          <button
            onClick={() => exportarCSV(productosFiltrados, "productos-dashboard")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              padding: "0.3rem 0.75rem",
              border: `1px solid ${accent}`,
              background: accentDim,
              color: accent,
              cursor: "pointer",
              letterSpacing: "0.1em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,229,204,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = accentDim; }}
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
  );
}
