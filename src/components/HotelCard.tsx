import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Hotel } from "@/data/hotels";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteButton from "@/components/FavoriteButton";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative h-48 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${hotel.color} opacity-30`} />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-globe-sun text-globe-sun" />
            <span className="text-xs font-bold text-foreground">{hotel.rating}</span>
          </div>
          <FavoriteButton hotelId={hotel.id} className="absolute left-3 top-3" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-fredoka text-lg font-semibold text-foreground">{hotel.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm">{hotel.city}, {hotel.country}</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-fredoka text-xl font-bold text-primary">${hotel.price}</span>
            <span className="text-sm text-muted-foreground">/ night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotelCard;
