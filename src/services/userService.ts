import axios from "axios";

// Define the User interface
export interface User {
  _id: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  createdAt: string;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: User[];
}

// NOTE: If you are NOT using a Proxy in vite.config.ts, change this to your full backend URL 
// e.g., "http://localhost:5000/api/users"
const API_URL = "/api/users"; 

export const userService = {
  getUserProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
    return response.data;
  },

  updateUserProfile: async (data: Partial<User>) => {
    const response = await axios.put(`${API_URL}/profile`, data, { withCredentials: true });
    return response.data;
  },

  uploadAvatar: async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/avatar`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Adjusted to use params object which is cleaner and safer
  getAllUsers: async (page: number = 1, limit: number = 10, search: string = '', role: string = ''): Promise<UsersResponse> => {
    try {
      const response = await axios.get(API_URL, {
        params: { page, limit, search, role },
        withCredentials: true,
      });
      
      // Debug: Log what Axios received
      console.log("UserService received:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("UserService error:", error);
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    const response = await axios.delete(`${API_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },
};