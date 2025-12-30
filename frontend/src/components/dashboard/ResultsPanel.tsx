import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatchScoreRing } from "./MatchScoreRing";

interface ResultsPanelProps {
  data: any; // Using 'any' for hackathon speed, but ideally define a type interface
}

export const ResultsPanel = ({ data }: ResultsPanelProps) => {
  // If data is missing (shouldn't happen if parent controls logic), return null
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="h-1 w-8 rounded-full bg-primary" />
        <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Parsed Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Candidate Profile
            </h3>
            <div className="space-y-3">
              <p className="text-xl font-bold text-foreground">{data.personalInfo?.name || "Unknown Name"}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {data.personalInfo?.email || "N/A"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {data.personalInfo?.phone || "N/A"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Match Score */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Match Score Card */}
          <div className="glass-card ai-border p-6 text-center">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Match Score</h3>
            <div className="flex justify-center mb-4">
              <MatchScoreRing score={data.score} size={120} strokeWidth={8} />
            </div>
            <p className="text-sm text-muted-foreground">
              {data.score > 70 ? "Strong Match" : "Moderate Match"}
            </p>
          </div>

          {/* Skill Match Breakdown */}
          <div className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Skill Analysis</h3>
            
            {/* Matched Skills */}
            <div className="mb-4">
              <p className="text-sm font-medium text-green-600 flex items-center gap-1.5 mb-2">
                <CheckCircle className="h-4 w-4" />
                Matched Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {data.matchedSkills?.map((skill: string, i: number) => (
                  <Badge key={i} className="bg-green-100 text-green-700 border-0 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mb-4">
              <p className="text-sm font-medium text-red-600 flex items-center gap-1.5 mb-2">
                <XCircle className="h-4 w-4" />
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {data.missingSkills?.map((skill: string, i: number) => (
                  <Badge key={i} className="bg-red-100 text-red-700 border-0 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};