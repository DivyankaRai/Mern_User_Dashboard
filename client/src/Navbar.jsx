import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
<nav className="navbar">
      <Link to="/" className="logo">
        𝑪𝒍𝒐𝒕𝒉𝒊𝒇𝒚
      </Link>
      <div className="navbar-right">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/" className="sign-in-button">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
