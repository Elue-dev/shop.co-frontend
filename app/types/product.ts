export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}

export interface Product {
  avg_rating: number;
  category_id: string;
  description: string;
  discount_price: number;
  dress_style_id: string;
  id: string;
  images: string[];
  is_active: boolean;
  name: string;
  price: number;
  sizes: string[];
  stock_quantity: number;
}

export interface Pagination {
  limit: number;
  next: string;
  prev: string;
}

export interface ProductFilters {
  limit?: number;
  next?: string;
  prev?: string;
  category?: string;
  dress_style?: string;
  size?: string;
  price_range?: string;
  search?: string;
  is_active?: boolean;
  sort?: string;
}

export interface DressStyle {
  cover_photo: string;
  description: string;
  id: string;
  inserted_at: string;
  name: string;
  updated_at: string;
}
