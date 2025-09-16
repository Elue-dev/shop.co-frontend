import {
  ProductResponse,
  ProductFilters,
  DressStyle,
} from "@/app/types/product";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import client from "../client";
import { QUERY_KEYS } from "@/app/helpers/constants";

export const ProductService = {
  listProducts: function (
    filters: ProductFilters = {},
  ): UseQueryResult<ProductResponse> {
    return useQuery<ProductResponse>({
      queryKey: [QUERY_KEYS.PRODUCTS, filters],
      queryFn: async function () {
        const response = await client.get(`/products`, null, filters);
        return response;
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
};
