"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../NavBar/NavBar.js"
import SideNav from "../../SideNav/SideNav.js"
import "./ScrapRejection.css"
import { submitScrapRejectionNote, getScrapLineRejectionNote ,
  fetchScrapRejectionDetail,
  updateScrapRejectionNote,} from "../../Service/Production.jsx"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaTrash } from "react-icons/fa6"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"

const ScrapRejection = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const shortYear = localStorage.getItem("Shortyear")

  // State for form fields
  const [series, setSeries] = useState("")
  const [ScrapRejectionNo, setScrapRejectionNo] = useState("")
  const [scrapRejections, setScrapRejections] = useState([]) // Stores multiple table entries

  const [formData, setFormData] = useState({
    Plant: "",
    Series: "",
    TrnType: "",
    ScrapRejectionNo: "",
    ScrapRejectionNoteDate: "",
    ItemNo: "",
    HeatCode: "",
    ScrapRejectionQty: "",
    ScrapRejectRemark: "",
    RejectReason: "",
    cust_SuppName: "",
    ScrapRejectionItem: "",
    ScrapQty: "",
  })

  // Fetch data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditing(true)
      fetchScrapRejectionData(id)
    }
  }, [id])

  // Function to fetch scrap rejection data for editing
const fetchScrapRejectionData = async (rejectionId) => {
  setIsLoading(true);
  try {
    const data = await fetchScrapRejectionDetail(rejectionId);

    if (data) {
      setFormData({
        Plant: data.Plant || "",
        Series: data.Series || "",
        TrnType: data.TrnType || "",
        ScrapRejectionNo: data.ScrapRejectionNo || "",
        ScrapRejectionNoteDate: data.ScrapRejectionNoteDate?.split("T")[0] || "",
        ItemNo: "",
        HeatCode: "",
        ScrapRejectionQty: "",
        ScrapRejectRemark: "",
        RejectReason: "",
        cust_SuppName: data.cust_SuppName || "",
        ScrapRejectionItem: "",
        ScrapQty: "",
      });

      setSeries(data.Series || "");
      setScrapRejectionNo(data.ScrapRejectionNo || "");

      if (data.items && Array.isArray(data.items)) {
        setScrapRejections(data.items);
      }
    }
  } catch (error) {
    console.error("Error fetching scrap rejection data:", error);
    toast.error("Failed to load scrap rejection data");
  } finally {
    setIsLoading(false);
  }
};


  // Fetch next rejection number
  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value
    setSeries(selectedSeries)

    if (selectedSeries === "Line R" && !isEditing) {
      try {
        const nextRejectionNo = await getScrapLineRejectionNote(shortYear)
        if (nextRejectionNo) {
          setScrapRejectionNo(nextRejectionNo)
        } else {
          toast.error("Failed to fetch Scrap Rejection No.")
        }
      } catch (error) {
        toast.error("Error fetching Scrap Rejection No.")
        console.error(error)
        setScrapRejectionNo("")
      }
    } else if (!isEditing) {
      setScrapRejectionNo("")
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Add entry to the table
  const handleAddEntry = () => {
    if (!formData.ItemNo || !formData.ScrapRejectionQty || !formData.ScrapQty) {
      toast.error("Please fill in required fields!")
      return
    }

    setScrapRejections((prev) => [...prev, { ...formData }])

    // Reset item-related fields
    setFormData((prev) => ({
      ...prev,
      ItemNo: "",
      ScrapRejectionQty: "",
      ScrapRejectRemark: "",
      RejectReason: "",
      ScrapRejectionItem: "",
      ScrapQty: "",
    }))
  }

  // Clear all fields
  const clearForm = () => {
    if (isEditing) {
      // If editing, just navigate back to report
      navigate("/ScrapRejectionReport")
      return
    }

    setScrapRejections([])
    setScrapRejectionNo("")
    setSeries("")
    setFormData({
      Plant: "",
      Series: "",
      TrnType: "",
      ScrapRejectionNo: "",
      ScrapRejectionNoteDate: "",
      ItemNo: "",
      HeatCode: "",
      ScrapRejectionQty: "",
      ScrapRejectRemark: "",
      RejectReason: "",
      cust_SuppName: "",
      ScrapRejectionItem: "",
      ScrapQty: "",
    })
  }

  // Submit data
const handleSubmit = async (e) => {
  e.preventDefault();

  if (scrapRejections.length === 0) {
    toast.error("No entries to submit!");
    return;
  }

  const submissionData = {
    scrap_items: scrapRejections,
    ...formData,
    Series: series,
    ScrapRejectionNo,
  };

  if (isEditing) {
    submissionData.id = id;
  }

  console.log("Submitting data:", JSON.stringify(submissionData, null, 2));

  try {
    if (isEditing) {
      await updateScrapRejectionNote(id, submissionData);
      toast.success("Scrap rejection note updated successfully!");
    } else {
      await submitScrapRejectionNote(submissionData);
      toast.success("Scrap rejection note submitted successfully!");
    }

  
  } catch (error) {
    toast.error(isEditing ? "Failed to update scrap rejection note." : "Failed to submit scrap rejection note.");
    console.error(error);
  }
};


  // Handle editing a table row
  const handleEditRow = (index) => {
    const rowToEdit = scrapRejections[index]
    setFormData((prev) => ({
      ...prev,
      ItemNo: rowToEdit.ItemNo || "",
      ScrapRejectionQty: rowToEdit.ScrapRejectionQty || "",
      ScrapRejectRemark: rowToEdit.ScrapRejectRemark || "",
      RejectReason: rowToEdit.RejectReason || "",
      ScrapRejectionItem: rowToEdit.ScrapRejectionItem || "",
      ScrapQty: rowToEdit.ScrapQty || "",
    }))

    // Remove the row from the table
    setScrapRejections((prev) => prev.filter((_, i) => i !== index))
  }

  if (isLoading) {
    return (
      <div className="ScrapRejectionMaster">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="Main-NavBar">
                <NavBar toggleSideNav={toggleSideNav} />
                <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
                <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
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

  return (
    <div className="ScrapRejectionMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ScrapRejection mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="ScrapRejection-header mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <h5 className="header-title text-start">
                            {isEditing ? "Edit Scrap/Line Rejection" : "Scrap/Line Rejection Note"}
                          </h5>
                        </div>
                        <div className="col-md-8">
                          <div className="row align-items-center">
                            <div className="col-md-2">
                              <select
                                id="seriesSelect"
                                className="form-select"
                                name="Plant"
                                value={formData.Plant}
                                onChange={handleInputChange}
                                disabled={isEditing}
                              >
                                <option value="">Select Plant</option>
                                <option value="Produlink">Produlink</option>
                                <option value="FactoryA">Factory A</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 text-end">
                          <Link to="/ScrapRejectionReport" type="button" className="btn">
                            Scrap Rejection Report
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="ScrapRejection-form bg-light p-3 rounded">
                      <div className="row g-3 text-start">
                        <div className="col-md-3">
                          <label htmlFor="series" className="form-label">
                            Series <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                            id="series"
                            value={series}
                            onChange={handleSeriesChange}
                            disabled={isEditing}
                          >
                            <option>Select</option>
                            <option value="Line R">Line R</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label>TM.Type:</label>
                          <select
                            className="form-select"
                            id="type"
                            name="TrnType"
                            value={formData.TrnType}
                            onChange={handleInputChange}
                            disabled={isEditing}
                          >
                            <option>Select</option>
                            <option value="Option 1">Option 1</option>
                          </select>
                        </div>

                        {(series === "Line R" || isEditing) && (
                          <div className="col-md-3">
                            <label htmlFor="scrapRejectionNo" className="form-label">
                              Scrap / Rej. No
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="scrapRejectionNo"
                              value={ScrapRejectionNo || ""}
                              readOnly
                            />
                          </div>
                        )}

                        <div className="col-md-3">
                          <label htmlFor="date" className="form-label">
                            Scrap / Rej. Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="ScrapRejectionNoteDate"
                            value={formData.ScrapRejectionNoteDate}
                            onChange={handleInputChange}
                            disabled={isEditing}
                          />
                        </div>
                      </div>
                      <div className="row g-3 text-start">
                        <div className="col-md-3">
                          <label htmlFor="ItemNo" className="form-label">
                            Item NO/Code:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="ItemNo"
                            value={formData.ItemNo}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="HeatCode" className="form-label">
                            Heat No (Stock):
                          </label>
                          <select
                            className="form-select"
                            id="HeatCode"
                            name="HeatNoCode"
                            value={formData.HeatNoCode}
                            onChange={handleInputChange}
                          >
                            <option>Select</option>
                            <option value="Option 1">Option 1</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="ScrapRejectionQty" className="form-label">
                            Scrap / Rej. Qty <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="ScrapRejectionQty"
                            value={formData.ScrapRejectionQty}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="ScrapRejectionNoteDate" className="form-label">
                            Scrap / Rej. Date:
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="ScrapRejectionNoteDate"
                            value={formData.ScrapRejectionNoteDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row g-3 text-start">
                        <div className="col-md-3">
                          <label htmlFor="ScrapRejectionRemark" className="form-label">
                            Scrap / Rej. Remark:
                          </label>
                          <textarea
                            className="form-control"
                            id="scrapRejRemark"
                            name="ScrapRejectRemark"
                            value={formData.ScrapRejectRemark}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="cust_SuppName" className="form-label">
                            Cust/Supp
                          </label>
                          <input
                            type="type"
                            className="form-control"
                            id="cust_SuppName"
                            name="cust_SuppName"
                            value={formData.cust_SuppName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="ScrapRejectionItem" className="form-label">
                            Scrap / Rej. Item
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ScrapRejectionItem"
                            name="ScrapRejectionItem"
                            value={formData.ScrapRejectionItem}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="ScrapQty" className="form-label">
                            Scrap Qty <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="ScrapQty"
                            value={formData.ScrapQty}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row g-3 text-end mt-2 ">
                        <div className="col-md-12">
                          <button type="button" className="btn" onClick={handleAddEntry}>
                            Add Entry
                          </button>
                        </div>
                      </div>

                      <div className="ScrapRejection-table mt-4">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Sr.</th>
                              <th>Item Desc</th>
                              <th>Reject Qty</th>
                              <th>Reason Note</th>
                              <th>Reason</th>
                              <th>Scrap Qty</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scrapRejections.length > 0 ? (
                              scrapRejections.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.ItemNo}</td>
                                  <td>{item.ScrapRejectionQty}</td>
                                  <td>{item.ScrapRejectRemark}</td>
                                  <td>{item.ScrapRejectionItem}</td>
                                  <td>{item.ScrapQty}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-warning me-2"
                                      onClick={() => handleEditRow(index)}
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() => setScrapRejections(scrapRejections.filter((_, i) => i !== index))}
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7">No entries added</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="row mt-3 justify-content-end">
                        <div className="text-end col-auto d-flex gap-2">
                          {/* Save Entry Button */}
                          <button type="submit" className="btn btn-primary">
                            {isEditing ? "Update Entry" : "Save Entry"}
                          </button>

                          {/* Clear Button */}
                          <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>
                            {isEditing ? "Cancel" : "Clear"}
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

export default ScrapRejection
