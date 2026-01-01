import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { ResumeUpload } from "@/components/dashboard/ResumeUpload";
import { JobDescriptionInput } from "@/components/dashboard/JobDescriptionInput";
import { ResultsPanel } from "@/components/dashboard/ResultsPanel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAnalyze = async () => {
    if (!file || !jd) {
      if (!file) console.error("No file selected");
      if (!jd) console.error("No job description entered");
      return;
    }
    console.log("Starting analysis...");
    setIsLoading(true);
    setResults(null);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Ideally show a toast here, but for now console error is enough as per current scope
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
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
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Smart <span className="text-primary">Resume Parser</span> + Role Match
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Upload resumes, paste job descriptions, and get instant AI-powered match scores.
          </p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <ResumeUpload file={file} setFile={setFile} />
          <JobDescriptionInput value={jd} onChange={setJd} />
        </div>
        <div className="flex justify-center mb-12">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            disabled={isLoading} 
            className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 shadow-xl transition-all hover:scale-105"
          >
            {isLoading ? <Zap className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
            {isLoading ? "Analyzing..." : "Analyze Resume Match"}
          </Button>
        </div>
        {results && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsPanel data={results} />
          </motion.div>
        )}
      </main>
    </div>
  );
};
export default Index;