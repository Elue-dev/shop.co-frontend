export enum QUERY_KEYS {
  ACCOUNTS = "accounts",
  PRODUCTS = "products",
  CHATS = "chats",
  MESSAGES = "messages",
  REVIEWS = "reviews",
  DRESS_STYLE = "dress-style",
  CATEGORIES = "categories",
}

export const sizes = ["small", "medium", "large", "x-large"] as const;

export const SIZES_MAP = {
  small: "small",
  medium: "medium",
  large: "large",
  "x-large": "x_large",
};

export const PRICE_RANGES = {
  min: 0,
  max: 10000,
};
