import { getTranslations } from "next-intl/server"
import { Compass, TriangleAlert, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AboutPage() {
  const t = await getTranslations("about")

  const sections = [
    { titleKey: "missionTitle", bodyKey: "mission", icon: Compass },
    { titleKey: "problemTitle", bodyKey: "problem", icon: TriangleAlert },
    { titleKey: "solutionTitle", bodyKey: "solution", icon: Lightbulb },
  ] as const

  return (
    <div>
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,oklch(0.55_0.22_25_/_0.14),transparent)]"
        />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("intro")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {sections.map((s) => (
            <Card key={s.titleKey}>
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <s.icon className="size-6" />
                </div>
                <CardTitle>{t(s.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {t(s.bodyKey)}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
