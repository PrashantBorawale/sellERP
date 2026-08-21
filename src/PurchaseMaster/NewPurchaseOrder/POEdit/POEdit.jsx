import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPurchaseOrderById, updatePurchaseOrder } from "../../../Service/PurchaseApi"

const POEdit = () => {
    const [poData, setPoData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchPo = async () => {
        try {
          const data = await fetchPurchaseOrderById(id)
          setPoData(data)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
  
      fetchPo()
    }, [id])
  
    const handleChange = (e, section = null, index = null) => {
      const { name, value } = e.target
  
      if (section) {
        setPoData((prev) => ({
          ...prev,
          [section]: prev[section].map((item, i) => (i === index ? { ...item, [name]: value } : item)),
        }))
      } else {
        setPoData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await updatePurchaseOrder(id, poData)
        navigate("/PoList")
      } catch (error) {
        setError(error.message)
      }
    }
  
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!poData) return <div>No data found</div>
  
  return (
    <div className="container mt-4">
    <h2>Edit Purchase Order</h2>
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">PO No</label>
          <input type="text" className="form-control" name="PoNo" value={poData.PoNo} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">PO Date</label>
          <input type="date" className="form-control" name="PoDate" value={poData.PoDate} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">PO Type</label>
          <input type="text" className="form-control" name="field" value={poData.field} onChange={handleChange} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Contact Person</label>
          <input
            type="text"
            className="form-control"
            name="ContactPerson"
            value={poData.ContactPerson}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Enquiry No</label>
          <input
            type="text"
            className="form-control"
            name="EnquiryNo"
            value={poData.EnquiryNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <h3 className="mt-4">Item Details</h3>
      {poData.Item_Detail_Enter.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Item</label>
                <input
                  type="text"
                  className="form-control"
                  name="Item"
                  value={item.Item}
                  onChange={(e) => handleChange(e, "Item_Detail_Enter", index)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="ItemDescription"
                  value={item.ItemDescription}
                  onChange={(e) => handleChange(e, "Item_Detail_Enter", index)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="Qty"
                  value={item.Qty}
                  onChange={(e) => handleChange(e, "Item_Detail_Enter", index)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Rate</label>
                <input
                  type="text"
                  className="form-control"
                  name="Rate"
                  value={item.Rate}
                  onChange={(e) => handleChange(e, "Item_Detail_Enter", index)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Unit</label>
                <input
                  type="text"
                  className="form-control"
                  name="Unit"
                  value={item.Unit}
                  onChange={(e) => handleChange(e, "Item_Detail_Enter", index)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <button type="submit" className="btn btn-primary me-2">
          Save Changes
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/PoList")}>
          Cancel
        </button>
      </div>
    </form>
  </div>
  )
}

export default POEdit
