import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import { GiOpenBook } from "react-icons/gi";
import SearchBar from '../SearchBar/SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (

    <div className='nav-bar'>
      <NavLink to="/"><img className='logo' src='../../pizza-dood.png' /></NavLink>
      <div className='all-books-container'>
        {/* <NavLink className='all-books' to="/books">
          <span className='book-icon-nav'>
            <GiOpenBook />
          </span>
          <span className='text-nav'>
            pick a book to read
          </span></NavLink> */}
        <SearchBar />
      </div>
      {isLoaded && (
        <div className='profile-button'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
