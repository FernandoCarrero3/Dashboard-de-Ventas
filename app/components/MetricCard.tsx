"use client";
import { useRef, useState, useEffect } from "react";

interface MetricCardProps {
  label: string;
  valor: string | number;
  delta: string;
  rawValue?: number;
}

export default function MetricCard({ label, valor, delta, rawValue }: MetricCardProps) {
  const prevRef = useRef<number | undefined>(rawValue);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (rawValue === undefined) return;
    if (prevRef.current !== undefined && rawValue !== prevRef.current) {
      setFlash(rawValue > prevRef.current ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 650);
      prevRef.current = rawValue;
      return () => clearTimeout(t);
    }
    prevRef.current = rawValue;
  }, [rawValue]);

  const flashBg =
    flash === "up"
      ? "rgba(0,232,123,0.13)"
      : flash === "down"
      ? "rgba(255,60,60,0.11)"
      : undefined;

  const flashColor =
    flash === "up" ? "#00e87b" : flash === "down" ? "#ff4444" : undefined;

  return (
    <div
      className="metric-card"
      style={flash ? { background: flashBg, transition: "background 0.05s" } : undefined}
    >
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={flashColor ? { color: flashColor } : undefined}>
        {valor}
      </div>
      <div className="metric-delta">↑ {delta}</div>
    </div>
  );
}
