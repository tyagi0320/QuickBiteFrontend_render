import axios from 'axios';
import { TokenService } from './TokenService';
import type { Order, OrderUpdateStatus } from '../interface/Order';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/orders`;

const getAuthHeader = () => {
  const token = TokenService.getAccessToken();
  return { Authorization: `Bearer ${token}` };
};

export const OrderService = {
  placeOrder: async (): Promise<Order> => {
    const response = await axios.post(
      `${API_URL}/`, 
      {}, 
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await axios.get(
      `${API_URL}/`, 
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<Order> => {
    const payload: OrderUpdateStatus = { status: status as any };
    const response = await axios.put(
      `${API_URL}/${orderId}`, 
      payload, 
      { headers: getAuthHeader() }
    );
    return response.data;
  }
};
