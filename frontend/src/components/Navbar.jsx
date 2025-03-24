import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user, logout, notesCount } =useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/"  className="nav-link">
              Home
            </Link>
            {notesCount > 0 &&(
              <Link to="/add"  className="nav-link">
                Add Note
              </Link>
            )}
            <span className="nav-user">Welcome,{user.username}</span>
            <button onClick={handleLogout}  className="btn btn-primary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"  className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
