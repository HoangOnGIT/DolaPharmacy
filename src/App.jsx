import "./App.css";
import Layout from "./components/common/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Video from "./pages/Video";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import UserCrediential from "./pages/UserCrediential";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

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
      // { path: "homepage", element: <Homepage /> },
      // { path: "news", element: <News /> },
      {
        path: "video",
        element: <Video />,
        errorElement: <ErrorPage />,
      },
      // { path: "qna", element: <QnA /> },
      // { path: "contact", element: <Contact /> },
      // { path: "cart", element: <Contact /> },
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
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
