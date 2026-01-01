import re
KNOWN_SKILLS = [
    "python", "java", "sql", "django", "flask",
    "machine learning", "deep learning", "cnn",
    "nlp", "react", "node", "docker", "typescript", "javascript",
    "html", "css", "c++", "c", "git", "aws", "azure", "kubernetes",
    "rest", "graphql", "redux", "zustand", "fastapi", "linux",
    "agile", "scrum", "mathematics", "data science"
]
KNOWN_ROLES = [
    "software engineer",
    "backend developer",
    "frontend developer",
    "full stack developer",
    "data scientist",
    "machine learning engineer",
    "ai engineer",
    "web developer"
]
def extract_email(text: str):
    email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
    return email_match.group(0) if email_match else "N/A"
def extract_phone(text: str):
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    return phone_match.group(0) if phone_match else "N/A"
def extract_name(text: str):
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return lines[0] if lines else "Candidate Name"
def extract_skills(text: str):
    text = text.lower()
    return [s for s in KNOWN_SKILLS if s in text]
def extract_roles(text: str):
    text = text.lower()
    return [r for r in KNOWN_ROLES if r in text]
def extract_sections(text: str):
    text_lower = text.lower()
    sections = {
        "education": [],
        "experience": [],
        "projects": [],
        "achievements": []
    }
    lines = text.split('\n')
    current_section = None
    
    keywords = {
        "education": ["education", "academic", "qualification"],
        "experience": ["experience", "employment", "work history", "internship"],
        "projects": ["projects", "personal projects", "academic projects"],
        "achievements": ["achievements", "certifications", "awards", "honors"]
    }
    
    for line in lines:
        stripped = line.strip().lower()
        if not stripped:
            continue
            
        found_new_section = False
        for section, keys in keywords.items():
            if any(key in stripped for key in keys) and len(stripped) < 30: # Heuristic for header
                current_section = section
                found_new_section = True
                break
        
        if found_new_section:
            continue
            
        if current_section:
            sections[current_section].append(line.strip())
            
    return sections
def parse_entries(lines):
    entries = []
    current_entry = {
        "title": "Project",
        "role": "Project", 
        "company": "", 
        "duration": "", 
        "description_points": [], 
        "tech_tags": []
    }
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped: continue

        if "technologies used" in stripped.lower():
            content = stripped.split(":", 1)[-1].strip()
            current_entry["tech_tags"] = [t.strip() for t in content.split(',') if t.strip()]
            continue
        if re.search(r'\d{4}|present', stripped.lower()) and len(stripped) < 40:
            current_entry["duration"] = stripped
            continue

        is_bullet = stripped.startswith(('•', '-', '*', '➢', '–'))
        clean_text = re.sub(r'^[•\-\*➢–]\s*', '', stripped)
        is_title_candidate = len(stripped) < 50
        starts_uppercase = clean_text and clean_text[0].isupper()
        
        if is_title_candidate and starts_uppercase:

             
             if (current_entry["description_points"] or current_entry["tech_tags"]) and current_entry["title"] != "Project":
                 entries.append(current_entry)
                 current_entry = {
                    "title": clean_text, 
                    "role": clean_text, 
                    "company": clean_text, 
                    "duration": "", 
                    "description_points": [], 
                    "tech_tags": []
                }
             elif current_entry["title"] == "Project":
                 current_entry["title"] = clean_text
                 current_entry["role"] = clean_text
                 current_entry["company"] = clean_text
             else:
                 current_entry["description_points"].append(clean_text)
        else:
            if is_bullet:
                 current_entry["description_points"].append(clean_text)
            else:
                 if current_entry["description_points"]:
                    current_entry["description_points"][-1] += " " + stripped
                 else:
                     current_entry["description_points"].append(stripped)
    if current_entry["description_points"] or current_entry["tech_tags"] or current_entry["title"] != "Project":
        entries.append(current_entry)
        
    return entries
def extract_experience_years(text: str):
    matches = re.findall(r'(\d+\.?\d*)\s+years', text.lower())
    return float(max(matches)) if matches else 0.0
def decode_resume(text: str):
    sections = extract_sections(text)
    
    # Structure the sections
    parsed_experience = parse_entries(sections["experience"])
    parsed_projects = parse_entries(sections["projects"])
    
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "roles": extract_roles(text),
        "experience_years": extract_experience_years(text),
        "education_section": sections["education"],
        "experience_section": parsed_experience,
        "projects_section": parsed_projects,
        "achievements_section": sections["achievements"]
    }