import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Heart, Plane, Mail, Edit2, Check } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { bookings } = useBookings();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(
    user?.displayName || user?.email?.split("@")[0] || ""
  );
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <User className="h-16 w-16 text-muted-foreground" />
        <p className="font-fredoka text-2xl text-muted-foreground">Please sign in to view your profile</p>
        <Button onClick={() => navigate("/login")} className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
          Sign In
        </Button>
      </div>
    );
  }

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleSave = async () => {
    try {
      await updateProfile(displayName);
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto min-h-screen max-w-2xl px-4 py-8">
      <Card className="border-none shadow-xl">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24">
            <AvatarFallback className="bg-gradient-to-br from-primary to-globe-sky text-3xl font-bold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 font-fredoka text-2xl">{displayName}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-muted p-4 text-center">
              <Plane className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 font-fredoka text-2xl font-bold text-foreground">{confirmedBookings}</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <Heart className="mx-auto h-6 w-6 text-globe-coral" />
              <p className="mt-2 font-fredoka text-2xl font-bold text-foreground">{favorites.length}</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <span className="mx-auto block text-2xl">💰</span>
              <p className="mt-2 font-fredoka text-2xl font-bold text-foreground">${totalSpent}</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              {editing ? (
                <div className="flex gap-2">
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  <Button size="icon" onClick={handleSave} className="bg-globe-mint hover:bg-globe-mint/90">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-foreground">{displayName}</span>
                  <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
