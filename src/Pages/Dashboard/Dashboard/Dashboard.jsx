import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendar, FaCalendarCheck, FaEnvelope, FaHome, FaList, FaListAlt, FaShoppingBag, FaShoppingCart, FaStar, FaUser, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import { MdOutlineReviews } from "react-icons/md";
import NavBar from "../../../shared/NavBar";
import { GiForkKnifeSpoon, GiHotMeal, GiMeal } from "react-icons/gi";
import useAdmin from "../../../Hooks/useAdmin";
import { Helmet } from "react-helmet";

const Dashboard = () => {

    const [isAdmin] = useAdmin()



    return (
        <div className="">
            <Helmet>
                <title>MealNest | Dashboard</title>
            </Helmet>
            <div className="bg-navy"><NavBar /></div>
            <div className="flex">
                <div className="w-64 min-h-screen  sticky bg-navy text-white" style={{ minHeight: 'calc(100vh - 68px)' }}>
                    <ul className="menu  w-56 rounded-box">
                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink to={'/dashboard/admin-home'} >
                                        <FaUser></FaUser>
                                        Admin Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/users'} >
                                        <FaUsers></FaUsers>
                                        Manage User
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/add-meals'} >
                                        <FaUtensils></FaUtensils>
                                        Add Meal
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/all-meals'} >
                                        <GiHotMeal />
                                        All Meals
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/all-reviews'} >
                                        <MdOutlineReviews />
                                        All Reviews
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/serve-meals'}>
                                        <GiMeal />
                                        Serve Meals
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/upcoming-meals'}>
                                        <GiForkKnifeSpoon />
                                        Upcoming Meals
                                    </NavLink>
                                </li>

                            </>
                                :
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/user-home'} >
                                            <FaUser></FaUser>
                                            My Profile
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to={'/dashboard/request'} >
                                            <FaCalendarCheck></FaCalendarCheck>
                                            Requested Meal
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to={'/dashboard/my-reviews'} >
                                            <MdOutlineReviews />
                                            My Review
                                        </NavLink>
                                    </li>
                                </>
                        }
                    </ul>

                </div>
                <div
                    style={{
                        minHeight: 'calc(100vh - 68px)',
                    }} className="w-full min-h-screen px-8" >

                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;