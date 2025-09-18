"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductService } from "../services/api/product-service";
import ProductSkeleton from "../components/loaders/product-skeleton";
import ProductCard from "../components/products/product-card";
import AppSelect from "../components/ui/custom/select";
import { Button } from "../components/ui/custom/button";
import { ProductFilters } from "../types/product";
import { LargeTitle } from "../components/ui/custom/large-title";

export default function ProductsPage2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = getFiltersFromParams(searchParams);

  function getFiltersFromParams(searchParams: URLSearchParams): ProductFilters {
    const filters: ProductFilters = {};

    searchParams.forEach((value, key) => {
      if (key in filters || true) {
        (filters as _TSFixMe)[key] = value;
      }
    });

    return filters;
  }

  const { data: dressStyles, isLoading: loading } =
    ProductService.listDressStyles();
  const { data: products, isLoading } = ProductService.listProducts(filters);

  function handleDressStyleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("dress-style")) {
      const oldValue = params.get("dress-style");
      params.delete("dress-style");
      if (oldValue && !params.has("dress_style")) {
        params.set("dress_style", oldValue);
      }
    }

    const currentValue = params.get("dress_style");
    if (currentValue === value) return;

    if (value) {
      params.set("dress_style", value);
    } else {
      params.delete("dress_style");
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="app-container">
      <div className="mb-6 mt-10">
        <LargeTitle text="Products" />

        {searchParams.size > 0 && (
          <Button
            label="Clear filters"
            classNames="py-1 px-5 mt-2"
            onClick={() => router.push("/products")}
            auto
            inverted
          />
        )}
        {filters.dress_style && (
          <div className="text-[16px] mt-2 font-medium">
            Dress Style:
            <div className="mt-1">
              {!loading && (
                <AppSelect
                  value={filters.dress_style || ""}
                  onValueChange={handleDressStyleChange}
                  items={dressStyles?.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : products?.data?.length === 0 ? (
        <div>
          <p className="text-center">No products found for selected filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {products?.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
