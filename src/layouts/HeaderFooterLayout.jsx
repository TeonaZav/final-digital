import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header, Footer } from "./";
import BottomNavigation from "../components/navigation/BottomNavigation";

const HeaderFooterLayout = () => {
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  return (
    <div className="flex flex-col h-full">
      <Header accessToken={accessToken} />
      <main className="container max-w-[1240px] mx-auto  px-4 py-20 flex-1">
        <Outlet />
      </main>
      <Footer />
      <div className="lg:hidden">
        <BottomNavigation accessToken={accessToken} />
      </div>
    </div>
  );
};

export default HeaderFooterLayout;
