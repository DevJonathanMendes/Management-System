import { Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import API from "../api/fetch";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import InputUsername from "../components/forms/InputUsername";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layouts/FormLayout";

export const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const seller = await API.post("sellers/signup", {
      username,
      email,
      password,
    });

    if (seller?.token) {
      signIn(seller);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Typography component="h1" variant="h4">
        {"Create your account"}
      </Typography>
      <InputUsername value={username} onChange={setUsername} />
      <InputEmail value={email} onChange={setEmail} />
      <InputPassword value={password} onChange={setPassword} />
      <Button type="submit" variant="contained">
        {"Sign Up"}
      </Button>
      <Typography>
        {"Already have an account? "}
        <Link to="/signin" component={RouterLink}>
          {"Sign In"}
        </Link>
      </Typography>
    </FormLayout>
  );
};
