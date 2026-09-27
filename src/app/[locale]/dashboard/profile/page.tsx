import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonorProfileForm } from "./donor-profile-form"

export default async function DonorProfilePage() {
  const t = await getTranslations("profile")

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </CardHeader>
      <CardContent>
        <DonorProfileForm />
      </CardContent>
    </Card>
  )
}
