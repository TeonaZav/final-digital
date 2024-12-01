import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const HeaderFooterLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="container max-w-[1240px] mx-auto  px-4 py-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HeaderFooterLayout;
