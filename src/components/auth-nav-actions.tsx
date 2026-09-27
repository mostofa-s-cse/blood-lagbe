"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { Link, useRouter } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Role } from "@/lib/roles"

export function AuthNavActions({
  isAuthenticated,
  role,
}: {
  isAuthenticated: boolean
  role?: Role
}) {
  const t = useTranslations("nav")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/login">{t("login")}</Link>}
        />
        <Button nativeButton={false} render={<Link href="/signup">{t("signup")}</Link>} />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {role === "ADMIN" && (
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/admin">{t("admin")}</Link>}
        />
      )}
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/dashboard">{t("dashboard")}</Link>}
      />
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push("/")
            router.refresh()
          })
        }}
      >
        {t("logout")}
      </Button>
    </div>
  )
}
