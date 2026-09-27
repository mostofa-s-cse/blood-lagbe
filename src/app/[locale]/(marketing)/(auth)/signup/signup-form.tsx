"use client"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { useRouter } from "@/i18n/navigation"
import { createClient } from "@/lib/supabase/client"
import { signupSchema, type SignupInput } from "@/lib/validation/auth"
import { SIGNUP_ROLES } from "@/lib/roles"

export function SignupForm() {
  const t = useTranslations("auth.signup")
  const router = useRouter()

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", phone: "", email: "", password: "", role: "DONOR" },
  })

  function roleLabel(role: string) {
    return t(`role${role === "DONOR" ? "Donor" : role === "SEEKER" ? "Seeker" : "Org"}`)
  }

  async function onSubmit(values: SignupInput) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { name: values.name, phone: values.phone, role: values.role },
      },
    })

    if (error) {
      toast.error(t("error"))
      return
    }

    if (!data.session) {
      toast.success(t("subtitle"))
      router.push("/login")
      return
    }

    await fetch("/api/auth/sync-user", { method: "POST" })
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("role")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue>{(value: string) => roleLabel(value)}</SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SIGNUP_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {roleLabel(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  )
}
