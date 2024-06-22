import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useSeller from "../Hooks/useSeller";
import LoadingSpinner from "../Shared/loading/LoadingSpinner";





// eslint-disable-next-line react/prop-types
const SellerRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const [isSeller, isSellerLoading] = useSeller();

    const location = useLocation();

    // Data Loading
    if (loading && isSellerLoading) {

        return <LoadingSpinner></LoadingSpinner>
    }


    // User && Admin Check
    if (user && isSeller) {
        return children;
    }

    return <Navigate state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;