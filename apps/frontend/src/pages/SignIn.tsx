import { useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import API from "../api/fetch";
import { useAuth } from "../hooks/useAuth";

export const SignInPage = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const { signIn }: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (await API("signin", { username, password })) {
      await signIn({ username });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <h1>Login to your account</h1>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Sing In</Button>
          <p className="text-center">
            <small>
              <Link to="/signup">Don't have an account?</Link>
            </small>
          </p>
        </Stack>
      </Form>
    </Container>
  );
};
