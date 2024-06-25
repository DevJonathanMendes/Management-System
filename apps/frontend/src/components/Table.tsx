import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Customer } from "../interfaces/ISeller";
import { useAuth } from "../hooks/useAuth";
import APICustomer from "../api/Customers";

const TableCore = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  //call READ hook
  const {
    data: customersData = [],
    isError: isLoadingCustomersError,
    isFetching: isFetchingCustomers,
    isLoading: isLoadingCustomers,
  } = useGetCustomers();

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
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
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
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
          //remove any previous validation errors when user focuses on the input
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
    data: customersData,
    createDisplayMode: "modal", // default ('row', and 'custom' are also available).
    editDisplayMode: "modal", // default ('row', 'cell', 'table', and 'custom' are also available).
    enableEditing: true,
    state: {
      isLoading: isLoadingCustomers,
      // isSaving: isCreatingCustomer || isUpdatingCustomer || isDeletingCustomer,
      showAlertBanner: isLoadingCustomersError,
      showProgressBars: isFetchingCustomers,
    },
    initialState: {
      density: "compact",
      columnVisibility: {
        id: false,
        created: false,
        updated: false,
      },
    },
    enableSorting: false,
    enableSortingRemoval: false,
    enableFilters: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableStickyHeader: false,
    enableStickyFooter: false,
    enableRowSelection: false,
    enableRowActions: false,
    enableColumnFilters: false,
    enableColumnResizing: false,
    enableColumnOrdering: false,
    enableColumnPinning: false,
    enableColumnActions: false,
    columnResizeMode: "onEnd",
    muiToolbarAlertBannerProps: isLoadingCustomersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateCustomer,
    onEditingRowCancel: () => setValidationErrors({}),
    // onEditingRowSave: handleSaveCustomer,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Customer</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Edit Customer</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          {/* <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}> */}
          <IconButton color="error" onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Tooltip title="ADDER">
          <IconButton onClick={() => table.setCreatingRow(true)}>
            <AddIcon>a</AddIcon>
          </IconButton>
        </Tooltip>
      </>
    ),

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
};

// READ hook (get users from api)
function useGetCustomers() {
  const { user } = useAuth();

  return useQuery<Customer[]>({
    queryKey: ["customers"],
    refetchOnWindowFocus: false,
    queryFn: () => APICustomer.read(user.token),
  });
}

const queryClient = new QueryClient();
export const Table = () => (
  <QueryClientProvider client={queryClient}>
    <TableCore />
  </QueryClientProvider>
);
