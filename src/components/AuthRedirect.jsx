import { Navigate } from "react-router-dom";
import useAuth from "../services/useAuth";

function AuthRedirect({ children }) {
    const { isLoged } = useAuth();
    
    if (isLoged) {
        return <Navigate to="/catalog" replace />;
    } 

    return children;
}

export default AuthRedirect;
