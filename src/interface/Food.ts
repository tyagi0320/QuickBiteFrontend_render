export interface Food {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string; 
}

// Data shape for forms (Create/Update)
export interface FoodFormData {
  name: string;
  description?: string;
  price: string | number;
  image?: File | null;
}
