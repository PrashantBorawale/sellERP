"use client"

import React, { useState, useEffect } from "react"
import "./Schedule.css"

const Schedule = ({ updateFormData, itemDetails = [], existingSchedule = [] }) => {
  const [scheduleLine, setScheduleLine] = useState([])

  // ✅ Update schedule when `itemDetails` changes or existingSchedule is loaded
  useEffect(() => {
    if (itemDetails.length > 0) {
      setScheduleLine((prevSchedule) => {
        const updatedSchedule = itemDetails.map((item, index) => {
          // First check if we have existing schedule data from API (edit mode)
          const existingItem = existingSchedule.find(
            (prev) => prev.ItemCode === (item.Item || "").substring(0, 30).trim()
          )
          // Then check if we already have local state for this item
          const localItem = prevSchedule.find(
            (prev) => prev.ItemCode === (item.Item || "").substring(0, 30).trim()
          )

          const sourceItem = localItem || existingItem

          return {
            id: index + 1,
            ItemCode: (item.Item || "").substring(0, 30).trim(),
            Description: item.ItemDescription || "",
            TotalQty: item.Qty || 0,
            Date1: sourceItem?.Date1 || "",
            Qty1: sourceItem?.Qty1 || "",
            Date2: sourceItem?.Date2 || "",
            Qty2: sourceItem?.Qty2 || "",
            Date3: sourceItem?.Date3 || "",
            Qty3: sourceItem?.Qty3 || "",
            Date4: sourceItem?.Date4 || "",
            Qty4: sourceItem?.Qty4 || "",
            Date5: sourceItem?.Date5 || "",
            Qty5: sourceItem?.Qty5 || "",
          }
        })

        updateFormData("Schedule_Line", updatedSchedule)
        return updatedSchedule
      })
    }
  }, [itemDetails, existingSchedule, updateFormData])

  // ✅ Handle date and quantity changes
  const handleInputChange = (rowIndex, fieldName, value) => {
    setScheduleLine((prevSchedule) => {
      const updatedSchedule = prevSchedule.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [fieldName]: value,
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
            <table className="table table-bordered align-middle mb-0" style={{ minWidth: '900px' }}>
              <thead className="table-light">
                <tr>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Sr.</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Item Code</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Description</th>
                  <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Total Qty</th>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <React.Fragment key={num}>
                      <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Date {num}</th>
                      <th className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }}>Qty {num}</th>
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
                      {[1, 2, 3, 4, 5].map((num) => (
                        <React.Fragment key={num}>
                          <td className="text-center" style={{ padding: '8px 4px' }}>
                            <input
                              type="date"
                              className="form-control form-control-sm mx-auto"
                              value={row[`Date${num}`] || ""}
                              onChange={(e) => handleInputChange(rowIndex, `Date${num}`, e.target.value)}
                              style={{ minWidth: '95px' }}
                            />
                          </td>
                          <td className="text-center" style={{ padding: '8px 4px' }}>
                            <input
                              type="number"
                              className="form-control form-control-sm mx-auto"
                              value={row[`Qty${num}`] || ""}
                              onChange={(e) => handleInputChange(rowIndex, `Qty${num}`, e.target.value)}
                              style={{ minWidth: '40px' }}
                            />
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14} className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
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
