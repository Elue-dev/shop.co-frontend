import { Review } from "@/app/types/product";
import AppCard from "../ui/custom/app-card";
import StarRating from "../ui/custom/star-rating";
import { formatDateShort } from "@/app/helpers";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <AppCard key={review.id} classNames="">
      <StarRating rating={review.rating} />

      <p className="text-sm font-semibold mt-3">
        {review.user.first_name} {review.user.last_name}
      </p>
      <p className="text-grayish mt-1">"{review.comment}"</p>
      <p className="text-grayish mt-3 text-sm font-medium">
        Posted on {formatDateShort(review.inserted_at)}
      </p>
    </AppCard>
  );
}
