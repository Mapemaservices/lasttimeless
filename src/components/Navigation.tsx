import logo from "@/assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/CartDrawer";
import { Menu, Search, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductCategories } from "@/hooks/useProducts";

export function Navigation() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    if (categoriesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoriesOpen]);
  const navigate = useNavigate();
  const { data: categories } = useProductCategories();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-[20px] md:text-[18px] lg:text-[20px]">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-20 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-16 w-16 md:h-14 md:w-14 rounded-xl cursor-pointer" />
          </Link>
          {/* Navigation Items */}
          <div className="flex-1 flex items-center justify-center px-4 space-x-6">
            {navItems.map(item => (
              <Link key={item.name} to={item.href} className="hover:text-accent font-semibold transition-colors duration-200">
                {item.name}
              </Link>
            ))}
            {/* Categories Dropdown - click to open */}
            <div className="relative" ref={categoriesRef}>
              <button
                className="flex items-center font-semibold hover:text-accent transition-colors duration-200"
                onClick={() => setCategoriesOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={categoriesOpen}
              >
                Categories <ChevronDown className="ml-1 h-5 w-5" />
              </button>
              {categoriesOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {categories?.map(category => (
                    <Link
                      key={category}
                      to={`/categories/${category}`}
                      className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors duration-150"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Search Bar */}
          <form className="flex items-center space-x-4" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              className="w-full max-w-md px-4 py-2 rounded border border-border text-lg"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
            <Button variant="ghost" size="icon" className="ml-2" type="submit" aria-label="Search">
              <Search className="h-6 w-6" />
            </Button>
            <CartDrawer onCheckout={() => navigate('/checkout')} />
          </form>
        </div>
      </div>
    </nav>
  );
}