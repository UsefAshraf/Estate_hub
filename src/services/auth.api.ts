import type { SignUpRequest, SignInRequest, SignUpResponse, SignInResponse, VerifyEmailResponse,ResetPasswordRequest } from "@/types/auth.types";
import axios, { type AxiosResponse } from "axios";

const API_URL = "http://localhost:3000";

const API = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const signIn = (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> =>
    API.post("/auth/signin", data);

export const signUp = (data: SignUpRequest): Promise<AxiosResponse<SignUpResponse>> =>
    API.post("/auth/signup", data);

export const verifyEmail = (token: string): Promise<AxiosResponse<VerifyEmailResponse>> =>
    API.get(`/auth/verify-email?token=${token}`);

export const forgotPassword = (data: { email: string }) =>
  API.post("/auth/forgot-password", data);

export const verifyResetOTP = (data: { email: string; otpCode: string }) =>
  API.post("/auth/verify-reset-otp", data);

export const resetPassword = (data: ResetPasswordRequest): Promise<AxiosResponse<ResetPasswordRequest>> =>
  API.post("/auth/reset-password", {
    token: data.token,
    newPassword: data.password,         
    confirmNewPassword: data.confirmPassword, 
  });






