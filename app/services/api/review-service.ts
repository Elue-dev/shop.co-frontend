import { ReviewFilter, ReviewResponse } from "@/app/types/product";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import client from "../client";
import { QUERY_KEYS } from "@/app/helpers/constants";

export const ReviewService = {
  useListProductReviews: (
    product_id: string,
    filters?: ReviewFilter,
  ): UseQueryResult<ReviewResponse> => {
    return useQuery<ReviewResponse>({
      queryKey: [QUERY_KEYS.REVIEWS, product_id, filters],
      queryFn: async function () {
        const response = await client.get(
          `/products/${product_id}/reviews`,
          null,
          filters,
        );
        return response;
      },
      placeholderData: (prev) => prev,
    });
  },
};
