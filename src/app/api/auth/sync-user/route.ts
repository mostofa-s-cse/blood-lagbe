import { NextResponse } from "next/server"
import { getCurrentAuthUser } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"
import { ROLES, type Role } from "@/lib/roles"

export async function POST() {
  const authUser = await getCurrentAuthUser()
  if (!authUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const metadata = authUser.user_metadata as {
    name?: string
    phone?: string
    role?: string
  }
  const role: Role = ROLES.includes(metadata.role as Role)
    ? (metadata.role as Role)
    : "SEEKER"

  const user = await prisma.user.upsert({
    where: { id: authUser.id },
    update: { email: authUser.email! },
    create: {
      id: authUser.id,
      email: authUser.email!,
      name: metadata.name ?? authUser.email!,
      phone: metadata.phone,
      role,
    },
  })

  return NextResponse.json(user)
}
