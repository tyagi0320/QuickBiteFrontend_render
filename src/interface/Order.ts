export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  status: 'pending' | 'approved' | 'delivered';
//   created_at?: string; // Optional if you add timestamp later
}

export interface OrderUpdateStatus {
  status: 'pending' | 'approved' | 'delivered';
}
