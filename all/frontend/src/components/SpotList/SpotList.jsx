import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from './SpotTile';
import * as spotActions from '../../store/spots';
import './SpotList.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';

// TODO: create spots link when no spots

function SpotList({ current }) {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    current ? dispatch(spotActions.getAllCurrUserSpots()) : dispatch(spotActions.getAllSpots());
  }, [dispatch, current]);

  return (
    <div className='grid'>
      {spots?.toReversed().map((spot) => (
        <div key={spot?.id} className='grid-tile'>
          <SpotTile spot={spot} />
          {current ? (
            <div className='current-button'>
                <button>
                  <Link to={`/spots/${spot.id}/edit`}>Update</Link>
                </button>
                <OpenModalButton 
                  className='button'
                  buttonText='Delete'
                  modalComponent={<DeleteSpotModal spotId={spot?.id}/>}
                />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default SpotList;