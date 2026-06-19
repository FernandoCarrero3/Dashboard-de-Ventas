import { useState, useEffect } from "react";
import type { DashboardData, Filtros } from "@/app/types";

interface UseDashboardDataResult {
  datos: DashboardData | null;
  cargando: boolean;
  error: string | null;
}

export function useDashboardData(filtros: Filtros): UseDashboardDataResult {
  const [datos, setDatos] = useState<DashboardData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(`/api/dashboard?periodo=${filtros.periodo}&categoria=${filtros.categoria}`)
      .then((r): Promise<DashboardData> => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<DashboardData>;
      })
      .then((data) => {
        setDatos(data);
        setCargando(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setCargando(false);
      });
  }, [filtros.periodo, filtros.categoria]);

  return { datos, cargando, error };
}
