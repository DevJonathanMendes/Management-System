import { TextField } from "@mui/material";
import React from "react";

type InputPasswordProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  required = true,
}) => {
  return (
    <TextField
      id="password"
      name="password"
      label="Password"
      placeholder="Enter password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="password"
      required={required}
      autoFocus
      autoComplete="current-password"
    />
  );
};

export default InputPassword;
