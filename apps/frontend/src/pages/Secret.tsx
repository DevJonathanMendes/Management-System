import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
    API.get("customers", user.token).then((res: any) => {
      setCustomers(res);
    });
  }, []);

  return (
    <Box
      sx={
        {
          // height: "100%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // textAlign: "center",
        }
      }
    >
      <Container>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Customers
          <Button onClick={handleSignOut}>signOut</Button>
        </Typography>
        <Stack spacing={2}>
          <Table data={customers} />
        </Stack>
      </Container>
    </Box>
  );
};

/* style={{
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  width: "100vw",
  height: "100vh",
}} */
