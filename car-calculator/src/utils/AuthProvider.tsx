import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  subscribeOnAuthStateChanged,
  checkAdminRole,
} from '../services/firebase/auth';

type User = {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName: string;
};

interface CurrentUser {
  currentUser: User | null;
}

const AuthContext = createContext<CurrentUser | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const unsubscriber = subscribeOnAuthStateChanged(async (user) => {
      console.log('user: ', user);

      if (user === null) {
        if (window.location.pathname !== '/login') {
          window.location.pathname = '/login';
        }
        return;
      }

      const userRole: 'admin' | 'user' = (await checkAdminRole()) as
        | 'admin'
        | 'user';

      setCurrentUser({
        uid: user.uid,
        email: user.email || '',
        role: userRole,
        displayName: user.displayName || '',
      });
    });

    return unsubscriber;
  }, []);

  console.log('currentUser: ', currentUser);

  const value: CurrentUser = {
    currentUser,
  };

  if (!currentUser && window.location.pathname !== '/login') {
    console.log(window.location.pathname);
    window.location.pathname = '/login';
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  //  children : <Navigate to="/login" />;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
