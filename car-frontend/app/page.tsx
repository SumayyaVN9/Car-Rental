import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandsStrip  from "@/components/BrandsStrip";
import TravelGuides from "@/components/TravelGuides";
import "@/styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="div-home">
      <Header />
      <HeroSection />
      </div>
      <BrandsStrip />
      <TravelGuides />
    </div>
  );
}
