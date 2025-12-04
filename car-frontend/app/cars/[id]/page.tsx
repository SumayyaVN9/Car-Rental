
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/details.css";

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`https://car-rental-pfwk.onrender.com/cars/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!car) return <p className="error">Car not found.</p>;

  return (
    <div className="details-container">


      <button className="back-btn" onClick={() => router.push("/result")}>
    ← Back
  </button>


  
      <div className="details-image-box">
        <img src={car.image_url} alt={car.name} className="details-image" />
      </div>

 
      <div className="details-info">
        <h1 className="details-title">{car.name}</h1>
        <p className="details-sub">
          {car.brand} • {car.car_type?.toUpperCase()}
        </p>

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
            <span className="item-value">{car.transmission || "Automatic"}</span>
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

          <button className="book-btn" onClick={() => setShowPopup(true)}>
            Book Now
          </button>
        </div>
      </div>


      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>🎉 Booking Confirmed!</h2>
            <p>Your {car.name} has been successfully booked.</p>
            <button
              className="close-popup"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
