import { Stack, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Stack
        direction={`row`}
        alignItems={`end`}
        justifyContent={`start`}
        mb={3}
      >
        <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
      </Stack>
    </div>
  );
}
