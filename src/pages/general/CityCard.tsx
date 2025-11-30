import React from "react";

interface CityCardProps {
  name: string;
  image: string;
  properties: number;
  onClick: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ name, image, properties, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-secondary rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-primary truncate">
            {name}
          </h3>
          <p className="text-sm text-secondary">
            {properties} {properties === 1 ? "Property" : "Properties"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
