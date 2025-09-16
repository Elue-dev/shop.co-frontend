export default function SellersSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg p-4 h-[220px] animate-pulse"
        ></div>
      ))}
    </div>
  );
}
