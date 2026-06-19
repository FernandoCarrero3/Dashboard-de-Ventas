import type {
  DashboardData,
  Periodo,
  CategoriaKey,
  Categoria,
  Producto,
  PedidoPorMes,
} from "@/app/types";

interface MesDato {
  mes: string;
  pedidos: number;
  ingresos: number;
  ventas: Record<string, number>;
}

const MESES_DATA: MesDato[] = [
  { mes: "Jul", pedidos: 58, ingresos: 5800, ventas: { "Electrónica": 800, "Ropa": 650, "Hogar": 450, "Deportes": 340, "Belleza": 290, "Juguetes": 180 } },
  { mes: "Ago", pedidos: 52, ingresos: 5100, ventas: { "Electrónica": 720, "Ropa": 610, "Hogar": 420, "Deportes": 310, "Belleza": 260, "Juguetes": 160 } },
  { mes: "Sep", pedidos: 67, ingresos: 6700, ventas: { "Electrónica": 920, "Ropa": 740, "Hogar": 510, "Deportes": 390, "Belleza": 320, "Juguetes": 200 } },
  { mes: "Oct", pedidos: 78, ingresos: 7800, ventas: { "Electrónica": 1080, "Ropa": 860, "Hogar": 600, "Deportes": 450, "Belleza": 380, "Juguetes": 230 } },
  { mes: "Nov", pedidos: 142, ingresos: 14800, ventas: { "Electrónica": 2100, "Ropa": 1600, "Hogar": 1050, "Deportes": 800, "Belleza": 680, "Juguetes": 600 } },
  { mes: "Dic", pedidos: 189, ingresos: 20100, ventas: { "Electrónica": 2800, "Ropa": 2100, "Hogar": 1400, "Deportes": 1050, "Belleza": 900, "Juguetes": 1800 } },
  { mes: "Ene", pedidos: 54, ingresos: 5200, ventas: { "Electrónica": 720, "Ropa": 580, "Hogar": 390, "Deportes": 300, "Belleza": 250, "Juguetes": 160 } },
  { mes: "Feb", pedidos: 69, ingresos: 6800, ventas: { "Electrónica": 940, "Ropa": 860, "Hogar": 500, "Deportes": 380, "Belleza": 580, "Juguetes": 190 } },
  { mes: "Mar", pedidos: 81, ingresos: 8100, ventas: { "Electrónica": 1120, "Ropa": 880, "Hogar": 620, "Deportes": 480, "Belleza": 420, "Juguetes": 210 } },
  { mes: "Abr", pedidos: 88, ingresos: 8900, ventas: { "Electrónica": 1230, "Ropa": 960, "Hogar": 680, "Deportes": 530, "Belleza": 460, "Juguetes": 240 } },
  { mes: "May", pedidos: 95, ingresos: 9700, ventas: { "Electrónica": 1350, "Ropa": 1050, "Hogar": 740, "Deportes": 580, "Belleza": 500, "Juguetes": 260 } },
  { mes: "Jun", pedidos: 103, ingresos: 10500, ventas: { "Electrónica": 1460, "Ropa": 1140, "Hogar": 810, "Deportes": 640, "Belleza": 540, "Juguetes": 290 } },
];

const CATALOGO: Record<string, Producto[]> = {
  "Electrónica": [
    { nombre: "iPhone 14 Pro", categoria: "Electrónica", precio: 999, rating: 4.8, votos: 342 },
    { nombre: "Samsung Galaxy S23", categoria: "Electrónica", precio: 849, rating: 4.6, votos: 298 },
    { nombre: "AirPods Pro", categoria: "Electrónica", precio: 279, rating: 4.7, votos: 412 },
    { nombre: "MacBook Air M2", categoria: "Electrónica", precio: 1299, rating: 4.9, votos: 187 },
    { nombre: "PlayStation 5", categoria: "Electrónica", precio: 549, rating: 4.8, votos: 521 },
  ],
  "Ropa": [
    { nombre: "Nike Air Max 90", categoria: "Ropa", precio: 129, rating: 4.7, votos: 289 },
    { nombre: "Levis 501 Original", categoria: "Ropa", precio: 89, rating: 4.5, votos: 345 },
    { nombre: "North Face Chaqueta", categoria: "Ropa", precio: 199, rating: 4.6, votos: 178 },
    { nombre: "Adidas Ultraboost", categoria: "Ropa", precio: 159, rating: 4.7, votos: 234 },
    { nombre: "Zara Blazer Slim", categoria: "Ropa", precio: 69, rating: 4.3, votos: 412 },
  ],
  "Hogar": [
    { nombre: "Cafetera Nespresso", categoria: "Hogar", precio: 189, rating: 4.6, votos: 201 },
    { nombre: "Robot Aspirador iRobot", categoria: "Hogar", precio: 349, rating: 4.5, votos: 156 },
    { nombre: "Airfryer Philips", categoria: "Hogar", precio: 149, rating: 4.7, votos: 389 },
    { nombre: "Lámpara LED Inteligente", categoria: "Hogar", precio: 49, rating: 4.4, votos: 278 },
    { nombre: "Almohada Viscoelástica", categoria: "Hogar", precio: 79, rating: 4.5, votos: 167 },
  ],
  "Deportes": [
    { nombre: "Zapatillas Running", categoria: "Deportes", precio: 89, rating: 4.5, votos: 178 },
    { nombre: "Bicicleta Estática", categoria: "Deportes", precio: 299, rating: 4.4, votos: 143 },
    { nombre: "Mancuernas 20kg Set", categoria: "Deportes", precio: 79, rating: 4.6, votos: 267 },
    { nombre: "Yoga Mat Premium", categoria: "Deportes", precio: 39, rating: 4.5, votos: 445 },
    { nombre: "Casco Ciclismo", categoria: "Deportes", precio: 69, rating: 4.4, votos: 189 },
  ],
  "Belleza": [
    { nombre: "Sérum Vitamina C", categoria: "Belleza", precio: 45, rating: 4.5, votos: 156 },
    { nombre: "Perfume Carolina Herrera", categoria: "Belleza", precio: 89, rating: 4.7, votos: 234 },
    { nombre: "Crema Hidratante La Roche", categoria: "Belleza", precio: 29, rating: 4.6, votos: 512 },
    { nombre: "Rizador BaByliss", categoria: "Belleza", precio: 79, rating: 4.4, votos: 198 },
    { nombre: "Paleta Maquillaje Urban", categoria: "Belleza", precio: 55, rating: 4.5, votos: 301 },
  ],
  "Juguetes": [
    { nombre: "LEGO Star Wars Set", categoria: "Juguetes", precio: 129, rating: 4.8, votos: 312 },
    { nombre: "Barbie Dreamhouse", categoria: "Juguetes", precio: 89, rating: 4.6, votos: 245 },
    { nombre: "Hot Wheels Track Builder", categoria: "Juguetes", precio: 49, rating: 4.5, votos: 389 },
    { nombre: "Nintendo Switch + Juego", categoria: "Juguetes", precio: 349, rating: 4.9, votos: 178 },
    { nombre: "Playmobil City Police", categoria: "Juguetes", precio: 69, rating: 4.4, votos: 167 },
  ],
};

const CATEGORIA_DISPLAY: Record<CategoriaKey, string | null> = {
  todas: null,
  electronica: "Electrónica",
  ropa: "Ropa",
  hogar: "Hogar",
  deportes: "Deportes",
  belleza: "Belleza",
  juguetes: "Juguetes",
};

const CLIENTES_POR_PERIODO: Record<Periodo, number> = {
  "3m": 380,
  "6m": 680,
  "12m": 1204,
};

const PRODUCTOS_POR_CATEGORIA: Record<string, number> = {
  "Electrónica": 67,
  "Ropa": 54,
  "Hogar": 48,
  "Deportes": 32,
  "Belleza": 28,
  "Juguetes": 19,
};

const CLIENTES_SHARE: Record<string, number> = {
  "Electrónica": 0.42,
  "Ropa": 0.38,
  "Hogar": 0.28,
  "Deportes": 0.22,
  "Belleza": 0.20,
  "Juguetes": 0.15,
};

const N_MESES: Record<Periodo, number> = { "3m": 3, "6m": 6, "12m": 12 };

export function computeDashboard(periodo: Periodo, categoria: CategoriaKey): DashboardData {
  const slice = MESES_DATA.slice(-N_MESES[periodo]);
  const catDisplay = CATEGORIA_DISPLAY[categoria];

  const totalVentasMes = (m: MesDato) =>
    Object.values(m.ventas).reduce((a, b) => a + b, 0);

  const pedidosPorMes: PedidoPorMes[] = slice.map((m) => {
    if (!catDisplay) return { mes: m.mes, pedidos: m.pedidos };
    const share = (m.ventas[catDisplay] ?? 0) / totalVentasMes(m);
    return { mes: m.mes, pedidos: Math.max(1, Math.round(m.pedidos * share)) };
  });

  let ingresosTotales: number;
  if (!catDisplay) {
    ingresosTotales = slice.reduce((sum, m) => sum + m.ingresos, 0);
  } else {
    ingresosTotales = slice.reduce((sum, m) => {
      const share = (m.ventas[catDisplay] ?? 0) / totalVentasMes(m);
      return sum + Math.round(m.ingresos * share);
    }, 0);
  }

  const totalPedidos = pedidosPorMes.reduce((a, m) => a + m.pedidos, 0);
  const ticketMedio = totalPedidos > 0 ? Math.round(ingresosTotales / totalPedidos) : 0;

  let categorias: Categoria[];
  if (!catDisplay) {
    const catTotals: Record<string, number> = {};
    for (const m of slice) {
      for (const [cat, val] of Object.entries(m.ventas)) {
        catTotals[cat] = (catTotals[cat] ?? 0) + val;
      }
    }
    categorias = Object.entries(catTotals)
      .map(([nombre, valor]) => ({ nombre, valor }))
      .sort((a, b) => b.valor - a.valor);
  } else {
    categorias = slice.map((m) => ({
      nombre: m.mes,
      valor: m.ventas[catDisplay] ?? 0,
    }));
  }

  let topProductos: Producto[];
  if (!catDisplay) {
    topProductos = categorias
      .slice(0, 5)
      .flatMap((c) => CATALOGO[c.nombre]?.slice(0, 1) ?? []);
  } else {
    topProductos = CATALOGO[catDisplay] ?? [];
  }

  const totalClientes = catDisplay
    ? Math.round(CLIENTES_POR_PERIODO[periodo] * (CLIENTES_SHARE[catDisplay] ?? 0.25))
    : CLIENTES_POR_PERIODO[periodo];

  const totalProductos = catDisplay
    ? (PRODUCTOS_POR_CATEGORIA[catDisplay] ?? 0)
    : 248;

  return {
    metricas: { ingresosTotales, totalPedidos, ticketMedio, totalProductos, totalClientes },
    categorias,
    topProductos,
    pedidosPorMes,
  };
}
