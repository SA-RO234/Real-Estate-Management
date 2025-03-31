import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/common/admin/app-sidebar";
import { ChartAreaInteractive } from "@/components/common/admin/chart-area-interactive";
import { DataTable } from "@/components/common/admin/data-table";
import { SectionCards } from "@/components/common/admin/section-cards";
import { SiteHeader } from "@/components/common/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
