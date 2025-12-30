from kg.neo4j_driver import run_query

QUERY = """
MATCH (s:Skill {name:$skill})-[:SUBSKILL_OF*0..3]->(p)
RETURN DISTINCT p.name AS skill
"""

def expand_skills(skills):
    expanded = set()

    for skill in skills:
        expanded.add(skill)

        rows = run_query(QUERY, {"skill": skill})
        for row in rows:
            expanded.add(row["skill"])

    return list(expanded)
