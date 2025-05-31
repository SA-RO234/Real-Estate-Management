import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/common/admin/app-sidebar";

import { SiteHeader } from "@/components/common/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:px-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
