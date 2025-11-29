import React from "react";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">
        {title}
      </h3>

      <p className="text-secondary text-sm leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
