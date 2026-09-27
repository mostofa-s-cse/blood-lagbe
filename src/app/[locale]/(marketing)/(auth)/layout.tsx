import { getTranslations } from "next-intl/server"
import { CheckCircle2, Droplet } from "lucide-react"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations("auth.panel")
  const points = [t("point1"), t("point2"), t("point3")]

  return (
    <div className="grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary px-10 py-16 text-primary-foreground lg:flex lg:flex-col lg:justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_0%,oklch(1_0_0_/_0.12),transparent)]"
        />
        <Droplet className="size-10 fill-current" />
        <h2 className="mt-6 max-w-sm text-3xl font-bold text-balance">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-sm text-primary-foreground/85">
          {t("subtitle")}
        </p>
        <ul className="mt-8 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
