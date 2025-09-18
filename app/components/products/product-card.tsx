import Image from "next/image";
import StarRating from "../ui/custom/star-rating";
import { Product } from "@/app/types/product";
import Link from "next/link";
import { Fragment } from "react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/product/${product.id}`}>
      <Image
        src={product.images[0]}
        alt={product.name}
        height={300}
        width={280}
        className="rounded-[20px] bg-brown h-[230px] w-[230px]"
      />
      <p className="font-semibold mt-4 text-[15px]">{product.name}</p>
      {product.avg_rating && (
        <div className="flex items-center gap-3 py-2">
          <StarRating rating={product.avg_rating} />
          <p className="text-[12px] font-medium">
            {product.avg_rating}/<span className="text-grayish">5</span>
          </p>
        </div>
      )}
      <div className="font-semibold text-[17px] flex items-center space-x-3">
        <p>${product.price}</p>
        {product.has_discount && (
          <Fragment>
            <p className="text-black/40 line-through">
              ${product.discounted_price}
            </p>
            <div className="bg-[#FF3333]/10 rounded-full py-[4px] px-4">
              <p className="font-medium text-[#FF3333] text-[12px]">
                -{product.percentage_discount}%
              </p>
            </div>
          </Fragment>
        )}
      </div>
    </Link>
  );
}
