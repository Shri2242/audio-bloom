import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
}

const StreakDisplay = ({ streak }: StreakDisplayProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card p-6 flex items-center gap-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Flame className="w-8 h-8 text-foreground" />
        </div>
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
          >
            {streak}
          </motion.div>
        )}
      </motion.div>
      <div>
        <p className="text-muted-foreground text-sm">Current Streak</p>
        <p className="text-3xl font-bold text-foreground">
          {streak} {streak === 1 ? 'Day' : 'Days'}
        </p>
      </div>
    </motion.div>
  );
};

export default StreakDisplay;
