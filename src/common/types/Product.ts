export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductState {
  product: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
}
