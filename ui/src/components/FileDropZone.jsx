import { useDropzone } from "react-dropzone";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import { Box, Input, Typography, Button } from "@mui/material";

function FileDropZone({ disabled, onDrop }) {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
  });
  const { dropZone } = useStyles();
  return (
    <Box
      className={dropZone}
      {...getRootProps({ isDragAccept, isFocused, isDragReject })}
    >
      <Input disabled={disabled} {...getInputProps()} />
      <Typography>Drag 'n' drop some files here</Typography>
      <Button variant="text" onClick={open} size="small" color="secondary">
        Click to select file
      </Button>
    </Box>
  );
}
export default FileDropZone;

const useStyles = makeStyles({
  dropZone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    borderWidth: "2px",
    borderRadius: "10px",
    borderColor: grey[200],
    borderStyle: "dashed",
    backgroundColor: grey[50],
    color: grey[900],
    outline: "none",
    transition: "border 0.24s ease-in-out",
  },
});
