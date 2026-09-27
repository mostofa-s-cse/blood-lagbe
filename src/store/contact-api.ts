import { api } from "./api"
import type { ContactInput } from "@/lib/validation/contact"

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<{ ok: boolean }, ContactInput>({
      query: (body) => ({ url: "contact", method: "POST", body }),
    }),
  }),
})

export const { useSendContactMessageMutation } = contactApi
