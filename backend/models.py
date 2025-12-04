from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)


    name = Column(String)
    category = Column(String)        
    type = Column(String)            
    transmission = Column(String)
    fuel = Column(String)
    air_conditioning = Column(Boolean)
    image = Column(String)

    provider_name = Column(String)
    price = Column(Float)

  
    pickup_address = Column(String)
    pickup_lat = Column(Float)
    pickup_lng = Column(Float)

  
    dropoff_address = Column(String)
    dropoff_lat = Column(Float)
    dropoff_lng = Column(Float)

   

   

 