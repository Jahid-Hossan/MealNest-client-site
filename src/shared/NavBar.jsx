import { Link, NavLink } from "react-router-dom";
import ButtonMD from "../component/Button";
import useAuth from "../Hooks/useAuth";

const NavBar = () => {

    const { user, logOut } = useAuth();




    const menus = (
        <>
            <li><NavLink to="/" activeClassName={'bg-red'}>Home</NavLink></li>
            <li><NavLink to="/meals" activeClassName={'bg-red'}>Meals</NavLink></li>
            <li><NavLink to="/upcoming" activeClassName={'bg-red'}>Upcoming</NavLink></li>
        </>
    );


    return (
        <div className="navbar   container mx-auto ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menus}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img src={'https://i.ibb.co/TmXhv7n/pngwing-com-6.png'} alt="" className="h-10" />
                    <a className=" text-white text-xl font-bold">MealNest</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu text-white menu-horizontal px-1">
                    {menus}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn-ghost btn-circle text-white  hover:bg-white hover:text-navy">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                {
                    user ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-white">
                                <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/pKRHk26/profile.png" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><p className="cursor-text disabled">{user?.displayName}</p></li>
                            <li className="hover:bg-slate-300 rounded" ><Link to={'/dashboard'}>Dashboard</Link></li>
                            <li className="hover:bg-slate-300 rounded" ><button onClick={logOut} >Logout</button></li>
                        </ul>
                    </div>
                        :
                        <Link to={'/login'}><ButtonMD btnText={"Join Us"}></ButtonMD></Link>
                }
            </div>
        </div>
    );
};

export default NavBar;