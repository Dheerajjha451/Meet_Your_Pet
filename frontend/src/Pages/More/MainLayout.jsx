import { Outlet } from "react-router-dom";
import Footer from "../../assets/Components/Footer";
import Navbar from "../../assets/Components/Navbar"
const MainLayout = () => {

  return (
    <div className="bg-customBg">
      <Navbar/>
      <div className="py-0">
        <Outlet />
      </div>
      <Footer/>

    </div>
  );
};

export default MainLayout;