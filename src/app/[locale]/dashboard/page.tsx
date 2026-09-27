import { getTranslations } from "next-intl/server"
import { getCurrentUser } from "@/lib/current-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function DashboardPage() {
  const t = await getTranslations("dashboard")
  const tRoles = await getTranslations("roles")
  const user = await getCurrentUser()

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {t("welcome")}
            {user ? `, ${user.name}` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && <Badge variant="secondary">{tRoles(user.role)}</Badge>}
        </CardContent>
      </Card>
    </div>
  )
}
