import React from "react";
import { NavLink } from "react-router-dom";
import style from './navbar.module.css'


const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-3">
      <div className="container-fluid">

        <span className="navbar-brand fw-bold">StudentManagement</span>

        <div className="d-flex gap-4">
          <NavLink className="nav-link text-light" to="/">Home</NavLink>
          <NavLink className="nav-link text-light" to="/webtech">WebTech</NavLink>
          <NavLink className="nav-link text-light" to="/reacts">React</NavLink>
          <NavLink className="nav-link text-light" to="/java">Java</NavLink>
          <NavLink className="nav-link text-light" to="/python">Python</NavLink>
          <NavLink className="nav-link text-light" to="/testing">Testing</NavLink>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-dark"
          id="offcanvasDarkNavbar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Account</h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item mb-3">
                <NavLink className="btn btn-outline-info w-100" to="/tlogin">
                  Trainer Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="btn btn-info w-100 text-dark" to="/tregister">
                  Trainer Register
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;