import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="navbar">
      <nav>
        <NavLink exact to="/home" >Home</NavLink>
      </nav>
    </header>
  )
}

export default NavBar