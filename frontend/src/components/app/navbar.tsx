"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Icons } from "../common/icons";
import { LogOut, Plus } from "lucide-react";
import { AppNavBar } from "@/lib/config";
import { ThemeToggle } from "../common/theme-toggle";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import StoragentLogo from "../../public/images/storagent.png";

export function NavBar({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const pathName = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar
          className={cn(
            "w-[60px] transition-all duration-300 ease-in-out border-r",
            isHovered && "w-64"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SidebarHeader className="border-b">
            <SidebarMenu>
              <SidebarMenuItem className="">
                <SidebarMenuButton
                  size="sm"
                  className="relative overflow-hidden w-full rounded-none justify-start"
                >
                  <Icons.logo className="size-4 shrink-0" />
                  <span>
                    <Image
                      src="/images/storagent.png"
                      alt="Storagent Logo"
                      width={140}
                      height={140}
                    />
                  </span>
                </SidebarMenuButton>
                <FlickeringGrid
                  squareSize={5}
                  gridGap={2}
                  color="#6B7280"
                  maxOpacity={0.2}
                  flickerChance={0.1}
                  className="absolute inset-0 size-full"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="p-2 overflow-hidden">
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="/app/create">
                  <Button
                    variant="outline"
                    className="w-full text-start justify-start gap-2"
                    size="sm"
                  >
                    <Plus className="size-4 shrink-0" />
                    <span
                      className={cn(
                        "text-[12px] transition-opacity duration-300",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}
                    >
                      Create
                    </span>
                  </Button>
                </a>
              </SidebarMenuItem>
              {AppNavBar.map((item) => (
                <a
                  className={cn(
                    "pl-2 w-full flex flex-row items-center group hover:bg-accent hover:text-accent-foreground",
                    pathName === item.href && "bg-primary/40 text-white hover:bg-primary/70"
                  )}
                  href={item.href}
                >
                  <item.icon className="size-4 shrink-0 ml-[5px] group-hover:text-accent-foreground" />
                  <SidebarMenuItem key={item.label} className="flex-1 w-full">
                    <SidebarMenuButton
                      isActive={pathName === item.href}
                      className={cn(
                        "w-full h-full py-3 justify-start",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}
                      size="sm"
                    >
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </a>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <ThemeToggle
                  className="w-full text-[12px] justify-start gap-2 rounded-none px-[10px] transition-opacity text-start duration-300"
                  isHovered={isHovered}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-none gap-2 group hover:bg-accent hover:text-accent-foreground">
                  <LogOut className="size-4 ml-1 shrink-0" />
                  <a
                    href="/"
                    className={cn(
                      "pl-2 text-[12px] transition-opacity text-start duration-300",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                  >
                    Sign Out
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 bg-background w-full mr-48">{children}</main>
      </div>
    </SidebarProvider>
  );
}
