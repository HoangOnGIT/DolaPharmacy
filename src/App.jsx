import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/common/Layout";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import UserCrediential from "./pages/UserCrediential";
import Video from "./pages/Video";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";
import PersonalInfomation from "./pages/PersonalInfomation";
import Favourite from "./pages/Favourite";
import FavProvider from "./contexts/FavouriteContext";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/LayoutDashboard";
import DashboardProduct from "./components/dashboard/DashboardProduct";
import AddProduct from "./components/dashboard/AddProduct";
import DashboardProductDetail from "./components/dashboard/ProductDetail";
import ProtectedRoute from "./contexts/AuthDashboard";
import UpdateProduct from "./components/dashboard/UpdateProduct";
import Payment from "./pages/Payment";
import News from "./components/Home/News";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import OrderDetail from "./pages/OrdersDetail";
import QnA from "./pages/QnA";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />, // Set the homepage as the default route
        errorElement: <ErrorPage />,
      },
      {
        path: "product",
        element: <Product />,
        errorElement: <ErrorPage />,
      },
      {
        path: "promotion",
        element: <Product key={"promotion"} promotion={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: "login",
        element: <UserCrediential loginPage={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "register",
        element: <UserCrediential loginPage={false} />,
        errorElement: <ErrorPage />,
      },
      { path: "homepage", element: <Home /> },
      { path: "news", element: <News /> },
      {
        path: "news/:slug",
        element: <NewsDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "video",
        element: <Video />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <PersonalInfomation />,
        errorElement: <ErrorPage />,
      },
      {
        path: "fav",
        element: <Favourite />,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "payment",
        element: <Payment />,
        errorElement: <ErrorPage />,
      },
      {
        path: "confirmation/:orderId",
        element: <OrderDetail confirm={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetail />,
        errorElement: <ErrorPage />,
      },
      { path: "faq", element: <QnA /> },
      { path: "contact", element: <Contact /> },
      // { path: "favourite", element: <Contact /> },
      { path: "map", element: <Contact /> },
    ],
  },
  {
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "product", element: <DashboardProduct /> },
          { path: "product/add", element: <AddProduct /> },
          { path: "product/update/:id", element: <UpdateProduct /> },
          { path: "product/:id", element: <DashboardProductDetail /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <FavProvider>
            <RouterProvider router={router} />
          </FavProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
