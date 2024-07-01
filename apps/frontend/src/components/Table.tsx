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
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import APICustomer from "../api/Customers";
import { useAuth } from "../hooks/useAuth";
import { Customer } from "../interfaces/ISeller";

const TableCore = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // call CREATE hook
  const { mutateAsync: createCustomer, isPending: isCreatingCustomer } =
    useCreateCustomer();

  //CREATE action
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
      table.setCreatingRow(null); //exit creating mode
    };

  //call READ hook
  const {
    data: customersData = [],
    isError: isLoadingCustomersError,
    isFetching: isFetchingCustomers,
    isLoading: isLoadingCustomers,
  } = useGetCustomers();

  // call UPDATE hook
  const { mutateAsync: updateCustomer, isPending: isUpdatingCustomer } =
    useUpdateCustomer();

  // UPDATE action
  const handleSaveCustomer: MRT_TableOptions<Customer>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateCustomer(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateCustomer(values);
      table.setEditingRow(null); //exit editing mode
    };

  // call DELETE hook
  const { mutateAsync: deleteCustomer, isPending: isDeletingCustomer } =
    useDeleteCustomer();

  // DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Customer>) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(row.original.id);
    }
  };

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
          //remove any previous validation errors when customer focuses on the input
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
          //remove any previous validation errors when customer focuses on the input
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

  const table = useMaterialReactTable({
    columns,
    data: customersData,
    createDisplayMode: "modal", // default ('row', and 'custom' are also available).
    editDisplayMode: "modal", // default ('row', 'cell', 'table', and 'custom' are also available).
    enableEditing: true,
    state: {
      isLoading: isLoadingCustomers,
      isSaving: isCreatingCustomer || isUpdatingCustomer || isDeletingCustomer,
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
    onCreatingRowSave: handleCreateCustomer,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCustomer,
    //optionally customize modal content
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

// CREATE hook (post new customer to api)
function useCreateCustomer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (customer: Customer) =>
      await APICustomer.create(customer, user.token),

    // Client side optimistic update.
    onMutate: (newCustomerInfo: Customer) => {
      queryClient.setQueryData(["customers"], (prevCustomers: any) => {
        return [newCustomerInfo, ...prevCustomers] as Customer[];
      });
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['customers'] }), //refetch customers after mutation, disabled for demo
  });
}

// READ hook (get customers from api)
function useGetCustomers() {
  const { user } = useAuth();

  return useQuery<Customer[]>({
    queryKey: ["customers"],
    refetchOnWindowFocus: false,
    queryFn: () => APICustomer.read(user.token),
  });
}

// UPDATE hook (put customer in api)
function useUpdateCustomer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customer: Customer) =>
      await APICustomer.update(customer, user.token),

    // Client side optimistic update
    onMutate: (newCustomerInfo: Customer) => {
      queryClient.setQueryData(["customers"], (prevCustomers: Customer[]) =>
        prevCustomers?.map((prevCustomer: Customer) =>
          prevCustomer.id === newCustomerInfo.id
            ? newCustomerInfo
            : prevCustomer
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['customers'] }), //refetch customers after mutation, disabled for demo
  });
}

// DELETE hook (delete customer in api)
function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (customerId: string) =>
      await APICustomer.delete(customerId, user.token),

    //client side optimistic update
    onMutate: (customerId: string) => {
      queryClient.setQueryData(["customers"], (prevCustomers: any) =>
        prevCustomers?.filter(
          (customer: Customer) => customer.id !== customerId
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['customers'] }), //refetch customers after mutation, disabled for demo
  });
}

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
