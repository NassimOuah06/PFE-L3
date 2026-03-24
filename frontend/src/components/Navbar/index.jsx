import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import style from './styles.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");


  const handleStats = () => {
    window.location.href='/stats';
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("voted");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAuthPage = window.location.pathname === '/signup' || window.location.pathname === '/login';

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_brand} onClick={() => handleNavigation("/")}>
        <strong>V</strong>ote<strong>V</strong>erse
      </div>
      {isAuthPage ? (
        <>
        <span>.</span>
        <div className={`${style.btn} ${style.button} ${style.nav_item}`} onClick={() => handleNavigation("/")}>
          Go Back
        </div>
        </>
      ) : window.location.href.includes("/users/") ? (
        <span>.</span>
      ) : (
        <>
        <div className={style.hamburger} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      <ul className={`${style.navbar_nav} ${isOpen ? style.show : ''}`}>
        {!isAuthPage && !window.location.href.includes("/users/") && (
          <>
            {!user ? (
              <>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleNavigation("/")}>Home</li>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleNavigation("/guide")}>Guide</li>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleNavigation("/about")}>About</li>
                <li className={`${style.nav_item} ${style.button}`} onClick={handleLogin}>Connect</li>
              </>
            ) : (
              <>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleNavigation("/guide")}>Guide</li>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleNavigation("/main")}>Voter</li>
                <li className={`${style.nav_item} ${style.list}`} onClick={() => handleStats()}>Stats</li>
                <li className={`${style.nav_item} ${style.button}`} onClick={handleLogout}>Disconnect</li>
              </>
            )}
          </>
        )}
      </ul>
  </>
  )}
    </nav>
  );
};

export default Navbar;
