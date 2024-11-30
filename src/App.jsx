import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const AddCategory = React.lazy(() => import("./pages/admin/AddCategory"));
const AddProduct = React.lazy(() => import("./pages/admin/AddProduct"));
const ManageCategory = React.lazy(() => import("./pages/admin/ManageCategory"));
const ManageProduct = React.lazy(() => import("./pages/admin/ManageProduct"));

const Cart = React.lazy(() => import("./pages/user/Cart"));
const Checkout = React.lazy(() => import("./pages/user/Checkout"));
const Error = React.lazy(() => import("./pages/user/Error"));
// const Landing = React.lazy(() => import("./pages/user/Landing"));
const Login = React.lazy(() => import("./pages/user/Login"));
const ProductDetails = React.lazy(() => import("./pages/user/ProductDetails"));
const Products = React.lazy(() => import("./pages/user/Products"));
const Register = React.lazy(() => import("./pages/user/Register"));

import DashboardLayout from "./layouts/DashboardLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import HeaderFooterLayout from "./layouts/HeaderFooterLayout";
import { LoadingSpinner } from "./components";

const Fallback = () => <LoadingSpinner />;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          {/* Redirect / to /products */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* Public routes */}
          <Route element={<HeaderFooterLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
          </Route>

          {/* SidebarLayout routes */}
          <Route element={<SidebarLayout />}>
            <Route path="/products" element={<Products />} />
          </Route>

          {/* Product Details */}
          <Route element={<HeaderFooterLayout />}>
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>

          {/* Admin routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route
              path="/admin/manage-categories"
              element={<ManageCategory />}
            />
            <Route path="/admin/manage-products" element={<ManageProduct />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
