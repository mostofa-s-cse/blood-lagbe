import { getTranslations } from "next-intl/server"
import { ContactForm } from "./contact-form"

export default async function ContactPage() {
  const t = await getTranslations("contact")

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  )
}
