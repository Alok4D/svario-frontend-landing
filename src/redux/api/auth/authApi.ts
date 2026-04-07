import {
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  ILoginPayload,
  ILoginResponse,
  IResendOTPBaseResponse,
  IResendOTPReqBody,
  IResetPasswordPayload,
  IResetPasswordResponse,
  IVerifyOTPPayload,
  IVerifyOTPResponse,
} from "@/types/global";
import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordPayload
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    // resetPassword: builder.mutation<
    //   IResetPasswordResponse,
    //   IResetPasswordPayload
    // >({
    //   query: (body) => ({
    //     url: "/auth/reset-password",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordPayload
    >({
      query: ({ newPassword, confirmPassword, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { newPassword, confirmPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resendOtp: builder.mutation<IResendOTPBaseResponse, IResendOTPReqBody>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<IVerifyOTPResponse, IVerifyOTPPayload>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // auth/resend-otp-signup - REGISTER AS CUSTOMER (FIND-SUPPORT)
    sendOtpSignup: builder.mutation<IResendOTPBaseResponse, IResendOTPReqBody>({
      query: (body) => ({
        url: "/users/register/customer",
        method: "POST",
        body,
      }),
    }),

    // auth/verify-otp-signup - REGISTER AS STUFF (PROVIDE-SUPPORT)
    verifyOtpSignupForStaff: builder.mutation({
      query: (body) => ({
        url: "/users/register/stuff",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useSendOtpSignupMutation,
  useVerifyOtpSignupForStaffMutation,
} = authApi;
