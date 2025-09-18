import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 15 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starNumber = i + 1;
        const isFull = rating >= starNumber;
        const isHalf = !isFull && rating + 0.5 >= starNumber;

        return (
          <div
            key={i}
            className="relative"
            style={{ width: size, height: size }}
          >
            <Star size={size} className="text-gray-300" strokeWidth={1.5} />

            {isFull && (
              <Star
                size={size}
                className="absolute left-0 top-0 text-[#FFC633] fill-[#FFC633]"
                strokeWidth={1.5}
              />
            )}
            {isHalf && (
              <div
                className="absolute left-0 top-0 overflow-hidden"
                style={{ width: size / 2, height: size }}
              >
                <Star
                  size={size}
                  className="text-[#FFC633] fill-[#FFC633]"
                  strokeWidth={1.5}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
