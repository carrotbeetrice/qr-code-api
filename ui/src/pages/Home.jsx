import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { searchTitle } from "../services/SearchService";

const Home = () => {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [resultSection, setResultSection] = useState({
    visible: false,
    value: null,
    text: "",
  });

  const onTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value || "");
    setDisabled(!(value && value !== ""));
  };

  const handleSearch = async () => {
    const searchResult = await searchTitle(title);
    if (searchResult) {
      setResultSection({
        visible: true,
        value: searchResult,
        text: "Search result for title " + title + ":",
      });
    } else {
      setResultSection({
        visible: true,
        value: null,
        text: "No results for title " + title + ".",
      });
    }
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
        <Typography component="h1" variant="h5">
          Search Data By Title
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
          type="submit"
          variant="contained"
          onClick={handleSearch}
          sx={{ mt: 2 }}
        >
          Search
        </Button>
        {resultSection.visible ? (
          <Box margin={3} maxWidth="100%">
            <Typography component="h1" variant="h6">
              {resultSection.text}
            </Typography>
            {(
              <Box sx={{ overflow: "auto" }}>
                <div>
                  <pre>{resultSection.value}</pre>
                </div>
              </Box>
            ) || <></>}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
};

export default Home;
