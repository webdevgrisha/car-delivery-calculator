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
  currentUser: User;
  id: number;
  email: string;
  role: 'admin' | 'user';
};

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const unsubscriber = subscribeOnAuthStateChanged(async (user) => {
      console.log('user: ', user);
      user.role = (await checkAdminRole()) ? 'admin' : 'user';
      setCurrentUser(user);
    });

    return unsubscriber;
  }, []);

  const value = {
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
