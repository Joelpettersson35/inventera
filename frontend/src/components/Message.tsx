export type MessageType = "success" | "error" | "warning";

type MessageProps = {
  type: MessageType;
  message: string;
};

const styles: Record<MessageType, string> = {
  success: "border-green-300 bg-green-50 text-green-800",
  error: "border-red-300 bg-red-50 text-red-800",
  warning: "border-yellow-300 bg-yellow-50 text-yellow-800",
};

export default function Message({ type, message }: MessageProps) {
  return (
    <p
      role={type === "error" ? "alert" : "status"}
      className={`w-full rounded-lg border px-4 py-3 ${styles[type]}`}
    >
      {message}
    </p>
  );
}
