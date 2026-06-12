import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard",
  description:
    "Interactive sales analytics dashboard built with Next.js, TypeScript and Recharts. Real-time KPI metrics, dynamic charts and CSV data export.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
