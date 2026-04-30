import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiGetFavorites, apiToggleFavorite } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (hotelId: string) => Promise<void>;
  isFavorite: (hotelId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    apiGetFavorites().then(setFavorites).catch(console.error);
  }, [user]);

  const toggleFavorite = async (hotelId: string) => {
    const updated = await apiToggleFavorite(hotelId);
    setFavorites(updated);
  };

  const isFavorite = (hotelId: string) => favorites.includes(hotelId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
