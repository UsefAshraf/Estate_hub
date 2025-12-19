

export interface Visit {
  _id: string;
  propertyName: string;
  date: string;      // YYYY-MM-DD
  time: string;      // HH:MM
  status: "pending" | "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

export interface AddVisitRequest {
  propertyName: string;
  date: string;
  time: string;
}

export interface VisitsResponse {
  success: boolean;
  count: number;
  data: Visit[];
}

export interface VisitResponse {
  success: boolean;
  message: string;
  data: Visit;
}
