import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";
import BottomNavigation from "../components/navigation/BottomNavigation";

const HeaderFooterLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="container max-w-[1240px] mx-auto  px-4 py-20 flex-1">
        <Outlet />
      </main>
      <Footer />
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default HeaderFooterLayout;
