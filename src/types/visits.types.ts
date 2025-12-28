// visits.types.ts - Following the same pattern as auth.types.ts

export interface Visit {
  _id: string;
  userId: string | {
    _id: string;
    userName: string;
    email: string;
    phone: string;
  };
  agentId: string | {
    _id: string;
    userName: string;
    email: string;
    phone: string;
  };
  propertyId: string | {
    _id: string;
    title: string;
    address: string;
    images: string[];
  };
  propertyName: string;
  date: string;
  time: string;
  status: "pending" | "upcoming" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface AddVisitRequest {
  propertyId: string;
  propertyName: string;
  date: string;
  time: string;
}

export interface UpdateVisitStatusRequest {
  status: "pending" | "upcoming" | "completed" | "cancelled";
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

// export interface Visit {
//   _id: string; 
//   propertyName: string;
//   date: string;      // YYYY-MM-DD
//   time: string;      // HH:MM
//   status: "pending" | "upcoming" | "completed" | "cancelled";
//   createdAt: string;
// }

// export interface AddVisitRequest {
//   propertyName: string;
//   date: string;
//   time: string;
// }

// export interface VisitsResponse {
//   success: boolean;
//   count: number;
//   data: Visit[];
// }

// export interface VisitResponse {
//   success: boolean;
//   message: string;
//   data: Visit;
// }
