import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function SiteFooter() {
  const t = useTranslations("nav")

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Blood Lagbe</p>
        <div className="flex items-center gap-4">
          <Link href="/about">{t("about")}</Link>
          <Link href="/contact">{t("contact")}</Link>
        </div>
      </div>
    </footer>
  )
}
