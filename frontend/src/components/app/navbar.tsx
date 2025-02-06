"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { Button } from "@/components/ui/button"
import { Icons } from "../common/icons"
import { LogOut, Plus } from "lucide-react"
import { AppNavBar } from "@/lib/config"
import { ThemeToggle } from "../common/theme-toggle"
import { usePathname } from "next/navigation"
import Image from "next/image"
// import StoragentLogo from "../../public/images/storagent.png";

export function NavBar({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const pathName = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar
          className={cn("w-[60px] transition-all duration-300 ease-in-out border-r", isHovered && "w-64")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SidebarHeader className="border-b">
            <SidebarMenu>
              <SidebarMenuItem className="">
                <SidebarMenuButton size="sm" className="relative overflow-hidden w-full rounded-none justify-start">
                  <Icons.logo className="size-4 shrink-0" />
                  <span>
                  <Image src="/images/storagent.png" alt="Storagent Logo" width={140} height={140} />
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
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Plus className="size-4 shrink-0" />
                  <span className={cn("ml-2 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}>
                    Create
                  </span>
                </Button>
              </SidebarMenuItem>
              {AppNavBar.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={pathName === item.href} className={`w-full h-full py-3 justify-start bg-background hover:bg-accent hover:text-accent-foreground ${pathName === item.href ? 'bg-primary/40 text-white hover:text-white hover:bg-primary/70' : ''}`} size="sm">
                    <item.icon className="size-4 shrink-0 ml-[5px]" />
                    <a
                      className={cn("ml-2 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <ThemeToggle className="w-full justify-start px-[10px]" isHovered={isHovered} />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start ml-1">
                  <LogOut className="size-4 shrink-0" />
                  <a href="/" className={cn("ml-2 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}>
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
  )
}

