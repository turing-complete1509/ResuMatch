import { motion } from "framer-motion";
import {
  User, Mail, Phone, Briefcase, GraduationCap, Trophy, Code,
  CheckCircle, XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatchScoreRing } from "./MatchScoreRing";
interface ResultsPanelProps {
  data: any;
}
export const ResultsPanel = ({ data }: ResultsPanelProps) => {
  if (!data) return null;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-1 w-8 rounded-full bg-primary" />
        <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* === LEFT COLUMN: Candidate Details === */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Personal Info */}
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
              <p className="text-xl font-bold text-foreground">{data.personalInfo?.name || "Unknown"}</p>
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
          {/* 2. Experience Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience?.map((exp: any, i: number) => (
                <div key={i} className="mb-6 last:mb-0 relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                  <div className="pl-4 border-l-2 border-border/50 ml-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xl font-bold text-foreground">{exp.role}</h4>
                      <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-base text-primary font-medium mb-2">{exp.company}</p>
                    
                    {Array.isArray(exp.description) ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {exp.description.map((line: string, li: number) => (
                          <li key={li} className="text-sm text-muted-foreground leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* 3. Projects & Education (Grid Layout) */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Education */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {data.education?.map((edu: any, i: number) => (
                  <div key={i} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <h4 className="text-sm font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-xs text-secondary-foreground font-medium mb-1">{edu.school}</p>
                    <div className="flex justify-between text-xs font-medium text-primary/80">
                      <span>{edu.year}</span>
                      <span>{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Projects */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Projects
              </h3>
              <div className="space-y-6">
                {data.projects?.map((proj: any, i: number) => (
                  <div key={i} className="rounded-lg bg-secondary/10 p-4 border border-border/50">
                    <div className="mb-3">
                      <h4 className="text-base font-bold text-foreground mb-1">{proj.name}</h4>
                      {/* Tech Stack as colored text line, similar to reference */}
                      {Array.isArray(proj.tech) && proj.tech.length > 0 && (
                        <p className="text-xs text-primary font-medium">
                          {proj.tech.join(", ")}
                        </p>
                      )}
                      {/* Fallback if tech is a string */}
                      {!Array.isArray(proj.tech) && proj.tech && (
                        <p className="text-xs text-primary font-medium">
                          {proj.tech}
                        </p>
                      )}
                    </div>
                    {Array.isArray(proj.description) ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {proj.description.map((line: string, li: number) => (
                          <li key={li} className="text-xs text-muted-foreground leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-muted-foreground line-clamp-3">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          {/* 4. Achievements */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {data.achievements?.map((ach: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  {ach}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* === RIGHT COLUMN: Match Scores (Existing) === */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Match Score */}
          <div className="glass-card ai-border p-6 text-center">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Match Score</h3>
            <div className="flex justify-center mb-4">
              <MatchScoreRing score={data.score} size={120} strokeWidth={8} />
            </div>
            <p className="text-sm text-muted-foreground">
              {data.score > 70 ? "Strong Match" : "Moderate Match"}
            </p>
          </div>
          {/* Skill Analysis */}
          <div className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Skill Analysis</h3>
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