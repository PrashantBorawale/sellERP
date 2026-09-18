"use client"

import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Npd.css"

const Npd = ({ onDataChange }) => {
  const [npdData, setNpdData] = useState([])
  const [npd, setNpd] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [npdQty, setNpdQty] = useState("")
  const [npdDueDate, setNpdDueDate] = useState("")

  // Pass data to parent component whenever it changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(npdData)
    }
  }, [npdData, onDataChange])

  // Function to add a new NPD entry
  const handleAddNpd = () => {
    if (npd && customerName && npdQty && npdDueDate) {
      const newNpdEntry = {
        NPD: npd,
        CustomerName: customerName,
        NPD_Qty: npdQty,
        NPD_Due_Date: npdDueDate,
      }

      const updatedNpdData = [...npdData, newNpdEntry]
      setNpdData(updatedNpdData)

      // Clear form fields
      setNpd("")
      setCustomerName("")
      setNpdQty("")
      setNpdDueDate("")

      // Update parent component
      if (onDataChange) {
        onDataChange(updatedNpdData)
      }
    }
  }

  return (
    <div className="Npd123">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="row mb-3">
              <label htmlFor="npdSelect" className="col-sm-5 col-form-label">
                NPD:
              </label>
              <div className="col-sm-7">
                <select
                  className="form-select"
                  id="npdSelect"
                  value={npd}
                  onChange={(e) => setNpd(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value="">Select...</option>
                  <option value="New Part Dev A">New Part Dev A</option>
                  <option value="New Part Dev B">New Part Dev B</option>
                  <option value="New Part Dev C">New Part Dev C</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="customerName" className="col-sm-5 col-form-label">
                Customer Name:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  placeholder="Enter Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="npdQty" className="col-sm-5 col-form-label">
                NPD Qty:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="npdQty"
                  value={npdQty}
                  onChange={(e) => setNpdQty(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="npdDueDate" className="col-sm-5 col-form-label">
                NPD Due Date:
              </label>
              <div className="col-sm-7">
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    id="npdDueDate"
                    value={npdDueDate}
                    onChange={(e) => setNpdDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12 text-end">
                <button className="btn-npd-add" onClick={handleAddNpd}>
                  Add NPD
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h6>NPD Entries</h6>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>NPD</th>
                  <th>Customer Name</th>
                  <th>Qty</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {npdData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.NPD}</td>
                    <td>{entry.CustomerName}</td>
                    <td>{entry.NPD_Qty}</td>
                    <td>{entry.NPD_Due_Date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Npd
