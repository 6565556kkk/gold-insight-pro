import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      isActive(path) ? "text-gold" : "text-foreground/70 hover:text-foreground"
    }`;

  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/market", label: "Market Data" },
  ];

  const authLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/market", label: "Market Data" },
    { to: "/forecast", label: "Forecast" },
    { to: "/explainability", label: "SHAP" },
  ];

  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gold-gradient flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">G</span>
          </div>
          <span className="font-display text-lg font-semibold text-foreground">GoldInsight</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
              <button onClick={handleSignOut} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/signin" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-lg gold-gradient text-primary-foreground hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className={linkClass(l.to)} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="text-sm text-left text-muted-foreground">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/signin" className="text-sm text-foreground/70" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="text-sm text-gold font-medium" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
