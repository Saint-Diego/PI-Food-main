import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') setShow(true);
  }, [show, location]);

  return (
    <header hidden={!show} className="navbar">
      <nav>
        <NavLink exact to="/home" >Home</NavLink>
      </nav>
    </header>
  )
}

export default NavBar