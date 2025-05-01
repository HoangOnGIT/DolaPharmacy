
import Layout from "./components/common/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
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
import About from "./pages/About";
import Payment from "./pages/Payment";
import OrderDetail from "./pages/OrdersDetail";
import News from "./pages/News";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
        path: "/login",
        element: <UserCrediential loginPage={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <UserCrediential loginPage={false} />,
        errorElement: <ErrorPage />,
      },
      { path: "homepage", element: <Home /> },
      { path: "news", element: <News /> },
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
      // { path: "qna", element: <QnA /> },
      { path: "contact", element: <Contact /> },
      // { path: "favourite", element: <Contact /> },
      // { path: "map", element: <Map /> },
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
