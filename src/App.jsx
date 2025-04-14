import "./App.css";
import Layout from "./components/common/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import FakeLogin from "./components/FakeLogin";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "product", element: <Product /> },
      { path: "product-detail/:id", element: <ProductDetail /> },
      { path: "login", element: <FakeLogin /> },
      { path: "cart", element: <Cart /> },
      // { path: "homepage", element: <Homepage /> },
      // { path: "news", element: <News /> },
      // { path: "video", element: <Video /> },
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
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
