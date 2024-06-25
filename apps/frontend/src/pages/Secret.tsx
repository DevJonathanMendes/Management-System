import { Box, Button, Container, Typography } from "@mui/material";
import { Table } from "../components/Table";
import { useAuth } from "../hooks/useAuth";

export const Secret = () => {
  const { signOut } = useAuth();
  const handleSignOut = () => signOut();

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
          <Table />
        </Box>
      </Container>
    </Box>
  );
};
