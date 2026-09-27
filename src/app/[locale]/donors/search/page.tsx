import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DonorSearchPage() {
  const t = await getTranslations()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>{t("nav.search")}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {t("common.comingSoon")}
        </CardContent>
      </Card>
    </div>
  )
}
