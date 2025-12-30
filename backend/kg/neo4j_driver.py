import os
from neo4j import GraphDatabase

URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
USER = os.getenv("NEO4J_USER", "neo4j")
PASSWORD = os.getenv("NEO4J_PASSWORD")

driver = None

# Hackathon Fix: Only connect if password exists, otherwise skip
if PASSWORD:
    try:
        driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))
    except Exception as e:
        print(f"Warning: Neo4j connection failed: {e}")
else:
    print("Warning: NEO4J_PASSWORD not set. Running in 'Offline Mode' (Graph features disabled).")

def run_query(query, params=None):
    # If driver is None (offline mode), return empty list so code doesn't break
    if not driver:
        return []
        
    with driver.session() as session:
        result = session.run(query, params or {})
        return [record.data() for record in result]