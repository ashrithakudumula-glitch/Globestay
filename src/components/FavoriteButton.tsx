import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FavoriteButton = ({ hotelId, className }: { hotelId: string; className?: string }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fav = isFavorite(hotelId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("Please sign in to save favorites");
      navigate("/login");
      return;
    }
    toggleFavorite(hotelId);
    toast.success(fav ? "Removed from favorites" : "Added to favorites ❤️");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-all hover:scale-110",
        className
      )}
    >
      <Heart className={cn("h-4 w-4 transition-colors", fav ? "fill-globe-coral text-globe-coral" : "text-muted-foreground")} />
    </button>
  );
};

export default FavoriteButton;
