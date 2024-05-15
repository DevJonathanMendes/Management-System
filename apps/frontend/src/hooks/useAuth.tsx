import { ReactElement, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "./useLocalStorage";

interface Props {
  children: ReactElement;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  interface IEntity {
    username: string;
    token: string;
  }

  const signIn = async (data: IEntity) => {
    setUser(data);
    navigate("/protected");
  };

  // call this function to sign out logged in user
  const signOut = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
