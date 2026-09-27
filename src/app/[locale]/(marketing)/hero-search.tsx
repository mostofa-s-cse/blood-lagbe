"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Search } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BLOOD_GROUPS, BLOOD_GROUP_LABELS } from "@/lib/validation/donor-profile"

export function HeroSearch() {
  const t = useTranslations("home.search")
  const router = useRouter()
  const [bloodGroup, setBloodGroup] = useState<string>("any")
  const [location, setLocation] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (bloodGroup !== "any") params.set("bloodGroup", bloodGroup)
    if (location.trim()) params.set("location", location.trim())
    router.push(`/donors/search${params.size ? `?${params}` : ""}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-xl border bg-card p-2 shadow-sm sm:flex-row sm:items-center"
    >
      <Select
        value={bloodGroup}
        onValueChange={(value) => setBloodGroup(value ?? "any")}
      >
        <SelectTrigger className="w-full border-none shadow-none sm:w-36">
          <SelectValue>
            {(value: string) =>
              value === "any"
                ? t("anyBloodGroup")
                : BLOOD_GROUP_LABELS[value as keyof typeof BLOOD_GROUP_LABELS]
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">{t("anyBloodGroup")}</SelectItem>
          {BLOOD_GROUPS.map((group) => (
            <SelectItem key={group} value={group}>
              {BLOOD_GROUP_LABELS[group]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="hidden h-6 w-px bg-border sm:block" />
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder={t("locationPlaceholder")}
        className="border-none shadow-none focus-visible:ring-0"
      />
      <Button type="submit" className="sm:shrink-0">
        <Search className="size-4" />
        {t("button")}
      </Button>
    </form>
  )
}
