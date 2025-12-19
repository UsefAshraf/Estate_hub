// src/types/favorites.types.ts

export interface Property {
  _id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  featured: boolean;
}

export interface Favorite {
  _id: string;
  propertyId: Property;   // populated property
  dateAdded: string;
  createdAt: string;
}

export interface AddFavoriteRequest {
  propertyId: string;
}

export interface FavoritesResponse {
  success: boolean;
  count: number;
  data: Favorite[];
}

export interface FavoriteResponse {
  success: boolean;
  message: string;
  data: Favorite;
}
