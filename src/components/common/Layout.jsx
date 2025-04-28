import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FloatingButton from "./FloatingButton/FloatingButtons";
import { Outlet } from "react-router-dom";
import { memo } from "react";

const Layout = memo(() => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <FloatingButton />
    </>
  );
});

export default Layout;
