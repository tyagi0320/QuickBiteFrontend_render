import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartService } from '../services/CartService';
import { FoodService } from '../services/FoodService';
import { TokenService } from '../services/TokenService';

interface CartContextType {
  cart: any[];
  allFoods: any[]; 
  addToCart: (food: any) => Promise<void>;
  updateQuantity: (cart_id: number, newQty: number) => Promise<void>;
  removeItem: (cart_id: number) => Promise<void>;
  cartCount: number;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [allFoods, setAllFoods] = useState<any[]>([]);

  // Fetch menu once on mount, then sync cart
  useEffect(() => {
    const initData = async () => {
      try {
        const foodList = await FoodService.foods();
        setAllFoods(foodList);
        await refreshCart();
      } catch (err) {
        console.error("Initial data load failed", err);
      }
    };
    initData();
  }, []);

  const refreshCart = useCallback(async () => {
  const token = TokenService.getAccessToken();
  const user = TokenService.decodeToken();

  // ONLY sync the cart if a token exists AND the user is NOT an admin
  if (token && user?.role === 'user') {
    try {
      const items = await CartService.getCartItems();
      setCart(items);
    } catch (err: any) {
      console.error("Cart sync failed:", err.response?.data?.detail || err.message);
    }
  } else {
    // Clear state for admins or guests
    setCart([]);
  }
},[]);

  const addToCart = async (food: any) => {
    try {
      await CartService.addToCart(food.id, 1);
      await refreshCart();
    } catch (err) { 
      console.error("Failed to add to cart", err); 
    }
  };

  const updateQuantity = async (cart_id: number, newQty: number) => {
    if (newQty < 1) return;
    
    // Optimistic UI Update: update state before API call
    const previousCart = [...cart];
    setCart(prev => prev.map(item => 
      item.id === cart_id ? { ...item, quantity: newQty } : item
    ));

    try {
      await CartService.updateCart(cart_id, newQty);
    } catch (err) {
      setCart(previousCart); // Rollback on failure
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (cart_id: number) => {
    try {
      await CartService.removeFromCart(cart_id);
      await refreshCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const clearCart = async () => {
    try {
      // Clear backend first (assuming item-by-item removal if no clear endpoint exists)
      await Promise.all(cart.map(item => CartService.removeFromCart(item.id)));
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cart, allFoods, addToCart, updateQuantity, 
      removeItem, cartCount, refreshCart, clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
