import { faker } from "@faker-js/faker";
import { Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import API from "../api/fetch";
import InputEmail from "../components/forms/InputEmail";
import InputName from "../components/forms/InputName";
import InputPassword from "../components/forms/InputPassword";
import InputUsername from "../components/forms/InputUsername";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layouts/FormLayout";

export const SignUpPage = () => {
  const fakeFirstName = faker.person.firstName();
  const fakeLastName = faker.person.lastName();
  const fakeUsername = faker.internet.userName({
    firstName: fakeFirstName,
    lastName: fakeLastName,
  });
  const fakeEmail = faker.internet.email({
    firstName: fakeFirstName,
    lastName: fakeLastName,
    provider: "email.com",
  });

  const [name, setName] = useState<string>(fakeFirstName);
  const [username, setUsername] = useState<string>(fakeUsername);
  const [password, setPassword] = useState<string>("admin");
  const [email, setEmail] = useState<string>(fakeEmail);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const seller = await API.post("sellers/signup", {
        name: name.length > 0 ? name : undefined,
        username,
        email,
        password,
      });

      if (seller?.token) {
        signIn(seller);
      }
    } catch (err) {
      console.log("SIGNUP ERROR:", err);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Typography component="h1" variant="h4">
        {"Create your account"}
      </Typography>
      <InputName value={name} onChange={setName} autoFocus={true} />
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
