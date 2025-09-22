import { ProductService } from "@/app/services/api/product-service";
import ProductCard from "./product-card";
import ProductSkeleton from "../loaders/product-skeleton";
import { LargeTitle } from "../ui/custom/large-title";
import ApiError from "../api-error";

export default function NewArrivals() {
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
      <LargeTitle text="New Arrivals" centered classNames="text-[30px] mb-6" />

      {isLoading ? (
        <ProductSkeleton />
      ) : isError ? (
        <ApiError message="Error loading new arrivals" refetch={refetch} />
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
