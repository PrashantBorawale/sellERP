"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { getNextReworkNo1, postProductionEntry1, fetchUnitMachines } from "../../../Service/Production.jsx"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import "./ReworkPRoductionEntry.css"

const ReworkProductionEntry = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("prod-details")
  const [isFirstTabComplete, setIsFirstTabComplete] = useState(false)

  // Main form data state
  const [formData, setFormData] = useState({
    series: "",
    rework_no: "",
    rework_date: "",
    rework_time: "",
    machine: "",
    work_order: "",
    item_code: "",
    part_code: "",
    heat_code: "",
    rework_to_ok_qty: "",
    reject_to_ok_qty: "",
    change_fg: "",
    part_code2: "",
    heat_code2: "",
    reason_for_rework: "",
    quality_remark: "",
    operator: "",
  })

  // Separate states for table data
  const [tableData, setTableData] = useState([])
  const [consumptionData, setConsumptionData] = useState([])

  // Current item being added to tables
  const [currentItem, setCurrentItem] = useState({
    item_code: "",
    heat_code: "",
    rework_to_ok_qty: "",
    reject_to_ok_qty: "",
    rework_to_reject_qty: "",
  })

  // Current consumption item being added
  const [currentConsumption, setCurrentConsumption] = useState({
    item_desc: "",
    heat_code: "",
    qty: "",
  })

  const year = localStorage.getItem("Shortyear") || new Date().getFullYear().toString().slice(-2)

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open")
    } else {
      document.body.classList.remove("side-nav-open")
    }
  }, [sideNavOpen])

  // Fetch next rework number when series changes
  const fetchNextReworkNo = useCallback(async () => {
    if (!formData.series) return

    try {
      const nextReworkNo = await getNextReworkNo1(year)
      if (nextReworkNo) {
        setFormData((prev) => ({ ...prev, rework_no: nextReworkNo }))
      }
    } catch (error) {
      toast.error("Failed to fetch next rework number!")
      console.error("Error fetching rework number:", error)
    }
  }, [year, formData.series])

  useEffect(() => {
    if (formData.series) {
      fetchNextReworkNo()
    }
  }, [formData.series, fetchNextReworkNo])

  // Check if first tab is complete to enable second tab
  useEffect(() => {
    const requiredFields = [
      "series",
      "rework_date",
      "rework_time",
      "machine",
      "work_order",
      "reason_for_rework",
      "operator",
    ]

    const isComplete = requiredFields.every((field) => formData[field]) && tableData.length > 0
    setIsFirstTabComplete(isComplete)
  }, [formData, tableData])

  // Handle main form changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle series change specifically to trigger rework number fetch
  const handleSeriesChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, series: value }))
  }

  // Handle changes for the current item being added to the table
  const handleItemChange = (e) => {
    const { name, value } = e.target
    setCurrentItem((prev) => ({ ...prev, [name]: value }))
  }

  // Handle changes for the current consumption item
  const handleConsumptionChange = (e) => {
    const { name, value } = e.target
    setCurrentConsumption((prev) => ({ ...prev, [name]: value }))
  }

  // Add item to the production details table
  const handleAddItem = () => {
    // Validate required fields
    if (!currentItem.item_code || !currentItem.heat_code || !currentItem.rework_to_ok_qty) {
      toast.warning("Please fill all required fields for the item!")
      return
    }

    // Add to table data
    setTableData((prev) => [...prev, { ...currentItem }])

    // Reset current item fields
    setCurrentItem({
      item_code: "",
      heat_code: "",
      rework_to_ok_qty: "",
      reject_to_ok_qty: "",
      rework_to_reject_qty: "",
    })
  }

  // Delete item from production details table
  const handleDeleteItem = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index))
  }

  // Add item to consumption details table
  const handleAddConsumption = () => {
    // Validate required fields
    if (!currentConsumption.item_desc || !currentConsumption.heat_code || !currentConsumption.qty) {
      toast.warning("Please fill all required fields for consumption!")
      return
    }

    // Add to consumption data
    setConsumptionData((prev) => [...prev, { ...currentConsumption }])

    // Reset current consumption fields
    setCurrentConsumption({
      item_desc: "",
      heat_code: "",
      qty: "",
    })
  }

  // Delete item from consumption details table
  const handleDeleteConsumption = (index) => {
    setConsumptionData((prev) => prev.filter((_, i) => i !== index))
  }

  // Switch to consumption tab if first tab is complete
  const handleTabChange = (tab) => {
    if (tab === "consumption-details" && !isFirstTabComplete) {
      toast.warning("Please complete the Production Details tab first!")
      return
    }
    setActiveTab(tab)
  }

  // Submit the entire form
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate both tabs
    if (!isFirstTabComplete) {
      toast.warning("Please complete the Production Details tab first!")
      return
    }

    if (consumptionData.length === 0) {
      toast.warning("Please add at least one consumption item!")
      return
    }

    try {
      // Prepare payload with all data
      const payload = {
        ...formData,
        items: tableData,
        consumption_details: consumptionData,
      }

      // Submit data
      const result = await postProductionEntry1(payload)

      if (result) {
        console.log("result",result);
        toast.success("Rework production saved successfully!")

        // Reset form but keep series
        const currentSeries = formData.series
        setFormData({
          series: currentSeries,
          rework_no: "",
          rework_date: "",
          rework_time: "",
          machine: "",
          work_order: "",
          item_code: "",
          part_code: "",
          heat_code: "",
          rework_to_ok_qty: "",
          reject_to_ok_qty: "",
          change_fg: "",
          part_code2: "",
          heat_code2: "",
          reason_for_rework: "",
          quality_remark: "",
          operator: "",
        })

        // Reset tables
        setTableData([])
        setConsumptionData([])

        // Reset current items
        setCurrentItem({
          item_code: "",
          heat_code: "",
          rework_to_ok_qty: "",
          reject_to_ok_qty: "",
          rework_to_reject_qty: "",
        })

        setCurrentConsumption({
          item_desc: "",
          heat_code: "",
          qty: "",
        })

        // Fetch new rework number
        fetchNextReworkNo()

        // Switch back to first tab
        setActiveTab("prod-details")
      } else {
        toast.error("Error saving data!")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to save data!")
    }
  }

  // Unit Machine
  const [unitMachines, setUnitMachines] = useState([])
  const [filteredUnitMachines, setFilteredUnitMachines] = useState([])
  const [searchTermUnitMachine, setSearchTermUnitMachine] = useState("")
  const [dropdownVisibleUnitMachine, setDropdownVisibleUnitMachine] = useState(false)

  useEffect(() => {
    const loadUnitMachines = async () => {
      const data = await fetchUnitMachines()
      setUnitMachines(data)
      setFilteredUnitMachines(data)
    }
    loadUnitMachines()
  }, [])

  const handleSearchChangeUnitMachine = (event) => {
    const value = event.target.value
    setSearchTermUnitMachine(value)
    setDropdownVisibleUnitMachine(true)

    const filtered = unitMachines.filter(
      (unit) =>
        unit.WorkCenterName.toLowerCase().includes(value.toLowerCase()) ||
        unit.WorkCenterCode.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredUnitMachines(filtered)
  }

  const handleSelectUnitMachine = (unit) => {
    setSearchTermUnitMachine(`${unit.WorkCenterName} (${unit.WorkCenterCode})`)
    setFormData((prev) => ({ ...prev, machine: unit.WorkCenterCode }))
    setDropdownVisibleUnitMachine(false)
  }

  return (
    <div className="ReworkProductionEntryMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ReworkProductionEntry mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="ReworkProductionEntry-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <h5 className="header-title">Rework Production</h5>
                        </div>
                        <div className="col-md-1">
                          <select>
                            <option>Produlink</option>
                          </select>
                        </div>
                        <div className="col-md-1">
                          <label>Series</label>
                        </div>
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            name="series"
                            value={formData.series}
                            onChange={handleSeriesChange}
                          >
                            <option value="">Select</option>
                            <option value="Series A">Series A</option>
                            <option value="Rework Production">Rework Production</option>
                          </select>
                        </div>
                        <div className="col-md-6 text-end">{/* Additional header content if needed */}</div>
                      </div>
                    </div>

                    <div className="ReworkProductionEntry-content">
                      <div className="tabs">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === "prod-details" ? "active" : ""}`}
                              href="#prod-details"
                              onClick={() => handleTabChange("prod-details")}
                            >
                              Prod Details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === "consumption-details" ? "active" : ""}`}
                              href="#consumption-details"
                              onClick={() => handleTabChange("consumption-details")}
                            >
                              Consumption Details
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="tab-content" style={{ border: "none" }}>
                        {/* Production Details Tab */}
                        <div
                          className={`tab-pane fade ${activeTab === "prod-details" ? "show active" : ""}`}
                          id="prod-details"
                        >
                          <ProductionDetailsTab
                            formData={formData}
                            currentItem={currentItem}
                            tableData={tableData}
                            handleChange={handleChange}
                            handleItemChange={handleItemChange}
                            handleAddItem={handleAddItem}
                            handleDeleteItem={handleDeleteItem}
                            unitMachines={unitMachines}
                            filteredUnitMachines={filteredUnitMachines}
                            searchTermUnitMachine={searchTermUnitMachine}
                            dropdownVisibleUnitMachine={dropdownVisibleUnitMachine}
                            handleSearchChangeUnitMachine={handleSearchChangeUnitMachine}
                            handleSelectUnitMachine={handleSelectUnitMachine}
                            setDropdownVisibleUnitMachine={setDropdownVisibleUnitMachine}
                          />
                        </div>

                        {/* Consumption Details Tab */}
                        <div
                          className={`tab-pane fade ${activeTab === "consumption-details" ? "show active" : ""}`}
                          id="consumption-details"
                        >
                          <ConsumptionDetailsTab
                            currentConsumption={currentConsumption}
                            consumptionData={consumptionData}
                            handleConsumptionChange={handleConsumptionChange}
                            handleAddConsumption={handleAddConsumption}
                            handleDeleteConsumption={handleDeleteConsumption}
                          />
                        </div>
                      </div>

                      <div className="row mt-4" style={{ justifyContent: "end" }}>
                        <div className="col-md-2 text-end">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Production Details Tab Component
const ProductionDetailsTab = ({
  formData,
  currentItem,
  tableData,
  handleChange,
  handleItemChange,
  handleAddItem,
  handleDeleteItem,
  unitMachines,
  filteredUnitMachines,
  searchTermUnitMachine,
  dropdownVisibleUnitMachine,
  handleSearchChangeUnitMachine,
  handleSelectUnitMachine,
  setDropdownVisibleUnitMachine,
}) => {
  return (
    <div className="ReworkProductionEntry-first">
      <div className="row mb-3 text-start">
        <div className="col-md-3">
          <label>Rework No:</label>
          <input type="text" className="form-control" name="rework_no" value={formData.rework_no} readOnly />
        </div>
        <div className="col-md-3">
          <label>Rework Date:</label>
          <input
            type="date"
            className="form-control"
            name="rework_date"
            value={formData.rework_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label>Rework Time:</label>
          <input
            type="time"
            className="form-control"
            name="rework_time"
            value={formData.rework_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3" style={{ position: "relative" }}>
    <label>Machine:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Search Machine"
      value={searchTermUnitMachine}
      onChange={handleSearchChangeUnitMachine}
      onClick={() => setDropdownVisibleUnitMachine(!dropdownVisibleUnitMachine)}
      style={{
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {dropdownVisibleUnitMachine && (
      <div
        style={{
          position: "absolute",
          width: "100%",
          maxHeight: "200px",
          overflowY: "auto",
          overflowX: "auto",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        {filteredUnitMachines.length > 0 ? (
          filteredUnitMachines.map((unit) => (
            <div
              key={unit.WorkCenterCode}
              onClick={() => handleSelectUnitMachine(unit)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {unit.WorkCenterName} ({unit.WorkCenterCode})
            </div>
          ))
        ) : (
          <div style={{ padding: "8px 12px" }}>No machines found</div>
        )}
      </div>
    )}
  </div>
      </div>

      <div className="row mb-3 text-start">
      

        <div className="col-md-3">
          <label>Work Order:</label>
          <input
            type="text"
            className="form-control"
            name="work_order"
            value={formData.work_order}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label>Item Code:</label>
          <input
            type="text"
            className="form-control"
            name="item_code"
            value={currentItem.item_code}
            onChange={handleItemChange}
          />
        </div>
        <div className="col-md-3">
          <label>Part Code:</label>
          <select className="form-select" name="part_code" value={formData.part_code} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Part 1">Part 1</option>
            <option value="Part 2">Part 2</option>
          </select>
        </div>
        <div className="col-md-3">
          <label>Heat Code:</label>
          <input
            type="text"
            className="form-control"
            name="heat_code"
            value={currentItem.heat_code}
            onChange={handleItemChange}
          />
        </div>
      </div>

      <div className="row mb-3 text-start">
      
        <div className="col-md-3">
          <label>Rework to Ok Qty:</label>
          <input
            type="text"
            className="form-control"
            name="rework_to_ok_qty"
            value={currentItem.rework_to_ok_qty}
            onChange={handleItemChange}
          />
        </div>
        <div className="col-md-3">
          <label>Reject to Ok Qty:</label>
          <input
            type="text"
            className="form-control"
            name="reject_to_ok_qty"
            value={currentItem.reject_to_ok_qty}
            onChange={handleItemChange}
          />
        </div>
        <div className="col-md-3">
          <label>Rework to Reject Qty:</label>
          <input
            type="text"
            className="form-control"
            name="rework_to_reject_qty"
            value={currentItem.rework_to_reject_qty}
            onChange={handleItemChange}
          />
        </div>
        <div className="col-md-3">
          <label>Change FG:</label>
          <input
            type="text"
            className="form-control"
            name="change_fg"
            value={formData.change_fg}
            onChange={handleChange}
          />
        </div>
      </div>

      

      <div className="row mb-3 text-start">
        
        <div className="col-md-3">
          <label>Part Code 2:</label>
          <select className="form-select" name="part_code2" value={formData.part_code2} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Machine 1">Machine 1</option>
            <option value="Machine 2">Machine 2</option>
          </select>
        </div>
        <div className="col-md-3">
          <label>Heat Code 2:</label>
          <input
            type="text"
            className="form-control"
            name="heat_code2"
            value={formData.heat_code2}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label>Reason For Rework:</label>
          <input
            type="text"
            className="form-control"
            name="reason_for_rework"
            value={formData.reason_for_rework}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label>Quality Remark:</label>
          <input
            type="text"
            className="form-control"
            name="quality_remark"
            value={formData.quality_remark}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3 text-start">
       
        <div className="col-md-3">
          <label>Operator:</label>
          <input
            type="text"
            className="form-control"
            name="operator"
            value={formData.operator}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 offset-md-10 text-end" style={{marginTop:"-35px"}}>
          <button type="button" className="btn" onClick={handleAddItem}>
            Add
          </button>
        </div>
      </div>

      <div className="row mb-3 text-start">
       
      </div>

      <div className="ReworkProductionEntry-table-section">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Item Desc</th>
              <th>Heat Code</th>
              <th>Rework to OK Qty</th>
              <th>Reject to OK Qty</th>
              <th>Rework to Reject Qty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.item_code}</td>
                <td>{row.heat_code}</td>
                <td>{row.rework_to_ok_qty}</td>
                <td>{row.reject_to_ok_qty}</td>
                <td>{row.rework_to_reject_qty}</td>
                <td>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(index)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
            {tableData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No data added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
    </div>
  )
}

// Consumption Details Tab Component
const ConsumptionDetailsTab = ({
  currentConsumption,
  consumptionData,
  handleConsumptionChange,
  handleAddConsumption,
  handleDeleteConsumption,
}) => {
  return (
    <div className="ReworkProductionEntry-second">
      <div className="row mb-3 text-start">
        <div className="col-md-3">
          <label>Item Description:</label>
          <input
            type="text"
            className="form-control"
            name="item_desc"
            value={currentConsumption.item_desc}
            onChange={handleConsumptionChange}
          />
        </div>
        <div className="col-md-3">
          <label>Heat Code:</label>
          <input
            type="text"
            className="form-control"
            name="heat_code"
            value={currentConsumption.heat_code}
            onChange={handleConsumptionChange}
          />
        </div>
        <div className="col-md-3">
          <label>Qty:</label>
          <input
            type="text"
            className="form-control"
            name="qty"
            value={currentConsumption.qty}
            onChange={handleConsumptionChange}
          />
        </div>
        <div className="col-md-2 mt-4">
          <button type="button" className="btn btn-primary" onClick={handleAddConsumption}>
            Add
          </button>
        </div>
      </div>

      <div className="ReworkProductionEntry-table-section">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Item Desc</th>
              <th>Heat Code</th>
              <th>Qty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {consumptionData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.item_desc}</td>
                <td>{item.heat_code}</td>
                <td>{item.qty}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteConsumption(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
            {consumptionData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No consumption data added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReworkProductionEntry

