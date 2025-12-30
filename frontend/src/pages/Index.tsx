import { motion } from "framer-motion";
import { Sparkles, FileText, Briefcase, Zap, Target, ArrowRight } from "lucide-react";
import { ResumeUpload } from "@/components/dashboard/ResumeUpload";
import { JobDescriptionInput } from "@/components/dashboard/JobDescriptionInput";
import { ResultsPanel } from "@/components/dashboard/ResultsPanel";
import { useState } from "react";

const Index = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ai-gradient">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ResuMatch</h1>
              <p className="text-xs text-muted-foreground">AI Resume Parser</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Powered by AI</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Smart <span className="gradient-text">Resume Parser</span> + Role Match
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Upload resumes, paste job descriptions, and get instant AI-powered candidate profiles with match scores
          </p>

          {/* Feature Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: FileText, label: "PDF & Text Support" },
              { icon: Target, label: "Match Scoring" },
              { icon: Zap, label: "Fast Processing" },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 text-sm text-muted-foreground"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                {feature.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Grid - Input Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ResumeUpload />
          <JobDescriptionInput onAnalyze={() => setShowResults(true)} />
        </div>

        {/* Results Section */}
        {showResults && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <ResultsPanel />
          </motion.div>
        )}
      </main>

      {/* Ambient Glow Effect */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-ai-blue/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
