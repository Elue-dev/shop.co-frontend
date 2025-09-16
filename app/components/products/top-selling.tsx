import { ProductService } from "@/app/services/api/product-service";
import ProductCard from "./product-card";
import ProductSkeleton from "../loaders/product-skeleton";
import { LargeTitle } from "../ui/custom/large-title";

export default function TopSelling() {
  const { data: products, isLoading } = ProductService.listProducts({
    limit: 4,
  });

  return (
    <div className="app-container mt-14">
      <LargeTitle text="Top Selling" centered classNames="text-[30px] mb-6" />

      {isLoading ? (
        <ProductSkeleton iteration={4} />
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
