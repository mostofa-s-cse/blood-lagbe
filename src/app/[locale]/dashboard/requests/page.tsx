import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function RequestsPage() {
  const t = await getTranslations()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.requests")}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {t("common.comingSoon")}
      </CardContent>
    </Card>
  )
}
