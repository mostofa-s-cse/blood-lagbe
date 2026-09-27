import { api } from "./api"

export type BloodGroup =
  | "A_POS"
  | "A_NEG"
  | "B_POS"
  | "B_NEG"
  | "AB_POS"
  | "AB_NEG"
  | "O_POS"
  | "O_NEG"

export type DonorProfile = {
  id: string
  userId: string
  bloodGroup: BloodGroup
  location: string
  available: boolean
  lastDonationDate: string | null
  donationCount: number
  user: { name: string; phone: string | null }
}

export type DonorProfileInput = {
  bloodGroup: BloodGroup
  location: string
  available: boolean
  lastDonationDate: string | null
}

export type DonorSearchParams = {
  bloodGroup?: BloodGroup
  location?: string
}

export const donorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyDonorProfile: builder.query<DonorProfile | null, void>({
      query: () => "donors/me",
      providesTags: ["DonorProfile"],
    }),
    saveMyDonorProfile: builder.mutation<DonorProfile, DonorProfileInput>({
      query: (body) => ({ url: "donors/me", method: "PUT", body }),
      invalidatesTags: ["DonorProfile"],
    }),
    searchDonors: builder.query<DonorProfile[], DonorSearchParams>({
      query: (params) => ({ url: "donors", params }),
      providesTags: ["DonorProfile"],
    }),
  }),
})

export const {
  useGetMyDonorProfileQuery,
  useSaveMyDonorProfileMutation,
  useSearchDonorsQuery,
} = donorsApi
