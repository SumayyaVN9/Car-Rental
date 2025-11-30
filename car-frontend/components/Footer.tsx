"use client";

import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">

      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="news-left">
          <h3>Be the first one to know when the price drops</h3>
          <p>Unsubscribe any time</p>
        </div>

        <div className="news-right">
          <input type="email" placeholder="Enter your mail" className="news-input" />
          <button className="news-btn">Join</button>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">

        {/* Logo */}
        <div className="brand-left">
          <div className="brand-box">
            <img src="/assets/logo.png" className="logo-img" />
            <div className="logo-text">
              <span className="line1">Airport</span>
              <span className="line2">Rental Cars</span>
            </div>
          </div>

          <select className="currency-select">
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
          </select>
        </div>



        {/* Links */}
        <div className="footer-links">
          <a>Privacy policy</a>
          <a>Terms & conditions</a>
          <a>Cookies policy</a>
          <a>About us</a>
          <a>Contact</a>
        </div>

        {/* Social */}
        <div className="footer-social">
          <img src="/assets/facebook.png" alt="" />
          <img src="/assets/twitter.png" alt="" />
          <img src="/assets/instagram.png" alt="" />
        </div>
      </div>

      {/* COPYRIGHT */}
      {/* <div className="footer-bottom">
        <p>© Copyright 2025 - Airport rental car</p>
      </div> */}

    </footer>
  );
}
