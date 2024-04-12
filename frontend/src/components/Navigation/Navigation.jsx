import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (

    <div className='nav-bar'>
        <NavLink to="/"><img className='logo' src='../../red-pizza.png'/></NavLink>
      {isLoaded && (
        <div className='profile-button'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
