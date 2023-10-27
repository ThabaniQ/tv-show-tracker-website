import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isUserAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div className="navbar">
      {isUserAuthenticated ? (
        <>
          <NavLink to="/showlist">Show List</NavLink>
          <NavLink to="/signout">Sign out</NavLink>
        </>
      ) : (
        <NavLink to="/">Sign in</NavLink>
      )}
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    {children}
  </Link>
);

export default Navbar;
