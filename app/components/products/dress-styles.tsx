import Image from "next/image";
import { ProductService } from "@/app/services/api/product-service";
import { cn } from "@/lib/utils";
import DressStyleSkeleton from "../loaders/dress-style-skeleton";
import Link from "next/link";
import { LargeTitle } from "../ui/custom/large-title";
import ApiError from "../api-error";

export default function DressStyles() {
  const {
    data: dressStyles,
    isLoading,
    isError,
    refetch,
  } = ProductService.listDressStyles();

  const topRow = dressStyles?.slice(0, 2) || [];
  const bottomRow = dressStyles?.slice(2, 4) || [];

  return (
    <div className="app-container mt-18 bg-[#F0F0F0] rounded-[35px] py-10 px-20 pb-20">
      <LargeTitle
        text="BROWSE BY DRESS STYLE"
        centered
        classNames="text-[40px] mb-8 font-extrabold text-black tracking-wide"
      />

      {isLoading ? (
        <DressStyleSkeleton />
      ) : isError ? (
        <ApiError message="Error loading dress styles" refetch={refetch} />
      ) : (
        <div className="space-y-6 mt-14">
          <div className="grid grid-cols-5 gap-6">
            {topRow.map((style, index) => (
              <Link
                href={`/shop?dress_style=${style.name}`}
                key={style.id}
                className={cn(
                  "relative group cursor-pointer rounded-[20px] overflow-hidden bg-white h-[300px] transition-transform duration-300 hover:scale-[1.02]",
                  index === 0 ? "col-span-2" : "col-span-3",
                )}
              >
                <div className="relative w-full h-full p-6">
                  <p className="text-2xl font-bold text-black mb-4">
                    {style.name}
                  </p>
                  <div className="absolute bottom-6 right-6 top-6 left-26">
                    <Image
                      src={style.cover_photo}
                      alt={`${style.name} style`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {bottomRow.map((style, index) => (
              <Link
                href={`/shop?dress_style=${style.name.toLowerCase()}`}
                key={style.id}
                className={cn(
                  "relative group cursor-pointer rounded-[20px] overflow-hidden bg-white h-[300px] transition-transform duration-300 hover:scale-[1.02]",
                  index === 0 ? "col-span-2" : "col-span-1",
                )}
              >
                <div className="relative w-full h-full p-6">
                  <p className="text-2xl font-bold text-black mb-4">
                    {style.name}
                  </p>
                  <div className="absolute bottom-6 right-6 top-6 left-26">
                    <Image
                      src={style.cover_photo}
                      alt={`${style.name} style`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
