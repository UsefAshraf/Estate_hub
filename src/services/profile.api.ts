// services/userService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Updated to match your port

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if using cookies
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Changed from 'token' to 'accessToken'
    if (token) {
      // Remove 'Bearer ' prefix if it already exists in the token
      const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
      config.headers.Authorization = `Bearer ${cleanToken}`;
      console.log('✅ Request with accessToken:', cleanToken.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No accessToken found in localStorage');
      console.log('📋 Available keys:', Object.keys(localStorage));
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Token expired or invalid
      console.warn('Authentication failed - redirecting to login');
      localStorage.clear();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const uploadAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};