import React, { useState, useEffect } from "react";
import "./Ship.css";

const Ship = ({ updateFormData }) => {
  const [shipToAdd, setShipToAdd] = useState({
    Ship_To_Add: "",
    ShipToContactDetails: "",
    Reference: "",
  });

  // Update the parent form data whenever shipToAdd changes
  useEffect(() => {
    updateFormData("Ship_To_Add", [shipToAdd]);
  }, [shipToAdd, updateFormData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipToAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4 p-3" style={{ borderRadius: '12px' }}>
        <h6 className="mb-3 fw-bold text-secondary">Shipping Details</h6>
        
        <div className="row g-4 align-items-start">
          <div className="col-md-4">
            <div className="d-flex flex-column gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="shipToAddCheck"
                  checked={!!shipToAdd.Ship_To_Add}
                  onChange={(e) =>
                    setShipToAdd((prevState) => ({
                      ...prevState,
                      Ship_To_Add: e.target.checked ? "XYZ Enterprises" : "",
                    }))
                  }
                />
                <label className="form-check-label fw-bold text-secondary" htmlFor="shipToAddCheck" style={{ fontSize: '0.85rem' }}>
                  Ship to Add
                </label>
              </div>
              
              <input
                type="text"
                className={`form-control ${!shipToAdd.Ship_To_Add ? 'bg-light' : ''}`}
                placeholder="Ship To Add"
                name="Ship_To_Add"
                value={shipToAdd.Ship_To_Add}
                onChange={handleInputChange}
                disabled={!shipToAdd.Ship_To_Add}
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="d-flex flex-column gap-1">
              <label className="form-label fw-bold text-secondary text-uppercase mb-0" style={{ fontSize: '0.75rem' }}>
                Ship to Contact Details
              </label>
              <textarea
                className={`form-control ${!shipToAdd.Ship_To_Add ? 'bg-light' : ''}`}
                rows={3}
                placeholder="Enter contact details"
                name="ShipToContactDetails"
                value={shipToAdd.ShipToContactDetails}
                onChange={handleInputChange}
                disabled={!shipToAdd.Ship_To_Add}
              ></textarea>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="d-flex flex-column gap-1">
              <label className="form-label fw-bold text-secondary text-uppercase mb-0" style={{ fontSize: '0.75rem' }}>
                Reference
              </label>
              <textarea
                className={`form-control ${!shipToAdd.Ship_To_Add ? 'bg-light' : ''}`}
                rows={3}
                placeholder="Enter reference"
                name="Reference"
                value={shipToAdd.Reference}
                onChange={handleInputChange}
                disabled={!shipToAdd.Ship_To_Add}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
