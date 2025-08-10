import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCartProvider";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Star, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!product) return null;

  const firstImage = product.product_media?.find(media => media.media_type === 'image')?.media_url;
  const minPrice = Math.min(...product.product_variants.map(v => v.price));
  const maxPrice = Math.max(...product.product_variants.map(v => v.price));
  const priceDisplay = minPrice === maxPrice ? `KSh ${minPrice.toLocaleString()}` : `KSh ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Please select a variant",
        description: "Choose style, color, and other options before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedVariant, quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
    onClose();
  };

  const handleOrderNow = () => {
    if (!selectedVariant) {
      toast({
        title: "Please select a variant",
        description: "Choose style, color, and other options before ordering.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            {firstImage ? (
              <img
                src={firstImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No Image Available</span>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              {product.is_featured && (
                <Badge className="ml-2 bg-secondary text-secondary-foreground">
                  Featured
                </Badge>
              )}
              
              <div className="text-2xl font-bold mt-2">
                {selectedVariant
                  ? `KSh ${(selectedVariant.price * quantity).toLocaleString()}${quantity > 1 ? ` (${quantity} × KSh ${selectedVariant.price.toLocaleString()})` : ''}`
                  : priceDisplay}
              </div>
              
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(4.8/5)</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">{product.description}</p>
            
            {/* Variant Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Variant:</label>
                <Select onValueChange={(value) => {
                  const variant = product.product_variants.find(v => v.id === value);
                  setSelectedVariant(variant);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose style, color, and size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.product_variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.style} • {variant.colour} • {variant.inch}" • {variant.density} - KSh {variant.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedVariant && (
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                  <div><strong>Style:</strong> {selectedVariant.style}</div>
                  <div><strong>Color:</strong> {selectedVariant.colour}</div>
                  <div><strong>Length:</strong> {selectedVariant.inch}"</div>
                  <div><strong>Density:</strong> {selectedVariant.density}</div>
                  <div><strong>Lace Size:</strong> {selectedVariant.lace_size}</div>
                  <div><strong>In Stock:</strong> {selectedVariant.quantity} units</div>
                </div>
              )}
              
              {/* Quantity Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity:</label>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={selectedVariant && quantity >= selectedVariant.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1" 
                onClick={handleOrderNow}
                disabled={!selectedVariant}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Now
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}