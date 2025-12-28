// src/services/property.api.ts

import axios, { type AxiosResponse } from "axios";
import type {
  Property,
  PropertyFilters,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyResponse,
  PropertiesResponse,
} from "@/types/property.types";

const API_URL = "http://localhost:3000";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
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
  API.get("/api/properties", {
     params: filters,
     headers: { accessToken: localStorage.getItem("accessToken") }
    });

export const getPropertyById = (
  id: string
): Promise<AxiosResponse<PropertyResponse>> =>
  API.get(`/api/properties/${id}`,{
   //headers: { accessToken: localStorage.getItem("accessToken") }
  });

export const createProperty = (
  data: CreatePropertyRequest
): Promise<AxiosResponse<PropertyResponse>> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("type", data.type);
  formData.append("status", data.status);
  formData.append("price", String(data.price));
  formData.append("address", data.address);
  formData.append("bedrooms", String(data.bedrooms));
  formData.append("bathrooms", String(data.bathrooms));
  formData.append("area", String(data.area));
  formData.append("builtYear", String(data.builtYear));
  formData.append("agentId", data.agentId);

  if (data.featured !== undefined) {
    formData.append("featured", String(data.featured));
  }

  if (data.priceNote) {
    formData.append("priceNote", data.priceNote);
  }

  // features → backend expects [{ name }]
  data.features.forEach((feature, index) => {
    formData.append(`features[${index}][name]`, feature.name);
  });

  // images
  data.images.forEach((file) => {
    formData.append("images", file);
  });
    const token = localStorage.getItem("accessToken");

  return API.post("/api/properties", formData, {
    headers: { "Content-Type": "multipart/form-data",  "accessToken": token},
  });
};

export const updateProperty = (
  id: string,
  data: UpdatePropertyRequest
): Promise<AxiosResponse<PropertyResponse>> => {
  // Get token
  const token = localStorage.getItem("accessToken");
  
  // Check if we have images to upload
  const hasImages = data.images && data.images.length > 0;

  if (hasImages) {
    // If images are included, use FormData
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && value) {
        (value as File[]).forEach((file) =>
          formData.append("images", file)
        );
      } else if (key === "features" && value) {
        (value as any[]).forEach((f, i) => {
          const featureName = typeof f === 'string' ? f : f.name;
          formData.append(`features[${i}][name]`, featureName);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return API.put(`/api/properties/${id}`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
        "accessToken": token || "",
      },
    });
  } else {
    // If no images, send as JSON (simpler and faster)
    const updateData: any = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === "features" && value) {
        // Format features properly
        updateData.features = (value as any[]).map((f) => 
          typeof f === 'string' ? f : f.name
        );
      } else if (key !== "images" && value !== undefined && value !== null) {
        updateData[key] = value;
      }
    });

    console.log("Sending PUT request to:", `/api/properties/${id}`);
    console.log("With data:", updateData);
    console.log("With token:", token);

    return API.put(`/api/properties/${id}`, updateData, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "accessToken": token || "",
      },
    });
  }
};

export const deleteProperty = (
  id: string
): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
  API.delete(`/api/properties/${id}`,{
    headers: { accessToken: localStorage.getItem("accessToken") }
  });


export const getSoldProperties = (): Promise<AxiosResponse<PropertiesResponse>> =>
  API.get("/api/properties/sold");