import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/CartDrawer";
import { Menu, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-[20px] md:text-[18px] lg:text-[20px]">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-20 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 md:h-8 md:w-8 rounded" />
            <span className="text-2xl md:text-2xl font-bold text-foreground">Timeless Strands</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CartDrawer onCheckout={() => navigate('/checkout')} />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <CartDrawer onCheckout={() => navigate('/checkout')} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open navigation menu"
                  className="border-2 border-primary bg-white shadow-lg md:hidden flex items-center justify-center"
                  style={{ minWidth: 56, minHeight: 56 }}
                >
                  <Menu className="h-12 w-12 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90vw] max-w-sm">
                <div className="flex flex-col space-y-6 mt-10">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-3xl font-bold text-foreground hover:text-secondary transition-colors py-4"
                      style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)' }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}