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
  useQueryClient,
} from "@tanstack/react-query";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Customer } from "../types/Customer";
import { columnsConfig } from "./Columns";
import {
  useCreateCustomer,
  useDeleteCustomer,
  useGetCustomers,
  useUpdateCustomer,
} from "./TableQueries";

const TableCore = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const { mutateAsync: createCustomer, isPending: isCreatingCustomer } =
    useCreateCustomer(user.token, queryClient);

  const {
    data: customersData = [],
    isError: isLoadingCustomersError,
    isFetching: isFetchingCustomers,
    isLoading: isLoadingCustomers,
  } = useGetCustomers(user.token);

  const { mutateAsync: updateCustomer, isPending: isUpdatingCustomer } =
    useUpdateCustomer(user.token, queryClient);

  const { mutateAsync: deleteCustomer, isPending: isDeletingCustomer } =
    useDeleteCustomer(user.token, queryClient);

  const handleCreateCustomer: MRT_TableOptions<Customer>["onCreatingRowSave"] =
    async ({ values, table }) => {
      delete values.id;
      delete values.created;
      delete values.updated;

      const newValidationErrors = validateCustomer(values);

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      await createCustomer(values);
      table.setCreatingRow(null);
    };

  const handleSaveCustomer: MRT_TableOptions<Customer>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateCustomer(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateCustomer(values);
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<Customer>) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns: columnsConfig(validationErrors, setValidationErrors),
    data: customersData,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
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
    initialState: {
      density: "compact",
      columnVisibility: {
        id: false,
        created: false,
        updated: false,
      },
    },
    state: {
      isLoading: isLoadingCustomers,
      isSaving: isCreatingCustomer || isUpdatingCustomer || isDeletingCustomer,
      showAlertBanner: isLoadingCustomersError,
      showProgressBars: isFetchingCustomers,
    },
    muiToolbarAlertBannerProps: isLoadingCustomersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreateCustomer,
    onEditingRowSave: handleSaveCustomer,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New Customer</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="icon" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Edit Customer</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="icon" table={table} row={row} />
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
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
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

const queryClient = new QueryClient();
export const Table = () => (
  <QueryClientProvider client={queryClient}>
    <TableCore />
  </QueryClientProvider>
);

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) => {
  return (
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};
function validateCustomer(customer: Customer) {
  return {
    name: !validateRequired(customer.name) ? "Name is Required" : "",
    email: !validateEmail(customer.email) ? "Incorrect Email Format" : "",
  };
}
