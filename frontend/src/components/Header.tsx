function Header() {
  return (
    <div className="flex w-full shadow-lg shadow-gray-200 justify-between h-15 align-middle items-center p-1">
      <h1 className="text-[#001C89] font-bold text-2xl text-center">
        Inventera
      </h1>
      <div className="flex justify-between gap-5">
        <button className="bg-[#001C89] text-white rounded-xl p-2.5">Scanna Qr-kod</button>
        <button className="flex items-center bg-[#001C89] text-white p-2 rounded-xl">
          <p>Logga in</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
