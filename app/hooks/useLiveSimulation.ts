"use client";
import { useState, useEffect } from "react";
import type { DashboardData, FeedEntry } from "@/app/types";

let nextId = 0;

function rnd(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function mult(minPct: number, maxPct: number): number {
  return 1 + rnd(minPct, maxPct) / 100;
}

function applyTick(prev: DashboardData): { datos: DashboardData; entries: FeedEntry[] } {
  const entries: FeedEntry[] = [];
  const ts = Date.now();

  const nuevasCategorias = prev.categorias.map((cat) => {
    const factor = mult(-1.5, 2.2);
    const nuevoValor = Math.max(1, Math.round(cat.valor * factor));
    const delta = ((nuevoValor - cat.valor) / cat.valor) * 100;
    if (Math.abs(delta) > 0.4) {
      entries.push({
        id: nextId++,
        texto: `${delta > 0 ? "↑" : "↓"} ${cat.nombre} ${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`,
        tipo: delta > 0 ? "up" : "down",
        ts,
      });
    }
    return { ...cat, valor: nuevoValor };
  });

  const ingresosFactor = mult(-0.3, 0.9);
  const nuevosIngresos = Math.round(prev.metricas.ingresosTotales * ingresosFactor);
  const pedidosDelta = Math.random() > 0.38 ? 1 : 0;
  const nuevosPedidos = prev.metricas.totalPedidos + pedidosDelta;
  const nuevoTicket = Math.round(nuevosIngresos / nuevosPedidos);

  const pedidosPorMes = prev.pedidosPorMes.map((p, i) =>
    i === prev.pedidosPorMes.length - 1
      ? { ...p, pedidos: p.pedidos + (Math.random() > 0.5 ? 1 : 0) }
      : p
  );

  return {
    datos: {
      ...prev,
      metricas: {
        ...prev.metricas,
        ingresosTotales: nuevosIngresos,
        totalPedidos: nuevosPedidos,
        ticketMedio: nuevoTicket,
      },
      categorias: nuevasCategorias,
      pedidosPorMes,
    },
    entries,
  };
}

interface LiveSimResult {
  datos: DashboardData | null;
  feed: FeedEntry[];
}

export function useLiveSimulation(
  baseDatos: DashboardData | null,
  isLive: boolean
): LiveSimResult {
  const [state, setState] = useState<{ datos: DashboardData | null; feed: FeedEntry[] }>({
    datos: baseDatos,
    feed: [],
  });

  useEffect(() => {
    setState({ datos: baseDatos, feed: [] });
  }, [baseDatos]);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setState((prev) => {
        if (!prev.datos) return prev;
        const { datos, entries } = applyTick(prev.datos);
        return {
          datos,
          feed: entries.length > 0 ? [...entries, ...prev.feed].slice(0, 30) : prev.feed,
        };
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isLive]);

  return state;
}
