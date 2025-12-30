import re

KNOWN_SKILLS = [
    "python", "java", "sql", "django", "flask",
    "machine learning", "deep learning", "cnn",
    "nlp", "react", "node", "docker"
]

KNOWN_ROLES = [
    "software engineer",
    "backend developer",
    "data scientist",
    "machine learning engineer",
    "ai engineer"
]

def extract_skills(text: str):
    text = text.lower()
    return [s for s in KNOWN_SKILLS if s in text]

def extract_roles(text: str):
    text = text.lower()
    return [r for r in KNOWN_ROLES if r in text]

def extract_experience_years(text: str):
    matches = re.findall(r'(\d+\.?\d*)\s+years', text.lower())
    return float(max(matches)) if matches else 0.0

def decode_resume(text: str):
    return {
        "skills": extract_skills(text),
        "roles": extract_roles(text),
        "experience_years": extract_experience_years(text)
    }
