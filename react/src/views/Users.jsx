import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// Handle Data
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
// My Components
import ModalComponent from "../components/Modal";
// Material Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
// Material UI
import {
  createTheme,
  ThemeProvider,
  Button,
  ButtonGroup,
  Typography,
  Stack,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotificationDialog from "../components/NotificationDialog";
import DeleteConfirm from "../components/DeleteConfirm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Modal Create and Edit
  const [open, setOpen] = useState(false);

  // Delete Confirmation
  const [openDelete, setOpenDelete] = useState(false);

  const getUsers = useCallback(() => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // styled Component
  const ActionButton = styled(Button)({
    textTransform: "none",
    fontFamily: "Poppins",
    height: "fit-content",
  });

  const themeTable = createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: 14,
    },
  });

  // Control Modal Create and Edit
  const handleOpen = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };
  // Control Modal Create and Edit
  const handleClose = () => {
    setSelectedUserId(null);
    setOpen(false);
  };

  // Delete confirm
  const handleOpenDelete = (id) => {
    setSelectedUserId(id);
    setOpenDelete(true);
  };
  // Delete COnfirm
  const handleCloseDelete = () => {
    setSelectedUserId(null);
    setOpenDelete(false);
  };

  return (
    <div>
      <Stack
        direction={`row`}
        alignItems={`end`}
        justifyContent={`space-between`}
        mb={3}
      >
        <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
          Users
        </Typography>
        <ActionButton
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<AccountCircleRoundedIcon />}
        >
          Create New User
        </ActionButton>
      </Stack>
      <ThemeProvider theme={themeTable}>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#202020", borderRadius: 3 }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    width: 20,
                    borderBottomColor: "#6c757d",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    width: 230,
                    borderBottomColor: "#6c757d",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    width: 290,
                    borderBottomColor: "#6c757d",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    width: 190,
                    borderBottomColor: "#6c757d",
                  }}
                >
                  Created Date
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fff",
                    width: 279,
                    borderBottomColor: "#6c757d",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 && !loading
                ? users.map((U, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        sx={{ borderBottomColor: "#495057", color: "#fff" }}
                      >
                        {U.id}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottomColor: "#495057", color: "#fff" }}
                      >
                        {U.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottomColor: "#495057", color: "#fff" }}
                      >
                        {U.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottomColor: "#495057", color: "#fff" }}
                      >
                        {U.created_at}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottomColor: "#495057", color: "#fff" }}
                      >
                        <ButtonGroup
                          variant="contained"
                          size="small"
                          color="grey"
                          sx={{ backgroundColor: "#1b2021" }}
                          aria-label="outlined primary button group"
                        >
                          <ActionButton
                            onClick={() => handleOpen(U.id)}
                            startIcon={<EditRoundedIcon />}
                            style={{ borderRight: `1px solid #30343f` }}
                          >
                            Edit
                          </ActionButton>
                          <ActionButton
                            onClick={(ev) => handleOpenDelete(U.id)}
                            startIcon={<DeleteForeverRoundedIcon />}
                            style={{ borderRight: `1px solid #30343f` }}
                          >
                            Delete
                          </ActionButton>
                          <ActionButton
                            startIcon={<VisibilityRoundedIcon />}
                            onClick={() => navigate(`/users/${U.id}`)}
                          >
                            Details
                          </ActionButton>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                : Array.from({ length: 7 }).map((U, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Skeleton
                          variant="rounded"
                          style={{ height: 30 }}
                          animation="wave"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="rounded"
                          style={{ height: 30 }}
                          animation="wave"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="rounded"
                          style={{ height: 30 }}
                          animation="wave"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="rounded"
                          style={{ height: 30 }}
                          animation="wave"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Skeleton
                          variant="rounded"
                          style={{ height: 30 }}
                          animation="wave"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>

      <Stack sx={{ position: "absolute" }}>
        <DeleteConfirm
          open={openDelete}
          onClose={handleCloseDelete}
          getUsers={getUsers}
          selectedUserId={selectedUserId}
        />

        {/* Modal Components */}
        <ThemeProvider theme={themeTable}>
          <ModalComponent
            open={open}
            onClose={handleClose}
            getUsers={getUsers}
            selectedUserId={selectedUserId}
          />
        </ThemeProvider>
      </Stack>
    </div>
  );
}
