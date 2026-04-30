import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favorites } = useFavorites();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Heart className="h-16 w-16 text-muted-foreground" />
        <p className="font-fredoka text-2xl text-muted-foreground">Please sign in to view your favorites</p>
        <Button onClick={() => navigate("/login")} className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
          Sign In
        </Button>
      </div>
    );
  }

  const favoriteHotels = hotels.filter((h) => favorites.includes(h.id));

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="font-fredoka text-3xl font-bold text-foreground">❤️ My Favorites</h1>
      <p className="mt-2 text-muted-foreground">
        {favoriteHotels.length} saved hotel{favoriteHotels.length !== 1 ? "s" : ""}
      </p>

      {favoriteHotels.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Heart className="h-20 w-20 text-muted-foreground/40" />
          <p className="font-fredoka text-xl text-muted-foreground">No favorites yet</p>
          <p className="text-muted-foreground">Tap the heart icon on any hotel to save it here!</p>
          <Button onClick={() => navigate("/")} className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
            Browse Hotels
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
