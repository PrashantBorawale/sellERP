import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './ContractirList.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchShifts,  fetchContractors,
  fetchUnitMachines, saveContractorProduction } from "../../../Service/Production.jsx";
  


const ContractirList = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);

    const toggleSideNav = () => {
      setSideNavOpen((prevState) => !prevState);
    };
  
    useEffect(() => {
      if (sideNavOpen) {
        document.body.classList.add("side-nav-open");
      } else {
        document.body.classList.remove("side-nav-open");
      }
    }, [sideNavOpen]);

    const [formData, setFormData] = useState({
      date: "",
      machine: "",
      shift: "",
      item_name: "",
      total_production_qty: "",
      total_production_hours: "",
      total_breakdown_hours: "",
      contractor_name: "",
      job_no: "",
      item_rate: "",
      shift_target_qty: "",
      machine_rate_per_hr: "",
      prod_amt: "",
      bd_amt: "",
      efficiency: "",
    });
  
    // Handle form input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Submitting Data:", formData);
  
      try {
        await saveContractorProduction(formData);
        toast.success("Data saved successfully!");
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("Failed to save data. Please check required fields.");
      }
    };
  
    // Fetch Unit Machines
    const [unitMachines, setUnitMachines] = useState([]);
    const [searchTermMachine, setSearchTermMachine] = useState("");
    useEffect(() => {
      fetchUnitMachines().then(setUnitMachines);
    }, []);
  
    const handleMachineSelect = (machine) => {
      setSearchTermMachine(`${machine.WorkCenterName} (${machine.WorkCenterCode})`);
      setFormData((prev) => ({ ...prev, machine: machine.WorkCenterCode }));
    };
  
    // Fetch Contractors
    const [contractors, setContractors] = useState([]);
    const [searchTermContractor, setSearchTermContractor] = useState("");
    useEffect(() => {
      fetchContractors().then(setContractors);
    }, []);
  
    const [selectedContractor, setSelectedContractor] = useState(null);

    const handleContractorSelect = (contractor) => {
      setSelectedContractor(contractor);
      setSearchTermContractor(""); // Clear search input
    };
    
  
    // Fetch Shifts
    const [shifts, setShifts] = useState([]);
    const [searchTermShift, setSearchTermShift] = useState("");
    useEffect(() => {
      fetchShifts().then(setShifts);
    }, []);
  
    const handleShiftSelect = (shift) => {
      setSearchTermShift(`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`);
      setFormData((prev) => ({ ...prev, shift: shift.Shift_Name }));
    };
  
   
  return (
    <div className="ContractorListMaster">
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
                <div className="ContractorList mt-5">
                  <div className="ContractorList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 col-12 mb-2 mb-md-0">
                        <h5 className="header-title">Contractor Production Entry</h5>
                      </div>
                      <div className="col-md-8 col-12 text-end">
                        <div className="d-flex justify-content-end gap-2 flex-wrap">
                         
                        
                          <button type="button" className="btn">
                            Itemwise Rate
                          </button>
                          <button type="button" className="btn">
                            Machinewise Rate
                          </button>
                          <Link type="button" className="btn" to="/ContractorReport">
                            Contractor List
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ContractorList-Main">
                  
              <form className="form-section" onSubmit={handleSubmit}>
                <div className="row mb-3 text-start">
                  <div className="col-md-2">
                    <label>Date:</label>
                    <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2" style={{ position: "relative" }}>
  <label>Machine:</label>
  <input
    type="text"
    value={searchTermMachine}
    className="form-control"
    placeholder="Search Machine"
    onChange={(e) => setSearchTermMachine(e.target.value)}
    style={{
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  />
  {searchTermMachine && (
    <div
      style={{
        position: "absolute",
        width: "100%",
        maxHeight: "150px",
        overflowY: "auto",
        overflowX: "auto",
        background: "#fff",
       
        borderRadius: "4px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      {unitMachines
        .filter((m) => m.WorkCenterName.includes(searchTermMachine))
        .map((machine) => (
          <div
            key={machine.WorkCenterCode}
            onClick={() => handleMachineSelect(machine)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {machine.WorkCenterName} ({machine.WorkCenterCode})
          </div>
        ))}
    </div>
  )}
</div>
                  <div className="col-md-2">
                    <label>Job No:</label>
                    <input
            type="number"
            name="job_no"
            value={formData.job_no}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2" style={{ position: "relative" }}>
  <label>Shift:</label>
  <input
    type="text"
    value={searchTermShift}
    className="form-control"
    placeholder="Search Shift"
    onChange={(e) => setSearchTermShift(e.target.value)}
    style={{
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  />
  {searchTermShift && (
    <div
      style={{
        position: "absolute",
        width: "100%",
        maxHeight: "150px",
        overflowY: "auto",
        background: "#fff",
        
        borderRadius: "4px",
      
        zIndex: 1000,
      }}
    >
      {shifts
        .filter((s) => s.Shift_Name.toLowerCase().includes(searchTermShift.toLowerCase()))
        .map((shift) => (
          <div
            key={shift.Shift_Name}
            onClick={() => handleShiftSelect(shift)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {shift.Shift_Name} ({shift.Shift_From} - {shift.Shift_Till})
          </div>
        ))}
    </div>
  )}
</div>

                  <div className="col-md-2">
                    <label>Item Name:</label>
                    <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                 
                </div>

                <div className="row mb-3 text-start">
                 
                  <div className="col-md-2">
                    <label>Total Production Qty:</label>
                    <input
            type="number"
            name="total_production_qty"
            value={formData.total_production_qty}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2">
                    <label>Item Rate:</label>
                    <input
            type="number"
            name="item_rate"
            value={formData.item_rate}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2">
                    <label>Production Hours (HH:MM):</label>
                    <input
            type="number"
            name="total_production_hours"
            value={formData.total_production_hours}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2">
                    <label>Shift Target Qty:</label>
                    <input
            type="number"
            name="shift_target_qty"
            value={formData.shift_target_qty}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                  <div className="col-md-2">
                    <label>Total Breakdown Hours:</label>
                    <input
            type="number"
            name="total_breakdown_hours"
            value={formData.total_breakdown_hours}
            onChange={handleChange}
            className="form-control"
          />
                  </div>
                </div>

                <div className="row mb-3 text-start">
                <div className="col-md-2">
                    <label>Machine Rate (Per Hr):</label>
                    <input
            type="number"
            name="machine_rate_per_hr"            value={formData.machine_rate_per_hr}
            onChange={handleChange}
            className="form-control"
          />
                  </div> 
                  <div className="col-md-2" style={{ position: "relative" }}>
  <label>Contractor Name:</label>
  <input
    type="text"
    value={selectedContractor ? selectedContractor.ContractorName : searchTermContractor}
    className="form-control"
    placeholder="Search Contractor"
    onChange={(e) => {
      setSearchTermContractor(e.target.value);
      setSelectedContractor(null); // Reset selected contractor when typing
    }}
    style={{
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  />
  {searchTermContractor && !selectedContractor && (
    <div
      style={{
        position: "absolute",
        width: "100%",
        maxHeight: "150px",
        overflowY: "auto",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      {contractors
        .filter((c) => c.ContractorName.toLowerCase().includes(searchTermContractor.toLowerCase()))
        .map((contractor) => (
          <div
            key={contractor.ContractorName}
            onClick={() => handleContractorSelect(contractor)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {contractor.ContractorName}
          </div>
        ))}
    </div>
  )}
</div>



                  
                  <div className="col-md-2">
                    <label>Downtime Reason:</label>
                    <select
            name="downtime_reason"
            value={formData.downtime_reason}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select</option>
            <option value="A">A</option>
          </select>
                  </div>
                  <div className="col-md-2">
                    <label>Note:</label>
                    <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="form-control"
          ></textarea>
                  </div>
                  <div className="col-md-2">
                    <label>Prod amt:</label>
                    <input
            name="prod_amt"
            type="number"
            value={formData.prod_amt}
            onChange={handleChange}
            className="form-control"
       />
                  </div>

                  <div className="row">
                  <div className="col-md-2">
                    <label>bd amt:</label>
                    <input
            name="bd_amt"
            type="number"
            value={formData.bd_amt}
            onChange={handleChange}
            className="form-control"
         />
                  </div>
                  <div className="col-md-2">
                    <label>Efficiency:</label>
                    <input
                    type="number"
            name="efficiency"
            value={formData.efficiency}
            onChange={handleChange}
            className="form-control"
        />
                  </div>
                  <div className="col-md-2 mt-2">
                  <div className="button-section mt-4 text-end">
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn"  onClick={() => setFormData({})}>Clear</button>
                </div>
                  </div>
                  </div>
                
                </div>

               
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

export default ContractirList
