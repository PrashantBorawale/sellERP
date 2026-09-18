import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <img src="/clumpcoder_logo.jfif" alt="Clumpcoder Logo" className="footer-logo" />
          <div className="company-details">
            <div className="company-title">ClumpCoder</div>
            <a href="https://clumpcoder.com" target="_blank" rel="noreferrer" className="company-link">clumpcoder.com</a>
          </div>
        </div>
        
        <div className="footer-section contact-info">
          <div><i className="bi bi-telephone-fill"></i> Phone number :- 9479840841</div>
          <div><i className="bi bi-envelope-fill"></i> E-mail:- clumpcoder@gmail.com</div>
        </div>

        <div className="footer-section date-time">
          <div className="time-text">{currentDateTime.toLocaleDateString()} &nbsp; {currentDateTime.toLocaleTimeString()}</div>
          <div className="powered-by">Powered by ClumpCoder</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
