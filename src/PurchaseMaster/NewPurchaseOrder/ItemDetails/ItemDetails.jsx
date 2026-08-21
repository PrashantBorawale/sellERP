"use client"

import { useState, useEffect, useRef } from "react"
import { fetchTransactionById } from "../../../Service/PurchaseApi"
import { toast } from "react-toastify"
import { fetchItemFields } from "../../../Service/Api"
import { FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa"
import "./ItemDetails.css"

const ItemDetails = ({ updateFormData, supplierCode, existingItems = [], isEditMode = false }) => {
  const [itemDetails, setItemDetails] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    Item: "",
    ItemDescription: "",
    ItemSize: "",
    Rate: "",
    HSN_SAC_Code: "",
    Number: supplierCode || "",
    Disc: "",
    Qty: "",
    Unit: "",
    Particular: "",
    Mill_Name: "",
    DeliveryDt: "",
    PartCode: "",
    CGST: "",
    IGST: "",
    SGST: "",
    UTGST: "",
  })
  const [bomItems, setBomItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentItemId,] = useState(null)

  useEffect(() => {
    if (isEditMode && existingItems && existingItems.length > 0) {
      setItemDetails(existingItems)
      updateFormData("Item_Detail_Enter", existingItems)
    }
  }, [isEditMode, existingItems, updateFormData])

  useEffect(() => {
    if (currentItemId) {
      const loadTransactionData = async () => {
        setLoading(true)
        try {
          const response = await fetchTransactionById(currentItemId)
          if (response && response.data) {
            const { data } = response
            const item = {
              id: data.id,
              Item: data.part_no,
              PartCode: data.Part_Code,
              ItemDescription: data.ItemDescription,
              ItemSize: data.ItemSize || "",
              Rate: data.Rate,
              HSN_SAC_Code: data.HSN_SAC_Code,
              Disc: data.Disc,
              Qty: data.Qty,
              Unit: data.Unit,
              Particular: data.Particular,
              Mill_Name: data.Mill_Name,
              DeliveryDt: data.DeliveryDt,
              GST_Details: data.GST_Details,
              Schedule_Line: data.Schedule_Line,
              CGST: data.CGST,
              SGST: data.SGST,
              IGST: data.IGST,
              UTGST: data.UTGST,
            }
            setItemDetails([item])
            updateFormData("Item_Detail_Enter", [item])
            toast.success("Transaction data loaded successfully")
          } else {
            toast.error("No transaction data found")
          }
        } catch (error) {
          toast.error("Error loading transaction data")
        } finally {
          setLoading(false)
        }
      }
      loadTransactionData()
    }
  }, [currentItemId, updateFormData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "Rate" || name === "Qty" || name === "Disc" ? Number(value) || 0 : value,
    }))
  }

  useEffect(() => {
    setCurrentItem((prev) => ({
      ...prev,
      Number: supplierCode || "",
    }))
  }, [supplierCode])

  const searchTimeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value
    setCurrentItem({ ...currentItem, Item: value })

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!value.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await fetchItemFields(value)
        if (Array.isArray(data) && data.length > 0) {
          setSearchResults(data)
          setShowDropdown(true)
        } else {
          setSearchResults([])
          setShowDropdown(false)
        }
      } catch (error) {
        setSearchResults([])
        setShowDropdown(false)
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  const handleSelectItem = (item) => {
    setCurrentItem({
      ...currentItem,
      Item: item.part_no || "",
      PartCode: item.Part_Code || "",
      ItemDescription: item.Name_Description || "",
      ItemSize: item.Item_Size || "",
      Rate: item.Rate || "",
      HSN_SAC_Code: item.HSN_SAC_Code || "",
      Unit: item.Unit_Code || "",
    })

    if (item.bom_items && item.bom_items.length > 0) {
      setBomItems(item.bom_items)
    } else {
      setBomItems([])
    }

    setShowDropdown(false)
  }

  const handleSelectPartCode = (e) => {
    setCurrentItem({ ...currentItem, PartCode: e.target.value })
  }

  useEffect(() => {
    if (
      existingItems &&
      existingItems.length > 0 &&
      (itemDetails.length === 0 || JSON.stringify(existingItems) !== JSON.stringify(itemDetails))
    ) {
      setItemDetails(existingItems)
    }
  }, [existingItems, itemDetails])

  const addItem = async () => {
    if (!currentItem.Item || !currentItem.ItemDescription) {
      toast.error("Item and Item Description are required.")
      return
    }

    setLoading(true)
    try {
      const newItem = {
        ...currentItem,
        id: Date.now(),
        GST_Details: {
          HSN: currentItem.HSN_SAC_Code,
          CGST: currentItem.CGST,
          SGST: currentItem.SGST,
          IGST: currentItem.IGST,
          UTGST: currentItem.UTGST
        },
        Schedule_Line: [
          {
            Item: currentItem.Item,
            ItemDescription: currentItem.ItemDescription,
            Qty: currentItem.Qty,
          },
        ],
      }

      const updatedItems = [...itemDetails, newItem]
      setItemDetails(updatedItems)
      updateFormData("Item_Detail_Enter", updatedItems)

      toast.success("Item added successfully")

      setCurrentItem({
        Item: "",
        ItemDescription: "",
        ItemSize: "",
        Rate: "",
        HSN_SAC_Code: "",
        Number: supplierCode || "",
        Disc: "",
        Qty: "",
        Unit: "",
        Particular: "",
        Mill_Name: "",
        DeliveryDt: "",
        PartCode: "",
      })
      setBomItems([])
    } catch (error) {
      toast.error("Failed to add item")
    } finally {
      setLoading(false)
    }
  }

  const removeItem = (index) => {
    const updatedItems = [...itemDetails]
    updatedItems.splice(index, 1)
    setItemDetails(updatedItems)
    updateFormData("Item_Detail_Enter", updatedItems)
    toast.info("Item removed")
  }

  return (
    <div className="item-details-wrapper" style={{ padding: '0.5rem 0' }}>
      
      {/* Input Table Section */}
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
          <h6 className="mb-0 fw-bold text-secondary">Add Item Details</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0" style={{ minWidth: '1200px' }}>
              <thead className="table-light">
                <tr>
                  {['SELECT ITEM', 'DESCRIPTION', 'SIZE', 'RATE', 'DISC %', 'QTY', 'UNIT', 'PARTICULAR', 'MAKE / MILL', 'DELIVERY', 'PART CODE', 'ACT.'].map((head, index) => (
                    <th key={index} style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 4px' }} className="text-center text-secondary">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 4px' }}>
                    <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
                      <input 
                        type="text" 
                        className="form-control form-control-sm"
                        name="Item" 
                        value={currentItem.Item} 
                        onChange={handleSearch} 
                        disabled={loading}
                        placeholder="Search"
                        autoComplete="off"
                      />
                      {showDropdown && searchResults.length > 0 && (
                        <ul className="list-group position-absolute w-100 mt-1 shadow-sm" style={{ top: "100%", left: 0, zIndex: 1050, maxHeight: "200px", overflowY: "auto", minWidth: "250px", background: "#fff", border: "1px solid #ced4da", borderRadius: "0 0 6px 6px" }}>
                          {searchResults.map((item) => (
                            <li 
                              key={item.part_no} 
                              className="list-group-item list-group-item-action" 
                              style={{ cursor: "pointer", fontSize: "0.75rem", padding: "8px" }}
                              onClick={() => handleSelectItem(item)}
                            >
                              {item.part_no} - {item.Part_Code} - {item.Name_Description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="text" className="form-control form-control-sm" name="ItemDescription" value={currentItem.ItemDescription} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="text" className="form-control form-control-sm" name="ItemSize" value={currentItem.ItemSize} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="number" className="form-control form-control-sm" name="Rate" value={currentItem.Rate} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="number" className="form-control form-control-sm" name="Disc" value={currentItem.Disc} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="number" className="form-control form-control-sm" name="Qty" value={currentItem.Qty} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="text" className="form-control form-control-sm" name="Unit" value={currentItem.Unit} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="text" className="form-control form-control-sm" name="Particular" value={currentItem.Particular} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="text" className="form-control form-control-sm" name="Mill_Name" value={currentItem.Mill_Name} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <input type="date" className="form-control form-control-sm" name="DeliveryDt" value={currentItem.DeliveryDt} onChange={handleChange} disabled={loading} />
                  </td>
                  <td style={{ padding: '8px 4px' }}>
                    <select className="form-select form-select-sm" name="PartCode" value={currentItem.PartCode} onChange={handleSelectPartCode} disabled={loading || bomItems.length === 0}>
                      <option value="">Part Code</option>
                      {bomItems.map((bom) => (
                        <option key={bom.id} value={bom.PartCode}>
                          {bom.PartCode} - {bom.BOMPartType}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '8px 4px' }} className="text-center">
                    <button type="button" className="btn btn-sm text-success border-0 p-1" title="Add Item" onClick={addItem} disabled={loading}>
                      <FaPlus size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Added Items Table Section */}
      <div className="card shadow-sm border-0 mb-2" style={{ borderRadius: '12px' }}>
        <div className="card-body p-0">
          <div className="table-responsive" style={{ maxHeight: '40vh' }}>
            <table className="table table-bordered table-striped mb-0" style={{ minWidth: '1200px' }}>
              <thead className="table-primary sticky-top">
                <tr>
                  {['SR.', 'ITEM CODE', 'PART CODE', 'DESCRIPTION / GST', 'SIZE', 'RATE', 'DISC %', 'QTY', 'UNIT', 'PARTICULAR', 'MAKE / MILL', 'DELIVERY', 'ACT.'].map((head, index) => (
                    <th key={index} style={{ whiteSpace: 'normal', fontSize: '0.65rem', padding: '8px 4px', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }} className="text-center">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {itemDetails.length > 0 ? (
                  itemDetails.map((item, index) => (
                    <tr key={item.id || index}>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{index + 1}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', fontWeight: 600, whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Item}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#475569', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.PartCode}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>
                        <div style={{ fontWeight: 600, overflowWrap: 'anywhere', wordBreak: 'normal' }}>{item.ItemDescription}</div>
                        <div style={{ fontSize: '0.65rem', color: '#6c757d', overflowWrap: 'anywhere', wordBreak: 'normal' }}>
                          HSN: {item.HSN_SAC_Code || ""} | GST: {item.CGST || "0"}% C / {item.SGST || "0"}% S / {item.IGST || "0"}% I / {item.UTGST || "0"}% U
                        </div>
                      </td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.ItemSize}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#10b981', fontWeight: 600, whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Rate}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Disc}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Qty}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Unit}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Particular}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.Mill_Name}</td>
                      <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#64748b', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'normal', verticalAlign: 'middle' }}>{item.DeliveryDt}</td>
                      <td style={{ padding: '6px 4px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <button type="button" className="btn btn-sm text-danger border-0 p-1" title="Delete Item" onClick={() => removeItem(index)} disabled={loading}>
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                      No items found. Add an item above.
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

export default ItemDetails
