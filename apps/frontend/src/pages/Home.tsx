import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

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
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            {"Management System"}
          </Typography>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            justifyContent={"center"}
            spacing={2}
          >
            <Button variant="contained" onClick={() => navigate("/signin")}>
              {"Sign in"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              {"Sign Up"}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
