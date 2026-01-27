import { motion } from "framer-motion";
import { Play, Pause, Check, Music, Mic, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { AudioItem as AudioItemType } from "@/lib/audioData";

interface AudioItemProps {
  item: AudioItemType;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  delay?: number;
}

const AudioItem = ({ item, isCompleted, onToggleComplete, delay = 0 }: AudioItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getTypeIcon = () => {
    switch (item.type) {
      case 'song':
        return <Music className="w-4 h-4" />;
      case 'podcast':
        return <Mic className="w-4 h-4" />;
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case 'song':
        return 'Song';
      case 'podcast':
        return 'Podcast';
      case 'lesson':
        return 'Lesson';
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
    window.open(item.spotifyUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "glass-card p-4 flex items-center gap-4 transition-all duration-300",
        isCompleted && "bg-primary/5 border-primary/30"
      )}
    >
      {/* Play Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary-glow transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        )}
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-muted-foreground">{getTypeIcon()}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {getTypeLabel()}
          </span>
        </div>
        <h4 className="font-medium text-foreground truncate">{item.title}</h4>
        <p className="text-sm text-muted-foreground truncate">{item.artist}</p>
      </div>

      {/* Duration */}
      <div className="text-sm text-muted-foreground flex-shrink-0">
        {item.duration}
      </div>

      {/* Completion Checkbox */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggleComplete(item.id)}
        className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
          isCompleted
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-primary/50"
        )}
      >
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default AudioItem;
