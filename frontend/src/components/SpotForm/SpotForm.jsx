import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
import './SpotForm.css';

// TODO: CSS and extra text
// TODO: add errors
// TODO: add images
// TODO: navigate to detail page after submit


function SpotForm({ spot, edit }) {
  console.log(spot);
  console.log(edit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(edit ? (spot?.address) : "");
  const [city, setCity] = useState(edit ? (spot?.city) : "");
  const [state, setState] = useState(edit ? (spot?.state) : "");
  const [country, setCountry] = useState(edit ? (spot?.country) : "");
  const [lat, setLat] = useState(edit ? (spot?.lat): "");
  const [lng, setLng] = useState(edit ? (spot?.lng): "");
  const [name, setName] = useState(edit ? (spot?.name) : "");
  const [description, setDescription] = useState(edit ? (spot?.description) : "");
  const [price, setPrice] = useState(edit ? (spot?.price) : "");
  const [errors, setErrors] = useState({});

  const spotFunction = (edit ? spotsActions.editSpot : spotsActions.createNewSpot);

  useEffect(() => {
    if (spot) {
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name);
      setDescription(spot.description);
      setPrice(spot.price);
    }
  },[setAddress, setCity, setState, setCountry, setLat, setLng, setName, setDescription, setPrice, spot])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotFunction({ id: spot?.id, address, city, state, country, lat, lng, name, description, price }))
      .then(() => navigate(`/spots/${spot?.id}`)).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='spot-form'>
      {edit ? (<h2 className='spot-form-title'>Update your Spot</h2>) : (<h2 className='spot-form-title'>Create a new Spot</h2>)}
      <form onSubmit={handleSubmit}>
        <label className='spot-form-label'>
          <div className='title-errors'>
            Country 
            {errors.country && <p className='error-box'>{errors.country}</p>}
          </div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            
          />
        </label>
        <label className='spot-form-label'>
          <div className='title-errors'>
            Street Address 
            {errors.address && <p className='error'>{errors.address}</p>}
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Street Address'
          />
        </label>
        <label className='spot-form-label'>
          <div className='title-errors'>
            City 
            {errors.city && <p className='error'>{errors.city}</p>}
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            required
          />
        </label>
        <label className='spot-form-label'>
          <div className='title-errors'>
            State
            {errors.state && <p className='error'>{errors.state}</p>}
          </div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='State'
            required
          />
        </label>
        <label className='spot-form-label'>
          <div className='title-errors'>
            Latitude 
            {errors.lat && <p className='error'>{errors.lat}</p>}
          </div>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='Latitude'
          />
        </label>
        <label className='spot-form-label'>
          <div className='title-errors'>
            Longitude 
            {errors.lng && <p className='error'>{errors.address}</p>}
          </div>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='Longitude'
          />
        </label>
        <label>
          Name of Spot
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your Spot'
            required
          />
        </label>
        <label>
          Describe your place to &quot;Guests&quot;
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            required
          />
        </label>
        <label>
          Set a Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price'
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">{edit ? 'Update Spot' : 'Create Spot'}</button>
      </form>
    </div>
  );
}

export default SpotForm;