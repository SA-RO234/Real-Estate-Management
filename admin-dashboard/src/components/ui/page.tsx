"use client";
import { ChartAreaInteractive } from "@/components/common/admin/chart-area-interactive";
// import {DataTableUsers } from "@/components/common/admin/data-table";
import { SectionCards } from "@/components/common/admin/section-cards";
import Messages from "@/components/common/admin/messages";
export default function DashboardPage() {
  return (
    <div>
      <h2 className="pb-2 text-3xl  font-semibold tracking-tight transition-colors ">
        Dashboard
      </h2>
      <div className="flex flex-col gap-4 md:gap-6">
        <SectionCards />
        <div className="flex gap-x-5">
          <ChartAreaInteractive />
          <Messages />
        </div>
      </div>
    </div>
  );
}
