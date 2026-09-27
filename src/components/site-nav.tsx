import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getCurrentAuthUser } from "@/lib/current-user"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { AuthNavActions } from "@/components/auth-nav-actions"
import type { Role } from "@/lib/roles"

export async function SiteNav() {
  const t = await getTranslations("nav")
  const user = await getCurrentAuthUser()
  const role = user?.user_metadata?.role as Role | undefined

  return (
    <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-primary">
          Blood Lagbe
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <AuthNavActions isAuthenticated={!!user} role={role} />
        </div>
      </div>
    </header>
  )
}
