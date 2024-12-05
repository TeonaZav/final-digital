import { Outlet } from "react-router-dom";
import Header from "./Header";

import { useSelector } from "react-redux";

const AdminLayout = () => {
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  return (
    <div className="min-h-screen flex flex-col justify-betwen bg-gray-50">
      <Header accessToken={accessToken} />
      <main className="flex-1 flex flex-col gap-10">
        <Outlet />
      </main>
      <footer className="text-sm  h-20 flex items-center justify-center">
        ©2024 ყველა უფლება დაცულია
      </footer>
    </div>
  );
};

export default AdminLayout;
