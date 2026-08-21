import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import { Link } from "react-router-dom";
import Api from "../../../Service/Api.jsx";
import "./Cutwise.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cutwise = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    HSN_Code: "",
    Cust_Name: "",
    Item: "",
    Cust_PO_NO: "",
    CGST: "",
    SGST: "",
    IGST: "",
    UTGST: "",
    EXPORT_CGST: "",
    EXPORT_SGST: "",
    EXPORT_IGST: "",
    CESS: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await Api.get();
      console.log("Data fetched:", result);
      setData(result);
      
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to fetch data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.HSN_Code) newErrors.HSN_Code = "This field is required";
   
    if (!formData.CGST) newErrors.CGST = "This field is required";
    if (!formData.SGST) newErrors.SGST = "This field is required";
    if (!formData.IGST) newErrors.IGST = "This field is required";
    if (!formData.UTGST) newErrors.UTGST = "This field is required";
    if (!formData.EXPORT_CGST) newErrors.EXPORT_CGST = "This field is required";
    if (!formData.EXPORT_SGST) newErrors.EXPORT_SGST = "This field is required";
    if (!formData.EXPORT_IGST) newErrors.EXPORT_IGST = "This field is required";
    if (!formData.CESS) newErrors.CESS = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (editMode) {
          await Api.put(currentId, formData);
          setEditMode(false);
          setCurrentId(null);
          toast.success("Data updated successfully!");
        } else {
          await Api.post(formData);
          toast.success("Data saved successfully!");
        }
        setFormData({
          HSN_Code: "",
          Cust_Name: "",
          Item: "",
          Cust_PO_NO: "",
          CGST: "",
          SGST: "",
          IGST: "",
          UTGST: "",
          EXPORT_CGST: "",
          EXPORT_SGST: "",
          EXPORT_IGST: "",
          CESS: "",
        });
        fetchData();
      } catch (error) {
        console.error("Error saving data", error);
        toast.error("Failed to save data.");
      }
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setCurrentId(item.id); // Ensure you have a unique identifier for editing
  };

  const handleDelete = async (id) => {
    try {
      await Api.delete(id);
      fetchData();
      toast.success("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data", error);
      toast.error("Failed to delete data.");
    }
  };


  return (
    <div className="Cutwise">
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Cutwise1">
                 
                  <div className="cutwiseheader-header mb-4 text-start mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                        Supplier/Customer-Item Wise GST(%) Rate Master
                      </h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <Link to="/" className="btn">
                        Export To Excel
                      </Link>
                    </div>
                  </div>
                  </div>
                  <div className="cutwisemain mt-5">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>HSN/SAC Code<span className="text-danger">*</span></th>
                                  <th>Customer/Supplier Name</th>
                                  <th>Item</th>
                                  <th>Cust.PO No</th>
                                  <th>Domestic</th>
                                  <th>Export</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="HSN_Code"
                                      value={formData.HSN_Code}
                                      onChange={handleChange}
                                      placeholder="HSN/SAC Code"
                                    />
                                    {errors.HSN_Code && <div className="text-danger">{errors.HSN_Code}</div>}
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="Cust_Name"
                                      value={formData.Cust_Name}
                                      onChange={handleChange}
                                      placeholder="Customer/Supplier Name"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="Item"
                                      value={formData.Item}
                                      onChange={handleChange}
                                      placeholder="Item"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="Cust_PO_NO"
                                      value={formData.Cust_PO_NO}
                                      onChange={handleChange}
                                      placeholder="Cust.PO No"
                                    />
                                  </td>
                                  <td>
                                    <thead>
                                      <tr>
                                        <th>CGST (%)<span className="text-danger">*</span></th>
                                        <th>SGST (%)<span className="text-danger">*</span></th>
                                        <th>IGST (%)<span className="text-danger">*</span></th>
                                        <th>UTGST (%)<span className="text-danger">*</span></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="CGST"
                                            value={formData.CGST}
                                            onChange={handleChange}
                                            placeholder="CGST (%)"
                                          />
                                           {errors.CGST && <div className="text-danger">{errors.CGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="SGST"
                                            value={formData.SGST}
                                            onChange={handleChange}
                                            placeholder="SGST (%)"
                                          />
                                           {errors.SGST && <div className="text-danger">{errors.SGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="IGST"
                                            value={formData.IGST}
                                            onChange={handleChange}
                                            placeholder="IGST (%)"
                                          />
                                           {errors.IGST && <div className="text-danger">{errors.IGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="UTGST"
                                            value={formData.UTGST}
                                            onChange={handleChange}
                                            placeholder="UTGST (%)"
                                          />
                                           {errors.UTGST && <div className="text-danger">{errors.UTGST}</div>}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </td>
                                  <td>
                                    <thead>
                                      <tr>
                                        <th>SGST (%)<span className="text-danger">*</span></th>
                                        <th>CGST (%)<span className="text-danger">*</span></th>
                                        <th>IGST (%)<span className="text-danger">*</span></th>
                                        <th>CESS (%)<span className="text-danger">*</span></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="EXPORT_CGST"
                                            value={formData.EXPORT_CGST}
                                            onChange={handleChange}
                                            placeholder="Export CGST (%)"
                                          />
                                           {errors.EXPORT_CGST && <div className="text-danger">{errors.EXPORT_CGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="EXPORT_SGST"
                                            value={formData.EXPORT_SGST}
                                            onChange={handleChange}
                                            placeholder="Export SGST (%)"
                                          />
                                           {errors.EXPORT_SGST && <div className="text-danger">{errors.EXPORT_SGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="EXPORT_IGST"
                                            value={formData.EXPORT_IGST}
                                            onChange={handleChange}
                                            placeholder="Export IGST (%)"
                                          />
                                           {errors.EXPORT_IGST && <div className="text-danger">{errors.EXPORT_IGST}</div>}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="CESS"
                                            value={formData.CESS}
                                            onChange={handleChange}
                                            placeholder="CESS (%)"
                                          />
                                           {errors.CESS && <div className="text-danger">{errors.CESS}</div>}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </td>

                                  <td>
                                    <button
                                      className="btn"
                                      onClick={handleSave}
                                    >
                                      {editMode ? "Update" : "Save"}
                                    </button>
                                    {editMode && (
                                      <button
                                        className="btn"
                                        onClick={() => setEditMode(false)}
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Cutwisetable mt-5">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr.</th>
                              <th>HSN Code</th>
                              <th>Cust Name</th>
                              <th>Item (Optional)</th>
                              <th>Cust PO NO</th>
                              <th>CGST</th>
                              <th>SGST</th>
                              <th>IGST</th>
                              <th>UTGST</th>
                              <th>Export CGST</th>
                              <th>Export SGST</th>
                              <th>Export IGST</th>
                              <th>CESS</th>
                              <th>DBKSrNo</th>
                              <th>User</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, index) => (
                              <tr key={item.HSN_Code}>
                                <td>{index + 1}</td>
                                <td>{item.HSN_Code}</td>
                                <td>{item.Cust_Name}</td>
                                <td>{item.Item}</td>
                                <td>{item.Cust_PO_NO}</td>
                                <td>{item.CGST}</td>
                                <td>{item.SGST}</td>
                                <td>{item.IGST}</td>
                                <td>{item.UTGST}</td>
                                <td>{item.EXPORT_CGST}</td>
                                <td>{item.EXPORT_SGST}</td>
                                <td>{item.EXPORT_IGST}</td>
                                <td>{item.CESS}</td>
                                <td>{item.DBKsSrNo}</td>
                                <td>{item.User}</td>
                                <td>
                                  <button
                                    className="btnwise"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btnwise"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row text-start" style={{ marginTop: "5px" }}>
                    <div className="col-md-12">
                      <h5 style={{ color: "blue" }}>
                        Total Record: {data.length}
                      </h5>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cutwise;
