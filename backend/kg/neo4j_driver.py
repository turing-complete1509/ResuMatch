import os
from neo4j import GraphDatabase

URI = os.getenv("NEO4J_URI")
USER = os.getenv("NEO4J_USER", "neo4j")
PASSWORD = os.getenv("NEO4J_PASSWORD")
DATABASE = os.getenv("NEO4J_DATABASE", "neo4j")

driver = None

if PASSWORD and URI:
    try:
        driver = GraphDatabase.driver(
            URI,
            auth=(USER, PASSWORD),
            max_connection_lifetime=200,
            connection_timeout=15
        )
        print("Connected to Neo4j Aura")
    except Exception as e:
        print(f"Neo4j Aura connection failed: {e}")
else:
    print("Neo4j credentials missing. Running in offline mode.")

def run_query(query, params=None):
    if not driver:
        return []

    with driver.session(database=DATABASE) as session:
        result = session.run(query, params or {})
        return [record.data() for record in result]
