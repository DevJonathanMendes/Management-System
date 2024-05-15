import { useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import API from "../api/fetch";
import { useAuth } from "../hooks/useAuth";

export const SignUpPage = () => {
  const [username, setUsername] = useState("admin");
  const [email, setEmail] = useState(`${username}@email.com`);
  const [password, setPassword] = useState("admin");
  const { signIn }: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (await API("signup", { username, email, password })) {
      await signIn({ username });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <h1>Create your account</h1>
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

          <Form.Group controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button type="submit">Sing Up</Button>
          <p className="text-center">
            <small>
              <Link to="/signin">Already have an account?</Link>
            </small>
          </p>
        </Stack>
      </Form>
    </Container>
  );
};
