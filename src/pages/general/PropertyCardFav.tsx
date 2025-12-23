import React from "react";
import { MapPin, Bed, Square, Heart } from "lucide-react";
import type { Property } from "@/types/property.types";

// Bath icon component
const Bath: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 2.5V10h15V6a1.5 1.5 0 0 0-1-2.5L17 6" />
    <path d="M22 10v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5" />
    <path d="M4 15v3" />
    <path d="M20 15v3" />
  </svg>
);

interface Props {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const PropertyCardFav: React.FC<Props> = ({ 
  property, 
  isFavorite, 
  onToggleFavorite,
  onClick 
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
      return `$${(price / 1_000_000).toFixed(2)}M`;
    } else if (price >= 1_000) {
      return `$${(price / 1_000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const mainImage = property.images[0] || "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400";

  return (
    <div className="bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-linear-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Status and Featured Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.status === "sale" && (
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              For Sale
            </div>
          )}
          {property.status === "rent" && (
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              For Rent
            </div>
          )}
          {property.featured && (
            <div className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-colors hover:bg-primary/20"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>

        {/* Location Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{property.address}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-4 line-clamp-2">
          {property.title}
        </h3>

        {/* Property Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-secondary">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="w-4 h-4" />
            <span>{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-custom">
          <div>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
              {property.status === "rent" && (
                <span className="text-sm text-secondary font-normal">/mo</span>
              )}
            </p>
            <p className="text-xs text-secondary capitalize">
              {property.type}
              {property.priceNote && ` • ${property.priceNote}`}
            </p>
          </div>
          <button 
            onClick={onClick} 
            className="bg-accent text-primary cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardFav;