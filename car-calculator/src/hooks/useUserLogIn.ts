// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../utils/AuthProvider";


// const allowPath = ['calculator', 'profile', 'login'];

// function useUserLogIn() {
//     const { currentUser } = useAuth();
//     const { pathname } = useLocation();
//     const navigate = useNavigate();

//     const isPathAllowed = allowPath.some(path => pathname.includes(path));
   

//     if (currentUser === null) {
//         navigate('/login', { replace: true });
//     }

//     if (!isPathAllowed && currentUser !== null && currentUser.role === 'user') {
//         navigate('/calculator', { replace: true });
//     }

//     // return currentUser;
// }

// export default useUserLogIn;