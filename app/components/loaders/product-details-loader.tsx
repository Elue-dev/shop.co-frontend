export default function ProductDetailsLoader() {
  return (
    <div className="mt-12">
      <div className="flex">
        <div className="w-[50%]">
          <div className="flex items-center space-x-1">
            <div className="flex flex-col gap-3">
              <div className="w-[100px] h-[110px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
              <div className="w-[100px] h-[110px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
              <div className="w-[100px] h-[110px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
            </div>
            <div className="w-[80%] h-[345px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-5">
          <div className="w-[100%] h-[25px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
          <div className="w-[35%] h-[25px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
          <div className="w-[25%] h-[25px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
          <div className="w-[80%] h-[45px] animate-pulse rounded-lg bg-[#d8d8d8]"></div>
          <div className="w-[80%] h-[45px] animate-pulse rounded-lg bg-[#d8d8d8] mt-4"></div>
          <div className="w-[80%] h-[45px] animate-pulse rounded-lg bg-[#d8d8d8] mt-4"></div>
        </div>
      </div>

      <div className="w-[100%] h-[500px] animate-pulse rounded-lg bg-[#d8d8d8] mt-4"></div>
    </div>
  );
}
