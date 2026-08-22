import { z } from "zod"

// User Avatar Schema
export const userAvatarSchema = z.object({
    public_id: z.string(),
    url: z.string().url("Invalid avatar URL"),
})

// User Schema
export const userSchema = z.object({
    _id: z.string(),
    email: z.string().email("Invalid email address"),
    fname: z.string().optional(),
    lname: z.string().optional(),
    avatar: userAvatarSchema.optional(),
    provider: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

// Send OTP Request Schema
export const sendOtpSchema = z.object({
    email: z.email("Please enter a valid email address"),
})

// Send OTP Response Schema
export const sendOtpResponseSchema = z.object({
    message: z.string(),
})

// Verify OTP Request Schema
export const verifyOtpSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
})

// Verify OTP Response Schema
export const verifyOtpResponseSchema = z.object({
    message: z.string(),
    redirectToProfileUpdate: z.boolean(),
    data: z.object({
        access_token: z.string(),
        refresh_token: z.string(),
        isProfileComplete: z.boolean(),
        user: userSchema,
    }),
})

// User Profile Response Schema
export const userProfileResponseSchema = z.object({
    message: z.string(),
    data: userSchema,
})

// Update Profile Request Schema
export const updateProfileSchema = z.object({
    fname: z.string().trim().min(1, "First name cannot be empty").optional(),
    lname: z.string().trim().min(1, "Last name cannot be empty").optional(),
    bio: z.string().trim().min(1, "Bio cannot be empty").optional(),
    avatar: (typeof File !== "undefined" ? z.instanceof(File) : z.any()).optional(),
})

// Inferred TypeScript Types from Zod Schemas
export type UserAvatar = z.infer<typeof userAvatarSchema>
export type User = z.infer<typeof userSchema>
export type SendOtpRequest = z.infer<typeof sendOtpSchema>
export type SendOtpResponse = z.infer<typeof sendOtpResponseSchema>
export type VerifyOtpRequest = z.infer<typeof verifyOtpSchema>
export type VerifyOtpResponse = z.infer<typeof verifyOtpResponseSchema>
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>
export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>
