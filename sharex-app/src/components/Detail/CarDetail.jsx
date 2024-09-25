// 
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext"; // Adjust the import path as needed

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CarDetail = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const { carId } = useParams();
  const { user } = useContext(AuthContext);

  // Review state
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState(null);

  const handleBack = () => {
    navigate("/car");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await axios.delete(`${API_URL}/car/${carId}`);
        if (response.status === 200) {
          console.log("Car deleted successfully");
          navigate("/car");
        } else {
          setError("Failed to delete the car. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting car:", err);
        setError("An error occurred while deleting the car. Please try again.");
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError(null);

    if (!user) {
      setReviewError('You must be logged in to submit a review');
      return;
    }

    try {
      const reviewData = {
        carId: carId,
        rating: Number(rating),
        comment
      };

      const response = await axios.post(`${API_URL}/car/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      console.log('Review submitted successfully', response.data);
      getOneCar(); // Refetch the car data to update the reviews
      setRating('');
      setComment('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setReviewError(err.response?.data?.message || 'An error occurred while submitting the review');
    }
  };
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     setReviewError(null);

//     if (!user) {
//         setReviewError('You must be logged in to submit a review');
//         return;
//     }

//     try {
//         const token = localStorage.getItem('authToken'); // Or however you store your token
//         if (!token) {
//             throw new Error('No authentication token found');
//         }

//         const reviewData = {
//             carId: carId,
//             rating: Number(rating),
//             comment
//         };

//         console.log("Submitting review:", reviewData);

//         const response = await axios.post(`${API_URL}/car/review`, reviewData, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         console.log('Review submitted successfully', response.data);
        
//         // Refresh car data after submitting review
//         await getOneCar();
        
//         setRating('');
//         setComment('');
//     } catch (err) {
//         console.error('Error submitting review:', err);
//         setReviewError(err.response?.data?.message || 'An error occurred while submitting the review');
//     }
// };
  const getOneCar = async () => {
    try {
      const response = await axios.get(`${API_URL}/car/${carId}`);
      console.log(response.data);
      setCar(response.data);
    } catch (err) {
      console.error("Error fetching car", err);
      setError("Failed to fetch car details. Please try again.");
    }
  };

  useEffect(() => {
    getOneCar();
  }, [carId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="car-detail">
        <img src={car.imageUrl} alt={car.name} width={400} height={400} />
        <p>Name: {car.name}</p>
        <p>Doors: {car.doors}</p>
        <p>Type: {car.type}</p>
        <p>Seat: {car.seat}</p>
        <p>Available Units: {car.availableUnits}</p>
        <p>Price: {car.price}</p>
        <p>Rating: {[...Array(Math.round(car.ratings))].map((_, i) => '⭐').join('')} ({car.ratings.toFixed(1)})</p>
      </div>

      <div className="reviews-container">
        <h2>Reviews</h2>
        {car.reviews && car.reviews.length > 0 ? (
          car.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>Rating: {[...Array(review.rating)].map((_, i) => '⭐').join('')}</p>
              <p>Comment: {review.comment}</p>
              <p>By: {review.name}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="create-review-container">
        <h2 className="review-text">Leave a Review Below</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="form-group">
            <label className="star-rating">Rating:</label>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star}>
                <label>
                  <input
                    type="radio" 
                    name="rating"
                    value={star}
                    onChange={(e) => setRating(e.target.value)}
                    checked={rating === star.toString()}
                    required
                  />
                  {[...Array(star)].map((_, i) => '⭐').join('')}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
        {reviewError && <p className="error-message">{reviewError}</p>}
      </div>

      <div className="end-page-btn">
        <button onClick={handleDelete}>Delete car information</button>
        <button onClick={handleBack}>Return home</button>
      </div>
    </div>
  );
};

export default CarDetail;