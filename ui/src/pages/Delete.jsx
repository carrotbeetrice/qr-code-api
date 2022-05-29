import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { deleteData } from "../services/QRCodeServices";

const Delete = () => {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [alertSettings, setAlertSettings] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value || "");
    setDisabled(!(value && value !== ""));
  };

  const onAlertClose = () => {
    setAlertSettings({
      ...alertSettings,
      open: false,
    });
  };

  const handleDelete = async () => {
    const result = await deleteData(title);
    setAlertSettings({
      open: true,
      severity: result.success ? "success" : "error",
      message: result.message,
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ConfirmationDialog
          title="Delete Title?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={handleDelete}
        >
          Are you sure you want to delete this title? This action cannot be
          undone.
        </ConfirmationDialog>
        <Snackbar
          open={alertSettings.open}
          autoHideDuration={6000}
          onClose={onAlertClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={onAlertClose}
            severity={alertSettings.severity}
            sx={{ width: "100%" }}
          >
            {alertSettings.message}
          </Alert>
        </Snackbar>
        <Typography component="h1" variant="h5">
          Delete Data By Title
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={onTitleChange}
          helperText="Start typing to enable search button"
        />
        <Button
          disabled={disabled}
          // type="submit"
          variant="contained"
          onClick={() => setConfirmOpen(true)}
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
};

export default Delete;
