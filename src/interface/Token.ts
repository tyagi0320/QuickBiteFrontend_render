import type { JwtPayload } from 'jwt-decode';
export interface MyTokenPayload extends JwtPayload {
  user_id?: number;
  sub?: string;
  name?: string;
  email?: string;
  role?: string;
}