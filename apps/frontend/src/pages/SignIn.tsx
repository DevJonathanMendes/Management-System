import { Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import InputPassword from "../components/forms/InputPassword";
import InputUsername from "../components/forms/InputUsername";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layouts/FormLayout";
import APISeller from "../api/FetchSellers";

export const SignInPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const seller = await APISeller.signin({ username, password });

    if (seller?.token) {
      signIn(seller);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Typography component="h1" variant="h4">
        {"Login to your account"}
      </Typography>
      <InputUsername value={username} onChange={setUsername} autoFocus={true} />
      <InputPassword value={password} onChange={setPassword} />
      <Button type="submit" variant="contained">
        {"Sign In"}
      </Button>
      <Typography>
        {"Don't have an account? "}
        <Link to="/signup" component={RouterLink}>
          {"Sign Up"}
        </Link>
      </Typography>
    </FormLayout>
  );
};
