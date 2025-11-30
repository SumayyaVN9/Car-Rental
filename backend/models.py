from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)

    # Car details
    name = Column(String)
    category = Column(String)
    type = Column(String)
    transmission = Column(String)
    fuel = Column(String)
    air_conditioning = Column(Boolean)
    image = Column(String)

    # Provider details
    provider_name = Column(String)
    price = Column(Float)

    # Pickup details
    pickup_address = Column(String)
    pickup_lat = Column(Float)
    pickup_lng = Column(Float)

    # Dropoff details
    dropoff_address = Column(String)
    dropoff_lat = Column(Float)
    dropoff_lng = Column(Float)
