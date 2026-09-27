import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignupForm } from "./signup-form"

export default async function SignupPage() {
  const t = await getTranslations("auth.signup")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="mt-4 text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link href="/login" className="font-medium text-primary underline">
            {t("loginLink")}
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
