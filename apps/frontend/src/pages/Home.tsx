import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Stack gap={2}>
      <h1>Management System</h1>
      <Button onClick={() => navigate("/signin")}>Sign in</Button>
      <Button variant="secondary" onClick={() => navigate("/signup")}>
        Sign up
      </Button>
    </Stack>
  );
};
