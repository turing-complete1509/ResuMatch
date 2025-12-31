import os
import shutil
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware


# Internal imports
from parser.pdfextractor import extract_text_from_pdf
from parser.resume_decoder import decode_resume
from parser.jd_decoder import decode_jd
from scoring.ats_score import calculate_ats_score
from kg.skill_expander import expand_skills

# -------------------------
# App initialization
# -------------------------
app = FastAPI()

# Enable CORS (frontend → backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# API Endpoint
# -------------------------
@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    temp_file = f"temp_{resume.filename}"

    try:
        # Save uploaded resume temporarily
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # Extract resume text
        resume_text = extract_text_from_pdf(temp_file)

        # Decode resume & JD
        resume_profile = decode_resume(resume_text)
        jd_profile = decode_jd(job_description)

        # Skill expansion (Neo4j-safe)
        try:
            expanded_resume_skills = expand_skills(resume_profile["skills"])
            expanded_jd_skills = expand_skills(jd_profile["required_skills"])
        except Exception as e:
            # Neo4j not available → fallback
            print(f"Neo4j skipped: {e}")
            expanded_resume_skills = resume_profile["skills"]
            expanded_jd_skills = jd_profile["required_skills"]

        # ATS scoring
        ats_result = calculate_ats_score(
            expanded_resume_skills,
            expanded_jd_skills
        )

        # Response formatted for frontend
        return {
            "score": ats_result["ats_score"],
            "matchedSkills": ats_result["matched_skills"],
            "missingSkills": ats_result["missing_skills"],
            "summary": f"Candidate matches {len(ats_result['matched_skills'])} out of {len(expanded_jd_skills)} required skills.",
            "personalInfo": {
                "name": "Candidate Name",
                "email": "candidate@email.com",
                "phone": "N/A",
                "location": "N/A"
            },
            "experience": [],
            "education": [],
            "skills": resume_profile["skills"],
            "certifications": []
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup temp file
        if os.path.exists(temp_file):
            os.remove(temp_file)

# -------------------------
# Entry point
# -------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
