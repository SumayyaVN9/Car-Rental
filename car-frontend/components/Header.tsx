
import "@/styles/header.css";

export default function Header(){
  return (
    <div className="header">
      <div className="header-left">
        <img src="/assets/logo.png" alt="logo" className="logo-img" />

        <div className="logo-text">
          <div className="line1">Airport</div>
          <div className="line2">
            <span className="bold">Rental Cars</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="header-nav">
          <img src="/assets/internet.png" alt="lang" className="icon" />
          <span className="lang">EN</span>
        </div>
      </div>
    </div>
  );
}
