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
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import AdminLayout from "./layouts/AdminLayout";
import { useAuthToken } from "./hooks/useAuthToken";

const Cart = React.lazy(() => import("./pages/user/Cart"));
const Checkout = React.lazy(() => import("./pages/user/Checkout"));
const Error = React.lazy(() => import("./pages/user/Error"));
const Login = React.lazy(() => import("./pages/user/Login"));
const ProductDetails = React.lazy(() => import("./pages/user/ProductDetails"));
const Products = React.lazy(() => import("./pages/user/Products"));
const Register = React.lazy(() => import("./pages/user/Register"));
const UserDetails = React.lazy(() => import("./pages/user/UserProfile"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));

const Fallback = () => <LoadingSpinner />;

const App = () => {
  const { refreshToken } = useAuthToken();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loginData"));

    if (storedData?.refresh_token) {
      refreshToken({ refresh_token: storedData.refresh_token });
    }
  }, [refreshToken]);

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
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
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route element={<HeaderFooterLayout />}>
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserDetails />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Error />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route element={<SidebarLayout />}>
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
