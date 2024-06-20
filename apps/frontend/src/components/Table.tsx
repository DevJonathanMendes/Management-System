import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Customer } from "../interfaces/ISeller";

type PropsTable = { data: Customer[] };

export default function Table({ data }: PropsTable) {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        id: "email",
        accessorKey: "email",
        header: "E-mail",
      },
      {
        id: "updated",
        accessorKey: "updated",
        header: "Updated",
        accessorFn: ({ updated }) => {
          return new Date(updated).toLocaleDateString();
        },
      },
      {
        id: "created",
        accessorKey: "created",
        header: "Created",
        accessorFn: ({ created }) => {
          return new Date(created).toLocaleDateString();
        },
      },
    ],
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      density: "compact",
      columnVisibility: {
        created: false,
        updated: false,
      },
    },
    enableSorting: false,
    enableRowSelection: false,
    enableSortingRemoval: false,
    enableFilters: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableStickyHeader: false,
    enableRowActions: false,
    enableStickyFooter: false,
    enableColumnFilters: false,
    enableColumnResizing: false,
    enableColumnOrdering: false,
    enableColumnPinning: false,
    enableColumnActions: false,
    columnResizeMode: "onEnd",

    muiTablePaperProps: {
      sx: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
      },
    },

    muiTopToolbarProps: {
      sx: {},
    },
    muiTableContainerProps: {
      sx: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        maxHeight: "50px",
      },
    },
  });

  return <MaterialReactTable table={table} />;
}

const validateRequired = (value: string) => !!value.length;

const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: Customer) {
  return {
    name: !validateRequired(user.name) ? "Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
