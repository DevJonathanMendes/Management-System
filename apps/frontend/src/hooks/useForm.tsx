import { useState } from "react";

type setValue = React.Dispatch<React.SetStateAction<string>>;

interface IUseForm {
  username: string;
  setUsername: setValue;
  email: string;
  setEmail: setValue;
  password: string;
  setPassword: setValue;
}

export const useForm = (): IUseForm => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return { username, email, password, setUsername, setEmail, setPassword };
};
