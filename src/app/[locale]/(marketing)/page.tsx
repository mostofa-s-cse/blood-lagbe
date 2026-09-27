import { getTranslations } from "next-intl/server"
import {
  Droplet,
  Siren,
  ListChecks,
  Building2,
  UserPlus,
  Search,
  HandHeart,
  HeartPulse,
  ShieldCheck,
  Users,
  Apple,
  GlassWater,
  Ban,
  BedDouble,
} from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroIllustration } from "@/components/hero-illustration"
import { HeroSearch } from "./hero-search"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const t = await getTranslations("home")
  const tRoles = await getTranslations("roles")

  const [donorCount, requestsFulfilled, orgCount] = await Promise.all([
    prisma.donorProfile.count(),
    prisma.bloodRequest.count({ where: { status: "COMPLETED" } }),
    prisma.organization.count({ where: { verified: true } }),
  ])

  const features = [
    { icon: Droplet, key: "search" as const },
    { icon: Siren, key: "emergency" as const },
    { icon: ListChecks, key: "tracking" as const },
    { icon: Building2, key: "org" as const },
  ]

  const steps = [
    { icon: UserPlus, key: "step1" as const },
    { icon: Search, key: "step2" as const },
    { icon: HandHeart, key: "step3" as const },
  ]

  const audiences = [
    { role: "DONOR" as const, icon: Droplet, key: "donor" as const },
    { role: "SEEKER" as const, icon: HeartPulse, key: "seeker" as const },
    { role: "ORG" as const, icon: Building2, key: "org" as const },
    { role: "ADMIN" as const, icon: ShieldCheck, key: "admin" as const },
  ]

  const stats = [
    { key: "donors" as const, value: donorCount, icon: Users, tint: "oklch(0.7 0.16 20 / 0.14)" },
    { key: "requests" as const, value: requestsFulfilled, icon: ListChecks, tint: "oklch(0.75 0.14 40 / 0.16)" },
    { key: "organizations" as const, value: orgCount, icon: Building2, tint: "oklch(0.65 0.15 10 / 0.14)" },
  ]

  const tips = [
    { icon: Apple, key: "tip1" as const },
    { icon: GlassWater, key: "tip2" as const },
    { icon: Ban, key: "tip3" as const },
    { icon: BedDouble, key: "tip4" as const },
  ]

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,oklch(0.7_0.14_20_/_0.22),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-[oklch(0.55_0.22_25_/_0.08)] blur-2xl"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-16 sm:pt-20 lg:grid-cols-2 lg:pt-28">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl sm:leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 max-w-xl lg:mx-0">
              <HeroSearch />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/signup">{t("hero.ctaJoin")}</Link>}
              />
            </div>
          </div>
          <HeroIllustration />
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-4 pb-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="flex items-center gap-4 rounded-xl border p-5 shadow-sm"
                style={{ backgroundColor: stat.tint }}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                  <stat.icon className="size-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value.toLocaleString()}+
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    {t(`stats.${stat.key}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold">
            {t("howItWorks.title")}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ icon: Icon, key }, index) => (
              <div key={key} className="relative text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <Icon className="mx-auto mt-4 size-6 text-primary" />
                <h3 className="mt-2 font-semibold">
                  {t(`howItWorks.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`howItWorks.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-[oklch(0.7_0.1_20_/_0.12)] p-8 sm:p-12">
            <h2 className="text-center text-2xl font-semibold">
              {t("tips.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
              {t("tips.subtitle")}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tips.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="rounded-xl bg-card p-5 text-center shadow-sm"
                >
                  <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">
                    {t(`tips.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t(`tips.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
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

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold">
            {t("forWhom.title")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ role, icon: Icon, key }) => (
              <Card key={role}>
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-base">{tRoles(role)}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {t(`forWhom.${key}`)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-10 size-40 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-10 size-48 rounded-full bg-white/10"
          />
          <h2 className="text-2xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {t("cta.title")}
          </h2>
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
