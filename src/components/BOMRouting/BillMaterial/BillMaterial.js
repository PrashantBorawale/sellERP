"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import NavBar from "../../../NavBar/NavBar"
import SideNav from "../../../SideNav/SideNav"

import "./BillMaterial.css"
import VisibleStandard from "./VisibleStandard.jsx"
// Purchase Card
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa"
import { saveDepartment, getDepartments, updateDepartment, deleteDepartmentCard } from "../../../Service/Api.jsx"

import VisibleBomitem from "./VisibleBomitem.jsx"
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import BOMoperation from "../BOMoperation/BOMoperation.jsx"
import {
  fetchScrapData,
  searchItems,
  saveBomItem,
  deleteBomItem,
  fetchPartCodeDropdownData,
} from "../../../Service/Api.jsx"

import {
  fetchoperationData,
  fetchCombinedPartNo,
  getBomItemsForSelectedItem,
  saveBomItemForSelectedItem,
  updateBomItemForSelectedItem,
  deleteBomItemForSelectedItem,
} from "../../../Service/Api.jsx"

import { getRMItems, getComItems } from "../../../Service/Api.jsx"
import * as XLSX from "xlsx"

const BillMaterial = () => {
  const handleExportBOMHistory = () => {
    const table = document.getElementById("bomHistoryTable");
    if (table) {
      const tbody = table.querySelector("tbody");
      const hasData = tbody && tbody.querySelectorAll("tr").length > 0;
      
      if (hasData) {
        const wb = XLSX.utils.table_to_book(table, { sheet: "BOM History" });
        XLSX.writeFile(wb, "BOM_History.xlsx");
      } else {
        toast.error("No data found to export!");
      }
    } else {
      toast.error("No data found to export!");
    }
  };
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("BOM")

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen)
  }

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open")
    } else {
      document.body.classList.remove("side-nav-open")
    }
  }, [sideNavOpen])

  //   card
  const [cardVisibleProduction, setCardVisibleProduction] = useState(false)

  const toggleCardProduction = () => {
    setCardVisibleProduction(!cardVisibleProduction)
  }

  const [cardVisibleOperation, setCardVisibleOperation] = useState(false)

  const toggleCardOperation = () => {
    setCardVisibleOperation(!cardVisibleOperation)
  }

  const [cardVisibleStandard, setCardVisibleStandard] = useState(false)

  const toggleCardStandard = () => {
    setCardVisibleStandard(!cardVisibleStandard)
  }

  const [cardVisibleBomitem, setCardVisibleBomitem] = useState(false)

  const toggleCardBomitem = () => {
    setCardVisibleBomitem(!cardVisibleBomitem)
  }

  const [cardVisiblePlus, setCardVisiblePlus] = useState(false)

  const toggleCardPlus = () => {
    setCardVisiblePlus(!cardVisiblePlus)
  }

  // Purchase Card
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    Department_Name: "",
    Short_Name: "",
    Std_Otp: "",
    Operation_Name: "",
    Prefix: "",
    Mhr_Rate: "",
    BomQc: "",
    ProductionDept: "",
    MachineType: "",
    Production_Cycle_Time: "",
    Stop_Mc_Booking: "",
    Per_Day_Prod_Qty: "",
    Bom_Item_Group: "",
    Item: "",
    Qty: "",
  })
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.Department_Name) {
      newErrors.Department_Name = "This field is required."
    }
    if (!formData.Short_Name) {
      newErrors.Short_Name = "This field is required."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      if (isEditing) {
        await updateDepartment(editId, formData)
        toast.success("Department updated successfully!")
      } else {
        await saveDepartment(formData)
        toast.success("Department saved successfully!")
      }
      fetchDepartments() // Refresh data
      setFormData({ Department_Name: "", Short_Name: "" })
      setIsEditing(false)
      setEditId(null)
    } catch (error) {
      toast.error("Failed to save department.")
      console.error("Error saving department:", error)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments()
      setData(response)
    } catch (error) {
      toast.error("Failed to fetch departments.")
      console.error("Error fetching departments:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDepartmentCard(id)
      toast.success("Department deleted successfully!")
      fetchDepartments() // Refresh data
    } catch (error) {
      toast.error("Failed to delete department.")
      console.error("Error deleting department:", error)
    }
  }

  const handleEdit = (item) => {
    setFormData({
      Department_Name: item.Department_Name,
      Short_Name: item.Short_Name,
    })
    setIsEditing(true)
    setEditId(item.id)
  }

  //BOM

  // Main BOM form state with additional fields
  const [formData1, setFormData1] = useState({
    OPNo: "",
    PartCode: "",
    BOMPartType: [],
    BomPartCode: "",
    QtyKg: "",
    ScrapCode: "",
    ScracpQty: "",
    QC: false,
    ProdQty: "",
    AssProd: "",
    WipWt: "",
    WipRate: "",
    PieceRate: "",
    wire_rod: "",
    bar: "",
    OPRate: "",
    Operation: "",
    BomPartDesc: "",
  })

  const [tableData, setTableData] = useState([])
  const [allTableData, setAllTableData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [scrapOptions, setScrapOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null)

  // BOM Item Part Master state
  const [cardBomPlus, setCardBomPlus] = useState(false)
  const [operationList, setOperationList] = useState([])
  const [selectedOperation, setSelectedOperation] = useState("")
  const [combinedPartCode, setCombinedPartCode] = useState("")
  const [editId2, setEditId2] = useState(null)
  const [bomList, setBomList] = useState([])

  // Tool Management Modal states
  const [cardToolModal, setCardToolModal] = useState(false)
  const [toolFormData, setToolFormData] = useState({
    toolItem: "",
    toolDieLife: "",
    resharpeningLife: "",
    totalLife: "",
  })
  const [toolsList, setToolsList] = useState([])
  const [toolDropdownItems, setToolDropdownItems] = useState([])
  const [activeBOMItem, setActiveBOMItem] = useState(null)

  // Part Code dropdown state
  const [partCodeDropdownData, setPartCodeDropdownData] = useState([])
  const [bomOptions, setBomOptions] = useState([])
  const partCodeDropdownRef = useRef(null)

  // Memoize loadBomItems to fix useEffect dependency warning
  const loadBomItems = useCallback(async () => {
    if (!selectedItem) return

    try {
      const res = await getBomItemsForSelectedItem(selectedItem.id)
      setBomList(res || [])
      console.log("Loaded BOM items:", res)
    } catch (error) {
      console.error("Error loading BOM items:", error)
      setBomList([])
    }
  }, [selectedItem])

  useEffect(() => {
    // Load initial data
    const loadInitialData = async () => {
      const scrapData = await fetchScrapData()
      setScrapOptions(scrapData)

      const opsData = await fetchoperationData()
      setOperationList(opsData)

      try {
        const toolRes = await fetch("https://sellerp-backend.onrender.com/All_Masters/item-master-filtered/")
        const toolData = await toolRes.json()
        if (toolData.status && Array.isArray(toolData.data)) {
          setToolDropdownItems(toolData.data)
        }
      } catch (err) {
        console.error("Error fetching tool items:", err)
      }
    }

    loadInitialData()

    // Close dropdown when clicking outside
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

  // Load Part Code dropdown data when selectedItem changes
  useEffect(() => {
    const loadPartCodeDropdown = async () => {
      if (selectedItem && selectedItem.id) {
        try {
          const dropdownData = await fetchPartCodeDropdownData(selectedItem.id)
          setPartCodeDropdownData(dropdownData)
        } catch (error) {
          console.error("Error loading part code dropdown:", error)
          setPartCodeDropdownData([])
        }
      } else {
        setPartCodeDropdownData([])
      }
    }

    loadPartCodeDropdown()
  }, [selectedItem])

  // Load BOM items when card opens - fixed dependency
  useEffect(() => {
    if (cardBomPlus && selectedItem) {
      loadBomItems()
    }
  }, [cardBomPlus, selectedItem, loadBomItems])

  // Update combined part code when item or operation changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedItem && selectedOperation) {
        const combined = await fetchCombinedPartNo(selectedItem.part_no, selectedOperation)
        setCombinedPartCode(combined || "")
      } else {
        setCombinedPartCode("")
      }
    }
    fetchData()
  }, [selectedItem, selectedOperation])

  const handleInputChange1 = (e) => {
    const { name, value, checked } = e.target

    if (name === "BOMPartType") {
      if (checked) {
        setFormData1((prev) => ({
          ...prev,
          BOMPartType: [...prev.BOMPartType, value],
        }))
      } else {
        setFormData1((prev) => ({
          ...prev,
          BOMPartType: prev.BOMPartType.filter((item) => item !== value),
        }))
      }
    } else {
      setFormData1((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "BomPartCode") {
      console.log("[v0] BomPartCode selected:", value)
    }

    if (type === "checkbox") {
      setFormData1((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData1((prev) => ({
        ...prev,
        [name]: value,
      }))

      if (name === "PartCode" && value) {
        const selectedPartData = partCodeDropdownData.find((item) => item.PartCode === value)
        if (selectedPartData && selectedPartData.Operation) {
          setFormData1((prev) => ({
            ...prev,
            Operation: selectedPartData.Operation,
          }))
        }
      }
    }
  }

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      try {
        setIsLoading(true)
        const data = await searchItems(value)
        setSearchResults(data)
        setShowDropdown(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Error searching items:", error)
        setSearchResults([])
        setShowDropdown(false)
        setIsLoading(false)
      }
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }

  const handleSearchSelect = (item) => {
    setSelectedItem(item)
    setSearchTerm(`${item.part_no} | ${item.Part_Code} | ${item.Name_Description}`)
    setShowDropdown(false)

    if (item.bom_items && item.bom_items.length > 0) {
      setTableData(item.bom_items)
      setAllTableData(item.bom_items)
    } else {
      setTableData([])
      setAllTableData([])
    }
  }

  // Tool Management Modal Handlers
  const handleOpenToolModal = (item) => {
    setActiveBOMItem(item)
    setCardToolModal(true)
    setToolsList(item.tools || [])
    setToolFormData({
      toolItem: "",
      toolDieLife: "",
      resharpeningLife: "",
      totalLife: "",
    })
  }

  const handleSaveTool = async () => {
    if (!toolFormData.toolItem) {
      toast.error("Please select a Tool/Item.")
      return
    }

    try {
      const calculatedTotalLife = toolFormData.totalLife || String(Number(toolFormData.toolDieLife || 0) * Number(toolFormData.resharpeningLife || 0));

      const payload = {
        tool_item: toolFormData.toolItem || null,
        tool_life: toolFormData.toolDieLife || null,
        no_of_resharpening: toolFormData.resharpeningLife || null,
        total: calculatedTotalLife,
        bom_item: activeBOMItem ? activeBOMItem.id : null
      };

      const token = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/tools/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to save tool to API");
      }
    } catch (error) {
      console.error("Error saving tool:", error);
      toast.error("Failed to save tool. Please try again.");
      return;
    }

    const newTool = {
      ...toolFormData,
      id: Date.now()
    }
    const updatedTools = [...toolsList, newTool]
    setToolsList(updatedTools)
    if (activeBOMItem) {
      activeBOMItem.tools = updatedTools
    }
    toast.success("Tool added successfully!")
    setToolFormData({
      toolItem: "",
      toolDieLife: "",
      resharpeningLife: "",
      totalLife: "",
    })
  }

  const handleDeleteTool = (toolId) => {
    const updatedTools = toolsList.filter(t => t.id !== toolId)
    setToolsList(updatedTools)
    if (activeBOMItem) {
      activeBOMItem.tools = updatedTools
    }
    toast.success("Tool deleted successfully!")
  }

  const handleToolInputChange = (e) => {
    const { name, value } = e.target
    setToolFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()

    // Only apply search parsing for search functionality, not for display
    let searchTerm = searchValue
    if (searchValue.includes(" | ")) {
      searchTerm = searchValue.split(" | ")[0]
    } else if (searchValue.includes(" - ")) {
      searchTerm = searchValue.split(" - ")[0]
    }

    const filtered = allTableData.filter((item) => {
      return (
        (item.OPNo && item.OPNo.toLowerCase().includes(searchTerm)) ||
        (item.PartCode && item.PartCode.toLowerCase().includes(searchTerm)) ||
        (item.BOMPartType && item.BOMPartType.toLowerCase().includes(searchTerm)) ||
        (item.BomPartCode && item.BomPartCode.toLowerCase().includes(searchValue)) || // Use original searchValue for BomPartCode
        (item.QtyKg && item.QtyKg.toLowerCase().includes(searchTerm)) ||
        (item.ScrapCode && item.ScrapCode.toLowerCase().includes(searchTerm)) ||
        (item.ScracpQty && item.ScracpQty.toLowerCase().includes(searchTerm)) ||
        (item.QC && String(item.QC).toLowerCase().includes(searchTerm)) ||
        (item.AssProd && item.AssProd.toLowerCase().includes(searchTerm)) ||
        (item.ProdQty && item.ProdQty.toLowerCase().includes(searchTerm)) ||
        (item.WipWt && item.WipWt.toLowerCase().includes(searchTerm)) ||
        (item.WipRate && item.WipRate.toLowerCase().includes(searchTerm)) ||
        (item.wire_rod && item.wire_rod.toLowerCase().includes(searchTerm)) ||
        (item.bar && item.bar.toLowerCase().includes(searchTerm)) ||
        (item.OPRate && item.OPRate.toLowerCase().includes(searchTerm)) ||
        (item.Operation && item.Operation.toLowerCase().includes(searchTerm))
      )
    })
    setTableData(filtered)
  }

  const handleClear = () => {
    setSearchTerm("")
    setSelectedItem(null)
    setTableData([])
    setPartCodeDropdownData([])
  }

  const handleSave1 = async () => {
    try {
      if (!selectedItem) {
        toast.error("Please search and select an item first.")
        return
      }

      if (!formData1.OPNo || !formData1.PartCode) {
        toast.error("Please fill in all required fields (Op No and Part Code).")
        return
      }

      const formattedData = {
        ...formData1,
        BOMPartType: formData1.BOMPartType.join(","),
      }

      const itemId = selectedItem.id
      setIsLoading(true)

      console.log("[v0] Saving data:", formattedData)
      const savedItem = await saveBomItem(itemId, formattedData, editingId)
      console.log("[v0] Saved item response:", savedItem)

      if (!editingId) {
        const newTableEntry = {
          id: savedItem.id || Date.now(),
          ...formattedData,
          item: selectedItem.id,
        }
        console.log("[v0] Adding new entry to table:", newTableEntry)

        // Update both table states with the new entry
        const updatedTableData = [...tableData, newTableEntry]
        setTableData(updatedTableData)
        setAllTableData(updatedTableData)

        console.log("[v0] Table updated with new entry, total items:", updatedTableData.length)

        // The data is already saved on server, no need to refresh and lose the UI state
      } else {
        // Editing existing item
        const updatedTableData = tableData.map((item) => {
          if (item.id === editingId) {
            return {
              ...item,
              ...formattedData,
              item: selectedItem.id,
            }
          }
          return item
        })
        console.log("[v0] Updated table data:", updatedTableData)
        setTableData(updatedTableData)
        setAllTableData(updatedTableData)
      }

      setFormData1({
        OPNo: "",
        PartCode: "",
        BOMPartType: [],
        BomPartCode: "",
        QtyKg: "",
        ScrapCode: "",
        ScracpQty: "",
        QC: "",
        ProdQty: "",
        AssProd: "",
        WipWt: "",
        WipRate: "",
        PieceRate: "",
        wire_rod: "",
        bar: "",
        OPRate: "",
        Operation: "",
        BomPartDesc: "",
      })
      setEditingId(null)
      setIsLoading(false)

      toast.success(editingId ? "BOM item updated successfully!" : "BOM item saved successfully!")

      console.log("[v0] Final table state:", tableData.length, "items")
    } catch (error) {
      console.error("Error saving BOM data:", error)
      if (error.response && error.response.status === 404) {
        toast.error("Item not found. Please make sure the selected item exists.")
      } else {
        toast.error("Error saving data. Please try again.")
      }
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleSubmit1 = async (e) => {
    e.preventDefault()

    console.log("[v0] Form data being saved:", formData1)
    console.log("[v0] BomPartCode in formData1:", formData1.BomPartCode)
  }

  // const resetForm1 = () => {
  //   setFormData1({
  //     OPNo: "",
  //     PartCode: "",
  //     BOMPartType: [],
  //     BomPartCode: "",
  //     QtyKg: "",
  //     ScrapCode: "",
  //     ScracpQty: "",
  //     QC: "",
  //     ProdQty: "",
  //     AssProd: "",
  //     WipWt: "",
  //     WipRate: "",
  //     PieceRate: "",
  //     OPRate: "",
  //     Operation: "", // Ensure Operation is reset
  //     BomPartDesc: "",
  //   })
  //   setEditingId(null)
  // }

  const handleEdit1 = (item) => {
    setFormData1({
      OPNo: item.OPNo || "",
      PartCode: item.PartCode || "",
      BOMPartType: typeof item.BOMPartType === "string" ? item.BOMPartType.split(",") : item.BOMPartType || [],
      BomPartCode: item.BomPartCode || "",
      QtyKg: item.QtyKg || "",
      ScrapCode: item.ScrapCode || "",
      ScracpQty: item.ScracpQty || "",
      QC: item.QC || "",
      ProdQty: item.ProdQty || "",
      AssProd: item.AssProd || "",
      WipWt: item.WipWt || "",
      WipRate: item.WipRate || "",
      PieceRate: item.PieceRate || "",
      wire_rod: item.wire_rod || "",
      bar: item.bar || "",
      OPRate: item.OPRate || "",
      Operation: item.Operation || "", // Ensure Operation is properly loaded for editing
      BomPartDesc: item.BomPartDesc || "",
    })
    setEditingId(item.id)
  }

  const handleDelete1 = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const itemId = selectedItem ? selectedItem.id : 1
        setIsLoading(true)
        await deleteBomItem(itemId, id)
        setTableData(tableData.filter((item) => item.id !== id))
        setAllTableData(allTableData.filter((item) => item.id !== id))
        toast.success("BOM item deleted successfully!")
        setIsLoading(false)
      } catch (error) {
        console.error("Error deleting BOM data:", error)
        toast.error("Error deleting data. Please try again.")
        setIsLoading(false)
      }
    }
  }

  // BOM Item Part Master functions ////////
  const toggleCardPlus1 = () => {
    if (!selectedItem) {
      toast.error("Please select an item first.")
      return
    }
    setCardBomPlus(true)
    loadBomItems()
  }

  const closeCard = () => {
    setCardBomPlus(false)
    clearFields()
  }

  const clearFields = () => {
    setEditId2(null)
    setSelectedOperation("")
    setCombinedPartCode("")
  }

  const handleSave2 = async () => {
    if (!selectedItem) {
      toast.error("Please select an item first.")
      return
    }

    if (!selectedOperation || !combinedPartCode) {
      toast.error("Please fill in all required fields (Operation and Part Code).")
      return
    }

    const data = {
      Operation: selectedOperation,
      PartCode: combinedPartCode,
    }

    try {
      console.log("Saving BOM data:", data)
      if (editId2) {
        await updateBomItemForSelectedItem(selectedItem.id, editId2, data)
        toast.success("BOM Item updated successfully!")
      } else {
        await saveBomItemForSelectedItem(selectedItem.id, data)
        toast.success("BOM Item saved successfully!")
      }
      loadBomItems()
      clearFields()

      // Refresh the part code dropdown
      const dropdownData = await fetchPartCodeDropdownData(selectedItem.id)
      setPartCodeDropdownData(dropdownData)
    } catch (err) {
      console.error("Error saving BOM item:", err)
      toast.error("Error saving data.")
    }
  }

  const handleEdit2 = (item) => {
    setEditId2(item.id)
    setSelectedOperation(item.Operation)
    setCombinedPartCode(item.PartCode)
  }

  const handleDelete2 = async (id) => {
    if (!selectedItem) return

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteBomItemForSelectedItem(selectedItem.id, id)
        loadBomItems()
        toast.success("BOM Item deleted successfully!")

        // Refresh the part code dropdown
        const dropdownData = await fetchPartCodeDropdownData(selectedItem.id)
        setPartCodeDropdownData(dropdownData)
      } catch (error) {
        console.error("Error deleting BOM item:", error)
        toast.error("Error deleting data.")
      }
    }
  }

  // Fixed BOM Part Code options fetching
  const fetchBomPartCodeOptions = async (type) => {
    try {
      console.log("Fetching options for type:", type, "with PartCode:", formData1.PartCode)

      if (type === "RM") {
        // Fetch all RM items without filtering by current part code
        const res = await getRMItems("")
        console.log("RM API Response:", res)
        setBomOptions(res || [])
      } else if (type === "COM") {
        const selectedItemId = selectedItem?.id || 67
        const currentPartCode = document.querySelector('select[name="PartCode"]')?.value || formData1.PartCode || ""
        console.log("Using PartCode for COM fetch:", currentPartCode)

        const res = await getComItems(selectedItemId, currentPartCode)
        console.log("COM API Response:", res)

        // Handle both array and single object responses
        if (Array.isArray(res)) {
          setBomOptions(res)
        } else if (res && typeof res === "object") {
          setBomOptions([res]) // Wrap single object in array
        } else {
          setBomOptions([])
        }
      } else {
        setBomOptions([]) // BOM selected, nothing to show
      }
    } catch (error) {
      console.error("Error fetching BOM part code options:", error)
      setBomOptions([])
    }
  }

  const handleBOMPartTypeChange = (type) => {
    setFormData1((prev) => ({
      ...prev,
      BOMPartType: [type], // only one allowed
      BomPartCode: "", // reset on change
    }))

    // Ensure we're using the current PartCode value when fetching options
    setTimeout(() => {
      fetchBomPartCodeOptions(type)
    }, 0)
  }

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("[v0] BomPartCode in formData1:", formData1.BomPartCode)

    const newItem = {
      id: Date.now(),
      ...formData1,
    }

    console.log("[v0] New item being added to table:", newItem)
    console.log("[v0] BomPartCode in new item:", newItem.BomPartCode)

    setTableData((prev) => [...prev, newItem])
  }

  return (
    <div className="erp-page">
      <div className="container-fluid p-0">
        <ToastContainer />
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="BillMaterial1 container-fluid py-3" style={{ overflowX: "auto" }}>
                  <div style={{ minWidth: "1350px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Routing & Bill of Material (BOM)</h5>
                    <div className="d-flex gap-2 align-items-center flex-wrap justify-content-end">
                      <button className="vndrbtn" onClick={toggleCardProduction}>1. Production Dept</button>
                      <button className="vndrbtn" onClick={toggleCardOperation}>2. Operation Master</button>
                      <button className="vndrbtn" onClick={toggleCardStandard}>3. Std Routing</button>
                      <button className="vndrbtn" onClick={toggleCardBomitem}>BOM Item Group</button>
                      <button className="vndrbtn">BOM Print</button>
                      <Link to={"/bom-routing"} className="vndrbtn" style={{ textDecoration: 'none' }}>BOM List</Link>
                    </div>
                  </div>

                  {cardVisibleProduction && (
                    <div className="ProductionDeptCard">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 style={{ color: "blue" }}>Production Department Master</h5>
                          <button className="Closebom" onClick={toggleCardProduction}>
                            X
                          </button>
                        </div>

                        <div className="card-body">
                          <form onSubmit={handleSave}>
                            <div className="row mb-3 text-start">
                              <div className="col-md-5">
                                <label htmlFor="Department_Name" className="form-label">
                                  Department Name:
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.Department_Name ? "is-invalid" : ""}`}
                                  id="Department_Name"
                                  name="Department_Name"
                                  value={formData.Department_Name}
                                  onChange={handleInputChange}
                                  placeholder="Enter department name"
                                />
                                {errors.Department_Name && (
                                  <div className="invalid-feedback">{errors.Department_Name}</div>
                                )}
                              </div>
                              <div className="col-md-5">
                                <label htmlFor="Short_Name" className="form-label">
                                  Short Name:
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.Short_Name ? "is-invalid" : ""}`}
                                  id="Short_Name"
                                  name="Short_Name"
                                  value={formData.Short_Name}
                                  onChange={handleInputChange}
                                  placeholder="Enter short name"
                                />
                                {errors.Short_Name && <div className="invalid-feedback">{errors.Short_Name}</div>}
                              </div>
                              <div className="col-md-2">
                                <button type="submit" className="bomButton" style={{ marginTop: "31px" }}>
                                  {isEditing ? "Update" : "Save"}
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="row">
                            <div className="col-12">
                              <table className="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Department Name</th>
                                    <th scope="col">Short Name</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.length > 0 ? (
                                    data.map((item, index) => (
                                      <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.Department_Name}</td>
                                        <td>{item.Short_Name}</td>
                                        <td>
                                          <FaEdit
                                            className="text-primary mx-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEdit(item)}
                                          />
                                        </td>
                                        <td>
                                          <FaTrash
                                            className="text-danger mx-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(item.id)}
                                          />
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="5" className="text-center">
                                        No data found!
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {cardVisibleOperation && <BOMoperation />}
                  {cardVisibleStandard && (
                    <div className="Standard">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <span>Standard Routing Master</span>
                          <button className="Closebom" onClick={toggleCardStandard}>
                            X
                          </button>
                        </div>
                        <VisibleStandard />
                      </div>
                    </div>
                  )}
                  {cardVisibleBomitem && (
                    <div className="Bomitem">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <span>BOM Item Group Details</span>
                          <button className="Closebom" onClick={toggleCardBomitem}>
                            X
                          </button>
                        </div>
                        <VisibleBomitem />
                      </div>
                    </div>
                  )}
                  <div className="BillMaterialsection mt-4">
                    <div className="container-fluid">
                      {/* {isLoading && (
                        <div
                          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
                          style={{ zIndex: 1050 }}
                        >
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )} */}

                      <div className="d-flex align-items-center justify-content-between rounded p-2 mb-2 bg-light border shadow-sm" style={{ fontSize: "12px" }}>
                        <div className="d-flex align-items-center gap-2">
                          <select className="form-select form-select-sm" style={{ width: '80px' }}>
                            <option>ALL</option>
                          </select>
                          <div className="position-relative" ref={dropdownRef} style={{ minWidth: '280px' }}>
                            <input type="text" className="form-control form-control-sm" placeholder="Search by part number" value={searchTerm} onChange={handleSearchChange} onKeyPress={(e) => { if (e.key === "Enter") handleSearch(); }} />
                            {showDropdown && searchResults.length > 0 && (
                              <div className="position-absolute w-100 bg-white border rounded shadow-sm z-10" style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}>
                                {searchResults.map((item) => (
                                  <div key={item.id} className="p-2 border-bottom cursor-pointer text-dark" style={{ cursor: "pointer" }} onClick={() => handleSearchSelect(item)} onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f9fa"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>
                                    {item.part_no} | {item.Part_Code} | {item.Name_Description}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <button className="vndrbtn btn-sm" onClick={(e) => handleSearch(e)}>Search</button>
                          <button className="vndrbtn btn-sm" style={{ color: '#dc2626' }} onClick={handleClear}>Clear</button>
                          <div className="d-flex align-items-center ms-2">
                            <span className="me-1 fw-bold text-secondary" style={{ fontSize: '11px' }}>Bom Authorise:</span>
                            <i className="fas fa-check-circle text-success fs-6 me-1"></i>
                            <select className="form-select form-select-sm" style={{ width: '60px', padding: '2px 4px', fontSize: '11px' }}>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button className="vndrbtn btn-sm">Copy BOM</button>
                          <button className="vndrbtn btn-sm">Calculate RM Wt</button>
                          <button className="vndrbtn btn-sm d-flex align-items-center gap-1"><i className="fas fa-file-excel text-success"></i> Export Excel</button>
                        </div>
                      </div>

                      {/* {selectedItem && (
                        <div className="alert alert-info mt-2">
                          <strong>Selected Item:</strong> {selectedItem.part_no}{" "}
                          - {selectedItem.Name_Description} (ID:{" "}
                          {selectedItem.id})
                        </div>
                      )} */}

                      <div className="row mt-3">
                        <div className="col text-start">
                          <div className="tabs w-100 text-start">
                            <ul className="nav nav-tabs custom-tabs mb-4" role="tablist">
                              <li className="nav-item" role="presentation">
                                <button
                                  className={`nav-link ${activeTab === "BOM" ? "active" : ""}`}
                                  onClick={() => setActiveTab("BOM")}
                                  type="button"
                                  role="tab"
                                >
                                  BOM
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  className={`nav-link ${activeTab === "BOM History" ? "active" : ""}`}
                                  onClick={() => setActiveTab("BOM History")}
                                  type="button"
                                  role="tab"
                                >
                                  BOM History
                                </button>
                              </li>
                            </ul>

                            <div className="tab-content mt-2">
                              {activeTab === "BOM" && (
                                <div className="tab-pane fade show active">

                                  {/* Manual / Standard Routing */}
                                  <div className="d-flex align-items-center mb-1 flex-nowrap" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                                    <div className="form-check form-check-inline me-2 flex-shrink-0">
                                      <input type="radio" className="form-check-input" name="routeType" id="manualRadio" style={{ width: '12px', height: '12px', marginTop: '2px' }} defaultChecked />
                                      <label className="form-check-label fw-bold" htmlFor="manualRadio">Manual</label>
                                    </div>
                                    <div className="form-check form-check-inline flex-shrink-0">
                                      <input type="radio" className="form-check-input" name="routeType" id="stdRadio" style={{ width: '12px', height: '12px', marginTop: '2px' }} />
                                      <label className="form-check-label fw-bold" htmlFor="stdRadio">Standard Routing</label>
                                    </div>
                                  </div>

                                  {/* BOM Input Form Section */}
                                  <div className="card shadow-sm border-0 mb-3" style={{ borderRadius: '8px', overflowX: 'auto' }}>
                                    <div className="card-body bg-light" style={{ padding: '12px', minWidth: '1250px' }}>
                                      
                                      {/* Row 1 */}
                                      <div className="row mb-2 text-start flex-nowrap">
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>OP No</label>
                                          <input type="text" className="form-control form-control-sm" name="OPNo" value={formData1.OPNo} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-2">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Part Code</label>
                                          <div className="input-group input-group-sm">
                                            <select className="form-select form-select-sm" name="PartCode" value={formData1.PartCode} onChange={handleChange} style={{ height: '31px', minHeight: '31px' }}>
                                              <option value="">Select</option>
                                              {partCodeDropdownData.map((item, index) => (<option key={index} value={item.PartCode}>{item.PartCode}</option>))}
                                            </select>
                                            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center" type="button" onClick={toggleCardPlus1} style={{ height: '31px', minHeight: '31px', padding: '0 10px' }}>
                                              <i className="fas fa-plus"></i>
                                            </button>
                                          </div>
                                        </div>
                                        <div className="col-md-2" style={{ minWidth: '210px' }}>
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>BOM Part Type</label>
                                          <div className="d-flex align-items-center flex-nowrap" style={{ minHeight: '31px' }}>
                                            {["RM", "COM", "BOM"].map((type) => (
                                              <div key={type} className="d-flex align-items-center mb-0 me-3 flex-shrink-0">
                                                <input className="form-check-input m-0 me-1 flex-shrink-0" type="radio" name="BOMPartTypeRadio" id={type} value={type} checked={formData1.BOMPartType.includes(type)} onChange={() => handleBOMPartTypeChange(type)} style={{ width: '13px', height: '13px' }} />
                                                <label className="form-check-label text-muted mb-0" htmlFor={type} style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{type}</label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="col-md-2">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Bom Part Code</label>
                                          {(formData1.BOMPartType.includes("RM") || formData1.BOMPartType.includes("COM")) ? (
                                            <select className="form-select form-select-sm" name="BomPartCode" value={formData1.BomPartCode} onChange={handleChange}>
                                              <option value="">Select</option>
                                              {formData1.BOMPartType.includes("RM") && bomOptions.map((item) => (<option key={item.id} value={`${item.part_no} | ${item.Part_Code} | ${item.Name_Description}`}>{item.part_no} | {item.Part_Code} | {item.Name_Description}</option>))}
                                              {formData1.BOMPartType.includes("COM") && bomOptions.map((item, index) => (<option key={item.id || index} value={item.PartCode}>{item.OPNo} | {item.PartCode}</option>))}
                                            </select>
                                          ) : (
                                            <input type="text" className="form-control form-control-sm" name="BomPartCode" value={formData1.BomPartCode} onChange={handleChange} disabled />
                                          )}
                                        </div>
                                        <div className="col-md-2">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Qty : Kg</label>
                                          <input type="text" className="form-control form-control-sm" name="QtyKg" value={formData1.QtyKg} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-3">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Operation</label>
                                          <input type="text" className="form-control form-control-sm" name="Operation" value={formData1.Operation} onChange={handleInputChange1} />
                                        </div>
                                      </div>

                                      {/* Row 2 */}
                                      <div className="row mb-2 text-start flex-nowrap">
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                            <input type="checkbox" id="scrapChkTop" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Scrap Code
                                          </label>
                                          <select className="form-select form-select-sm" name="ScrapCode" value={formData1.ScrapCode} onChange={handleChange}>
                                            <option value=""></option>
                                            {scrapOptions.map((item, index) => (<option key={index} value={item.part_no}>{item.part_no}</option>))}
                                          </select>
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Scrap Qty</label>
                                          <input type="text" className="form-control form-control-sm" name="ScracpQty" value={formData1.ScracpQty} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Prod Qty</label>
                                          <input type="text" className="form-control form-control-sm" name="ProdQty" value={formData1.ProdQty} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>WIP Wt</label>
                                          <input type="text" className="form-control form-control-sm" name="WipWt" value={formData1.WipWt} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>WIP Rate</label>
                                          <input type="text" className="form-control form-control-sm" name="WipRate" value={formData1.WipRate} onChange={handleChange} />
                                        </div>
                                        {/*
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Piece Rate</label>
                                          <input type="text" className="form-control form-control-sm" name="PieceRate" value={formData1.PieceRate} onChange={handleChange} />
                                        </div>
                                        */}
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Wire Rod</label>
                                          <input type="text" className="form-control form-control-sm" name="wire_rod" value={formData1.wire_rod} onChange={handleChange} disabled={!formData1.BOMPartType.includes("RM")} />
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Bar</label>
                                          <input type="text" className="form-control form-control-sm" name="bar" value={formData1.bar} onChange={handleChange} disabled={!formData1.BOMPartType.includes("RM")} />
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>OP Rate</label>
                                          <input type="text" className="form-control form-control-sm" name="OPRate" value={formData1.OPRate} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-1">
                                          <div className="d-flex align-items-center pt-4">
                                            <label className="form-check-label mb-0 d-flex align-items-center" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                              <input type="checkbox" className="form-check-input me-1 m-0" name="QC" checked={!!formData1.QC} onChange={handleChange} style={{ width: '14px', height: '14px' }} /> QC
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-1">
                                          <label className="form-label mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Ass Prod</label>
                                          <select className="form-select form-select-sm" name="AssProd" value={formData1.AssProd} onChange={handleChange}>
                                            <option value="NO">N</option>
                                            <option value="Yes">Y</option>
                                          </select>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                                          <button className="btn btn-primary px-4 fw-bold" onClick={handleSave1} disabled={isLoading || !selectedItem}>{editingId ? "UPDATE" : "SAVE"}</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Context Header for Selected Item below form */}
                                  <div className="w-100 border p-1 mt-1 mb-2 bg-white text-start" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                                    {selectedItem ? (
                                      <>{selectedItem.part_no} | {selectedItem.Part_Code || "520MC00712"} | {selectedItem.Name_Description || "PINION (N)"} | 0 | 0</>
                                    ) : (
                                      <>FG1001 | 520MC00712 | PINION (N) 0 | 0</>
                                    )}
                                  </div>

                                  {/* {selectedItem && (
                                    <div className="fw-bold mb-2 pb-1 border-bottom" style={{fontSize: '12px'}}>
                                      {selectedItem.part_no} | {selectedItem.Part_Code || "-"} | {selectedItem.Name_Description || "-"} | 0 | 0
                                    </div>
                                  )} */}
                                  
                                  {/* BOM Table */}
                                  <div className="table-responsive edit-table-wrapper mt-3">
                                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Table stickyHeader size="small" sx={{ tableLayout: 'auto', width: '100%' }}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Op No</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Part Code</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Part Type</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Bom Part Code</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Qty</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Bom Part Desc</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Scrap Item</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Scrap Qty</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', minWidth: '150px', textAlign: 'center' }}>OP Name</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>QC</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Prod Qty</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>WIP wt</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>WIP rate</TableCell>
                                          {/* <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Piece Rate</TableCell> */}
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Wire Rod</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Bar</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Op Rate</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Active</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Edit</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Doc</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Del</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>BOM</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Tool</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>#</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Modify Date</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {tableData.length > 0 ? (
                                          tableData.map((item, index) => (
                                            <TableRow key={item.id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...{ backgroundColor: item.BOMPartType === "RM" ? "#a5fac5" : "transparent" } }}>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.OPNo || (index + 1) * 10}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.PartCode}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.BOMPartType}</TableCell>
                                              <TableCell title={item.BomPartCode} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                {item.BomPartCode ? item.BomPartCode.split(' | ')[0] : 'N/A'}
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{Number(item.QtyKg || 0).toFixed(6)}</TableCell>
                                              <TableCell title={item.BomPartCode} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                {item.BomPartDesc || (item.BomPartCode && item.BomPartCode.includes('|') ? item.BomPartCode.split(' | ')[2] : '')}
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.ScrapCode}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{Number(item.ScracpQty || 0).toFixed(5)}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                {item.Operation && (
                                                  <span className="badge" style={{ backgroundColor: '#d85a19', color: 'white', border: '1px solid #b34a12', fontSize: '9px', padding: '3px 4px', textTransform: 'uppercase' }}>
                                                    {item.Operation}
                                                  </span>
                                                )}
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><input type="checkbox" checked={!!item.QC} readOnly className="form-check-input m-0" style={{ width: "12px", height: "12px" }} /></TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.ProdQty || 1}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.WipWt || '0.0066'}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.WipRate || 0}</TableCell>
                                              {/* <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.PieceRate || 0}</TableCell> */}
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.wire_rod || '-'}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.bar || '-'}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{item.OPRate || 0}</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>Y</TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm" onClick={() => handleEdit1(item)}><FaEdit /></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm"><i className="fas fa-file-invoice"></i></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm" onClick={() => handleDelete1(item.id)}><FaTrash /></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm"><i className="fas fa-folder"></i></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm" onClick={() => handleOpenToolModal(item)}><i className="fas fa-wrench"></i></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                <button className="btn btn-sm"><i className="fas fa-eye"></i></button>
                                              </TableCell>
                                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                                                {new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                              </TableCell>
                                            </TableRow>
                                          ))
                                        ) : (
                                          <TableRow>
                                            <TableCell colSpan={23} sx={{ textAlign: 'center', py: 3, color: '#64748b' }}>
                                              {selectedItem
                                                ? "No BOM items found for this item. You can add new ones."
                                                : "No data available"}
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
          </TableContainer>
                                  </div>

                                  {/* BOM Item Part Master Modal */}
                                  {cardBomPlus && (
                                    <div
                                      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
                                      style={{ zIndex: 1055 }}
                                    >
                                      <div
                                        className="bg-white rounded p-4"
                                        style={{
                                          width: "90%",
                                          maxWidth: "700px",
                                          maxHeight: "90vh",
                                          overflowY: "auto",
                                        }}
                                      >
                                        <div className="row align-items-center mb-3">
                                          <div className="col-md-10 text-start">
                                            <h6>BOM : Item Part Master</h6>
                                          </div>
                                          <div className="col-md-2 text-end">
                                            <button className="btn btn-outline-secondary" onClick={closeCard}>
                                              <FaTimes />
                                            </button>
                                          </div>
                                        </div>

                                        {/* Form Section */}
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <label className="form-label mb-0 text-nowrap">Operation</label>
                                            <select
                                              className="form-control form-control-sm"
                                              value={selectedOperation}
                                              onChange={(e) => setSelectedOperation(e.target.value)}
                                            >
                                              <option value="">Select Operation</option>
                                              {operationList.map((op, idx) => (
                                                <option key={idx} value={op.Operation_Name}>
                                                  {op.Operation_Name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>

                                          <div className="col-md-3">
                                            <label className="form-label mb-0 text-nowrap">Part Code</label>
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              value={combinedPartCode}
                                              onChange={(e) => setCombinedPartCode(e.target.value)}
                                            />
                                          </div>

                                          <div className="col-md-3 d-flex align-items-end">
                                            <button className="btn btn-primary" onClick={handleSave2}>
                                              {editId2 ? "Update" : "Save"}
                                            </button>
                                          </div>
                                        </div>

                                        {/* Table Section */}
                                        <div className="table-responsive">
                                          <table className="table table-bordered">
                                            <thead>
                                              <tr>
                                                <th>Sr.</th>
                                                <th>Part Code</th>
                                                <th>Operation</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {bomList.length > 0 ? (
                                                bomList.map((item, index) => (
                                                  <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.PartCode}</td>
                                                    <td>{item.Operation}</td>
                                                    <td>
                                                      <button className="btn" onClick={() => handleEdit2(item)}>
                                                        <FaEdit />
                                                      </button>
                                                    </td>
                                                    <td>
                                                      <button className="btn" onClick={() => handleDelete2(item.id)}>
                                                        <FaTrash />
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ))
                                              ) : (
                                                <tr>
                                                  <td colSpan="5" className="text-center text-muted">
                                                    No data available
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Tool Management Modal */}
                                  {cardToolModal && (
                                    <div
                                      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
                                      style={{ zIndex: 1060 }}
                                    >
                                      <div
                                        className="bg-white rounded p-4"
                                        style={{
                                          width: "90%",
                                          maxWidth: "850px",
                                          minHeight: "500px",
                                          maxHeight: "90vh",
                                          overflowY: "auto",
                                          display: "flex",
                                          flexDirection: "column"
                                        }}
                                      >
                                        <div className="d-flex flex-column flex-grow-1">
                                          {/* Modal Header */}
                                          <div className="row align-items-center mb-3">
                                            <div className="col-md-10 text-start">
                                              <h6 style={{ fontWeight: "bold" }}>Add Tool</h6>
                                            </div>
                                            <div className="col-md-2 text-end">
                                              <button className="btn btn-outline-secondary btn-sm" onClick={() => setCardToolModal(false)}>
                                                <FaTimes />
                                              </button>
                                            </div>
                                          </div>

                                          {/* Tool Management title */}
                                          <h6 className="text-primary text-start mb-2" style={{ fontWeight: "bold", fontSize: "14px" }}>Tool Management</h6>
                                          <div style={{ borderTop: "1px solid #dee2e6", marginBottom: "15px" }}></div>

                                          {/* Single-Row Input Form */}
                                          <div className="d-flex align-items-end gap-2 mb-4 p-2 border rounded bg-light flex-wrap" style={{ fontSize: "11px" }}>
                                            
                                            {/* Tool/Item group */}
                                            <div className="d-flex flex-column text-start">
                                              <span className="fw-bold text-secondary mb-1">Tools/Items :</span>
                                              <select className="form-select form-select-sm" name="toolItem" value={toolFormData.toolItem} onChange={handleToolInputChange} style={{ fontSize: "11px", padding: "2px 4px", width: "200px", height: "26px" }}>
                                                <option value="">Select Tool</option>
                                                {toolDropdownItems.map((item, index) => {
                                                  const val = `${item.part_no || ""} | ${item.Part_Code || ""} | ${item.Name_Description || ""}`;
                                                  return (
                                                    <option key={index} value={val}>{val}</option>
                                                  );
                                                })}
                                              </select>
                                            </div>

                                            {/* Search button aligned with bottom inputs */}
                                            <div>
                                              <button className="btn d-inline-flex align-items-center gap-2 py-1 px-3 text-nowrap" style={{ fontSize: "11px", height: "26px" }}>Search</button>
                                            </div>

                                            {/* Tools/Die Life group */}
                                            <div className="d-flex flex-column text-start ms-2">
                                              <span className="fw-bold text-secondary mb-1">Tools/Die Life :</span>
                                              <input type="text" className="form-control form-control-sm" name="toolDieLife" value={toolFormData.toolDieLife} onChange={handleToolInputChange} style={{ fontSize: "11px", padding: "2px 4px", width: "80px", height: "26px" }} />
                                            </div>

                                            {/* No of Resharpening group */}
                                            <div className="d-flex flex-column text-start ms-2">
                                              <span className="fw-bold text-secondary mb-1">No of Resharpening :</span>
                                              <input type="text" className="form-control form-control-sm" name="resharpeningLife" value={toolFormData.resharpeningLife} onChange={handleToolInputChange} style={{ fontSize: "11px", padding: "2px 4px", width: "100px", height: "26px" }} />
                                            </div>

                                            {/* Total Life group */}
                                            <div className="d-flex flex-column text-start ms-2">
                                              <span className="fw-bold text-secondary mb-1">Total Life :</span>
                                              <input type="text" className="form-control form-control-sm" name="totalLife" value={toolFormData.totalLife || (Number(toolFormData.toolDieLife || 0) * Number(toolFormData.resharpeningLife || 0)) || ""} onChange={handleToolInputChange} style={{ fontSize: "11px", padding: "2px 4px", width: "80px", height: "26px" }} />
                                            </div>

                                            {/* Save button aligned with bottom inputs */}
                                            <div className="ms-auto">
                                              <button className="btn btn-sm btn-primary px-3 text-nowrap" onClick={handleSaveTool} style={{ fontSize: "11px", height: "26px", fontWeight: "bold", display: "flex", alignItems: "center" }}>Save</button>
                                            </div>
                                          </div>

                                          {/* Tools List Table */}
                                          <div className="table-responsive border rounded mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
                                            {toolsList.length > 0 ? (
                                              <table className="table table-bordered table-striped table-sm text-center align-middle mb-0" style={{ fontSize: "11px" }}>
                                                <thead className="table-light">
                                                  <tr>
                                                    <th>Sr. No</th>
                                                    <th>Tool/ Item Name</th>
                                                    <th>Tool/Die Life</th>
                                                    <th>No of Resharpening</th>
                                                    <th>Total Life</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {toolsList.map((tool, idx) => (
                                                    <tr key={tool.id || idx}>
                                                      <td>{idx + 1}</td>
                                                      <td>{tool.toolItem}</td>
                                                      <td>{tool.toolDieLife}</td>
                                                      <td>{tool.resharpeningLife}</td>
                                                      <td>{tool.totalLife || (Number(tool.toolDieLife || 0) * Number(tool.resharpeningLife || 0))}</td>
                                                      <td>
                                                        <button className="btn btn-sm btn-outline-danger p-0 px-2" onClick={() => handleDeleteTool(tool.id)} style={{ fontSize: "10px" }}>
                                                          <FaTrash />
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            ) : (
                                              <div className="p-4 text-center text-danger fw-bold" style={{ fontSize: "13px" }}>
                                                No Data Found !!!
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Modal Footer */}
                                        <div className="d-flex justify-content-end mt-auto pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                                          <button className="btn btn-sm btn-secondary px-4" onClick={() => setCardToolModal(false)} style={{ fontSize: "12px", fontWeight: "bold" }}>Close</button>
                                        </div>

                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {activeTab === "BOM History" && (
                                <div className="tab-pane fade show active">
                                  <div className="row mb-3 text-start">
                                    <div className="col-md-2 ms-1">
                                      <label className="form-label mb-0 text-nowrap">Select BOM Revision:</label>
                                    </div>
                                    <div className="col-md-1">
                                      <select name="" className="form-control form-control-sm" style={{ marginTop: "-1px" }}>
                                        <option value="">Select</option>
                                        <option value="All">All</option>
                                        <option value="Director">Director</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Ac">Ac</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Store">Store</option>
                                        <option value="Planning">Planning</option>
                                        <option value="Purchase">Purchase</option>
                                        <option value="CRM">CRM</option>
                                        <option value="Account">Account</option>
                                      </select>
                                    </div>
                                    <div className="col-md-2">
                                      <button className="vndrbtn btn-sm d-flex align-items-center gap-1" onClick={handleExportBOMHistory}><i className="fas fa-file-excel text-success"></i> Export Excel</button>
                                    </div>
                                  </div>
                                  <div className="table-responsive">
                                    <table id="bomHistoryTable" className="table table-bordered mt-3">
                                      <thead>
                                        <tr>
                                          <th>NO Data Found</th>
                                        </tr>
                                      </thead>
                                      <tbody></tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                            {cardVisiblePlus && (
                              <div className="ProductionDeptCard mt-5">
                                <div className="card">
                                  <div className="card-header d-flex justify-content-between">
                                    <h5 style={{ color: "blue" }}>BOM : Item Part Master</h5>
                                    <button className="Closebom" onClick={toggleCardPlus}>
                                      X
                                    </button>
                                  </div>

                                  <div className="card-body">
                                    <div className="row mb-3 text-start">
                                      <div className="col-md-5">
                                        <label htmlFor="Operator" className="form-label">
                                          Operation:
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${errors.Operator ? "is-invalid" : ""}`}
                                          id="Operator"
                                          name="Operator"
                                          value={formData.Operator}
                                          onChange={handleInputChange}
                                          placeholder="Enter department name"
                                        />
                                        {errors.Operator && <div className="invalid-feedback">{errors.Operator}</div>}
                                      </div>
                                      <div className="col-md-5">
                                        <label htmlFor="PartCode" className="form-label">
                                          Part Code:
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${errors.PartCode ? "is-invalid" : ""}`}
                                          id="PartCode"
                                          name="PartCode"
                                          value={formData.PartCode}
                                          onChange={handleInputChange}
                                          placeholder="Enter short name"
                                        />
                                        {errors.PartCode && <div className="invalid-feedback">{errors.PartCode}</div>}
                                      </div>
                                      <div className="col-md-2">
                                        <button type="submit" className="bomButton" style={{ marginTop: "31px" }}>
                                          {isEditing ? "Update" : "Save"}
                                        </button>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-12">
                                        <table className="table table-bordered table-striped">
                                          <thead>
                                            <tr>
                                              <th scope="col">Sr. No.</th>
                                              <th scope="col">Part Code</th>
                                              <th scope="col">Min Level</th>
                                              <th scope="col">Max Level</th>

                                              <th scope="col">Edit</th>
                                              <th scope="col">Delete</th>
                                            </tr>
                                          </thead>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillMaterial
