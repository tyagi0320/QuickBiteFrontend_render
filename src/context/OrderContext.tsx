import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { TokenService } from '../services/TokenService';
import { useCart } from './CartContext';
import type { Order } from '../interface/Order';
import { OrderService } from '../services/OrderService';

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  placeOrder: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  approveOrder: (orderId: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { refreshCart } = useCart();

  const fetchOrders = useCallback(async () => {
    const token = TokenService.getAccessToken();
    if (!token) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const data = await OrderService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch orders on mount/login
  useEffect(() => {
    const user = TokenService.decodeToken();
    // Only fetch if a user is logged in (works for both 'admin' and 'user' roles)
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [fetchOrders]);

  const placeOrder = async () => {
    try {
      await OrderService.placeOrder();
      await fetchOrders(); // Updates the list to show the new 'pending' order
      await refreshCart(); // Backend hasn't cleared it yet, but syncs local state
    } catch (err) {
      console.error("Checkout failed", err);
      throw err;
    }
  };

  const approveOrder = async (orderId: number) => {
    try {
      await OrderService.updateOrderStatus(orderId, 'approved');
      await fetchOrders(); // Updates UI to show 'approved'
      await refreshCart(); // IMPORTANT: Backend deleted cart items now, so sync UI
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, loading, placeOrder, fetchOrders, approveOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
