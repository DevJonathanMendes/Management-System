import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import API from "../api/fetch";
import { FormInput } from "../components/forms/FormInput";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { FormLayout } from "../layouts/FormLayout";

export const SignUpPage = () => {
  const { signIn } = useAuth();
  const { 
    username, setUsername,
    email, setEmail,
    password, setPassword
  } = useForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await API("signup", { username, email, password })) {
      signIn({ username });
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <h1>Create your account</h1>
      <FormInput
        label="Username"
        type="text"
        value={username}
        onChange={setUsername}
        placeholder="Enter username"
        required
      />
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Enter e-mail"
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

      <Button type="submit">Sing Up</Button>
      <p className="text-center">
        <small>
          <Link to="/signin">Already have an account?</Link>
        </small>
      </p>
    </FormLayout>
  );
};
