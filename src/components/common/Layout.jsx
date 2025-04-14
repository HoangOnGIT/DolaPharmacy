import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FloatingButton from "./FloatingButton/FloatingButtons";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />

      <Footer />
      <FloatingButton />
    </>
  );
}

export default Layout;
