import { getTranslations } from "next-intl/server"
import { ListChecks } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

export default async function RequestsPage() {
  const t = await getTranslations()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{t("dashboard.requests")}</h1>
      <EmptyState
        icon={ListChecks}
        title={t("dashboard.requests")}
        description={t("common.comingSoon")}
      />
    </div>
  )
}
