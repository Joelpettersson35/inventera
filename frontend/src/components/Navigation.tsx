import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-wrap">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-lg hover:underline"
      >
        <span
          aria-hidden="true"
          className="flex text-xl text-center items-center justify-center"
        >
          Meny
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
