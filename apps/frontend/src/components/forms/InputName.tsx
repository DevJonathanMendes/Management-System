import { TextField } from "@mui/material";
import React from "react";

type InputUsernameProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  autoFocus?: boolean;
};

const InputName: React.FC<InputUsernameProps> = ({
  value,
  setValue,
  required = false,
  autoFocus = false,
}) => {
  return (
    <TextField
      id="name"
      name="name"
      label="Name"
      placeholder="Enter name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      required={required}
      autoFocus={autoFocus}
      autoComplete="current-name"
    />
  );
};

export default InputName;
