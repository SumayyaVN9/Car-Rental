from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
from models import Car

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cars")
def get_cars(
    pickup: str = None,
    from_date: str = None,
    to_date: str = None,
    car_type: str = None,
    min_price: float = None,
    max_price: float = None,
    page: int = 1,
    page_size: int = 6,
    db: Session = Depends(get_db)
):
    query = db.query(Car)

    
    if pickup:
        pickup_clean = pickup.replace("Airport", "").strip()
        query = query.filter(Car.pickup_address.ilike(f"%{pickup_clean}%"))

    
    if car_type and car_type.lower() != "all":
        query = query.filter(Car.category.ilike(f"%{car_type}%"))

    
    if min_price is not None:
        query = query.filter(Car.price >= min_price)

    if max_price is not None:
        query = query.filter(Car.price <= max_price)

    total = query.count()

   
    cars = query.offset((page - 1) * page_size).limit(page_size).all()

    results = [
        {
            "id": c.id,
            "name": c.name,
            "brand": c.provider_name,
            "car_type": c.category,
            "fuel": c.fuel,
            "price_per_day": c.price,
            "image_url": c.image,
            "pickup_address": c.pickup_address
        }
        for c in cars
    ]

    return {
        "items": results,
        "total": total,
        "page": page,
        "page_size": page_size,
    }

@app.get("/locations")
def get_locations(search: str, db: Session = Depends(get_db)):

    results = (
        db.query(
            Car.pickup_address,
            Car.pickup_lat,
            Car.pickup_lng
        )
        .filter(Car.pickup_address.ilike(f"%{search}%"))
        .distinct()
        .limit(10)
        .all()
    )

    formatted = []

    for r in results:
        address = r.pickup_address
        if not address:
            continue

        parts = [p.strip() for p in address.split(",")]

        city = parts[-2] if len(parts) >= 2 else ""
        country = parts[-1] if len(parts) >= 1 else ""

        name = f"{city} Airport" if city else address
        code = (city[:3].upper() if city else "LOC")

        formatted.append({
            "name": name,
            "city": city,
            "country": country,
            "code": code,
            "address": address,
            "lat": r.pickup_lat,
            "lng": r.pickup_lng
        })

    return formatted


