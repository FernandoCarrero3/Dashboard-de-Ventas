import { Suspense } from "react";
import DashboardClient from "@/app/components/DashboardClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DashboardClient />
    </Suspense>
  );
}
