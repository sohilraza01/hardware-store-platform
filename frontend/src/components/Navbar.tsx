import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Menu, X, User, LogOut, ShieldCheck, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Button asChild className="rounded-none font-bold uppercase tracking-wider">
            <Link href="/contact">Get Quote</Link>
          </Button>

          {/* Cart Icon */}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 hover:text-primary transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Login / User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none flex items-center gap-2">
                  <User size={16} />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                      <ShieldCheck size={16} className="mr-2 text-primary" />
                      Admin Panel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User size={16} className="mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")} className="cursor-pointer">
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="rounded-none font-bold uppercase tracking-wider"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </nav>

        {/* Mobile: Cart + Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 hover:text-primary transition-colors"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <button
            className="text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block text-lg font-medium py-2 transition-colors ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button asChild className="rounded-none">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>

              {user ? (
                <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Logged in as <span className="font-semibold text-foreground">{user.name}</span>
                  </p>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-primary font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShieldCheck size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/orders"
                    className="text-foreground font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 font-medium text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                  <Button
                    className="rounded-none"
                    onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-none"
                    onClick={() => { navigate("/register"); setIsMobileMenuOpen(false); }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}