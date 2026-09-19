import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
import { saveWorkCenter } from "../../../Service/Api.jsx";
import "react-toastify/dist/ReactToastify.css";
import MachineGroup from "../MachineGroup/MachineGroup.jsx";

const AddNewCard = ({ onSuccess }) => {
  const [isCardVisibleMachine, setCardVisibleMachine] = useState(false);

  const handleAddNewClickMachine = () => {
    setCardVisibleMachine(true);
  };

  const handleCloseCardMachine = () => {
    setCardVisibleMachine(false);
  };

  useEffect(() => {
    // Logic to fetch records can be added here, and then setRecords with the fetched data
  }, []);

  const [formData, setFormData] = useState({
    Plant: "",
    Category: "",
    WorkCenterCode: "",
    WorkCenterName: "",
    WorkCenterType: "",
    Mhr_Rate: "",
    Electricity: "",
    PPM_SPM: "",
    PPM: "",
    BatchQty: "",
    Oil: "",
    Proud_Hours: "",
    Daily_Running_Hr: "",
    Operator: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(`Field ${id} changed to ${value}`);
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.Category) {
      valid = false;
      errors.Category = "This field is required";
    }

    setErrors(errors);
    console.log("Validation result:", valid ? "Valid" : "Invalid", errors);
    return valid;
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted");

    if (!validate()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const response = await saveWorkCenter(formData);
      console.log("Saved Data:", response); // Log the response data to the console
      toast.success("Work Center saved successfully"); // Show success toast
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      ); // Log the error to the console
      toast.error(
        error.response?.data?.message || "Failed to save Work Center"
      ); // Show error toast
    }
  };

  const handleClear = () => {
    setFormData({
      Plant: "",
      Category: "",
      WorkCenterCode: "",
      WorkCenterName: "",
      WorkCenterType: "",
      Mhr_Rate: "",
      Electricity: "",
      PPM_SPM: "",
      PPM: "",
      BatchQty: "",
      Oil: "",
      Proud_Hours: "",
      Daily_Running_Hr: "",
      Operator: "",
    });
    setErrors({});
    toast.info("Form cleared");
    console.log("data clear");
  };

  return (
    <div className="container-fluid">
      <ToastContainer style={{ marginTop: '70px' }} /> {/* Moved outside the form */}
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSave}> {/* Changed onClick to onSubmit */}
            <div className="card-body">
              {/* Form fields */}
              <div className="row mb-3">
                <label htmlFor="Plant" className="col-sm-3 text-start col-form-label">
                  Plant
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select mb-3"
                    id="Plant"
                    name="Plant"
                    value={formData.Plant}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="VISHWA S.I.">VISHWA S.I.</option>
                  </select>
                  {errors.Plant && (
                    <div className="text-danger">{errors.Plant}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12 text-start">
                  <Button variant="contained" type="button" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                    Master
                  </Button>
                </div>
              </div>
              <div className="row mb-3">
                <div className="row mb-3 text-start">
                  <label htmlFor="Category" className="col-sm-3 col-form-label">
                    Category
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select mb-3"
                      id="Category"
                      value={formData.Category}
                      onChange={handleChange}
                      name="Category"
                    >
                      <option value="select">Select</option>
                      <option value="Production">Production</option>
                      <option value="Gernal">Gernal</option>
                    </select>
                    {errors.Category && (
                      <div className="text-danger">{errors.Category}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label htmlFor="WorkCenterCode" className="col-sm-3 col-form-label">
                    Work Center Code
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="WorkCenterCode"
                      name="WorkCenterCode"
                      value={formData.WorkCenterCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label htmlFor="WorkCenterName" className="col-sm-3 col-form-label">
                    Work Center Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="WorkCenterName"
                      name="WorkCenterName"
                      value={formData.WorkCenterName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label htmlFor="WorkCenterType" className="col-sm-3 col-form-label">
                    Work Center Type
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="WorkCenterType"
                      name="WorkCenterType"
                      className="form-select"
                      value={formData.WorkCenterType}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="CENTERLESS GRINDING">CENTERLESS GRINDING</option>
                      <option value="CNC">CNC</option>
                      <option value="DRILLING">DRILLING</option>
                      <option value="GRINDER">GRINDER</option>
                      <option value="INDUCTION">INDUCTION</option>
                      <option value="LATHE">LATHE</option>
                      <option value="MANUAL">MANUAL</option>
                      <option value="MILLING">MILLING</option>
                      <option value="PRESS">PRESS</option>
                      <option value="SECOND OPERATION">SECOND OPERATION</option>
                      <option value="SPM">SPM</option>
                      <option value="TAPPING">TAPPING</option>
                      <option value="THREAD ROLLING">THREAD ROLLING</option>
                      <option value="TROUB">TROUB</option>
                      <option value="VMC">VMC</option>
                    </select>
                  </div>
                  <div className="col-sm-2 d-flex align-items-center">
                    <Button variant="contained" type="button" onClick={handleAddNewClickMachine} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="row mb-3 text-start">
                    <label htmlFor="Mhr_Rate" className="col-sm-6 col-form-label">
                      MHr Rate
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Mhr_Rate"
                        name="Mhr_Rate"
                        value={formData.Mhr_Rate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 text-start">
                    <label htmlFor="Electricity" className="col-sm-6 col-form-label">
                      Electricity
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Electricity"
                        name="Electricity"
                        value={formData.Electricity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-3 text-start">
                    <label htmlFor="PPM_SPM" className="col-sm-6 col-form-label">
                      PPM/SPM
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="PPM_SPM"
                        name="PPM_SPM"
                        value={formData.PPM_SPM}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 text-start">
                    <label htmlFor="BatchQty" className="col-sm-6 col-form-label">
                      Batch Qty
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="BatchQty"
                        name="BatchQty"
                        value={formData.BatchQty}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="row mb-3 text-start">
                    <label htmlFor="Oil" className="col-sm-6 col-form-label">
                      Oil
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Oil"
                        name="Oil"
                        value={formData.Oil}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 text-start">
                    <label htmlFor="Proud_Hours" className="col-sm-6 col-form-label">
                      Proud Hours
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Proud_Hours"
                        name="Proud_Hours"
                        value={formData.Proud_Hours}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-3 text-start">
                    <label htmlFor="Daily_Running_Hr" className="col-sm-6 col-form-label">
                      Daily Running Hr
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Daily_Running_Hr"
                        name="Daily_Running_Hr"
                        value={formData.Daily_Running_Hr}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 text-start">
                    <label htmlFor="Operator" className="col-sm-6 col-form-label">
                      Operator
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="Operator"
                        name="Operator"
                        value={formData.Operator}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-center mt-3">
                  <Button variant="contained" type="submit" sx={{ mr: 2, borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                    Save
                  </Button>
                  <Button variant="outlined" type="button" onClick={handleClear} color="error" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </form>
          {isCardVisibleMachine && (
            <MachineGroup handleCloseCardMachine={handleCloseCardMachine} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewCard;
