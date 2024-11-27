import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header";

const HeaderFooterLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default HeaderFooterLayout;
