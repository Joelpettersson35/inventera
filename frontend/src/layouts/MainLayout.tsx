import { Outlet } from "react-router";
import Header from "../components/Header";
import { ScanQrCode } from "lucide-react";

function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <button className="flex align-middle gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full p-3 bg-[#001C89] md:hidden">
        <ScanQrCode className="h-10 w-10 shrink-0 text-white object-contain" />
      </button>
    </div>
  );
}

export default MainLayout;
