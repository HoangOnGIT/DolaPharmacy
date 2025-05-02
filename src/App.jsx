import "./App.css";
import Layout from "./components/common/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import FakeLogin from "./components/FakeLogin";
import Video from "./pages/Video";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import UserCrediential from "./pages/UserCrediential";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "product", element: <Product /> },
      { path: "product-detail/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <UserCrediential loginPage={true} /> },
      { path: "register", element: <UserCrediential loginPage={false} /> },
      { path: "homepage", element: <Home /> },
      { path: "video", element: <Video /> },
      { path: "profile", element: <PersonalInfomation /> },
      { path: "fav", element: <Favourite /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <DashboardProduct /> },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/:id", element: <DashboardProductDetail /> },
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
