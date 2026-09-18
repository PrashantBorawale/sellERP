import React from 'react';
import './DefaultSettingsModal.css';

const DefaultSettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Setting</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="settings-section">
            <h3>Outgoing Mail Server Setting</h3>
            <table className="settings-table">
              <thead>
                <tr>
                  <th className="email-type">GMAIL</th>
                  <th className="email-type">REDIFFMAIL</th>
                  <th className="email-type">YAHOO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>smtp.gmail.com</td>
                  <td>smtp.rediffmail.com</td>
                  <td>smtp.mail.yahoo.com</td>
                </tr>
                <tr>
                  <td>587</td>
                  <td>25</td>
                  <td>465</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button className="ok-button" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultSettingsModal;