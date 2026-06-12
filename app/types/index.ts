export interface Metrica {
  ingresosTotales: number;
  totalPedidos: number;
  ticketMedio: number;
  totalProductos: number;
  totalClientes: number;
}

export interface Categoria {
  nombre: string;
  valor: number;
}

export interface Producto {
  nombre: string;
  categoria: string;
  precio: number;
  rating: number;
  votos: number;
}

export interface PedidoPorMes {
  mes: string;
  pedidos: number;
}

export interface DashboardData {
  metricas: Metrica;
  categorias: Categoria[];
  topProductos: Producto[];
  pedidosPorMes: PedidoPorMes[];
}

export interface MetricaItem {
  label: string;
  valor: string | number;
  delta: string;
}
