"use client";

import { useSearchParams } from "next/navigation";
import ShopFilters from "../components/products/shop-filters";
import AppBreadCrumb from "../components/ui/custom/app-breadcrumb";
import { ProductService } from "../services/api/product-service";
import { ProductFilter } from "../types/product";
import ProductSkeleton from "../components/loaders/product-skeleton";
import ProductCard from "../components/products/product-card";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const filters = getFiltersFromParams(searchParams);

  const { data: products, isLoading } = ProductService.listProducts(filters);

  function getFiltersFromParams(searchParams: URLSearchParams): ProductFilter {
    const filters: ProductFilter = {};

    searchParams.forEach((value, key) => {
      if (key in filters || true) {
        (filters as _TSFixMe)[key] = value;
      }
    });

    return filters;
  }

  return (
    <section className="app-container mt-8">
      {searchParams.size > 0 && <AppBreadCrumb items={[{ name: "Shop" }]} />}
      <div className="flex gap-4 mt-3">
        <div className="w-[20%]">
          <ShopFilters />
        </div>

        <div className="w-[80%] ml-3">
          {isLoading ? (
            <ProductSkeleton iteration={3} />
          ) : products?.data?.length === 0 ? (
            <div>
              <p className="text-center">
                No products found for selected filters
              </p>
            </div>
          ) : (
            <div>
              {/*<div className="flex items-center justify-between">
                <p>Category</p>
                <p>Sort by</p>
              </div>*/}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {products?.data?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
