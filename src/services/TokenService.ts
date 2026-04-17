import { jwtDecode } from 'jwt-decode';
import type { MyTokenPayload } from '../interface/Token';

export const TokenService = {
  getAccessToken() {
    return localStorage.getItem("token");
  },

  setToken(access: string) {
    localStorage.setItem("token", access);
  },

  clearToken() {
    localStorage.removeItem("token");
  },

  decodeToken(): MyTokenPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      return jwtDecode<MyTokenPayload>(token);
    } catch {
      return null;
    }
  }
};
