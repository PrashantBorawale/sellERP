"use client"

import { useState, useEffect } from "react"
import "./JobWorkPoinfo.css"
import { FaEdit, FaTrash } from "react-icons/fa"
import { ToastContainer } from "react-toastify"

const JobWorkPoinfo = ({ data, updateData, poNo }) => {
  const [showCard, setShowCard] = useState(false)
  const [formData, setFormData] = useState({
    PoNo: "",
    PaymentTerm: "",
    QuotNo: "",
    Delivery: "",
    PoValidityDate: "",
    PoNote: "",
    GST: "",
    PoDate: "",
    PaymentRemark: "",
    QuotationDate: "",
    freight: "",
    ContactPersion: "",
    PF_Charges: "",
    PoRateType: "",
  })
  const [errors, ] = useState({})
  const [loading, ] = useState(false)

  // Sync with parent data
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(data)
    }
  }, [data])

  // Update PoNo from parent
  useEffect(() => {
    if (poNo) {
      setFormData((prev) => ({ ...prev, PoNo: poNo }))
    }
  }, [poNo])

  const handleCloseCard = () => setShowCard(false)

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
    // Update parent state
    updateData(newFormData)
    // Debug log
    console.log("PO Info updated:", newFormData)
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <ToastContainer />
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="card-body p-4">
          <h6 className="fw-bold text-secondary mb-3">PO Information</h6>
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PoNo" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>PO No:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="PoNo"
                    name="PoNo"
                    className="form-control form-control-sm"
                    placeholder="Enter PO Number"
                    value={formData.PoNo}
                    onChange={handleChange}
                    readOnly={loading}
                    style={{ borderRadius: '8px' }}
                  />
                  {errors.PoNo && <div className="text-danger mt-1" style={{ fontSize: '0.75rem' }}>{errors.PoNo}</div>}
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PaymentTerm" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Payment Term:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="PaymentTerm"
                    name="PaymentTerm"
                    className="form-control form-control-sm"
                    placeholder="Enter Payment Term"
                    value={formData.PaymentTerm}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="QuotNo" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Quot No / Ref:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="QuotNo"
                    name="QuotNo"
                    className="form-control form-control-sm"
                    placeholder="Enter Quotation Number"
                    value={formData.QuotNo}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="Delivery" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Delivery:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="date"
                    id="Delivery"
                    name="Delivery"
                    className="form-control form-control-sm"
                    value={formData.Delivery}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PoValidityDate" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>PO Validity Date:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="date"
                    id="PoValidityDate"
                    name="PoValidityDate"
                    className="form-control form-control-sm"
                    value={formData.PoValidityDate}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PoNote" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>PO Note:</label>
                </div>
                <div className="col-sm-8">
                  <textarea
                    id="PoNote"
                    name="PoNote"
                    className="form-control form-control-sm"
                    placeholder="Enter PO Note"
                    value={formData.PoNote}
                    onChange={handleChange}
                    style={{ borderRadius: '8px', resize: 'none' }}
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-sm-4">
                  <label htmlFor="GST" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>GST (Taxes):</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="GST"
                    name="GST"
                    className="form-control form-control-sm"
                    placeholder="Enter GST Percentage"
                    value={formData.GST}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PoDate" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>PO Date:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="date"
                    id="PoDate"
                    name="PoDate"
                    className="form-control form-control-sm"
                    value={formData.PoDate}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PaymentRemark" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Payment Remark:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="PaymentRemark"
                    name="PaymentRemark"
                    className="form-control form-control-sm"
                    placeholder="Enter Payment Remark"
                    value={formData.PaymentRemark}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="QuotationDate" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Quotation Date:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="date"
                    id="QuotationDate"
                    name="QuotationDate"
                    className="form-control form-control-sm"
                    value={formData.QuotationDate}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="freight" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Freight:</label>
                </div>
                <div className="col-sm-8">
                  <select
                    id="freight"
                    name="freight"
                    className="form-select form-select-sm"
                    value={formData.freight}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="">SELECT</option>
                    <option value="option1">EX - AURANGABAD</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="ContactPersion" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Contact Person:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="ContactPersion"
                    name="ContactPersion"
                    className="form-control form-control-sm"
                    value={formData.ContactPersion}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-2">
                <div className="col-sm-4">
                  <label htmlFor="PF_Charges" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>P&F Charges Note:</label>
                </div>
                <div className="col-sm-8">
                  <textarea
                    name="PF_Charges"
                    id="PF_Charges"
                    className="form-control form-control-sm"
                    value={formData.PF_Charges}
                    onChange={handleChange}
                    placeholder="Enter Enquiry Number"
                    style={{ borderRadius: '8px', resize: 'none' }}
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-sm-4">
                  <label htmlFor="PoRateType" className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Po Rate Type:</label>
                </div>
                <div className="col-sm-8">
                  <select
                    id="PoRateType"
                    name="PoRateType"
                    className="form-select form-select-sm"
                    value={formData.PoRateType}
                    onChange={handleChange}
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="">SELECT</option>
                    <option value="option1">GERNAL</option>
                    <option value="option2">RATEDIFF</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCard && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title text-primary fw-bold">Freight Master</h5>
                <button type="button" className="btn-close" onClick={handleCloseCard}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3 mb-4 align-items-end">
                  <div className="col-md-8">
                    <label htmlFor="freightName" className="form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Enter Freight Name:</label>
                    <input type="text" id="freightName" className="form-control form-control-sm" style={{ borderRadius: '8px' }} />
                  </div>
                  <div className="col-md-4">
                    <button type="button" className="btn btn-primary btn-sm w-100 fw-bold" style={{ borderRadius: '8px' }}>
                      Save
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-secondary text-center" style={{ fontSize: '0.75rem' }}>Sr No.</th>
                        <th className="text-secondary" style={{ fontSize: '0.75rem' }}>Freight Name</th>
                        <th className="text-secondary text-center" style={{ fontSize: '0.75rem' }}>Edit</th>
                        <th className="text-secondary text-center" style={{ fontSize: '0.75rem' }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center" style={{ fontSize: '0.85rem' }}>1</td>
                        <td style={{ fontSize: '0.85rem' }}>Example Freight</td>
                        <td className="text-center">
                          <button className="btn btn-sm text-primary p-1"><FaEdit /></button>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm text-danger p-1"><FaTrash /></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <button type="button" className="btn btn-outline-secondary btn-sm px-4 fw-bold" onClick={handleCloseCard} style={{ borderRadius: '8px' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobWorkPoinfo
