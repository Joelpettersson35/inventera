import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  message: string;
};

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div
      role="status"
      className="flex w-full items-center justify-center gap-2 py-4 text-[#001C89]"
    >
      <LoaderCircle
        aria-hidden="true"
        className="h-5 w-5 motion-safe:animate-spin"
      />
      <span>{message}</span>
    </div>
  );
}
