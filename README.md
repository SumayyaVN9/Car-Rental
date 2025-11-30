# Car-Rental

A virtual environment keeps all project dependencies isolated so different projects don't conflict. It ensures consistent versions and makes the app easier to run anywhere.


FastAPI → Web framework (to create API routes)

SQLAlchemy → To talk to PostgreSQL

psycopg2 → PostgreSQL driver


database.py

Only connects to your PostgreSQL.

models.py

Only defines table structure (Car model).

load_data.py

Only inserts JSON into DB.

main.py (VERY IMPORTANT)

This is where your backend runs, like:

Frontend calls → backend API

Backend fetches data → returns JSON

You display cars on your website



venv\Scripts\activate

uvicorn main:app --reload
