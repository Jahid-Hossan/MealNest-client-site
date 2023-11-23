import { Helmet } from "react-helmet";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="">
            <div className="container mx-auto">
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};

export default Main;