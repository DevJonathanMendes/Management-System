import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import API from "../api/fetch";
import Table from "../components/Table";
import { useAuth } from "../hooks/useAuth";
import { Customer } from "../interfaces/ISeller";

export const Secret = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { user, signOut } = useAuth();
  const handleSignOut = () => signOut();

  useEffect(() => {
    API.get("customers", user.token).then((res: any) => {
      setCustomers(res);
    });
  }, []);

  return (
    <div>
      <div style={{}}>
        <header className="d-flex mx-2 justify-content-between align-items-center">
          <h1>Customers</h1>
          <Button onClick={handleSignOut}>signOut</Button>
        </header>
      </div>
      <Table data={customers} />
    </div>
  );
};
