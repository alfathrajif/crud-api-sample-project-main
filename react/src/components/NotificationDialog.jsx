import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

export default function NotificationDialog(props) {
  const [open, setOpen] = useState(true);

  const { setNotification } = useStateContext();

  const { children } = props;

  const handleClose = () => {
    setOpen(false);
    setNotification("");
  };

  return (
    <Stack sx={{ padding: 5 }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{children}</DialogTitle>
        <DialogActions sx={{ padding: 3, paddingTop: 0 }}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={handleClose}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
