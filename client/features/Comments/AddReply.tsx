import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createReply } from "./commentsSlice"
import crAppTheme from "../../app/theme";
import { SecondaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";

// const AddReply = ({ reviewId, commentId }) => {
//   const dispatch = useDispatch();
//   const [content, setContent] = useState("");
//   // const { reviewId, commentId } = useParams();

//   const handleChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(createReply({ content }));
//     setContent("");
//   };

//   return (
//     <ThemeProvider theme={crAppTheme}>
//       <Box
//         component="form"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           width: "50%",
//           margin: "0 auto",
//         }}
//       >
//         <Container>
//           <TextField
//             label="Add Reply"
//             value={content}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             margin="normal"
//           />

//           <SecondaryButton
//             type="submit"
//             variant="contained"
//             // color="primary"
//             disabled={!content.trim()}
//             onClick={handleSubmit}
//             style={{ marginTop: "10px" }}
//           >
//             <Typography variant="subtitle1" sx={{ textTranform: "capitalize" }}>
//               Submit
//             </Typography>
//           </SecondaryButton>

//           <SecondaryButton
//             type="button"
//             variant="contained"
//             disabled={!content.trim()}
//             style={{ marginTop: "10px" }}
//           >
//             <Typography variant="subtitle1" sx={{ textTranform: "capitalize" }}>
//               Cancel
//             </Typography>
//           </SecondaryButton>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AddReply;


const AddReply = ({ reviewId, commentId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createReply({ reviewId, commentId, content }));
    setContent("");
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
    
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddReply;
