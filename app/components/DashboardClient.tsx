"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dashboard from "./Dashboard";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { useDashboardData } from "@/app/hooks";
import type { Filtros, Periodo, CategoriaKey } from "@/app/types";

const PERIODOS_VALIDOS: Periodo[] = ["3m", "6m", "12m"];
const CATEGORIAS_VALIDAS: CategoriaKey[] = [
  "todas", "electronica", "ropa", "hogar", "deportes", "belleza", "juguetes",
];

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawPeriodo = searchParams.get("periodo") ?? "6m";
  const rawCategoria = searchParams.get("categoria") ?? "todas";
  const periodo: Periodo = (PERIODOS_VALIDOS as string[]).includes(rawPeriodo)
    ? (rawPeriodo as Periodo)
    : "6m";
  const categoria: CategoriaKey = (CATEGORIAS_VALIDAS as string[]).includes(rawCategoria)
    ? (rawCategoria as CategoriaKey)
    : "todas";
  const filtros: Filtros = { periodo, categoria };

  const setFiltros = (f: Filtros) => {
    const params = new URLSearchParams();
    if (f.periodo !== "6m") params.set("periodo", f.periodo);
    if (f.categoria !== "todas") params.set("categoria", f.categoria);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/", { scroll: false });
  };

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

  if (!mounted || (cargando && !datos)) return <LoadingScreen darkMode={darkMode} />;
  if (error) return <ErrorScreen darkMode={darkMode} message={error} />;
  if (!datos) return null;

  return (
    <Dashboard
      datos={datos}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      cargando={cargando}
      filtros={filtros}
      setFiltros={setFiltros}
    />
  );
}
