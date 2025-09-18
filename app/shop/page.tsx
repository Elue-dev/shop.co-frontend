"use client";

import { useSearchParams } from "next/navigation";
import ProductFilters from "../components/products/product-filters";
import AppBreadCrumb from "../components/ui/custom/app-breadcrumb";
import { ProductService } from "../services/api/product-service";

export default function ShopPage() {
  const searchParams = useSearchParams();

  return (
    <section className="app-container mt-8">
      {searchParams.size > 0 && <AppBreadCrumb items={[{ name: "Casual" }]} />}
      <div className="flex gap-4 mt-3">
        <div className="w-[20%]">
          <ProductFilters />
        </div>

        <div className="w-[80%]">main content</div>
      </div>
    </section>
  );
}
