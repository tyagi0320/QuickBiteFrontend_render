import axios from 'axios';
import { TokenService } from './TokenService';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthService = {
  async login(email: string, password: string) {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });

    const data = res.data;

    console.log("LOGIN RESPONSE:", data);

    // ✅ HANDLE YOUR BACKEND RESPONSE (tuple → array)
    if (Array.isArray(data)) {
      // FastAPI returning: access_token, refresh_token, user
      TokenService.setToken(data[0]);
    } 
    else if (data.access_token) {
      // fallback if you later change backend
      TokenService.setToken(data.access_token);
    } 
    else {
      console.warn("Unexpected login response format");
    }

    return data;
  },

  async register(userData: { email: string; password: string; name: string }) {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res.data;
  },

  async verifyOtp(email: string, otp: string) {
    const res = await axios.post(`${BASE_URL}/verify-otp`, null, {
      params: { email, otp }
    });
    return res.data;
  },

  async resendOtp(email: string) {
    const res = await axios.post(`${BASE_URL}/resend-otp`, null, {
      params: { email }
    });
    return res.data;
  }
};
