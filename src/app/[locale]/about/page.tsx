import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AboutPage() {
  const t = await getTranslations("about")

  const sections = [
    { titleKey: "missionTitle", bodyKey: "mission" },
    { titleKey: "problemTitle", bodyKey: "problem" },
    { titleKey: "solutionTitle", bodyKey: "solution" },
  ] as const

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">{t("intro")}</p>

      <div className="mt-8 grid gap-4">
        {sections.map((s) => (
          <Card key={s.titleKey}>
            <CardHeader>
              <CardTitle>{t(s.titleKey)}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {t(s.bodyKey)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
