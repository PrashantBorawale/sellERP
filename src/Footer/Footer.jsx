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
          <div className="company-title">Clumpcoder</div>
          <a href="https://clumpcoder.com" target="_blank" rel="noreferrer" className="company-link">clumpcoder.com</a>
        </div>
        
        <div className="footer-section contact-info">
          <div><i className="bi bi-telephone-fill"></i> Phone number :- 9479840841</div>
          <div><i className="bi bi-envelope-fill"></i> E-mail:- clumpcoder@gmail.com</div>
        </div>

        <div className="footer-section date-time">
          <div>{currentDateTime.toLocaleDateString()}</div>
          <div>{currentDateTime.toLocaleTimeString()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
