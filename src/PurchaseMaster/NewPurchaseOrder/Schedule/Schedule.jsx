"use client"

import React, { useState, useEffect } from "react"
import "./Schedule.css"

const Schedule = ({ updateFormData, itemDetails = [] }) => {
  const [scheduleLine, setScheduleLine] = useState([])

  // ✅ Update schedule when `itemDetails` changes
  useEffect(() => {
    if (itemDetails.length > 0) {
      setScheduleLine((prevSchedule) => {
        const updatedSchedule = itemDetails.map((item, index) => {
          const existingItem = prevSchedule.find((prev) => prev.ItemCode === item.Item)

          return {
            id: index + 1,
            ItemCode: (item.Item || "").substring(0, 30).trim(),
            Description: item.ItemDescription || "",
            TotalQty: item.Qty || 0,
            // Initialize dates and quantities arrays if they don't exist
            Dates: existingItem?.Dates || Array(10).fill(""),
            Quantities: existingItem?.Quantities || Array(10).fill(""),
          }
        })

        updateFormData("Schedule_Line", updatedSchedule)
        return updatedSchedule
      })
    }
  }, [itemDetails, updateFormData])

  // ✅ Handle date and quantity changes
  const handleInputChange = (rowIndex, field, value, dateIndex) => {
    setScheduleLine((prevSchedule) => {
      const updatedSchedule = prevSchedule.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [field]: row[field].map((val, i) => (i === dateIndex ? value : val)),
          }
        }
        return row
      })

      updateFormData("Schedule_Line", updatedSchedule)
      return updatedSchedule
    })
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
          <h6 className="mb-0 fw-bold text-secondary">Schedule Line</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0" style={{ minWidth: '1500px' }}>
              <thead className="table-light">
                <tr>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Sr.</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Item Code</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Description</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Total Qty</th>
                  {Array(10).fill().map((_, index) => (
                    <React.Fragment key={index}>
                      <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Date {index + 1}</th>
                      <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Qty {index + 1}</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleLine.length > 0 ? (
                  scheduleLine.map((row, rowIndex) => (
                    <tr key={row.id}>
                      <td className="text-center text-secondary" style={{ padding: '8px 4px', fontSize: '0.75rem' }}>{rowIndex + 1}</td>
                      <td className="text-center text-dark" style={{ padding: '8px 4px', fontSize: '0.75rem' }}>{row.ItemCode}</td>
                      <td className="text-center text-dark" style={{ padding: '8px 4px', fontSize: '0.75rem' }}>{row.Description}</td>
                      <td className="text-center text-dark" style={{ padding: '8px 4px', fontSize: '0.75rem' }}>{row.TotalQty}</td>
                      {Array(10).fill().map((_, index) => (
                        <React.Fragment key={index}>
                          <td className="text-center" style={{ padding: '8px 4px' }}>
                            <input
                              type="date"
                              className="form-control form-control-sm mx-auto"
                              value={row.Dates[index]}
                              onChange={(e) => handleInputChange(rowIndex, "Dates", e.target.value, index)}
                              style={{ minWidth: '95px' }}
                            />
                          </td>
                          <td className="text-center" style={{ padding: '8px 4px' }}>
                            <input
                              type="number"
                              className="form-control form-control-sm mx-auto"
                              value={row.Quantities[index]}
                              onChange={(e) => handleInputChange(rowIndex, "Quantities", e.target.value, index)}
                              style={{ minWidth: '40px' }}
                            />
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={24} className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                      No schedule data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
