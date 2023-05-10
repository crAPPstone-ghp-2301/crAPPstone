import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleReview } from "./reviewSlice";
//import AllComments here to see all comments of reviewId

const SingleReview = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();

  const singleReview = useSelector((state) => state.review.singleReview);
  const { reviewText, imageURL, reportStatus } = singleReview;

  useEffect(() => {
    dispatch(fetchSingleReview(reviewId));
  }, [dispatch, reviewId]);

  return (
    <div className="testing">
      <h1>displaying single review - will style later </h1>
      <img src={imageURL} alt={imageURL} />
      <p>{reviewText}</p>
          <p>Report: {reportStatus}</p>
          {/* render out AllComments here to see all comments of reviewId */}
    </div>
  );
};

export default SingleReview;
