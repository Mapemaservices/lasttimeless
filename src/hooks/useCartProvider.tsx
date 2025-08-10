import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Product } from "@/hooks/useProducts";

export interface CartItem {
  product: Product;
  variant: {
    id: string;
    style: string;
    colour: string;
    inch: string;
    density: string;
    lace_size: string;
    price: number;
  };
  quantity: number;
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: any, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('timeless-strands-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeless-strands-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, variant: any, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.variant.id === variant.id
      );
      if (existingItemIndex > -1) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prev, { product, variant, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product.id === productId && item.variant.id === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
