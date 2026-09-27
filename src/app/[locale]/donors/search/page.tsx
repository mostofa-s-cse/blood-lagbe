import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BLOOD_GROUP_LABELS } from "@/lib/validation/donor-profile"

export default async function DonorSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ bloodGroup?: string; location?: string }>
}) {
  const t = await getTranslations()
  const { bloodGroup, location } = await searchParams

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>{t("nav.search")}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {(bloodGroup || location) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {bloodGroup && (
                <Badge variant="secondary">
                  {BLOOD_GROUP_LABELS[bloodGroup as keyof typeof BLOOD_GROUP_LABELS] ??
                    bloodGroup}
                </Badge>
              )}
              {location && <Badge variant="secondary">{location}</Badge>}
            </div>
          )}
          {t("common.comingSoon")}
        </CardContent>
      </Card>
    </div>
  )
}
