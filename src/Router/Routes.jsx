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
import Error from "../Pages/Error/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error></Error>,
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
                loader: ({ params }) => fetch(`https://meal-nest-server.vercel.app/meals/${params.id}`)
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
                element: <PrivetRoute><Payment /></PrivetRoute>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: 'user-home',
                element: <Profile />
            },
            {
                path: 'request',
                element: <RequestedMeal />
            },
            {
                path: 'my-reviews',
                element: <MyReview></MyReview>
            },

            // admin routes

            {
                path: 'admin-home',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'add-meals',
                element: <AddMeals></AddMeals>
            },
            {
                path: 'all-meals',
                element: <AllMeals></AllMeals>
            },
            {
                path: 'all-reviews',
                element: <AllReviews></AllReviews>
            },
            {
                path: 'serve-meals',
                element: <ServeMeals></ServeMeals>
            },
            {
                path: 'upcoming-meals',
                element: <UpcomingMeals></UpcomingMeals>
            },
        ]
    }
])