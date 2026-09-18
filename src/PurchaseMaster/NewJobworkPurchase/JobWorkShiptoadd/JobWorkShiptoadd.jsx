"use client"

import { useState, useEffect } from "react"
import "./JobWorkShiptoadd.css"
import { ToastContainer } from "react-toastify"

const JobWorkShiptoadd = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    ShiptoAdd: "",
    ContactDetail: "",
    ProjectName: "",
    CRName: "",
    SoNo: "",
  })

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setFormData(data[0] || formData)
    }
  }, [data, formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    // For ShipToAdd, when the checkbox changes, we set value to "Yes" or "".
    let finalValue = value;
    if (type === "checkbox") {
      finalValue = checked ? "Yes" : "";
    }
    const newFormData = { ...formData, [name]: finalValue }
    setFormData(newFormData)
    updateData([newFormData]) // Update parent state as array
    console.log("Ship to add data updated:", [newFormData]) // Debug log
  }

  const handleClear = () => {
    const clearedData = {
      ShiptoAdd: "",
      ContactDetail: "",
      ProjectName: "",
      CRName: "",
      SoNo: "",
    }
    setFormData(clearedData)
    updateData([clearedData])
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="card-body p-4">
          <h6 className="fw-bold text-secondary mb-3">Ship to Add Details</h6>

          <div className="row g-3 align-items-end">
            <div className="col-12 col-sm-3">
              <div className="d-flex flex-column gap-1">
                <div className="form-check mb-0">
                  <input className="form-check-input" type="checkbox" name="ShiptoAdd" id="shiptoAddCheck" checked={formData.ShiptoAdd !== ""} onChange={handleChange} />
                  <label className="form-check-label text-secondary fw-bold text-uppercase" htmlFor="shiptoAddCheck" style={{ fontSize: '0.75rem' }}>Ship to Add</label>
                </div>
                <input type="text" className="form-control form-control-sm" placeholder="Input Field" name="ShiptoAdd" value={formData.ShiptoAdd} onChange={handleChange} style={{ borderRadius: '8px' }} />
              </div>
            </div>
            
            <div className="col-12 col-sm-3">
              <div className="d-flex flex-column gap-1">
                <label className="text-secondary fw-bold text-uppercase mb-0 ms-1" style={{ fontSize: '0.75rem' }}>Contact Details</label>
                <textarea className="form-control form-control-sm" rows="1" name="ContactDetail" value={formData.ContactDetail} onChange={handleChange} style={{ borderRadius: '8px', resize: 'none' }}></textarea>
              </div>
            </div>

            <div className="col-12 col-sm-2">
              <div className="d-flex flex-column gap-1">
                <label className="text-secondary fw-bold text-uppercase mb-0 ms-1" style={{ fontSize: '0.75rem' }}>Project Name</label>
                <textarea className="form-control form-control-sm" rows="1" name="ProjectName" value={formData.ProjectName} onChange={handleChange} style={{ borderRadius: '8px', resize: 'none' }}></textarea>
              </div>
            </div>

            <div className="col-12 col-sm-2">
              <div className="d-flex flex-column gap-1">
                <label className="text-secondary fw-bold text-uppercase mb-0 ms-1" style={{ fontSize: '0.75rem' }}>CR Name</label>
                <textarea className="form-control form-control-sm" rows="1" name="CRName" value={formData.CRName} onChange={handleChange} style={{ borderRadius: '8px', resize: 'none' }}></textarea>
              </div>
            </div>

            <div className="col-12 col-sm-2">
              <div className="d-flex flex-column gap-1">
                <label className="text-secondary fw-bold text-uppercase mb-0 ms-1" style={{ fontSize: '0.75rem' }}>SO No</label>
                <textarea className="form-control form-control-sm" rows="1" name="SoNo" value={formData.SoNo} onChange={handleChange} style={{ borderRadius: '8px', resize: 'none' }}></textarea>
              </div>
            </div>
            
            <div className="col-12 d-flex justify-content-end mt-3">
              <button 
                 type="button"
                 className="btn btn-outline-secondary btn-sm px-4 fw-bold" 
                 onClick={handleClear} 
                 style={{ borderRadius: '8px' }}
              >
                 Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default JobWorkShiptoadd
