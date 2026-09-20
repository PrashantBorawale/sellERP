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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minWidth: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#f8fafc', whiteSpace: 'nowrap', lineHeight: '1' }}>{year}</span>
            <div className="navbar-dropdown" style={{ margin: 0, padding: 0, position: 'relative' }}>
              <button
                className="navbar-button dropdown-toggle"
                type="button"
                onClick={() => toggleDropdown(setAdminDropdownOpen)}
                style={{ padding: 0, background: 'transparent', border: 'none', outline: 'none', display: 'flex', alignItems: 'center', height: 'auto' }}
              >
                <span style={{ fontSize: '14px', fontWeight: '700', cursor: 'pointer', color: '#60a5fa', textTransform: 'capitalize', whiteSpace: 'nowrap', lineHeight: '1' }}>{username || 'User'}</span>
              </button>
              {adminDropdownOpen && (
                <ul className="navbar-dropdown-menu" style={{ display: 'block', position: 'absolute', right: 0, left: 'auto', top: '100%', marginTop: '8px', backgroundColor: '#ffffff', borderRadius: '8px', minWidth: '150px', padding: '8px 0', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', zIndex: 1000 }}>
                  <li style={{ margin: 0, padding: 0 }}>
                    <button
                      className="navbar-dropdown-item"
                      onClick={handleLogout}
                      style={{ width: '100%', textAlign: 'left', backgroundColor: 'transparent', border: 'none', color: '#ef4444', fontWeight: '600', padding: '8px 16px', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#fef2f2'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff', marginTop: '10px', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: '1' }}>
            Vishwa Samrudhi Industries
          </div>
        </div>
        {/* Home icon removed as per user request */}
      </div>
    </nav>
  );
};

export default NavBar;
