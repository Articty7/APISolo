import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './SpotTile.css'

function SpotTile({ spot }) {

  return (
    <Link title={spot.name} to={`/spots/${spot.id}`} className='spot-tile'>
        <div className='img'>
          <img className='spot-image' src ="/images/no-image-available.jpg" alt="No Image Available"/>
        </div>
        <div>
            <div className='add-stars'>
              <span>{spot.city}, {spot.state}</span>
              {spot.avgRating === 'No Reviews' ? (
                <div>
                  <FaStar />
                  <span> New</span>
                </div>
              ) : (
                <div>
                  <FaStar />
                  <span> {spot.avgRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <div>${spot.price} per night</div>
        </div>
    </Link>
  );
}

export default SpotTile;