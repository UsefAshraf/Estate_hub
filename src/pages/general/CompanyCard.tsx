import React from "react";

interface CompanyCardProps {
  logo: string;
  name: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logo, name }) => {
  return (
    <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-8 w-auto object-contain filter dark:invert"
        loading="lazy"
      />
    </div>
  );
};

export default CompanyCard;
