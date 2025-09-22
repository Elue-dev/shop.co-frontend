import { ProductService } from "@/app/services/api/product-service";
import ProductCard from "./product-card";
import ProductSkeleton from "../loaders/product-skeleton";
import { LargeTitle } from "../ui/custom/large-title";
import ApiError from "../api-error";

export default function TopSelling() {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = ProductService.listProducts({
    limit: 4,
  });

  return (
    <div className="app-container mt-14">
      <LargeTitle text="Top Selling" centered classNames="text-[30px] mb-6" />

      {isLoading ? (
        <ProductSkeleton iteration={4} />
      ) : isError ? (
        <ApiError
          message="Error loading top selling products"
          refetch={refetch}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {products?.data.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
