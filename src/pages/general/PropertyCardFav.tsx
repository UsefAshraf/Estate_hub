import React from "react";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  featured: boolean;
}

interface Props {
  property: Property;
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

const PropertyCardFav: React.FC<Props> = ({ property, favorites, toggleFavorite }) => {
  return (
    <div className="bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-linear-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {property.featured && (
          <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              favorites.has(property.id)
                ? "fill-red-500 text-red-500"
                : "text-secondary"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-linear-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-4">{property.title}</h3>

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
            <span>{property.sqft.toLocaleString()} sq ft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-custom">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${(property.price / 1_000_000).toFixed(2)}M
            </p>
            <p className="text-xs text-secondary">{property.type}</p>
          </div>
          <button className="bg-accent text-primary cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardFav;
