import { getTranslations } from "next-intl/server"
import { Clock, MapPin, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "./contact-form"

export default async function ContactPage() {
  const t = await getTranslations("contact")

  const points = [
    { icon: Clock, text: t("point1") },
    { icon: MapPin, text: t("point2") },
    { icon: ShieldCheck, text: t("point3") },
  ]

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-start">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <ul className="mt-8 grid gap-4">
          {points.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <span className="pt-2 text-sm text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  )
}
