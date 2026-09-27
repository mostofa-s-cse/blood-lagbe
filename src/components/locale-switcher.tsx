"use client"

import { useLocale } from "next-intl"
import { useParams } from "next/navigation"
import { usePathname, useRouter } from "@/i18n/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  return (
    <Select
      value={locale}
      onValueChange={(next) => {
        router.replace(
          // @ts-expect-error -- dynamic route params, next-intl handles typing
          { pathname, params },
          { locale: next }
        )
      }}
    >
      <SelectTrigger size="sm" className="w-[84px]">
        <SelectValue>
          {(value: string) => (value === "bn" ? "বাংলা" : "English")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bn">বাংলা</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}
