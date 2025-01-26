import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHouzz } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import './Navigation.css'

// TODO: Fix the spacing for the create new space to right 

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink className='home-icon' to="/">{FaHouzz}</NavLink>
        <NavLink className='home-icon-text' to="/">Rentals?</NavLink>
      </li>
      <li>
        {isLoaded && sessionUser ? (
          <NavLink className='new-spot-link' to="/spots/new">Create a New Spot</NavLink>
        ) : null}
        {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
      </li>
    </ul>
  );
}

export default Navigation;