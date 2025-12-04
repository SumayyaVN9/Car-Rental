"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/details.css";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`https://car-rental-pfwk.onrender.com/cars/${id}`);
      const data = await res.json();
      setCar(data);
      setLoading(false);
    }
    fetchCar();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!car) return <p className="error">Car not found.</p>;

  return (
    <div className="details-container">
      
   
      <div className="details-image-box">
        <img src={car.image_url} alt={car.name} className="details-image" />
      </div>

     
      <div className="details-info">
        <h1 className="details-title">{car.name}</h1>
        <p className="details-sub">{car.brand} • {car.car_type?.toUpperCase()}</p>

        <div className="details-grid">

          <div className="details-item">
            <span className="item-label">Fuel</span>
            <span className="item-value">{car.fuel}</span>
          </div>

          <div className="details-item">
            <span className="item-label">Seats</span>
            <span className="item-value">{car.seats}</span>
          </div>

          <div className="details-item">
            <span className="item-label">Transmission</span>
            <span className="item-value">Automatic</span>
          </div>

          <div className="details-item">
            <span className="item-label">Type</span>
            <span className="item-value">{car.car_type}</span>
          </div>

          <div className="details-item">
            <span className="item-label">Pickup</span>
            <span className="item-value">{car.pickup_address}</span>
          </div>

        </div>

        <div className="details-bottom">
          <div className="price-box">
            <span className="price">₹{car.price_per_day}</span>
            <span className="per-day">/day</span>
          </div>

          <button className="book-btn">
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
}
