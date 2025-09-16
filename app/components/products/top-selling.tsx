import { ProductService } from "@/app/services/api/product-service";
import ProductCard from "./product-card";
import ProductSkeleton from "../loaders/product-skeleton";

export default function TopSelling() {
  const { data: products, isLoading } = ProductService.listProducts({
    limit: 4,
  });

  return (
    <div className="app-container mt-14">
      <h1 className="text-center text-[30px] mb-6">Top Selling</h1>

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
