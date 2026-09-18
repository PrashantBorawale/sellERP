import { useState } from "react";
import "./Modal.css";

function VehicleModal({
  isOpen,
  onClose,
  items,
  handleSelect,
  handleButtonClick,
}) {
  const [vehicle_number, setVehicle_number] = useState("");
  const [customerName, setCustomerName] = useState("");
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Vehicle Data</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div
            style={{
              display: "table",
              borderCollapse: "collapse",
              width: "100%", // Ensure full width
            }}
          >
            <div style={{ display: "table-row" }}>
              <div
                style={{
                  display: "table-cell",
                  padding: "8px",
                  fontWeight: "bold",
                  verticalAlign: "middle",
                }}
              >
                <label htmlFor="transport_name">Vehicle No. :</label>
              </div>
              <div style={{ display: "table-cell", padding: "8px" }}>
                <input
                  type="text"
                  name="transport_name"
                  className="form-control"
                  value={vehicle_number}
                  onChange={(e) => {
                    setVehicle_number(e.target.value);
                  }}
                />
              </div>
            </div>

            <div style={{ display: "table-row" }}>
              <div
                style={{
                  display: "table-cell",
                  padding: "8px",
                  fontWeight: "bold",
                  verticalAlign: "middle",
                }}
              >
                <label htmlFor="eway_bill_no">Customer name:</label>
              </div>
              <div style={{ display: "table-cell", padding: "8px" }}>
                <input
                  type="text"
                  name="eway_bill_no"
                  className="form-control"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Button aligned to right */}
          <div
            className="text-end"
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="primary-btn btn"
              onClick={() => {
                handleButtonClick(vehicle_number);
              }}
            >
              Save
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Vehicle no.</th>
                  <th>Customer name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{it.vehical_no}</td>
                    <td>{it.customer_name || "N/A"}</td>
                    <td>
                      <button
                        style={{
                          border: "1px solid black",
                          padding: "2px 6px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelect(it)}
                      >
                        select
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleModal;
