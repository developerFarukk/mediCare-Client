
import { useContext } from "react";
import { AuthContext } from "../../Authenication/AuthProvider/AuthProvider";



const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;