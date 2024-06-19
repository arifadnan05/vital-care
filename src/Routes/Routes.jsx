import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Register from "../Components/Pages/Register/Register";
import Login from "../Components/Pages/Login/Login";
import Home from "../Components/Pages/Home/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import PrivetRoute from "./PrivetRoute";
import ManageUsers from "../Components/Dashboard/ManageUsers/ManageUsers";
import ManageMedicine from "../Components/Dashboard/SellerDashboard/ManageMedicine/ManageMedicine";
import Shop from "../Components/Pages/Shop/Shop";
import Cart from "../Components/Pages/Cart/Cart";

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
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
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
            },
            {
                path: 'manage-medicine',
                element: <ManageMedicine></ManageMedicine>
            }
        ]
    }
])
export default router;