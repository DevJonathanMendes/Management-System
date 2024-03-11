import React, { useState } from "react";
import { ICustomer } from "../interfaces/ICustomer";

interface FilterProps {
  customers: ICustomer[];
  applyFilter: (filtered: ICustomer[]) => void;
}

const Filter: React.FC<FilterProps> = ({ customers, applyFilter }) => {
  const [filterBy, setFilterBy] = useState<string>("name");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    const filteredCustomers =
      value.length > 0
        ? customers.filter((customer: any) =>
            customer[filterBy].toLowerCase().includes(value)
          )
        : customers;

    applyFilter(filteredCustomers);
  };

  return (
    <div className="form-floating d-flex m-1 w-50">
      <input
        type="search"
        onChange={handleChange}
        className="form-control form-control-sm"
      />
      <label htmlFor="filter">Filter</label>

      <select
        onChange={(e) => setFilterBy(e.target.value)}
        value={filterBy}
        className="form-select w-50"
      >
        <option value="name">Name</option>
        <option value="email">E-mail</option>
        <option value="telephone">Telephone</option>
      </select>
    </div>
  );
};

export default Filter;
