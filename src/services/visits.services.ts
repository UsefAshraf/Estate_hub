import type { 
  AddVisitRequest, 
  UpdateVisitStatusRequest,
  VisitResponse, 
  VisitsResponse 
} from "@/types/visits.types";
import axios, { type AxiosResponse } from "axios";

const API_URL = "https://estatehub.duckdns.org";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
    
      if (token) {
        // config.headers.accesstoken = token; 
         config.headers.Authorization = `Bearer ${token}`;
      }
    
      return config;
    });
  
/* ================= USER VISITS ================= */

export const getUserVisits = (): Promise<AxiosResponse<VisitsResponse>> =>
  API.get("/visits/user");

export const addVisit = (data: AddVisitRequest): Promise<AxiosResponse<VisitResponse>> =>
  API.post("/visits", data);

export const updateVisitStatus = (
  visitId: string,
  data: UpdateVisitStatusRequest
): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/${visitId}/status`, data);

export const deleteVisit = (visitId: string): Promise<AxiosResponse<VisitResponse>> =>
  API.delete(`/visits/${visitId}`);

/* ================= AGENT/ADMIN VISITS ================= */

export const getAgentVisits = (): Promise<AxiosResponse<VisitsResponse>> =>
  API.get("/visits/agent");

export const updateVisitStatusByAgent = (
  visitId: string,
  data: UpdateVisitStatusRequest
): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/agent/${visitId}/status`, data);

export const cancelVisitByAgent = (visitId: string): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/agent/${visitId}/cancel`);


/* ================= ADMIN VISITS ================= */

export const getAllVisits = (): Promise<AxiosResponse<VisitsResponse>> =>
  API.get("/visits/admin/all");

export const acceptVisit = (visitId: string): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/admin/${visitId}/accept`);

export const cancelVisitByAdmin = (visitId: string): Promise<AxiosResponse<VisitResponse>> =>
  API.patch(`/visits/admin/${visitId}/cancel`);


// import axios, { type AxiosResponse } from "axios";
// import type {
//   AddVisitRequest,
//   VisitResponse,
//   VisitsResponse,
// } from "@/types/visits.types";

// const API_URL = "https://estatehub.duckdns.org";

// const API = axios.create({
//   baseURL: API_URL, 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem("accessToken");
  
//     if (token) {
//       config.headers.accesstoken = token; 
//     }
  
//     return config;
//   });


// /* ================= VISITS ================= */

// export const getUserVisits = (): Promise<AxiosResponse<VisitsResponse>> =>
//   API.get("/visits");

// export const addVisit = (
//   data: AddVisitRequest
// ): Promise<AxiosResponse<VisitResponse>> =>
//   API.post("/visits", data);

// export const updateVisitStatus = (
//   visitId: string,
//   status: string
// ): Promise<AxiosResponse<VisitResponse>> =>
//   API.patch(`/visits/${visitId}`, { status });

// export const deleteVisit = (
//   visitId: string
// ): Promise<AxiosResponse<VisitResponse>> =>
//   API.delete(`/visits/${visitId}`);
