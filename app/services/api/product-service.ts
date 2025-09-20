import {
  ProductResponse,
  ProductFilter,
  DressStyle,
  Category,
  Product,
} from "@/app/types/product";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import client from "../client";
import { QUERY_KEYS } from "@/app/helpers/constants";

export const ProductService = {
  listProducts: function (
    filters: ProductFilter = {},
  ): UseQueryResult<ProductResponse> {
    return useQuery<ProductResponse>({
      queryKey: [QUERY_KEYS.PRODUCTS, filters],
      queryFn: async function () {
        const response = await client.get(`/products`, null, filters);
        return response;
      },
    });
  },

  getProduct: function (product_id: string): UseQueryResult<Product> {
    return useQuery<Product>({
      queryKey: [QUERY_KEYS.PRODUCTS, product_id],
      queryFn: async function () {
        const response = await client.get(`/products/${product_id}`);
        return response.data;
      },
    });
  },

  listDressStyles: function (): UseQueryResult<DressStyle[]> {
    return useQuery<DressStyle[]>({
      queryKey: [QUERY_KEYS.DRESS_STYLE],
      queryFn: async function () {
        const response = await client.get("/products/dress-styles");
        return response.data;
      },
    });
  },

  listCategories: function (): UseQueryResult<Category[]> {
    return useQuery<Category[]>({
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async function () {
        const response = await client.get("/products/categories");
        return response.data;
      },
    });
  },
};
