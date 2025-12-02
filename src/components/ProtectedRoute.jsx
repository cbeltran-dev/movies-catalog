import { Navigate } from "react-router-dom";
import useAuth from "../services/useAuth";

function ProtectedRoute({ children }) {
    const { isLoged } = useAuth();
    if (!isLoged) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;