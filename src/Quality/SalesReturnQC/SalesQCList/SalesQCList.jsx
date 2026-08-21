import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './SalesQCList.css';
import * as XLSX from "xlsx";
import axios from "axios";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdMarkEmailRead } from "react-icons/md";

const initialRows = [
  {
    id: 1,
    year: "24-25",
    plant: "SHARP",
    qcNo: "SRQC001",
    qcDate: "02/12/24",
    custName: "Ram Kumawat",
    itemNo: "10",
    itemDesc: "CAP OIL LOCK",
    partCode: "FG1106",
    reQty: 100,
    okQty: 95,
    rejQty: 5,
    rewQty: 0,
    reason: "BURR",
    user: "Anupam"
  }
];

const SalesQCList = () => {
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

  const [data, setData] = useState(initialRows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://sellerp-backend.onrender.com/Quality/sales-return-qc/");
        if (res.data && res.data.value && res.data.value.length > 0) {
          setData(res.data.value);
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching sales return QC list:", err);
      }
    };
    fetchData();
  }, []);

  const handleViewPdf = (item) => {
    const viewPath =
      item?.PDF_Link ||
      item?.View ||
      item?.pdf ||
      item?.file ||
      item?.document ||
      item?.Upload_Doc ||
      item?.upload_doc ||
      item?.Document ||
      item?.doc ||
      item?.Doc ||
      item?.File ||
      item?.TC_File ||
      item?.Tc_File ||
      item?.tc_file ||
      item?.Certificate ||
      item?.certificate ||
      item?.Attachment ||
      item?.attachment ||
      item?.url ||
      item?.link;

    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const targetId = item?.id || item?.qcNo || item?.returnNo || "1";
      window.open(`https://sellerp-backend.onrender.com/Quality/SalesReturnQC/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="SalesQCListMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="SalesQCList">
                  <div className="SalesQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0"> Sales Return QC List </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end align-items-center gap-3 mt-3 mt-md-0 flex-wrap">
                        <div className="form-check mb-0">
                          <input type="checkbox" className="form-check-input" id="WithCompanyHeader" />
                          <label htmlFor="WithCompanyHeader" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> With Company Header </label>
                        </div>
                        <button type="button" className="vndrbtn border-0" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                          Export Excel
                        </button>
                        <button type="button" className="vndrbtn border-0" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                          GST Sales Return QC-Query
                        </button>
                      </div>
                    </div>
                  </div>
  
                  {/* Filter Section */}
                  <div className="SalesQCList-filter">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          
                          <div className="col-md-2">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="SHARP">SHARP</option>
                              {/* Add more options as needed */}
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="custNameCheckbox" />
                              <label htmlFor="custNameCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Cust Name: </label>
                            </div>
                            <input type="text" placeholder="Cust Name" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="itemCodeCheckbox" />
                              <label htmlFor="itemCodeCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Item Code: </label>
                            </div>
                            <input type="text" placeholder="Item Code" className="form-control" />
                          </div>
  
                          <div className="col-md-1">
                            <label className="form-label">Reject Reason</label>
                            <select className="form-select">
                              <option value="ALL">ALL</option>
                              <option>ANGLE NOT OK</option>
                              <option>Assembled parts</option>
                              <option>Blackodising NG</option>
                              <option>Broken</option>
                              <option>BURR</option>
                            </select>
                          </div>
  
                          <div className="col-md-1">               
                             <button className="vndrbtn w-100 border-0" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Search</button>          
                          </div>
  
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="SalesQCList-table table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Plant</th>
                          <th>QC No</th>
                          <th>QC Date</th>
                          <th>Cust Name</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Part Code</th>
                          <th>Re. Qty</th>
                          <th>Qk Qty</th>
                          <th>Rej Qty</th>
                          <th>Rew Qty</th>
                          <th>Reason</th>
                          <th>Doc</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id || index}>
                            <td>{index + 1}</td>
                            <td>{item.year || "24-25"}</td>
                            <td>{item.plant || "SHARP"}</td>
                            <td>{item.qcNo || item.sales_return_no || "SRQC001"}</td>
                            <td>{item.qcDate || item.sales_return_date || "02/12/24"}</td>
                            <td>{item.custName || item.cust_name || "Ram Kumawat"}</td>
                            <td>{item.itemNo || "10"}</td>
                            <td>{item.itemDesc || item.item_desc || "CAP OIL LOCK"}</td>
                            <td>{item.partCode || item.item_code || "FG1106"}</td>
                            <td>{item.reQty ?? item.return_qty ?? 100}</td>
                            <td>{item.okQty ?? 95}</td>
                            <td>{item.rejQty ?? 5}</td>
                            <td>{item.rewQty ?? 0}</td>
                            <td>{item.reason || "BURR"}</td>
                            <td><MdMarkEmailRead /></td>
                            <td>{item.user || "Anupam"}</td>
                            <td className="text-center">
                              <FaEye
                                size={18}
                                style={{ cursor: "pointer", color: "#0d6efd" }}
                                onClick={() => handleViewPdf(item)}
                                title="View PDF"
                              />
                            </td>
                            <td><FaEdit style={{ cursor: "pointer", color: "#6c757d" }} /></td>
                            <td><MdDeleteForever style={{ cursor: "pointer", color: "#dc3545" }} size={20} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default SalesQCList