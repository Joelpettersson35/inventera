import { Outlet } from "react-router";
import Header from "../components/Header";

function NoQrLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default NoQrLayout;
