import Image from "next/image";
import StarRating from "../ui/custom/star-rating";
import { Product } from "@/app/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <Image
        src={product.images[0]}
        alt={product.name}
        height={300}
        width={280}
        className="rounded-[20px] bg-brown h-[300px] w-[280px]"
      />
      <p className="font-semibold mt-4">{product.name}</p>
      {product.avg_rating && (
        <div className="flex items-center gap-3 py-2">
          <StarRating rating={product.avg_rating} />
          <p className="text-sm">{product.avg_rating}/5</p>
        </div>
      )}
      <div className="font-semibold text-[23px]">${product.price}</div>
    </Link>
  );
}
