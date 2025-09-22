import { ReviewFilter, ReviewResponse } from "@/app/types/product";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/custom/button";
import ReviewCard from "./review-card";

export default function ProductReviews({
  reviews,
  setFilters,
  isFetching,
}: {
  reviews: ReviewResponse | undefined;
  setFilters: Dispatch<SetStateAction<ReviewFilter>>;
  isFetching: boolean;
}) {
  function handlePagination(direction: "prev" | "next") {
    if (direction === "next" && reviews?.pagination.next) {
      setFilters({ next: reviews.pagination.next });
    } else if (direction === "prev" && reviews?.pagination.prev) {
      setFilters({ prev: reviews.pagination.prev });
    }
  }

  return (
    <section className="mt-12">
      <h1 className="text-xl">Reviews</h1>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3">
        {reviews?.data.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        {reviews?.pagination.prev ? (
          <Button
            label="Prev"
            onClick={() => handlePagination("prev")}
            transparent
            classNames="w-auto"
            isLoading={isFetching}
          />
        ) : (
          <div />
        )}

        {reviews?.pagination.next && (
          <Button
            label="Next"
            onClick={() => handlePagination("next")}
            transparent
            classNames="w-auto"
            isLoading={isFetching}
          />
        )}
      </div>
    </section>
  );
}
