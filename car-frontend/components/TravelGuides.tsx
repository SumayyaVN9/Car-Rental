"use client";

import "@/styles/travelguides.css";

const guides = [
  {
    img: "/assets/g1.png",
    title: "Rental Company's Contact Information",
    text: "Always have the rental company's phone number handy. Most offer 24/7 support for emergencies or questions."
  },
  {
    img: "/assets/g2.png",
    title: "Fuel Up Before Returning",
    text: "Make sure to fill the gas tank before returning the car to avoid additional refueling and service fees."
  },
  {
    img: "/assets/g3.png",
    title: "Choose the Right Fuel Type",
    text: "In some countries, diesel engines are more cost-efficient than gasoline. Check fuel types when selecting your car."
  },
  {
    img: "/assets/g4.png",
    title: "Return the Car on Time",
    text: "Late returns can result in added fees. Plan for extra buffer time, especially in unfamiliar areas."
  },
  {
    img: "/assets/g5.png",
    title: "Inspect the Vehicle Before Departure",
    text: "Before you drive off, check for pre-existing damage and ensure everything is in working order."
  },
  {
    img: "/assets/g6.png",
    title: "Adapt to Driving Conditions",
    text: "Adjust your driving and car selection to match the terrain and weather. Ask the rental company for guidance."
  },
];

export default function TravelGuides() {
  return (
    <section className="travel-guides-section">
      <h2 className="tg-title">Recommended Travel Guides</h2>
      <p className="tg-subtitle">
        Car rentals have surged in popularity for their affordability and convenience,
        offering options from luxury to practical rides. Before you book, here are key tips to keep in mind.
      </p>

      <div className="tg-grid">
        {guides.map((g, i) => (
          <div key={i} className="tg-card">
            <img src={g.img} className="tg-img" />

            <div className="tg-content">
              <h3 className="tg-card-title">{g.title}</h3>
              <p className="tg-card-text">{g.text}</p>
            </div>
          </div>
        ))}


        <div className="tg-banner">
          <img src="/assets/g-banner.png" className="tg-banner-img" />
          <div className="tg-banner-text">
            <h2>Where to next ?</h2>
            <p>Start your road trip with Airport rental cars with exciting offers</p>

            <button className="tg-banner-btn">Find your car now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
