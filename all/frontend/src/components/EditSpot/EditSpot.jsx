import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import SpotForm from '../SpotForm/SpotForm';
// import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// TODO: needs to reload before it updates, need help

function EditSpot({ edit }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(state => state.spots.spot);
  useEffect(() => {
    dispatch(spotsActions.getSpotById(id));
  }, [dispatch, id]);

  return (
    <SpotForm spot={spot} edit={edit}/>
  );
}

export default EditSpot;