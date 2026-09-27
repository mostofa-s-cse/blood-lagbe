import { getTranslations } from "next-intl/server"
import { Bell } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

export default async function NotificationsPage() {
  const t = await getTranslations()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{t("dashboard.notifications")}</h1>
      <EmptyState
        icon={Bell}
        title={t("dashboard.notifications")}
        description={t("common.comingSoon")}
      />
    </div>
  )
}
