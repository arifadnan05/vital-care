import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth"
import LoadingSpinner from "../Shared/loading/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if(user) {
        return children
    }
    if(loading){
        return <LoadingSpinner />
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
}

export default PrivetRoute
