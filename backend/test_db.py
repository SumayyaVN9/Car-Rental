import psycopg2
import os
from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ DB connected successfully!")
except Exception as e:
    print("❌ Failed to connect:", e)
finally:
    if 'conn' in locals():
        conn.close()
