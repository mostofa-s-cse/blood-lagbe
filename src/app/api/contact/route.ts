import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validation/contact"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  console.log("Contact message received:", parsed.data)

  return NextResponse.json({ ok: true })
}
