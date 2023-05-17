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
import { useNavigate } from "react-router";

const AddRating = () => {
  const dispatch = useDispatch();
  const initialRating = 3; // Initial rating value
  const initialLikeChecked = false; // Initial checkbox value for "like"
  const initialHateChecked = false; // In
  const [userRating, setuserRating] = useState(initialRating);
  const [isClean, setisClean] = useState(false);
  const [likeChecked, setLikeChecked] = useState(initialLikeChecked);
  const [hateChecked, setHateChecked] = useState(initialHateChecked);
  const userId = useSelector((state) => state.auth.me.id);
  const restroomId = useSelector(
    (state) => state.singleRestroom.singleRestroom.id
  );
  const navigate = useNavigate();

  const submitHandle = async (event) => {
    event.preventDefault();
    await dispatch(createRating({ userId, restroomId, userRating, isClean }));
    dispatch(fetchRatings(restroomId));
    setuserRating(initialRating);
    setLikeChecked(initialLikeChecked);
    setHateChecked(initialHateChecked);
  };

  const handleRatingChange = (event, newValue) => {
    setuserRating(newValue);
  };
  const handleCheckboxlike = (event) => {
    const isChecked = event.target.checked;
    setLikeChecked(isChecked);
    if (isChecked) {
      setHateChecked(false);
    }
    setisClean(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCheckboxhate = (event) => {
    const isChecked = event.target.checked;
    setHateChecked(isChecked);
    if (isChecked) {
      setLikeChecked(false);
    }
    setisClean(false);
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
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
            value={userRating}
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
                checked={likeChecked}
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
                checked={hateChecked}
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
        <>
          <Typography
            variant="subtitle1"
            sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
          >
            Share your Experience
          </Typography>
          <StyledRating
            name="customized-icons"
            value={userRating}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
            onChange={handleLogin}
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
                onChange={handleLogin}
                checked={likeChecked}
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
                onChange={handleLogin}
                checked={hateChecked}
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
            <SecondaryButton onClick={handleLogin}>
              <Typography variant="subtitle1">
                Submit <CheckCircleIcon />
              </Typography>
            </SecondaryButton>
          </Box>
        </>
      )}
    </div>
  );
};

export default AddRating;
