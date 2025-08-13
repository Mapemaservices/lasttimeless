import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { FloatingCustomerCare } from "@/components/FloatingCustomerCare";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFeaturedProducts, useProductCategories, Product } from "@/hooks/useProducts";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin,
  Instagram,
  Facebook,
  Star,
  Users,
  Award,
  Shield
} from "lucide-react";

const Index = () => {
  const { data: featuredProducts, isLoading: isFeaturedLoading } = useFeaturedProducts();
  const { data: categories } = useProductCategories();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { data: settings } = useWebsiteSettings();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const categoryIcons = {
    'Straight': '🦱',
    'Curly': '🌊',
    'Body Wave': '〰️',
    'Bob': '💇‍♀️',
    'Braided': '🪢',
    'Bundles': '📦',
    'Fringe': '✂️',
    'Pixie': '🧚‍♀️',
    'Kinky Straight': '📏',
    'Kinky Curly': '🌀',
    'HD Lace': '✨',
    'Wavy': '🌊',
    'Afro': '🌺'
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#f8e1ff] via-[#f0f7ff] to-[#ffe1e1] animate-gradient-x overflow-x-hidden w-screen relative">
      <Navigation />
      {/* Hero Section - plain image only */}
      <section className="relative min-h-[600px] w-full overflow-hidden p-0 m-0">
        <Hero />
      </section>


  {/* Categories Section - shows available categories from database */}
  <section className="py-10 animate-fade-in-up">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Shop by Category</h2>
        <p className="text-lg text-muted-foreground">Browse our available categories</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {categories?.map(category => (
          <Button key={category} variant="outline" size="lg" className="text-base px-6 py-3" onClick={() => navigate(`/categories/${category}`)}>
            {categoryIcons[category as keyof typeof categoryIcons] || '💇‍♀️'} {category}
          </Button>
        ))}
      </div>
    </div>
  </section>

      {/* Super Styled Promotions Banner */}
      <div className="w-full flex justify-center mb-12 animate-fade-in-up">
        <div className="relative bg-gradient-to-br from-[#ffb700] via-[#ff4e00] to-[#ff007a] text-white rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center max-w-3xl border-4 border-white/30 z-30" style={{ transform: 'translateY(-40px)', boxShadow: '0 16px 48px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(255,78,0,0.15)' }}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#ff4e00] font-black text-lg px-6 py-2 rounded-full shadow-lg border-2 border-[#ffb700] animate-bounce">🔥 LIMITED TIME DEAL</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl tracking-tight">Flash Sale: 30% OFF</h2>
          <p className="text-lg md:text-2xl font-semibold mb-4 max-w-xl text-white/90">Get the best deals on our premium wigs. New arrivals and best sellers included. Don't miss out!</p>
          <div className="flex gap-4 mb-4">
            <button
              className="bg-white/20 px-4 py-2 rounded-full font-bold text-lg tracking-wide shadow hover:bg-white/40 transition"
              onClick={() => navigate('/shop')}
            >
              Today Only
            </button>
            <button
              className="bg-white/20 px-4 py-2 rounded-full font-bold text-lg tracking-wide shadow hover:bg-white/40 transition"
              onClick={() => navigate('/shop')}
            >
              Free Shipping
            </button>
          </div>
          <button
            className="mt-2 px-8 py-4 bg-white text-[#ff4e00] font-bold text-xl rounded-full shadow-lg hover:bg-[#ffb700] hover:text-white transition-all duration-200"
            onClick={() => navigate('/shop')}
          >
            Shop Flash Deals
          </button>
        </div>
      </div>
      {/* Featured Products - superstyled */}
      <section className="py-20 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary animate-fade-in-up">Featured Products</h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-4"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
              Hand-picked premium wigs that our customers love most
            </p>
          </div>
          {/* Quick Category Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 ${activeCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30'} md:px-6 md:py-3 md:text-base`}
              onClick={() => setActiveCategory('all')}
              aria-label="Show all categories"
            >
              All
            </button>
            {categories?.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 ${activeCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30'} md:px-6 md:py-3 md:text-base`}
                onClick={() => setActiveCategory(category)}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
            {isFeaturedLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-40 md:w-52 h-64 flex flex-col gap-2 animate-pulse" aria-busy="true" aria-label="Loading product">
                    <div className="bg-muted rounded-md h-40 md:h-52 w-full" />
                    <div className="bg-muted rounded-md h-6 w-3/4 mx-auto" />
                    <div className="bg-muted rounded-md h-4 w-1/2 mx-auto" />
                  </div>
                ))
              : featuredProducts
                  ?.filter(product => activeCategory === 'all' || product.category === activeCategory)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={() => setSelectedProduct(product)}
                      onAddToCart={() => setSelectedProduct(product)}
                    />
                  ))}
          </div>
          <div className="text-center">
            <Button variant="cta" size="xl" className="text-lg px-10 py-6" onClick={() => navigate('/shop')}>
              Shop All Products
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section - superstyled */}
  <section className="py-0 bg-gradient-to-br from-[#f0f7ff] to-[#fff0f7] animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* About section removed as requested */}
            {/* Removed empty space cards as requested */}
          </div>
        </div>
      </section>

      {/* Delivery & Payment Info - superstyled */}
      <section className="py-20 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary animate-fade-in-up">Delivery & Payment</h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-4"></div>
            <p className="text-xl text-muted-foreground animate-fade-in-up">
              Fast, reliable delivery across Kenya with secure payment options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center hover:shadow-2xl transition-shadow animate-fade-in-up">
              <CardContent className="p-10">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Truck className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
                <p className="text-muted-foreground mb-6">
                  Free delivery within Nairobi. Other counties: 5-14 days depending on location.
                </p>
                <Badge variant="outline">Nationwide Coverage</Badge>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-shadow animate-fade-in-up">
              <CardContent className="p-10">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <CreditCard className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">MPESA Payment</h3>
                <p className="text-muted-foreground mb-6">
                  Secure and convenient payments via MPESA
                </p>
                <div className="space-y-2 text-base">
                  <div><strong>Paybill:</strong> {settings?.mpesa_paybill || '522522'}</div>
                  <div><strong>Account:</strong> {settings?.mpesa_account || '1342330668'}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-2xl transition-shadow animate-fade-in-up">
              <CardContent className="p-10">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Shield className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                <p className="text-muted-foreground mb-6">
                  Your orders are safe and tracked from purchase to delivery.
                </p>
                <Badge variant="outline">Trusted Service</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Social Media - superstyled */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 animate-fade-in-up">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-secondary" />
                  <span className="text-lg">{settings?.contact_phone || '0768174878'}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-secondary" />
                  <span className="text-lg">{settings?.contact_email || 'timelessstrands@outlook.com'}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-secondary" />
                  <span className="text-lg">{settings?.contact_address || 'Starmall C1'}</span>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-6 animate-fade-in-up">Follow Us</h3>
                <div className="flex space-x-6">
                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@Timeless_Strands" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M12.75 2h2.25a.75.75 0 0 1 .75.75v2.25a4.5 4.5 0 0 0 4.5 4.5h.75A.75.75 0 0 1 22 10.25v2a.75.75 0 0 1-.75.75h-1.25a7.75 7.75 0 1 1-7.75-7.75V2.75A.75.75 0 0 1 12.75 2zm-2 5.5A6.25 6.25 0 1 0 17 13.75V12.5a.75.75 0 0 1 .75-.75h1.25a.75.75 0 0 1 .75.75v.25a8.75 8.75 0 1 1-8.75-8.75h.25a.75.75 0 0 1 .75.75v1.25a.75.75 0 0 1-.75.75h-.25z" fill="#000000"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/_timeless.strands/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" style={{ color: '#E4405F' }} />
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/TimelessStrands" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5" style={{ color: '#1877F3' }} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-8 animate-fade-in-up">Quick Links</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button variant="ghost" className="justify-start p-0 h-auto text-primary-foreground hover:text-secondary animate-fade-in-up">Shop All Wigs</Button>
                  <Button variant="ghost" className="justify-start p-0 h-auto text-primary-foreground hover:text-secondary animate-fade-in-up">Categories</Button>
                  <Button variant="ghost" className="justify-start p-0 h-auto text-primary-foreground hover:text-secondary animate-fade-in-up">Track Order</Button>
                </div>
                {/* Removed About Us, Contact, and Admin from footer quick links */}
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-16 pt-10 text-center animate-fade-in-up">
            <p className="text-primary-foreground/80 text-lg">
              © 2024 Timeless Strands. Developed by Mapema Softwares. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, pointerEvents: 'auto' }}>
        <FloatingCustomerCare />
      </div>
    </div>
  );
};

export default Index;
