import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./Supervisor.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOperator } from "../../../Service/Api.jsx";
import {
  fetchDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../../../Service/Api.jsx";
import {
  fetchCompanyNames,
  addCompanyName,
  editCompanyName,
  deleteCompanyName,
} from "../../../Service/Api.jsx";
import {
  fetchTypes,
  addType,
  editType,
  deleteType,
} from "../../../Service/Api.jsx";
import Contractor from "../Contractoraaa/Contractoraaa.jsx";
import { fetchContractors } from "../../../Service/Api.jsx";

const Supervisor = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const toggleAddDepartment = () => {
    setShowAddDepartment(!showAddDepartment);
  };

  const [showAddDepartmentCategory, setShowAddDepartmentCategory] =
    useState(false);
  const toggleAddDepartmentCategory = () => {
    setShowAddDepartmentCategory(!showAddDepartmentCategory);
  };

  const [showAddDesignation, setShowAddDesignation] = useState(false);
  const toggleAddDesignation = () => {
    setShowAddDesignation(!showAddDesignation);
  };

  const [showAddContractor, setShowAddContractor] = useState(false);
  const toggleAddContractor = () => {
    setShowAddContractor(!showAddContractor);
  };

  const [formData, setFormData] = useState({
    Department: "",
    Name: "",
    Address: "",
    Contact_No: "",
    Birth_Date: "",
    Salary: "",
    Date_Of_Leaving: "",
    Aadhar_No: "",
    Code: "",
    Designation: "",
    CorrespondingAddress: "",
    Type: "",
    Joining_Sal_Date: "",
    Contractor: "",
    DailyWorkHours: "",
    PanNo: "",
    BankName: "",
    BankAccountNo: "",
    BankIFSC_Code: "",
    SelectCategory: "",
    EnterDeptName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(`Field Changed: ${id}, Value: ${value}`);
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    const requiredFields = ["Department", "Name","Code", "Designation", "Type", "DailyWorkHours"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        tempErrors[field] = "This field is required";
        isValid = false;
      }
    });

    for (let key in tempErrors) {
      console.error(`Field: ${key}, Error: ${tempErrors[key]}`);
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to the console before validation
    console.log("Form Data:", formData);

    if (!validate()) {
      // Log errors to the console if validation fails
      console.error("Validation errors:", errors);
      return;
    }

    try {
      const response = await addOperator(formData);

      // Check the response status code
      if (response.status === 200 || response.status === 201) {
        toast.success("Data saved successfully!");
        console.log("Data saved successfully:", response.data);
      } else {
        toast.error("Failed to save data.");
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Error occurred while saving data.");
    }
  };

  const handleReset = () => {
    setFormData({
      Department: "",
      Name: "",
      Address: "",
      Contact_No: "",
      Birth_Date: "",
      Salary: "",
      Date_Of_Leaving: "",
      Aadhar_No: "",
      Code: "",
      Designation: "",
      CorrespondingAddress: "",
      Type: "",
      Joining_Sal_Date: "",
      Contractor: "",
      DailyWorkHours: "",
      PanNo: "",
      BankName: "",
      BankAccountNo: "",
      BankIFSC_Code: "",
    });
    setErrors({});
  };

  // card 1
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartmentsData();
  }, []);

  const fetchDepartmentsData = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange1 = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.SelectCategory)
      newErrors.SelectCategory = "This field is required";
    if (!formData.EnterDeptName)
      newErrors.EnterDeptName = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        await editDepartment(editingId, formData);
        toast.success("Department updated successfully");
      } else {
        await addDepartment(formData);
        toast.success("Department added successfully");
      }
      fetchDepartmentsData();
      handleReset();
    } catch (error) {
      toast.error("Error saving department");
    }
  };

  const handleEdit = (id) => {
    const department = departments.find((dep) => dep.id === id);
    setFormData({
      SelectCategory: department.SelectCategory,
      EnterDeptName: department.EnterDeptName,
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      toast.success("Department deleted successfully");
      fetchDepartmentsData();
    } catch (error) {
      toast.error("Error deleting department");
    }
  };

  // const handleReset1 = () => {
  //   setFormData({ SelectCategory: "", EnterDeptName: "" });
  //   setErrors({});
  //   setEditingId(null);
  // };

  const [companyNames, setCompanyNames] = useState([]);

  useEffect(() => {
    fetchCompanyNamesData();
  }, []);

  const fetchCompanyNamesData = async () => {
    try {
      const data = await fetchCompanyNames();
      setCompanyNames(data);
    } catch (error) {
      console.error("Error fetching company names:", error);
    }
  };

  const handleChange2 = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm1 = () => {
    const newErrors = {};
    if (!formData.CategoryName)
      newErrors.CategoryName = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!validateForm1()) return;

    try {
      if (editingId) {
        await editCompanyName(editingId, {
          CategoryName: formData.CategoryName,
        });
        toast.success("Company name updated successfully");
      } else {
        await addCompanyName({ CategoryName: formData.CategoryName });
        toast.success("Company name added successfully");
      }
      fetchCompanyNamesData();
      handleReset();
    } catch (error) {
      toast.error("Error saving company name");
    }
  };

  const handleEdit1 = (id, name) => {
    setFormData({ name });
    setEditingId(id);
  };

  const handleDelete1 = async (id) => {
    try {
      await deleteCompanyName(id);
      toast.success("Company name deleted successfully");
      fetchCompanyNamesData();
    } catch (error) {
      toast.error("Error deleting company name");
    }
  };

  // const handleReset = () => {
  //   setFormData({ name: "" });
  //   setErrors({});
  //   setEditingId(null);
  // };

  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypesData();
  }, []);

  const fetchTypesData = async () => {
    try {
      const data = await fetchTypes();
      setTypes(data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleChange3 = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm2 = () => {
    const newErrors = {};
    if (!formData.EnterType) newErrors.EnterType = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    if (!validateForm2()) return;

    try {
      if (editingId) {
        await editType(editingId, { EnterType: formData.EnterType });
        toast.success("Type updated successfully");
      } else {
        await addType({ EnterType: formData.EnterType });
        toast.success("Type added successfully");
      }
      fetchTypesData();
      handleReset();
    } catch (error) {
      toast.error("Error saving type");
    }
  };

  const handleEdit2 = (id, type) => {
    setFormData({ EnterType: type });
    setEditingId(id);
  };

  const handleDelete2 = async (id) => {
    try {
      await deleteType(id);
      toast.success("Type deleted successfully");
      fetchTypesData();
    } catch (error) {
      toast.error("Error deleting type");
    }
  };

  // const handleReset = () => {
  //   setFormData({ EnterType: '' });
  //   setErrors({});
  //   setEditingId(null);
  // };

  // contractors
  const [contractors, setContractors] = useState([]);
  useEffect(() => {
    const loadContractors = async () => {
      try {
        const contractorsData = await fetchContractors();
        setContractors(contractorsData);
      } catch (error) {
        console.error("Failed to fetch contractors:", error);
      }
    };

    loadContractors();
  }, []);

  return (
    <div className="Supervisor">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Supervisor1">
                 
                  <div className="Supervisorupper-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                       <div className="col-md-4">
                        <h5 className="header-title">
                            Operator / Supervisor / Staff Master
                          </h5>
                        </div>
                        <div className="col-md-2 col-sm-6 text-start">
                          <select id="contractor" className="form-select">
                            <option value="">Produlink</option>
                            {/* Add options here */}
                          </select>
                        </div>
                      </div>
                  </div>
                
                  <div className="SupervisorMain mt-5">
                    <div className="container-fluid">
                      <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="row text-start mt-5">
                          <div className="col-md-4 col-sm-12">
                            <div className="row mb-3">
                              <label
                                htmlFor="Department"
                                className="col-sm-4 col-form-label"
                              >
                                Department:
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <select
                                    id="Department"
                                    className="form-select"
                                    value={formData.Department}
                                    onChange={handleChange}
                                  >
                                    <option>Select Department</option>
                                    {departments.map((department) => (
                                      <option
                                        key={department.id}
                                        value={department.SelectCategory}
                                      >
                                        {department.SelectCategory}
                                      </option>
                                    ))}
                                    <option>Production</option>
                                    <option>Maintenance</option>
                                    <option>Quality</option>
                                    <option>Logistics</option>
                                  </select>
                                  <span
                                    type="button"
                                    className="Supbtn"
                                    onClick={toggleAddDepartment} // Toggle modal on click
                                  >
                                    <i className="fas fa-plus"></i>
                                  </span>
                                  <span type="button" className="Supbtn">
                                    <i className="fas fa-sync"></i>
                                  </span>
                                </div>
                                {errors.Department && (
                                  <div className="text-danger">
                                    {errors.Department}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Name"
                                className="col-sm-4 col-form-label"
                              >
                                Name:<span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Name"
                                  value={formData.Name}
                                  onChange={handleChange}
                                />
                                {errors.Name && (
                                  <div className="text-danger">
                                    {errors.Name}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Address"
                                className="col-sm-4 col-form-label"
                              >
                                Address:
                              </label>
                              <div className="col-sm-8">
                                <textarea
                                  type="text"
                                  id="Address"
                                  className="form-control"
                                  rows="3"
                                  value={formData.Address}
                                  onChange={handleChange}
                                ></textarea>
                                {/* {errors.Address && (
                                  <div className="text-danger">
                                    {errors.Address}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Contact_No"
                                className="col-sm-4 col-form-label"
                              >
                                Contact No:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Contact_No"
                                  value={formData.Contact_No}
                                  onChange={handleChange}
                                />
                                {/* {errors.Contact_No && (
                                  <div className="text-danger">
                                    {errors.Contact_No}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Birth_Date"
                                className="col-sm-4 col-form-label"
                              >
                                Birth Date:
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <input
                                    type="date"
                                    id="Birth_Date"
                                    className="form-control"
                                    value={formData.Birth_Date}
                                    onChange={handleChange}
                                  />
                                  {/* {errors.Birth_Date && (
                                    <div className="text-danger">
                                      {errors.Birth_Date}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Salary"
                                className="col-sm-4 col-form-label"
                              >
                                Salary:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Salary"
                                  value={formData.Salary}
                                  onChange={handleChange}
                                />
                                {/* {errors.Salary && (
                                  <div className="text-danger">
                                    {errors.Salary}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Date_Of_Leaving"
                                className="col-sm-4 col-form-label"
                              >
                                Date of Leaving:
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <input
                                    type="date"
                                    id="Date_Of_Leaving"
                                    className="form-control"
                                    value={formData.Date_Of_Leaving}
                                    onChange={handleChange}
                                  />
                                  {/* {errors.Date_Of_Leaving && (
                                    <div className="text-danger">
                                      {errors.Date_Of_Leaving}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Aadhar_No"
                                className="col-sm-4 col-form-label"
                              >
                                Aadhar_No No:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Aadhar_No"
                                  value={formData.Aadhar_No}
                                  onChange={handleChange}
                                />
                                {/* {errors.Aadhar_No && (
                                  <div className="text-danger">
                                    {errors.Aadhar_No}
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="row mb-3">
                              <label
                                htmlFor="Code"
                                className="col-sm-4 col-form-label"
                              >
                                Code:<span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Code"
                                  value={formData.Code}
                                  onChange={handleChange}
                                />
                                {errors.Code && (
                                  <div className="text-danger">
                                    {errors.Code}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Designation"
                                className="col-sm-4 col-form-label"
                              >
                                Designation:
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <select
                                    id="Designation"
                                    className="form-select"
                                    value={formData.Designation}
                                    onChange={handleChange}
                                  >
                                    <option>Select..</option>
                                    {types.map((type) => (
                                      <option
                                        key={type.id}
                                        value={type.EnterType}
                                      >
                                        {type.EnterType}
                                      </option>
                                    ))}
                                    <option>Supervisor</option>
                                    <option>Manager</option>
                                    <option>Staff</option>
                                  </select>
                                  <span
                                    type="button"
                                    className="Supbtn"
                                    onClick={toggleAddDesignation} // Toggle modal on click
                                  >
                                    <i className="fas fa-plus"></i>
                                  </span>
                                  <span type="button" className="Supbtn">
                                    <i className="fas fa-sync"></i>
                                  </span>

                                  {errors.Designation && (
                                    <div className="text-danger">
                                      {errors.Designation}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="CorrespondingAddress"
                                className="col-sm-4 col-form-label"
                              >
                                Corresponding Address:
                              </label>
                              <div className="col-sm-8">
                                <textarea
                                  id="CorrespondingAddress"
                                  className="form-control"
                                  rows="3"
                                  value={formData.CorrespondingAddress}
                                  onChange={handleChange}
                                ></textarea>
                                {/* {errors.CorrespondingAddress && (
                                  <div className="text-danger">
                                    {errors.CorrespondingAddress}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Type"
                                className="col-sm-4 col-form-label"
                              >
                                Type:<span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <select
                                  id="Type"
                                  className="form-select"
                                  value={formData.Type}
                                  onChange={handleChange}
                                >
                                  <option>Select..</option>
                                  <option value="operator">Operator</option>
                                  <option value="supervisor">Supervisor</option>
                                   <option value="staff">Staff</option>
                                </select>
                                {errors.Type && (
                                  <div className="text-danger">
                                    {errors.Type}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Joining_Sal_Date"
                                className="col-sm-4 col-form-label"
                              >
                                Joining Date:
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <input
                                    type="date"
                                    id="Joining_Sal_Date"
                                    className="form-control"
                                    value={formData.Joining_Sal_Date}
                                    onChange={handleChange}
                                  />
                                  {/* {errors.Joining_Sal_Date && (
                                    <div className="text-danger">
                                      {errors.Joining_Sal_Date}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="Contractor"
                                className="col-sm-4 col-form-label"
                              >
                                Contractor:
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <select
                                    id="Contractor"
                                    className="form-select"
                                    value={formData.Contractor}
                                    onChange={handleChange}
                                  >
                                    <option>Select..</option>
                                    {contractors.map((contractor) => (
                                      <option
                                        key={contractor.id}
                                        value={contractor.ContractorName}
                                      >
                                        {contractor.ContractorName}
                                      </option>
                                    ))}
                                    <option>Supervisor</option>
                                    <option>Manager</option>
                                    <option>Staff</option>
                                  </select>
                                  <span
                                    type="button"
                                    className="Supbtn"
                                    onClick={toggleAddContractor} // Toggle modal on click
                                  >
                                    <i className="fas fa-plus"></i>
                                  </span>
                                  <span type="button" className="Supbtn">
                                    <i className="fas fa-sync"></i>
                                  </span>
                                  {/* {errors.Contractor && (
                                    <div className="text-danger">
                                      {errors.Contractor}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="DailyWorkHours"
                                className="col-sm-4 col-form-label"
                              >
                                Daily Working Hours:
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-sm-8">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="DailyWorkHours"
                                    value={formData.DailyWorkHours}
                                    onChange={handleChange}
                                  />
                                  {errors.DailyWorkHours && (
                                    <div className="text-danger">
                                      {errors.DailyWorkHours}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="PanNo"
                                className="col-sm-4 col-form-label"
                              >
                                PAN No:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="PanNo"
                                  value={formData.PanNo}
                                  onChange={handleChange}
                                />
                                {/* {errors.PanNo && (
                                  <div className="text-danger">
                                    {errors.PanNo}
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="row mb-3">
                              <label
                                htmlFor="BankName"
                                className="col-sm-4 col-form-label"
                              >
                                Bank Name:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="BankName"
                                  value={formData.BankName}
                                  onChange={handleChange}
                                />
                                {/* {errors.BankName && (
                                  <div className="text-danger">
                                    {errors.BankName}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="BankAccountNo"
                                className="col-sm-4 col-form-label"
                              >
                                Bank Account No:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="BankAccountNo"
                                  value={formData.BankAccountNo}
                                  onChange={handleChange}
                                />
                                {/* {errors.BankAccountNo && (
                                  <div className="text-danger">
                                    {errors.BankAccountNo}
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="BankIFSC_Code"
                                className="col-sm-4 col-form-label"
                              >
                                Bank IFSC Code:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="BankIFSC_Code"
                                  value={formData.BankIFSC_Code}
                                  onChange={handleChange}
                                />
                                {/* {errors.BankIFSC_Code && (
                                  <div className="text-danger">
                                    {errors.BankIFSC_Code}
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-end">
                            <button type="submit" className="btn">
                              SAVE
                            </button>
                            <button
                              type="reset"
                              className="btn"
                              onClick={handleReset}
                            >
                              CLEAR
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* Add Department Modal/Card */}
                      {showAddDepartment && (
  <div className="modal-container">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Department Master</h5>
        <button
          type="button"
          className="btn"
          aria-label="Close"
          onClick={toggleAddDepartment}
        >
          ×
        </button>
      </div>
      <div className="card-body">
        <div className="form-container">
          <form onSubmit={handleSubmit1}>
            <div className="row mb-3 text-start">
              <div className="col-md-6">
                <label htmlFor="SelectCategory" className="form-label">
                  Department:
                </label>
                <div className="input-group">
                  <select
                    id="SelectCategory"
                    className="form-select"
                    value={formData.SelectCategory}
                    onChange={handleChange1}
                  >
                    <option>Select Category</option>
                    {companyNames.map((card) => (
                      <option key={card.id} value={card.CategoryName}>
                        {card.CategoryName}
                      </option>
                    ))}
                    <option>Production</option>
                    <option>Maintenance</option>
                    <option>Quality</option>
                    <option>Logistics</option>
                  </select>
                  <button
                    type="button"
                    className="btn ms-1"
                    onClick={toggleAddDepartmentCategory}
                  >
                    New
                  </button>
                  <button type="button" className="btn ms-1">
                    <i className="fas fa-sync"></i>
                  </button>
                </div>
                {errors.SelectCategory && (
                  <div className="text-danger">{errors.SelectCategory}</div>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="EnterDeptName" className="form-label">
                  Enter Dept Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="EnterDeptName"
                  value={formData.EnterDeptName}
                  onChange={handleChange}
                />
                {errors.EnterDeptName && (
                  <div className="text-danger">{errors.EnterDeptName}</div>
                )}
              </div>
              <div className="col-md-2" style={{marginTop:"31px"}}>
                <button className="btn" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Category</th>
                <th>Department</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dep, index) => (
                <tr key={dep.id}>
                  <td>{index + 1}</td>
                  <td>{dep.SelectCategory}</td>
                  <td>{dep.EnterDeptName}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleEdit(dep.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleDelete(dep.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
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
)}


                      {/* Add Department Modal/Card */}
                      {showAddDepartmentCategory && (
                        <div className="Category-container">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-title">Add New Category</h5>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={toggleAddDepartmentCategory}
                              >
                                X
                              </button>
                            </div>
                            <div className="card-body">
                              <div className="container">
                                <div className="row text-start">
                                  <div className="col-md-12">
                                    <p>Department Category Master</p>
                                  </div>
                                </div>
                                <div className="row text-start">
                                  <form onSubmit={handleSubmit2}>
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="CategoryName"
                                        className="col-md-4 col-form-label"
                                      >
                                        Department Category Name:
                                      </label>

                                      <div className="col-md-4">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="CategoryName"
                                          value={formData.CategoryName}
                                          onChange={handleChange2}
                                        />
                                        {errors.CategoryName && (
                                          <div className="text-danger">
                                            {errors.CategoryName}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-sm-1">
                                        <button className="adddepbtn">
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="table-responsive">
                                  <table className="table table-striped">
                                    <thead>
                                      <tr>
                                        <th>Sr. No.</th>
                                        <th>Department Category Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {companyNames.map((company, index) => (
                                        <tr key={company.id}>
                                          <td>{index + 1}</td>
                                          <td>{company.CategoryName}</td>
                                          <td>
                                            <button
                                              style={{ border: "none" }}
                                              onClick={() =>
                                                handleEdit1(
                                                  company.id,
                                                  company.CategoryName
                                                )
                                              }
                                            >
                                              <i className="fas fa-edit"></i>
                                            </button>
                                          </td>
                                          <td>
                                            <button
                                              style={{ border: "none" }}
                                              onClick={() =>
                                                handleDelete1(company.id)
                                              }
                                            >
                                              <i className="fas fa-trash-alt"></i>
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
                        </div>
                      )}
                      {/* Add Department Modal/Card */}
                      {showAddDesignation && (
                        <div className="designation-container">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-title">Operation Type</h5>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={toggleAddDesignation}
                              >
                                X
                              </button>
                            </div>
                            <div className="card-body">
                              <div className="container">
                                <div className="row text-start">
                                  <div className="col-md-12">
                                    <p>Operation Type</p>
                                  </div>
                                </div>
                                <div className="row text-start">
                                  <form onSubmit={handleSubmit3}>
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="EnterType"
                                        className="col-md-3 col-form-label"
                                      >
                                        Enter Type:
                                      </label>

                                      <div className="col-md-4">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="EnterType"
                                          value={formData.EnterType}
                                          onChange={handleChange3}
                                        />
                                        {errors.EnterType && (
                                          <div className="text-danger">
                                            {errors.EnterType}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-sm-1">
                                        <button className="adddepbtn">
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="table-responsive">
                                  <table className="table table-striped">
                                    <thead>
                                      <tr>
                                        <th>Sr. No.</th>
                                        <th>Company Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {types.map((type, index) => (
                                        <tr key={type.id}>
                                          <td>{index + 1}</td>
                                          <td>{type.EnterType}</td>
                                          <td>
                                            <button
                                              style={{ border: "none" }}
                                              onClick={() =>
                                                handleEdit2(
                                                  type.id,
                                                  type.EnterType
                                                )
                                              }
                                            >
                                              <i className="fas fa-edit"></i>
                                            </button>
                                          </td>
                                          <td>
                                            <button
                                              style={{ border: "none" }}
                                              onClick={() =>
                                                handleDelete2(type.id)
                                              }
                                            >
                                              <i className="fas fa-trash-alt"></i>
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
                        </div>
                      )}
                      {showAddContractor && (
                        <div className="Contractor-container">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-title">Contractor Type</h5>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={toggleAddContractor}
                              >
                                X
                              </button>
                            </div>
                            <Contractor />
                          </div>
                        </div>
                      )}
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

export default Supervisor;
