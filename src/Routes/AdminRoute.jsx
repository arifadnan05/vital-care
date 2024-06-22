import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Shared/loading/LoadingSpinner";




// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    // Data Loading
    if (loading && isAdminLoading) {

        return <LoadingSpinner></LoadingSpinner>
    }


    // User && Admin Check
    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;