import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { useMemo } from "react";


const allowPath = ['calculator', 'profile', 'login'];

function useUserLogIn() {
    const { currentUser } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isPathAllowed = useMemo(() => {
        return allowPath.some(path => pathname.includes(path));
    }, [pathname]);

    if (currentUser === null) {

        navigate('/login', { replace: true });
        throw Error('User not logIn');
    }

    if (!isPathAllowed && currentUser !== null && currentUser.role === 'user') {
        navigate('/calculator', { replace: true });
        throw Error('User does not have access');
    }

    return currentUser;
}

export default useUserLogIn;