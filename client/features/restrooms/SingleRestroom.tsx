import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectSingleRestroom, getSingleRestroom } from "./singleRestroomSlice";
import { getAllRestrooms } from "./allRestroomSlice";
import { ThemeProvider } from "@mui/material/styles";
import crAppTheme from "../../app/theme";
import {
    Typography,
    Container,
    Button,
    Box,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";

const SingleRestroom = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const singleRestroom = useSelector((state) => state.singleRestroom.singleRestroom);
    console.log("SINGLE RESTROOM===============>", singleRestroom)

    useEffect(() => {
        dispatch(getSingleRestroom(id))
        dispatch(getAllRestrooms())
    }, [dispatch, id]);

    return (
        <>
            <ThemeProvider theme={crAppTheme}>
                <Container maxWidth="lg" sx={{ marginTop: 10 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{
                            marginBottom: 5,
                            textAlign: "center",
                        }}
                    >
                        {singleRestroom.name}
                    </Typography>
                    <Container
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                margin: "5px",
                                height: "100%",
                                position: "relative",
                            }}
                            key={singleRestroom.id}
                        >
                                <Card
                                    sx={{
                                        maxWidth: 600,
                                        border: "none",
                                        "&:hover": {
                                            border: "2px solid",
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={singleRestroom.imageUrl}
                                            sx={{ height: 300, objectFit: "cover" }}
                                    />
                                    <CardContent
                                        sx={{ height: 350 }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="body"
                                            component="div"
                                            color="secondary.light"
                                            sx={{ fontWeight: "900" }}
                                        >
                                            {singleRestroom.name}
                                        </Typography>
                                        <Typography 
                                            gutterBottom
                                            variant="body"
                                            component="div"
                                            color="tertiary.light"
                                            sx={{ fontWeight: "900" }}>
                                            {singleRestroom.openingHours}
                                        </Typography>
                                        <Typography 
                                            gutterBottom
                                            variant="body"
                                            component="div"
                                            color="tertiary.light"
                                            sx={{ fontWeight: "900" }}>
                                            {singleRestroom.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                            >
                                Add a Review
                            </Button>
                        </Box>
                    </Container>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SingleRestroom;
