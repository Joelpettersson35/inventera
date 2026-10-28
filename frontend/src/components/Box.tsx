import { Archive } from "lucide-react";

export default function Box() {
  return (
    <div className="flex flex-wrap p-3 gap-x-1 bg-gray-200 rounded-md border border-gray-300">
      <Archive className="w-5 h-5" />
      <p>Adaptrar {`(12)`}</p>
    </div>
  );
}
