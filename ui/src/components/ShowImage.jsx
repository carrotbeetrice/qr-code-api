import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const ShowImage = ({ image }) => {
  const { container, img } = useStyles();

  return image ? (
    <Box className={container} gap={2}>
      <Typography>Image Preview: </Typography>
      <img className={img} src={image.src} alt={image.src} />
    </Box>
  ) : (
    <></>
  );
};

export default ShowImage;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "80%",
    // margin: "20px auto",
    // padding: "20px",
    alignItems: "center",
  },
  img: {
    height: "200px",
  },
});
