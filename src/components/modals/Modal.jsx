import { useState } from "react";
import "./Modal.css";

function TransportModal({
  isOpen, onClose, items, handleSelect, handleButtonClick,
}) {
  const [transport_name, setTransportName] = useState("");
  const [ewayBillNo, setEwayBillNo] = useState("");
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Transport Data</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">

          <div
            style={{
              display: "table",
              borderCollapse: "collapse",
              width: "100%", 
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
                <label htmlFor="transport_name">Transport name :</label>
              </div>
              <div style={{ display: "table-cell", padding: "8px" }}>
                <input
                  type="text"
                  name="transport_name"
                  className="form-control"
                  value={transport_name}
                  onChange={(e) => {
                    setTransportName(e.target.value);
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
                <label htmlFor="eway_bill_no">Eway bill no. :</label>
              </div>
              <div style={{ display: "table-cell", padding: "8px" }}>
                <input
                  type="text"
                  name="eway_bill_no"
                  className="form-control"
                  value={ewayBillNo}
                  onChange={(e) => {
                    setEwayBillNo(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

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
                handleButtonClick(transport_name, ewayBillNo);
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
                  <th>Transport name</th>
                  <th>Eway Bill no.</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{it.transport_name}</td>
                    <td>{it.eway_bill_no || "N/A"}</td>
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
                    <td>
                      <span>HSN Code :</span>{" "}
                    </td>
                    <td className="text-start">Supp. Ref. NO :</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span style={{ border: "1px solid black" }}>X</span>
                    </td>
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

export default TransportModal;
