import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAllReviews } from "./reviewSlice";

/* this component should 
- fetch all reviews of a restroom id
- users can add a review 
- upon click to a review, will navigate to expanded view SingleReview component.
- (AddReview component will make soon) in review form, users can add their reviewText, imageURL, and their reportStatus, ratings. 

view:
similarly to google maps, we access all reviews of a restroom id by first clicking on a marker that will display single restroom details and will have a "review tab" that will link to all reviews of a restroom. 


brain dump
- how would it know which restroom id is being fetched 
- possible plan 
1) change API routes for reviews and comments to show restroom/:restroomId/reviews and thunks so that we can detect the restroom id
*/

const AllReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restroomId } = useParams();

  useEffect(() => {
    dispatch(fetchAllReviews(restroomId));
  }, [dispatch, restroomId]);

  const reviews = useSelector((state) => state.review.allReviews);

  const handleReviewClick = (id) => {
    navigate(`/restrooms/${restroomId}/reviews/${id}`);
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} onClick={() => handleReviewClick(review.id)}>
          <p>{review.reviewText}</p>
          <p>Report: {review.reportStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;