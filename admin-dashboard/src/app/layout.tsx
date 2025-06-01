import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/common/admin/app-sidebar";
import "./globals.css";

import { SiteHeader } from "@/components/common/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
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
      </body>
    </html>
  );
}
