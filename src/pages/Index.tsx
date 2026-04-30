import { useState } from "react";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";
import { Input } from "@/components/ui/input";
import { Search, Plane, Globe, Palmtree } from "lucide-react";

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-globe-coral to-globe-sun px-4 py-20 text-center">
        <div className="absolute -left-10 top-10 animate-float opacity-20">
          <Plane className="h-20 w-20 text-primary-foreground" />
        </div>
        <div className="absolute -right-5 bottom-10 animate-float opacity-20" style={{ animationDelay: "1s" }}>
          <Globe className="h-24 w-24 text-primary-foreground" />
        </div>
        <div className="absolute left-1/4 bottom-5 animate-float opacity-15" style={{ animationDelay: "2s" }}>
          <Palmtree className="h-16 w-16 text-primary-foreground" />
        </div>

        <h1 className="font-fredoka text-5xl font-bold text-primary-foreground md:text-6xl">
          Explore. Stay. Enjoy.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
          Discover handpicked hotels in the world's most stunning destinations.
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-card/95 px-4 py-2 shadow-xl backdrop-blur-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by city, country, or hotel name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-fredoka text-3xl font-bold text-foreground">
          🌍 Featured Hotels
        </h2>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} destinations waiting for you
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-fredoka text-2xl text-muted-foreground">No hotels found 😢</p>
            <p className="mt-2 text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
