import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandsStrip  from "@/components/BrandsStrip";
import TravelGuides from "@/components/TravelGuides";
import TopPlaces from "@/components/TopPlaces";
import AppPromo from "@/components/AppPromo";
import Footer from "@/components/Footer";
import "@/styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="div-home">
      <Header />
      <HeroSection />
      </div>
      <BrandsStrip />
      <TopPlaces />
      <AppPromo />
      <TravelGuides />
      <Footer />
      
    </div>
  );
}
