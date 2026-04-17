import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthService = {
  async login(email: string, password: string) {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    return res.data;
  },

  async register(userData: { email: string; password: string; name: string }) {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res.data;
  },

  async verifyOtp(email: string, otp: string) {
    // Note: Matches your FastAPI query parameters (?email=...&otp=...)
    const res = await axios.post(`${BASE_URL}/verify-otp`, null, {
      params: { email, otp }
    });
    return res.data;
  },

  // Resend OTP: For users who didn't receive the email
  async resendOtp(email: string) {
    const res = await axios.post(`${BASE_URL}/resend-otp`, null, {
      params: { email }
    });
    return res.data;
  }
};
