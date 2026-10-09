import Navigation from "./Navigation";

function Header() {
  return (
    <div className="flex w-full shadow-lg shadow-gray-200 justify-between h-15 align-middle items-center p-4">
      <h1 className="text-[#001C89] font-bold text-2xl text-center">
        Inventera
      </h1>
      <div className="flex justify-between gap-5">
        <Navigation />
      </div>
    </div>
  );
}

export default Header;
