import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useCallback, useState } from "react";
import FileDropZone from "../components/FileDropZone";
import ShowImage from "../components/ShowImage";
import { uploadData } from "../services/QRCodeServices";

const Upload = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageSent, setImageSent] = useState(null);
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageSent(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage({ id: file.name, src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value || "");
  };

  const onAlertClose = () => {
    setAlertSettings({
      ...alertSettings,
      open: false,
    });
  };

  const handleUpload = async () => {
    setDisabled(true);
    const result = await uploadData(imageSent, title);
    if (result.success) {
      setAlertSettings({
        severity: "success",
        open: true,
        message:
          title && title !== ""
            ? `${result.message} for title ${title}.`
            : `${result.message}. New title ${title} added.`,
      });
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
        gap={3}
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
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Upload QR Code
        </Typography>
        <FileDropZone disabled={disabled} onDrop={onDrop} />
        <TextField
          // margin="normal"
          disabled={disabled}
          label="Title (Optional)"
          value={title}
          onChange={onTitleChange}
        />
        <ShowImage image={previewImage} />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={disabled}
          // sx={{ mt: 3, mb: 2 }}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default Upload;
