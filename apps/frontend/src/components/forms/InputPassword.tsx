import { TextField } from "@mui/material";
import React from "react";

type InputPasswordProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  autoFocus?: boolean;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  required = true,
  autoFocus = false,
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
      autoFocus={autoFocus}
      autoComplete="current-password"
    />
  );
};

export default InputPassword;
