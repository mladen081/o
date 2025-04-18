import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem("token");
  console.log("Is Authenticated: ", isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/signup" className={isActive("/signup") ? "active" : ""}>
              Sign Up
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link
              to="/dashboard"
              className={isActive("/dashboard") ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout} className="logout-link">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
