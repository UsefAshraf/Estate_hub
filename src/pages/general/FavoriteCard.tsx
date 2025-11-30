import React from "react";
import { Heart, MapPin, Bed, Bath, Square, Trash2, Share2 } from "lucide-react";

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
  dateAdded: string;
}

interface FavoriteCardProps {
  property: Property;
  removeFavorite: (id: number) => void;
  shareProperty: (property: Property) => void;
  onPropertyClick: (id: number) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  property,
  removeFavorite,
  shareProperty,
  onPropertyClick,
}) => {
  return (
    <div className="favorite-card bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
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

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => shareProperty(property)}
            className="bg-primary cursor-pointer backdrop-blur-sm p-2 rounded-full hover:bg-primary/20 transition-colors"
            title="Share property"
          >
            <Share2 className="w-4 h-4 text-secondary" />
          </button>

          <button
            onClick={() => removeFavorite(property.id)}
            className="bg-primary cursor-pointer backdrop-blur-sm p-2 rounded-full hover:bg-red-500 transition-colors group"
            title="Remove from favorites"
          >
            <Trash2 className="w-4 h-4 text-secondary" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-primary flex-1">
            {property.title}
          </h3>
          <Heart className="w-6 h-6 fill-red-500 text-red-500 ml-2" />
        </div>

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

        <p className="text-xs text-secondary mb-4">
          Added: {new Date(property.dateAdded).toLocaleDateString()}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-custom">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${(property.price / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-secondary">{property.type}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onPropertyClick(property.id)} className="bg-accent cursor-pointer text-primary px-2 py-1 rounded-lg font-medium hover:bg-accent-hover transition-colors">
              View Details
            </button>
            <button className="border border-custom cursor-pointer text-secondary px-2 py-1 rounded-lg hover:bg-accent/20 transition-colors">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
