import { getTranslations } from "next-intl/server"
import { Droplet, Siren, ListChecks, Building2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function HomePage() {
  const t = await getTranslations("home")

  const features = [
    { icon: Droplet, key: "search" as const },
    { icon: Siren, key: "emergency" as const },
    { icon: ListChecks, key: "tracking" as const },
    { icon: Building2, key: "org" as const },
  ]

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("hero.subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/donors/search">{t("hero.ctaSearch")}</Link>}
          />
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/signup">{t("hero.ctaJoin")}</Link>}
          />
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            {t("features.title")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, key }) => (
              <Card key={key}>
                <CardHeader>
                  <Icon className="size-8 text-primary" />
                  <CardTitle className="text-base">
                    {t(`features.${key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {t(`features.${key}.desc`)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">{t("cta.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("cta.subtitle")}</p>
        <Button
          size="lg"
          className="mt-6"
          nativeButton={false}
          render={<Link href="/signup">{t("cta.button")}</Link>}
        />
      </section>
    </div>
  )
}
