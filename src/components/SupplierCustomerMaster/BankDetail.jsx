"use client"

import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const BankDetail = ({ bankDetails = [], setBankDetails = () => {} }) => {
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    Account_Holder_name: "",
    Bank_Name: "",
    Branch_Name: "",
    Bank_Account: "",
    IFSC_Code: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (bankDetails && bankDetails.length > 0) {
      localStorage.setItem("bankDetails", JSON.stringify(bankDetails))
    }
  }, [bankDetails])

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.Account_Holder_name.trim()) {
      newErrors.Account_Holder_name = "Account holder name is required"
    } else if (!/^[A-Za-z\s]+$/.test(formData.Account_Holder_name)) {
      newErrors.Account_Holder_name = "Only alphabets and spaces allowed"
    }

    if (!formData.Bank_Name.trim()) {
      newErrors.Bank_Name = "Bank name is required"
    }

    if (!formData.Branch_Name.trim()) {
      newErrors.Branch_Name = "Branch name is required"
    }

    if (!formData.Bank_Account.trim()) {
      newErrors.Bank_Account = "Bank account number is required"
    } else if (!/^\d{6,20}$/.test(formData.Bank_Account)) {
      newErrors.Bank_Account = "Account number must be 6 to 20 digits"
    }

    if (!formData.IFSC_Code.trim()) {
      newErrors.IFSC_Code = "IFSC code is required"
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC_Code.toUpperCase())) {
      newErrors.IFSC_Code = "Invalid IFSC code format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddOrUpdateBankDetail = () => {
    if (!validateForm()) return

    const currentBankDetails = Array.isArray(bankDetails) ? bankDetails : []

    if (editingId) {
      const updatedBankDetails = currentBankDetails.map((detail) =>
        detail.id === editingId ? { ...formData, id: editingId } : detail
      )
      setBankDetails(updatedBankDetails)
      toast.success("Bank detail updated successfully")
      setEditingId(null)
    } else {
      const newBankDetail = {
        ...formData,
        id: Date.now(),
      }
      setBankDetails([...currentBankDetails, newBankDetail])
      toast.success("Bank detail added successfully")
    }

    setFormData({
      Account_Holder_name: "",
      Bank_Name: "",
      Branch_Name: "",
      Bank_Account: "",
      IFSC_Code: "",
    })
    setErrors({})
  }

  const handleDeleteBankDetail = (id) => {
    const currentBankDetails = Array.isArray(bankDetails) ? bankDetails : []
    const filtered = currentBankDetails.filter((detail) => detail.id !== id)
    setBankDetails(filtered)
    toast.success("Bank detail deleted successfully")
  }
  
  const handleEditBankDetail = (detail) => {
    setFormData({
      Account_Holder_name: detail.Account_Holder_name || "",
      Bank_Name: detail.Bank_Name || "",
      Branch_Name: detail.Branch_Name || "",
      Bank_Account: detail.Bank_Account || "",
      IFSC_Code: detail.IFSC_Code || "",
    })
    setEditingId(detail.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const safeBankDetails = Array.isArray(bankDetails) ? bankDetails : []

  return (
    <div className="Bankdetail">
      <div className="container-fluid">
        <h5 style={{ color: "blue" }}>Customer Bank Details</h5>

        <div className="table-responsive mb-4">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Account Holder Name <span className="text-danger">*</span></th>
                <th>Bank Name <span className="text-danger">*</span></th>
                <th>Branch Name <span className="text-danger">*</span></th>
                <th>Bank A/c No <span className="text-danger">*</span></th>
                <th>IFSC Code <span className="text-danger">*</span></th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {["Account_Holder_name", "Bank_Name", "Branch_Name", "Bank_Account", "IFSC_Code"].map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-control form-control-sm"
                      placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    />
                    {errors[field] && <div className="text-danger">{capitalize(errors[field])}</div>}
                  </td>
                ))}
                <td style={{ verticalAlign: "middle", padding: "8px" }} className="text-center">
                  <div style={{ marginTop: "12px", height: "40px" }} className="d-flex justify-content-center align-items-center">
                    <button className="vndrbtn" style={{ margin: "0", height: "34px", padding: "0 12px" }} onClick={handleAddOrUpdateBankDetail}>
                      <i className={`fas ${editingId ? "fa-edit" : "fa-plus"}`}></i> {editingId ? "Update" : "Add"}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Account Holder Name</th>
                <th>Bank Name</th>
                <th>Branch Name</th>
                <th>Bank Ac No</th>
                <th>IFSC Code</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {safeBankDetails.length > 0 ? (
                safeBankDetails.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.Account_Holder_name}</td>
                    <td>{detail.Bank_Name}</td>
                    <td>{detail.Branch_Name}</td>
                    <td>{detail.Bank_Account}</td>
                    <td>{detail.IFSC_Code}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn me-2" onClick={() => handleEditBankDetail(detail)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn" onClick={() => handleDeleteBankDetail(detail.id)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No bank details added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default BankDetail
