import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useCallback, useState } from "react";
import FileDropZone from "../components/FileDropZone";
import ShowImage from "../components/ShowImage";
import { uploadData } from "../services/QRCodeServices";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage({ id: file.name, src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onTitleChange = useCallback((input) => setTitle(input), []);

  const onAlertClose = () => {
    setAlertSettings({
      ...alertSettings,
      open: false,
    });
  };

  const handleUpload = async () => {
    setDisabled(true);
    const result = await uploadData(image, title);
    if (result.success) {
      if (title && title !== "") {
        setAlertSettings({
          ...alertSettings,
          open: true,
          message: `${result.message} for title ${title}.`,
        });
      } else {
        setAlertSettings({
          ...alertSettings,
          open: true,
          message: `${result.message}. New title ${title} added.`,
        });
      }
    } else {
      setAlertSettings({
        open: true,
        severity: "error",
        message: result.message,
      });
    }
    setDisabled(false);
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
          Upload QR Code
        </Typography>
        <FileDropZone disabled={disabled} onDrop={onDrop} />
        <TextField
          disabled={disabled}
          label="Title (Optional)"
          value={title}
          onChange={onTitleChange}
        />
        <ShowImage image={image} />
        <Button variant="contained" onClick={handleUpload} disabled={disabled}>
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default Upload;
