"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaPlusCircle } from "react-icons/fa"
import "./GStDetails.css"

const GSTDetails = ({ updateFormData = () => {}, itemDetails = [] }) => {
  const [gstDetails, setGstDetails] = useState([
    {
      ItemCode: "",
      HSN: "",
      Rate: "",
      Qty: "",
      SubTotal: "",
      Discount: "",
      DiscountAmt: "",
      Packing: "",
      Transport: "",
      ToolAmort: "",
      AssValue: "",
      CGST: "",
      CGSTAmt: "",
      SGST: "",
      SGSTAmt: "",
      IGST: "",
      IGSTAmt: "",
      Vat: "",
      Cess: "",
      Total: "",
      TOC_AssableValue: "",
      TOC_PackCharges: "",
      TOC_TransportCost: "",
      TOC_Insurance: "",
      TOC_InstallationCharges: "",
      TOC_CGST: "",
      TOC_SGST: "",
      TOC_IGST: "",
      TOC_VAT: "",
      TOC_CESS: "",
      TOC_TDS: "",
      GR_Total: "",
    },
  ])

  useEffect(() => {
    const calculatedGSTDetails = itemDetails.map((item) => {
      const rate = Number(item.Rate) || 0
      const qty = Number(item.Qty) || 0
      const subtotal = rate * qty

      const discountPercent = Number(item.Disc) || 0
      const discountAmount = (subtotal * discountPercent) / 100

      const assessableValue = subtotal - discountAmount

      const cgstRate = Number(item.GST_Details?.CGST?.Rate) || 9 
      const sgstRate = Number(item.GST_Details?.SGST?.Rate) || 9 
      const igstRate = Number(item.GST_Details?.IGST?.Rate) || 0

      const cgstAmount = (assessableValue * cgstRate) / 100
      const sgstAmount = (assessableValue * sgstRate) / 100
      const igstAmount = (assessableValue * igstRate) / 100

      const total = assessableValue + cgstAmount + sgstAmount + igstAmount

      return {
        ItemCode: item.Item || "",
        HSN: item.HSN_SAC_Code || "",
        Rate: rate,
        Qty: qty,
        SubTotal: subtotal.toFixed(2),
        Discount: discountPercent,
        DiscountAmt: discountAmount.toFixed(2),
        AssValue: assessableValue.toFixed(2),
        CGST: cgstRate,
        CGSTAmt: cgstAmount.toFixed(2),
        SGST: sgstRate,
        SGSTAmt: sgstAmount.toFixed(2),
        IGST: igstRate,
        IGSTAmt: igstAmount.toFixed(2),
        Total: total.toFixed(2),
      }
    })

    setGstDetails(calculatedGSTDetails.length > 0 ? calculatedGSTDetails : [{}])
    updateFormData("Gst_Details", calculatedGSTDetails)
  }, [itemDetails, updateFormData])

  const addNewRow = () => {
    setGstDetails([
      ...gstDetails,
      {
        ItemCode: "",
        HSN: "",
        Rate: "",
        Qty: "",
        SubTotal: "",
        Discount: "",
        DiscountAmt: "",
        Packing: "",
        Transport: "",
        ToolAmort: "",
        AssValue: "",
        CGST: "",
        CGSTAmt: "",
        SGST: "",
        SGSTAmt: "",
        IGST: "",
        IGSTAmt: "",
        Vat: "",
        Cess: "",
        Total: "",
        TOC_AssableValue: "",
        TOC_PackCharges: "",
        TOC_TransportCost: "",
        TOC_Insurance: "",
        TOC_InstallationCharges: "",
        TOC_CGST: "",
        TOC_SGST: "",
        TOC_IGST: "",
        TOC_VAT: "",
        TOC_CESS: "",
        TOC_TDS: "",
        GR_Total: "",
      },
    ])
  }

  const handleInputChange = (index, field, value) => {
    if (field === "ItemCode" && value.length > 30) {
      toast.error("Item Code cannot exceed 30 characters.")
      return
    }

    const updatedDetails = [...gstDetails]
    updatedDetails[index][field] =
      field === "Rate" || field === "Qty" || field === "CGST" || field === "SGST" || field === "IGST"
        ? Number(value) || 0
        : value

    if (field === "Rate" || field === "Qty" || field === "Discount") {
      const rate = field === "Rate" ? Number(value) || 0 : Number(updatedDetails[index].Rate) || 0
      const qty = field === "Qty" ? Number(value) || 0 : Number(updatedDetails[index].Qty) || 0
      const discount = field === "Discount" ? Number(value) || 0 : Number(updatedDetails[index].Discount) || 0

      const subtotal = rate * qty
      const discountAmount = (subtotal * discount) / 100
      const assessableValue = subtotal - discountAmount

      updatedDetails[index].SubTotal = subtotal.toFixed(2)
      updatedDetails[index].DiscountAmt = discountAmount.toFixed(2)
      updatedDetails[index].AssValue = assessableValue.toFixed(2)

      const cgstRate = Number(updatedDetails[index].CGST) || 0
      const sgstRate = Number(updatedDetails[index].SGST) || 0
      const igstRate = Number(updatedDetails[index].IGST) || 0

      updatedDetails[index].CGSTAmt = ((assessableValue * cgstRate) / 100).toFixed(2)
      updatedDetails[index].SGSTAmt = ((assessableValue * sgstRate) / 100).toFixed(2)
      updatedDetails[index].IGSTAmt = ((assessableValue * igstRate) / 100).toFixed(2)

      const total =
        assessableValue +
        Number(updatedDetails[index].CGSTAmt) +
        Number(updatedDetails[index].SGSTAmt) +
        Number(updatedDetails[index].IGSTAmt)

      updatedDetails[index].Total = total.toFixed(2)
    }

    if (field === "CGST" || field === "SGST" || field === "IGST") {
      const assessableValue = Number(updatedDetails[index].AssValue) || 0
      const taxRate = Number(value) || 0
      const taxAmount = (assessableValue * taxRate) / 100

      if (field === "CGST") updatedDetails[index].CGSTAmt = taxAmount.toFixed(2)
      if (field === "SGST") updatedDetails[index].SGSTAmt = taxAmount.toFixed(2)
      if (field === "IGST") updatedDetails[index].IGSTAmt = taxAmount.toFixed(2)

      const total =
        assessableValue +
        Number(updatedDetails[index].CGSTAmt) +
        Number(updatedDetails[index].SGSTAmt) +
        Number(updatedDetails[index].IGSTAmt)

      updatedDetails[index].Total = total.toFixed(2)
    }

    setGstDetails(updatedDetails)
    updateFormData("Gst_Details", updatedDetails)
  }

  const calculateTotals = () => {
    const totals = gstDetails.reduce(
      (acc, item) => {
        acc.subTotal += Number(item.SubTotal) || 0
        acc.discountAmt += Number(item.DiscountAmt) || 0
        acc.assessableValue += Number(item.AssValue) || 0
        acc.cgst += Number(item.CGSTAmt) || 0
        acc.sgst += Number(item.SGSTAmt) || 0
        acc.igst += Number(item.IGSTAmt) || 0
        acc.total += Number(item.Total) || 0
        return acc
      },
      { subTotal: 0, discountAmt: 0, assessableValue: 0, cgst: 0, sgst: 0, igst: 0, total: 0 },
    )
    
    if (gstDetails.length > 0) {
      const firstRow = gstDetails[0]
      
      const extraCharges = 
        (Number(firstRow.TOC_PackCharges) || 0) +
        (Number(firstRow.TOC_TransportCost) || 0) +
        (Number(firstRow.TOC_Insurance) || 0) +
        (Number(firstRow.TOC_InstallationCharges) || 0) +
        (Number(firstRow.TOC_VAT) || 0) +
        (Number(firstRow.TOC_CESS) || 0)
        
      const tds = Number(firstRow.TOC_TDS) || 0
      
      totals.total = totals.total + extraCharges - tds
    }
    
    return totals
  }

  const totals = calculateTotals()

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {/* GST Table Section */}
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
          <h6 className="mb-0 fw-bold text-secondary">GST Details</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0" style={{ minWidth: '1500px' }}>
              <thead className="table-light">
                <tr>
                  {['Sr.', 'Item Code', 'HSN', 'Rate', 'Qty', 'Sub Total', 'Disc %', 'Disc Amt', 'Ass Value', 'CGST %', 'CGST Amt', 'SGST %', 'SGST Amt', 'IGST %', 'IGST Amt', 'Total', 'Action'].map((head, index) => (
                    <th key={index} style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '6px 4px' }} className="text-center text-secondary text-uppercase">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gstDetails.map((detail, index) => (
                  <tr key={index}>
                    <td className="text-center text-secondary" style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{index + 1}</td>
                    <td style={{ padding: '6px 4px' }}><input type="text" className="form-control form-control-sm" value={detail.ItemCode} onChange={(e) => handleInputChange(index, "ItemCode", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="text" className="form-control form-control-sm" value={detail.HSN} onChange={(e) => handleInputChange(index, "HSN", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.Rate} onChange={(e) => handleInputChange(index, "Rate", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.Qty} onChange={(e) => handleInputChange(index, "Qty", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.SubTotal} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.Discount} onChange={(e) => handleInputChange(index, "Discount", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.DiscountAmt} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.AssValue} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.CGST} onChange={(e) => handleInputChange(index, "CGST", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.CGSTAmt} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.SGST} onChange={(e) => handleInputChange(index, "SGST", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.SGSTAmt} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm" value={detail.IGST} onChange={(e) => handleInputChange(index, "IGST", e.target.value)} /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.IGSTAmt} readOnly /></td>
                    <td style={{ padding: '6px 4px' }}><input type="number" className="form-control form-control-sm bg-light" value={detail.Total} readOnly /></td>
                    <td style={{ padding: '6px 4px' }} className="text-center">
                      <button type="button" className="btn btn-sm text-success border-0 p-1" onClick={addNewRow}>
                        <FaPlusCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TOC / Totals Section */}
      <div className="card shadow-sm border-0 mb-4 p-3" style={{ borderRadius: '12px' }}>
        <h6 className="mb-3 fw-bold text-secondary">Terms & Totals</h6>
        {gstDetails.length > 0 ? (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>TOC ASSABLE VALUE:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_AssableValue || ""} onChange={(e) => handleInputChange(0, "TOC_AssableValue", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>PACK. & FWRD. CHARGES:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_PackCharges || ""} onChange={(e) => handleInputChange(0, "TOC_PackCharges", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>TRANSPORT CHARGES:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_TransportCost || ""} onChange={(e) => handleInputChange(0, "TOC_TransportCost", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>INSURANCE:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_Insurance || ""} onChange={(e) => handleInputChange(0, "TOC_Insurance", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>INSTALLATION CHARGES:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_InstallationCharges || ""} onChange={(e) => handleInputChange(0, "TOC_InstallationCharges", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>TDS:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_TDS || ""} onChange={(e) => handleInputChange(0, "TOC_TDS", e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-md-6 border-start dashed">
              <div className="d-flex flex-column gap-2 ps-md-4">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>CGST:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_CGST !== undefined && gstDetails[0].TOC_CGST !== "" ? gstDetails[0].TOC_CGST : totals.cgst.toFixed(2)} onChange={(e) => handleInputChange(0, "TOC_CGST", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>SGST:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_SGST !== undefined && gstDetails[0].TOC_SGST !== "" ? gstDetails[0].TOC_SGST : totals.sgst.toFixed(2)} onChange={(e) => handleInputChange(0, "TOC_SGST", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>IGST:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_IGST !== undefined && gstDetails[0].TOC_IGST !== "" ? gstDetails[0].TOC_IGST : totals.igst.toFixed(2)} onChange={(e) => handleInputChange(0, "TOC_IGST", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>VAT:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_VAT || ""} onChange={(e) => handleInputChange(0, "TOC_VAT", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>CESS:</span>
                  <input type="number" className="form-control form-control-sm" style={{ width: '200px' }} value={gstDetails[0].TOC_CESS || ""} onChange={(e) => handleInputChange(0, "TOC_CESS", e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2 p-2 bg-light rounded">
                  <span className="fw-bold text-dark">GRAND TOTAL:</span>
                  <span className="fw-bold text-primary fs-5">₹{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted py-4" style={{ fontSize: '0.85rem' }}>No GST details available</div>
        )}
      </div>
    </div>
  )
}

export default GSTDetails
