import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoalCard from "@/components/GoalCard";
import Header from "@/components/Header";
import { goals } from "@/lib/audioData";
import { setUser } from "@/lib/storage";

const GoalSelection = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedGoal) {
      setUser({
        selectedGoal,
        startDate: new Date().toISOString().split('T')[0],
      });
      navigate("/journey");
    }
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
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your Learning Goal
            </h1>
            <p className="text-muted-foreground">
              Select one goal to focus on. You can change this anytime.
            </p>
          </motion.div>

          {/* Goal Cards */}
          <div className="space-y-4 mb-10">
            {goals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                icon={goal.icon}
                title={goal.title}
                description={goal.description}
                duration={goal.totalDuration}
                isSelected={selectedGoal === goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                delay={0.1 * index}
              />
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={handleContinue}
              disabled={!selectedGoal}
              className="w-full sm:w-auto group"
            >
              Create My Learning Track
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default GoalSelection;
