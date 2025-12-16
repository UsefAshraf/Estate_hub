export interface SignUpRequest {
    userName: string;
    email: string;
    phone:string;
    password: string;
    confirmPassword:string;
    role:"buyer" | "seller";
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    userName: string;
    email: string;
    phone?: string;
    role: "buyer" | "seller" | "admin";
    isVerified: boolean;
}

export interface SignUpResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface SignInResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}


export interface VerifyEmailResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}
export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}