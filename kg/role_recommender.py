from kg.neo4j_driver import run_query

# -------- ROLE RECOMMENDATION --------
ROLE_QUERY = """
MATCH (r:Role)-[:REQUIRES]->(s:Skill)
WITH r, collect(toLower(s.name)) AS role_skills
WITH r, size([x IN role_skills WHERE x IN $skills]) AS match_count
WHERE match_count > 0
RETURN r.name AS role, match_count
ORDER BY match_count DESC
"""

def recommend_roles(expanded_resume_skills):
    return run_query(
        ROLE_QUERY,
        {"skills": expanded_resume_skills}
    )


# -------- SKILL GAP FOR A ROLE --------
SKILL_GAP_QUERY = """
MATCH (r:Role {name:$role})-[:REQUIRES]->(s:Skill)
WHERE NOT (toLower(s.name) IN $skills)
RETURN s.name AS missing_skill
"""


def skill_gap_for_role(role, expanded_resume_skills):
    rows = run_query(
        SKILL_GAP_QUERY,
        {"role": role, "skills": expanded_resume_skills}
    )
    return [row["missing_skill"] for row in rows]
