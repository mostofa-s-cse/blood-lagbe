import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"
import { donorProfileSchema } from "@/lib/validation/donor-profile"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const profile = await prisma.donorProfile.findUnique({
    where: { userId: user.id },
    include: { user: { select: { name: true, phone: true } } },
  })

  return NextResponse.json(profile)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const parsed = donorProfileSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { bloodGroup, location, available, lastDonationDate } = parsed.data

  const profile = await prisma.donorProfile.upsert({
    where: { userId: user.id },
    update: {
      bloodGroup,
      location,
      available,
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
    },
    create: {
      userId: user.id,
      bloodGroup,
      location,
      available,
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
    },
    include: { user: { select: { name: true, phone: true } } },
  })

  return NextResponse.json(profile)
}
