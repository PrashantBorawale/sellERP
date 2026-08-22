"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./NewGateInward.css"
import { Box, Typography, Button, TextField, MenuItem, Grid, Paper, Tabs, Tab, IconButton } from "@mui/material"
import {
  getNewGateInward,
  SaveNewGateInward,
  searchMRNItem,
  searchCustomerByNumber,
  getgateInwardById,
} from "../../../Service/StoreApi.jsx"

const NewGateInward = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const shortYear = localStorage.getItem("Shortyear") // Get year from localStorage

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const [formData, setFormData] = useState({
    Plant: "VISHWA S.I.",
    Series: "GateInward",
    Type: "",
    Supp_Cust: "",
    GE_No: "",
    GE_Date: today,
    GE_Time: currentTime,
    ChallanNo: "",
    ChallanDate: "",
    Select: "",
    InVoiceNo: "",
    Invoicedate: "",
    EWayBillNo: "",
    EWayBillDate: "",
    ContactPerson: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    Remark: "",
    ItemDetails: [],
  })

  const [newItem, setNewItem] = useState({
    ItemNo: "",
    Description: "",
    Qty_NOS: "",
    QTY_KG: "",
    Unit_Code: "",
    Remark: "",
  })

  // Customer search states
  const [, setCustomerSearchQuery] = useState("")
  const [customerSearchResults, setCustomerSearchResults] = useState([])
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [, setSelectedCustomer] = useState(null)

  // PO list states
  const [poList, setPoList] = useState([])

  // Load data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      fetchGateInwardDetails(id)
    } else {
      // If not in edit mode, initialize with default values and fetch next GE_No
      const yr = shortYear || new Date().getFullYear().toString().slice(-2);
      getNewGateInward(yr).then((nextGE_No) => {
        setFormData((prev) => ({
          ...prev,
          Plant: prev.Plant || "VISHWA S.I.",
          Series: prev.Series || "GateInward",
          GE_Date: prev.GE_Date || new Date().toISOString().split("T")[0],
          GE_Time: prev.GE_Time || new Date().toTimeString().slice(0, 5),
          GE_No: nextGE_No || prev.GE_No || "",
        }))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, shortYear])

  const fetchGateInwardDetails = async (id) => {
    try {
      const data = await getgateInwardById(id)
      if (data) {
        // Format dates for form inputs
        const formattedData = {
          ...data,
          GE_Date: data.GE_Date ? formatDateForInput(data.GE_Date) : "",
          ChallanDate: data.ChallanDate ? formatDateForInput(data.ChallanDate) : "",
          Invoicedate: data.Invoicedate ? formatDateForInput(data.Invoicedate) : "",
          EWayBillDate: data.EWayBillDate ? formatDateForInput(data.EWayBillDate) : "",
          ItemDetails: data.ItemDetails || [],
        }
        setFormData(formattedData)

        // If there's a customer, trigger search to populate PO list
        if (data.Supp_Cust) {
          handleCustomerSearch(data.Supp_Cust)
        }

        // Set selected PO if available
        if (data.Select) {
          setSelectedPoNo(data.Select)
        }
      }
    } catch (error) {
      console.error("Error fetching gate inward details:", error)
      toast.error("Failed to load gate inward details")
    }
  }

  // Helper function to format date for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Function to handle dropdown change
  const handleSeriesChange = async (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (value === "GateInward" && !isEditMode) {
      const nextGE_No = await getNewGateInward(shortYear)
      setFormData((prev) => ({ ...prev, GE_No: nextGE_No || "" }))
    } else if (!isEditMode) {
      setFormData((prev) => ({ ...prev, GE_No: "" }))
    }
  }

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If changing the Supp_Cust field, trigger customer search
    if (name === "Supp_Cust") {
      handleCustomerSearch(value)
    }
  }

  // Function to handle customer search
  const handleCustomerSearch = async (query) => {
    setCustomerSearchQuery(query)

    if (query.length > 0) {
      try {
        const results = await searchCustomerByNumber(query)
        setCustomerSearchResults(results)
        setShowCustomerDropdown(true)
      } catch (error) {
        console.error("Error searching for customer:", error)
        setCustomerSearchResults([])
      }
    } else {
      setCustomerSearchResults([])
      setShowCustomerDropdown(false)
    }
  }

  // Function to handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer)
    setFormData((prev) => ({
      ...prev,
      Supp_Cust: customer.number + " - " + customer.Name,
    }))
    setShowCustomerDropdown(false)

    // Get unique PO numbers for this customer
    const uniquePoNumbers = []
    const uniquePoMap = {}

    customerSearchResults.forEach((item) => {
      if (item.number === customer.number && !uniquePoMap[item.PoNo]) {
        uniquePoMap[item.PoNo] = true
        uniquePoNumbers.push({
          PoNo: item.PoNo,
          pdf_link: item.pdf_link,
        })
      }
    })

    setPoList(uniquePoNumbers)
  }

  const [selectedPoNo, setSelectedPoNo] = useState("")
  const handlePoSelectChange = (e) => {
    const selected = e.target.value
    setSelectedPoNo(selected)
    setFormData((prev) => ({ ...prev, Select: selected }))
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    if (!formData.Plant || !formData.Series || !formData.Supp_Cust) {
      toast.error("Please fill in Plant, Series, and Supplier/Customer.")
      return
    }

    try {
      console.log("Submitting Data:", formData) // Log formData before submission

      // Add id to formData if in edit mode
      const dataToSubmit = isEditMode ? { ...formData, id } : formData

      const response = await SaveNewGateInward(dataToSubmit)
      console.log("API Response:", response) // Log API response

      if (response) {
        toast.success(isEditMode ? "Entry updated successfully!" : "Entry saved successfully!")

        if (!isEditMode) {
          // Only reset form if creating a new entry
          const yr = shortYear || new Date().getFullYear().toString().slice(-2)
          const nextGE_No = await getNewGateInward(yr)
          console.log("Next GE_No:", nextGE_No) // Log new GE_No

          setFormData((prev) => ({
            ...prev,
            Supp_Cust: "",
            Type: "",
            ChallanNo: "",
            ChallanDate: "",
            InVoiceNo: "",
            Invoicedate: "",
            EWayBillNo: "",
            EWayBillDate: "",
            ContactPerson: "",
            VehicleNo: "",
            LrNo: "",
            Transporter: "",
            Remark: "",
            GE_No: nextGE_No || "",
            ItemDetails: [],
          }))
        } else {
          // Navigate back to list after successful edit
          setTimeout(() => {
            navigate("/Gate-Inward-Entry")
          }, 2000)
        }
      }
    } catch (error) {
      console.error("API Error:", error) // Log API errors
      let errMsg = "Error saving entry. Please try again."
      if (error?.response?.data) {
        if (typeof error.response.data === "string") {
          errMsg = error.response.data
        } else if (typeof error.response.data === "object") {
          errMsg = Object.entries(error.response.data)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
            .join(" | ")
        }
      }
      toast.error(errMsg)
    }
  }

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      const results = await searchMRNItem(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Select item from dropdown
  const handleSelectItem = (item) => {
    setNewItem({
      ...newItem,
      ItemNo: item.part_no,
      Description: item.Name_Description,
      // Unit_Code: item.Unit_Code,
    })
    setSearchQuery("") // Clear search input
    setSearchResults([]) // Hide dropdown
  }

  // Add item to table
  const addItem = () => {
    if (!newItem.ItemNo || !newItem.Description ) {  //  !newItem.Unit_Code
      toast.error("Please select an item with Description and Unit Code.")
      return
    }

    setFormData((prev) => ({
      ...prev,
      ItemDetails: [...prev.ItemDetails, newItem],
    }))

    setNewItem({
      ItemNo: "",
      Description: "",
      Qty_NOS: "",
      QTY_KG: "",
      Unit_Code: "",
      Remark: "",
    })
  }

  // Delete item from table
  const deleteItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      ItemDetails: prev.ItemDetails.filter((_, i) => i !== index),
    }))
  }

  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="NewStoreGateInward1">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  
                  {/* Header Section */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          {isEditMode ? "Edit Gate Entry - Inward" : "New Gate Entry - Inward"}
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end gap-2 flex-wrap">
                        <button className="vndrbtn bg-success border-success" onClick={handleSubmit}>
                          <FaCheck className="me-1" /> {isEditMode ? "Update Gate Entry" : "Save Gate Entry"}
                        </button>
                        <button className="vndrbtn bg-secondary border-secondary" onClick={() => navigate("/Gate-Inward-Entry")}>
                          <FaTimes className="me-1" /> Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="centerMain mt-4">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.85rem' } }}>
                        <Tab label="General Detail" />
                        <Tab label="Item Details" />
                      </Tabs>
                    </Box>

                    <form onSubmit={handleSubmit}>
                      {activeTab === 0 && (
                        <Grid container spacing={3}>
                          {/* Top Row */}
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '50px' }}>Plant:</Typography>
                                <TextField select size="small" name="Plant" value={formData.Plant} onChange={handleChange} required sx={{ width: '150px', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}>
                                  <MenuItem value="">Select Plant</MenuItem>
                                  <MenuItem value="VISHWA S.I.">VISHWA S.I.</MenuItem>
                                </TextField>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '50px' }}>Series:</Typography>
                                <TextField select size="small" name="Series" value={formData.Series} onChange={handleSeriesChange} required disabled={isEditMode} sx={{ width: '150px', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}>
                                  <MenuItem value="">Select Series</MenuItem>
                                  <MenuItem value="GateInward">Gate Inward</MenuItem>
                                </TextField>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '50px' }}>Type:</Typography>
                                <TextField select size="small" name="Type" value={formData.Type} onChange={handleChange} sx={{ width: '180px', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}>
                                  <MenuItem value="">Select Type</MenuItem>
                                  <MenuItem value="PurchaseGRN">Purchase GRN</MenuItem>
                                  <MenuItem value="ScheduleGRN">Schedule GRN</MenuItem>
                                  <MenuItem value="ImportGRN">Import GRN</MenuItem>
                                  <MenuItem value="57F4GRN">57F4 GRN</MenuItem>
                                  <MenuItem value="jobworkGRN">jobwork GRN</MenuItem>
                                  <MenuItem value="DC GRN">DC GRN</MenuItem>
                                  <MenuItem value="InterStoreInvoice">Inter Store Invoice</MenuItem>
                                  <MenuItem value="InterStoreChallan">Inter Store Challan</MenuItem>
                                  <MenuItem value="Sales Return">Sales Return</MenuItem>
                                  <MenuItem value="DirectGRN">Direct GRN</MenuItem>
                                  <MenuItem value="General/Document/Courier">General/Document/Courier</MenuItem>
                                </TextField>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Three Columns Layout */}
                          <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0', height: '100%' }}>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Supp./Cust:</Typography>
                                <Box sx={{ position: 'relative', flex: 1 }}>
                                  <TextField size="small" name="Supp_Cust" value={formData.Supp_Cust} onChange={handleChange} autoComplete="off" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                                  {showCustomerDropdown && customerSearchResults.length > 0 && (
                                    <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, bgcolor: '#fff', border: '1px solid #ccc', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', mt: 0.5, boxShadow: 3 }}>
                                      {customerSearchResults.map((customer, index) => {
                                        const key = `${customer.number}-${customer.Name}-${index}`;
                                        const isDuplicate = customerSearchResults.findIndex(
                                          (c, i) => i < index && c.number === customer.number && c.Name === customer.Name
                                        ) !== -1;
                                        if (!isDuplicate) {
                                          return (
                                            <Box key={key} onClick={() => handleSelectCustomer(customer)} sx={{ p: 1, '&:hover': { bgcolor: '#f1f5f9' }, cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                                              <Typography variant="body2">{customer.number} - {customer.Name}</Typography>
                                              <Typography variant="caption" color="textSecondary">{customer.Type}</Typography>
                                            </Box>
                                          );
                                        }
                                        return null;
                                      })}
                                    </Box>
                                  )}
                                </Box>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>GE No:</Typography>
                                <TextField size="small" name="GE_No" value={formData.GE_No} onChange={handleChange} readOnly sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem', bgcolor: '#f8fafc' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>GE Date:</Typography>
                                <TextField type="date" size="small" name="GE_Date" value={formData.GE_Date} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>GE Time:</Typography>
                                <TextField type="time" size="small" name="GE_Time" value={formData.GE_Time} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Challan No:</Typography>
                                <TextField size="small" name="ChallanNo" value={formData.ChallanNo} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Challan Date:</Typography>
                                <TextField type="date" size="small" name="ChallanDate" value={formData.ChallanDate} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0', height: '100%' }}>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Select Series:</Typography>
                                <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 1 }}>
                                  <TextField select size="small" name="Select" value={selectedPoNo} onChange={handlePoSelectChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}>
                                    <MenuItem value="">Select Series</MenuItem>
                                    {poList.map((po, index) => (
                                      <MenuItem key={index} value={po.PoNo}>{po.PoNo}</MenuItem>
                                    ))}
                                  </TextField>
                                  <IconButton size="small" color="primary" onClick={() => {
                                    if (selectedPoNo && formData.Supp_Cust) {
                                      window.open(`https://sellerp-backend.onrender.com/Store/gate/jobwork/purchase/pdf/?po_no=${selectedPoNo}&supplier=${encodeURIComponent(formData.Supp_Cust)}`, "_blank");
                                    } else {
                                      toast.warn("Please select supplier and series first.");
                                    }
                                  }}>
                                    <FaEye />
                                  </IconButton>
                                </Box>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Invoice No:</Typography>
                                <TextField size="small" name="InVoiceNo" value={formData.InVoiceNo} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Invoice Date:</Typography>
                                <TextField type="date" size="small" name="Invoicedate" value={formData.Invoicedate} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>E-Way Bill No:</Typography>
                                <TextField size="small" name="EWayBillNo" value={formData.EWayBillNo} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>EWay Bill Date:</Typography>
                                <TextField type="date" size="small" name="EWayBillDate" value={formData.EWayBillDate} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Contact Person:</Typography>
                                <TextField size="small" name="ContactPerson" value={formData.ContactPerson} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0', height: '100%' }}>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Vehicle No:</Typography>
                                <TextField size="small" name="VehicleNo" value={formData.VehicleNo} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>LR No:</Typography>
                                <TextField size="small" name="LrNo" value={formData.LrNo} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px' }}>Transporter:</Typography>
                                <TextField size="small" name="Transporter" value={formData.Transporter} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', minWidth: '90px', mt: 1 }}>Remark:</Typography>
                                <TextField multiline minRows={4} name="Remark" value={formData.Remark} onChange={handleChange} sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '0.75rem' } }} />
                              </Box>

                            </Box>
                          </Grid>
                        </Grid>
                      )}

                      {activeTab === 1 && (
                        <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>Select Item</Typography>
                              <Box sx={{ position: 'relative' }}>
                                <TextField size="small" placeholder="Search Item..." value={searchQuery} onChange={handleSearchChange} sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                                {searchResults.length > 0 && (
                                  <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, bgcolor: '#fff', border: '1px solid #ccc', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', mt: 0.5, boxShadow: 3 }}>
                                    {searchResults.map((item, index) => (
                                      <Box key={index} onClick={() => handleSelectItem(item)} sx={{ p: 1, '&:hover': { bgcolor: '#f1f5f9' }, cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">{item.part_no}</Typography>
                                        <Typography variant="caption" color="textSecondary">{item.Name_Description}</Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={2}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>Description</Typography>
                              <TextField size="small" name="Description" value={newItem.Description} readOnly sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem', bgcolor: '#f8fafc' } }} />
                            </Grid>

                            <Grid item xs={12} sm={1.5}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>Qty NOS</Typography>
                              <TextField size="small" name="Qty_NOS" value={newItem.Qty_NOS} onChange={(e) => setNewItem({ ...newItem, Qty_NOS: e.target.value })} sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                            </Grid>

                            <Grid item xs={12} sm={1.5}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>QTY KG</Typography>
                              <TextField size="small" name="QTY_KG" value={newItem.QTY_KG} onChange={(e) => setNewItem({ ...newItem, QTY_KG: e.target.value })} sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                            </Grid>

                            <Grid item xs={12} sm={1.5}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>Unit Code</Typography>
                              <TextField size="small" name="Unit_Code" value={newItem.Unit_Code} onChange={(e) => setNewItem({ ...newItem, Unit_Code: e.target.value })} sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                            </Grid>

                            <Grid item xs={12} sm={1.5}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>Remark</Typography>
                              <TextField size="small" name="Remark" value={newItem.Remark} onChange={(e) => setNewItem({ ...newItem, Remark: e.target.value })} sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                            </Grid>

                            <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <button type="button" className="vndrbtn bg-primary border-primary w-100" onClick={addItem} style={{ height: '32px', padding: '0' }}>Add</button>
                            </Grid>
                          </Grid>

                          <div className="table-responsive">
                            <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'auto' }}>
                              <thead className="table-light">
                                <tr>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Item No | Code</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Description</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Qty (Desc)</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Qty (Kg)</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Unit Code</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Remark</th>
                                  <th style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '8px', textAlign: 'center' }}>Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formData.ItemDetails.map((item, index) => (
                                  <tr key={index}>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.ItemNo}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.Description}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.Qty_NOS}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.QTY_KG}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.Unit_Code}</td>
                                    <td style={{ fontSize: '0.75rem', padding: '8px', textAlign: 'center' }}>{item.Remark}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <IconButton size="small" color="error" onClick={() => deleteItem(index)}>
                                        <FaTrash size={12} />
                                      </IconButton>
                                    </td>
                                  </tr>
                                ))}
                                {formData.ItemDetails.length === 0 && (
                                  <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '0.85rem' }}>No items added yet.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Box>
                      )}
                    </form>
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

export default NewGateInward
