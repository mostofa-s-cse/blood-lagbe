import { redirect } from "@/i18n/navigation"
import { getCurrentAuthUser } from "@/lib/current-user"
import { DashboardShell } from "@/components/dashboard-shell"
import type { Role } from "@/lib/roles"
import type { Locale } from "@/i18n/routing"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const user = await getCurrentAuthUser()
  if (!user) {
    redirect({ href: "/login", locale: locale as Locale })
  }

  const role = (user!.user_metadata?.role as Role | undefined) ?? "SEEKER"

  return <DashboardShell role={role}>{children}</DashboardShell>
}
