import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import API from "../api/fetch";
import { FormInput } from "../components/forms/FormInput";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { FormLayout } from "../layouts/FormLayout";

export const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const {
    username, setUsername,
    password, setPassword
  } = useForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await API("signin", { username, password })) {
      signIn({ username });
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <h1>Login to your account</h1>
      <FormInput
        label="Username"
        type="text"
        value={username}
        onChange={setUsername}
        placeholder="Enter username"
        required
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter password"
        required
      />
      <Button type="submit">Sign In</Button>
      <p className="text-center">
        <small>
          <Link to="/signup">Don't have an account?</Link>
        </small>
      </p>
    </FormLayout>
  );
};
