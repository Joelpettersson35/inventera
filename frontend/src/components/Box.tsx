import { Archive } from "lucide-react";
import type { BoxType } from "../types/BoxType";
import { Link } from "react-router";

type BoxProps = {
  box: BoxType;
};

export default function Box({ box }: BoxProps) {
  return (
    <Link
      to={`/box/:${box.id}`}
      className="flex min-w-0 items-center p-3 gap-x-1 bg-gray-200 rounded-md border border-gray-300"
    >
      <Archive className="w-5 h-5 shrink-0" />
      <p className="min-w-0 truncate" title={box.name}>
        {box.name}
      </p>
    </Link>
  );
}
