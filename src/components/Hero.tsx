import { Button } from "@/components/ui/button";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";
import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";

export function Hero() {
  const { data: settings } = useWebsiteSettings();
  const navigate = useNavigate();

  // Carousel logic
  const images = [heroBackground, img1, img2, img3, img4, img5];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[600px] md:min-h-[600px] min-h-screen w-full overflow-hidden flex items-center justify-center">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="Wigs collection background"
          loading="lazy"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${bgIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 1, minHeight: '100vh', minWidth: '100vw' }}
        />
      ))}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 py-12">
        {/* Top Badge */}
        <div className="max-w-4xl w-full flex flex-col items-center gap-6">
          {/* Removed '#1 Premium Wigs in Kenya' badge */}

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight mb-2">
            Discover Your Perfect
            <br className="hidden md:block" />
            <span className="text-secondary block md:inline">Wig Collection</span>
          </h1>


          {/* Features Row */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4">
            <span className="flex items-center gap-2 text-white text-sm md:text-base bg-black/60 rounded-full px-4 py-2 font-semibold shadow"><span role='img' aria-label='target'>🎯</span> 100% Human Hair</span>
            <span className="flex items-center gap-2 text-white text-sm md:text-base bg-black/60 rounded-full px-4 py-2 font-semibold shadow">5-14 Days Delivery</span>
            <span className="flex items-center gap-2 text-white text-sm md:text-base bg-black/60 rounded-full px-4 py-2 font-semibold shadow"><span role='img' aria-label='diamond'>💎</span> Premium Quality</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
            <button className="bg-primary text-white font-bold px-8 py-3 rounded-lg text-lg shadow hover:bg-primary/90 transition" onClick={() => window.location.href='/shop'}>Shop Now</button>
            <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg text-lg shadow hover:bg-secondary/10 transition" onClick={() => window.location.href='/categories'}>View Collection</button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">1000+</div>
              <div className="text-xs md:text-base text-white/80 font-medium">Happy Customers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">5.0</div>
              <div className="text-xs md:text-base text-white/80 font-medium">Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">2+</div>
              <div className="text-xs md:text-base text-white/80 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}