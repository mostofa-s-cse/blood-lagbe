import { getTranslations } from "next-intl/server"
import { UserRound } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonorProfileForm } from "./donor-profile-form"

export default async function DonorProfilePage() {
  const t = await getTranslations("profile")

  return (
    <Card className="max-w-xl">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </CardHeader>
      <CardContent>
        <DonorProfileForm />
      </CardContent>
    </Card>
  )
}
