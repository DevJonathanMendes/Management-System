import { Button, Link, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import APISeller from "../api/FetchSellers";
import InputPassword from "../components/forms/InputPassword";
import InputUsername from "../components/forms/InputUsername";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layouts/FormLayout";

export const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  function handleUsername(value: SetStateAction<string>) {
    if (typeof value === "string") {
      const trimmedValue = value.replace(/\s/g, ""); // Remove espaços.
      const lengthValidation = trimmedValue.length < 2;

      setErrors((prevValues) => ({
        ...prevValues,
        username: {
          error: lengthValidation,
          message: lengthValidation ? "Must be at least 2 characters long" : "",
        },
      }));

      setUsername(trimmedValue);
    }
  }

  function handlePassword(value: SetStateAction<string>) {
    const lengthValidation = value.length < 2;

    setErrors((prevValues) => ({
      ...prevValues,
      password: {
        error: lengthValidation,
        message: lengthValidation ? "Must be at least 2 characters long" : "",
      },
    }));

    setPassword(value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await APISeller.signin({ username, password });

    if (res.token) {
      signIn(res);
    } else {
      res.message.forEach((msg: string) => {
        if (msg.includes("Seller")) {
          errors.username.error = true;
          errors.username.message = msg;
        }
        if (msg.includes("password")) {
          errors.password.error = true;
          errors.password.message = msg;
        }
      });

      setErrors({ ...errors });
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Typography component="h1" variant="h4">
        {"Login to your account"}
      </Typography>
      <InputUsername
        value={username}
        onChange={handleUsername}
        helperText={errors.username.message}
        error={errors.username.error}
      />
      <InputPassword
        value={password}
        onChange={handlePassword}
        helperText={errors.password.message}
        error={errors.password.error}
      />
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
