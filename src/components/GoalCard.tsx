import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  icon: string;
  title: string;
  description: string;
  duration: number;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

const GoalCard = ({
  icon,
  title,
  description,
  duration,
  isSelected,
  onClick,
  delay = 0,
}: GoalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "glass-card p-6 cursor-pointer relative overflow-hidden transition-all duration-300",
        isSelected && "border-primary ring-2 ring-primary/30"
      )}
    >
      {/* Selection indicator */}
      <motion.div
        initial={false}
        animate={{
          scale: isSelected ? 1 : 0,
          opacity: isSelected ? 1 : 0,
        }}
        className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
      >
        <Check className="w-4 h-4 text-primary-foreground" />
      </motion.div>

      {/* Glow effect when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      )}

      <div className="flex gap-4 items-start">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-foreground pr-8">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="bg-secondary px-2 py-1 rounded-full">
              ~{duration} min/day
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalCard;
