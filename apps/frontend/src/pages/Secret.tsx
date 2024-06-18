import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import API from "../api/fetch";
import Table from "../components/Table";
import { useAuth } from "../hooks/useAuth";
import { Customer } from "../interfaces/ISeller";

export const Secret = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { user, signOut } = useAuth();
  const handleSignOut = () => signOut();

  useEffect(() => {
    API.get("customers", user?.token).then((res: any) => {
      if (res) setCustomers(res);
    });
  }, []);

  return (
    <Box height="100%" display="flex">
      <Container>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Customers
          <Button onClick={handleSignOut}>Sign out</Button>
        </Typography>
        <Box height="90%" display="flex">
          <Table data={customers} />
        </Box>
      </Container>
    </Box>
  );
};
