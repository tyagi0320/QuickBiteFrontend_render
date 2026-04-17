import axios from 'axios';
import { TokenService } from './TokenService';
import type { User } from '../interface/User';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/users`;

export const UserService = {
  // Fetch current user details from the backend
  getProfile: async (): Promise<User> => {
    const token = TokenService.getAccessToken();
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const token = TokenService.getAccessToken();
    const response = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
