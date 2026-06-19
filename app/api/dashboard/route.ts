import { NextRequest } from "next/server";
import type { Periodo, CategoriaKey } from "@/app/types";
import { computeDashboard } from "@/app/lib/data";

const PERIODOS_VALIDOS: Periodo[] = ["3m", "6m", "12m"];
const CATEGORIAS_VALIDAS: CategoriaKey[] = [
  "todas", "electronica", "ropa", "hogar", "deportes", "belleza", "juguetes",
];

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;

  const rawPeriodo = searchParams.get("periodo") ?? "6m";
  const rawCategoria = searchParams.get("categoria") ?? "todas";

  const periodo: Periodo = PERIODOS_VALIDOS.includes(rawPeriodo as Periodo)
    ? (rawPeriodo as Periodo)
    : "6m";

  const categoria: CategoriaKey = CATEGORIAS_VALIDAS.includes(rawCategoria as CategoriaKey)
    ? (rawCategoria as CategoriaKey)
    : "todas";

  return Response.json(computeDashboard(periodo, categoria));
}
