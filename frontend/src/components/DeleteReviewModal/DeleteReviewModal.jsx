import * as reviewsActions from '../../store/reviews';
import * as spotsActions from '../../store/spots';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReview.css';

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(reviewsActions.deleteReview(reviewId))
      .then(() => dispatch(spotsActions.getSpotById(spotId)))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  console.log(errors)

  return (
    <div className='review-delete'>
      <h2 className='review-delete-title'>Confirm Delete</h2>
      <span className='review-q'>Are you sure you want to delete this review?</span>
      <button className='yes-del'onClick={handleClick}>Yes (Delete Review)</button>
      <button className='no-del' onClick={closeModal}>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;