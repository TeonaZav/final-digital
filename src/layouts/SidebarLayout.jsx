import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header, Footer } from "./";
import { SidebarMenu, BreadcrumbsNavigation, Filters } from "../components";
import BottomNavigation from "../components/navigation/BottomNavigation";

const SidebarLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  return (
    <div className="">
      <Header accessToken={accessToken} />
      <div className="container max-w-[1240px] mx-auto flex flex-col flex-1 lg:grid lg:grid-cols-12 lg:gap-4 p-6">
        <aside
          id="default-sidebar"
          className={`hidden xl:block lg:col-span-3 z-40 transition-all`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <SidebarMenu />
            <Filters />
          </div>
        </aside>

        <main className="col-span-12 xl:col-span-9 flex-1 min-h-[50vh]">
          <BreadcrumbsNavigation />
          <div className="flex-1 border-gray-200 rounded-lg pl-4">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
      </button>
      <div className="lg:hidden">
        <BottomNavigation accessToken={accessToken} />
      </div>
    </div>
  );
};

export default SidebarLayout;
