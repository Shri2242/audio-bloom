import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioItem from "@/components/AudioItem";
import Header from "@/components/Header";
import MotivationModal from "@/components/MotivationModal";
import { getGoalById, getRandomMotivation } from "@/lib/audioData";
import {
  getUser,
  getTodaySession,
  addSession,
  getProgress,
  updateProgress,
  calculateStreak,
} from "@/lib/storage";

const DailyJourney = () => {
  const navigate = useNavigate();
  const user = getUser();
  const goal = user.selectedGoal ? getGoalById(user.selectedGoal) : null;

  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (!user.selectedGoal) {
      navigate("/goals");
      return;
    }

    // Load today's session if exists
    const todaySession = getTodaySession();
    if (todaySession) {
      setCompletedItems(todaySession.completedItems || []);
    }
  }, [user.selectedGoal, navigate]);

  const handleToggleComplete = (itemId: string) => {
    const newCompleted = completedItems.includes(itemId)
      ? completedItems.filter((id) => id !== itemId)
      : [...completedItems, itemId];

    setCompletedItems(newCompleted);

    // Save session
    const today = new Date().toISOString().split("T")[0];
    const isComplete = goal && newCompleted.length === goal.audioItems.length;

    addSession({
      date: today,
      goal: user.selectedGoal!,
      completed: isComplete,
      completedItems: newCompleted,
      durationMinutes: goal?.totalDuration || 0,
    });

    // If all items completed, show motivation
    if (isComplete && !completedItems.includes(itemId)) {
      const streak = calculateStreak();
      setCurrentStreak(streak);

      // Update progress
      const progress = getProgress();
      updateProgress({
        streakCount: streak,
        totalDaysCompleted: progress.totalDaysCompleted + 1,
        completionPercentage: 100,
        lastCompletedDate: today,
      });

      setMotivationMessage(getRandomMotivation());
      setShowMotivation(true);
    }
  };

  if (!goal) {
    return null;
  }

  const completionPercentage = Math.round(
    (completedItems.length / goal.audioItems.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-2xl mx-auto">
          {/* Today's Goal Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{goal.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  Today&apos;s Goal
                </p>
                <h1 className="text-xl font-bold text-foreground mb-2">
                  {goal.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{goal.totalDuration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.audioItems.length} items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {completionPercentage}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-primary rounded-full"
                  style={{
                    boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Completion Badge */}
          {completionPercentage === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 mb-6 flex items-center gap-3 bg-primary/10 border-primary/30"
            >
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  Session Complete!
                </p>
                <p className="text-sm text-muted-foreground">
                  Come back tomorrow for your next session
                </p>
              </div>
            </motion.div>
          )}

          {/* Audio Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Today&apos;s Audio
            </h2>
            <div className="space-y-3">
              {goal.audioItems.map((item, index) => (
                <AudioItem
                  key={item.id}
                  item={item}
                  isCompleted={completedItems.includes(item.id)}
                  onToggleComplete={handleToggleComplete}
                  delay={0.05 * index}
                />
              ))}
            </div>
          </motion.div>

          {/* View Progress Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/progress")}
            >
              View My Progress
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Motivation Modal */}
      <MotivationModal
        isOpen={showMotivation}
        onClose={() => setShowMotivation(false)}
        message={motivationMessage}
        streak={currentStreak}
      />
    </div>
  );
};

export default DailyJourney;
