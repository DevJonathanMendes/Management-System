import { TextField } from "@mui/material";

type InputUsernameProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
};

const InputUsername: React.FC<InputUsernameProps> = ({
  value,
  setValue,
  required = true,
  error = false,
  helperText,
  autoFocus = false,
}) => {
  return (
    <TextField
      id="username"
      name="username"
      label="Username"
      placeholder="Enter username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      required={required}
      error={error}
      helperText={helperText}
      autoFocus={autoFocus}
      autoComplete="current-username"
    />
  );
};

export default InputUsername;
