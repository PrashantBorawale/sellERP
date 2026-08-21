import React from "react";
import { RotateCw } from "lucide-react";


const QCInfo = ({ qcInfo, setQcInfo, onSave, isSaving }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQcInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid mt-4 px-2 px-md-4">
      <div className="card shadow-sm border-0 mx-auto" style={{ borderRadius: "10px", maxWidth: "1200px", backgroundColor: "#ffffff" }}>
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              {[
                { label: "QC No", name: "qc_no", readOnly: true },
                { label: "Product No", name: "prod_no" },
                { label: "Item Description", name: "item_desc" },
                { label: "Heat No", name: "heat_no" },
                { label: "Sample Qty", name: "sample_qty" },
                { label: "Prod Qty", name: "prod_qty" },
                { label: "QC Qty", name: "qc_qty" },
                { label: "OK Qty", name: "ok_qty" },
                { label: "A U D Qty", name: "a_u_d_qty" }
              ].map((field, index) => (
                <div className="row mb-3 align-items-center" key={`left-input-${index}`}>
                  <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                    <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>{field.label} :</label>
                  </div>
                  <div className="col-12 col-sm-8">
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control shadow-none"
                        name={field.name}
                        value={qcInfo[field.name]}
                        onChange={handleChange}
                        readOnly={field.readOnly}
                        style={field.readOnly ? { backgroundColor: "#e9ecef" } : {}}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Accepted / Rejected :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2" name="accepted_rejected" value={qcInfo.accepted_rejected} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px", lineHeight: "1.2" }}>Accepted Under Deviation :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2" name="accepted_under_deviation" value={qcInfo.accepted_under_deviation} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Suggestions :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2" name="suggestions" value={qcInfo.suggestions} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Inspected By :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input className="form-control form-control-sm shadow-none" name="inspected_by" value={qcInfo.inspected_by} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Date :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="date" className="form-control form-control-sm shadow-none" name="date" value={qcInfo.date} onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>QC Time :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="time" className="form-control form-control-sm shadow-none" name="qc_time" value={qcInfo.qc_time} onChange={handleChange} />
                </div>
              </div>

              {[
                { label: "(Item) Drawing Rev No", name: "drawing_rev_no" },
                { label: "(ISO) Format No", name: "format_no" },
                { label: "(ISO) Rev No", name: "rev_no" }
              ].map((field, index) => (
                <div className="row mb-3 align-items-center" key={`right-input-${index}`}>
                  <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                    <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>{field.label} :</label>
                  </div>
                  <div className="col-12 col-sm-8">
                    <input className="form-control form-control-sm shadow-none" name={field.name} value={qcInfo[field.name]} onChange={handleChange} />
                  </div>
                </div>
              ))}

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>(ISO) Rev Date :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="date" className="form-control form-control-sm shadow-none" name="rev_date" value={qcInfo.rev_date} onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Remark :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2" name="remark" value={qcInfo.remark} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Non Conformance :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2" name="non_conformance" value={qcInfo.non_conformance} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Approved By :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input className="form-control form-control-sm shadow-none" name="approved_by" value={qcInfo.approved_by} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QCInfo;