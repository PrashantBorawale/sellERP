"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../NavBar/NavBar.js"
import SideNav from "../../SideNav/SideNav.js"
import { FaEye, FaPlus, FaTrash } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./ProductionEntryAss.css"
import { updateProductionEntryy } from '../../Service/Production.jsx';

import {
  getNextDPNo,
  submitProductionEntry,
  getProductionEntryById
} from "../../Service/Production.jsx"
import {
  fetchShifts,
  fetchContractors,
  fetchUnitMachines,
  fetchOperators,
  fetchSupervisors,
  fetchHelpers,
} from "../../Service/Production.jsx"

import { getReworkReasons, getRejectReasons, addReworkReason, addRejectReason } from "../../Service/Production.jsx"
import { Link, useParams, useNavigate } from "react-router-dom"

const ProductionEntryAss = () => {

  const { id } = useParams() // Get the ID from the URL
  const navigate = useNavigate() // For navigation after save
  const [isEditMode, setIsEditMode] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)

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

  const getCurrentDateTime = () => {
    const now = new Date()

    // Get current date in YYYY-MM-DD format
    const currentDate = now.toISOString().split("T")[0]

    // Get current time in HH:MM format
    const currentTime = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    })

    return { currentDate, currentTime }
  }

  // Set default date & time when the component loads
  useEffect(() => {
    const { currentDate, currentTime } = getCurrentDateTime()
    setFormData((prev) => ({
      ...prev,
      Date: currentDate,
      Time: currentTime,
    }))
  }, [])

  const [helpers, setHelpers] = useState([])
  const [filteredHelpers, setFilteredHelpers] = useState([])
  const [searchTermHelper, setSearchTermHelper] = useState("")
  const [dropdownVisibleHelper, setDropdownVisibleHelper] = useState(false)

  useEffect(() => {
    const loadHelpers = async () => {
      const data = await fetchHelpers()
      setHelpers(data)
      setFilteredHelpers(data)
    }
    loadHelpers()
  }, [])

  const handleSearchChangeHelper = (event) => {
    const value = event.target.value
    setSearchTermHelper(value)
    setDropdownVisibleHelper(true)

    const filtered = helpers.filter(
      (helper) =>
        helper.Name.toLowerCase().includes(value.toLowerCase()) ||
        (helper.Code && helper.Code.toLowerCase().includes(value.toLowerCase())),
    )
    setFilteredHelpers(filtered)
  }

  const handleSelectHelper = (helper) => {
    setSearchTermHelper(`${helper.Name} (${helper.Code})`)
    setDropdownVisibleHelper(false)
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
    setFormData((prev) => ({ ...prev, unit_machine: unit.WorkCenterCode }))
    setDropdownVisibleUnitMachine(false)
  }

  // Contractoer
  const [contractors, setContractors] = useState([])
  const [filteredContractors, setFilteredContractors] = useState([])
  const [searchTermContractor, setSearchTermContractor] = useState("")
  const [dropdownVisibleContractor, setDropdownVisibleContractor] = useState(false)
  useEffect(() => {
    const loadContractors = async () => {
      const data = await fetchContractors()
      setContractors(data)
      setFilteredContractors(data)
    }
    loadContractors()
  }, [])
  const handleSearchChangeContractor = (event) => {
    const value = event.target.value
    setSearchTermContractor(value)
    setDropdownVisibleContractor(true)

    const filtered = contractors.filter((contractor) =>
      contractor.ContractorName.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredContractors(filtered)
  }

  const handleSelectContractor = (contractor) => {
    setSearchTermContractor(contractor.ContractorName)
    setFormData((prev) => ({ ...prev, contractor: contractor.ContractorName }))
    setDropdownVisibleContractor(false)
  }

  // Operator
  const [operators, setOperators] = useState([])
  const [filteredOperators, setFilteredOperators] = useState([])
  const [searchTermOperator, setSearchTermOperator] = useState("")
  const [dropdownVisibleOperator, setDropdownVisibleOperator] = useState(false)

  useEffect(() => {
    const loadOperators = async () => {
      const data = await fetchOperators()
      setOperators(data)
      setFilteredOperators(data)
    }
    loadOperators()
  }, [])

  const handleSearchChangeOperator = (event) => {
    const value = event.target.value
    setSearchTermOperator(value)
    setDropdownVisibleOperator(true)

    const filtered = operators.filter(
      (operator) =>
        operator.Name.toLowerCase().includes(value.toLowerCase()) ||
        operator.Code.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredOperators(filtered)
  }

  const handleSelectOperator = (operator) => {
    setSearchTermOperator(`${operator.Name} (${operator.Code})`)
    setFormData((prev) => ({ ...prev, operator: operator.Code }))
    setDropdownVisibleOperator(false)
  }

  // supervissor

  const [supervisors, setSupervisors] = useState([])
  const [filteredSupervisors, setFilteredSupervisors] = useState([])
  const [searchTermSupervisor, setSearchTermSupervisor] = useState("")
  const [dropdownVisibleSupervisor, setDropdownVisibleSupervisor] = useState(false)
  useEffect(() => {
    const loadSupervisors = async () => {
      const data = await fetchSupervisors()
      setSupervisors(data)
      setFilteredSupervisors(data)
    }
    loadSupervisors()
  }, [])

  const handleSearchChangeSupervisor = (event) => {
    const value = event.target.value
    setSearchTermSupervisor(value)
    setDropdownVisibleSupervisor(true)

    const filtered = supervisors.filter(
      (supervisor) =>
        supervisor.Name.toLowerCase().includes(value.toLowerCase()) ||
        supervisor.Code.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredSupervisors(filtered)
  }

  const handleSelectSupervisor = (supervisor) => {
    setSearchTermSupervisor(`${supervisor.Name} (${supervisor.Code})`)
    setFormData((prev) => ({ ...prev, Supervisor: supervisor.Name }))
    setDropdownVisibleSupervisor(false)
  }

  // shift
  const [shifts, setShifts] = useState([])
  const [filteredShifts, setFilteredShifts] = useState([])
  const [searchTermShift, setSearchTermShift] = useState("")
  const [dropdownVisibleShift, setDropdownVisibleShift] = useState(false)

  useEffect(() => {
    const loadShifts = async () => {
      const data = await fetchShifts()
      setShifts(data)
      setFilteredShifts(data)
    }
    loadShifts()
  }, [])
  const handleSearchChangeShift = (event) => {
    const value = event.target.value
    setSearchTermShift(value)
    setDropdownVisibleShift(true)

    const filtered = shifts.filter(
      (shift) =>
        shift.Shift_Name.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_From.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_Till.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredShifts(filtered)
  }

  const handleSelectShift = (shift) => {
    setSearchTermShift(`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`)
    setDropdownVisibleShift(false)

    // Update formData to reflect shift details in the table
    setFormData((prev) => ({
      ...prev,
      shift: shift.Shift_Name,
      ShiftFrom: shift.Shift_From,
      ShiftTo: shift.Shift_Till,
      BreakFrom: shift.Break_Name || "", // Assuming Break_Name is break start time
      BreakTo: shift.Break_Till || "", // Assuming Break_Till is break end time
      BreakTotal: shift.Break_Time || "", // Break duration
      ShiftTime: shift.Total_Hours || "", // Total shift duration
      CycleTime: "",
      OpTime: "",
      LuTime: "",
      MoTime: "",
      TotalTime: "",
    }))
  }

  const [series, setSeries] = useState("")
  const [prodNo, setProdNo] = useState("")
  const [formData, setFormData] = useState({
    MachineIdleTimeAss: [
      {
        idle_reason: "",
        from_time: "",
        to_time: "",
        total_time: "",
        supervisor_operator: "",
        setting_part: "",
        remark: "",
      },
    ],
    ItemStockDetails: [
      {
        Item_Group: "",
        Alt_Item: "",
        Item_No: "",
        Item_Code: "",
        Desc: "",
        Bom_Qty: "",
        Reg_Qty: "",
        Stock: "",
      },
    ],
    ReworkReason: [
      {
        Description: "",
        Qty: "",
      },
    ],
    RejectReason: [
      {
        Description: "",
        Qty: "",
      },
    ],
    Plant: "",
    series: "",
    General: "",
    Prod_no: "",
    Date: "",
    Time: "",
    shift: "",
    contractor: "",
    Supervisor: "",
    operator: "",
    unit_machine: "",
    Helper: "",
    FGItem: "",
    operation: "",
    BOM: "",
    Heat_Lot_No: "",
    ProdQty: "",
    ProdTime: "",
    Rework_Qty: "",
    Reject_Qty: "",
    Change_Produced_Qty: "",
    ShiftFrom: "",
    ShiftTo: "",
    BreakFrom: "",
    BreakTo: "",
    BreakTotal: "",
    shiftTime: "",
    cycleTime: "",
    OpTime: "",
    LuTime: "",
    MoTime: "",
    TotalTime: "",
    ScrapEndPieceCode: "",
    ScrapEndPieceQty: "",
    ScrapEndPieceRemark: "",
    BomScrapCode: "",
    BomScrapWt: "",
    StdScracpQty: "",
    Remark: "",
    TargetQty: "",
    Prod: "",
    ProductionHours: "",
    IdleHours: "",
    ActualHours: "",
  })

  // Load existing data if in edit mode
  useEffect(() => {
    const fetchProductionEntry = async () => {
      if (id) {
        try {
          setIsEditMode(true)
          const data = await getProductionEntryById(id)

          // Set form data from API response
          setFormData(data)

          // Set other form-related state
          setSeries(data.series || "")
          setProdNo(data.Prod_no || "")

          // Set search terms for dropdowns
          if (data.contractor) {
            setSearchTermContractor(data.contractor)
          }

          if (data.Supervisor) {
            const supervisor = supervisors.find((s) => s.Name === data.Supervisor)
            if (supervisor) {
              setSearchTermSupervisor(`${supervisor.Name} (${supervisor.Code})`)
            } else {
              setSearchTermSupervisor(data.Supervisor)
            }
          }

          if (data.operator) {
            const operator = operators.find((o) => o.Code === data.operator)
            if (operator) {
              setSearchTermOperator(`${operator.Name} (${operator.Code})`)
            }
          }

          if (data.unit_machine) {
            const machine = unitMachines.find((m) => m.WorkCenterCode === data.unit_machine)
            if (machine) {
              setSearchTermUnitMachine(`${machine.WorkCenterName} (${machine.WorkCenterCode})`)
            }
          }

          if (data.shift) {
            const shift = shifts.find((s) => s.Shift_Name === data.shift)
            if (shift) {
              setSearchTermShift(`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`)
            } else {
              setSearchTermShift(data.shift)
            }
          }

          // Set rework and reject table data
          if (data.ReworkReason && data.ReworkReason.length > 0) {
            setReworkTableData(data.ReworkReason)
          }

          if (data.RejectReason && data.RejectReason.length > 0) {
            setRejectTableData(data.RejectReason)
          }
        } catch (error) {
          console.error("Error fetching production entry:", error)
          toast.error("Failed to load production entry data")
        }
      }
    }

    fetchProductionEntry()
  }, [id, operators, shifts, supervisors, unitMachines])

  // Temporary state for adding new entries
  const [newIdleTime, setNewIdleTime] = useState({
    idle_reason: "",
    from_time: "",
    to_time: "",
    total_time: "",
    supervisor_operator: "",
    setting_part: "",
    remark: "",
  })

  // Handle input changes for new entry
  const handleNewIdleTimeChange = (event) => {
    const { name, value } = event.target
    setNewIdleTime((prev) => ({ ...prev, [name]: value }))
  }

  // Add a new entry to the table
  const handleAddIdleTime = () => {
    if (!newIdleTime.idle_reason || !newIdleTime.from_time || !newIdleTime.to_time) {
      alert("Please fill required fields!")
      return
    }

    const updatedIdleTime = [...formData.MachineIdleTimeAss, newIdleTime]

    setFormData((prev) => ({
      ...prev,
      MachineIdleTimeAss: updatedIdleTime,
    }))

    // Reset newIdleTime input fields after adding
    setNewIdleTime({
      idle_reason: "",
      from_time: "",
      to_time: "",
      total_time: "",
      supervisor_operator: "",
      setting_part: "",
      remark: "",
    })
  }

  // Delete an entry
  const handleDeleteIdleTime = (index) => {
    const updatedIdleTime = [...formData.MachineIdleTimeAss]
    updatedIdleTime.splice(index, 1) // Remove item at index

    setFormData((prev) => ({
      ...prev,
      MachineIdleTimeAss: updatedIdleTime,
    }))
  }

  const handleTableInputChange = (event, index) => {
    const { name, value } = event.target

    setFormData((prevData) => {
      const updatedItems = [...prevData.ItemStockDetails] // Copy array
      updatedItems[index] = { ...updatedItems[index], [name]: value } // Update specific field
      return { ...prevData, ItemStockDetails: updatedItems }
    })
  }

  const shortYear = localStorage.getItem("Shortyear")
  const handleSeriesChange = async (event) => {
    const selectedSeries = event.target.value
    setSeries(selectedSeries)

    // Only get a new production number if we're not in edit mode
    if (selectedSeries === "DP" && !isEditMode) {
      try {
        const response = await getNextDPNo(shortYear) // Call API
        if (response && response.next_dp_no) {
          setProdNo(response.next_dp_no) // Extract and set the correct value
        } else {
          console.error("Invalid response structure:", response)
        }
      } catch (error) {
        console.error("Error fetching next DP number:", error)
      }
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission behavior

    const requestBody = {
      ...formData, // Preserve existing form data
      series,
      Prod_no: prodNo,
      ReworkReason: reworkTableData.length > 0 ? reworkTableData : [], // Ensure correct mapping
      RejectReason: rejectTableData.length > 0 ? rejectTableData : [], // Ensure correct mapping
    }

    try {
      let response

      if (isEditMode) {
        // Update existing entry
        response = await updateProductionEntryy(id, requestBody)
        toast.success("Production entry updated successfully!")
      } else {
        // Create new entry
        response = await submitProductionEntry(requestBody)
        toast.success("Production entry submitted successfully!")
      }

      console.log("Success:", response)

      // Navigate back to the list after successful save
      setTimeout(() => {
        navigate("/ProductionReport")
      }, 2000)
    } catch (error) {
      console.error("Error submitting data:", error)
      toast.error(isEditMode ? "Error updating production entry." : "Error submitting production entry.")
    }
  }

  const handleClear = () => {
    if (isEditMode) {
      // In edit mode, reload the original data
      const fetchProductionEntry = async () => {
        try {
          const data = await getProductionEntryById(id)
          setFormData(data)
          setSeries(data.series || "")
          setProdNo(data.Prod_no || "")
          // Reset other state as needed
        } catch (error) {
          console.error("Error reloading production entry:", error)
        }
      }
      fetchProductionEntry()
      toast.info("Form reset to original values.")
    } else {
      // In create mode, clear the form
      setFormData({
        MachineIdleTimeAss: [],
        ItemStockDetails: [],
        ReworkReason: [],
        RejectReason: [],
        Plant: "",
        series: "",
        General: "",
        Prod_no: "",
        Date: "",
        Time: "",
        shift: "",
        contractor: "",
        Supervisor: "",
        operator: "",
        unit_machine: "",
        Helper: "",
        FGItem: "",
        operation: "",
        BOM: "",
        Heat_Lot_No: "",
        ProdQty: "",
        ProdTime: "",
        Rework_Qty: "",
        Reject_Qty: "",
        Change_Produced_Qty: "",
        ShiftFrom: "",
        ShiftTo: "",
        BreakFrom: "",
        BreakTo: "",
        BreakTotal: "",
        shiftTime: "",
        cycleTime: "",
        OpTime: "",
        LuTime: "",
        MoTime: "",
        TotalTime: "",
        ScrapEndPieceCode: "",
        ScrapEndPieceQty: "",
        ScrapEndPieceRemark: "",
        BomScrapCode: "",
        BomScrapWt: "",
        StdScracpQty: "",
        Remark: "",
        TargetQty: "",
        Prod: "",
        ProductionHours: "",
        IdleHours: "",
        ActualHours: "",
      })

      setSeries("")
      setProdNo("")
      setSearchTermContractor("")
      setSearchTermOperator("")
      setSearchTermSupervisor("")
      setSearchTermUnitMachine("")
      setSearchTermShift("")
      setReworkTableData([])
      setRejectTableData([])

      toast.info("Form cleared.")
    }
  }

  const [reworkReasons, setReworkReasons] = useState([]) // Stores all rework reasons
  const [rejectReasons, setRejectReasons] = useState([]) // Stores all reject reasons

  const [newRework, setNewRework] = useState({ Description: "", ParentCode: "" })
  const [newReject, setNewReject] = useState({ Description: "", ParentCode: "" })
  const [reworkTableData, setReworkTableData] = useState([]) // Data to be displayed in table
  const [rejectTableData, setRejectTableData] = useState([]) // Data to be displayed in table
  const [showReworkCard, setShowReworkCard] = useState(false)
  const [showRejectCard, setShowRejectCard] = useState(false)

  const handleSelectRework = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === "Select") return

    const selected = reworkReasons.find((r) => r.Description === selectedValue)
    if (selected) {
      setReworkTableData((prev) => [...prev, { ...selected, Qty: "" }])
    }
  }

  const handleSelectReject = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === "Select") return

    const selected = rejectReasons.find((r) => r.Description === selectedValue)
    if (selected) {
      setRejectTableData((prev) => [...prev, { ...selected, Qty: "" }])
    }
  }

  // Handle rework quantity change
  const handleReworkQtyChange = (index, value) => {
    const updatedReworkData = [...reworkTableData]
    updatedReworkData[index].Qty = value
    setReworkTableData(updatedReworkData)
  }

  // Handle reject quantity change
  const handleRejectQtyChange = (index, value) => {
    const updatedRejectData = [...rejectTableData]
    updatedRejectData[index].Qty = value
    setRejectTableData(updatedRejectData)
  }

  // Fetch Rework & Reject Reasons
  useEffect(() => {
    const fetchReasons = async () => {
      setReworkReasons(await getReworkReasons())
      setRejectReasons(await getRejectReasons())
    }
    fetchReasons()
  }, [])

  // Add Rework Reason
  const handleAddRework = async () => {
    if (!newRework.Description || !newRework.ParentCode) {
      alert("Please fill in all fields!")
      return
    }
    await addReworkReason(newRework)
    setReworkReasons((prev) => [...prev, newRework]) // Update dropdown
    setNewRework({ Description: "", ParentCode: "" }) // Reset fields
  }

  // Add Reject Reason
  const handleAddReject = async () => {
    if (!newReject.Description || !newReject.ParentCode) {
      alert("Please fill in all fields!")
      return
    }
    await addRejectReason(newReject)
    setRejectReasons((prev) => [...prev, newReject]) // Update dropdown
    setNewReject({ Description: "", ParentCode: "" }) // Reset fields
  }

  const handleDeleteRework = (index) => {
    setReworkTableData(reworkTableData.filter((_, i) => i !== index))
  }

  const handleDeleteReject = (index) => {
    setRejectTableData(rejectTableData.filter((_, i) => i !== index))
  }

  return (
    <div className="AssemblyEntryMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="AssemblyEntry mt-5">
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="AssemblyEntry-header mb-4 text-start">
                      <div className="row align-items-center">
                        {/* Header */}
                        <div className="col-md-2">
                          <h5 className="header-title">
                            {isEditMode ? "Edit Assembly Prod Entry" : "Assembly Prod Entry"}
                          </h5>
                        </div>

                        {/* Plant Selection */}
                        <div className="col-md-1">
                          <label htmlFor="Plant">Plant</label>
                        </div>
                        <div className="col-md-2">
                          <select
                            id="Plant"
                            className="form-control"
                            name="Plant"
                            value={formData.Plant}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="sharp">Sharp</option>
                          </select>
                        </div>

                        {/* Series Selection */}
                        <div className="col-md-1">
                          <label htmlFor="series">Series</label>
                        </div>
                        <div className="col-md-2">
                          <select
                            id="series"
                            className="form-control"
                            onChange={handleSeriesChange}
                            value={series}
                            disabled={isEditMode} // Disable in edit mode
                          >
                            <option value="">Select</option>
                            <option value="DP">Daily Production</option>
                          </select>
                        </div>

                        {/* General Checkbox */}
                        <div className="col-md-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id="General"
                              className="form-check-input"
                              name="General"
                              checked={formData.General || false} // Fix: Checkbox uses checked
                              onChange={(e) => setFormData((prev) => ({ ...prev, General: e.target.checked }))}
                            />
                            <label className="form-check-label" htmlFor="General">
                              General
                            </label>
                          </div>
                        </div>

                        {/* Production List Button */}
                        <div className="col-md-2 text-end mt-2">
                          <Link to="/ProductionReport" type="button" className="btn btn-primary">
                            Production List
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="AssemblyEntry-main mt-5">
                      <div className="AssemblyEntry-tabs">
                        <ul className="nav nav-tabs" id="AssembleEntryTabs" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="production-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#production"
                              type="button"
                              role="tab"
                            >
                              A. Production Data
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="itemstock-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#itemstock"
                              type="button"
                              role="tab"
                            >
                              B. Item Stock Details
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content mt-4" id="productionEntryTabsContent">
                          <div className="tab-pane fade show active" id="production" role="tabpanel">
                            <div className="row text-start">
                              {/* First Column */}
                              <div className="col-md-4">
                                {/* Prod. No */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="prod-no">Prod. No :</label>
                                  </div>
                                  <div className="col-8">
                                    <input id="prod-no" className="form-control" value={prodNo} readOnly />
                                  </div>
                                </div>

                                {/* Contractor */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="contractor">Contractor :</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="contractor"
                                      className="form-control"
                                      placeholder="Search by contractor name"
                                      value={searchTermContractor}
                                      onChange={handleSearchChangeContractor}
                                      onFocus={() => setDropdownVisibleContractor(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleContractor && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredContractors.length > 0 ? (
                                          filteredContractors.map((contractor, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectContractor(contractor)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {contractor.ContractorName}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                {/* UNIT/Machine */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="unit-machine">UNIT/Machine :</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="unit-machine"
                                      className="form-control"
                                      placeholder="Search by name or code"
                                      value={searchTermUnitMachine}
                                      onChange={handleSearchChangeUnitMachine}
                                      onFocus={() => setDropdownVisibleUnitMachine(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleUnitMachine && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredUnitMachines.length > 0 ? (
                                          filteredUnitMachines.map((unit, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectUnitMachine(unit)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {`${unit.WorkCenterName} (${unit.WorkCenterCode})`}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                {/* Item */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="item">FG Item :</label>
                                  </div>
                                  <div className="col-8 d-flex align-items-center">
                                    <select
                                      className="form-control flex-grow-1"
                                      id="FGItem"
                                      type="text"
                                      value={formData.FGItem}
                                      onChange={handleInputChange}
                                      name="FGItem"
                                    >
                                      <option>ALL</option>
                                      <option value="one">One</option>
                                    </select>
                                    <button type="button" className="btn btn-outline-secondary ml-2">
                                      Select
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary ml-2">
                                      <FaEye />
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary ml-2">
                                      📋
                                    </button>
                                  </div>
                                </div>

                                {/* Operation */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="operation">Operation :</label>
                                  </div>
                                  <div className="col-8">
                                    <input
                                      id="operation"
                                      className="form-control"
                                      value={formData.operation}
                                      onChange={handleInputChange}
                                      name="operation"
                                    />
                                  </div>
                                </div>

                                {/* Prod. Qty */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="ProdQty">Prod. Qty :</label>
                                  </div>
                                  <div className="col-8">
                                    <input
                                      id="ProdQty"
                                      type="text"
                                      className="form-control"
                                      value={formData.ProdQty}
                                      onChange={handleInputChange}
                                      name="ProdQty"
                                    />
                                  </div>
                                </div>

                                {/* Prod. Qty */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Change_Produced_Qty">Change Produced Qty:</label>
                                  </div>
                                  <div className="col-8">
                                    <input
                                      id="Change_Produced_Qty"
                                      type="text"
                                      className="form-control"
                                      value={formData.Change_Produced_Qty}
                                      onChange={handleInputChange}
                                      name="Change_Produced_Qty"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Second Column */}
                              <div className="col-md-4">
                                {/* Date & Time */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Date">Date</label>
                                  </div>
                                  <div className="col-3">
                                    <input
                                      id="Date"
                                      type="Date"
                                      className="form-control"
                                      value={formData.Date}
                                      onChange={handleInputChange}
                                      name="Date"
                                    />
                                  </div>
                                  <div className="col-2 mt-2">
                                    <label htmlFor="Time">Time</label>
                                  </div>
                                  <div className="col-3">
                                    <input
                                      id="Time"
                                      type="Time"
                                      className="form-control"
                                      value={formData.Time}
                                      onChange={handleInputChange}
                                      name="Time"
                                    />
                                  </div>
                                </div>

                                {/* Supervisor */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Supervisor">Supervisor :</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="Supervisor"
                                      name="Supervisor"
                                      className="form-control"
                                      placeholder="Search by name or code"
                                      value={searchTermSupervisor}
                                      onChange={handleSearchChangeSupervisor}
                                      onFocus={() => setDropdownVisibleSupervisor(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleSupervisor && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredSupervisors.length > 0 ? (
                                          filteredSupervisors.map((supervisor, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectSupervisor(supervisor)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {`${supervisor.Name} (${supervisor.Code})`}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                {/* Machine Speed */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Helper">Helper:</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="Helper"
                                      name="Helper"
                                      className="form-control"
                                      placeholder="Search by name or code"
                                      value={searchTermHelper}
                                      onChange={handleSearchChangeHelper}
                                      onFocus={() => setDropdownVisibleHelper(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleHelper && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredHelpers.length > 0 ? (
                                          filteredHelpers.map((helper, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectHelper(helper)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {`${helper.Name} (${helper.Code})`}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                {/* Prod Time */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="ProdTime">Prod Time :</label>
                                  </div>
                                  <div className="col-8 d-flex">
                                    <input
                                      id="ProdTime"
                                      type="text"
                                      className="form-control"
                                      value={formData.ProdTime}
                                      onChange={handleInputChange}
                                      name="ProdTime"
                                    />
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="BOM">BOM :</label>
                                  </div>
                                  <div className="col-8 d-flex">
                                    <input
                                      id="BOM"
                                      type="text"
                                      className="form-control"
                                      value={formData.BOM}
                                      onChange={handleInputChange}
                                      name="BOM"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Third Column */}
                              <div className="col-md-4">
                                {/* Shift */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="shift">Shift :</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="shift"
                                      name="shift"
                                      className="form-control"
                                      placeholder="Search shift by name or time"
                                      value={searchTermShift}
                                      onChange={handleSearchChangeShift}
                                      onFocus={() => setDropdownVisibleShift(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleShift && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredShifts.length > 0 ? (
                                          filteredShifts.map((shift, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectShift(shift)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                {/* Operator */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="operator">Operator :</label>
                                  </div>
                                  <div className="col-8 position-relative">
                                    <input
                                      id="operator"
                                      name="operator"
                                      className="form-control"
                                      placeholder="Search by name or code"
                                      value={searchTermOperator}
                                      onChange={handleSearchChangeOperator}
                                      onFocus={() => setDropdownVisibleOperator(true)} // Show dropdown on focus
                                    />
                                    {dropdownVisibleOperator && (
                                      <ul
                                        className="dropdown-menu show mt-2"
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredOperators.length > 0 ? (
                                          filteredOperators.map((operator, index) => (
                                            <li
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() => handleSelectOperator(operator)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              {`${operator.Name} (${operator.Code})`}
                                            </li>
                                          ))
                                        ) : (
                                          <li className="dropdown-item">No results found</li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Heat_Lot_No">Heat/ Lot No:</label>
                                  </div>
                                  <div className="col-8">
                                    <select
                                      id="Heat_Lot_No"
                                      name="Heat_Lot_No"
                                      className="form-control"
                                      value={formData.Heat_Lot_No}
                                      onChange={handleInputChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="LOT123">LOT123</option>
                                      <option value="LOT456">LOT456</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Rework and Reject Qty */}
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <label htmlFor="Rework_Qty">Rework Qty :</label>
                                  </div>
                                  <div className="col-8 d-flex">
                                    <input
                                      id="Rework_Qty"
                                      type="text"
                                      className="form-control"
                                      name="Rework_Qty"
                                      value={formData.Rework_Qty}
                                      onChange={handleInputChange}
                                    />
                                    <label htmlFor="Reject_Qty" className="ml-2">
                                      Reject Qty :
                                    </label>
                                    <input
                                      id="Reject_Qty"
                                      type="text"
                                      className="form-control ml-2"
                                      name="Reject_Qty"
                                      value={formData.Reject_Qty}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="itemstock" role="tabpanel">
                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">Sr.</th>
                                    <th className="border border-gray-300 p-2">Item Group</th>
                                    <th className="border border-gray-300 p-2">Alt. Item</th>
                                    <th className="border border-gray-300 p-2">Item No</th>
                                    <th className="border border-gray-300 p-2">Item Code</th>
                                    <th className="border border-gray-300 p-2">Desc</th>
                                    <th className="border border-gray-300 p-2">Bom_Qty</th>
                                    <th className="border border-gray-300 p-2">Req Qty</th>
                                    <th className="border border-gray-300 p-2">Stock</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.ItemStockDetails.map((item, index) => (
                                    <tr key={index}>
                                      <td className="border border-gray-300 p-2">{index + 1}</td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Item_Group"
                                          value={item.Item_Group}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Alt_Item"
                                          value={item.Alt_Item}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Item_No"
                                          value={item.Item_No}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Item_Code"
                                          value={item.Item_Code}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Desc"
                                          value={item.Desc}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="Bom_Qty"
                                          value={item.Bom_Qty}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="Reg_Qty"
                                          value={item.Reg_Qty}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="Stock"
                                          value={item.Stock}
                                          onChange={(e) => handleTableInputChange(e, index)}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="AssemblyEntry-bottom mt-5">
                      <div className="AssemblyEntry-tabs">
                        <ul className="nav nav-tabs" id="productionEntryTabs1" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="shift-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#shifttt"
                              type="button"
                              role="tab"
                            >
                              Shift / Cycle Time
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="machine-idle-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#machineIdle"
                              type="button"
                              role="tab"
                            >
                              Machine Idle Time
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="rework-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#rework"
                              type="button"
                              role="tab"
                            >
                              Rework / Reject Reason
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="tool-die-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#toolDie"
                              type="button"
                              role="tab"
                            >
                              Tool and Die Details
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content mt-4" id="productionEntryTabsContent">
                          <div className="tab-pane fade show active" id="shifttt" role="tabpanel">
                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">Shift From</th>
                                    <th className="border border-gray-300 p-2">Shift To</th>
                                    <th className="border border-gray-300 p-2">Break From</th>
                                    <th className="border border-gray-300 p-2">Break To</th>
                                    <th className="border border-gray-300 p-2">Break Total</th>
                                    <th className="border border-gray-300 p-2">Shift Time</th>
                                    <th className="border border-gray-300 p-2">Cycle Time</th>
                                    <th className="border border-gray-300 p-2">OP Time</th>
                                    <th className="border border-gray-300 p-2">L/U Time</th>
                                    <th className="border border-gray-300 p-2">M/O Time</th>
                                    <th className="border border-gray-300 p-2">Total Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="ShiftFrom"
                                        value={formData.ShiftFrom}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="ShiftTo"
                                        value={formData.ShiftTo}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="BreakFrom"
                                        value={formData.BreakFrom}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="BreakTo"
                                        value={formData.BreakTo}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="BreakTotal"
                                        value={formData.BreakTotal}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="ShiftTime"
                                        value={formData.shiftTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="CycleTime"
                                        value={formData.cycleTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="OpTime"
                                        value={formData.OpTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="LuTime"
                                        value={formData.LuTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="MoTime"
                                        value={formData.MoTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="TotalTime"
                                        value={formData.TotalTime}
                                        onChange={handleInputChange}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="row">
                              <div className="table table-responsive">
                                <table>
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="border border-gray-300 p-2">Scrap / End Piece Code :</th>
                                      <th className="border border-gray-300 p-2">Scrap / End Piece Qty:</th>
                                      <th className="border border-gray-300 p-2">Scrap / End Piece Remark:</th>
                                      <th className="border border-gray-300 p-2">BOM Scrap Code:</th>
                                      <th className="border border-gray-300 p-2">BOM Scrap Wt:</th>
                                      <th className="border border-gray-300 p-2">Scrap /End Qty :</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ScrapEndPieceCode"
                                          value={formData.ScrapEndPieceCode}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ScrapEndPieceQty"
                                          value={formData.ScrapEndPieceQty}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ScrapEndPieceRemark"
                                          value={formData.ScrapEndPieceRemark}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="BomScrapCode"
                                          value={formData.BomScrapCode}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="BomScrapWt"
                                          value={formData.BomScrapWt}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="StdScracpQty"
                                          value={formData.StdScracpQty}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="machineIdle" role="tabpanel">
                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">Idle Reason:</th>
                                    <th className="border border-gray-300 p-2">From:</th>
                                    <th className="border border-gray-300 p-2">To:</th>
                                    <th className="border border-gray-300 p-2">Total Time:</th>
                                    <th className="border border-gray-300 p-2">Supervisor / Operator:</th>
                                    <th className="border border-gray-300 p-2">Setting Part:</th>
                                    <th className="border border-gray-300 p-2">Remark:</th>
                                    <th className="border border-gray-300 p-2">Add:</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="idle_reason"
                                        value={newIdleTime.idle_reason}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="time"
                                        className="form-control"
                                        name="from_time"
                                        value={newIdleTime.from_time}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="time"
                                        className="form-control"
                                        name="to_time"
                                        value={newIdleTime.to_time}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="total_time"
                                        value={newIdleTime.total_time}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="supervisor_operator"
                                        value={newIdleTime.supervisor_operator}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="setting_part"
                                        value={newIdleTime.setting_part}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="remark"
                                        value={newIdleTime.remark}
                                        onChange={handleNewIdleTimeChange}
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <button type="button" className="btn" onClick={handleAddIdleTime}>
                                        Add
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Display Table with Existing Entries */}
                            <div className="table table-bordered table-responsive mt-3">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">S No.</th>
                                    <th className="border border-gray-300 p-2">Reason:</th>
                                    <th className="border border-gray-300 p-2">From Time:</th>
                                    <th className="border border-gray-300 p-2">To Time:</th>
                                    <th className="border border-gray-300 p-2">Idle Time:</th>
                                    <th className="border border-gray-300 p-2">Operator Name:</th>
                                    <th className="border border-gray-300 p-2">Setting Part:</th>
                                    <th className="border border-gray-300 p-2">Remark:</th>
                                    <th className="border border-gray-300 p-2">Delete:</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.MachineIdleTimeAss.map((entry, index) => (
                                    <tr key={index}>
                                      <td className="border border-gray-300 p-2">{index + 1}</td>
                                      <td className="border border-gray-300 p-2">{entry.idle_reason}</td>
                                      <td className="border border-gray-300 p-2">{entry.from_time}</td>
                                      <td className="border border-gray-300 p-2">{entry.to_time}</td>
                                      <td className="border border-gray-300 p-2">{entry.total_time}</td>
                                      <td className="border border-gray-300 p-2">{entry.supervisor_operator}</td>
                                      <td className="border border-gray-300 p-2">{entry.setting_part}</td>
                                      <td className="border border-gray-300 p-2">{entry.remark}</td>
                                      <td className="border border-gray-300 p-2">
                                        <button
                                          type="button"
                                          className="btn"
                                          onClick={() => handleDeleteIdleTime(index)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="rework" role="tabpanel">
                            <div className="row">
                              {/* Left Side - Rework Section */}
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-1">
                                    <label>Rework</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-control" onChange={handleSelectRework}>
                                      <option>Select</option>
                                      {reworkReasons.map((reason, index) => (
                                        <option key={index} value={reason.Description}>
                                          {reason.Description}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="col-md-1">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => setShowReworkCard(true)}
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </div>

                                {/* Show Add Rework Card */}
                                {showReworkCard && (
                                  <div className="overlay">
                                    <div className="card-modal">
                                      <div className="card-body">
                                        <h5 className="card-title">Add Rework Reason</h5>
                                        <label>Description:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Description"
                                          value={newRework.Description}
                                          onChange={(e) => setNewRework({ ...newRework, Description: e.target.value })}
                                        />
                                        <label>Parent Code:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ParentCode"
                                          value={newRework.ParentCode}
                                          onChange={(e) => setNewRework({ ...newRework, ParentCode: e.target.value })}
                                        />
                                        <div className="text-end mt-3">
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={() => setShowReworkCard(false)}
                                          >
                                            Cancel
                                          </button>
                                          <button className="btn btn-success" onClick={handleAddRework}>
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Rework Table */}
                                <div className="table table-bordered table-responsive mt-3">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Sr no.</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {reworkTableData.map((item, index) => (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.Description}</td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={item.Qty || ""}
                                              onChange={(e) => handleReworkQtyChange(index, e.target.value)}
                                            />
                                          </td>
                                          <td>
                                            <button className="btn" onClick={() => handleDeleteRework(index)}>
                                              <FaTrash />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Right Side - Reject Section */}
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-1">
                                    <label>Reject</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-control" onChange={handleSelectReject}>
                                      <option>Select</option>
                                      {rejectReasons.map((reason, index) => (
                                        <option key={index} value={reason.Description}>
                                          {reason.Description}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="col-md-1">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => setShowRejectCard(true)}
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </div>

                                {/* Show Add Reject Card */}
                                {showRejectCard && (
                                  <div className="overlay">
                                    <div className="card-modal">
                                      <div className="card-body">
                                        <h5 className="card-title">Add Reject Reason</h5>
                                        <label>Description:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Description"
                                          value={newReject.Description}
                                          onChange={(e) => setNewReject({ ...newReject, Description: e.target.value })}
                                        />
                                        <label>Parent Code:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ParentCode"
                                          value={newReject.ParentCode}
                                          onChange={(e) => setNewReject({ ...newReject, ParentCode: e.target.value })}
                                        />
                                        <div className="text-end mt-3">
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={() => setShowRejectCard(false)}
                                          >
                                            Cancel
                                          </button>
                                          <button className="btn btn-success" onClick={handleAddReject}>
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Reject Table */}
                                <div className="table table-bordered table-responsive mt-3">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Sr no.</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {rejectTableData.map((item, index) => (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.Description}</td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={item.Qty || ""}
                                              onChange={(e) => handleRejectQtyChange(index, e.target.value)}
                                            />
                                          </td>
                                          <td>
                                            <button className="btn" onClick={() => handleDeleteReject(index)}>
                                              <FaTrash />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id="toolDie" role="tabpanel">
                            <div className="row">
                              <div className="col-md-1">
                                <label>Die Name</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text" className="form-control" />
                              </div>
                              <div className="col-md-1">
                                <button type="button" className="btn">
                                  Add
                                </button>
                              </div>
                            </div>

                            <div className="row">
                              <div className="table table-bordered table-responsive">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Sr no.</th>
                                      <th>Item Code</th>
                                      <th>Item Description</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Sr no.</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row text-start">
                        {/* Remark */}
                        <div className="col-md-1">
                          <label>Remark:</label>
                        </div>
                        <div className="col-md-1">
                          <textarea
                            className="form-control"
                            name="Remark"
                            value={formData.Remark}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Target Qty */}
                        <div className="col-md-1">
                          <label>Target Qty:</label>
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            name="TargetQty"
                            value={formData.TargetQty}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Production Type */}
                        <div className="col-md-1">
                          <label>Prod:</label>
                        </div>
                        <div className="col-md-1">
                          <select
                            name="Prod"
                            className="form-control"
                            value={formData.Prod}
                            onChange={handleInputChange}
                          >
                            <option value="Regular">Regular</option>
                            <option value="Special">Special</option>
                            <option value="Custom">Custom</option>
                          </select>
                        </div>

                        {/* Production Hours */}
                        <div className="col-md-1">
                          <label>Production Hours:</label>
                        </div>
                        <div className="col-md-1">
                          <input
                            type="time"
                            className="form-control"
                            name="ProductionHours"
                            value={formData.ProductionHours}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Idle Hours */}
                        <div className="col-md-1">
                          <label>Idle Hours:</label>
                        </div>
                        <div className="col-md-1">
                          <input
                            type="time"
                            className="form-control"
                            name="IdleHours"
                            value={formData.IdleHours}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Actual Hours */}
                        <div className="col-md-1">
                          <label>Actual Hours:</label>
                        </div>
                        <div className="col-md-1">
                          <input
                            type="time"
                            className="form-control"
                            name="ActualHours"
                            value={formData.ActualHours}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-3 justify-content-end">
                        <div className="text-end col-auto d-flex gap-2">
                          {/* Save Entry Button */}
                          <button type="submit" className="btn btn-primary">
                            {isEditMode ? "Update Entry" : "Save Entry"}
                          </button>

                          {/* Clear Button */}
                          <button type="button" className="btn btn-secondary" onClick={handleClear}>
                            {isEditMode ? "Reset" : "Clear"}
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

export default ProductionEntryAss
