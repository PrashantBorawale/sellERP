"use client"

import { useState, useEffect } from "react"
import "./JobWorkgstdetail.css"

const JobWorkgstdetail = ({ data, updateData }) => {
  const [gstData, setGstData] = useState({
    ItemCode: "",
    SAC: "",
    Rate: "",
    Qty: "",
    SubTotal: "",
    Discount: "",
    DiscountAmt: "",
    Packing: "",
    Transport: "",
    AssValue: "",
    CGST: "",
    CGSTAmt: "",
    SGST: "",
    SGSTAmt: "",
    IGST: "",
    IGSTAmt: "",
    UTGST: "",
    UTGSTAmt: "",
    Total: "",
    TOC_AssableValue: "",
    PackCharges: "",
    TransportCharges: "",
    Insurance: "",
    InstallationCharges: "",
  })

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const newData = data[0]
      if (newData && Object.keys(newData).length > 0) {
        setGstData(newData)
      }
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newGstData = { ...gstData, [name]: value }

    // Auto-calculate values when certain fields change
    if (["Rate", "Qty", "Discount", "CGST", "SGST", "IGST"].includes(name)) {
      const rate = Number.parseFloat(name === "Rate" ? value : newGstData.Rate) || 0
      const qty = Number.parseFloat(name === "Qty" ? value : newGstData.Qty) || 0
      const subtotal = rate * qty
      newGstData.SubTotal = subtotal.toString()

      const discPercent = Number.parseFloat(name === "Discount" ? value : newGstData.Discount) || 0
      const discAmount = (subtotal * discPercent) / 100
      newGstData.DiscountAmt = discAmount.toString()
      const assValue = subtotal - discAmount
      newGstData.AssValue = assValue.toString()

      // Calculate taxes
      const cgstPercent = Number.parseFloat(name === "CGST" ? value : newGstData.CGST) || 0
      const sgstPercent = Number.parseFloat(name === "SGST" ? value : newGstData.SGST) || 0
      const igstPercent = Number.parseFloat(name === "IGST" ? value : newGstData.IGST) || 0

      const cgstAmount = (assValue * cgstPercent) / 100
      const sgstAmount = (assValue * sgstPercent) / 100
      const igstAmount = (assValue * igstPercent) / 100

      newGstData.CGSTAmt = cgstAmount.toString()
      newGstData.SGSTAmt = sgstAmount.toString()
      newGstData.IGSTAmt = igstAmount.toString()

      const total = assValue + cgstAmount + sgstAmount + igstAmount
      newGstData.Total = total.toString()
    }

    setGstData(newGstData)
    updateData([newGstData]) // Update parent state as array
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="card-body p-4">
          <h6 className="fw-bold text-secondary mb-3">GST Details</h6>
          <div className="table-responsive">
            <table className="table table-borderless table-hover mb-0">
              <thead className="bg-light border-bottom">
                <tr>
                  {['Item Code', 'SAC', 'Rate', 'Qty', 'Sub Total', 'Disc %', 'Disc Amt', 'Packing', 'Transport', 'Ass Value', 'CGST %', 'CGST Amt', 'SGST %', 'SGST Amt', 'IGST %', 'IGST Amt', 'UTGST %', 'UTGST Amt', 'Total'].map((header) => (
                    <th key={header} className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="align-middle">
                  <td className="border-end" style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="ItemCode" value={gstData.ItemCode} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="SAC" value={gstData.SAC} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="Rate" value={gstData.Rate} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="Qty" value={gstData.Qty} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="SubTotal" value={gstData.SubTotal} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="Discount" value={gstData.Discount} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="DiscountAmt" value={gstData.DiscountAmt} readOnly /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="Packing" value={gstData.Packing} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="Transport" value={gstData.Transport} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="AssValue" value={gstData.AssValue} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="CGST" value={gstData.CGST} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="CGSTAmt" value={gstData.CGSTAmt} readOnly /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="SGST" value={gstData.SGST} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="SGSTAmt" value={gstData.SGSTAmt} readOnly /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="IGST" value={gstData.IGST} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="IGSTAmt" value={gstData.IGSTAmt} readOnly /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center" style={{ fontSize: '11px', padding: '4px' }} name="UTGST" value={gstData.UTGST} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="UTGSTAmt" value={gstData.UTGSTAmt} readOnly /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm text-center bg-light" style={{ fontSize: '11px', padding: '4px' }} name="Total" value={gstData.Total} readOnly /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="card-body p-4">
          <h6 className="fw-bold text-secondary mb-3">Charges & Taxes Summary</h6>

          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-6">
               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>TDC Assable Value:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="TOC_AssableValue" value={gstData.TOC_AssableValue} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Pack. & Fwrd. Charges:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="PackCharges" value={gstData.PackCharges} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Transport Charges:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="TransportCharges" value={gstData.TransportCharges} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Insurance:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="Insurance" value={gstData.Insurance} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Installation Charges:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="InstallationCharges" value={gstData.InstallationCharges} onChange={handleChange} />
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>CGST:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="CGST" value={gstData.CGST} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>SGST:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="SGST" value={gstData.SGST} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>IGST:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" name="IGST" value={gstData.IGST} onChange={handleChange} />
                  </div>
               </div>

               <div className="row g-3 align-items-center mb-2">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>VAT:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" />
                  </div>
               </div>

               <div className="row g-3 align-items-center">
                  <div className="col-sm-4">
                    <label className="col-form-label fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>CESS:</label>
                  </div>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-sm" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkgstdetail
