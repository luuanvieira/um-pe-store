export type Category = 'Esporte' | 'Casual' | 'Social';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  tint: string;
  description: string;
  sizes: number[];
  badge?: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  size: number;
  qty: number;
}
