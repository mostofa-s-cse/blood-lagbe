import { getTranslations } from "next-intl/server"
import { LayoutDashboard } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

export default async function AdminPage() {
  const t = await getTranslations()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{t("nav.admin")}</h1>
      <EmptyState
        icon={LayoutDashboard}
        title={t("nav.admin")}
        description={t("common.comingSoon")}
      />
    </div>
  )
}
