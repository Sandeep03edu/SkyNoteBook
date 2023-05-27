import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    // console.log(location)
  }, [location]);

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") !== undefined ? (
              <form className="form-inline my-2 my-lg-0">
                <Link
                  to="/login"
                  className="btn btn-primary mx-2"
                  role={"button"}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary mx-2"
                  role={"button"}
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary mx-2" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
