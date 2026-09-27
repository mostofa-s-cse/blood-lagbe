export const ROLES = ["DONOR", "SEEKER", "ORG", "ADMIN"] as const
export type Role = (typeof ROLES)[number]

export const SIGNUP_ROLES = ["DONOR", "SEEKER", "ORG"] as const satisfies readonly Role[]
