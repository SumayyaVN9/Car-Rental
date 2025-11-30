import json
from pathlib import Path
from models import Base, Car
from database import engine, SessionLocal

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "car-results.json"

def insert_data():
    # Create table
    Base.metadata.create_all(bind=engine)

    # Read JSON
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    results = data.get("results", [])
    print(f"Total results: {len(results)}")

    db = SessionLocal()

    for item in results:
        car = item.get("car", {})
        provider = item.get("providers", [{}])[0]

        pickup = item.get("pickup", {}) or {}
        dropoff = item.get("dropoff", {}) or {}

        new_car = Car(
            name=car.get("name"),
            category=car.get("category"),
            type=car.get("type"),
            transmission=car.get("transmission"),
            fuel=car.get("fuel"),
            air_conditioning=car.get("air_conditioning"),
            image=car.get("image"),

            provider_name=provider.get("name"),
            price=provider.get("price"),

            pickup_address=pickup.get("address"),
            pickup_lat=pickup.get("latitude"),
            pickup_lng=pickup.get("longitude"),

            dropoff_address=dropoff.get("address"),
            dropoff_lat=dropoff.get("latitude"),
            dropoff_lng=dropoff.get("longitude")
        )

        db.add(new_car)

    db.commit()
    db.close()

    print("✅ All data inserted successfully!")


if __name__ == "__main__":
    insert_data()
