import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    userRegistration: build.mutation({
      query: (registrationData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getMyProfile: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useGetMyProfileQuery,
} = authApi;
