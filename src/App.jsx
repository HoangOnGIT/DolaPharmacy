import "./App.css";
import Layout from "./components/common/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "product", element: <Product /> },
      { path: "product-detail/:id", element: <ProductDetail /> },
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
  return <RouterProvider router={router} />;
}

export default App;
