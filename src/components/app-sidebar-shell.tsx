"use client"

import type { LucideIcon } from "lucide-react"
import { Droplet } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, usePathname } from "@/i18n/navigation"
import { Separator } from "@/components/ui/separator"

export type SidebarNavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export function AppSidebarShell({
  sectionLabel,
  items,
  actions,
  children,
}: {
  sectionLabel: string
  items: SidebarNavItem[]
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const current = items.find((item) => item.href === pathname)

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-1 py-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-bold text-primary hover:bg-sidebar-accent"
          >
            <Droplet className="size-4 shrink-0 fill-primary" />
            <span className="truncate">Blood Lagbe</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{sectionLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      render={
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="flex-1 text-sm font-medium">
            {current?.label ?? sectionLabel}
          </span>
          {actions}
        </div>
        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
