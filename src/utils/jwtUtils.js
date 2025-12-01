import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    try {
        const payload = jwtDecode(token);
        if (!payload.exp) {
            return true;
        }
        const now = new Date() / 1000;
        const isValid = now <= payload.exp;
        return !isValid;
    } catch (error) {
        return true;
    }
}

export default isTokenExpired;