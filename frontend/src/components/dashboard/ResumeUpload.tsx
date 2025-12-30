import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// Define the Props we expect from Index.tsx
interface ResumeUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const ResumeUpload = ({ file, setFile }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Only take the first file
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, [setFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }, [setFile]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card p-6 h-full flex flex-col"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upload Resume</h3>
          <p className="text-sm text-muted-foreground">Drag & drop PDF or click to browse</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Upload className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-1 min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        )}
      >
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          title="Upload resume file"
        />
        
        <motion.div
          animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300",
            isDragging ? "bg-primary/20" : "bg-secondary"
          )}>
            <FileText className={cn(
              "h-8 w-8 transition-colors duration-300",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isDragging ? "Drop file here" : "Drop resume here or click to browse"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports PDF, DOCX (Max 10MB)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Selected File Display */}
      {file && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-4"
        >
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="flex-1 truncate text-sm text-foreground">{file.name}</span>
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                }}
                className="text-xs text-muted-foreground hover:text-destructive p-1"
              >
                Remove
              </button>
            </div>
        </motion.div>
      )}
    </motion.div>
  );
};