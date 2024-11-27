import { useState } from "react";
import CategoryList from "../components/categories/CategoryList";
import Header from "../components/navigation/Header";

const SidebarLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      <Header />
      <div className="container max-w-[1240px] mx-auto flex flex-col lg:flex-row">
        <aside
          id="default-sidebar"
          className={`hidden lg:block z-40 w-64 min-h-[80vh] bg-gray-50 transition-all p-4`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto"></div>
        </aside>
        <main className="flex-1 p-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg">
            <CategoryList />
          </div>
        </main>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
      </button>
    </div>
  );
};

export default SidebarLayout;
