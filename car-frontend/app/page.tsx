import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandsStrip  from "@/components/BrandsStrip";
import "@/styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <BrandsStrip />
    </div>
  );
}
