import axios from "axios";

// Adjust this URL to match your backend server port if different
const API_URL = "http://localhost:3000/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData: any) => {
    // 1. Update URL to match backend route (usually /auth/signup)
    const response = await api.post("/signup", userData);

    // 2. Check for user object or status 201 (Backend doesn't send 'success: true')
    if (response.data && response.data.user) {
      // 3. Store user and tokens correctly based on backend response structure
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accesstoken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    
    return response.data;
  },


  login: async (userData: any) => {
    // 1. Update URL to include the '/auth' prefix
    const response = await api.post("/signin", userData);

    // 2. Check for the user object directly (Backend doesn't return 'success: true')
    if (response.data && response.data.user) {
      // 3. Store user AND tokens
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accesstoken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    
    return response.data;
},

  logout: () => {
    localStorage.removeItem("user");
  },

  forgotPassword: async (email: string) => {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post("/verify-otp", { email, otp });
    return response.data;
  },

  resetPassword: async (data: any) => {
    const response = await api.post("/reset-password", data);
    return response.data;
  },
};