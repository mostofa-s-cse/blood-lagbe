import { getTranslations } from "next-intl/server"
import { UserRound, Search, ListChecks, Bell } from "lucide-react"
import { getCurrentUser } from "@/lib/current-user"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"

export default async function DashboardPage() {
  const t = await getTranslations("dashboard")
  const tRoles = await getTranslations("roles")
  const user = await getCurrentUser()

  const quickLinks = [
    ...(user?.role === "DONOR"
      ? [{ href: "/dashboard/profile", label: t("profile"), icon: UserRound }]
      : []),
    { href: "/donors/search", label: t("search"), icon: Search },
    { href: "/dashboard/requests", label: t("requests"), icon: ListChecks },
    { href: "/dashboard/notifications", label: t("notifications"), icon: Bell },
  ]

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border bg-primary/5 p-6">
        <p className="text-sm text-muted-foreground">
          {t("welcome")}
        </p>
        <h1 className="mt-1 text-2xl font-bold">{user?.name}</h1>
        {user && (
          <Badge variant="secondary" className="mt-3">
            {tRoles(user.role)}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:bg-primary/5">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
