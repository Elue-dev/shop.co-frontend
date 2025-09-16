export default function DressStyleSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 bg-white rounded-[20px] h-[300px] animate-pulse" />
        <div className="col-span-3 bg-white rounded-[20px] h-[300px] animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-[20px] h-[300px] animate-pulse" />
        <div className="col-span-1 bg-white rounded-[20px] h-[300px] animate-pulse" />
      </div>
    </div>
  );
}
