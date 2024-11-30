import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const HeaderFooterLayout = () => {
  return (
    <div>
      <Header />
      <main className="py-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HeaderFooterLayout;
