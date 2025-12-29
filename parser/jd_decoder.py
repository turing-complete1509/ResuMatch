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

def extract_role(text: str):
    text = text.lower()
    for role in KNOWN_ROLES:
        if role in text:
            return role
    return None

def extract_min_experience(text: str):
    matches = re.findall(r'(\d+)\s*[-+]?\s*\d*\s*years', text.lower())
    return int(min(matches)) if matches else 0

def decode_jd(text: str):
    return {
        "role": extract_role(text),
        "required_skills": extract_skills(text),
        "min_experience": extract_min_experience(text)
    }
