"use client"

import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Add default values for props to handle cases where they might be undefined
const BuyerContactDetail = ({ buyerContacts = [], setBuyerContacts = () => {} }) => {
  const [formData, setFormData] = useState({
    Person_Name: "",
    Contact_No: "",
    Email: "",
    Department: "",
    Designation: "",
    Birth_Date: "",
  })
  const [errors, setErrors] = useState({})

  // Function to capitalize first letter of error messages
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Update localStorage when buyer contacts change
  useEffect(() => {
    if (buyerContacts && buyerContacts.length > 0) {
      localStorage.setItem("buyerContacts", JSON.stringify(buyerContacts))
    }
  }, [buyerContacts])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.Person_Name) {
      newErrors.Person_Name = "person name is required"
    }
    if (!formData.Contact_No) {
      newErrors.Contact_No = "contact number is required"
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.Contact_No)) {
      newErrors.Contact_No = "invalid contact number format"
    }
    if (!formData.Email) {
      newErrors.Email = "email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "invalid email format"
    }
    if (!formData.Department) {
      newErrors.Department = "department is required"
    }
    if (!formData.Designation) {
      newErrors.Designation = "designation is required"
    }
    if (!formData.Birth_Date) {
      newErrors.Birth_Date = "birth date is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddBuyerContact = () => {
    if (!validateForm()) return

    // Ensure buyerContacts is an array before proceeding
    const currentContacts = Array.isArray(buyerContacts) ? buyerContacts : []

    if (formData.id) {
      // Update existing contact
      const updatedContacts = currentContacts.map((contact) => (contact.id === formData.id ? { ...formData } : contact))
      setBuyerContacts(updatedContacts)
      toast.success("Contact updated successfully")
    } else {
      // Add new contact
      const newContact = {
        ...formData,
        id: Date.now(), // Use timestamp as temporary ID
      }
      setBuyerContacts([...currentContacts, newContact])
      toast.success("Contact added successfully")
    }

    // Reset form
    setFormData({
      Person_Name: "",
      Contact_No: "",
      Email: "",
      Department: "",
      Designation: "",
      Birth_Date: "",
    })
    setErrors({})
  }

  const handleDeleteBuyerContact = (id) => {
    // Ensure buyerContacts is an array before proceeding
    const currentContacts = Array.isArray(buyerContacts) ? buyerContacts : []
    const filteredContacts = currentContacts.filter((contact) => contact.id !== id)
    setBuyerContacts(filteredContacts)
    toast.success("Contact deleted successfully")
  }
  

  const handleEditBuyerContact = (contact) => {
    setFormData({
      ...contact,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Ensure buyerContacts is an array for rendering
  const safeContacts = Array.isArray(buyerContacts) ? buyerContacts : []

  return (
    <div className="Buyer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-start">
            <h5 style={{ color: "blue" }}>Contact Person Information</h5>
          </div>
        </div>
        <div className="Buyertable">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th  >
                        Person Name<span className="text-danger">*</span>
                      </th>
                      <th  >
                        Contact No<span className="text-danger">*</span>
                      </th>
                      <th  >
                        Email<span className="text-danger">*</span>
                      </th>
                      <th  >
                        Department<span className="text-danger">*</span>
                      </th>
                      <th  >
                        Designation<span className="text-danger">*</span>
                      </th>
                      <th  >
                        Birth Date<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th text-center" >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="Person_Name"
                          value={formData.Person_Name}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="Enter name"
                        />
                        {errors.Person_Name && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Person_Name)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Contact_No"
                          value={formData.Contact_No}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="Enter contact"
                        />
                        {errors.Contact_No && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Contact_No)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="Enter email"
                        />
                        {errors.Email && <small className="text-danger">{capitalizeFirstLetter(errors.Email)}</small>}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Department"
                          value={formData.Department}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="Enter department"
                        />
                        {errors.Department && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Department)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Designation"
                          value={formData.Designation}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="Enter designation"
                        />
                        {errors.Designation && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Designation)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="date"
                          name="Birth_Date"
                          value={formData.Birth_Date}
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                        />
                        {errors.Birth_Date && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Birth_Date)}</small>
                        )}
                      </td>
                      <td style={{ verticalAlign: "middle", padding: "8px" }} className="text-center">
                        <div style={{ marginTop: "12px", height: "40px" }} className="d-flex justify-content-center align-items-center">
                          <button className="vndrbtn" style={{ margin: "0", height: "34px", padding: "0 12px" }} onClick={handleAddBuyerContact}>
                            {formData.id ? (
                              <>
                                <i className="fas fa-save"></i> Save
                              </>
                            ) : (
                              <>
                                <i className="fas fa-plus"></i> Add
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="Buyertable1">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th  >
                        Name
                      </th>
                      <th  >
                        Contact
                      </th>
                      <th  >
                        Email
                      </th>
                      <th  >
                        Department
                      </th>
                      <th  >
                        Designation
                      </th>
                      <th  >
                        Birth Date
                      </th>
                      <th className="blue-th text-center" >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeContacts.length > 0 ? (
                      safeContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.Person_Name}</td>
                          <td>{contact.Contact_No}</td>
                          <td>{contact.Email}</td>
                          <td>{contact.Department}</td>
                          <td>{contact.Designation}</td>
                          <td>{contact.Birth_Date}</td>
                          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                            <div className="d-flex justify-content-center align-items-center">
                              <button className="vndrbtn me-2" onClick={() => handleEditBuyerContact(contact)}>
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="vndrbtn" onClick={() => handleDeleteBuyerContact(contact.id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No contacts added yet
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
      <ToastContainer />
    </div>
  )
}

export default BuyerContactDetail
