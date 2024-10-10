import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface Props {
  children: React.ReactNode;
}

interface IUserToken {
  id: string;
  username: string;
  token: string;
}

interface AuthContextProps {
  user: IUserToken;
  signIn: (data: IUserToken) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: { id: "", username: "", token: "" },
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const signIn = async (data: IUserToken) => {
    setUser(data);
    navigate("/protected");
  };

  const signOut = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
