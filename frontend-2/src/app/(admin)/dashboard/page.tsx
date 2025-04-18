import { ChartAreaInteractive } from "@/components/common/admin/chart-area-interactive";
import { DataTable } from "@/components/common/admin/data-table";
import { SectionCards } from "@/components/common/admin/section-cards";
import data from "./data.json";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight transition-colors ">
        Dashboard
      </h2>
      <div className="flex flex-col gap-4 md:gap-6">
        <SectionCards />

        <ChartAreaInteractive />
        <DataTable data={data} />
      </div>
    </div>
  );
}
