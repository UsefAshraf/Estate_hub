import axios, { type AxiosResponse } from "axios";
import type {
  AddFavoriteRequest,
  FavoritesResponse,
  FavoriteResponse,
} from "../types/favourites.types.ts";

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
    // config.headers.accesstoken = token;

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= FAVORITES ================= */

export const getUserFavorites = (): Promise<
  AxiosResponse<FavoritesResponse>
> => API.get("/favorites");

export const addFavorite = (
  data: AddFavoriteRequest
): Promise<AxiosResponse<FavoriteResponse>> =>
  API.post("/favorites/add", data);

export const removeFavorite = (
  propertyId: string
): Promise<AxiosResponse<FavoriteResponse>> =>
  API.delete(`/favorites/${propertyId}`);
