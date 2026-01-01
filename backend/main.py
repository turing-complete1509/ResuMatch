import os
import shutil
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parser.pdfextractor import extract_text_from_pdf
from parser.resume_decoder import decode_resume
from parser.jd_decoder import decode_jd
from scoring.ats_score import calculate_ats_score
from kg.skill_expander import expand_skills
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    temp_file = f"temp_{resume.filename}"
    try:
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        resume_text = extract_text_from_pdf(temp_file)
        resume_profile = decode_resume(resume_text)
        jd_profile = decode_jd(job_description)
        try:
            expanded_resume_skills = expand_skills(resume_profile["skills"])
            expanded_jd_skills = expand_skills(jd_profile["required_skills"])
        except Exception as e:
            print(f"Neo4j skipped: {e}")
            expanded_resume_skills = resume_profile["skills"]
            expanded_jd_skills = jd_profile["required_skills"]
        ats_result = calculate_ats_score(
            expanded_resume_skills,
            expanded_jd_skills
        )
        return {
            "score": ats_result["ats_score"],
            "matchedSkills": ats_result["matched_skills"],
            "missingSkills": ats_result["missing_skills"],
            "summary": f"Candidate matches {len(ats_result['matched_skills'])} out of {len(expanded_jd_skills)} required skills.",
            "personalInfo": {
                "name": resume_profile.get("name", "Candidate Name"),
                "email": resume_profile.get("email", "N/A"),
                "phone": resume_profile.get("phone", "N/A"),
                "location": "N/A"
            },
            "experience": [{"role": exp["role"], "company": exp["company"], "duration": exp["duration"], "description": exp["description_points"]} for exp in resume_profile.get("experience_section", [])],
            "education": [{"degree": line, "school": "", "year": "", "score": ""} for line in resume_profile.get("education_section", [])],
            "projects": [{"name": proj["title"], "tech": proj["tech_tags"], "description": proj["description_points"]} for proj in resume_profile.get("projects_section", [])],
            "skills": resume_profile["skills"],
            "achievements": resume_profile.get("achievements_section", [])
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup temp file
        if os.path.exists(temp_file):
            os.remove(temp_file)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)