import type { SignUpRequest, SignInRequest, SignUpResponse, SignInResponse, VerifyEmailResponse, ResetPasswordRequest } from "@/types/auth.types";
import axios, { type AxiosResponse } from "axios";

const API_URL = "http://localhost:3000";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically for authenticated requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.accessToken = token;
  }
  return config;
});

/* ---------- Auth APIs ---------- */

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

/* ---------- User Management APIs ---------- */

export interface UsersResponse {
  success: boolean;
  message?: string;
  data: Array<{
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    avatar?: string;
    role: string;
    isVerified?: boolean;
    createdAt?: string;
  }>;
  count: number;
  total: number;
  page: number;
  pages: number;
}

export interface UserDeleteResponse {
  success: boolean;
  message: string;
}

// Get all users (admin only)
export const getAllUsers = (): Promise<AxiosResponse<UsersResponse>> =>
  API.get("/api/users");

// Delete a user by ID (admin only)
export const deleteUser = (userId: string): Promise<AxiosResponse<UserDeleteResponse>> =>
  API.delete(`/api/users/${userId}`);

// Register/Create a new user (for AddUser page)
export const register = (data: {
  userName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  purpose: string;
  role: string;
}): Promise<AxiosResponse<SignUpResponse>> =>
  API.post("/auth/signup", data);

/* ---------- Auth Service Object (for component imports) ---------- */

export const authService = {
  signIn,
  signUp,
  verifyEmail,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getAllUsers,
  deleteUser,
  register,
};






