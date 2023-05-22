import React, {useRef, useEffect,useState}from "react";
import { getLocalStorage } from "./HistoryLocalHelper";
import { useSelector } from "react-redux";
import {
    Typography,
    Container,
    Box,
    ThemeProvider,
    CssBaseline,
    Card,
    CardContent,
    CardMedia,
    useMediaQuery,
    Fab,
  } from "@mui/material";
  import { Link, useNavigate } from "react-router-dom";
  import crAppTheme from "../../app/theme";
  import Loading from "../loading/Loading";
  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
  import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
  import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
  } from "../styles/StyleGuide";

const History =()=>{

const HistoryList=getLocalStorage()
const isMobile = useMediaQuery("(max-width:1000px)");
const userId=useSelector(state=>state.auth.me.id)
 const [isLoading, setIsLoading] = useState(false);
 const ref = useRef();

 const [pos, setPos] = useState(false);

  const handleTop = () => {
    ref.current.scrollTop = 0;
    setPos(false);
  };

  const handleScroll = () => {
    if (ref.current.scrollTop > 50) {
      if (!pos) setPos(true);
    } else {
      if (pos) setPos(false);
    }
  };

  useEffect(() => {
    const temp = ref.current;
    if (temp) {
      temp.addEventListener("scroll", handleScroll);
      return () => temp.removeEventListener("scroll", handleScroll);
    }
  }, []);

return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      {isLoading ? (
        <Loading loadingGif="https://media2.giphy.com/media/3o7TKWpg8S6WTD5i7u/200w.webp" />
    ) : (
      <Box
        id="saved-container"
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
        ref={ref}
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
            <Typography variant="h3">History</Typography>
            <Typography variant="subtitle1">
            Track Footprint on Map
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
        </Container>
        <Container>
          {HistoryList && HistoryList.length > 0 ? (
            HistoryList.reverse().map((feature) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    my: 2,
                    p: 1,
                    width: isMobile ? "100%" : 380,
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      backgroundColor: crAppTheme.palette.primary.main,
                      outline: `2px solid ${crAppTheme.palette.primary.dark}}`,
                    },
                  }}
                  key={feature.id_restroom}
                >
                  <Link
                    to={`/restrooms/${feature.id_restroom}`}
                    style={{ display: "flex" }}
                  >
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Box>
                          <Typography
                            key={feature.id_restroom}
                            variant="subtitle1"
                            sx={{
                              fontWeight: "900",
                              color: crAppTheme.palette.primary.dark,
                            }}
                          >
                            {feature.Name}
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: crAppTheme.palette.primary.dark,
                            }}
                          >
                            <b>Address</b>: {feature.Location}
                          </Typography>
                        </Box>
                        
                      </CardContent>
                    </Box>
                    
                  </Link>
                </Card>
              );
            })
          ) : (
            <Box sx={{ my: isMobile ? 5 : 10, textAlign: "center" }}>
              <Typography variant="body1" sx={{ my: 5 }}>
                <b>No history!</b>
              </Typography>
              <Link to="/">
                <TertiaryButton sx={{ my: isMobile ? 4 : 8 }}>
                  <Typography variant="subtitle1">
                    Start exploring crAPP 🫠
                  </Typography>
                </TertiaryButton>
              </Link>
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1">
                  Not sure what to do?
                </Typography>
                <Link to="/help">
                  <SecondaryButton>
                    <Typography variant="subtitle1">Get Help</Typography>
                  </SecondaryButton>
                </Link>
              </Box>
            </Box>
          )}
          <Fab
            color="primary"
            aria-label="scroll-to-top"
            onClick={handleTop}
            sx={{
              position: "fixed",
              bottom: 10,
              left: isMobile ? 0 : "300px",
              display: pos ? "block" : "none",
            }}
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Container>
      </Box>
    )}
    </ThemeProvider>
  );
};



export default History