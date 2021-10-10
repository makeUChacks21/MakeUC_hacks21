import React from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Logo from '../../images/website_logo.png'

import './Header.css';

// add sign in, sign out, sign up page
// for embedding for dropdown links..

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <span className="header__logo">
          <img src={Logo} alt="logo icon" className="header__icon" />
          <h2 className="header__title"> TRANSCEND </h2>
        </span>

        <div className="header__dropdown">
          <button
            // onclick={document.getElementById("dropDown").classList.toggle("show")}
            class="header__dropbtn"
          >
            Authentication
          </button>
          { props.isLoggedIn
            ? <NavLink to='/' id="dropDown" className="header__dropdown_content">
                <span className="header__user">{currentUser.name}</span>
                <span className="header__link" onClick={props.handleSignOut}> | Sign out</span>
              </NavLink>
            : <div id="dropDown" className="header__dropdown_content">
                <a href="/signup" className="header__link" onClick={props.handleRegisterClick}>Sign up</a>
                <a href="/signin" className="header__link" onClick={props.handleLoginClick}>Sign in</a>
                <a href="/" className="header__link" onClick={props.handleSignOut}>Sign out</a>
              </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header;