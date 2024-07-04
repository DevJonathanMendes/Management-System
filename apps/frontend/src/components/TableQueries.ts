import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APICustomer from "../api/Customers";
import { CreateCustomer, Customer } from "../interfaces/ISeller";

export function useCreateCustomer(token: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (customer: CreateCustomer) =>
      await APICustomer.create(customer, token),

    onMutate: (newCustomerInfo: Customer) => {
      queryClient.setQueryData(["customers"], (prevCustomers: any) => {
        return [newCustomerInfo, ...prevCustomers] as Customer[];
      });
    },
  });
}

export function useGetCustomers(token: string) {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    refetchOnWindowFocus: false,
    queryFn: () => APICustomer.read(token),
  });
}

export function useUpdateCustomer(token: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (customer: Customer) =>
      await APICustomer.update(customer, token),

    onMutate: (newCustomerInfo: Customer) => {
      queryClient.setQueryData(["customers"], (prevCustomers: Customer[]) =>
        prevCustomers?.map((prevCustomer: Customer) =>
          prevCustomer.id === newCustomerInfo.id
            ? newCustomerInfo
            : prevCustomer
        )
      );
    },
  });
}

export function useDeleteCustomer(token: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (customerId: string) =>
      await APICustomer.delete(customerId, token),

    onMutate: (customerId: string) => {
      queryClient.setQueryData(["customers"], (prevCustomers: any) =>
        prevCustomers?.filter(
          (customer: Customer) => customer.id !== customerId
        )
      );
    },
  });
}
