export interface UserAvatar {
    public_id: string;
    url: string;
}

export interface User {
    _id: string;
    email: string;
    fname?: string;
    lname?: string;
    avatar?: UserAvatar;
    provider?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SendOtpRequest {
    email: string;
}

export interface SendOtpResponse {
    message: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpResponse {
    message: string;
    redirectToProfileUpdate: boolean;
    data: {
        access_token: string;
        refresh_token: string;
        isProfileComplete: boolean;
        user: User;
    };
}

export interface UserProfileResponse {
    message: string;
    data: User;
}

export interface UpdateProfileRequest {
    fname?: string;
    lname?: string;
    bio?: string;
    avatar?: File;
}