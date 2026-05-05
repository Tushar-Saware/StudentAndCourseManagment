import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from './navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isTrainer") === "true";

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("offcanvasDarkNavbar");
    if (offcanvasEl) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      } else {
        offcanvasEl.classList.remove("show");
        document.querySelector(".offcanvas-backdrop")?.remove();
        document.body.classList.remove("offcanvas-open");
        document.body.style.overflow = "";
      }
    }
  };

  const goTo = (path) => {
    closeOffcanvas();
    setTimeout(() => navigate(path), 150);
  };

  const handleLogout = () => {
    closeOffcanvas();
    sessionStorage.clear();
    setTimeout(() => navigate("/tlogin"), 150);
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-3">
      <div className="container-fluid">

        <span className="navbar-brand fw-bold">🎓 StudentManagement</span>

        {/* Main nav links — only when logged in */}
        {isLoggedIn && (
          <div className="d-flex gap-4">
            <NavLink className="nav-link text-light" to="/">Home</NavLink>
            <NavLink className="nav-link text-light" to="/webtech">WebTech</NavLink>
            <NavLink className="nav-link text-light" to="/reacts">React</NavLink>
            <NavLink className="nav-link text-light" to="/java">Java</NavLink>
            <NavLink className="nav-link text-light" to="/python">Python</NavLink>
            <NavLink className="nav-link text-light" to="/testing">Testing</NavLink>
          </div>
        )}

        {/* Hamburger toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas panel */}
        <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">
              {isLoggedIn ? "Trainer Menu" : "Account"}
            </h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto">

              {isLoggedIn ? (
                <>
                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => goTo("/dataCreate")}
                    >
                      ➕ Add Student
                    </button>
                  </li>

                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-outline-info w-100"
                      onClick={() => goTo("/dataHome")}
                    >
                      📋 Manage Students
                    </button>
                  </li>

                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-outline-light w-100"
                      onClick={() => goTo("/tregister")}
                    >
                      👤 Register Trainer
                    </button>
                  </li>

                  <li className="nav-item mt-4">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-outline-info w-100"
                      onClick={() => goTo("/tlogin")}
                    >
                      Trainer Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-info w-100 text-dark"
                      onClick={() => goTo("/tregister")}
                    >
                      Trainer Register
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;