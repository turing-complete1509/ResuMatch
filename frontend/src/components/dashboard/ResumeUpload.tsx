import { motion } from "framer-motion";
import { Upload, FileText, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upload Resumes</h3>
          <p className="text-sm text-muted-foreground">Drag & drop PDF or paste plain text</p>
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
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        )}
      >
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          title="Upload resume files"
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
              {isDragging ? "Drop files here" : "Drop resumes here or click to browse"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports PDF, DOC, DOCX, TXT (Max 10MB)
            </p>
          </div>
        </motion.div>
      </div>

      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-4 space-y-2"
        >
          {uploadedFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="flex-1 truncate text-sm text-foreground">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </motion.div>
          ))}
          <Button variant="ai" className="mt-4 w-full">
            <Sparkles className="h-4 w-4" />
            Parse {uploadedFiles.length} Resume{uploadedFiles.length > 1 ? "s" : ""} with AI
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
