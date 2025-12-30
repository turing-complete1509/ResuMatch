import { motion } from "framer-motion";
import { Briefcase, Sparkles, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionInputProps {
  onAnalyze?: () => void;
}

export const JobDescriptionInput = ({ onAnalyze }: JobDescriptionInputProps) => {
  const [jobDescription, setJobDescription] = useState("");

  const sampleJD = `Senior Frontend Developer

We are looking for an experienced Frontend Developer to join our team.

Requirements:
- 5+ years of experience with React.js
- Strong TypeScript skills
- Experience with modern CSS frameworks (Tailwind CSS preferred)
- Knowledge of state management (Redux, Zustand)
- Excellent problem-solving abilities
- Experience with REST APIs and GraphQL

Nice to have:
- Experience with Next.js
- Knowledge of testing frameworks (Jest, Cypress)
- CI/CD experience
- Team leadership experience`;

  const handleAnalyze = () => {
    if (onAnalyze) {
      onAnalyze();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Job Description</h3>
          <p className="text-sm text-muted-foreground">Paste the job requirements to match</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="min-h-[200px] resize-none bg-secondary/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJobDescription(sampleJD)}
            className="text-muted-foreground"
          >
            <Copy className="h-4 w-4" />
            Load Sample JD
          </Button>
          {jobDescription && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setJobDescription("")}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {jobDescription && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ai" className="w-full" onClick={handleAnalyze}>
              <Sparkles className="h-4 w-4" />
              Analyze & Match Candidates
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
