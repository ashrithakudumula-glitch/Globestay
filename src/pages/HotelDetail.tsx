import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { hotels } from "@/data/hotels";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CalendarIcon, MapPin, Star, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FavoriteButton from "@/components/FavoriteButton";
import PaymentModal from "@/components/PaymentModal";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const hotel = hotels.find((h) => h.id === id);

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBooking, setLastBooking] = useState<{ cardLast4: string; paymentMethod: string } | null>(null);

  if (!hotel) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-fredoka text-2xl text-muted-foreground">Hotel not found</p>
      </div>
    );
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const total = nights * hotel.price;

  const handleBook = () => {
    if (!user) {
      toast.info("Please sign in to book a hotel");
      navigate("/login", { state: { from: `/hotel/${hotel.id}` } });
      return;
    }
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = (cardLast4: string, paymentMethod: string) => {
    setShowPayment(false);
    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      city: hotel.city,
      country: hotel.country,
      checkIn: checkIn!,
      checkOut: checkOut!,
      nights,
      totalPrice: total,
      cardLast4,
      paymentMethod,
    });
    setLastBooking({ cardLast4, paymentMethod });
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
        <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${hotel.color} opacity-40`} />
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <FavoriteButton hotelId={hotel.id} className="absolute right-4 top-4 h-10 w-10" />
      </div>

      <div className="container mx-auto -mt-16 px-4 pb-12">
        <div className="rounded-2xl bg-card p-6 shadow-xl md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-fredoka text-3xl font-bold text-foreground md:text-4xl">{hotel.name}</h1>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{hotel.city}, {hotel.country}</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-globe-sun text-globe-sun" />
                <span className="font-semibold text-foreground">{hotel.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-fredoka text-3xl font-bold text-primary">${hotel.price}</span>
              <span className="text-muted-foreground"> / night</span>
            </div>
          </div>

          {/* Date Pickers */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(date) => date < (checkIn || new Date())} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {nights > 0 && (
            <div className="mt-6 rounded-xl bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{nights} night{nights > 1 ? "s" : ""} × ${hotel.price}</span>
                <span className="font-fredoka text-2xl font-bold text-primary">${total}</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleBook}
            disabled={!checkIn || !checkOut || nights <= 0}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-globe-coral py-6 font-fredoka text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          >
            Book Now ✈️
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        total={total}
        hotelName={hotel.name}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-globe-mint to-secondary">
              <Check className="h-8 w-8 text-secondary-foreground" />
            </div>
            <DialogTitle className="font-fredoka text-2xl">Booking Confirmed! 🎉</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4 space-y-2 text-left">
                <p><strong>Hotel:</strong> {hotel.name}</p>
                <p><strong>Location:</strong> {hotel.city}, {hotel.country}</p>
                {checkIn && <p><strong>Check-in:</strong> {format(checkIn, "PPP")}</p>}
                {checkOut && <p><strong>Check-out:</strong> {format(checkOut, "PPP")}</p>}
                <p><strong>Payment:</strong> •••• {lastBooking?.cardLast4}</p>
                <p><strong>Total:</strong> <span className="font-bold text-primary">${total}</span></p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => { setShowConfirmation(false); navigate("/bookings"); }}
              variant="outline"
              className="flex-1 rounded-full font-semibold"
            >
              View Bookings
            </Button>
            <Button
              onClick={() => { setShowConfirmation(false); navigate("/"); }}
              className="flex-1 rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold"
            >
              Back to Hotels
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDetail;
