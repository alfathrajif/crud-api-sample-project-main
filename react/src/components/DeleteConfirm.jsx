import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DeleteConfirm(props) {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { setNotification } = useStateContext();

  const { open, onClose, getUsers, selectedUserId } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      axiosClient
        .get(`/users/${selectedUserId}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [selectedUserId]);

  const handleDelete = (ev) => {
    ev.preventDefault();
    axiosClient.delete(`/users/${user.id}`).then(() => {
      getUsers();
      setNotification("User was successfully deleted");
    });
    handleClose();
  };

  const handleClose = () => {
    setUser({
      id: null,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setLoading(true);
    onClose();
    setErrors(null);
  };

  return (
    <Stack>
      {loading && (
        <Stack sx={{ padding: 5 }}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Stack
              component={DialogTitle}
              direction={`row`}
              justifyContent={`center`}
              alignItems={`center`}
              id="alert-dialog-title"
              minWidth={600}
              height={120}
            >
              <CircularProgress color="inherit" />
            </Stack>
          </Dialog>
        </Stack>
      )}
      {!loading && (
        <Stack sx={{ padding: 5 }}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Stack
              direction={`row`}
              justifyContent={`center`}
              component={DialogTitle}
              id="alert-dialog-title"
              spacing={1}
              minWidth={600}
              textAlign={`center`}
            >
              <Typography variant="h6" component={`body1`}>
                Are you sure you want to Delete
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6" component={`h5`}>
                {user.name}
              </Typography>
            </Stack>
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
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleDelete}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      )}
    </Stack>
  );
}
