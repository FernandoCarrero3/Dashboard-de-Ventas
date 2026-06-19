"use client";
import { useState, useEffect } from "react";
import { Dashboard, LoadingScreen, ErrorScreen } from "@/app/components";
import { useDashboardData } from "@/app/hooks";
import type { Filtros } from "@/app/types";

export default function Home() {
  const [filtros, setFiltros] = useState<Filtros>({ periodo: "6m", categoria: "todas" });
  const { datos, cargando, error } = useDashboardData(filtros);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dash-theme");
    if (saved) setDarkMode(saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("dash-theme", next ? "dark" : "light");
  };

  if (!mounted || cargando) return <LoadingScreen darkMode={darkMode} />;
  if (error) return <ErrorScreen darkMode={darkMode} message={error} />;
  if (!datos) return null;

  return <Dashboard datos={datos} darkMode={darkMode} toggleTheme={toggleTheme} />;
}
