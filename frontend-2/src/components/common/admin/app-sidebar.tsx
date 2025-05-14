"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HandCoins,
  HelpCircleIcon,
  House,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  HousePlus,
  UsersIcon,
  List,
  PlusCircle,
  Mails
} from "lucide-react";

import { NavDocuments } from "@/components/common/admin/nav-documents";
import { NavMain } from "@/components/common/admin/nav-main";
import { NavSecondary } from "@/components/common/admin/nav-secondary";
import { NavUser } from "@/components/common/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "NarakCODE (Admin)",
    email: "admin@gmail.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Property",
      url: "/property",
      icon: HousePlus,
      children: [
        { title: "List Property", url: "/property", icon: List },
        {
          title: "Add Property",
          url: "/property/add",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
      children: [
        { title: "All Users", url: "/users", icon: List },
        { title: "Add User", url: "/users/add", icon: PlusCircle },
      ],
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Mails,
      // children: [
      //   { title: "All Users", url: "/users", icon: List },
      //   { title: "Add User", url: "/users/add", icon: PlusCircle },
      // ],
    },
    // {
    //   title: "Rent",
    //   url: "/rent",
    //   icon: House,
    // },
    // {
    //   title: "Buy",
    //   url: "/buy",
    //   icon: HandCoins,
    // },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const Navbar = {
    url: "/dashboard",
    src: "https://res.cloudinary.com/dnfahcxo3/image/upload/v1745082558/9c2d1352-17cf-40b9-b71d-f6f2393ec6a0.png",
    alt: "logo",
  };
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
    >
      <SidebarMenu className="w-[100px]  0 h-[100px]">
        <a href={Navbar.url} className="h-[100%] w-[100%]">
          <img src={Navbar.src} alt="" className="w-full" />
        </a>
      </SidebarMenu>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
