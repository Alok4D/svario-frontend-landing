import { LANGUAGE_OPTIONS } from "@/components/dashboard/pages/Profile/StaffProfile";
import baseApi from "../baseApi";
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

export interface Address {
  state: string;
  city: string;
  country: string;
  postCode?: string;
}

export interface StaffDetails {
  id: string;
  serviceCategory: string[];
  bio: string;
  experienceYears: number;
  expertise: string[];
  languages: LanguageOption[];
  qualification: string | null;
  certifications: string[];
  dayOfWeek: string[];
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: Address[];
    _count: {
      bookings: number;
    };
    staff: StaffDetails;
  };
}
const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProfile: builder.query<IUserProfileResponse,void>({

    getProfile: builder.query<UserProfileResponse, void>({
      query: () => "/staff/profile",
      providesTags: ["User"],
    }),
    
    updateProfile: builder.mutation<UserProfileResponse, FormData>({
      query: (formData) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
