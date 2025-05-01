import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FloatingButton from "./FloatingButton/FloatingButtons";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/homepage", { replace: true });
  // }, []);

  return (
    <>
  
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
        <FloatingButton />
    
    </>
  );
};

export default Layout;
