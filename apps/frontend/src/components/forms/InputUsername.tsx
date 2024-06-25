import { TextField } from "@mui/material";
import React from "react";

type InputUsernameProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  autoFocus?: boolean;
};

const InputUsername: React.FC<InputUsernameProps> = ({
  value,
  onChange,
  required = true,
  autoFocus = false,
}) => {
  return (
    <TextField
      id="username"
      name="username"
      label="Username"
      placeholder="Enter username"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      required={required}
      autoFocus={autoFocus}
      autoComplete="current-username"
    />
  );
};

export default InputUsername;
