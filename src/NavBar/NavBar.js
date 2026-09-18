import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
// import CropFreeIcon from "@mui/icons-material/CropFree";
// import BedtimeIcon from "@mui/icons-material/Bedtime";
// import GridViewIcon from "@mui/icons-material/GridView";
// import SettingsIcon from "@mui/icons-material/Settings";
// import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
// import us from "../assets/us.jpg";
// import user from "../assets/user-1.jpg";
import { Home } from "@mui/icons-material";
import { getDefaultRoute } from "../Service/Erpsetting.jsx";

const NavBar = ({ toggleSideNav }) => {
  const navigate = useNavigate();

  // Fetch username and year from localStorage
  const username = localStorage.getItem("username");
  const year = localStorage.getItem("year");
  const rawPermissions = JSON.parse(localStorage.getItem("permissions")) || {};
  const isAdmin = (username || "").trim().toLowerCase() === "admin" || (username || "").trim().toLowerCase() === "prashant" || rawPermissions?.role === "admin" || rawPermissions === "all";

  const handleHomeClick = () => {
    const target = getDefaultRoute(rawPermissions, username);
    navigate(target);
  };

  // Function for logout
  const handleLogout = () => {
    // Clear the stored data and redirect to login
    localStorage.removeItem("username");
    localStorage.removeItem("year");
    localStorage.removeItem("permissions");
    navigate("/"); // Redirect to login page
  };

  // State for controlling dropdown visibility
  // const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  // const [megaDropdownOpen, setMegaDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prev) => !prev);
  };

  useEffect(() => {
    // Bootstrap's JavaScript initialization (optional, only if Bootstrap JS is used)
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    document.body.classList.add("has-navbar");
    return () => {
      document.body.classList.remove("has-navbar");
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="navbar-toggle" onClick={toggleSideNav}>
          ☰
        </button>
        <h6 
          className="navbar-logo" 
          onClick={handleHomeClick} 
          style={{ cursor: "pointer" }}
        >
          ProdNomics
        </h6>
      </div>

      <div className="navbar-menu">
        {/* Create New Dropdown */}

        {/* Mega Menu Dropdown */}
      </div>

      <div className="navbar-actions" style={{ alignItems: 'center' }}>
        <img 
          className="navbar-user" 
          src={`${process.env.PUBLIC_URL || ""}/Logo.png`} 
          alt="Logo" 
          style={{ height: '48px', width: '48px', marginRight: '15px' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>{year}</label>
            <div className="navbar-dropdown" style={{ margin: 0, padding: 0 }}>
              <button
                className="navbar-button dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown(setAdminDropdownOpen)}
                style={{ padding: 0 }}
              >
                <label style={{ fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{username}</label>
              </button>
              {adminDropdownOpen && (
                <ul className="navbar-dropdown-menu">
                  <li>
                    <button
                      className="navbar-dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'whitesmoke', marginTop: '2px' }}>
            Vishwa Samrudhi Industries
          </div>
        </div>
        {/* Home icon removed as per user request */}
      </div>
    </nav>
  );
};

export default NavBar;
