"use client";

import "@/styles/topplaces.css";

const PLACES = [
  { name: "Paris", img: "/assets/places/paris.jpg" },
  { name: "Rome", img: "/assets/places/rome.jpg" },
  { name: "Amsterdam", img: "/assets/places/amsterdam.jpg" },
  { name: "Barcelona", img: "/assets/places/barcelona.jpg" },
  { name: "London", img: "/assets/places/london.jpg" },
  { name: "Berlin", img: "/assets/places/berlin.jpg" },
  { name: "Lisbon", img: "/assets/places/lisbon.jpg" },
  { name: "Prague", img: "/assets/places/prague.jpg" },
];

export default function TopPlaces() {
  return (
    <section className="tp-section">
      <h2 className="tp-title">Top places to visit</h2>

      <div className="tp-grid">
        {PLACES.map((place, i) => (
          <div key={i} className="tp-card">
            <img src={place.img} className="tp-img" alt={place.name} />
            <p className="tp-name">{place.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
