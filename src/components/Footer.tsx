import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-globe-sky">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-fredoka text-lg font-bold text-foreground">
              Globe<span className="text-primary">Stay</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Making travel dreams come true, one stay at a time.</p>
        </div>
        <div>
          <h4 className="font-fredoka font-semibold text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Hotels</Link></li>
            <li><Link to="/favorites" className="hover:text-foreground">Favorites</Link></li>
            <li><Link to="/bookings" className="hover:text-foreground">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-fredoka font-semibold text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-fredoka font-semibold text-foreground">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><span className="cursor-default">Privacy Policy</span></li>
            <li><span className="cursor-default">Terms of Service</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © 2024 GlobeStay. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
