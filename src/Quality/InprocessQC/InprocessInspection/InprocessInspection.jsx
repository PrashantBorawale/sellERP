import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// import { FaPlus } from "react-icons/fa";
import Cached from "@mui/icons-material/Cached.js";
import { FaXTwitter } from "react-icons/fa6";
import "./InprocessInspection.css";
import axios from "axios";
import * as XLSX from "xlsx";

const InprocessInspection = () => {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    navigate("/InprocessInspectionDetails", { state: { selectedItem: item } });
  };

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();
  const selectedRow = location.state?.selectedRow || {};

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

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProductionEntries = async () => {
      try {
        const response = await axios.get("https://sellerp-backend.onrender.com/Quality/production/qc-entries/");
        if (response.data && response.data.value) {
          setData([...response.data.value].reverse());
        } else if (Array.isArray(response.data)) {
          setData([...response.data].reverse());
        }
      } catch (error) {
        console.error("Error fetching production-entries:", error);
      }
    };
    fetchProductionEntries();
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
    } else if (item?.id || item?.Prod_no) {
      const targetId = item?.id || item?.Prod_no;
      window.open(`https://sellerp-backend.onrender.com/Production/ProductionEntry/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF document available for this record.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExportExcel = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = data.map((item, index) => {
      const formattedDate = item.Date
        ? new Date(item.Date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
        : "-";
        
      return {
        "Sr.": index + 1,
        "Type": item.Series || "-",
        "Prod No": item.Prod_no || "-",
        "Date": formattedDate,
        "Item No": item.item || "-",
        "Item Code": item.ItemCode || "-",
        "Item Desc": item.ItemDescription || "-",
        "Dia": "-",
        "Operation Name": item.operation || "-",
        "Operation": item.operation || "-",
        "Shift Name": item.shift || "-",
        "Machine": item.unit_machine || "-",
        "Heat No": item.lot_no ? item.lot_no.split('|')[0] : "-",
        "Prod Qty": item.prod_qty || "0",
        "QC Pendding Qty": "-",
        "Rework Qty": item.rework_qty || "0",
        "Reject Qty": item.reject_qty || "0"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inprocess Inspection");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Inprocess_Inspection.xlsx");
  };

  return (
    <div className="InprocessInspectionMaster">
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
                <div className="InprocessInspection">
                  <div className="InprocessInspection-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0">Inprocess Inspection</h5>
                      </div>
                      <div className="col-md-8 d-flex justify-content-md-end mt-3 mt-md-0">
                        <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="InprocessInspection-filter">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          <div className="col-md-2">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="SHARP">SHARP</option>
                              {/* Add more options as needed */}
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Operation :</label>
                            <select className="form-select">
                              <option>All</option>
                              <option>Our_F4</option>
                              <option>Vendor_F4</option>
                              <option>Non Returnable</option>
                              <option>Vendor_Scrap</option>
                              <option>Cust_Rework_In</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="itemCodeCheckbox" />
                              <label htmlFor="itemCodeCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Item Code: </label>
                            </div>
                            <input type="text" placeholder="Item Code" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="heatCodeCheckbox" />
                              <label htmlFor="heatCodeCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> HeatCode: </label>
                            </div>
                            <input type="text" placeholder="Heat Code" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="prodNoCheckbox" />
                              <label htmlFor="prodNoCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Prod No: </label>
                            </div>
                            <input type="text" placeholder="" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="barCodeCheckbox" />
                              <label htmlFor="barCodeCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> BarCode: </label>
                            </div>
                            <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="InprocessInspection-table table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Type</th>
                            <th scope="col">Prod No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Item No</th>
                            <th scope="col">Item Code</th>
                            <th scope="col">Item Desc</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Operation Name</th>
                            <th scope="col">Operation</th>
                            <th scope="col">Shift Name</th>
                            <th scope="col">Machine </th>
                            <th scope="col">Heat No </th>
                            <th scope="col">Prod Qty </th>
                            <th scope="col">QC Pendding Qty </th>
                            <th scope="col">Rework Qty</th>
                            <th scope="col"> Reject Qty</th>
                            <th scope="col"> # </th>
                            <th scope="col"> Select </th>
                            <th scope="col">Veiw </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => {
                              const formattedDate = item.Date
                                ? new Date(item.Date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                                : "-";
                              return (
                                <tr key={item.id || index}>
                                  <td>{indexOfFirstItem + index + 1}</td>
                                  <td>{item.Series || "-"}</td>
                                  <td>{item.Prod_no || "-"}</td>
                                  <td>{formattedDate}</td>
                                  <td>{item.item || "-"}</td>
                                  <td>{item.ItemCode || "-"}</td>
                                  <td>{item.ItemDescription || "-"}</td>
                                  <td>-</td>
                                  <td>{item.operation || "-"}</td>
                                  <td>{item.operation || "-"}</td>
                                  <td>{item.shift || "-"}</td>
                                  <td>{item.unit_machine || "-"}</td>
                                  <td>{item.lot_no ? item.lot_no.split('|')[0] : "-"}</td>
                                  <td>{item.prod_qty || "0"}</td>
                                  <td>-</td>
                                  <td>{item.rework_qty || "0"}</td>
                                  <td>{item.reject_qty || "0"}</td>
                                  <td>📝</td>
                                  <td>
                                    <span
                                      style={{ color: "#2f75b5", cursor: "pointer", fontWeight: "600" }}
                                      onClick={() => handleSelect(item)}
                                    >
                                      Select
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      className="vndrbtn"
                                      title="View PDF"
                                      style={{ padding: "4px 8px", border: "none", background: "transparent" }}
                                      onClick={() => handleViewPdf(item)}
                                    >
                                      <FaEye size={18} style={{ cursor: "pointer", color: "#0d6efd" }} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="20" className="text-center">No records found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    {data.length > itemsPerPage && (
                      <nav aria-label="Page navigation" className="mt-3">
                        <ul className="pagination justify-content-center">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </button>
                          </li>
                          {[...Array(totalPages)].map((_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => paginate(i + 1)}>
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </div>

                  <div className="AssemblyEntry-bottom mt-5">
                    <div className="AssemblyEntry-tabs">
                      <ul className="nav nav-tabs" id="" role="tablist" >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="rework-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#rework"
                            type="button"
                            role="tab"
                          >
                            Rework  |  Reject
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="shift-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#shift"
                            type="button"
                            role="tab"
                          >
                            Rework Master
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="machine-idle-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#machineIdle"
                            type="button"
                            role="tab"
                          >
                            Reject Master
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4" id="productionEntryTabsContent" >
                        {/* <div className="tab-pane fade show active" id="shift" role="tabpanel" >
                          <div className="table table-bordered table-responsive">
                            <table>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    Shift From..To
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Break From..To
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Break Total
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Shift Time
                                  </th>

                                  <th className="border border-gray-300 p-2">
                                    Cycle Time
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    OP Time
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    L/U Time
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    M/O Time
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Total Time
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="row">
                            <div className="table table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">
                                      Scrap / End Piece Code :
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Scrap / End Piece Qty:
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Scrap / End Piece Remark:
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      BOM Scrap Code:
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      BOM Scrap Wt:
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Scrap /End Qty :
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div> */}

                        {/* <div className="tab-pane fade" id="machineIdle" role="tabpanel">
                          <div className="table table-bordered table-responsive">
                            <table>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    Idle Reason:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    From:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    To:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Total Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Supervisor /Operators:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Setting Part:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Remark:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Add:
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input
                                        type="time"
                                        className="form-control"
                                      />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="text" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="text" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="text" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <button type="button" className="vndrbtn">
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="table table-bordered table-responsive">
                            <table>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    S no.:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Reason:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    From Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    To Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Idle Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Operator Name:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Setting Part:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Remark:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Delete:
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="text" className="w-1/2" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="time" className="w-1/2" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="time"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="time"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <button type="button" className="vndrbtn">
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> */}

                        <div className="tab-pane fade" id="rework" role="tabpanel">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>QC No :</label>
                                </div>
                                <div className="col-md-4">
                                  <input type="text" placeholder="242523915" className="form-control" />
                                </div>
                              </div>
                              <div className="row g-2 align-items-end mb-2">
                                <div className="col-md-4">
                                  <label className="form-label mb-1">Rework</label>
                                  <select className="form-select">
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label mb-1">&nbsp;</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-4 d-flex gap-2">
                                  <button type="button" className="vndrbtn flex-grow-1">
                                    Add
                                  </button>
                                  <button type="button" className="vndrbtn px-2">
                                    <Cached />
                                  </button>
                                </div>
                              </div>

                              <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                  <thead>
                                    <tr>
                                      <th>Sr no.</th>
                                      <th>Description</th>
                                      <th>Qty</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Sr no.</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>QC Date :</label>
                                </div>
                                <div className="col-md-4">
                                  <input type="date" className="form-control" />
                                </div>
                              </div>
                              <div className="row g-2 align-items-end mb-2">
                                <div className="col-md-4">
                                  <label className="form-label mb-1">Rework</label>
                                  <select className="form-select">
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label mb-1">&nbsp;</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-4 d-flex gap-2">
                                  <button type="button" className="vndrbtn flex-grow-1">
                                    Add
                                  </button>
                                  <button type="button" className="vndrbtn px-2">
                                    <Cached />
                                  </button>
                                </div>
                              </div>

                              <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                  <thead>
                                    <tr>
                                      <th>Sr no.</th>
                                      <th>Description</th>
                                      <th>Qty</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Sr no.</td>
                                      <td></td>
                                      <td></td>
                                      <td><FaXTwitter /></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="row mt-4">
                                <div className="col-md-4 mt-3">
                                  <label>QC Sample Pef. :</label>
                                </div>
                                <div className="col-md-5">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4 mt-3">
                                  <label>QC Ssmple Qty. :</label>
                                </div>
                                <div className="col-md-5">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="col-md-4 mt-3">
                                  <label>QC Ssmple Remark. :</label>
                                </div>
                                <div className="col-md-5">
                                  <textarea className="form-control" rows="1" placeholder="Remark..."></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-md-3">
                              <div className="row mt-4">
                                <div className="col-md-6 mt-3">
                                  <label>Drawing Rev No. :</label>
                                </div>
                                <div className="col-md-6">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="row mt-4">
                                <div className="col-md-6 mt-3">
                                  <label>(IOS) Format No. :</label>
                                </div>
                                <div className="col-md-6">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="row mt-4">
                                <div className="col-md-6 mt-3">
                                  <label>(IOS) Rev No. :</label>
                                </div>
                                <div className="col-md-6">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="row mt-4">
                                <div className="col-md-6 mt-3">
                                  <label>(IOS) Rev Date. :</label>
                                </div>
                                <div className="col-md-6">
                                  <input type="date" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        {/* <div className="tab-pane fade" id="toolDie" role="tabpanel" >
                          <div className="row">
                            <div className="col-md-1">
                              <label>Die Name</label>
                            </div>
                            <div className="col-md-2">
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-1">
                              <button type="button" className="vndrbtn">
                                Add
                              </button>
                            </div>
                          </div>

                          <div className="row">
                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Sr no.</th>
                                    <th>Item Code</th>
                                    <th>Item Description</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Sr no.</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div> */}

                      </div>
                    </div>

                    <div className="row text-start mt-5">
                      <div className="col-md-2">
                        <label><b>OK Qty : </b></label> <span className="okqty"> 0</span>
                      </div>
                      <div className="col-md-2">
                        <label><b>| Rework : </b></label><span className="okqtyy"> 0</span>
                      </div>
                      <div className="col-md-2">
                        <label><b>| Reject : </b></label> <span className="okqtyyt"> 0</span>
                      </div>
                      <div className="col-md-2">
                        <label><b> Total Qty : </b></label> <span className="okqtyyy"> Label</span>
                      </div>

                      <div className="col-md-4 d-flex">
                        <div className="text-end s-4 d-flex">
                          <button type="button" className="vndrbtn me-2">
                            Cancel
                          </button>
                          <button type="button" className="vndrbtn">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

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

export default InprocessInspection
