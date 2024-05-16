import React from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <Form.Group controlId={props.label.toLowerCase()}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        {...props}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Form.Group>
  );
};
