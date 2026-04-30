import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  AuthUser,
  apiGetMe,
  apiLogin,
  apiSignup,
  apiLogout,
  apiUpdateProfile,
} from "@/lib/api";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      return;
    }
    apiGetMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("auth_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await apiLogin(email, password);
    localStorage.setItem("auth_token", token);
    setUser(user);
  };

  const signup = async (email: string, password: string) => {
    const { token, user } = await apiSignup(email, password);
    localStorage.setItem("auth_token", token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  const updateProfile = async (displayName: string) => {
    const updated = await apiUpdateProfile(displayName);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
