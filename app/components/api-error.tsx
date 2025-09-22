import { Button } from "./ui/custom/button";

export default function ApiError({
  message,
  refetch,
}: {
  message: string;
  refetch: () => void;
}) {
  return (
    <div className="app-container mt-14">
      <div className="flex flex-col items-center justify-center">
        <h1>{message}</h1>

        <p className="text-grayish mt-2">
          Ensure you have a stable network connection
        </p>

        <Button label="Retry" onClick={refetch} auto classNames="mt-5" />
      </div>
    </div>
  );
}
