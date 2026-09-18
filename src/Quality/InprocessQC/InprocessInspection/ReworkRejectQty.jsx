import React from "react";

const ReworkRejectQty = ({ reworkEntries, setReworkEntries, rejectEntries, setRejectEntries, qcInfo }) => {
  const [newRework, setNewRework] = React.useState({ description: "", qty: 0, user: "" });
  const [newReject, setNewReject] = React.useState({ description: "", qty: 0, user: "" });

  const handleAddRework = () => {
    setReworkEntries(prev => [...prev, { ...newRework, id: Date.now() }]);
    setNewRework({ description: "", qty: 0, user: "" });
  };

  const handleAddReject = () => {
    setRejectEntries(prev => [...prev, { ...newReject, id: Date.now() }]);
    setNewReject({ description: "", qty: 0, user: "" });
  };

  const totalRework = reworkEntries.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const totalReject = rejectEntries.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const okQty = Number(qcInfo?.ok_qty) || 0;
  const grandTotal = okQty + totalRework + totalReject;

  return (
    <div className=" w-100 px-2 px-md-4">
      <div className="card shadow-sm border-0 mx-auto" style={{ borderRadius: "16px", overflow: "hidden", maxWidth: "1200px" }}>
        <div className="card-body p-4 p-md-5">
          <div className="row g-4 justify-content-center">
            {/* Rework Column */}
            <div className="col-12 col-lg-6 d-flex flex-column">
              <div className="p-4 w-100 h-100 rounded-4" style={{ backgroundColor: "#f8f9fa", borderTop: "4px solid #ffc107" }}>
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#d39e00" }}>Rework Entry</h6>
                <div className="d-flex align-items-center gap-1 mb-2 w-100">
                  <input className="form-control form-control-sm border-0 flex-grow-1" placeholder="Rework Reason..." value={newRework.description} onChange={(e) => setNewRework({ ...newRework, description: e.target.value })} />
                  <input className="form-control form-control-sm border-0" placeholder="User" style={{ maxWidth: "100px" }} value={newRework.user} onChange={(e) => setNewRework({ ...newRework, user: e.target.value })} />
                  <input type="number" className="form-control form-control-sm border-0" placeholder="Qty" style={{ maxWidth: "70px" }} value={newRework.qty} onChange={(e) => setNewRework({ ...newRework, qty: e.target.value })} />
                  <button className="btn btn-primary btn-sm px-3" onClick={handleAddRework}>+ Add</button>
                </div>
                <div className="w-100 bg-white rounded-3 shadow-sm overflow-hidden">
                  <table className="table table-sm mb-0 align-middle text-center" style={{ fontSize: "13px" }}>
                    <thead style={{ backgroundColor: "#f1f3f5" }}>
                      <tr><th>Sr</th><th>Description</th><th>User</th><th>Qty</th><th></th></tr>
                    </thead>
                    <tbody>
                      {reworkEntries.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.user}</td>
                          <td>{item.qty}</td>
                          <td><button className="btn btn-link text-danger p-0 fs-5" onClick={() => setReworkEntries(reworkEntries.filter(r => r.id !== item.id))}>🗑</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Reject Column */}
            <div className="col-12 col-lg-6 d-flex flex-column">
              <div className="p-4 w-100 h-100 rounded-4" style={{ backgroundColor: "#f8f9fa", borderTop: "4px solid #dc3545" }}>
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#bd2130" }}>Reject Entry</h6>
                <div className="d-flex align-items-center gap-2 mb-3 w-100">
                  <input className="form-control form-control-sm border-0 flex-grow-1" placeholder="Reject Reason..." value={newReject.description} onChange={(e) => setNewReject({ ...newReject, description: e.target.value })} />
                  <input className="form-control form-control-sm border-0" placeholder="User" style={{ maxWidth: "100px" }} value={newReject.user} onChange={(e) => setNewReject({ ...newReject, user: e.target.value })} />
                  <input type="number" className="form-control form-control-sm border-0" placeholder="Qty" style={{ maxWidth: "70px" }} value={newReject.qty} onChange={(e) => setNewReject({ ...newReject, qty: e.target.value })} />
                  <button className="btn btn-primary btn-sm px-3" onClick={handleAddReject}>+ Add</button>
                </div>
                <div className="w-100 bg-white rounded-3 shadow-sm overflow-hidden">
                  <table className="table table-sm mb-0 align-middle text-center" style={{ fontSize: "13px" }}>
                    <thead style={{ backgroundColor: "#f1f3f5" }}>
                      <tr><th>Sr</th><th>Description</th><th>User</th><th>Qty</th><th></th></tr>
                    </thead>
                    <tbody>
                      {rejectEntries.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.user}</td>
                          <td>{item.qty}</td>
                          <td><button className="btn btn-link text-danger p-0 fs-5" onClick={() => setRejectEntries(rejectEntries.filter(r => r.id !== item.id))}>🗑</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer border-top-0 p-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="row g-3 justify-content-center text-center">
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(25, 135, 84, 0.08)", border: "1px solid rgba(25, 135, 84, 0.2)" }}>
                <div className="text-success fw-semibold mb-1" style={{ fontSize: "13px" }}>OK Qty</div>
                <div className="fs-5 fw-bold text-success">{okQty.toFixed(1)}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(255, 193, 7, 0.08)", border: "1px solid rgba(255, 193, 7, 0.3)" }}>
                <div className="text-warning fw-semibold mb-1" style={{ fontSize: "13px" }}>Rework</div>
                <div className="fs-5 fw-bold text-warning">{totalRework.toFixed(1)}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(220, 53, 69, 0.08)", border: "1px solid rgba(220, 53, 69, 0.2)" }}>
                <div className="text-danger fw-semibold mb-1" style={{ fontSize: "13px" }}>Reject</div>
                <div className="fs-5 fw-bold text-danger">{totalReject.toFixed(1)}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(13, 110, 253, 0.08)", border: "1px solid rgba(13, 110, 253, 0.2)" }}>
                <div className="text-primary fw-semibold mb-1" style={{ fontSize: "13px" }}>Total Qty</div>
                <div className="fs-5 fw-bold text-primary">{grandTotal.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReworkRejectQty;