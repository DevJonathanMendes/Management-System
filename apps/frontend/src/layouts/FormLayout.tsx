import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface IFormLayout {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export function FormLayout({ onSubmit, children }: IFormLayout) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container component="form" onSubmit={onSubmit} maxWidth="sm">
        <Stack spacing={2}>{children}</Stack>
      </Container>
    </Box>
  );
}
