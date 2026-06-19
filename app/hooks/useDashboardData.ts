import { useState, useEffect } from "react";
import type { DashboardData } from "@/app/types";

interface UseDashboardDataResult {
  datos: DashboardData | null;
  cargando: boolean;
  error: string | null;
}

export function useDashboardData(): UseDashboardDataResult {
  const [datos, setDatos] = useState<DashboardData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
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
  }, []);

  return { datos, cargando, error };
}
