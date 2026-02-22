# 📊 Dashboard de Ventas

Dashboard de analíticas para e-commerce con visualización de datos en tiempo real. Desarrollado con **Next.js** y **Recharts**, permite monitorizar métricas clave del negocio, analizar tendencias de ventas y exportar datos directamente a Excel.

---

## ✨ Funcionalidades

- **Métricas en tiempo real:** ingresos totales, pedidos, ticket medio, productos y clientes
- **Gráfica de área** con evolución de pedidos y filtro por rango temporal (3M / 5M / 1A)
- **Gráfica de barras horizontal** con ventas desglosadas por categoría
- **Gráfica de donut** con distribución porcentual de ventas
- **Barras de progreso** por categoría con porcentaje visual
- **Tabla de productos** con buscador en tiempo real por nombre y categoría
- **Exportación a CSV** compatible con Excel (separador ; y codificación UTF-8)
- **Modo claro / oscuro** con preferencia guardada entre sesiones
- **Diseño responsive** adaptado a móvil, tablet y escritorio

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16, React 19 |
| Gráficas | Recharts 3 |
| Tipografía | Space Mono, Syne (Google Fonts) |
| Estilos | CSS-in-JS personalizado |
| Datos | API route de Next.js con datos mock |
| Despliegue | Vercel |

---

## 📁 Estructura del proyecto

```
dashboard-ventas/
├── app/
│   ├── page.js              # Dashboard principal con todas las visualizaciones
│   ├── api/
│   │   └── dashboard/
│   │       └── route.js     # Endpoint GET: métricas, categorías, productos y pedidos
│   └── globals.css
├── next.config.mjs
└── package.json
```

---

## 📈 Métricas disponibles

- **Ingresos totales** con variación porcentual
- **Total de pedidos** del período
- **Ticket medio** por pedido
- **Catálogo de productos** activos
- **Base de clientes** registrados

---

## 🚀 Instalación local

**1. Clona el repositorio**
```bash
git clone https://github.com/FernandoCarrero3/dashboard-ventas.git
cd dashboard-ventas
```

**2. Instala las dependencias**
```bash
npm install
```

**3. Arranca el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔌 Extensibilidad

El endpoint `/api/dashboard` está diseñado para ser fácilmente reemplazado por datos reales. Puede conectarse a:

- **Google Sheets** vía API
- **Shopify, WooCommerce** u otras plataformas e-commerce
- **Bases de datos** SQL o MongoDB
- Cualquier **API REST** externa

---

## 👤 Autor

**Fernando Carrero Pérez**
Estudiante de Ingeniería Informática – Universidad de Huelva
[GitHub](https://github.com/FernandoCarrero3) · [LinkedIn](https://www.linkedin.com/in/fernando-carrero/)