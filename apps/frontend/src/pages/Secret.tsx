import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const Secret = () => {
  const { signOut }: any = useAuth();

  const handleSignOut = () => signOut();

  return (
    <div>
      <h1>This is a Secret page</h1>
      <Button onClick={handleSignOut}>signOut</Button>
    </div>
  );
};
