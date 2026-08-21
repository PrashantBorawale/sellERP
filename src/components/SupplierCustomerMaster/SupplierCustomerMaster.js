"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import NavBar from "../../NavBar/NavBar"
import SideNav from "../../SideNav/SideNav"
import "./SupplierCustomerMaster.css"
import CachedIcon from "@mui/icons-material/Cached"
import BankDetail from "./BankDetail"
import BuyerContactDetail from "./BuyerContactDetail"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  SuplliersaveData,
  getNextNumber,
  // fetchCategories,
  fetchSectors,
  fetchGroups,
  fetchQMSCodes,
  fetchCities,
  // fetchCurrencies,
  fetchCountries,
  fetchPaymentTerms,
  // fetchRegions,
  // fetchStates,

  getSupplierDataById,
  updateSupplierData,
} from "../../Service/Api.jsx"

import ToggleCard1 from "./ToggleCard1.jsx"
import ToggleCardCity from "./ToggleCardCity.jsx"
import ToggleCardCountry from "./ToggleCardCountry.jsx"
import ToggleCardCurrency from "./ToggleCardCurrency.jsx"
import ToggleCardGroup from "./ToggleCardGroup.jsx"
import ToggleCardPayment1 from "./ToggleCardPayment1"
import ToggleCardRegion1 from "./ToggleCardRegion1"
import ToggleCardStateCode1 from "./ToggleCardStateCode1"
import ToggleCardSector from "./ToggleCardSector.jsx"
import ToggleCardQMSCode from "./ToggleCardQMSCode.jsx"
import { Link } from "react-router-dom"
import { fetchCurrencyCodes } from "../../Service/Api.jsx"
import { fetchStateData, fetchStateDetails } from "../../Service/Api.jsx"

const SupplierCustomerMaster = () => {
  const { id } = useParams() // Get the ID from URL if in edit mode
  const navigate = useNavigate()
  const isEditMode = !!id // Check if we're in edit mode

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [bankDetails, setBankDetails] = useState([])
  const [buyerContacts, setBuyerContacts] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  // New button open card
  const [isCardOpen, setIsCardOpen] = useState(false)
  // const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([])
  const [groups, setGroups] = useState([])
  const [qmsCodes, setQMSCodes] = useState([])
  const [cities, setCities] = useState([])
  const [currencyCodes, setCurrencyCodes] = useState([])
  const [countries, setCountries] = useState([])
  const [paymentTerms, setPaymentTerms] = useState([])
  const [states, setStates] = useState([])

  const closeOtherCards = (currentCard) => {
    if (currentCard !== "isCardOpen") setIsCardOpen(false)
    if (currentCard !== "isCardOpenregion") setIsCardOpenregion(false)
    if (currentCard !== "isCardOpenStateCode") setIsCardOpenStateCode(false)
    if (currentCard !== "isCardOpenPayment") setIsCardOpenPayment(false)
    if (currentCard !== "isCardOpenCountry") setIsCardOpenCountry(false)
    if (currentCard !== "isCardOpenCurrency") setIsCardOpenCurrency(false)
    if (currentCard !== "isCardOpenCity") setIsCardOpenCity(false)
    if (currentCard !== "isCardOpenSector") setIsCardOpenSector(false)
    if (currentCard !== "isCardOpenGroup") setIsCardOpenGroup(false)
    if (currentCard !== "isCardOpenQMSCCode") setIsCardOpenQMSCCode(false)
  }

  const toggleCard = () => {
    const next = !isCardOpen
    if (next) closeOtherCards("isCardOpen")
    setIsCardOpen(next)
  }

  const [isCardOpenregion, setIsCardOpenregion] = useState(false)

  const toggleCardregion = () => {
    const next = !isCardOpenregion
    if (next) closeOtherCards("isCardOpenregion")
    setIsCardOpenregion(next)
  }

  const [isCardOpenStateCode, setIsCardOpenStateCode] = useState(false)

  const toggleCardStateCode = () => {
    const next = !isCardOpenStateCode
    if (next) closeOtherCards("isCardOpenStateCode")
    setIsCardOpenStateCode(next)
  }

  const [isCardOpenPayment, setIsCardOpenPayment] = useState(false)

  const toggleCardPayment = () => {
    const next = !isCardOpenPayment
    if (next) closeOtherCards("isCardOpenPayment")
    setIsCardOpenPayment(next)
  }

  const [isCardOpenCountry, setIsCardOpenCountry] = useState(false)

  const toggleCardCountry = () => {
    const next = !isCardOpenCountry
    if (next) closeOtherCards("isCardOpenCountry")
    setIsCardOpenCountry(next)
  }

  const [isCardOpenCurrency, setIsCardOpenCurrency] = useState(false)

  const toggleCardCurrency = () => {
    const next = !isCardOpenCurrency
    if (next) closeOtherCards("isCardOpenCurrency")
    setIsCardOpenCurrency(next)
  }

  const [isCardOpenCity, setIsCardOpenCity] = useState(false)

  const toggleCardCity = () => {
    const next = !isCardOpenCity
    if (next) closeOtherCards("isCardOpenCity")
    setIsCardOpenCity(next)
  }

  const [isCardOpenSector, setIsCardOpenSector] = useState(false)

  const toggleCardSector = () => {
    const next = !isCardOpenSector
    if (next) closeOtherCards("isCardOpenSector")
    setIsCardOpenSector(next)
  }

  const [isCardOpenGroup, setIsCardOpenGroup] = useState(false)

  const toggleCardGroup = () => {
    const next = !isCardOpenGroup
    if (next) closeOtherCards("isCardOpenGroup")
    setIsCardOpenGroup(next)
  }

  const [isCardOpenQMSCCode, setIsCardOpenQMSCCode] = useState(false)

  const toggleCardQMSCCode = () => {
    const next = !isCardOpenQMSCCode
    if (next) closeOtherCards("isCardOpenQMSCCode")
    setIsCardOpenQMSCCode(next)
  }

  const initialFormData = {
    type: "",
    Name: "",
    Address_Line_1: "",
    Region: "",
    PAN_Type: "",
    PAN_NO: "",
    State_Code: "",
    GST_Tax_Code: "",
    Email_Id: "",
    Contact_No: "",
    TCS: "",
    Insurance_Policy_No: "",
    Subcon_Challan: "",
    GL: "",
    number: "",
    Payment_Term: "",
    Country: "",
    Currency: "",
    Pin_Code: "",
    City: "",
    TDS_Rate: "",
    GST_No: "",
    GST_No2: "",
    Invoice_Type: "",
    CIN_No: "",
    Website: "",

    Incoterms: "",
    Insurance_Policy_Expiry_Date: "",
    VAT_TIN: "",
    Montly_Sale: "",

    Sector: "",
    Group: "",
    Distance: "",
    Vendor_Code: "",
    Legal_Name_GST: "",
    Cust_Short_Name: "",
    MSME_Type: "",
    MSME_No: "",
    LUT_No: "",
    ISO: "",
    QMSC_Date: "",
    QMSC_Code: "",
    Active: "",
    Std_Packing: "",
    Old_ERP_Code: "",
    Delivery_Lead_Time: "",
    EORI_No: "",
    Montly_Purchase: "",
    Discount_Per: "",
    LastThreeDigits: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [showGSTNo2, setShowGSTNo2] = useState(false)

  // Load supplier data if in edit mode
  useEffect(() => {
    const fetchSupplierData = async () => {
      if (isEditMode) {
        setIsLoading(true)
        try {
          const data = await getSupplierDataById(id)

          // Check if data is valid before proceeding
          if (!data) {
            console.error("No data received from API")
            toast.error("Failed to load supplier data: No data received")
            navigate("/Vender-List")
            return
          }

          // Check if data is an error response
          if (data.status === false || data.error) {
            console.error("Error in API response:", data)
            toast.error(`Failed to load supplier data: ${data.message || "Unknown error"}`)
            navigate("/Vender-List")
            return
          }

          // Set form data
          setFormData({
            ...data,
            // Convert date strings to proper format for date inputs
            Insurance_Policy_Expiry_Date: data.Insurance_Policy_Expiry_Date
              ? new Date(data.Insurance_Policy_Expiry_Date).toISOString().split("T")[0]
              : "",
            QMSC_Date: data.QMSC_Date ? new Date(data.QMSC_Date).toISOString().split("T")[0] : "",
          })

          // Set GST No2 visibility
          setShowGSTNo2(data.GST_No === "Registered")

          // Set bank details and buyer contacts with defensive programming
          if (data.bank_details && Array.isArray(data.bank_details)) {
            const bankDetailsWithIds = data.bank_details.map((detail, index) => ({
              ...detail,
              id: index + 1, // Add temporary IDs for UI operations
            }))
            setBankDetails(bankDetailsWithIds)
            localStorage.setItem("bankDetails", JSON.stringify(bankDetailsWithIds))
          } else {
            // Initialize with empty array if no bank details or not an array
            setBankDetails([])
            localStorage.setItem("bankDetails", JSON.stringify([]))
          }

          if (data.buyer_contacts && Array.isArray(data.buyer_contacts)) {
            const contactsWithIds = data.buyer_contacts.map((contact, index) => ({
              ...contact,
              id: index + 1, // Add temporary IDs for UI operations
            }))
            setBuyerContacts(contactsWithIds)
            localStorage.setItem("buyerContacts", JSON.stringify(contactsWithIds))
          } else {
            // Initialize with empty array if no buyer contacts or not an array
            setBuyerContacts([])
            localStorage.setItem("buyerContacts", JSON.stringify([]))
          }
        } catch (error) {
          console.error("Error loading supplier data:", error)
          toast.error(`Error loading supplier data: ${error.message || "Unknown error"}`)
          navigate("/Vender-List") // Redirect back to list on error
        } finally {
          setIsLoading(false)
        }
      } else {
        // Clear any existing data when creating a new supplier
        localStorage.removeItem("bankDetails")
        localStorage.removeItem("buyerContacts")
        setBankDetails([])
        setBuyerContacts([])
        setFormData(initialFormData)
      }
    }

    fetchSupplierData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode, navigate])

  // Load bank details and buyer contacts from localStorage
  useEffect(() => {
    if (!isEditMode) {
      const storedBankDetails = localStorage.getItem("bankDetails")
      if (storedBankDetails) {
        setBankDetails(JSON.parse(storedBankDetails))
      }

      const storedBuyerContacts = localStorage.getItem("buyerContacts")
      if (storedBuyerContacts) {
        setBuyerContacts(JSON.parse(storedBuyerContacts))
      }
    }
  }, [isEditMode])

  const validate = () => {
    const newErrors = {}

    // List of fields that are required
    const requiredFields = [
      "type",
      "Name",
      "Address_Line_1",
      "Region",
      "PAN_Type",
      "PAN_NO",
      "State_Code",
      "GST_Tax_Code",
      "number",
      "Payment_Term",
      "Pin_Code",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required"
      }
    })

    // Validate PAN number format
    if (formData.PAN_NO && !validatePAN(formData.PAN_NO)) {
      newErrors.PAN_NO = "Invalid PAN format"
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.Email_Id && !emailPattern.test(formData.Email_Id)) {
      newErrors.Email_Id = "Invalid email format"
    }

    // Validate phone number (example pattern)
    const phonePattern = /^[0-9]{10}$/
    if (formData.Contact_No && !phonePattern.test(formData.Contact_No)) {
      newErrors.Contact_No = "Invalid contact number"
    }

    // Validate GST number format (example pattern)
    if (formData.GST_No === "Registered" && (!formData.GST_No2 || !validateGST(formData.GST_No2))) {
      newErrors.GST_No2 = "Invalid GST number format"
    }

    // Validate URL format for website
    const urlPattern = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i
    if (formData.Website && !urlPattern.test(formData.Website)) {
      newErrors.Website = "Invalid URL format"
    }

    // Validate discount percentage (0-100)
    if (formData.Discount_Per && (formData.Discount_Per < 0 || formData.Discount_Per > 100)) {
      newErrors.Discount_Per = "Discount percentage must be between 0 and 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateGST = (gst) => {
    // GST format: 2 digit state code + 10 digit PAN + 1 digit entity number + 1 digit check digit + Z
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    return gstPattern.test(gst)
  }
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name === "GST_No") {
      setShowGSTNo2(value === "Registered")
    }

    if (name === "GST_No2" && value.length >= 3) {
      // Only update if we have state code and PAN number
      if (formData.State_Code && formData.PAN_NO) {
        const lastThreeDigits = value.slice(-3)
        const updatedGST_No2 = `${formData.State_Code}${formData.PAN_NO}${lastThreeDigits}`
        setFormData((prev) => ({
          ...prev,
          GST_No2: updatedGST_No2,
          LastThreeDigits: lastThreeDigits,
        }))
      }
    }

    // If changing 'type', fetch next number
    if (name === "type") {
      try {
        const nextNumber = await getNextNumber(value)
        setFormData((prev) => ({ ...prev, number: nextNumber, type: value }))
      } catch (error) {
        console.error("Error fetching next number:", error)
        toast.error("Failed to fetch next number")
      }
    }
  }

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panPattern.test(pan)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (formData.type) {  // Ensure 'type' is not empty
  //       const nextNumber = await getNextNumber(formData.type);
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         number: nextNumber,  // Automatically update the 'number' field with next_number
  //       }));
  //     }
  //   };
  //   fetchData();
  // }, [formData.type]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return // Prevent multiple submissions

    setIsSubmitting(true)

    if (validate()) {
      try {
        // Ensure bankDetails and buyerContacts are arrays before mapping
        const safeBank = Array.isArray(bankDetails) ? bankDetails : []
        const safeContacts = Array.isArray(buyerContacts) ? buyerContacts : []

        // Prepare the data with bank details and buyer contacts
        const dataToSubmit = {
          ...formData,
          bank_details: safeBank.map((detail) => ({
            Account_Holder_name: detail.Account_Holder_name || "",
            Bank_Name: detail.Bank_Name || "",
            Branch_Name: detail.Branch_Name || "",
            Bank_Account: detail.Bank_Account || "",
            IFSC_Code: detail.IFSC_Code || "",
          })),
          buyer_contacts: safeContacts.map((contact) => ({
            Person_Name: contact.Person_Name || "",
            Contact_No: contact.Contact_No || "",
            Email: contact.Email || "",
            Department: contact.Department || "",
            Designation: contact.Designation || "",
            Birth_Date: contact.Birth_Date || "",
          })),
        }

        let response
        if (isEditMode) {
          // Update existing supplier
          response = await updateSupplierData(id, dataToSubmit)
        } else {
          // Create new supplier
          response = await SuplliersaveData(dataToSubmit)
        }

        if (response && response.status === false) {
          console.error("Failed to submit form:", response.message)
          toast.error(`Failed to submit form: ${response.message}`)
        } else {
          console.log("Form submitted successfully:", response)
          toast.success(`Supplier ${isEditMode ? "updated" : "created"} successfully!`)

          // Clear the stored bank details and buyer contacts
          localStorage.removeItem("bankDetails")
          localStorage.removeItem("buyerContacts")

          // Redirect to list page after successful submission
          setTimeout(() => {
            navigate("/Vender-List")
          }, 2000)
        }
      } catch (error) {
        console.error("Unexpected error occurred during submission:", error.message)
        toast.error(`Unexpected error occurred: ${error.message || "Unknown error"}`)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log("Validation errors:", errors)
      toast.error("Please fix the validation errors before submitting")
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    if (isEditMode) {
      // In edit mode, reload the original data
      const fetchSupplierData = async () => {
        try {
          const data = await getSupplierDataById(id)
          if (data && !data.status) {
            setFormData({
              ...data,
              Insurance_Policy_Expiry_Date: data.Insurance_Policy_Expiry_Date
                ? new Date(data.Insurance_Policy_Expiry_Date).toISOString().split("T")[0]
                : "",
              QMSC_Date: data.QMSC_Date ? new Date(data.QMSC_Date).toISOString().split("T")[0] : "",
            })
            setShowGSTNo2(data.GST_No === "Registered")

            if (data.bank_details && Array.isArray(data.bank_details)) {
              const bankDetailsWithIds = data.bank_details.map((detail, index) => ({
                ...detail,
                id: index + 1,
              }))
              setBankDetails(bankDetailsWithIds)
              localStorage.setItem("bankDetails", JSON.stringify(bankDetailsWithIds))
            }

            if (data.buyer_contacts && Array.isArray(data.buyer_contacts)) {
              const contactsWithIds = data.buyer_contacts.map((contact, index) => ({
                ...contact,
                id: index + 1,
              }))
              setBuyerContacts(contactsWithIds)
              localStorage.setItem("buyerContacts", JSON.stringify(contactsWithIds))
            }
          }
        } catch (error) {
          console.error("Error reloading supplier data:", error)
        }
      }
      fetchSupplierData()
    } else {
      // In create mode, reset to initial state
      setFormData(initialFormData)
      setErrors({})
      localStorage.removeItem("bankDetails")
      localStorage.removeItem("buyerContacts")
      setBankDetails([])
      setBuyerContacts([])
    }
    toast.info("Form reset")
  }

  // sector
  useEffect(() => {
    fetchSectorsAndSet()
  }, [])

  const fetchSectorsAndSet = async () => {
    try {
      const data = await fetchSectors()
      setSectors(data)
    } catch (error) {
      console.error("Failed to fetch sectors", error)
    }
  }

  // group
  useEffect(() => {
    fetchGroupsAndSet()
  }, [])
  const fetchGroupsAndSet = async () => {
    try {
      const data = await fetchGroups()
      setGroups(data)
    } catch (error) {
      console.error("Failed to fetch groups", error)
    }
  }

  // QMSC
  useEffect(() => {
    fetchQMSCodesAndSet()
  }, [])
  const fetchQMSCodesAndSet = async () => {
    try {
      const data = await fetchQMSCodes()
      setQMSCodes(data)
    } catch (error) {
      toast.error("Failed to fetch QMS Codes")
    }
  }

  // Cities
  useEffect(() => {
    fetchCityAndSet()
  }, [])
  const fetchCityAndSet = async () => {
    try {
      const data = await fetchCities()
      setCities(data)
    } catch (error) {
      toast.error("Failed to fetch cities")
    }
  }

  // currencies
  useEffect(() => {
    const loadCurrencyCodes = async () => {
      const codes = await fetchCurrencyCodes()
      setCurrencyCodes(codes)
    }

    loadCurrencyCodes()
  }, [])

  // Country
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries()
        setCountries(data)
      } catch (error) {
        console.error("Error loading countries:", error)
      }
    }

    loadCountries()
  }, [])

  const handleDropdownChange = (event) => {
    const selectedCountry = event.target.value
    setFormData((prevFormData) => ({
      ...prevFormData,
      Country: selectedCountry,
    }))
  }

  // Payment Terms
  useEffect(() => {
    fetchPaymentTermsAndSet()
  }, [])
  const fetchPaymentTermsAndSet = async () => {
    try {
      const data = await fetchPaymentTerms()
      setPaymentTerms(data)
    } catch (error) {
      console.error("Failed to fetch payment terms:", error)
    }
  }
  // State

  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await fetchStateData()
        setStates(data)
      } catch (error) {
        // Handle error appropriately
      }
    }

    loadStates()
  }, [])

  useEffect(() => {
    const loadStateDetails = async () => {
      if (formData.Region) {
        try {
          const details = await fetchStateDetails(formData.Region)
          setFormData((prevData) => ({
            ...prevData,
            State_Code: details.code,
            GST_Tax_Code: details.gst_code,
            PAN_NO: details.pan_no || "",
          }))
          setCities(details.cities) // Ensure cities is an array of objects
        } catch (error) {
          // Handle error appropriately
        }
      }
    }

    loadStateDetails()
  }, [formData.Region])

  // Gst No

  function handleRefresh() {
    fetchSectorsAndSet()

    fetchQMSCodesAndSet()
    fetchPaymentTermsAndSet()
    fetchGroupsAndSet()
    // fetchCurrencyAndSet();
    // fetchCountryAndSet();
    fetchCityAndSet()
    // fetchCategoriesAndSet();
  }

  // Type supplier

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading supplier data...</p>
      </div>
    )
  }
  return (
    <div className="erp-page">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="card shadow-sm border-0 mb-4" style={{ marginTop: "20px", borderRadius: "12px" }}>
                  <div className="card-body p-4">
                    <div className="erp-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-7">
                          <h5 className="header-title mb-0" style={{ fontWeight: 800, background: "linear-gradient(to right, #2563eb, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.025em" }}>Supplier / Customer Master</h5>
                        </div>
                        <div className="col-md-4 text-end">
                          <Link to={"/Vender-List"} className="btn btn-primary vndrbtn">
                            Supplier/Customer List
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="Suppliermain mt-3">
                      <div className="container-fluid p-0">
                      <div className="row">
                        <div className="col-md-12">
                          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                General
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Buyer / Contact Details
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                              >
                                Bank Details
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent" style={{ border: "none" }}>
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabIndex="0"
                            >
                              <div className="Suppliergernal">
                                <div className="container-fluid">
                                  <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="row text-start">
                                      <div className="col-md-4" style={{ padding: "10px" }}>
                                        <div className="row mb-3">
                                          <label htmlFor="type" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Type: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="type"
                                              name="type"
                                              className="form-select form-select-sm"
                                              value={formData.type}
                                              onChange={handleChange}
                                            >
                                              <option value="" disabled>
                                                Select ..
                                              </option>

                                              <option value="Customer">Customer</option>
                                              <option value="Supplier">Supplier</option>
                                              <option value="Job Work">Job Work</option>
                                              <option value="C/S/J/W">C/S/JW</option>
                                            </select>
                                            {errors.type && <small className="text-danger">{errors.type}</small>}
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label htmlFor="Name" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Name: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Name"
                                              name="Name"
                                              value={formData.Name}
                                              onChange={handleChange}
                                            />
                                            {errors.Name && <small className="text-danger">{errors.Name}</small>}
                                          </div>
                                        </div>
                                        {/* Payment Term */}
                                        <div className="row mb-3">
                                          <label htmlFor="Payment_Term" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Payment Term: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7 d-flex align-items-center gap-2">
                                            <select
                                              id="Payment_Term"
                                              name="Payment_Term"
                                              className="form-select form-select-sm"
                                              value={formData.Payment_Term}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>

                                              {paymentTerms.map((term) => (
                                                <option key={term.id} value={term.id}>
                                                  {term.Days}
                                                </option>
                                              ))}
                                            </select>
                                            <button className="vndrbtn" type="button" onClick={toggleCardPayment} style={{ padding: "0 10px", height: "34px" }}>
                                              Add
                                            </button>
                                            <button
                                              className="vndrbtn d-flex align-items-center justify-content-center"
                                              type="button"
                                              onClick={handleRefresh}
                                              style={{ width: "34px", height: "34px", padding: "0", minWidth: "34px" }}
                                              title="Refresh"
                                            >
                                              <CachedIcon style={{ fontSize: "18px" }} />
                                            </button>
                                          </div>
                                        </div>

                                        {/* PAN No. */}
                                        <div className="row mb-3">
                                          <label className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }} htmlFor="PAN_No">
                                            Pan No. <span className="text-danger">*</span>
                                          </label>

                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="PAN_NO"
                                              name="PAN_NO"
                                              value={formData.PAN_NO}
                                              onChange={handleChange}
                                              maxLength="10"
                                              placeholder="ABCDE1234F"
                                            />
                                            {errors.PAN_NO && <small className="text-danger">{errors.PAN_NO}</small>}
                                          </div>
                                        </div>
                                        {/* PAN type */}
                                        <div className="row mb-3">
                                          <label htmlFor="PAN_Type" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Pan Type:
                                            <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="PAN_Type"
                                              name="PAN_Type"
                                              className="form-select form-select-sm"
                                              value={formData.PAN_Type}
                                              onChange={handleChange}
                                            >
                                              <option value="" disabled>
                                                Select ..
                                              </option>
                                              <option value="Company">Company</option>
                                              <option value="Form">Form</option>
                                              <option value="Indivisual">Indivisual</option>
                                              <option value="Trust">Trust</option>
                                            </select>
                                            {errors.PAN_Type && (
                                              <small className="text-danger">{errors.PAN_Type}</small>
                                            )}
                                          </div>
                                        </div>
                                        {/* Currency */}
                                        <div className="row mb-3">
                                          <label htmlFor="Currency" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Currency:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="Currency"
                                              name="Currency"
                                              className="form-select form-select-sm"
                                              value={formData.Currency}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              {currencyCodes.map((currency) => (
                                                <option key={currency.code} value={currency.code}>
                                                  {currency.code}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                        {/* TDS Rate */}
                                        <div className="row mb-3">
                                          <label htmlFor="TDS_Rate" className="col-md-5 col-form-label fw-bold text-secondary d-flex align-items-center" style={{ fontSize: "0.75rem" }}>
                                            <input className="form-check-input me-2 mt-0" type="checkbox" id="TDS_Rate"
                                              name="TDS_Rate"
                                              checked={formData.TDS_Rate || false}
                                              onChange={handleChange}
                                            />
                                            TDS Rate:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="TDS_Rate"
                                              name="TDS_Rate"
                                              value={formData.TDS_Rate}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.TDS_Rate && (
                                                <small className="text-danger">
                                                  {errors.TDS_Rate}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Invoice Type */}
                                        <div className="row mb-3">
                                          <label htmlFor="Invoice_Type" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Invoice Type:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="Invoice_Type"
                                              name="Invoice_Type"
                                              className="form-select form-select-sm"
                                              value={formData.Invoice_Type}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              <option value="FG">Gernal</option>
                                              <option value="RM">Export</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* CIN No */}
                                        <div className="row mb-3">
                                          <label htmlFor="CIN_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            CIN No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="CIN_No"
                                              name="CIN_No"
                                              value={formData.CIN_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.CIN_No && (
                                                <small className="text-danger">
                                                  {errors.CIN_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Email Id */}
                                        <div className="row mb-3">
                                          <label htmlFor="Email_Id" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Email Id:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="email"
                                              className="form-control form-control-sm"
                                              id="Email_Id"
                                              name="Email_Id"
                                              value={formData.Email_Id}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Email_Id && (
                                                <small className="text-danger">
                                                  {errors.Email_Id}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Contact No */}
                                        <div className="row mb-3">
                                          <label htmlFor="Contact_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Contact No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Contact_No"
                                              name="Contact_No"
                                              value={formData.Contact_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Contact_No && (
                                                <small className="text-danger">
                                                  {errors.Contact_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* TCS */}
                                        <div className="row mb-3">
                                          <label htmlFor="TCS" className="col-md-5 col-form-label fw-bold text-secondary d-flex align-items-center" style={{ fontSize: "0.75rem" }}>
                                            <input className="form-check-input me-2 mt-0" type="checkbox" id="TCS"
                                              name="TCS"
                                              checked={formData.TCS || false}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  TCS: e.target.checked,
                                                })
                                              }
                                            />
                                            TCS:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="TCS"
                                              name="TCS"
                                              value={formData.TCS}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.TCS && (
                                                <small className="text-danger">
                                                  {errors.TCS}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Insurance Policy No */}
                                        <div className="row mb-3">
                                          <label htmlFor="Insurance_Policy_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Insurance Policy No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Insurance_Policy_No"
                                              name="Insurance_Policy_No"
                                              value={formData.Insurance_Policy_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Insurance_Policy_No && (
                                                <small className="text-danger">
                                                  {errors.Insurance_Policy_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Subcon Challan */}
                                        <div className="row mb-3">
                                          <label htmlFor="Subcon_Challan" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Subcon Challan:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Subcon_Challan"
                                              name="Subcon_Challan"
                                              value={formData.Subcon_Challan}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Subcon_Challan && (
                                                <small className="text-danger">
                                                  {errors.Subcon_Challan}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* GL */}
                                        <div className="row mb-3">
                                          <label htmlFor="GL" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            GL:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="GL"
                                              name="GL"
                                              className="form-select form-select-sm"
                                              value={formData.GL}
                                              onChange={handleChange}
                                            >
                                              <option value="" disabled>
                                                Select ..
                                              </option>
                                              <option value="1">One</option>
                                              <option value="2">Two</option>
                                              <option value="3">Three</option>
                                            </select>
                                            {/* {errors.GL && (
                                                <small className="text-danger">
                                                  {errors.GL}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4" style={{ padding: "10px" }}>
                                        <div className="row mb-3">
                                          <label htmlFor="number" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Code No: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="number"
                                              name="number"
                                              value={formData.number}
                                              onChange={handleChange}
                                              readOnly
                                            />
                                            {errors.number && <small className="text-danger">{errors.number}</small>}
                                          </div>
                                        </div>

                                        {/* Country */}
                                        <div className="row mb-3">
                                          <label htmlFor="Country" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Country:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="Country"
                                              name="Country"
                                              className="form-select form-select-sm"
                                              value={formData.Country}
                                              onChange={handleDropdownChange}
                                            >
                                              <option value="">Select ..</option>
                                              {countries.map((country, index) => (
                                                <option key={index} value={country.name}>
                                                  {country.name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>

                                        {/* Region */}
                                        <div className="row mb-3">
                                          <label htmlFor="Region" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            State: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="Region"
                                              name="Region"
                                              className="form-select form-select-sm"
                                              value={formData.Region}
                                              onChange={handleChange}
                                            >
                                              <option value="" disabled>
                                                Select ..
                                              </option>
                                              {states.map((state) => (
                                                <option key={state.code} value={state.name}>
                                                  {state.name}
                                                </option>
                                              ))}
                                            </select>
                                            {errors.Region && <small className="text-danger">{errors.Region}</small>}
                                          </div>
                                        </div>
                                        {/* State Code */}
                                        <div className="row mb-3">
                                          <label htmlFor="State_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            State Code: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              id="State_Code"
                                              name="State_Code"
                                              className="form-control form-control-sm"
                                              value={formData.State_Code}
                                              onChange={handleChange}
                                              placeholder="Enter State Code"
                                            />
                                            {errors.State_Code && (
                                              <small className="text-danger">{errors.State_Code}</small>
                                            )}
                                          </div>
                                        </div>

                                        {/* GST Tax Code */}
                                        <div className="row mb-3">
                                          <label htmlFor="GST_Tax_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            GST Tax Code: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="GST_Tax_Code"
                                              name="GST_Tax_Code"
                                              className="form-select form-select-sm"
                                              value={formData.GST_Tax_Code}
                                              onChange={handleChange}
                                            >
                                              <option value="" disabled>
                                                Select ..
                                              </option>
                                              <option value="CGST + SGST">CGST + SGST</option>
                                              <option value="IGST">IGST</option>
                                              <option value="UTGST">UTGST</option>
                                              <option value="NA">NA</option>
                                            </select>
                                            {errors.GST_Tax_Code && (
                                              <small className="text-danger">{errors.GST_Tax_Code}</small>
                                            )}
                                          </div>
                                        </div>

                                        {/* City */}
                                        <div className="row mb-3">
                                          <label htmlFor="City" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            City:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="City"
                                              name="City"
                                              className="form-select form-select-sm"
                                              value={formData.City}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              {cities.map((city, index) => (
                                                <option key={index} value={city.CityName || city}>
                                                  {city.CityName || city}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>

                                        {/* Address Line 1 */}
                                        <div className="row mb-3">
                                          <label htmlFor="Address_Line_1" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Address : <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <textarea
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Address_Line_1"
                                              name="Address_Line_1"
                                              value={formData.Address_Line_1}
                                              onChange={handleChange}
                                              placeholder="Address"
                                            ></textarea>
                                            {errors.Address_Line_1 && (
                                              <small className="text-danger">{errors.Address_Line_1}</small>
                                            )}
                                          </div>
                                        </div>

                                        {/* Pin Code */}
                                        <div className="row mb-3">
                                          <label htmlFor="Pin_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Pin Code: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Pin_Code"
                                              name="Pin_Code"
                                              value={formData.Pin_Code}
                                              onChange={handleChange}
                                            />
                                            {errors.Pin_Code && (
                                              <small className="text-danger">{errors.Pin_Code}</small>
                                            )}
                                          </div>
                                        </div>

                                        {/* GST Type */}
                                        <div className="row mb-3">
                                          <label htmlFor="GST_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            GST Type: <span className="text-danger">*</span>
                                          </label>
                                          <div className="col-sm-5">
                                            <select
                                              id="GST_No"
                                              name="GST_No"
                                              className="form-select form-select-sm"
                                              value={formData.GST_No}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              <option value="Registered">Registered</option>
                                              <option value="Unregistered">Unregistered</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* GST No */}
                                        {showGSTNo2 && (
                                          <div className="row mb-3">
                                            <div className="form-check col-sm-4">
                                              <label className="form-check-label fw-bold text-secondary" style={{ fontSize: "0.85rem" }} htmlFor="GST_No2">
                                                GST No: <span className="text-danger">*</span>
                                              </label>
                                            </div>
                                            <div className="col-md-7">
                                              <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="GST_No2"
                                                name="GST_No2"
                                                value={formData.GST_No2} // Show only the last 3 characters for input
                                                onChange={handleChange}
                                              />
                                              {errors.GST_No2 && (
                                                <small className="text-danger">{errors.GST_No2}</small>
                                              )}
                                            </div>
                                          </div>
                                        )}

                                        {/* Website */}
                                        <div className="row mb-3">
                                          <label htmlFor="Website" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Website:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Website"
                                              name="Website"
                                              value={formData.Website}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Website && (
                                                <small className="text-danger">
                                                  {errors.Website}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Incoterms */}
                                        <div className="row mb-3">
                                          <label htmlFor="Incoterms" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Incoterms:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Incoterms"
                                              name="Incoterms"
                                              value={formData.Incoterms}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Incoterms && (
                                                <small className="text-danger">
                                                  {errors.Incoterms}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Insurance Policy Expiry Date */}
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="Insurance_Policy_Expiry_Date"
                                            className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}
                                          >
                                            Insurance Policy Expiry Date:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="date"
                                              className="form-control form-control-sm"
                                              id="Insurance_Policy_Expiry_Date"
                                              name="Insurance_Policy_Expiry_Date"
                                              value={formData.Insurance_Policy_Expiry_Date}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Insurance_Policy_Expiry_Date && (
                                                <small className="text-danger">
                                                  {
                                                    errors.Insurance_Policy_Expiry_Date
                                                  }
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* VAT TIN */}
                                        <div className="row mb-3">
                                          <label htmlFor="VAT_TIN" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            VAT TIN:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="VAT_TIN"
                                              name="VAT_TIN"
                                              value={formData.VAT_TIN}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.VAT_TIN && (
                                                <small className="text-danger">
                                                  {errors.VAT_TIN}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>
                                        {/* LUT No */}
                                        <div className="row mb-3">
                                          <label htmlFor="LUT_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            LUT No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="LUT_No"
                                              name="LUT_No"
                                              value={formData.LUT_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.LUT_No && (
                                                <small className="text-danger">
                                                  {errors.LUT_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Monthly Sale */}
                                        <div className="row mb-3">
                                          <label htmlFor="Montly_Sale" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Monthly Sales:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Montly_Sale"
                                              name="Montly_Sale"
                                              value={formData.Montly_Sale}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Montly_Sale && (
                                                <small className="text-danger">
                                                  {errors.Montly_Sale}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4" style={{ padding: "10px" }}>
                                        {/* Sector */}
                                        <div className="row mb-3">
                                          <label htmlFor="Sector" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Sector:
                                          </label>
                                          <div className="col-md-7 d-flex align-items-center gap-2">
                                            <select
                                              id="Sector"
                                              name="Sector"
                                              className="form-select form-select-sm"
                                              value={formData.Sector}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              {sectors.map((sector) => (
                                                <option key={sector.id} value={sector.SectorName}>
                                                  {sector.SectorName}
                                                </option>
                                              ))}
                                            </select>
                                            <button className="vndrbtn" type="button" onClick={toggleCardSector} style={{ padding: "0 10px", height: "34px" }}>
                                              New
                                            </button>
                                            <button
                                              className="vndrbtn d-flex align-items-center justify-content-center"
                                              type="button"
                                              onClick={handleRefresh}
                                              style={{ width: "34px", height: "34px", padding: "0", minWidth: "34px" }}
                                              title="Refresh"
                                            >
                                              <CachedIcon style={{ fontSize: "18px" }} />
                                            </button>
                                          </div>
                                        </div>

                                        {/* Group */}
                                        <div className="row mb-3">
                                          <label htmlFor="Group" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Group:
                                          </label>
                                          <div className="col-md-7 d-flex align-items-center gap-2">
                                            <select
                                              id="Group"
                                              name="Group"
                                              className="form-select form-select-sm"
                                              value={formData.Group}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              {groups.map((g) => (
                                                <option key={g.id} value={g.Group}>
                                                  {g.Group}
                                                </option>
                                              ))}
                                            </select>
                                            <button className="vndrbtn" type="button" onClick={toggleCardGroup} style={{ padding: "0 10px", height: "34px" }}>
                                              New
                                            </button>
                                            <button
                                              className="vndrbtn d-flex align-items-center justify-content-center"
                                              type="button"
                                              onClick={handleRefresh}
                                              style={{ width: "34px", height: "34px", padding: "0", minWidth: "34px" }}
                                              title="Refresh"
                                            >
                                              <CachedIcon style={{ fontSize: "18px" }} />
                                            </button>
                                          </div>
                                        </div>

                                        {/* Distance */}
                                        <div className="row mb-3">
                                          <label htmlFor="Distance" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Distance:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Distance"
                                              name="Distance"
                                              value={formData.Distance}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Distance && (
                                                <small className="text-danger">
                                                  {errors.Distance}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Vendor Code */}
                                        <div className="row mb-3">
                                          <label htmlFor="Vendor_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Vendor Code:{" "}
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Vendor_Code"
                                              name="Vendor_Code"
                                              value={formData.Vendor_Code}
                                              onChange={handleChange}
                                            />
                                            {errors.Vendor_Code && (
                                              <small className="text-danger">{errors.Vendor_Code}</small>
                                            )}
                                          </div>
                                        </div>

                                        {/* Legal Name (As Per GST) */}
                                        <div className="row mb-3">
                                          <label htmlFor="Legal_Name_GST" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Legal Name (As Per GST):
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Legal_Name_GST"
                                              name="Legal_Name_GST"
                                              value={formData.Legal_Name_GST}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Legal_Name_GST && (
                                                <small className="text-danger">
                                                  {errors.Legal_Name_GST}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Cust Short Name */}
                                        <div className="row mb-3">
                                          <label htmlFor="Cust_Short_Name" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Cust Short Name:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Cust_Short_Name"
                                              name="Cust_Short_Name"
                                              value={formData.Cust_Short_Name}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Cust_Short_Name && (
                                                <small className="text-danger">
                                                  {errors.Cust_Short_Name}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* MSME Type */}
                                        <div className="row mb-3">
                                          <label htmlFor="MSME_Type" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            MSME Type:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="MSME_Type"
                                              name="MSME_Type"
                                              className="form-select form-select-sm"
                                              value={formData.MSME_Type}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              <option value="FG">Micro</option>
                                              <option value="RM">Small</option>
                                              <option value="FG">Medium</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* MSME No */}
                                        <div className="row mb-3">
                                          <label htmlFor="MSME_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            MSME No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="MSME_No"
                                              name="MSME_No"
                                              value={formData.MSME_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.MSME_No && (
                                                <small className="text-danger">
                                                  {errors.MSME_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* ISO */}
                                        <div className="row mb-3">
                                          <label htmlFor="ISO" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            ISO:
                                          </label>
                                          <div className="col-md-7">
                                            <select
                                              id="ISO"
                                              name="ISO"
                                              className="form-select form-select-sm"
                                              value={formData.ISO}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              <option value="FG">Yes</option>
                                              <option value="RM">No</option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label htmlFor="QMSC_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            QMSC Code:
                                          </label>
                                          <div className="col-md-7 d-flex align-items-center gap-2">
                                            <select
                                              id="QMSC_Code"
                                              name="QMSC_Code"
                                              className="form-select form-select-sm"
                                              value={formData.QMSC_Code}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              {qmsCodes.map((code) => (
                                                <option key={code.id} value={code.QMSC_Code}>
                                                  {code.QMSC_Code}
                                                </option>
                                              ))}
                                            </select>
                                            <button className="vndrbtn" type="button" onClick={() => toggleCardQMSCCode()} style={{ padding: "0 10px", height: "34px" }}>
                                              New
                                            </button>
                                            <button
                                              className="vndrbtn d-flex align-items-center justify-content-center"
                                              type="button"
                                              onClick={handleRefresh}
                                              style={{ width: "34px", height: "34px", padding: "0", minWidth: "34px" }}
                                              title="Refresh"
                                            >
                                              <CachedIcon style={{ fontSize: "18px" }} />
                                            </button>
                                          </div>
                                        </div>

                                        {/* Active */}
                                        <div className="row mb-3">
                                          <label htmlFor="Active" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Active:
                                          </label>

                                          <div className="col-md-7">
                                            <select
                                              id="Active"
                                              name="Active"
                                              className="form-select form-select-sm"
                                              value={formData.Active}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select ..</option>
                                              <option>Sale</option>
                                              <option>Purchase</option>
                                            </select>
                                            {/* {errors.Active && (
                                                <small className="text-danger">
                                                  {errors.Active}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label htmlFor="QMSC_Date" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            QMSC Date:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="date"
                                              className="form-control form-control-sm"
                                              id="QMSC_Date"
                                              name="QMSC_Date"
                                              value={formData.QMSC_Date}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.QMSC_Date && (
                                                <small className="text-danger">
                                                  {errors.QMSC_Date}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Std Packing */}
                                        <div className="row mb-3">
                                          <label htmlFor="Std_Packing" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Std Packing:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Std_Packing"
                                              name="Std_Packing"
                                              value={formData.Std_Packing}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.Std_Packing && (
                                                <small className="text-danger">
                                                  {errors.Std_Packing}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Old ERP Code */}
                                        <div className="row mb-3">
                                          <label htmlFor="Old_ERP_Code" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Old ERP Code:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Old_ERP_Code"
                                              name="Old_ERP_Code"
                                              value={formData.Old_ERP_Code}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label htmlFor="Delivery_Lead_Time" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Delivery Lead Time:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Delivery_Lead_Time"
                                              name="Delivery_Lead_Time"
                                              value={formData.Delivery_Lead_Time}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>

                                        {/* EORI No */}
                                        <div className="row mb-3">
                                          <label htmlFor="EORI_No" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            EORI No:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="EORI_No"
                                              name="EORI_No"
                                              value={formData.EORI_No}
                                              onChange={handleChange}
                                            />
                                            {/* {errors.EORI_No && (
                                                <small className="text-danger">
                                                  {errors.EORI_No}
                                                </small>
                                              )} */}
                                          </div>
                                        </div>

                                        {/* Monthly Purchase */}
                                        <div className="row mb-3">
                                          <label htmlFor="Montly_Purchase" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Monthly Purchase:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Montly_Purchase"
                                              name="Montly_Purchase"
                                              value={formData.Montly_Purchase}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label htmlFor="Discount_Per" className="col-md-5 col-form-label fw-bold text-secondary" style={{ fontSize: "0.75rem" }}>
                                            Discount Per:
                                          </label>
                                          <div className="col-md-7">
                                            <input
                                              type="text"
                                              className="form-control form-control-sm"
                                              id="Discount_Per"
                                              name="Discount_Per"
                                              value={formData.Discount_Per}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row text-end">
                                      <div className="col-md-12 d-flex justify-content-end gap-3">
                                        <button type="submit" className="vndrbtn">
                                          SAVE
                                        </button>

                                        <button type="button" className="vndrbtn" onClick={handleClear}>
                                          CLEAR
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              {isCardOpen && (
                                <div className="card card-custom">
                                  <div className="card-header d-flex justify-content-between">
                                    <span>Add New Type</span>
                                    <button type="button" className="btn-close" onClick={toggleCard}>
                                      ×
                                    </button>
                                  </div>

                                  <ToggleCard1 />
                                </div>
                              )}
                              {isCardOpenregion && (
                                <div className="card card-region">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Region Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardregion}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardRegion1 />
                                </div>
                              )}
                              {isCardOpenStateCode && (
                                <div className="card card-State">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">State Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardStateCode}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardStateCode1 />
                                </div>
                              )}
                              {isCardOpenPayment && (
                                <div className="card-Payment">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Payment Terms Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardPayment}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardPayment1 />
                                </div>
                              )}
                              {isCardOpenCountry && (
                                <div className="card-Country">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Country Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardCountry}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardCountry />
                                </div>
                              )}
                              {isCardOpenCurrency && (
                                <div className="card-Currency">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Currency Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardCurrency}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardCurrency />
                                </div>
                              )}
                              {isCardOpenCity && (
                                <div className="card-City">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">City Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardCity}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardCity />
                                </div>
                              )}
                              {isCardOpenSector && (
                                <div className="card-Sector">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Sector Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardSector}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardSector />
                                </div>
                              )}
                              {isCardOpenGroup && (
                                <div className="card-Group">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">Customer Group Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardGroup}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardGroup />
                                </div>
                              )}
                              {isCardOpenQMSCCode && (
                                <div className="card-QMSCCode">
                                  <div className="card-header d-flex justify-content-between">
                                    <div className="text-start text-primary">QMSC_Code Master</div>
                                    <button type="button" className="btn-close" onClick={toggleCardQMSCCode}>
                                      ×
                                    </button>
                                  </div>
                                  <ToggleCardQMSCode />
                                </div>
                              )}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabIndex="0"
                            >
                              <BuyerContactDetail buyerContacts={buyerContacts} setBuyerContacts={setBuyerContacts} />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabIndex="0"
                            >
                              <BankDetail bankDetails={bankDetails} setBankDetails={setBankDetails} />
                            </div>
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

// In the BankDetail component
// const BankDetail = ({ bankDetails = [], setBankDetails = () => {} }) => {
//   // Rest of the component code...
// }

// In the BuyerContactDetail component
// const BuyerContactDetail = ({ buyerContacts = [], setBuyerContacts = () => {} }) => {
//   // Rest of the component code...
// }

export default SupplierCustomerMaster
