import "@/styles/hero.css";
import SearchCard from "./SearchCard";

export default function HeroSection(){
  return (
    <div className="hero-container">
      <div className="hero-left">
        <SearchCard />
      </div>

      <div className="hero-right">
        <img src="/assets/phone.png" className="phone-img" alt="phone" />
      </div>
    </div>
  );
}
