"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { LogOut } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { createClient } from "@/lib/supabase/client"

export function DashboardTopbarActions() {
  const t = useTranslations("nav")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-2">
      <LocaleSwitcher />
      <Button
        variant="outline"
        size="sm"
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
        <LogOut className="size-4" />
        {t("logout")}
      </Button>
    </div>
  )
}
