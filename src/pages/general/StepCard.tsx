import React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  direction?: "left" | "right" | "bottom"; // optional prop
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  direction = "bottom",
}) => {
  // Use any type for variants
  const variants: any = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "bottom" ? 50 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
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
    </motion.div>
  );
};

export default StepCard;
