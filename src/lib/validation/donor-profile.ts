import { z } from "zod"

export const BLOOD_GROUPS = [
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
] as const

export const BLOOD_GROUP_LABELS: Record<(typeof BLOOD_GROUPS)[number], string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
}

export const donorProfileSchema = z.object({
  bloodGroup: z.enum(BLOOD_GROUPS),
  location: z.string().min(2).max(80),
  available: z.boolean(),
  lastDonationDate: z.string().nullable(),
})
export type DonorProfileFormInput = z.infer<typeof donorProfileSchema>
