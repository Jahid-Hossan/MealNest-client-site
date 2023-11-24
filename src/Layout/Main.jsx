import { Helmet } from "react-helmet";
import NavBar from "../shared/NavBar";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {

    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div className="">
            {noHeaderFooter || <div className="container mx-auto">
                <NavBar />
            </div>}
            <Outlet />
        </div>
    );
};

export default Main;