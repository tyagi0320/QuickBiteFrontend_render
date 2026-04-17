import axios from 'axios';
import { TokenService } from './TokenService';
import type { Food } from '../interface/Food';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/foods`;

export const FoodService = {
  getImageUrl(imageName: string): string {
    return `${BASE_URL}/images/${imageName}`;
  },

  async foods(): Promise<Food[]> {
    const res = await axios.get<Food[]>(API_URL);
    return res.data;
  },

  async addfood(formData: FormData): Promise<Food> {
    const token = TokenService.getAccessToken();
    const res = await axios.post<Food>(`${API_URL}/`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      }
    });
    return res.data;
  },

  async updateFood(food_id: number, formData: FormData): Promise<Food> {
    const token = TokenService.getAccessToken();
    const res = await axios.put<Food>(`${API_URL}/${food_id}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      }
    });
    return res.data;
  },

  async deleteFood(food_id: number): Promise<{message: string}> {
    const token = TokenService.getAccessToken();
    const res = await axios.delete(`${API_URL}/${food_id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
  }
};
