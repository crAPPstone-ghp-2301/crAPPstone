import React, { useEffect, useState } from "react";
import { StyledRating, customIcons } from "../styles/StyleGuide";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createRating, fetchRatings } from "./RatingSlice";
import { Typography, Box } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Checkbox from "@mui/material/Checkbox";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { SecondaryButton, TertiaryButton } from "../styles/StyleGuide";
import crAppTheme from "../../app/theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const Rating = () => {
  const dispatch = useDispatch();
  const [userRating, setuserRating] = useState(0);
  const [isClean, setisClean] = useState(false);
  const userId = useSelector((state) => state.auth.me.id);
  const restroomId = useSelector(
    (state) => state.singleRestroom.singleRestroom.id
  );

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    await dispatch(createRating({ userId, restroomId, userRating, isClean }));
  };

  const handleRatingChange = (event, newValue) => {
    console.log(newValue);
    setuserRating(newValue);
  };
  const handleCheckboxlike = (event) => {
    setisClean(true);
  };
  const handleCheckboxhate = (event) => {
    setisClean(false);
  };

  return (
    <div>
      {userId ? (
        <>
          <Typography
            variant="subtitle1"
            sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
          >
            Share your Experience
          </Typography>
          <StyledRating
            name="customized-icons"
            defaultValue={3}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
            onChange={handleRatingChange}
            sx={{ display: "flex", justifyContent: "center" }}
          />

          <div style={{ textAlign: "center" }}>
            <Typography
              variant="subtitle1"
              sx={{ color: crAppTheme.palette.primary.dark }}
            >
              Is Restroom Clean?
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Checkbox
                icon={
                  <ThumbUpOffAltIcon
                    style={{ color: crAppTheme.palette.primary.dark }}
                  />
                }
                checkedIcon={
                  <ThumbUpIcon
                    style={{ color: crAppTheme.palette.success.main }}
                  />
                }
                onChange={handleCheckboxlike}
              />
              <Checkbox
                icon={
                  <ThumbDownOffAltIcon
                    style={{ color: crAppTheme.palette.primary.dark }}
                  />
                }
                checkedIcon={
                  <ThumbDownIcon
                    style={{ color: crAppTheme.palette.error.main }}
                  />
                }
                onChange={handleCheckboxhate}
              />
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SecondaryButton onClick={submitHandle}>
              <Typography variant="subtitle1">
                Submit <CheckCircleIcon />
              </Typography>
            </SecondaryButton>
          </Box>
        </>
      ) : (
        <Typography
          variant="subtitle1"
          sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
        >
          You must be logged in to share your experience.
        </Typography>
      )}
    </div>
  );
};

export default Rating;
