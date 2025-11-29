import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import "@/styles/home.css";

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <Header />
      <HeroSection />
    </div>
  );
}
