import React from 'react';
import './Header.css';
import Logo from '../../images/website_logo.png'

// add sign in, sign out, sign up page 
// for embedding for dropdown links..

function Header_loggedIn(props) {
    return (
        <header className="header">
            <div className="header__container">
                <a  //Logo go to mainpage;
                    href=""
                >
                    <img src={Logo} alt="logo icon" className="header__icon" />
                    <h2 className="header__title"> TRANSCEND </h2>
                </a>

                <div className="header__dropdown">
                    <button onclick={
                        document.getElementById("dropDown").classList.toggle("show")}
                        class="header__dropbtn"> Authentication </button>
                    <div id="dropDown" className="header__dropdown_content">
                        <a href=""> </a>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header_loggedIn;