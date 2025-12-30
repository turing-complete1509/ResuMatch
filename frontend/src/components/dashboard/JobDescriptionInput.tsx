import { motion } from "framer-motion";
import { Briefcase, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const sampleJD = `Senior Frontend Developer

We are looking for an experienced Frontend Developer.

Requirements:
- 5+ years of experience with React.js
- Strong TypeScript skills
- Experience with modern CSS (Tailwind)
- Knowledge of state management (Redux, Zustand)
- REST APIs and GraphQL experience`;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card p-6 h-full flex flex-col"
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

      <div className="space-y-4 flex-1 flex flex-col">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste job description here..."
          className="min-h-[200px] flex-1 resize-none bg-secondary/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(sampleJD)}
            className="text-muted-foreground"
          >
            <Copy className="h-4 w-4" />
            Load Sample JD
          </Button>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange("")}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};