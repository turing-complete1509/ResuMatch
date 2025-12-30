def calculate_ats_score(resume_skills, jd_skills):
    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    matched = resume_set & jd_set
    missing = jd_set - resume_set

    score = 0.0
    if jd_set:
        score = round((len(matched) / len(jd_set)) * 100, 2)

    return {
        "ats_score": score,
        "matched_skills": list(matched),
        "missing_skills": list(missing)
    }
