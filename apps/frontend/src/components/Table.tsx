import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";

export default function Table({ data }: { data: any[] }) {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    layoutMode: "semantic",
    initialState: { density: "compact" },
    enableColumnResizing: true,
    enableStickyHeader: true,
    enableStickyFooter: true,

    muiTablePaperProps: {
      sx: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },

    muiTopToolbarProps: {
      sx: {},
    },
    muiTableContainerProps: {
      sx: {
        flexGrow: "1",
      },
    },
    muiBottomToolbarProps: {
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

  return (
    <div
      style={{
        backgroundColor: "green",
        display: "flex",
        minHeight: "720px",
        maxHeight: "720px",
      }}
    >
      <MaterialReactTable table={table} />
    </div>
  );
}
