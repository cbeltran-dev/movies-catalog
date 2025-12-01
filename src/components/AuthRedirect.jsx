import { Navigate } from "react-router-dom";
import useAuth from "../services/useAuth";

export default function AuthRedirect({ children }) {
    const { isLoged } = useAuth();
    
    if (isLoged) {
        return <Navigate to="/" replace />;
    }
    return children;
}
