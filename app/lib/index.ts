export const exportarCSV = <T extends object>(
  exportData: T[],
  nombreArchivo: string
): void => {
  const headers = Object.keys(exportData[0] as Record<string, unknown>).join(";");
  const filas = exportData
    .map((row) =>
      Object.values(row as Record<string, unknown>)
        .map((v) => `"${v}"`)
        .join(";")
    )
    .join("\n");
  const csv = `﻿${headers}\n${filas}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${nombreArchivo}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
