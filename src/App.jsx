import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useFetchCart } from "./hooks/useFetchCart";
import { setCartItems } from "./features/cart/cartSlice";
import SidebarLayout from "./layouts/SidebarLayout";
import HeaderFooterLayout from "./layouts/HeaderFooterLayout";
import { LoadingSpinner } from "./components";

const Cart = React.lazy(() => import("./pages/user/Cart"));
const Checkout = React.lazy(() => import("./pages/user/Checkout"));
const Error = React.lazy(() => import("./pages/user/Error"));
const Login = React.lazy(() => import("./pages/user/Login"));
const ProductDetails = React.lazy(() => import("./pages/user/ProductDetails"));
const Products = React.lazy(() => import("./pages/user/Products"));
const Register = React.lazy(() => import("./pages/user/Register"));

const Fallback = () => <LoadingSpinner />;

const App = () => {
  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );
  const { cart } = useFetchCart(accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart) {
      dispatch(setCartItems(cart));
    }
  }, [cart, dispatch]);

  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          {/* Redirect / to /products */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route element={<HeaderFooterLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<Error />} />
          </Route>

          <Route element={<SidebarLayout />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
