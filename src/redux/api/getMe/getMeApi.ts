import baseApi from "../baseApi";

const getMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/users/my-profile",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = getMeApi;
