"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailsLoader from "@/app/components/loaders/product-details-loader";
import StarRating from "@/app/components/ui/custom/star-rating";
import { ProductService } from "@/app/services/api/product-service";
import { cn } from "@/lib/utils";
import QuantitySelector from "@/app/components/products/quantity-selector";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/custom/button";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading } = ProductService.getProduct(params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <section className="app-container mt-12">
      <div>
        {isLoading ? (
          <ProductDetailsLoader />
        ) : (
          <div>
            <div className="flex gap-8">
              <div className="basis-1/2 flex">
                <div className="w-[20%]">
                  {product?.images.map((img, index) => (
                    <Image
                      onClick={() => setCurrentImageIndex(index)}
                      key={img}
                      src={img}
                      alt="product image"
                      width={100}
                      height={110}
                      className="max-h-[90px] min-h-[90px] cursor-pointer mb-3 rounded-[20px]"
                    />
                  ))}
                </div>
                <div className="w-[78%%]">
                  <Image
                    src={product?.images[currentImageIndex] as string}
                    alt="product image"
                    width={500}
                    height={110}
                    className="w-[100%] rounded-[20px] max-h-[500px]"
                  />
                </div>
              </div>
              <div className="basis-1/2">
                <h1 className="text-2xl">{product?.name}</h1>

                {product?.avg_rating && (
                  <div className="flex items-center gap-3 py-2">
                    <StarRating rating={product?.avg_rating} />
                    <p className="text-[12px] font-medium">
                      {product.avg_rating}/
                      <span className="text-grayish">5</span>
                    </p>
                  </div>
                )}
                <div className="font-semibold text-[17px] flex items-center space-x-3">
                  <p>${product?.price}</p>
                  {product?.has_discount && (
                    <Fragment>
                      <p className="text-black/40 line-through">
                        ${product?.discounted_price}
                      </p>
                      <div className="bg-[#FF3333]/10 rounded-full py-[4px] px-4">
                        <p className="font-medium text-[#FF3333] text-[12px]">
                          -{product?.percentage_discount}%
                        </p>
                      </div>
                    </Fragment>
                  )}
                </div>
                <p className="text-grayish mt-3">{product?.description}</p>

                <Separator className="mt-4" />

                <p className="text-grayish mt-3">Choose size</p>
                <AnimatePresence initial={false}>
                  {product?.sizes && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.sizes.map((size) => {
                        const isActive = selectedSize === size;
                        return (
                          <motion.div
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            whileTap={{ scale: 0.97 }}
                            animate={{
                              backgroundColor: isActive ? "#000000" : "#F0F0F0",
                            }}
                            transition={{ duration: 0.25 }}
                            className={cn(
                              "bg-[#F0F0F0] rounded-full py-2 px-4 cursor-pointer",
                              isActive ? " text-white" : "text-grayish",
                            )}
                          >
                            <p className="capitalize text-sm">
                              {size.replace("_", "-")}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>

                <Separator className="mt-4" />

                <p className="mb-4 mt-3 text-grayish">
                  <span className="font-medium">{product?.stock_quantity}</span>{" "}
                  units available in stock
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-[30%]">
                    <QuantitySelector
                      quantity={quantity}
                      setQuantity={setQuantity}
                      stockQuantity={product?.stock_quantity || 0}
                    />
                  </div>

                  <Button label="Add to Cart" classNames="w-[65%]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
