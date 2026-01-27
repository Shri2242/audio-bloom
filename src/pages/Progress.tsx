import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressRing from "@/components/ProgressRing";
import StreakDisplay from "@/components/StreakDisplay";
import { getUser, getProgress, getSessions, calculateStreak } from "@/lib/storage";
import { getGoalById } from "@/lib/audioData";

const Progress = () => {
  const navigate = useNavigate();
  const user = getUser();
  const progress = getProgress();
  const sessions = getSessions();
  const streak = calculateStreak();
  const goal = user.selectedGoal ? getGoalById(user.selectedGoal) : null;

  const completedSessions = sessions.filter((s) => s.completed).length;
  const totalSessions = sessions.length || 1;
  const completionRate = Math.round((completedSessions / totalSessions) * 100);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not started";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-2xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/journey")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journey
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Progress
            </h1>
            {goal && (
              <p className="text-muted-foreground">
                {goal.icon} {goal.title}
              </p>
            )}
          </motion.div>

          {/* Streak Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <StreakDisplay streak={streak} />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Completion Ring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 flex flex-col items-center justify-center"
            >
              <ProgressRing progress={completionRate} size={140} strokeWidth={10}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">
                    {completionRate}%
                  </span>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </ProgressRing>
              <p className="mt-4 text-sm text-muted-foreground">
                Session Completion Rate
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {completedSessions}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Days Active</p>
                  <p className="text-2xl font-bold text-foreground">
                    {progress.totalDaysCompleted}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Completed</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatDate(progress.lastCompletedDate)}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Motivation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 text-center mb-8"
          >
            {streak >= 7 ? (
              <>
                <p className="text-2xl mb-2">🏆</p>
                <p className="text-lg font-semibold text-foreground mb-1">
                  You're on Fire!
                </p>
                <p className="text-muted-foreground">
                  A {streak}-day streak is impressive. Keep pushing!
                </p>
              </>
            ) : streak >= 3 ? (
              <>
                <p className="text-2xl mb-2">⭐</p>
                <p className="text-lg font-semibold text-foreground mb-1">
                  Great Momentum!
                </p>
                <p className="text-muted-foreground">
                  You're building a solid habit. {7 - streak} more days to a week streak!
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-2">🌱</p>
                <p className="text-lg font-semibold text-foreground mb-1">
                  Every Journey Starts Somewhere
                </p>
                <p className="text-muted-foreground">
                  Complete today's session to build your streak!
                </p>
              </>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" onClick={() => navigate("/journey")}>
              Continue Learning
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate("/goals")}>
              Change Goal
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
