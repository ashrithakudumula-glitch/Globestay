import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import HotelDetail from "./pages/HotelDetail";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <FavoritesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/hotel/:id" element={<HotelDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/bookings" element={<MyBookings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </FavoritesProvider>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
