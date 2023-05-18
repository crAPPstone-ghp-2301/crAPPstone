import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Text,
} from "recharts";
import { Typography, Box, Rating } from "@mui/material";
import crAppTheme from "../../app/theme";
import { auto } from "@popperjs/core";
import { fetchRatings } from "./RatingSlice";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../styles/StyleGuide";
import AddCircleIcon from '@mui/icons-material/AddCircle';




const PastRating = () => {

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const restroomId = useSelector(
    (state) => state.singleRestroom.singleRestroom.id
  );
  
  const restroomName = useSelector(
    (state) => state.singleRestroom.singleRestroom.name
  );
  const userId = useSelector((state) => state.auth.me.id);
  const ratings = useSelector((state) => state.rating.pastRating);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAddReview=()=>{
    navigate(`/restrooms/${restroomId}/reviews/add`);
  }

  const sumRatings =
    ratings && ratings.length
      ? ratings.reduce((sum, rating) => {
          return sum + rating.userRating;
        }, 0)
      : 0;
  const averageRating =
    sumRatings > 0 ? (sumRatings / ratings.length).toFixed(1) : 0;

  const markfive = ratings.filter((rating) => rating.userRating === 5);
  const markfour = ratings.filter((rating) => rating.userRating === 4);
  const markthree = ratings.filter((rating) => rating.userRating === 3);
  const marktwo = ratings.filter((rating) => rating.userRating === 2);
  const markone = ratings.filter((rating) => rating.userRating === 1);
  
  useEffect(() => {
    dispatch(fetchRatings(restroomId));
  }, [dispatch, restroomId]);

  const data = [
    { rating: 5, count: markfive.length },
    { rating: 4, count: markfour.length },
    { rating: 3, count: markthree.length },
    { rating: 2, count: marktwo.length },
    { rating: 1, count: markone.length },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return <div className="custom-tooltip"></div>;
    }

    return null;
  };

  return (
    <>
    {ratings.length === 0  ? (
      <Box>
       <Typography
          variant="body1"
          sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
        >
          No Ratings Yet!🤨
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
        >
          Be the first to add a review about {restroomName}
        </Typography>
        
        {userId? (<Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SecondaryButton onClick={handleAddReview}>
              <Typography variant="subtitle1">
                Review<AddCircleIcon />
              </Typography>
            </SecondaryButton>
          </Box>
      ):(<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SecondaryButton onClick={handleLogin}>
          <Typography variant="subtitle1">
            Review<AddCircleIcon />
          </Typography>
        </SecondaryButton>
      </Box>)}
      </Box>
     
    ) : (
      <div style={{ display: "flex" }}>
      <ResponsiveContainer width="70%" height={160}>
        <BarChart data={data} layout="vertical">
          <XAxis hide axisLine={false} type="number" tick={false} />
          <YAxis
            dataKey="rating"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: "14px", color: crAppTheme.palette.primary.dark }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            wrapperStyle={{ background: "transparent" }}
          />
          <Bar
          dataKey="count"
          fill="#F89446" 
          barSize={10}
          barRadius={5}
        >
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <Box
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginLeft: "10px",
        }}
      >
        <Typography
          style={{ fontSize: "4.5rem", color: crAppTheme.palette.primary.dark }}
        >
          {averageRating}
        </Typography>
        <Rating size="small" value={averageRating} readOnly />
        <Typography
          variant="caption"
          sx={{ color: crAppTheme.palette.primary.dark }}
        >{`(${ratings.length})`}</Typography>
      </Box>
    </div>
    )}
    </>
  );
};

export default PastRating;
