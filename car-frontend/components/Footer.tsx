"use client";

import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">

      {/* --- NEWSLETTER BAR --- */}
      <div className="newsletter">
        <div className="news-left">
          <h3>Be the first one to know when the price drops</h3>
          <p>Unsubscribe any time</p>
        </div>

        <div className="news-right">
          <input
            type="email"
            placeholder="Enter your mail"
            className="news-input"
          />
          <button className="news-btn">Join</button>
        </div>
      </div>


      {/* --- FOOTER MAIN --- */}
      <div className="footer-main">

        {/* LEFT BRAND AREA */}
        <div className="brand-box">
          <img src="/assets/logo.png" className="brand-icon" />
          <div className="brand-text">
            <strong>Airport</strong>
            <span>Rental Cars</span>
          </div>
        </div>

        <select className="currency-select">
          <option>USD</option>
          <option>EUR</option>
          <option>INR</option>
        </select>

        {/* NAV LINKS */}
        <div className="footer-links">
          <a>Privacy policy</a>
          <a>Terms & conditions</a>
          <a>Cookies policy</a>
          <a>About us</a>
          <a>Contact</a>
        </div>

        {/* SOCIAL ICONS */}
        <div className="footer-social">
          <img src="/assets/facebook.png" />
          <img src="/assets/twitter.png" />
          <img src="/assets/instagram.png" />
        </div>
      </div>

      <p className="copyright">
        © Copyright 2025 - Airport rental car
      </p>

    </footer>
  );
}
