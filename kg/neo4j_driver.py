import os
from neo4j import GraphDatabase

URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
USER = os.getenv("NEO4J_USER", "neo4j")
PASSWORD = os.getenv("NEO4J_PASSWORD")   # ✅ FIX HERE

if not PASSWORD:
    raise ValueError("NEO4J_PASSWORD environment variable not set")

driver = GraphDatabase.driver(
    URI,
    auth=(USER, PASSWORD)
)

def run_query(query, params=None):
    with driver.session() as session:
        result = session.run(query, params or {})
        return [record.data() for record in result]
