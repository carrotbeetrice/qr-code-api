import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const ShowImage = ({ image }) => {
  const { container, img } = useStyles();

  return image ? (
    <Grid className={container} gap={5}>
      <Typography>Image Preview: </Typography>
      <img className={img} src={image.src} alt={image.src} />
    </Grid>
  ) : (
    <></>
  );
};

export default ShowImage;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    alignItems: "center",
  },
  img: {
    height: "200px",
  },
});
