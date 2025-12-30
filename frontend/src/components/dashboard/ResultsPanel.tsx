import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatchScoreRing } from "./MatchScoreRing";

// Mock parsed data - this will be replaced with real AI parsing
const mockParsedData = {
  personalInfo: {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      duration: "2021 - Present",
      description: "Led development of React-based dashboard applications",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2018 - 2021",
      description: "Built responsive web applications using React and TypeScript",
    },
  ],
  education: [
    {
      degree: "BS Computer Science",
      school: "Stanford University",
      year: "2018",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Node.js", "Git", "Jest"],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"],
};

const mockMatchAnalysis = {
  score: 87,
  matchedSkills: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
  missingSkills: ["Redux", "Zustand"],
  partialMatch: ["Testing (Jest vs Cypress)"],
  experienceMatch: true,
  educationMatch: true,
};

export const ResultsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="h-1 w-8 rounded-full bg-ai-gradient" />
        <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Parsed Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Candidate Profile
            </h3>
            <div className="space-y-3">
              <p className="text-xl font-bold text-foreground">{mockParsedData.personalInfo.name}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {mockParsedData.personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {mockParsedData.personalInfo.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {mockParsedData.personalInfo.location}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-4">
              {mockParsedData.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <p className="font-medium text-foreground">{exp.title}</p>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-3">
              {mockParsedData.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-medium text-foreground">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Skills & Certifications
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {mockParsedData.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="bg-secondary/70">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {mockParsedData.certifications.map((cert, i) => (
                <Badge key={i} variant="outline" className="border-primary/30 text-primary">
                  {cert}
                </Badge>
              ))}
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
              <MatchScoreRing score={mockMatchAnalysis.score} size={120} strokeWidth={8} />
            </div>
            <p className="text-sm text-muted-foreground">
              Based on skills, experience, and requirements
            </p>
          </div>

          {/* Skill Match Breakdown */}
          <div className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Skill Analysis</h3>
            
            {/* Matched Skills */}
            <div className="mb-4">
              <p className="text-sm font-medium text-success flex items-center gap-1.5 mb-2">
                <CheckCircle className="h-4 w-4" />
                Matched Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {mockMatchAnalysis.matchedSkills.map((skill, i) => (
                  <Badge key={i} className="bg-success/20 text-success border-0 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mb-4">
              <p className="text-sm font-medium text-destructive flex items-center gap-1.5 mb-2">
                <XCircle className="h-4 w-4" />
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {mockMatchAnalysis.missingSkills.map((skill, i) => (
                  <Badge key={i} className="bg-destructive/20 text-destructive border-0 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Partial Match */}
            <div>
              <p className="text-sm font-medium text-warning flex items-center gap-1.5 mb-2">
                <AlertCircle className="h-4 w-4" />
                Partial Match
              </p>
              <div className="flex flex-wrap gap-1.5">
                {mockMatchAnalysis.partialMatch.map((skill, i) => (
                  <Badge key={i} className="bg-warning/20 text-warning border-0 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Experience Level</span>
                <Badge variant="success">Matches</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Education</span>
                <Badge variant="success">Matches</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Core Skills</span>
                <Badge className="bg-primary/20 text-primary border-0">4/6</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
