export default function ChatListLoader() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="h-[64px]  bg-[#f7f7f7] animate-pulse rounded-md mr-4 mt-4"
        />
      ))}
    </div>
  );
}
