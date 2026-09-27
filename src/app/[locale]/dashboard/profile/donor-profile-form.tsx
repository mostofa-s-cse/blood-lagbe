"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  BLOOD_GROUPS,
  BLOOD_GROUP_LABELS,
  donorProfileSchema,
  type DonorProfileFormInput,
} from "@/lib/validation/donor-profile"
import {
  useGetMyDonorProfileQuery,
  useSaveMyDonorProfileMutation,
} from "@/store/donors-api"

export function DonorProfileForm() {
  const t = useTranslations("profile")
  const { data: profile, isLoading } = useGetMyDonorProfileQuery()
  const [saveProfile, { isLoading: isSaving }] = useSaveMyDonorProfileMutation()

  const form = useForm<DonorProfileFormInput>({
    resolver: zodResolver(donorProfileSchema),
    defaultValues: {
      bloodGroup: "O_POS",
      location: "",
      available: true,
      lastDonationDate: null,
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        bloodGroup: profile.bloodGroup,
        location: profile.location,
        available: profile.available,
        lastDonationDate: profile.lastDonationDate
          ? profile.lastDonationDate.slice(0, 10)
          : null,
      })
    }
  }, [profile, form])

  async function onSubmit(values: DonorProfileFormInput) {
    try {
      await saveProfile(values).unwrap()
      toast.success(t("saved"))
    } catch {
      toast.error(t("saved"))
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bloodGroup")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {(value: keyof typeof BLOOD_GROUP_LABELS) =>
                        BLOOD_GROUP_LABELS[value]
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {BLOOD_GROUP_LABELS[group]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("location")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastDonationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lastDonationDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <input
                  type="checkbox"
                  className="size-4"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormLabel className="font-normal">{t("available")}</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving} className="w-fit">
          {t("save")}
        </Button>
      </form>
    </Form>
  )
}
