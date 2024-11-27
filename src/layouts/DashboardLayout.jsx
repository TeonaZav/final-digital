import { Outlet, NavLink } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { TbCategory } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import Header from "../components/navigation/Header";
import { useState } from "react";
import AdminMenuList from "../components/admin/AdminMenuList";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div className="relative font-[sans-serif]h-screen">
      <Header />
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            მენიუ
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
            className="text-xl"
          >
            <MdClose />
          </IconButton>
        </div>
        <AdminMenuList />
        <Button className="mt-3 ml-5" size="sm">
          Documentation
        </Button>
      </Drawer>
      <div className="flex">
        <Card className="hidden xl:block h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              მენიუ
            </Typography>
          </div>
          <AdminMenuList />
        </Card>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
