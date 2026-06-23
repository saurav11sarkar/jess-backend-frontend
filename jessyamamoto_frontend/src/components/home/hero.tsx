"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShieldCheck, Star, Headphones, MapPin, CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";

interface Category {
  _id: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  data: Category[];
}

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Vetted & Verified",
    description: "Every partner is screened and trusted",
  },
  {
    icon: Star,
    title: "Highly Rated",
    description: "Real reviews from real families",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here whenever you need us",
  },
];

const popularCities = ["Bangkok", "Bali", "Singapore", "Siem Reap", "Hong Kong", "Taipei"];

const Hero = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [careType, setCareType] = useState("");
  const [date, setDate] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["hero-categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      const json: ApiResponse = await res.json();
      return json.success ? json.data : [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = () => {
    if (careType) {
      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (date) params.set("date", date);
      router.push(`/all-find-care?id=${careType}&${params.toString()}`);
    } else {
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCityClick = (cityName: string) => {
    setCity(cityName);
  };

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16">
      <div className="container relative px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            More than a booking.
            <span className="mt-2 block text-primary">
              Real peace of mind.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            JetSet Cares connects families with trusted childcare, pet care, and
            family support in the places that matter. Safety. Reliability.
            Professionalism. Everywhere in Asia.
          </p>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-3 shadow-lg sm:p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="City or destination"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-muted pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <select
                  value={careType}
                  onChange={(e) => setCareType(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border bg-muted px-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                >
                  <option value="">Type of care</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-muted pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleSearch}
                className="h-12 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_8px_24px_hsl(var(--primary)/0.3)] transition-all hover:opacity-90"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {popularCities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCityClick(c)}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={handleSearch}
              className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_12px_30px_hsl(var(--primary)/0.28)] transition-all hover:opacity-90"
            >
              Find Care Now
            </Button>
            <Button
              onClick={() => router.push("/find-job/1?role=find job")}
              variant="outline"
              className="h-12 rounded-full border-2 border-primary px-8 text-base font-semibold text-primary transition-all hover:bg-primary/10"
            >
              Become a Partner
            </Button>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
