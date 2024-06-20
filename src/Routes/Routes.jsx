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
import Payment from "../Components/Pages/Payment/Payment";
import InvoicePage from "../Components/Pages/Payment/InvoicePage";
import PaymentHistory from "../Components/Dashboard/SellerDashboard/PaymentHistory/PaymentHistory";
import AdminPaymentManage from "../Components/Dashboard/AdminPaymentManage/AdminPaymentManage";
import ManageCategory from "../Components/Dashboard/ManageCategory/ManageCategory";

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
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            },
            {
                path: '/payment/invoice',
                element: <InvoicePage></InvoicePage>
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
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>,
                
            },
            {
                path: 'manage-payment',
                element: <AdminPaymentManage></AdminPaymentManage>
            },
            {
                path: 'manage-category',
                element: <ManageCategory></ManageCategory>
            }
        ]
    }
])
export default router;