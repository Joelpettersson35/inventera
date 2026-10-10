import { Outlet } from "react-router";
import Header from "../components/Header";
import qrcode from "../assets/qr-code.png";

function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <button className="flex align-middle gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-full bg-[#001C89]">
        <img
          src={qrcode}
          alt=""
          className="h-10 w-10 shrink-0 object-contain"
        />
      </button>
    </div>
  );
}

export default MainLayout;
