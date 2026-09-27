"use client"

import { useTranslations } from "next-intl"
import { LayoutDashboard, UserRound, Search, ListChecks, Bell } from "lucide-react"
import { AppSidebarShell, type SidebarNavItem } from "@/components/app-sidebar-shell"
import { DashboardTopbarActions } from "@/components/dashboard-topbar-actions"
import type { Role } from "@/lib/roles"

export function DashboardShell({
  role,
  children,
}: {
  role: Role
  children: React.ReactNode
}) {
  const t = useTranslations("dashboard")
  const tRoles = useTranslations("roles")

  const items: SidebarNavItem[] = [
    { href: "/dashboard", label: t("overview"), icon: LayoutDashboard },
    ...(role === "DONOR"
      ? [{ href: "/dashboard/profile", label: t("profile"), icon: UserRound }]
      : []),
    { href: "/donors/search", label: t("search"), icon: Search },
    { href: "/dashboard/requests", label: t("requests"), icon: ListChecks },
    {
      href: "/dashboard/notifications",
      label: t("notifications"),
      icon: Bell,
    },
  ]

  return (
    <AppSidebarShell
      sectionLabel={tRoles(role)}
      items={items}
      actions={<DashboardTopbarActions />}
    >
      {children}
    </AppSidebarShell>
  )
}
