import axios, { type AxiosResponse } from "axios";
import type {
  AddVisitRequest,
  VisitResponse,
  VisitsResponse,
} from "@/types/visits.types";

const API_URL = "http://localhost:3000";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
  
    if (token) {
      config.headers.accesstoken = token; 
    }
  
    return config;
  });


/* ================= VISITS ================= */

export const getUserVisits = (): Promise<AxiosResponse<VisitsResponse>> =>
  API.get("/visits");

export const addVisit = (
  data: AddVisitRequest
): Promise<AxiosResponse<VisitResponse>> =>
  API.post("/visits", data);

export const updateVisitStatus = (
  visitId: string,
  status: string
): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/${visitId}`, { status });

export const deleteVisit = (
  visitId: string
): Promise<AxiosResponse<VisitResponse>> =>
  API.delete(`/visits/${visitId}`);
