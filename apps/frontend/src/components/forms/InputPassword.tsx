import { TextField } from "@mui/material";

type InputPasswordProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  setValue,
  required = true,
  error = false,
  helperText,
  autoFocus = false,
}) => {
  return (
    <TextField
      id="password"
      name="password"
      label="Password"
      placeholder="Enter password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="password"
      required={required}
      error={error}
      helperText={helperText}
      autoFocus={autoFocus}
      autoComplete="current-password"
    />
  );
};

export default InputPassword;
