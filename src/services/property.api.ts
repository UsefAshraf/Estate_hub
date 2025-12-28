import axios, { type AxiosResponse } from "axios";
import type {
  PropertyFilters,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyResponse,
  PropertiesResponse,
} from "@/types/property.types";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

/* ---------- Attach token globally ---------- */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- Property APIs ---------- */

export const getAllProperties = (
  filters?: PropertyFilters
): Promise<AxiosResponse<PropertiesResponse>> =>
  API.get("/api/properties", { params: filters });

export const getPropertyById = (
  id: string
): Promise<AxiosResponse<PropertyResponse>> =>
  API.get(`/api/properties/${id}`);

export const createProperty = (
  data: CreatePropertyRequest
): Promise<AxiosResponse<PropertyResponse>> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images") {
      value.forEach((file: File) => formData.append("images", file));
    } else if (key === "features") {
      value.forEach((f: any, i: number) =>
        formData.append(`features[${i}][name]`, f.name)
      );
    } else if (value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return API.post("/api/properties", formData);
};

export const updateProperty = (
  id: string,
  data: UpdatePropertyRequest
): Promise<AxiosResponse<PropertyResponse>> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images") {
      value?.forEach((file: File) => formData.append("images", file));
    } else if (key === "features") {
      value?.forEach((f: any, i: number) =>
        formData.append(`features[${i}][name]`, f.name)
      );
    } else if (value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return API.put(`/api/properties/${id}`, formData);
};

export const deleteProperty = (
  id: string
): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
  API.delete(`/api/properties/${id}`);
