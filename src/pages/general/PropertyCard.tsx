import React from "react";
import { MapPin, Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  priceType: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  tags: string[];
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  price,
  priceType,
  address,
  beds,
  baths,
  sqft,
  tags,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-xs font-semibold rounded ${
                tag === "FEATURED"
                  ? "bg-accent text-primary"
                  : tag === "FOR SALE"
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>

          <span className="text-xl font-bold text-red-500">
            {price}
            {priceType === "rent" && (
              <span className="text-sm text-secondary">/month</span>
            )}
          </span>
        </div>

        <p className="text-secondary text-sm mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {address}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-secondary border-t border-custom pt-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{beds} Beds</span>
          </div>

          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths} Baths</span>
          </div>

          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
