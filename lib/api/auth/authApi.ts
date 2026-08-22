import { SendOtpRequest, SendOtpResponse, UpdateProfileRequest, UserProfileResponse, VerifyOtpRequest, VerifyOtpResponse } from "@/types/user";
import { baseApi } from "../baseApi";
import { BaseNextResponse } from "next/dist/server/base-http";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
            query: (data) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body: data,
            })
        }),
        verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Auth", "User"]
        }),
        getProfile: builder.query<UserProfileResponse, void>({
            query: () => ({
                url: '/auth/profile',
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        updateProfile: builder.mutation<UserProfileResponse, UpdateProfileRequest>({
            query: (data) => ({
                url: '/auth/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
        logout: builder.mutation<BaseNextResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ["Auth", "User"]
        })
    })
})

export const { useSendOtpMutation, useVerifyOtpMutation, useGetProfileQuery, useUpdateProfileMutation, useLogoutMutation } = authApi;