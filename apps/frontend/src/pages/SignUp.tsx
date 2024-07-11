import { Button, Link, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import FetchSellers from "../api/FetchSellers";
import InputEmail from "../components/forms/InputEmail";
import InputName from "../components/forms/InputName";
import InputPassword from "../components/forms/InputPassword";
import InputUsername from "../components/forms/InputUsername";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layouts/FormLayout";
import createFakeUser from "../utils/fakeUser";

export const SignUpPage = () => {
  const { signIn } = useAuth();
  const fakeUser = createFakeUser();
  const [name, setName] = useState<string>(fakeUser.firstName);
  const [username, setUsername] = useState<string>(fakeUser.username);
  const [password, setPassword] = useState<string>("admin");
  const [email, setEmail] = useState<string>(fakeUser.email);
  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    email: { error: false, message: "" },
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

  function HandleEmail(value: SetStateAction<string>) {
    const lengthValidation = value.length <= 0;

    setErrors((prevValues) => {
      prevValues.email = {
        error: lengthValidation,
        message: lengthValidation ? "Must be at least 0 characters long" : "",
      };

      return prevValues;
    });

    setEmail(value);
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

    const res = await FetchSellers.signup({
      name: name.length > 0 ? name : undefined,
      username,
      email,
      password,
    });

    if (res.token) {
      signIn(res);
    } else {
      res.message.forEach((msg: string) => {
        if (msg.includes("username")) {
          errors.username.error = true;
          errors.username.message = msg;
        }
        if (msg.includes("email")) {
          errors.email.error = true;
          errors.email.message = msg;
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
        {"Create your account"}
      </Typography>
      <InputName value={name} onChange={setName} autoFocus={true} />
      <InputUsername
        value={username}
        onChange={handleUsername}
        helperText={errors.username.message}
        error={errors.username.error}
      />

      <InputEmail
        value={email}
        onChange={HandleEmail}
        helperText={errors.email.message}
        error={errors.email.error}
      />
      <InputPassword
        value={password}
        onChange={handlePassword}
        helperText={errors.password.message}
        error={errors.password.error}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={
          errors.email.error || errors.username.error || errors.password.error
        }
      >
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
