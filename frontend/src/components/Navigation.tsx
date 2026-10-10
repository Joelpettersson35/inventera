import { useState } from "react";
import { Link } from "react-router";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-wrap relative pr-4">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-lg hover:underline md:hidden"
      >
        <span
          aria-hidden="true"
          className="flex text-5xl text-center text-[#001C89] items-center justify-center"
        >
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      <nav
        className={`
          ${isOpen ? "flex" : "hidden"}
          absolute right-0 top-full z-50 mt-2 p-3
          w-56 flex-col gap-2 divide-y divide-gray-200
          border border-gray-200 bg-white rounded-lg shadow-lg
          md:static md:mt-0 md:flex md:w-auto md:flex-row
          md:border-0 md:p-0 md:shadow-none md:divide-none md:text-center md:font-extrabold
        `}
      >
        {/*FÖRBÄTTRING: generera varje länk istället*/}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="px-3 py-2 hover:bg-gray-100 w-56"
        >
          Hem
        </Link>
        <Link
          to="/create"
          onClick={() => setIsOpen(false)}
          className="px-3 py-2 hover:bg-gray-100 w-56"
        >
          Skapa och ta bort
        </Link>
        <Link
          to="/settings"
          onClick={() => setIsOpen(false)}
          className="px-3 py-2 hover:bg-gray-100 w-56"
        >
          Inställningar
        </Link>
      </nav>
    </div>
  );
}
