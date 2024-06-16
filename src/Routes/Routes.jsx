import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Register from "../Components/Pages/Register/Register";
import Login from "../Components/Pages/Login/Login";
import Home from "../Components/Pages/Home/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import PrivetRoute from "./PrivetRoute";
import ManageUsers from "../Components/Dashboard/ManageUsers/ManageUsers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
        children: [
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            }
        ]
    }
])
export default router;