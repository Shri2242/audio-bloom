import { motion } from "framer-motion";
import { Headphones, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BenefitCard from "@/components/BenefitCard";

const Index = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: "📚",
      title: "Structured Learning",
      description: "Carefully curated audio journeys designed by learning experts to maximize retention and skill building.",
    },
    {
      icon: "📈",
      title: "Daily Progress Tracking",
      description: "Watch your streak grow and celebrate milestones as you build consistent learning habits.",
    },
    {
      icon: "🎧",
      title: "Learn Anywhere",
      description: "Transform commute time, workouts, or work sessions into productive learning opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_60px_hsl(var(--primary)/0.4)]">
              <Headphones className="w-10 h-10 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Audio-First Learning Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight"
          >
            Learn Skills Through Audio,{" "}
            <span className="text-gradient">15 Minutes a Day</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Transform your commute, workout, or work time into focused learning sessions 
            with curated audio journeys designed for skill mastery.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/goals")}
              className="group"
            >
              Start Your Audio Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why SkillFlow Works
            </h2>
            <p className="text-muted-foreground">
              Science-backed learning methods adapted for busy lifestyles
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container max-w-3xl mx-auto text-center glass-card p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands learning new skills while they go about their day
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/goals")}
            className="group"
          >
            Choose Your Learning Goal
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
