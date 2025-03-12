import * as spotsActions from '../../store/spots';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpot.css';

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotsActions.deleteSpot(spotId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  console.log(errors)

  return (
    <>
      <h2 className='spot-delete-title'>Confirm Delete</h2>
      <span className='spot-delete-q'>Are you sure you want to remove this spot from the listings?</span>
      <button className='yes-del'onClick={handleClick}>Yes (Delete Spot)</button>
      <button className='no-del' onClick={closeModal}>No (Keep Spot)</button>
    </>
  );
}

export default DeleteSpotModal;