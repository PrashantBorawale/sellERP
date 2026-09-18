
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../NavBar/NavBar.js"
import SideNav from "../../SideNav/SideNav.js"

import "./ProductionEntry.css"
import { FaPlus, FaTrash, FaEye, FaThList } from "react-icons/fa"
import Cached from "@mui/icons-material/Cached.js"
import axios from "axios"

import {
  fetchShifts,
  fetchContractors,
  fetchUnitMachines,
  fetchOperators,
  fetchSupervisors,
  createProductionEntry,
  getProductionNumber,
  fetchHelpers,
  getProductionId,
  updateProduction,
} from "../../Service/Production.jsx"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// ProductionEntry Component
const ProductionEntry = () => {
  // Side Navigation State
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

  // Function to get current date & time in the required format
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

  // Load existing production entry data when in edit mode
  useEffect(() => {
    const fetchProductionData = async () => {
      if (id) {
        try {
          setIsEditMode(true)
          const data = await getProductionId(id)
          console.log("Fetched production entry data:", data)

          // Set form data with the fetched data
          setFormData({
            ...formData,
            Series: data.Series || "DP",
            General: data.General || "General info about production",
            MachineDowntime: data.MachineDowntime || "No downtime",
            contractor: data.contractor || "",
            unit_machine: data.unit_machine || "",
            item: data.item || "",
            operation: data.operation || "",
            prod_qty: data.prod_qty || "",
            Date: data.Date || "",
            Time: data.Time || "",
            Supervisor: data.Supervisor || "",
            machine_speed: data.machine_speed || "",
            Helper: data.Helper || "",
            ParentOperation: data.ParentOperation || "",
            ProdTime: data.ProdTime || "",
            shift: data.shift || "",
            operator: data.operator || "",
            lot_no: data.lot_no || "",
            lot_heat_no: data.lot_heat_no || "",
            lot_qty: data.lot_qty || "",
            rework_qty: data.rework_qty || "",
            reject_qty: data.reject_qty || "",
            shift_from: data.shift_from || "",
            shift_to: data.shift_to || "",
            break_from: data.break_from || "",
            break_to: data.break_to || "",
            break_total: data.break_total || "",
            shift_time: data.shift_time || "",
            avail_time: data.avail_time || "",
            prod_time: data.prod_time || "",
            cycle_time: data.cycle_time || "",
            op_time: data.op_time || "",
            lu_time: data.lu_time || "",
            mo_time: data.mo_time || "",
            total_time: data.total_time || "",
            electricity_start_unit: data.electricity_start_unit || "",
            electricity_end_unit: data.electricity_end_unit || "",
            electricity_total_unit: data.electricity_total_unit || "",
            scrap_end_piece_qty: data.scrap_end_piece_qty || "",
            scrap_qty: data.scrap_qty || "",
            scrap_end_remark: data.scrap_end_remark || "",
            mill_name: data.mill_name || "",
            remark: data.remark || "",
            target_qty: data.target_qty || "",
            production_hours: data.production_hours || "",
            idle_hours: data.idle_hours || "",
            actual_hours: data.actual_hours || "",
            Rework_Description: data.Rework_Description || "",
            ReworkQty: data.ReworkQty || "",
            Reject_Description: data.Reject_Description || "",
            Reject_Quantity: data.Reject_Quantity || "",
            ItemCode: data.ItemCode || "",
            ItemDescription: data.ItemDescription || "",
          })

          // Set other form fields
          setProdNo(data.Prod_no || "")
          setSeries(data.Series || "DP")

          if (data.contractor) {
            // If contractor data contains both name and code, use it directly
            // Otherwise, try to reconstruct from separate fields
            if (data.contractor.includes("(") && data.contractor.includes(")")) {
              setSearchTermContractor(data.contractor)
            } else if (data.Contractor) {
              setSearchTermContractor(`${data.contractor} (${data.Contractor})`)
            } else {
              setSearchTermContractor(data.contractor)
            }
          }

          if (data.unit_machine) setSearchTermUnitMachine(data.unit_machine)

          if (data.operator) {
            // If operator data contains both name and code, use it directly
            // Otherwise, try to reconstruct from separate fields
            if (data.operator.includes("(") && data.operator.includes(")")) {
              setSearchTermOperator(data.operator)
            } else if (data.Operator) {
              setSearchTermOperator(`${data.operator} (${data.Operator})`)
            } else {
              setSearchTermOperator(data.operator)
            }
          }

          // Set idle time records if available
          if (data.MachineIdleTime_Detail_Enter && Array.isArray(data.MachineIdleTime_Detail_Enter)) {
            setIdleTimeRecords(data.MachineIdleTime_Detail_Enter)
          }
        } catch (error) {
          console.error("Error fetching production entry:", error)
          toast.error("Failed to load production entry data")
        }
      }
    }

    fetchProductionData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const [series, setSeries] = useState("")
  const [prodNo, setProdNo] = useState("")

  // Retrieve the shortYear from local storage
  const shortYear = localStorage.getItem("Shortyear")

  // useEffect hook to call the API whenever the selected series changes to "DP"
  useEffect(() => {
    if (series === "DP" && shortYear) {
      console.log("🔄 Fetching production number...")
      getProductionNumber(series, shortYear)
        .then((data) => {
          console.log("🆕 Received Production Number:", data.prod_no)
          setProdNo(data.prod_no)
        })
        .catch((error) => {
          console.error("❌ Error fetching production number:", error)
        })
    } else {
      console.warn("⚠️ Series is not DP or shortYear is missing. Clearing prodNo.")
      setProdNo("")
    }
  }, [series, shortYear])

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
    setSearchTermContractor(`${contractor.ContractorName}${contractor.Code ? ` (${contractor.Code})` : ""}`)
    setFormData((prev) => ({
      ...prev,
      contractor: contractor.ContractorName,
      Contractor: contractor.Code,
    }))
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
    console.log("[v0] Operators data:", operators)
    const filtered = operators.filter((operator) => {
      const operatorName = operator.OperatorName || operator.Name || operator.name || ""
      return operatorName.toLowerCase().includes(value.toLowerCase())
    })
    setFilteredOperators(filtered)
  }

  const handleSelectOperator = (operator) => {
    console.log("[v0] Selected operator:", operator)
    const operatorName = operator.OperatorName || operator.Name || operator.name || ""
    const operatorCode = operator.Code || operator.code || ""

    setSearchTermOperator(`${operatorName}${operatorCode ? ` (${operatorCode})` : ""}`)
    setFormData((prev) => ({
      ...prev,
      operator: operatorName,
      Operator: operatorCode,
    }))
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
  const [, setSelectedShift] = useState(null)

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


  // ✅  FIXED CODE

  const handleSelectShift = (shift) => {
    setSearchTermShift(`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`)
    setSelectedShift(shift)
    setDropdownVisibleShift(false)

    //  setFormData 
    setFormData((prev) => ({
      ...prev, // <--  IMPORTANT:  Item, Operation, etc. save 


      shift: shift.Shift_Name, // already setFormData 
      shift_from: shift.Shift_From,
      shift_to: shift.Shift_Till,
      break_from: shift.Break_Name,
      break_to: shift.Break_Till,
      break_total: shift.Break_Time,
      shift_time: shift.Total_Hours,

      //  fields  "" (Empty) 
      prod_qty: "",
      avail_time: "",
      cycle_time: "",
      op_time: "",
      lu_time: "",
      mo_time: "",
      total_time: "",
    }))
  }


  const [formData, setFormData] = useState({
    Series: "DP",
    General: "General info about production",
    MachineDowntime: "No downtime",
    // Prod_no: "DP 252600002",
    contractor: "",
    unit_machine: "",
    item: "",
    // operation: "",
    prod_qty: "",
    Date: "",
    Time: "",
    Supervisor: "",
    machine_speed: "",
    Helper: "",
    ParentOperation: "",
    ProdTime: "",
    shift: "",
    operator: "",
    lot_no: "",
    lot_heat_no: "",   // Only HeatNo
    lot_qty: "",
    rework_qty: "",
    reject_qty: "",
    shift_from: "",
    shift_to: "",
    break_from: "",
    break_to: "",
    break_total: "",
    shift_time: "",
    avail_time: "",
    prod_time: "",
    cycle_time: "",
    op_time: "",
    lu_time: "",
    mo_time: "",
    total_time: "",
    electricity_start_unit: "",
    electricity_end_unit: "",
    electricity_total_unit: "",
    scrap_end_piece_qty: "",
    scrap_qty: "",
    scrap_end_remark: "",
    mill_name: "",
    remark: "",
    target_qty: "",
    production_hours: "",
    idle_hours: "",
    actual_hours: "",
    Rework_Description: "",
    ReworkQty: "",
    Reject_Description: "",
    Reject_Quantity: "",
    ItemCode: "",
    ItemDescription: "",
    MachineIdleTime_Detail_Enter: [],

    part_: "",
    part_code: "",
    OPNo: "",
    PartCode: "",

    BomPartCode: "", // 🆕 For Selected Raw Material
    // lot_no: "",
  })

  const [idleTimeForm, setIdleTimeForm] = useState({
    idle_reason: "",
    from_time: "",
    to_time: "",
    total_time: "",
    supervisor_operator: "",
    setting_part: "",
    remark: "",
  })

  const [idleTimeRecords, setIdleTimeRecords] = useState([])

  // Auto-calculate total time
  useEffect(() => {
    if (idleTimeForm.from_time && idleTimeForm.to_time) {
      const from = new Date(`1970-01-01T${idleTimeForm.from_time}`)
      const to = new Date(`1970-01-01T${idleTimeForm.to_time}`)
      const diff = (to - from) / 1000 / 60 / 60
      setIdleTimeForm((prev) => ({
        ...prev,
        total_time: diff.toFixed(2) + " hrs",
      }))
    }
  }, [idleTimeForm.from_time, idleTimeForm.to_time])

  const handleAddIdleTime = () => {
    if (!idleTimeForm.idle_reason || !idleTimeForm.from_time || !idleTimeForm.to_time) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIdleTimeRecords((prev) => [...prev, idleTimeForm])

    // Reset form fields after adding a record
    setIdleTimeForm({
      idle_reason: "",
      from_time: "",
      to_time: "",
      total_time: "",
      supervisor_operator: "",
      setting_part: "",
      remark: "",
    })
  }

  const handleDeleteIdleTime = (index) => {
    setIdleTimeRecords(idleTimeRecords.filter((_, i) => i !== index))
  }

  useEffect(() => {
    console.log("Updated Idle Time Records:", idleTimeRecords)
  }, [idleTimeRecords])

  const fetchNextProductionNumber = useCallback(async () => {
    if (!series || !shortYear) {
      console.warn("⚠️ Missing series or shortYear, skipping next production number fetch.")
      return
    }

    console.log("🔄 Fetching next production number for series:", series, "and year:", shortYear)

    try {
      const nextProdData = await getProductionNumber(series, shortYear)
      console.log("🆕 Next Production Number Response:", nextProdData)

      if (nextProdData?.prod_no) {
        setProdNo(nextProdData.prod_no)
        console.log("✅ Updated Production Number:", nextProdData.prod_no)
      } else {
        toast.error("⚠️ Failed to fetch the next production number.")
      }
    } catch (error) {
      console.error("❌ Error fetching next production number:", error)
      toast.error("❌ Failed to get the next production number.")
    }
  }, [series, shortYear]) // ✅ Dependencies added correctly

  useEffect(() => {
    if (series === "DP" && shortYear) {
      fetchNextProductionNumber()
    }
  }, [series, shortYear, fetchNextProductionNumber]) // ✅ No ESLint warnings

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("🚀 Form submission started...")

    const postData = {
      ...formData,
      Prod_no: prodNo || "",
      contractor: searchTermContractor || formData.contractor || "N/A", // Save the full display format
      unit_machine: formData.unit_machine || "N/A",
      item: formData.item || "N/A", // Save the full display format
      ItemCode: formData.ItemCode || "N/A",
      ItemDescription: formData.ItemDescription || "N/A",
      operation: formData.Operation || "N/A", // ✅ Fixed: using Operation (capital O) as set in operation select
      prod_qty: formData.prod_qty || "0",
      Date: formData.Date || new Date().toISOString().split("T")[0],
      Time: formData.Time || new Date().toLocaleTimeString("en-GB"),
      Supervisor: formData.Supervisor || "N/A",
      shift: formData.shift || "Morning",
      operator: searchTermOperator || formData.operator || "N/A", // Save the full display format
      lot_no: formData.lot_no || "N/A",
      lot_heat_no: formData.lot_heat_no || "N/A", // "FG001"
      lot_qty: formData.lot_qty || "0",
      rework_qty: formData.rework_qty || "0",
      raw_material: formData.BomPartCode || "",
      MachineIdleTime_Detail_Enter: idleTimeRecords,
    }

    console.log("📤 Sending Data:", postData)

    try {
      let response

      if (isEditMode) {
        // Update existing production entry
        response = await updateProduction(id, postData)
        console.log("✅ Update Response:", response)

        if (!response || response.error) {
          throw new Error(`Error: ${response.error || "Unknown error occurred"}`)
        }

        toast.success("✅ Production entry updated successfully!")
        // Navigate back to the list after successful update
        navigate("/ProductionEntryList")
      } else {
        // Create new production entry
        response = await createProductionEntry(postData)
        console.log("✅ API Response:", response)

        if (!response || response.error) {
          throw new Error(`Error: ${response.error || "Unknown error occurred"}`)
        }

        toast.success("✅ Production entry submitted successfully!")

        // Clear form fields for new entry
        setFormData({
          Prod_no: "",
          contractor: "",
          unit_machine: "",
          item: "",
          operation: "",
          prod_qty: "",
          Date: getCurrentDateTime().currentDate,
          Time: getCurrentDateTime().currentTime,
          Supervisor: "",
          machine_speed: "",
          Helper: "",
          ParentOperation: "",
          shift: "",
          operator: "",
          lot_no: "",
          lot_heat_no: "",   // Only HeatNo
          lot_qty: "",
          rework_qty: "",
          reject_qty: "",
          MachineIdleTime_Detail_Enter: [],
        })

        // Fetch next production number after clearing the form
        await fetchNextProductionNumber()
      }
    } catch (error) {
      console.error("❌ Submission Error:", error)
      toast.error(`❌ Submission failed: ${error.message}`)
    }
  }

  // 🖊️ Input change handler

  // 🖊️ Input change handler (Multiplication Validation )
  const handleChange = (e) => {
    const { name, value } = e.target

    // Validation  'prod_qty' field
    if (name === "prod_qty") {
      const enteredQty = parseFloat(value)

      if (isNaN(enteredQty) || value === "") {
        setFormData({ ...formData, [name]: value })
        return
      }

      // ---  VALIDATION ---

      // CASE 1: Multiplication  check
      if (bomQtyPerPiece !== null && selectedLotMaxQty !== null) {
        // Total consumption = (10 pieces) * (2.5 kg/piece) = 25 kg
        const totalConsumption = enteredQty * bomQtyPerPiece

        if (totalConsumption > selectedLotMaxQty) {
          toast.error(
            `Total Consumption (${totalConsumption.toFixed(
              2,
            )}) available Shopfloor Qty (${selectedLotMaxQty}) High on Data !.`,
          )
          return
        }
      }

      else if (bomQtyPerPiece === null && selectedLotMaxQty !== null) {

        if (enteredQty > selectedLotMaxQty) {
          toast.error(
            `Qty (${enteredQty}) available Shopfloor Qty (${selectedLotMaxQty}) Not Accepted !`,
          )
          return
        }
      }
    }

    setFormData({ ...formData, [name]: value })
  }

  // ITEM AND OPERATION FIELD IN BOM DATA

  const [searchTerm, setSearchTerm] = useState("")
  const [itemResults, setItemResults] = useState([])
  const [operationList, setOperationList] = useState([])
  const [bomOptions, setBomOptions] = useState([]) // 🆕 For Raw Material

  const dropdownRef = useRef(null)

  // 🔍 Search item
  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (!value.trim()) {
      setItemResults([])
      return
    }

    try {
      const res = await axios.get(`https://sellerp-backend.onrender.com/Production/api/item-dropdown/?q=${value}`)
      setItemResults(res.data)
    } catch (error) {
      console.error("Error fetching item list", error)
    }
  }

  // ✅ On selecting item
  const handleSelectItem = async (item) => {
    const partCode = item.Part_Code
    const fullItemDisplay = `${item.part_no} | ${item.Part_Code} | ${item.Name_Description}`
    setSearchTerm(fullItemDisplay)
    setItemResults([])
    setBomQtyPerPiece(null) // <---  LINE ADD  (Reset)

    setFormData((prev) => ({
      ...prev,
      Item: item.Part_Code, // ✅ Save backend Part_Code (used for lookups)
      item: fullItemDisplay, // Save full display format
      part_no: item.part_no,
      part_code: item.Part_Code,
      Name_Description: item.Name_Description,
      ItemCode: item.Part_Code,
      ItemDescription: item.Name_Description,
    }))

    // input use
    setSearchTerm(`${item.part_no} | ${item.Part_Code} | ${item.Name_Description}`)

    // dropdown close
    setItemResults([])

    try {
      const operationRes = await axios.get(
        `https://sellerp-backend.onrender.com/Production/api/bom-by-partcode/?part_code=${partCode}`,
      )
      setOperationList(operationRes.data || [])


      // Fetch Raw Material List
      const rmRes = await axios.get(`https://sellerp-backend.onrender.com/All_Masters/FG-items/?part_code=${partCode}`)
      setBomOptions(rmRes.data || [])
    } catch (err) {
      console.error("Error fetching BOM operation Or RM Items", err)
    }
  }



  // const [selectedOPNo, setSelectedOPNo] = useState(null)

  // ✅ When user selects an operation (UPDATED LOGIC for Parent Op)
  const handleOperationChange = (e) => {
    const selectedValue = e.target.value // User select: "OPNo|PartCode"
    const parts = selectedValue.split('|')
    const currentOPNo = parts[0]
    const currentPartCode = parts[1]

    // 🆕 Update the selected OP number state
    setSelectedOPNo(currentOPNo)

    const selectedIndex = operationList.findIndex(
      (op) => `${op.OPNo}|${op.PartCode}` === selectedValue,
    )

    let parentOperationDisplay = ""

    // Reset lot info and BOM Qty when operation changes
    setBomQtyPerPiece(null)
    setSelectedLotMaxQty(null)

    if (selectedIndex === 0) {
      // --- LOGIC: First Operation (OP 10) ---
      const firstOperation = operationList[0]

      // Parent Operation field shows: Scrap Qty | BOM Qty
      parentOperationDisplay = `ScrapQty: ${firstOperation.ScrapQty || firstOperation.ScracpQty || "N/A"} | BOMQty: ${firstOperation.QtyKg || "N/A"}`

      const bomQty = parseFloat(firstOperation.QtyKg)
      if (!isNaN(bomQty) && bomQty > 0) {
        setBomQtyPerPiece(bomQty)
      }

    } else if (selectedIndex > 0) {
      // --- LOGIC: Subsequent Operations (OP 20, 30, etc.) ---

      // Find the data of the operation JUST BEFORE the current one in the list
      const parentOperation = operationList[selectedIndex - 1]

      // Parent Operation field shows: Part Code | Parent OP No. | Parent Part Code
      parentOperationDisplay = `Part : ${formData.part_code} | OP : ${parentOperation.OPNo} | ${parentOperation.PartCode}`
    }

    setFormData((prev) => ({
      ...prev,
      Operation: selectedValue,
      OPNo: currentOPNo,
      PartCode: currentPartCode,
      ParentOperation: parentOperationDisplay, // Yeh check karega ki pichla OP kya hai
      lot_no: "",
      lot_heat_no: "",
      lot_qty: "",
      BomPartCode: "",
    }))
  }

  // ✅ When user selects an operation
  // const handleOperationSelect = (e) => {
  //   const selectedIndex = e.target.selectedIndex;
  //   const selectedOption = operationList[selectedIndex - 1]; // -1 because first option is "Select Operation"

  //   if (selectedOption) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       part_code: formData.part_code,
  //       OPNo: selectedOption.OPNo,
  //       PartCode: selectedOption.PartCode,
  //     }));
  //   }
  // };

  // ✅ When user selects Raw Material
  // const handleRMChange = (e) => {
  //   const selectedBomPartCode = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     BomPartCode: selectedBomPartCode,
  //   }));
  // };


  // const [optionsHtml, setOptionsHtml] = useState("")
  // useEffect(() => {
  //   axios
  //     .get("https://sellerp-backend.onrender.com/Production/api/grn/heat-numbers/")
  //     .then((res) => {
  //       console.log("API Response:", res.data)

  //       // 🔑 Sirf "heat_numbers" array uthana hai
  //       const data = Array.isArray(res.data.heat_numbers) ? res.data.heat_numbers : []

  //       // Har string ko alag <option> banao
  //       let html = ""
  //       for (let i = 0; i < data.length; i++) {
  //         html += `<option value="${data[i]}">${data[i]}</option>`
  //       }

  //       setOptionsHtml(html)
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching heat numbers:", err)
  //     })
  // }, [])

  const [lotNumbers, setLotNumbers] = useState([])

  // New state variable to hold the selected operation number (e.g., 10, 20, 30)
  const [selectedOPNo, setSelectedOPNo] = useState(null) // <--- ADD THIS LINE


  // 👇  LINE FIX  - operationList  dependency  add 
  useEffect(() => {
    const fetchLotNumbers = async () => {
      // Cleanup
      setLotNumbers([])
      setSelectedLotMaxQty(null)
      setFormData((prev) => ({
        ...prev,
        lot_no: "",
        lot_heat_no: "",
        lot_qty: "",
      }))

      if (!formData.Item || !selectedOPNo) {
        console.warn("⚠️ Item and Operation not select ")
        return
      }

      let apiUrl = ''
      const itemCode = formData.Item
      const currentOpNum = parseInt(selectedOPNo, 10)

      console.log("🔍 Current OP Number:", currentOpNum)
      console.log("📋 Operation List:", operationList)

      const currentIndex = operationList.findIndex(
        (op) => parseInt(op.OPNo, 10) === currentOpNum
      )

      console.log("📍 Current Index:", currentIndex)

      // 🎯 Determine previous operation number
      let previousOPNo = null

      if (currentOpNum === 10 || currentIndex === 0) {
        // First Operation - Raw Material
        if (!formData.BomPartCode) {
          console.warn("⚠️ Raw Material not selected for OP 10 yet")
          return
        }
        console.log("✅ First Operation - Raw Material API")
        apiUrl = `https://sellerp-backend.onrender.com/Production/item-heatqty/?item=${formData.BomPartCode}`
      } else if (currentIndex > 0) {
        // Subsequent Operations - Get previous OP number
        const previousOperation = operationList[currentIndex - 1]
        previousOPNo = previousOperation.OPNo

        console.log("🔙 Previous OP:", previousOPNo)

        if (previousOPNo) {
          apiUrl = `https://sellerp-backend.onrender.com/Store/heat-summary/?part_no=${formData.part_no}`
          console.log("✅ Subsequent Operation API:", apiUrl)
        } else {
          console.warn(`⚠️ Previous OP nahi mila`)
          return
        }
      } else {
        console.warn("⚠️ Invalid index:", currentIndex)
        return
      }

      // API Call
      try {
        console.log("🌐 Calling API:", apiUrl)
        const response = await axios.get(apiUrl)

        console.log("📦 Full API Response:", response.data)

        let lotsData = []

        // 🔥 HANDLE DIFFERENT API FORMATS
        if (currentOpNum === 10 || currentIndex === 0) {
          // ✅ First Operation Response Formats
          if (response.data.heat_qty_list && Array.isArray(response.data.heat_qty_list)) {
            lotsData = response.data.heat_qty_list
          } else if (Array.isArray(response.data)) {
            lotsData = response.data
          } else if (response.data && typeof response.data === 'object') {
            lotsData = Object.entries(response.data).map(([heatNo, qty]) => ({
              HeatNo: heatNo,
              Qty: qty
            }))
          }
        } else {
          // ✅ Subsequent Operations Response Formats
          if (response.data.heat_qty_list && Array.isArray(response.data.heat_qty_list)) {
            lotsData = response.data.heat_qty_list
          } else if (Array.isArray(response.data)) {
            lotsData = response.data
          } else if (response.data && typeof response.data === 'object') {
            // Find key starting with previousOPNo (e.g., "10|PFFGFG1001" or "10")
            const matchingKey = Object.keys(response.data).find(key => {
              const keyOpNum = parseInt(key.split('|')[0], 10)
              return keyOpNum === parseInt(previousOPNo, 10)
            })

            if (matchingKey && typeof response.data[matchingKey] === 'object') {
              const heatData = response.data[matchingKey]
              lotsData = Object.entries(heatData).map(([heatNo, qty]) => ({
                HeatNo: heatNo,
                Qty: qty
              }))
            } else {
              // Fallback: check first object entry or parse direct object mapping { "SIR1": 7080 }
              const firstValue = Object.values(response.data)[0]
              if (firstValue && typeof firstValue === 'object' && !Array.isArray(firstValue)) {
                lotsData = Object.entries(firstValue).map(([heatNo, qty]) => ({
                  HeatNo: heatNo,
                  Qty: qty
                }))
              } else {
                lotsData = Object.entries(response.data).map(([heatNo, qty]) => ({
                  HeatNo: heatNo,
                  Qty: qty
                }))
              }
            }
          }
        }

        console.log("✅ Final Processed Lots:", lotsData)
        console.log("✅ Lots Count:", lotsData.length)

        if (lotsData.length === 0) {
          console.warn("⚠️ Koi lot numbers nahi mile!")
          toast.warning("No lot numbers available for this operation")
        } else {
          toast.success(`✅ ${lotsData.length} lot(s) loaded successfully!`)
        }

        setLotNumbers(lotsData)

      } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message)
        toast.error(`Failed to fetch lot numbers: ${error.message}`)
      }
    }

    fetchLotNumbers()
  }, [formData.Item, selectedOPNo, operationList, formData.BomPartCode])


  // ... (New Second useState hooks)
  const [selectedLotMaxQty, setSelectedLotMaxQty] = useState(null) // <--- NEW ADD 
  const [bomQtyPerPiece, setBomQtyPerPiece] = useState(null) // <--- New LINE ADD

  // New handler Only Lot No dropdown 
  const handleLotNoChange = (e) => {
    const { value } = e.target // Value "HeatNo|Qty" format   (Ex. "H123|500")

    if (value) {
      const parts = value.split('|')
      const heatNo = parts[0]
      const maxQty = parseFloat(parts[1]) // String "500" 

      setSelectedLotMaxQty(maxQty) // Max Qty  state  save 

      // FormData update 
      setFormData((prev) => ({
        ...prev,
        lot_no: value, // All "H123|500" save 
        lot_heat_no: heatNo, // Only HeatNo
        lot_qty: maxQty, // Only Qty
        prod_qty: "", // Lot change  than  Prod. Qty reset
      }))
    } else {
      //  user "Select" choose  
      setSelectedLotMaxQty(null) // Max Qty reset 
      setFormData((prev) => ({
        ...prev,
        lot_no: "",
        lot_heat_no: "",
        lot_qty: "",
        prod_qty: "",
      }))
    }
  }




  // WIP Table state
  const [showWIPTable, setShowWIPTable] = useState(false)
  const [wipData, setWipData] = useState([])
  const [wipLoading, setWipLoading] = useState(false)

  const handleViewWIP = async () => {
    if (showWIPTable) {
      setShowWIPTable(false)
      return
    }
    const partNo = formData.part_no
    if (!partNo) {
      toast.warning("Please select an item first to view WIP data.")
      return
    }
    try {
      setWipLoading(true)
      const res = await axios.get(`https://sellerp-backend.onrender.com/Store/api/WIPstockreport/?q=${partNo}`)
      setWipData(res.data.data || [])
      setShowWIPTable(true)
    } catch (err) {
      console.error("WIP fetch error:", err)
      toast.error("Failed to fetch WIP data.")
    } finally {
      setWipLoading(false)
    }
  }

  return (
    // ProductionEntry Component UI
    <div className="ProductionEntryMaster">
      <ToastContainer />
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ProductionEntry">
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="ProductionEntry-header mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-4">
                          <h5 className="header-title mb-0">Production Entry</h5>
                          
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-medium text-secondary" style={{fontSize: "0.85rem"}}>Series:</span>
                            <select
                              value={series}
                              id="series"
                              name="series"
                              onChange={(e) => setSeries(e.target.value)}
                              className="form-select form-select-sm"
                              style={{ width: "160px", padding: "4px 30px 4px 12px" }}
                            >
                              <option value="">Select</option>
                              <option value="DP">Daily Production</option>
                            </select>
                          </div>
                          
                          <div className="d-flex align-items-center gap-3 ms-2">
                            <label className="d-flex align-items-center gap-2 mb-0" style={{ cursor: "pointer", fontSize: "0.85rem", fontWeight: "500" }}>
                              <input
                                type="checkbox"
                                id="general"
                                name="General"
                                value={formData.General}
                                onChange={handleChange}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                              General
                            </label>
                            
                            <label className="d-flex align-items-center gap-2 mb-0" style={{ cursor: "pointer", fontSize: "0.85rem", fontWeight: "500" }}>
                              <input
                                type="checkbox"
                                id="downtime"
                                name="MachineDowntime"
                                value={formData.MachineDowntime}
                                onChange={handleChange}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                              Downtime
                            </label>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <Link to="/ProductionEntryList" type="button" className="vndrbtn d-inline-flex align-items-center gap-2">
                            <FaThList /> Production List
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="ProductionEntry-main mt-2">
                      <div className="row text-start">
                        {/* First Column */}
                        <div className="col-md-3">
                          {/* Prod. No */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="prod-no">Prod. No :</label>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <input
                                id="prod_no"
                                placeholder="232400001"
                                className="form-control"
                                value={prodNo}
                                readOnly
                              />
                              <button type="button" className="btn btn-outline-secondary ml-2">
                                <Cached />
                              </button>
                            </div>
                          </div>

                          {/* Contractor */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="contractor">Contractor:</label>
                            </div>
                            <div className="col-8 position-relative">
                              <input
                                id="contractor"
                                name="Contractor"
                                className="form-control"
                                placeholder="Search contractor by name or code"
                                value={searchTermContractor}
                                onChange={handleSearchChangeContractor}
                                onFocus={() => setDropdownVisibleContractor(true)}
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
                                        onClick={() => {
                                          handleSelectContractor(contractor)
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {`${contractor.ContractorName}${contractor.Code ? ` (${contractor.Code})` : ""}`}
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
                            <div className="col-5">
                              <label htmlFor="unit-machine">UNIT/Machine :</label>
                            </div>
                            <div className="col-7 position-relative">
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

                          {/* 🔍 Item Search */}
                          <div className="row mt-4 form-group position-relative" ref={dropdownRef}>
                            <div className="col-md-4">
                              <label> Item :</label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by part code or name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                              />
                              {itemResults.length > 0 && (
                                <ul
                                  className="list-group position-absolute w-100 z-index-10"
                                  style={{ maxHeight: "200px", overflowY: "auto" }}
                                >
                                  {itemResults.map((item, index) => (
                                    <li
                                      key={index}
                                      className="list-group-item list-group-item-action"
                                      onClick={() => {
                                        handleSelectItem(item)
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {item.part_no} | {item.Part_Code} | {item.Name_Description}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* ⚙️ Operation Field */}
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Operation:</label>
                            </div>
                            <div className="col-md-8">
                              <select
                                id="operation"
                                name="operation"
                                className="form-control"
                                value={formData.Operation || ""}
                                onChange={handleOperationChange}
                              >
                                <option value="">Select Operation</option>
                                {operationList.map((op, idx) => (
                                  <option key={idx} value={`${op.OPNo}|${op.PartCode}`}>
                                    Part : {formData.part_code} | OP : {op.OPNo} | {op.PartCode}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Prod. Qty */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="prod_qty">Prod. Qty :</label>
                            </div>
                            <div className="col-8">
                              <input
                                id="prod-qty"
                                name="prod_qty"
                                type="text"
                                className="form-control"
                                value={formData.prod_qty}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Second Column */}
                        <div className="col-md-3">
                          {/* Date & Time */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="date">Date & Time :</label>
                            </div>
                            <div className="col-md-4">
                              <input
                                id="date"
                                type="date"
                                name="Date"
                                className="form-control"
                                value={formData.Date}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                id="time"
                                type="time"
                                name="Time"
                                className="form-control"
                                value={formData.Time}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Supervisor */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="supervisor">Supervisor:</label>
                            </div>
                            <div className="col-8 position-relative">
                              <input
                                id="supervisor"
                                name="Supervisor"
                                className="form-control"
                                placeholder="Search by name or code"
                                value={searchTermSupervisor}
                                onChange={handleSearchChangeSupervisor}
                                onFocus={() => setDropdownVisibleSupervisor(true)}
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
                                        onClick={() => {
                                          handleSelectSupervisor(supervisor)
                                          setFormData((prev) => ({
                                            ...prev,
                                            Supervisor: supervisor.Code, // ✅ formData me save
                                          }))
                                          setSearchTermSupervisor(`${supervisor.Name} (${supervisor.Code})`)
                                          setDropdownVisibleSupervisor(false)
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {`${supervisor.Name}${supervisor.Code ? ` (${supervisor.Code})` : ""}`}
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
                              <label htmlFor="machine-speed">Machine Speed:</label>
                            </div>
                            <div className="col-8">
                              <select
                                id="machine-speed"
                                name="machine_speed"
                                className="form-control"
                                value={formData.machine_speed}
                                onChange={handleChange}
                              >
                                <option value="Not Applicable">Not Applicable</option>
                                <option value="High Speed">High Speed</option>
                                <option value="Medium Speed">Medium Speed</option>
                                <option value="Low Speed">Low Speed</option>
                              </select>
                            </div>
                          </div>

                          {/* Raw Material */}

                          {/*  CHANGES */}
                          {(formData.Operation && formData.Operation.startsWith("10|")) && (
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <label>Raw Material :</label>
                              </div>
                              <div className="col-md-8">
                                <select
                                  className="form-control"
                                  name="BomPartCode"
                                  value={formData.BomPartCode}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      BomPartCode: e.target.value, // ✅ 'e.targe.value' se 'e.target.value' bhi fix kar diya hai
                                    }))
                                  }
                                >
                                  <option value="">Select Raw Material</option>
                                  {bomOptions.map((item) => (
                                    <option key={item.id} value={item.part_no}>
                                      {item.part_no} | {item.Part_Code} | {item.Name_Description}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                          {/*  CHANGES  👆 */}

                          {/* Parent Operation */}
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label style={{ fontSize: "12px" }}>Parent Operation:</label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="parent_operation"
                                name="ParentOperation"
                                className="form-control"
                                placeholder="Value Automatic Field"
                                value={formData.ParentOperation || ""}
                                readOnly
                              />
                            </div>
                          </div>

                          {/* Prod Time */}
                          <div className="row mt-4">
                            <div className="col-4">
                              <label htmlFor="prod-text">Prod Time :</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="time"
                                className="form-control"
                                name="ProdTime"
                                value={formData.ProdTime}
                                onChange={handleChange}
                              />

                            </div>
                          </div>
                        </div>

                        {/* Third Column */}
                        <div className="col-md-3">
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
                                    filteredOperators.map((operator, index) => {
                                      const operatorName =
                                        operator.OperatorName || operator.Name || operator.name || "Unknown"
                                      const operatorCode = operator.Code || operator.code || ""
                                      return (
                                        <li
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() => {
                                            handleSelectOperator(operator)
                                          }}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {`${operatorName}${operatorCode ? ` (${operatorCode})` : ""}`}
                                        </li>
                                      )
                                    })
                                  ) : (
                                    <li className="dropdown-item">No results found</li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Helper */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="helper">Helper :</label>
                            </div>
                            <div className="col-8 position-relative">
                              <input
                                id="helper"
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

                          {/* Rework and Reject Qty */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="rework-qty">Rework Qty :</label>
                            </div>
                            <div className="col-8 d-flex">
                              <input
                                id="rework-qty"
                                name="rework_qty"
                                type="text"
                                className="form-control"
                                value={formData.rework_qty}
                                onChange={handleChange}
                              />
                              <label htmlFor="reject-qty" className="ml-2">
                                Reject Qty :
                              </label>
                              <input
                                id="reject-qty"
                                name="reject_qty"
                                type="text"
                                className="form-control ml-2"
                                value={formData.reject_qty}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Lot No */}
                          {/* Lot No Dropdown */}
                          <div className="row mb-2">
                            <div className="col-4">
                              <label htmlFor="lot-no">Lot No :</label>
                            </div>
                            <div className="col-8">
                              <select
                                name="lot_no"
                                className="form-control"
                                value={formData.lot_no}
                                onChange={handleLotNoChange}
                                disabled={!formData.Item || lotNumbers.length === 0}
                              >
                                <option value="">
                                  {lotNumbers.length === 0 ? "No lots available" : "Select Lot"}
                                </option>
                                {lotNumbers.map((item, index) => {
                                  // 🔥 Flexible field names handle 
                                  const heatNo = item.HeatNo || item.heat_no || item.HeatNumber || `LOT-${index + 1}`
                                  const qty = item.Qty || item.qty || item.Quantity || item.quantity || 0

                                  return (
                                    <option key={index} value={`${heatNo}|${qty}`}>
                                      Heat: {heatNo} | ShopFloor: {qty}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Fourth Column - View WIP & Item Wise Stock View */}
                        <div className="col-md-3 d-flex flex-column align-items-center pt-2">
                          <button
                            type="button"
                            className="view-wip-link mb-2"
                            style={{ background: "none", border: "none", padding: 0 }}
                            onClick={handleViewWIP}
                          >
                            View WIP
                          </button>

                          {/* WIP Toggle Table - below View WIP */}
                          {showWIPTable && (
                            <div style={{
                              width: "100%",
                              maxHeight: "200px",
                              overflowY: "auto",
                              overflowX: "auto",
                              border: "1px solid #dee2e6",
                              borderRadius: "4px",
                              backgroundColor: "#fff"
                            }}>
                              {wipLoading ? (
                                <p className="text-center text-muted" style={{ fontSize: "11px", padding: "10px" }}>Loading...</p>
                              ) : (
                                <table className="table table-bordered table-sm mb-0" style={{ fontSize: "11px", tableLayout: "fixed", width: "100%" }}>
                                  <thead style={{ backgroundColor: "#007bff", color: "#fff", position: "sticky", top: 0 }}>
                                    <tr className="text-center">
                                      <th style={{ width: "75px" }}>OP No</th>
                                      <th style={{ width: "100px" }}>Part Code</th>
                                      <th style={{ width: "70px" }}>Prod Qty</th>
                                      <th style={{ width: "80px" }}>Pending QC</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-center">
                                    {wipData.length > 0 ? (
                                      wipData.map((row, idx) => (
                                        <tr key={idx}>
                                          <td style={{ padding: "2px" }}>{row.OPNo}</td>
                                          <td style={{ fontSize: "10px", textAlign: "left", padding: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.PartCode}</td>
                                          <td style={{ padding: "2px" }}>{row.prod_qty}</td>
                                          <td style={{ padding: "2px" }}>{row.pending_qc}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={4} className="text-center text-muted">No data</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}

                        </div>

                      </div>

                    </div>

                    <div className="ProductionEntry-main mt-2">
                      <div className="ProductionEntry-second">
                        <ul className="nav nav-tabs" id="productionEntryTabs" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="shift-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#shifttabs"
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

                          <div className="tab-pane fade show active" id="shifttabs" role="tabpanel">
                            <div className="row">
                              <div className="table table-bordered table-responsive">
                                <table>
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="border border-gray-300 p-2">Shift From</th>
                                      <th className="border border-gray-300 p-2">To</th>

                                      <th className="border border-gray-300 p-2">Break From</th>
                                      <th className="border border-gray-300 p-2">To</th>

                                      <th className="border border-gray-300 p-2">Break Total</th>
                                      <th className="border border-gray-300 p-2">Shift Time</th>
                                      <th className="border border-gray-300 p-2">Prod Time</th>
                                      <th className="border border-gray-300 p-2">Avl. Time</th>
                                      <th className="border border-gray-300 p-2">Cycle Time</th>
                                      <th className="border border-gray-300 p-2">OP Time</th>
                                      <th className="border border-gray-300 p-2">L/U Time</th>
                                      <th className="border border-gray-300 p-2">MO Time</th>
                                      <th className="border border-gray-300 p-2">Total Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="shift_from"
                                          className="form-control"
                                          value={formData.shift_from}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="shift_to"
                                          className="form-control"
                                          value={formData.shift_to}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="break_from"
                                          className="form-control"
                                          value={formData.break_from}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="break_to"
                                          className="form-control"
                                          value={formData.break_to}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="break_total"
                                          className="form-control"
                                          value={formData.break_total}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="shift_time"
                                          className="form-control"
                                          value={formData.shift_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="prod_time"
                                          className="form-control"
                                          value={formData.prod_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="avail_time"
                                          className="form-control"
                                          value={formData.avail_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="cycle_time"
                                          className="form-control"
                                          value={formData.cycle_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="op_time"
                                          className="form-control"
                                          value={formData.op_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="lu_time"
                                          className="form-control"
                                          value={formData.lu_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="mo_time"
                                          className="form-control"
                                          value={formData.mo_time}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          name="total_time"
                                          className="form-control"
                                          value={formData.total_time}
                                          onChange={handleChange}
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
                                        <th className="border border-gray-300 p-2">Electricity</th>
                                        <th className="border border-gray-300 p-2">Start Unit:</th>
                                        <th className="border border-gray-300 p-2">Edit Unit:</th>
                                        <th className="border border-gray-300 p-2">Total Unit:</th>
                                        <th className="border border-gray-300 p-2">Scrap / End Piece Code:0</th>
                                        <th className="border border-gray-300 p-2">Scrap /End Qty :</th>
                                        <th className="border border-gray-300 p-2">Scrap /End Remark :</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="border border-gray-300 p-2">
                                          <label>Consumption:</label>
                                          <br />
                                          <label>Mill name:</label>
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="electricity_start_unit"
                                            className="form-control"
                                            value={formData.electricity_start_unit}
                                            onChange={handleChange}
                                          />
                                          <br />
                                          <input
                                            type="text"
                                            name="mill_name"
                                            className="form-control"
                                            value={formData.mill_name}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="electricity_end_unit"
                                            className="form-control"
                                            value={formData.electricity_end_unit}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="electricity_total_unit"
                                            className="form-control"
                                            value={formData.electricity_total_unit}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="scrap_end_piece_qty"
                                            className="form-control"
                                            value={formData.scrap_end_piece_qty}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="scrap_qty"
                                            className="form-control"
                                            value={formData.scrap_qty}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="scrap_end_remark"
                                            className="form-control"
                                            value={formData.scrap_end_remark}
                                            onChange={handleChange}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
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
                                    <th className="border border-gray-300 p-2">Supervisor /Operators:</th>
                                    <th className="border border-gray-300 p-2">Setting Part:</th>
                                    <th className="border border-gray-300 p-2">Remark:</th>
                                    <th className="border border-gray-300 p-2">Add:</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-300 p-2">
                                      <div className="flex">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="idle_reason"
                                          value={idleTimeForm.idle_reason}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              idle_reason: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <div className="flex">
                                        <input
                                          type="time"
                                          className="form-control"
                                          name="from_time"
                                          value={idleTimeForm.from_time}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              from_time: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="time"
                                        className="form-control"
                                        name="to_time"
                                        value={idleTimeForm.to_time}
                                        onChange={(e) =>
                                          setIdleTimeForm({
                                            ...idleTimeForm,
                                            to_time: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="time"
                                        className="form-control"
                                        name="total_time"
                                        value={idleTimeForm.total_time}
                                        onChange={(e) =>
                                          setIdleTimeForm({
                                            ...idleTimeForm,
                                            total_time: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="supervisor_operator"
                                        value={idleTimeForm.supervisor_operator}
                                        onChange={(e) =>
                                          setIdleTimeForm({
                                            ...idleTimeForm,
                                            supervisor_operator: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="setting_part"
                                        value={idleTimeForm.setting_part}
                                        onChange={(e) =>
                                          setIdleTimeForm({
                                            ...idleTimeForm,
                                            setting_part: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="remark"
                                        value={idleTimeForm.remark}
                                        onChange={(e) =>
                                          setIdleTimeForm({
                                            ...idleTimeForm,
                                            remark: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <button type="button" className="vndrbtn" onClick={handleAddIdleTime}>
                                        Add
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">S no.:</th>
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
                                  {idleTimeRecords.map((record, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{record.idle_reason}</td>
                                      <td>{record.from_time}</td>
                                      <td>{record.to_time}</td>
                                      <td>{record.total_time}</td>
                                      <td>{record.supervisor_operator}</td>
                                      <td>{record.setting_part}</td>
                                      <td>{record.remark}</td>
                                      <td>
                                        <button className="btn btn-danger" onClick={() => handleDeleteIdleTime(index)}>
                                          Delete
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
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-2">
                                    <label>Rework</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select style={{ marginTop: "2px" }}>
                                      <option>Select</option>
                                    </select>
                                  </div>
                                  {/* <div className="col-md-1">
                                          <input
                                            type="text"
                                            className="form-control"
                                          />
                                        </div> */}
                                  {/* <div className="col-md-1">
                                          <button type="button" className="btn">
                                            Add
                                          </button>
                                        </div> */}
                                  <div className="col-md-1">
                                    <button type="button" className="btn">
                                      <FaPlus />
                                    </button>
                                  </div>
                                  <div className="col-md-1">
                                    <button type="button" className="btn">
                                      <Cached />
                                    </button>
                                  </div>
                                </div>

                                <div className="row mt-5">
                                  <div className="table table-bordered table-responsive">
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
                                        <tr>
                                          <td>
                                            <input className="form-control" type="text" />
                                          </td>
                                          <td>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="Rework_Description"
                                              value={formData.Rework_Description}
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="ReworkQty"
                                              value={formData.ReworkQty}
                                              onChange={handleChange}
                                            />
                                          </td>

                                          <td>
                                            <FaTrash />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-2">
                                    <label>Reject</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select style={{ marginTop: "2px" }}>
                                      <option>Select</option>
                                    </select>
                                  </div>
                                  {/* <div className="col-md-1">
                                          <input
                                            type="text"
                                            className="form-control"
                                          />
                                        </div>
                                        <div className="col-md-1">
                                          <button type="button" className="btn">
                                            Add
                                          </button>
                                        </div> */}
                                  <div className="col-md-1">
                                    <button type="button" className="btn">
                                      <FaPlus />
                                    </button>
                                  </div>
                                  <div className="col-md-1">
                                    <button type="button" className="btn">
                                      <Cached />
                                    </button>
                                  </div>
                                </div>

                                <div className="row mt-5">
                                  <div className="table table-bordered table-responsive">
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
                                        <tr>
                                          <td>
                                            <input className="form-control" type="text" />
                                          </td>
                                          <td>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="Reject_Description"
                                              value={formData.Reject_Description}
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="Reject_Quantity"
                                              value={formData.Reject_Quantity}
                                              onChange={handleChange}
                                            />
                                          </td>

                                          <td>
                                            <FaTrash />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div className="tab-pane fade" id="toolDie" role="tabpanel">
                            <div className="Container-fluid">
                              <div className="row">
                                <div className="col-md-1">
                                  <label>Die Name</label>
                                </div>
                                <div className="col-md-2">
                                  <input type="text" className="form-control" style={{ marginTop: "-2px" }} />
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="vndrbtn">
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="row mt-4">
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
                                      <td>
                                        <input className="form-control" type="text" />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="ItemCode"
                                          value={formData.ItemCode}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="ItemDescription"
                                          value={formData.ItemDescription}
                                          onChange={handleChange}
                                        />
                                      </td>

                                      <td>
                                        <FaTrash />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="productionbottom mt-2">
                      <div className="row align-items-center text-start g-2 mt-2">
                        {/* Remark */}
                        <div className="col-md-2">
                          <label>Remark:</label>
                          <textarea
                            className="form-control"
                            name="remark"
                            value={formData.remark}
                            onChange={handleChange}
                          ></textarea>
                        </div>

                        {/* Target Qty */}
                        <div className="col-md-2">
                          <label>Target Qty:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="target_qty"
                            value={formData.target_qty}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Prod */}
                        <div className="col-md-2">
                          <label>Prod:</label>
                          <select className="form-control" name="prod_type">
                            <option>Regular</option>
                          </select>
                        </div>

                        {/* Production Hours */}
                        <div className="col-md-2">
                          <label>Production Hours:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="production_hours"
                            value={formData.production_hours}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Idle Hours */}
                        <div className="col-md-2">
                          <label>Idle Hours:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="idle_hours"
                            value={formData.idle_hours}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Actual Hours */}
                        <div className="col-md-2">
                          <label>Actual Hours:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="actual_hours"
                            value={formData.actual_hours}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Save Button */}
                        <div className="col-md-12 d-flex justify-content-end mt-3">
                          <button type="submit" className="vndrbtn">
                            Save Entry
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

export default ProductionEntry

