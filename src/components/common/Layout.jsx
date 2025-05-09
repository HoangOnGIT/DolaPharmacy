import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FloatingButton from "./FloatingButton/FloatingButtons";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
      <FloatingButton />
    </>
  );
};

export default Layout;
