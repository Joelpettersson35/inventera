import { Archive } from "lucide-react";
import type { BoxType } from "../types/BoxType";

type BoxProps = {
  box: BoxType;
};

export default function Box({ box }: BoxProps) {
  return (
    <div className="flex flex-wrap p-3 gap-x-1 bg-gray-200 rounded-md border border-gray-300">
      <Archive className="w-5 h-5" />
      <p>{box.name}</p>
    </div>
  );
}
