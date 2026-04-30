import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  apiGetBookings,
  apiCreateBooking,
  apiCancelBooking,
  BookingPayload,
} from "@/lib/api";
import { useAuth } from "./AuthContext";

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  totalPrice: number;
  status: "confirmed" | "cancelled";
  createdAt: Date;
  paymentMethod: string;
  cardLast4: string;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  loading: false,
  addBooking: async () => {},
  cancelBooking: async () => {},
});

export const useBookings = () => useContext(BookingContext);

const toBooking = (raw: any): Booking => ({
  ...raw,
  id: raw._id ?? raw.id,
  checkIn: new Date(raw.checkIn),
  checkOut: new Date(raw.checkOut),
  createdAt: new Date(raw.createdAt),
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }
    setLoading(true);
    apiGetBookings()
      .then((data) => setBookings(data.map(toBooking)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const addBooking = async (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
    const payload: BookingPayload = {
      ...booking,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
    };
    const created = await apiCreateBooking(payload);
    setBookings((prev) => [toBooking(created), ...prev]);
  };

  const cancelBooking = async (id: string) => {
    const updated = await apiCancelBooking(id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? toBooking(updated) : b))
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, loading, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
