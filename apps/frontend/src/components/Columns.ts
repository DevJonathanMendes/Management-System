import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Customer } from "../interfaces/ISeller";

export function columnsConfig(validationErrors: any, setValidationErrors: any) {
  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 0,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 0,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 0,
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        id: "updated",
        accessorKey: "updated",
        header: "Updated",
        size: 0,
        enableEditing: false,
        Edit: () => null,
        accessorFn: ({ updated }) => new Date(updated).toLocaleDateString(),
      },
      {
        id: "created",
        accessorKey: "created",
        header: "Created",
        size: 0,
        enableEditing: false,
        Edit: () => null,
        accessorFn: ({ created }) => new Date(created).toLocaleDateString(),
      },
    ],
    [validationErrors]
  );

  return columns;
}
