"use client";

import "@/styles/appPromo.css";

export default function AppPromo() {
  return (
    <section className="app-promo">


      <div className="promo-phone-bg"></div>


      <div className="promo-content">
        <h2 className="promo-title">Get the app now</h2>

        <p className="promo-text">
          Find and book amazing rental deals anytime, anywhere,
          <br />
          with the Rent80 app. Try it today!
        </p>

        <button className="promo-btn">Install now</button>
      </div>
    </section>
  );
}
