import Categories from "@/components/home/categories";
import CitySection from "@/components/home/city-section";
import Hero from "@/components/home/hero";
import TrustStats from "@/components/home/trust-stats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <TrustStats />
      <CitySection />
    </div>
  );
}
