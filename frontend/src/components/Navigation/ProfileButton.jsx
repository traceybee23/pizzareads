import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CiUser } from "react-icons/ci";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom'

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const navBooks = e => {
    e.preventDefault()
    closeMenu()
    navigate('/books/read')
  }

  const navCoupons = e => {
    e.preventDefault()
    closeMenu()
    navigate('/coupons/current')
  }

  const navFriends = e => {
    e.preventDefault()
    closeMenu()
    navigate('/friends')
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div>
        <img className='menu' onClick={toggleMenu} src='../../profile.png' />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='user-menu'>
            <li style={{ paddingBottom: 15 }}>{user.username}</li>
            <li className='booksLink' onClick={navBooks} >
              books
            </li>
            <li
              className='couponLink'
              onClick={navCoupons}
              style={{ borderBottom: "2px solid #e1709a" }}>
              coupons
            </li>
            <li
              className='friendsLink'
              onClick={navFriends}
              style={{ borderBottom: "2px solid #d3a8d3" }}>
              friends
            </li>
            <li
              className='friendsLink'
              onClick={() => window.alert("Feature Coming Soon...")}
              style={{ borderBottom: "2px solid #84dcc6" }}>
              shop
            </li>
            <li>
              <button className='logout-button' onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <div className='login-signup'>
              <button>

                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal navigate={navigate} />}
                />
              </button>
              <button>

                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
