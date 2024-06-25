import { TextField } from "@mui/material";
import React from "react";

type InputEmailProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  autoFocus?: boolean;
};

const InputEmail: React.FC<InputEmailProps> = ({
  value,
  onChange,
  required = true,
  autoFocus = false,
}) => {
  return (
    <TextField
      id="email"
      name="email"
      label="E-mail"
      placeholder="Enter e-mail"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="email"
      required={required}
      autoFocus={autoFocus}
      autoComplete="email"
    />
  );
};

export default InputEmail;
