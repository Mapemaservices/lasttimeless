import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { Award, Users, Shield, Heart } from "lucide-react";

const About = () => {
  const { data: settings } = useWebsiteSettings();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Timeless Strands</h1>
            <p className="text-xl text-muted-foreground">
              Kenya's premier destination for premium quality wigs
            </p>
          </div>

          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {settings?.about_text || "Timeless Strands is Kenya's premier wig retailer, offering high-quality wigs for every style and occasion. We are committed to providing our customers with beautiful, authentic wigs that enhance their natural beauty and boost their confidence."}
            </p>
          </div>

          {/* Removed placeholder card spaces */}

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To empower individuals by providing them with high-quality wigs that enhance their confidence 
              and allow them to express their unique style. We believe everyone deserves to look and feel their best.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;