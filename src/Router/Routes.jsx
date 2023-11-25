import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from '../Pages/Home/Home/Home';
import MealDetails from "../Pages/Home/MealDetails/MealDetails";
import Meals from "../Pages/Meals/Meals";
import Payment from "../Pages/Home/Payment/Payment";

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
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/payment',
                element: <Payment />
            },
        ]
    }
])