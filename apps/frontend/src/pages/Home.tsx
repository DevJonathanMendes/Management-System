import { useState, useEffect } from "react";
import api from "../api/fetch";
import AddCustomer from "../components/AddCustomer";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { ICustomer } from "../interfaces/ICustomer";

const BtnUpdate = ({ setCustomers }: any) => {
  const handleClick = async () => {
    try {
      const data = await api.get("customers");
      setCustomers(data);
    } catch (err) {
      console.error("Error updating customers:", err);
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-sm btn-primary my-1">
      Update
    </button>
  );
};

export default function Home() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("customers");
        setCustomers(data);
        setFilteredCustomers(data); // Inicialmente, a lista filtrada é a mesma que a lista de clientes
      } catch (err) {
        console.error("Error fetching initial customers:", err);
      }
    };

    fetchData();
  }, []);

  const applyFilter = (filtered: ICustomer[]) => {
    setFilteredCustomers(filtered);
  };

  return (
    <main className="h-100 w-100">
      <h1>Customers</h1>
      <div className="d-flex justify-content-around align-self-center">
        <div className="flex-fill">
          <div className="d-flex">
            <Filter customers={customers} applyFilter={applyFilter} />
            <BtnUpdate setCustomers={setCustomers} />
          </div>
          <Table customers={filteredCustomers} />
        </div>
        <AddCustomer />
      </div>
    </main>
  );
}
