from parser.pdfextractor import extract_text_from_pdf
from parser.resume_decoder import decode_resume
from parser.jd_decoder import decode_jd
from scoring.ats_score import calculate_ats_score
from kg.role_recommender import recommend_roles, skill_gap_for_role


from kg.skill_expander import expand_skills   # NEW
resume_text = extract_text_from_pdf("test_pdfs/s Final Mannat Gupta Resume.pdf")

resume_profile = decode_resume(resume_text)

jd_text = """
Looking for a Data Scientist with 2+ years experience.
Skills: Python, SQL, Machine Learning, Deep Learning
"""
jd_profile = decode_jd(jd_text)

expanded_resume_skills = expand_skills(resume_profile["skills"])
expanded_jd_skills = expand_skills(jd_profile["required_skills"])

ats_result = calculate_ats_score(
    expanded_resume_skills,
    expanded_jd_skills
)

print("\nExpanded Resume Skills:", expanded_resume_skills)
print("Expanded JD Skills:", expanded_jd_skills)
print("\nATS RESULT:", ats_result)

roles = recommend_roles(expanded_resume_skills)
print("\nROLE RECOMMENDATIONS:")
for r in roles:
    print(f"- {r['role']} (matched skills: {r['match_count']})")
if roles:
    top_role = roles[0]["role"]

    gaps = skill_gap_for_role(top_role, expanded_resume_skills)

    print(f"\nSKILL GAP FOR ROLE: {top_role}")
    if gaps:
        print("Missing skills:", gaps)
    else:
        print("Candidate fully satisfies this role.")
