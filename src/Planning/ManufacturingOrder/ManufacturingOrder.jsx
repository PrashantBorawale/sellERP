import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPlus, FaPrint, FaRegEye, FaEdit, FaFilePdf, FaFileExcel, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManufacturingOrder.css";

const ManufacturingOrder = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [view, setView] = useState("main"); // "main" or "moPlanning"
  const [showModal, setShowModal] = useState(false);
  
  const [fromDate, setFromDate] = useState("10-05-2026");
  const [toDate, setToDate] = useState("11-05-2026");
  const [plant, setPlant] = useState("SHARP");
  const [moList, setMoList] = useState([]);

  // Modal Form State
  const [modalForm, setModalForm] = useState({
    plant: "SHARP",
    planFrom: "11/05/2026",
    planTo: "11/05/2026",
    totalDays: "",
    planCode: "",
    planCapacity: "",
    totalPlanCapacity: ""
  });
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const planFromRef = React.useRef(null);
  const planToRef = React.useRef(null);

  const renderMainList = () => (
    <div className="ManufacturingOrder p-2">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Header Section */}
      <div className="ManufacturingOrder-header d-flex justify-content-between align-items-center mb-1">
        <h5 className="header-title">Manufacturing Orders List</h5>
        <div className="d-flex gap-1">
          <button className="erp-btn-grey d-flex align-items-center gap-1" onClick={() => setView("moPlanning")}>
            <FaEdit size={12} /> MO Planning
          </button>
          <button className="erp-btn-grey d-flex align-items-center gap-1">
            <FaFileExcel size={12} style={{ color: 'green' }} /> Export To Excel
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="ManufacturingOrder-Filters p-1 border mb-2 bg-light rounded shadow-sm">
        <div className="d-flex align-items-center flex-nowrap gap-2 overflow-auto">
          <div className="d-flex align-items-center gap-1">
            <label className="filter-label whitespace-nowrap">Plant:</label>
            <select className="form-select form-select-xs" style={{ width: '80px' }} value={plant} onChange={(e) => setPlant(e.target.value)}>
              <option value="SHARP">SHARP</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-1">
            <label className="filter-label whitespace-nowrap">From:</label>
            <input type="text" className="form-control form-control-xs" style={{ width: '85px' }} value={fromDate} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <label className="filter-label whitespace-nowrap">To:</label>
            <input type="text" className="form-control form-control-xs" style={{ width: '85px' }} value={toDate} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" id="checkItem" />
            <label htmlFor="checkItem" className="filter-label whitespace-nowrap">Item:</label>
            <input type="text" className="form-control form-control-xs" placeholder="Item Code.." style={{ width: '120px' }} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" id="checkMo" />
            <label htmlFor="checkMo" className="filter-label whitespace-nowrap">MO/Lot:</label>
            <input type="text" className="form-control form-control-xs" style={{ width: '80px' }} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <label className="filter-label whitespace-nowrap">PPC:</label>
            <select className="form-select form-select-xs" style={{ width: '70px' }}>
              <option value="ALL">ALL</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" id="checkUser" />
            <label htmlFor="checkUser" className="filter-label whitespace-nowrap">User:</label>
            <input type="text" className="form-control form-control-xs" style={{ width: '80px' }} />
          </div>
          <div>
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border py-1">
              <FaSearch size={10} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}>
        <table className="table table-bordered erp-table mb-0">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Year</th>
              <th>MO/ Lot No</th>
              <th>Date</th>
              <th>PI No</th>
              <th>PI Date</th>
              <th style={{ width: '30%' }}>Item Details</th>
              <th>Info</th>
              <th>Release to PPC</th>
              <th>User</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {moList.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-5 text-muted">No Data Available</td>
              </tr>
            ) : (
              moList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.year}</td>
                  <td>{item.mo_no}</td>
                  <td>{item.date}</td>
                  <td>{item.pi_no}</td>
                  <td>{item.pi_date}</td>
                  <td>{item.item_details}</td>
                  <td><FaRegEye className="text-primary cursor-pointer" /></td>
                  <td>{item.release_to_ppc}</td>
                  <td>{item.user}</td>
                  <td><FaEdit className="text-success cursor-pointer" /></td>
                  <td><FaTrashAlt className="text-danger cursor-pointer" /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="ManufacturingOrder-Footer d-flex justify-content-between align-items-center mt-1 p-2 bg-light border">
        <div className="record-count">
          Total Record: <span className="text-primary">0</span>
        </div>
        <div className="report-type d-flex align-items-center gap-2">
          <label className="filter-label">Report Type :</label>
          <select className="form-select form-select-xs" style={{ width: '150px' }}>
            <option value="MO Report">MO Report</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderMOPlanningList = () => (
    <div className="ManufacturingOrder p-2">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Header Section */}
      <div className="ManufacturingOrder-header d-flex justify-content-between align-items-center mb-1">
        <h5 className="header-title">MO Planning List</h5>
        <div className="d-flex gap-1">
          <button className="erp-btn-grey d-flex align-items-center gap-1" onClick={() => setShowModal(true)}>
            <FaPlus size={12} /> New MO Plan
          </button>
          <button className="erp-btn-grey d-flex align-items-center gap-1" onClick={() => setView("main")}>
            Back
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="ManufacturingOrder-Filters p-2 border mb-2 bg-light rounded shadow-sm">
        <div className="row g-2 align-items-center">
          <div className="col-auto">
            <label className="filter-label">Plant :</label>
            <select className="form-select form-select-xs d-inline-block ms-1" style={{ width: '100px' }} value={plant} onChange={(e) => setPlant(e.target.value)}>
              <option value="SHARP">SHARP</option>
            </select>
          </div>
          <div className="col-auto">
            <label className="filter-label">From Date :</label>
            <input type="text" className="form-control form-control-xs d-inline-block ms-1" style={{ width: '100px' }} value="11/04/2026" />
          </div>
          <div className="col-auto">
            <label className="filter-label">To Date :</label>
            <input type="text" className="form-control form-control-xs d-inline-block ms-1" style={{ width: '100px' }} value="11/06/2026" />
          </div>
          <div className="col-auto">
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border">
              <FaSearch size={10} /> Search
            </button>
          </div>
          <div className="col-auto">
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border">
              <FaPrint size={10} /> Dispatch Report
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto', border: '1px solid #16bfff' }}>
        <table className="table table-bordered mb-0">
          <tbody>
            <tr>
              <td className="text-start py-2 px-3 text-danger fw-bold" style={{ fontSize: '12px' }}>
                No Data Found !!!
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="ManufacturingOrder-Footer d-flex justify-content-between align-items-center mt-1 p-2 bg-light border">
        <div className="record-count">
          Total Record: <span className="text-primary">0</span>
        </div>
      </div>

      {/* Modal for New MO Plan */}
      {showModal && (
        <div className="mo-modal-overlay">
          <div className="mo-modal-content">
            <div className="mo-modal-header d-flex justify-content-between align-items-center">
              <span>New Manufacturing Order Planning</span>
              <span 
                className="cursor-pointer fw-bold" 
                style={{ fontSize: '18px', padding: '0 5px' }} 
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
            </div>
            <div className="mo-modal-body p-0">
              <table className="table table-bordered mb-0 mo-form-table">
                <tbody>
                  <tr>
                    <td className="bg-light fw-bold" style={{ width: '150px' }}>Plant :</td>
                    <td>
                      <select className="form-select form-select-sm border-0 shadow-none">
                        <option value="SHARP">SHARP</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Plan From :</td>
                    <td>
                       <div className="date-container gap-2">
                        <input 
                          type="date" 
                          ref={planFromRef}
                          className="form-control form-control-sm border-0 shadow-none" 
                          defaultValue="2026-05-11" 
                        />
                        <FaCalendarAlt 
                          size={12} 
                          className="text-muted cursor-pointer" 
                          onClick={() => planFromRef.current && planFromRef.current.showPicker()} 
                        />
                       </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Plan To :</td>
                    <td>
                       <div className="date-container gap-2">
                        <input 
                          type="date" 
                          ref={planToRef}
                          className="form-control form-control-sm border-0 shadow-none" 
                          defaultValue="2026-05-11" 
                        />
                        <FaCalendarAlt 
                          size={12} 
                          className="text-muted cursor-pointer" 
                          onClick={() => planToRef.current && planToRef.current.showPicker()} 
                        />
                       </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Total Days :</td>
                    <td><input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="Enter days.." /></td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Plan Code :</td>
                    <td><input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="Enter plan code.." style={{ width: '200px' }} /></td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Plan Capacity :</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="0.00" style={{ width: '100px' }} />
                        <span className="text-muted" style={{ fontSize: '11px' }}>Kg / Day</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light fw-bold">Total Plan Capacity :</td>
                    <td><input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="Enter capacity.." style={{ width: '150px' }} /></td>
                  </tr>
                </tbody>
              </table>
              <div className="p-2 border-top">
                <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border">
                  <FaPlus size={12} className="text-success" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="ManufacturingOrderMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                {view === "main" ? renderMainList() : renderMOPlanningList()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingOrder;
