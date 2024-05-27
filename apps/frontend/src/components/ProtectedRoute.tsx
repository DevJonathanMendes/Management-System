import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type ProtectedRoute = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRoute> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};
