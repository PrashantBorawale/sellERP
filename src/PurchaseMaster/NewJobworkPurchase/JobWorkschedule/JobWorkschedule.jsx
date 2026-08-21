"use client"

import { useState, useEffect } from "react"
import "./Jobworkschedule.css"

const JobWorkschedule = ({ data, updateData }) => {
  const [scheduleData, setScheduleData] = useState({
    ItemCode: "",
    Description: "",
    TotalQty: "",
    Date1: "",
    Qty1: "",
    Date2: "",
    Qty2: "",
    Date3: "",
    Qty3: "",
    Date4: "",
    Qty4: "",
    Date5: "",
    Qty5: "",
    Date6: "",
    Qty6: "",
  })

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const newData = data[0]
      if (newData && Object.keys(newData).length > 0) {
        setScheduleData(newData)
      }
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newScheduleData = { ...scheduleData, [name]: value }
    setScheduleData(newScheduleData)
    updateData([newScheduleData]) // Update parent state as array
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div className="card-body p-4">
          
          <div className="d-flex align-items-center mb-4 gap-3">
             <h6 className="fw-bold text-secondary mb-0">Auto Calculate Schedule Line On Report:</h6>
             <div className="d-flex align-items-center gap-3">
               <div className="form-check mb-0">
                 <input className="form-check-input" type="radio" name="autoCalculate" id="autoCalculateYes" value="yes" defaultChecked />
                 <label className="form-check-label" htmlFor="autoCalculateYes" style={{ fontSize: '0.875rem' }}>Yes</label>
               </div>
               <div className="form-check mb-0">
                 <input className="form-check-input" type="radio" name="autoCalculate" id="autoCalculateNo" value="no" />
                 <label className="form-check-label" htmlFor="autoCalculateNo" style={{ fontSize: '0.875rem' }}>No</label>
               </div>
             </div>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless table-hover mb-0">
              <thead className="bg-light border-bottom">
                <tr>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Sr.</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Item Code</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Description</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Total Qty</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 1</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 1</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 2</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 2</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 3</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 3</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 4</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 4</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 5</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 5</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Date 6</th>
                  <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Qty 6</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-middle">
                  <td className="border-end text-center" style={{ fontSize: '11px', padding: '8px' }}>1</td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="ItemCode" value={scheduleData.ItemCode} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Description" value={scheduleData.Description} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="TotalQty" value={scheduleData.TotalQty} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date1" value={scheduleData.Date1} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty1" value={scheduleData.Qty1} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date2" value={scheduleData.Date2} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty2" value={scheduleData.Qty2} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date3" value={scheduleData.Date3} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty3" value={scheduleData.Qty3} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date4" value={scheduleData.Date4} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty4" value={scheduleData.Qty4} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date5" value={scheduleData.Date5} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty5" value={scheduleData.Qty5} onChange={handleChange} /></td>
                  
                  <td className="border-end" style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Date6" value={scheduleData.Date6} onChange={handleChange} /></td>
                  <td className="border-end" style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '4px' }} name="Qty6" value={scheduleData.Qty6} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobWorkschedule
