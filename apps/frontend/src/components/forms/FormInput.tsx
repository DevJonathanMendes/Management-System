import React from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  setValue,
  placeholder,
  required = false,
}) => {
  return (
    <Form.Group controlId={label.toLowerCase()}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </Form.Group>
  );
};
