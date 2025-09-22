import { sizes } from "../helpers/constants";

export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}

export interface Product {
  avg_rating: number;
  category_id: string;
  description: string;
  percentage_discount: number;
  dress_style_id: string;
  discounted_price: number;
  has_discount: boolean;
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

export interface ProductFilter {
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
  name: string;
  inserted_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
}

export type SizeKey = (typeof sizes)[number];

export type ShopFilter = {
  category: string;
  size: SizeKey | string;
  dress_style: string;
};

export interface ReviewResponse {
  data: Review[];
  pagination: Pagination;
}

export type Review = {
  comment: string;
  helpful_count: number;
  id: string;
  rating: number;
  title: string;
  user: {
    first_name: string;
    last_name: string;
  };
  inserted_at: string;
  updated_at: string;
};

export interface ReviewFilter {
  limit?: number;
  next?: string;
  prev?: string;
}
