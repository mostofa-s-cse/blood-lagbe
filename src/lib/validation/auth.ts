import { z } from "zod"
import { SIGNUP_ROLES } from "@/lib/roles"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})
export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(6).max(20),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(SIGNUP_ROLES),
})
export type SignupInput = z.infer<typeof signupSchema>
