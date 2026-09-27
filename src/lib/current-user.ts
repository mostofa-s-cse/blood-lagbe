import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export async function getCurrentAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentUser() {
  const authUser = await getCurrentAuthUser()
  if (!authUser) return null
  return prisma.user.findUnique({ where: { id: authUser.id } })
}
