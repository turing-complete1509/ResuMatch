import { motion } from "framer-motion";
import { Sparkles, Zap, FileText, Target } from "lucide-react";
import { ResumeUpload } from "@/components/dashboard/ResumeUpload";
import { JobDescriptionInput } from "@/components/dashboard/JobDescriptionInput";
import { ResultsPanel } from "@/components/dashboard/ResultsPanel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // 1. Centralized State
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Main Analysis Logic
  const handleAnalyze = async () => {
    console.log("BUTTON CLICKED! Checking inputs..."); // Debug Log 1

    if (!file || !jd) {
      console.log("Inputs missing:", { file, jd });
      alert("Please upload a resume and enter a job description!");
      return;
    }

    console.log("Inputs OK. Starting fetch to backend..."); // Debug Log 2
    setIsLoading(true);
    setResults(null); // Clear previous results

    try {
      // 1. Create Form Data
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_description", jd);

      // 2. Send to Python Backend
      // Using 127.0.0.1 to avoid Windows localhost issues
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Analysis failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("Data received from backend:", data); // Debug Log 3

      // 3. Save Real Data
      setResults(data);

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the backend. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
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
        {/* Hero Section */}
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

        {/* INPUT SECTION: Pass state down as props */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <ResumeUpload file={file} setFile={setFile} />
          <JobDescriptionInput value={jd} onChange={setJd} />
        </div>

        {/* MAIN ACTION BUTTON */}
        <div className="flex justify-center mb-12">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            disabled={isLoading || !file || !jd}
            className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 shadow-xl transition-all hover:scale-105"
          >
            {isLoading ? (
              <Zap className="mr-2 h-5 w-5 animate-spin" /> 
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Analyzing..." : "Analyze Resume Match"}
          </Button>
        </div>

        {/* RESULTS SECTION */}
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