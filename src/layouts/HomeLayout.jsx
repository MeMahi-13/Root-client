// Layout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {


    return (
        
           <div>
             <Navbar />
            <Outlet />
            <Footer/>
           </div>
    
    );
};
export default HomeLayout