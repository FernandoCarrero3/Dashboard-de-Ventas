interface Metrica {
  ingresosTotales: number;
  totalPedidos: number;
  ticketMedio: number;
  totalProductos: number;
  totalClientes: number;
}

interface Categoria {
  nombre: string;
  valor: number;
}

interface Producto {
  nombre: string;
  categoria: string;
  precio: number;
  rating: number;
  votos: number;
}

interface PedidoPorMes {
  mes: string;
  pedidos: number;
}

interface DashboardResponse {
  metricas: Metrica;
  categorias: Categoria[];
  topProductos: Producto[];
  pedidosPorMes: PedidoPorMes[];
}

export async function GET(): Promise<Response> {
  const data: DashboardResponse = {
    metricas: {
      ingresosTotales: 48320,
      totalPedidos: 532,
      ticketMedio: 91,
      totalProductos: 248,
      totalClientes: 1204,
    },
    categorias: [
      { nombre: "Electrónica", valor: 4850 },
      { nombre: "Ropa", valor: 3920 },
      { nombre: "Hogar", valor: 2740 },
      { nombre: "Deportes", valor: 2100 },
      { nombre: "Belleza", valor: 1850 },
      { nombre: "Juguetes", valor: 1200 },
    ],
    topProductos: [
      { nombre: "iPhone 14 Pro", categoria: "Electrónica", precio: 999, rating: 4.8, votos: 342 },
      { nombre: "Nike Air Max 90", categoria: "Ropa", precio: 129, rating: 4.7, votos: 289 },
      { nombre: "Cafetera Nespresso", categoria: "Hogar", precio: 189, rating: 4.6, votos: 201 },
      { nombre: "Zapatillas Running", categoria: "Deportes", precio: 89, rating: 4.5, votos: 178 },
      { nombre: "Sérum Vitamina C", categoria: "Belleza", precio: 45, rating: 4.5, votos: 156 },
    ],
    pedidosPorMes: [
      { mes: "Ago", pedidos: 38 },
      { mes: "Sep", pedidos: 52 },
      { mes: "Oct", pedidos: 61 },
      { mes: "Nov", pedidos: 89 },
      { mes: "Dic", pedidos: 124 },
      { mes: "Ene", pedidos: 75 },
      { mes: "Feb", pedidos: 93 },
    ],
  };

  return Response.json(data);
}
