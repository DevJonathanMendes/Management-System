import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { Customer } from "../interfaces/ISeller";

export default function Table({ data }: { data: Customer[] }) {
  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      /* {
        accessorKey: "id",
        header: "ID",
        // size: 150,
      }, */
      {
        accessorKey: "name",
        header: "Name",
        // size: 150,
        muiEditTextFieldProps: {
          required: true,
          // error: "!!validationErrors?.firstName",
          helperText: "validationErrors?.firstName",
          //remove any previous validation errors when user focuses on the input
          onFocus: () => "hello",
          /* setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }), */
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "email",
        header: "E-mail",
        // size: 150,
      },
      /*  {
        accessorKey: "updated",
        header: "Updated",
        // size: 150,
      },
      {
        accessorKey: "created",
        header: "Created",
        // size: 150,
      }, */
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    layoutMode: "semantic",
    initialState: { density: "compact" },
    // enableDensityToggle: false,
    // enableColumnResizing: true,
    // enableColumnOrdering: true,
    // enableColumnPinning: true,
    // enableStickyHeader: true,
    // enableStickyFooter: true,
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

    muiTableProps: {
      sx: {},
    },

    muiTableBodyRowProps: {
      sx: {},
    },
    muiTableBodyProps: {
      sx: {},
    },
    muiTableFooterCellProps: {
      sx: {},
    },
    muiTableHeadProps: {
      sx: {},
    },
    muiTableFooterProps: {
      sx: {},
    },
  });

  return <MaterialReactTable table={table} />;
}
