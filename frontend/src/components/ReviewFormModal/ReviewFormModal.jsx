import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews';
import * as spotsActions from '../../store/spots'
import './ReviewForm.css';

// TODO: CSS styling
// TODO: Submit button disable criteria
// TODO: server error occurance

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      reviewsActions.createNewReview({
        spotId,
        review,
        stars
      })
    )
    .then(() => dispatch(spotsActions.getSpotById(spotId)))
    .then(() => dispatch(reviewsActions.getAllReviewsSpotId(spotId)))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <>
      <h2 className='review-form-title'>How was your stay?</h2>
      <form onSubmit={handleSubmit} className='review-form'>
        {errors.message && <p>{errors.message}</p>}
        <label>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='Leave your review here...'
            required
          />
        </label>
        {errors.stars && <p>{errors.stars}</p>}
        <div>
          <label>
            <input
              type="radio" value={1} name='rating-input'
              onChange={(e) => setStars(e.target.value)}
              required
            />
            1 Star
          </label>
          <label>
            <input
              type="radio" value={2} name='rating-input'
              onChange={(e) => setStars(e.target.value)}
              required
            />
            2 Stars
          </label>
          <label>
            <input
              type="radio" value={3} name='rating-input'
              onChange={(e) => setStars(e.target.value)}
              required
            />
            3 Stars
          </label>
          <label>
            <input
              type="radio" value={4} name='rating-input'
              onChange={(e) => setStars(e.target.value)}
              required
            />
            4 Stars
          </label>
          <label>
            <input
              type="radio" value={5} name='rating-input'
              onChange={(e) => setStars(e.target.value)}
              required
            />
            5 Stars
          </label>
        </div>
        <button className='review-submit' 
          disabled={stars === 0 || review.length === 0} 
          type="submit">Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewFormModal;