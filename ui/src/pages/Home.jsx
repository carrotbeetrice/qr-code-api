import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import FileDropZone from "../components/FileDropZone";
import ShowImage from "../components/ShowImage";
import { uploadData } from "../services/QRCodeServices";

const Home = () => {
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
    <Fragment>
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
      <Grid container flex={1} flexDirection="column" spacing={2} padding={10}>
        <Grid item>
          <Typography variant="h3">Home</Typography>
        </Grid>
        <Grid item>
          <FileDropZone disabled={disabled} onDrop={onDrop} />
        </Grid>
        <Grid item>
          <TextField
            disabled={disabled}
            label="Title (Optional)"
            value={title}
            onChange={onTitleChange}
          />
        </Grid>
        <Grid item>
          <ShowImage image={image} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={disabled}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
