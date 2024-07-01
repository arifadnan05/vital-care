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
import HomeCategoryDetails from "../Components/Pages/HomeCategory/HomeCategoryDetails/HomeCategoryDetails";
import ReqAdvertisement from "../Components/Dashboard/SellerDashboard/ReqAdvertisement/ReqAdvertisement";
import AdminBannerManage from "../Components/Dashboard/AdminBannerMange/AdminBannerManage";
import TotalRevenue from "../Components/Dashboard/SellerDashboard/TotalRevenue/TotalRevenue";
import AdminTotalRevenue from "../Components/Dashboard/AdminTotalRevenue/AdminTotalRevenue";
import SalesReport from "../Components/Dashboard/SellerDashboard/SalesReport/SalesReport";
import UserPaymentHistory from "../Components/Dashboard/UserPaymentHistory/UserPaymentHistory";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import UpdateProfile from "../Components/Pages/UpdateProfile/UpdateProfile";
import UpdateCategory from "../Components/Dashboard/ManageCategory/UpdateCategory/UpdateCategory";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: '/category/:category',
                element: <HomeCategoryDetails></HomeCategoryDetails>,
                loader: ({ params }) => fetch(`https://vital-care-nu.vercel.app/category/${params.category}`)
            },
            {
                path: '/update-profile',
                element: <UpdateProfile></UpdateProfile>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'admin-statistics',
                element: <AdminRoute><AdminTotalRevenue></AdminTotalRevenue></AdminRoute>
            },
            {
                path: 'sales-report',
                element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
            },
            {
                path: 'statistics',
                element: <SellerRoute><TotalRevenue></TotalRevenue></SellerRoute>

            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-medicine',
                element: <ManageMedicine></ManageMedicine>
            },
            {
                path: 'payment-history',
                element: <SellerRoute><PaymentHistory></PaymentHistory></SellerRoute>

            },
            {
                path: 'manage-payment',
                element: <AdminRoute><AdminPaymentManage></AdminPaymentManage></AdminRoute>
            },
            {
                path: 'manage-category',
                element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>
            },
            {
                path: 'request-advertisement',
                element: <SellerRoute><ReqAdvertisement></ReqAdvertisement></SellerRoute>
            },
            {
                path: 'manage-advertisement',
                element: <AdminRoute><AdminBannerManage></AdminBannerManage></AdminRoute>
            },
            {
                path: 'user-payment-history',
                element: <PrivetRoute><UserPaymentHistory></UserPaymentHistory></PrivetRoute>
            },
            {
                path: 'update-category/:id',
                element: <AdminRoute><UpdateCategory></UpdateCategory></AdminRoute>,
                loader: ({ params }) => fetch(`https://vital-care-nu.vercel.app/category/${params.id}`)
            }
        ]
    }
])
export default router;