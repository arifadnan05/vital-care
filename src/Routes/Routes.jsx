import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Register from "../Components/Pages/Register/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])
export default router;