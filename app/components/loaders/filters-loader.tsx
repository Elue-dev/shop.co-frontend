export default function FiltersLoader() {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[20px] bg-[#d8d8d8] animate-pulse rounded-md mb-4"
        />
      ))}
    </div>
  );
}
