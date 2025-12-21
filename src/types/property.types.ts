export type PropertyStatus = "rent" | "sale";

export type PropertyType =
  | "villa"
  | "apartment"
  | "house"
  | "condo"
  | "townhouse"
  | "land";

/* ---------- Feature ---------- */
export interface PropertyFeature {
  name: string;
}

/* ---------- Property Model ---------- */
export interface Property {
  _id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  price: number;
  priceNote?: string;
  address: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  images: string[];
  features: PropertyFeature[];
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------- Filters ---------- */
export interface PropertyFilters {
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
}

/* ---------- Requests ---------- */
export interface CreatePropertyRequest {
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  featured?: boolean;
  price: number;
  priceNote?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  images: File[];
  features: PropertyFeature[];
  agentId: string;
}

export type UpdatePropertyRequest = Partial<CreatePropertyRequest>;

/* ---------- API Responses ---------- */
export interface PropertyResponse {
  success: boolean;
  data: Property;
  message?: string;
}

export interface PropertiesResponse {
  success: boolean;
  data: Property[];
}
