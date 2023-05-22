import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createOrUpdateRestroom } from "./allRestroomSlice";
import axios from "axios";
import { ThemeProvider, CssBaseline, Typography, Container, TextField, Button, Box, 
    useMediaQuery } from "@mui/material";
import { TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import crAppTheme from "../../app/theme";

const AddRestroom = () => {
    
    const isMobile = useMediaQuery("(max-width:900px)");
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      id: "",
      name: "",
      imageURL: "",
      address: "",
      description: "",
      openingHours: "",
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        console.log(formData.id)
        const { data } = await axios.patch(`/api/restrooms/${formData.id}`, formData);
        dispatch(createOrUpdateRestroom(data));
        setFormData({
            id: "",
            name: "",
            imageURL: "",
            address: "",
            description: "",
            openingHours: "",
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        <ThemeProvider theme={crAppTheme}>
        <CssBaseline />
        <Box
          id="restroom-container"
          sx={{
            position: "fixed",
            top: 0,
            left: isMobile ? 0 : "100px",
            zIndex: isMobile ? 2 : 1,
            backgroundColor: "white",
            width: isMobile ? "100%" : 450,
            height: "100%",
            overflowY: "scroll",
            paddingBottom: 10,
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-thumb:vertical": {
              minHeight: "30px",
            },
            "&::-webkit-scrollbar-thumb:vertical:active": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-thumb:vertical:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-thumb:horizontal": {
              minWidth: "30px",
            },
            "&::-webkit-scrollbar-thumb:horizontal:active": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-thumb:horizontal:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              p: 2,
            }}
          >
                      <Box sx={{ p: 1 }}>
            <Typography variant="h3">Add a Restroom</Typography>
            
              <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
                <CloseRoundedIcon />
              </TertiaryButton>
            
          </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                name="id"
                label="ID"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="imageURL"
                label="Image URL"
                value={formData.imageURL}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="openingHours"
                label="Opening Hours"
                value={formData.openingHours}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
            </Container>
            </Box>
      </ThemeProvider>
    );
  };
  
  export default AddRestroom;