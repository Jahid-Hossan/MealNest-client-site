import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from '../Pages/Home/Home/Home';
import MealDetails from "../Pages/Home/MealDetails/MealDetails";
import Meals from "../Pages/Meals/Meals";
import Payment from "../Pages/Home/Payment/Payment";
import UpcomingMeal from "../Pages/UpcomingMeal/UpcomingMeal";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/user/Profile";
import RequestedMeal from "../Pages/Dashboard/user/RequestedMeal";
import MyReview from "../Pages/Dashboard/user/MyReview";
import PrivetRoute from './PrivetRoute';
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddMeals from "../Pages/Dashboard/Admin/AddMeals/AddMeals";
import AllMeals from "../Pages/Dashboard/Admin/AllMeals/AllMeals";
import AllReviews from "../Pages/Dashboard/Admin/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashboard/Admin/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/Admin/UpcomingMeals/UpcomingMeals";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/meals',
                element: <Meals />
            },
            {
                path: '/meals/:id',
                element: <MealDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/meals/${params.id}`)
            },
            {
                path: '/upcoming',
                element: <UpcomingMeal />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/payment/:id',
                element: <Payment />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
        children: [
            {
                path: '/dashboard/profile',
                element: <Profile />
            },
            {
                path: '/dashboard/request',
                element: <RequestedMeal />
            },
            {
                path: '/dashboard/my-reviews',
                element: <MyReview></MyReview>
            },

            // admin routes

            {
                path: '/dashboard/admin-profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: '/dashboard/users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: '/dashboard/add-meals',
                element: <AddMeals></AddMeals>
            },
            {
                path: '/dashboard/all-meals',
                element: <AllMeals></AllMeals>
            },
            {
                path: '/dashboard/all-reviews',
                element: <AllReviews></AllReviews>
            },
            {
                path: '/dashboard/serve-meals',
                element: <ServeMeals></ServeMeals>
            },
            {
                path: '/dashboard/upcoming-meals',
                element: <UpcomingMeals></UpcomingMeals>
            },
        ]
    }
])