import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, MapPin, CreditCard, XCircle, Plane } from "lucide-react";
import { toast } from "sonner";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Plane className="h-16 w-16 text-muted-foreground" />
        <p className="font-fredoka text-2xl text-muted-foreground">Please sign in to view your bookings</p>
        <Button onClick={() => navigate("/login")} className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
          Sign In
        </Button>
      </div>
    );
  }

  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast.success("Booking cancelled successfully");
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="font-fredoka text-3xl font-bold text-foreground">✈️ My Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        {confirmed.length} active booking{confirmed.length !== 1 ? "s" : ""}
      </p>

      {bookings.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Plane className="h-20 w-20 text-muted-foreground/40" />
          <p className="font-fredoka text-xl text-muted-foreground">No bookings yet</p>
          <p className="text-muted-foreground">Start exploring hotels and book your next adventure!</p>
          <Button onClick={() => navigate("/")} className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
            Browse Hotels
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {confirmed.length > 0 && (
            <div>
              <h2 className="mb-4 font-fredoka text-xl font-semibold text-foreground">Active Bookings</h2>
              <div className="space-y-4">
                {confirmed.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} />
                ))}
              </div>
            </div>
          )}
          {cancelled.length > 0 && (
            <div>
              <h2 className="mb-4 font-fredoka text-xl font-semibold text-muted-foreground">Cancelled</h2>
              <div className="space-y-4 opacity-60">
                {cancelled.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BookingCard = ({
  booking,
  onCancel,
}: {
  booking: import("@/contexts/BookingContext").Booking;
  onCancel?: (id: string) => void;
}) => (
  <Card className="border-none shadow-lg">
    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-fredoka text-lg font-semibold text-foreground">{booking.hotelName}</h3>
          <Badge variant={booking.status === "confirmed" ? "default" : "destructive"} className="text-xs">
            {booking.status}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {booking.city}, {booking.country}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            {format(booking.checkIn, "MMM d")} — {format(booking.checkOut, "MMM d, yyyy")}
          </span>
          <span>{booking.nights} night{booking.nights > 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CreditCard className="h-3.5 w-3.5" />
          •••• {booking.cardLast4}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="font-fredoka text-2xl font-bold text-primary">${booking.totalPrice}</span>
        {booking.status === "confirmed" && onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(booking.id)}
            className="text-destructive hover:text-destructive"
          >
            <XCircle className="mr-1 h-4 w-4" /> Cancel
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default MyBookings;
