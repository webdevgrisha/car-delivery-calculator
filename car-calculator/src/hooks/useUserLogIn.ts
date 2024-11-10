import { useAuth } from "../utils/AuthProvider";

function useUserLogIn() {
    const { currentUser } = useAuth();

    if (currentUser === null) {
        window.location.pathname = '/login';
        throw Error('User not logIn')
    }
    return currentUser;

}

export default useUserLogIn;