import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, LogOut, User, Heart, Plane, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-globe-sky">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-fredoka text-2xl font-bold text-foreground">
            Globe<span className="text-primary">Stay</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/favorites" className="hidden sm:block">
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/bookings" className="hidden sm:block">
                <Button variant="ghost" size="icon">
                  <Plane className="h-4 w-4" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="hidden text-sm font-medium text-foreground sm:inline">
                      {user.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="flex items-center gap-2">
                      <Plane className="h-4 w-4" /> My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" /> Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button className="rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link to={link.to}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
