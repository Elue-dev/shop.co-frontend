import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";
import { ProductService } from "@/app/services/api/product-service";
import { Fragment, useState } from "react";
import RangeSlider from "../ui/custom/range-slider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PRICE_RANGES, SIZES_MAP, sizes } from "@/app/helpers/constants";
import { Button } from "../ui/custom/button";
import FiltersLoader from "../loaders/filters-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { ShopFilters } from "@/app/types/product";

export default function ProductFilters() {
  const { data: categories, isLoading: categoryLoading } =
    ProductService.listCategories();
  const { data: dressStyles, isLoading: dressStyleloading } =
    ProductService.listDressStyles();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([
    PRICE_RANGES.min,
    PRICE_RANGES.max,
  ]);
  const [isPriceSectionOpen, setIsPriceSectionOpen] = useState(true);
  const [isSizeSectionOpen, setIsSizeSectionOpen] = useState(true);
  const [isDressSectionOpen, setIsDressSectionOpen] = useState(true);

  const [filters, setFilters] = useState<ShopFilters>({
    category: "",
    size: "",
    dress_style: "",
  });

  function handleSetFilters(filter: keyof typeof filters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  }

  function handleFilters() {
    const params = new URLSearchParams(searchParams.toString());
    if (filters.category) {
      params.set("category", filters.category);
    }
    if (filters.dress_style) {
      params.set("dress_style", filters.dress_style);
    }
    if (filters.size) {
      params.set("size", SIZES_MAP[filters.size]);
    }
    if (
      priceRange[0] !== PRICE_RANGES.min &&
      priceRange[0] !== PRICE_RANGES.max
    )
      params.set("price_range", `${priceRange[0]}-${priceRange[1]}`);

    router.push(`?${params.toString()}`);
  }

  return (
    <section>
      <div className="border border-black/10 rounded-[20px] p-4">
        <div className="flex justify-between mb-4">
          <p className="font-semibold text-base">Filters</p>
          <SlidersHorizontal className="text-black/40" />
        </div>
        <Separator />

        <div className="my-4">
          {categoryLoading ? (
            <FiltersLoader />
          ) : (
            <Fragment>
              {categories?.map((category) => {
                const isActive = filters.category === category.name;
                return (
                  <motion.div
                    key={category.id}
                    onClick={() => handleSetFilters("category", category.name)}
                    className={cn(
                      "flex items-center justify-between mb-3 cursor-pointer",
                      isActive && "py-[5px] pl-2 rounded-lg",
                    )}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      backgroundColor: isActive ? "#f3f4f6" : "#ffffff00",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-black/60 text-sm">{category.name}</p>
                  </motion.div>
                );
              })}
            </Fragment>
          )}
        </div>

        <Separator />

        <div className="my-4">
          <div
            className="flex justify-between items-center mt-4 cursor-pointer"
            onClick={() => setIsPriceSectionOpen((prev) => !prev)}
          >
            <p className="font-semibold text-base">Price</p>
            <ChevronRight
              size={15}
              className={cn(
                "text-black transform transition-transform duration-300",
                isPriceSectionOpen ? "rotate-90" : "rotate-0",
              )}
            />
          </div>

          <AnimatePresence initial={false}>
            {isPriceSectionOpen && (
              <motion.div
                key="price"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <RangeSlider
                  value={priceRange}
                  setValue={setPriceRange}
                  classNames="mt-4"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        <div className="my-4">
          <div
            className="flex justify-between items-center mt-4 cursor-pointer"
            onClick={() => setIsSizeSectionOpen((prev) => !prev)}
          >
            <p className="font-semibold text-base">Size</p>
            <ChevronRight
              size={15}
              className={cn(
                "text-black transform transition-transform duration-300",
                isSizeSectionOpen ? "rotate-90" : "rotate-0",
              )}
            />
          </div>

          <AnimatePresence initial={false}>
            {isSizeSectionOpen && (
              <motion.div
                key="price"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 my-3">
                  {sizes.map((size) => {
                    const isActive = filters.size === size;
                    return (
                      <motion.div
                        key={size}
                        onClick={() => handleSetFilters("size", size)}
                        whileTap={{ scale: 0.97 }}
                        animate={{
                          backgroundColor: isActive ? "#000000" : "#F0F0F0",
                        }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                          "bg-[#F0F0F0] rounded-full py-1 px-3 cursor-pointer",
                          isActive ? " text-white" : "text-grayish",
                        )}
                      >
                        <p className="capitalize text-sm">{size}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        <div className="my-4">
          <div
            className="flex justify-between items-center my-4 cursor-pointer"
            onClick={() => setIsDressSectionOpen((prev) => !prev)}
          >
            <p className="font-semibold text-base">Dress Style</p>
            <ChevronRight
              size={15}
              className={cn(
                "text-black transform transition-transform duration-300",
                isDressSectionOpen ? "rotate-90" : "rotate-0",
              )}
            />
          </div>

          <AnimatePresence initial={false}>
            {isDressSectionOpen && (
              <motion.div
                key="dress"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {dressStyleloading ? (
                  <FiltersLoader />
                ) : (
                  dressStyles?.map((style) => {
                    const isActive = filters.dress_style === style.name;
                    return (
                      <motion.div
                        onClick={() =>
                          handleSetFilters("dress_style", style.name)
                        }
                        key={style.id}
                        whileTap={{ scale: 0.97 }}
                        animate={{
                          backgroundColor: isActive ? "#f3f4f6" : "#ffffff00",
                        }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                          "flex items-center justify-between mb-3 cursor-pointer",
                          filters.dress_style === style.name &&
                            "bg-gray-100 py-[5px] pl-2 rounded-lg",
                        )}
                      >
                        <p className="text-black/60 text-sm">{style.name}</p>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          label="Apply Filters"
          onClick={handleFilters}
          classNames="py-6"
        />
      </div>
    </section>
  );
}
