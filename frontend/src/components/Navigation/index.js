import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import logo from "../../logo.jpg"
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignUpFormModal />
      </>
    );
  }

  return (
    <div className="navbar__container">
      <div className="navbar__wrapper">
        <div className="navbar__home-link">
          <NavLink exact to="/">
            <div className="navbar__logo--wrapper">
              <img className="navbar__logo--image" src={logo} alt=""/>
            </div>
          </NavLink>
        </div>
        <div className="navbar__artist-link">
          <NavLink exact to="/artists">Artists</NavLink>
        </div>
        <div className="navbar__venue-link">
          <NavLink exact to ="/venues">Venues</NavLink>
        </div>
        <div className="navbar__buttons">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;