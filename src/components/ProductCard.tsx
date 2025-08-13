import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useProducts";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const firstImage = product.product_media?.find(media => media.media_type === 'image')?.media_url;
  const minPrice = Math.min(...product.product_variants.map(v => v.price));
  const maxPrice = Math.max(...product.product_variants.map(v => v.price));
  const priceDisplay = minPrice === maxPrice ? `KSh ${minPrice.toLocaleString()}` : `KSh ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;

  return (
    <Card
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 w-36 md:w-52 animate-fade-in-up p-1 md:p-0"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      role="button"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onViewDetails?.(product);
        }
      }}
    >
  <div className="relative overflow-hidden w-full h-32 md:h-52">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            <Eye className="h-10 w-10" aria-label="No image available" />
          </div>
        )}
        {product.is_featured && (
          <Badge className="absolute top-1 left-1 bg-secondary text-secondary-foreground text-[10px] px-1 py-0.5">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2 md:gap-1">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 md:h-5 md:w-5"
              aria-label={`View details for ${product.name}`}
              onClick={() => onViewDetails?.(product)}
            >
              <Eye className="h-4 w-4 md:h-3 md:w-3" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 md:h-5 md:w-5"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => onAddToCart?.(product)}
            >
              <ShoppingCart className="h-4 w-4 md:h-3 md:w-3" />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-3 md:p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-[11px] md:text-xs px-2 py-1">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-2 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm mb-2 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm md:text-base font-bold text-foreground">
            {priceDisplay}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            {product.product_variants.length} variant{product.product_variants.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}