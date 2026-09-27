"use client"

import { useTranslations } from "next-intl"
import { LayoutDashboard, Users, Building2, ListChecks } from "lucide-react"
import { AppSidebarShell, type SidebarNavItem } from "@/components/app-sidebar-shell"
import { DashboardTopbarActions } from "@/components/dashboard-topbar-actions"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav")

  const items: SidebarNavItem[] = [
    { href: "/admin", label: t("admin"), icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/organizations", label: "Organizations", icon: Building2 },
    { href: "/admin/requests", label: "Requests", icon: ListChecks },
  ]

  return (
    <AppSidebarShell
      sectionLabel={t("admin")}
      items={items}
      actions={<DashboardTopbarActions />}
    >
      {children}
    </AppSidebarShell>
  )
}
