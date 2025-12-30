import uvicorn
import shutil
import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Import your team's existing logic
# Make sure these files are in the same folder or properly package structure
from parser.pdfextractor import extract_text_from_pdf
from parser.resume_decoder import decode_resume
from parser.jd_decoder import decode_jd
from scoring.ats_score import calculate_ats_score
from kg.skill_expander import expand_skills

# Initialize the App
app = FastAPI()

# 1. Enable CORS (Crucial so React can talk to Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change to ["http://localhost:5173"] for security later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the Endpoint
@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...), 
    job_description: str = Form(...)
):
    print(f"DEBUG: Received request. File: {resume.filename}, JD Length: {len(job_description)}") # <--- 1. Check Receipt
    try:
        temp_filename = f"temp_{resume.filename}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        print("DEBUG: File saved successfully") # <--- 2. Check Save

        try:
            print("DEBUG: Starting PDF extraction...")
            resume_text = extract_text_from_pdf(temp_filename)
            print(f"DEBUG: Text extracted. Length: {len(resume_text)} chars") # <--- 3. Check PDF Reader

            print("DEBUG: Decoding resume...")
            resume_profile = decode_resume(resume_text)
            
            print("DEBUG: Decoding JD...")
            jd_profile = decode_jd(job_description)

            print("DEBUG: Calculating Score...")
            # Using the safer logic (skipping Neo4j if it fails)
            try:
                expanded_resume_skills = expand_skills(resume_profile["skills"])
                expanded_jd_skills = expand_skills(jd_profile["required_skills"])
            except Exception as e:
                print(f"DEBUG: Neo4j skipped ({e})")
                expanded_resume_skills = resume_profile["skills"]
                expanded_jd_skills = jd_profile["required_skills"]

            # ... inside analyze_resume function ...
            
            ats_result = calculate_ats_score(expanded_resume_skills, expanded_jd_skills)
            
            # --- REPLACE THE RETURN STATEMENT WITH THIS ---
            return {
                # 1. Map 'ats_score' -> 'score'
                "score": ats_result["ats_score"],
                
                # 2. Map 'matched_skills' -> 'matchedSkills'
                "matchedSkills": ats_result["matched_skills"],
                
                # 3. Map 'missing_skills' -> 'missingSkills'
                "missingSkills": ats_result["missing_skills"],
                
                # 4. Generate a summary string
                "summary": f"Candidate matches {len(ats_result['matched_skills'])} out of {len(expanded_jd_skills)} required skills.",
                
                # 5. Provide structure for Personal Info (Frontend will crash without this)
                "personalInfo": {
                    "name": "Candidate Name",  
                    "email": "candidate@email.com", 
                    "phone": "N/A",
                    "location": "N/A"
                },
                
                # 6. Provide empty lists for other sections to prevent errors
                "experience": [],
                "education": [],
                "skills": resume_profile["skills"],
                "certifications": []
            }

        finally:
            if os.path.exists(temp_filename):
                os.remove(temp_filename)
                print("DEBUG: Temp file cleaned up")

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}") # <--- 5. Catch Crash
        raise HTTPException(status_code=500, detail=str(e))

# 3. Entry point to run the server
if __name__ == "__main__":
    # Runs on localhost:8000
    uvicorn.run(app, host="0.0.0.0", port=8000)