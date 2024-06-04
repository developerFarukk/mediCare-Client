import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/useAuth";



const PrivetRout = ( { children } ) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivetRout;