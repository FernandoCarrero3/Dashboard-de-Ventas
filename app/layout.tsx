import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const syne = Syne({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard",
  description:
    "Interactive sales analytics dashboard built with Next.js, TypeScript and Recharts. Real-time KPI metrics, dynamic charts and CSV data export.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
