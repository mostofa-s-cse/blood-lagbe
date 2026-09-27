import { getTranslations } from "next-intl/server"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/empty-state"
import { BLOOD_GROUP_LABELS } from "@/lib/validation/donor-profile"

export default async function DonorSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ bloodGroup?: string; location?: string }>
}) {
  const t = await getTranslations()
  const { bloodGroup, location } = await searchParams

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">{t("nav.search")}</h1>

      {(bloodGroup || location) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {bloodGroup && (
            <Badge variant="secondary">
              {BLOOD_GROUP_LABELS[bloodGroup as keyof typeof BLOOD_GROUP_LABELS] ??
                bloodGroup}
            </Badge>
          )}
          {location && <Badge variant="secondary">{location}</Badge>}
        </div>
      )}

      <EmptyState
        icon={Search}
        title={t("nav.search")}
        description={t("common.comingSoon")}
      />
    </div>
  )
}
