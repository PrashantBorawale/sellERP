import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./ShiftMaster.css";
import { saveShiftMaster, fetchShiftMasters } from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";

const ShiftMaster = () => {
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

  const [showTable, setShowTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [formData, setFormData] = useState({
    Plant: "",
    Shift_Name: "",
    Shift_Prefix: "",
    Shift_From: "",
    Shift_Till: "",
    Break_Name: "",
    Break_Till: "",
    Break_Time: "",
    Total_Hours: "",
  });
  const [errors, setErrors] = useState({});
  const [shiftData, setShiftData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShiftMasters();
        setShiftData(data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching shift data:", error);
        toast.error("Failed to load shift data");
      }
    };
    fetchData();
  }, []);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "Plant") {
      setSelectedOption(value);
      if (value === "VISHWA S.I.") {
        setShowTable(true);
      } else {
        setShowTable(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "Plant" && key !== "Shift_Prefix") {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await saveShiftMaster(formData);
      toast.success("Data saved successfully");
      const data = await fetchShiftMasters();
      setShiftData(data);
    } catch (error) {
      toast.error("Failed to save data");
    }
  };

  return (
    <div className="erp-page ShiftMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ShiftMaster1 overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Shift Master</h5>
                      <span className="text-muted fw-bold" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                        <i className="fas fa-info-circle me-1"></i> Note: Use 24 Hour clock to enter shift time
                      </span>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start pb-3">
                        <div className="col-md-2 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Plant</label>
                          <select 
                            className="form-select"
                            name="Plant"
                            value={selectedOption}
                            onChange={handleChange1}
                          >
                            <option value="">Select...</option>
                            <option value="VISHWA S.I.">VISHWA S.I.</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-md-2 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Shift Name: <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shift_Name"
                            value={formData.Shift_Name}
                            onChange={handleChange1}
                          />
                          {errors.Shift_Name && <div className="text-danger position-absolute" style={{ fontSize: '0.75rem', bottom: '-18px', left: '10px', whiteSpace: 'nowrap' }}>{errors.Shift_Name}</div>}
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Prefix:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shift_Prefix"
                            value={formData.Shift_Prefix}
                            onChange={handleChange1}
                          />
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>From: <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shift_From"
                            value={formData.Shift_From}
                            onChange={handleChange1}
                          />
                          {errors.Shift_From && <div className="text-danger position-absolute" style={{ fontSize: '0.75rem', bottom: '-18px', left: '10px', whiteSpace: 'nowrap' }}>{errors.Shift_From}</div>}
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Till: <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shift_Till"
                            value={formData.Shift_Till}
                            onChange={handleChange1}
                          />
                          {errors.Shift_Till && <div className="text-danger position-absolute" style={{ fontSize: '0.75rem', bottom: '-18px', left: '10px', whiteSpace: 'nowrap' }}>{errors.Shift_Till}</div>}
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Break Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Break_Name"
                            value={formData.Break_Name}
                            onChange={handleChange1}
                          />
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Break Till:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Break_Till"
                            value={formData.Break_Till}
                            onChange={handleChange1}
                          />
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Brk Time: <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="Break_Time"
                            value={formData.Break_Time}
                            onChange={handleChange1}
                          />
                          {errors.Break_Time && <div className="text-danger position-absolute" style={{ fontSize: '0.75rem', bottom: '-18px', left: '10px', whiteSpace: 'nowrap' }}>{errors.Break_Time}</div>}
                        </div>
                        <div className="col-md-1 position-relative">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Tot Hrs: <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="Total_Hours"
                            value={formData.Total_Hours}
                            onChange={handleChange1}
                          />
                          {errors.Total_Hours && <div className="text-danger position-absolute" style={{ fontSize: '0.75rem', bottom: '-18px', left: '10px', whiteSpace: 'nowrap' }}>{errors.Total_Hours}</div>}
                        </div>
                        <div className="col-md-1 d-flex gap-2 mt-auto">
                          <button className="vndrbtn px-2" onClick={handleSubmit}>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!showTable && (
                    <div className="card shadow-sm border-0 bg-light mt-4">
                      <div className="card-body text-center p-5 text-muted">
                        <i className="fas fa-folder-open me-2" style={{ fontSize: '1.5rem' }}></i> No Found Data
                      </div>
                    </div>
                  )}

                  {showTable && (
                    <div className="table-responsive mt-4">
                      <table className="table table-bordered table-striped">
                        <thead className="table-primary">
                          <tr>
                            <th>Sr.</th>
                            <th>Plant</th>
                            <th>Shift</th>
                            <th>Prefix</th>
                            <th>Shift Time</th>
                            <th>Break time</th>
                            <th>Break Hours</th>
                            <th>Total Hours</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shiftData.map((shift, index) => (
                            <tr key={shift.id}>
                              <td>{index + 1}</td>
                              <td>{shift.Plant}</td>
                              <td>{shift.Shift_Name}</td>
                              <td>{shift.Shift_Prefix}</td>
                              <td>{`${shift.Shift_From} - ${shift.Shift_Till}`}</td>
                              <td>{`${shift.Break_Name} (${shift.Break_Till})`}</td>
                              <td>{shift.Break_Time}</td>
                              <td>{shift.Total_Hours}</td>
                              <td>
                                <button className="btn btn-sm text-primary border-0 p-0" title="Edit">
                                  <i className="fas fa-edit" style={{ fontSize: '16px' }}></i>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-sm text-danger border-0 p-0" title="Delete">
                                  <i className="fas fa-trash" style={{ fontSize: '16px' }}></i>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-success">Active</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftMaster;
