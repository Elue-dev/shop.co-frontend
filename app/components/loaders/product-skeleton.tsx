export default function ProductSkeleton({
  iteration = 4,
}: {
  iteration?: number;
}) {
  return (
    <div className="app-container grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: iteration }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="h-[300px] w-[280px] bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-1/4 bg-gray-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
