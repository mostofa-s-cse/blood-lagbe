import { getTranslations } from "next-intl/server"
import { Droplet, Siren, ListChecks, Building2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroIllustration } from "@/components/hero-illustration"

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
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,oklch(0.55_0.22_25_/_0.16),transparent)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground lg:mx-0">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
          </div>
          <HeroIllustration />
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
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
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
        <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            {t("cta.subtitle")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6"
            nativeButton={false}
            render={<Link href="/signup">{t("cta.button")}</Link>}
          />
        </div>
      </section>
    </div>
  )
}
