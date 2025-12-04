from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
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
    fuel: str = None,
    seats: str = None,
    car_type: str = None,
    min_price: float = None,
    max_price: float = None,
    page: int = 1,
    page_size: int = 6,
    db: Session = Depends(get_db)
):
    query = db.query(Car)

    if pickup:
        clean = pickup.replace("Airport", "").strip()
        query = query.filter(Car.pickup_address.ilike(f"%{clean}%"))


    if fuel and fuel != "all":
        query = query.filter(func.lower(Car.fuel).like(f"%{fuel.lower()}%"))


    seat_map = {
        "2": ["Compact"], 
        "4": ["Compact", "Special"],
        "5": ["Intermediate", "Standard Elite", "Special"],
        "7": ["SUV", "Passenger Van"],
    }

    if seats and seats != "all":
        allowed_categories = seat_map.get(seats, [])
        query = query.filter(Car.category.in_(allowed_categories))


    if car_type and car_type != "all":
        query = query.filter(Car.category.ilike(f"%{car_type}%"))


    if min_price is not None:
        query = query.filter(Car.price >= min_price)
    if max_price is not None:
        query = query.filter(Car.price <= max_price)

    total = query.count()
    cars = query.offset((page - 1) * page_size).limit(page_size).all()
    results = []
    for c in cars:
        results.append({
            "id": c.id,
            "name": c.name,
            "brand": c.provider_name,
            "car_type": c.category,
            "type": c.type,
            "fuel": c.fuel,
            "transmission": c.transmission,
            "air_conditioning": c.air_conditioning,
            "seats": seats,
            "price_per_day": c.price,
            "image_url": c.image,
            "pickup_address": c.pickup_address
        })


    return {
        "items": results,
        "total": total,
        "page": page,
        "page_size": page_size,
    }
@app.get("/cars/{car_id}")
def get_car_by_id(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()

    if not car:
        return {"detail": "Not Found"}

    return {
        "id": car.id,
        "name": car.name,
        "brand": car.provider_name,
        "car_type": car.category,
        "type": car.type,
        "fuel": car.fuel,
        "transmission": car.transmission,
        "air_conditioning": car.air_conditioning,
        "price_per_day": car.price,
        "image_url": car.image,
        "pickup_address": car.pickup_address
    }

