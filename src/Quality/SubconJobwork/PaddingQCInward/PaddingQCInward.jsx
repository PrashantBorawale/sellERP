import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PaddingQCInward.css";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const PaddingQCInward = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [pendingQcData, setPendingQcData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchPendingQcData();
  }, []);

  const fetchPendingQcData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Quality/inward-pending-qc/");
      const data = await response.json();
      setPendingQcData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
    } else if (item?.id || item?.InwardF4No) {
      const targetId = item?.id || item?.InwardF4No;
      window.open(`https://sellerp-backend.onrender.com/Quality/inward-pending-qc/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF document available for this record.");
    }
  };

  const handleExportExcel = () => {
    if (pendingQcData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = pendingQcData.map((item, index) => {
      return {
        "Sr.": index + 1,
        "57F4 GRN No": item.InwardF4No,
        "57F4 Date": item.InwardDate,
        "Entry Date": item.InwardDate + " " + (item.InwardTime || ""),
        "57F4 Type": "Our_F4",
        "Vendor Ch. No": item.ChallanNo,
        "Ch. Date": item.ChallanDate,
        "Code": "",
        "Vendor Name": item.SupplierName,
        "F4 Out No": item.InwardChallanTable && item.InwardChallanTable.length > 0 ? item.InwardChallanTable[0].OutNo : '',
        "Item Qty | Desc": "Total Item : (" + (item.TotalItem || 0) + ")",
        "User": item.PreparedBy
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending QC List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Pending_QC_List.xlsx");
  };

  return (
    <div className="PaddingQCInwardMaster">
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
                <div className="PaddingQCInward">
                  <div className="PaddingQCInward-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0">
                          {" "}
                          <span className="purch">
                            Subcon / Jobwork Inward :{" "}
                          </span>{" "}
                          Pending QC List{" "}
                        </h5>
                      </div>
                      <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                        <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="PaddingQCInward-Main">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          <div className="col-md-2">
                            <label className="form-label">Plant :</label>
                            <select className="form-select">
                              <option>VISHWA S.I.</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">From:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">To Date:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">57F4 Type :</label>
                            <select className="form-select">
                              <option>Select</option>
                              <option>Our_F4</option>
                              <option>Vendor_F4</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Select Vendar:</label>
                            <input type="text" placeholder="Enter Name" className="form-control" />
                          </div>
  
                          {/* Supplier Name */}
                          <div className="col-md-2">
                            <label className="form-label">Select Item:</label>
                            <input type="text" placeholder="Name..." className="form-control" />
                          </div>
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Search By:</label>
                            <select className="form-select mb-2">
                              <option>57F4 GRN No :</option>
                              <option>Our_F4</option>
                              <option>Vendor_F4</option>
                            </select>
                            <input type="text" placeholder="Name..." className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">57F4 GRN No</th>
                            <th scope="col">57F4 Date</th>
                            <th scope="col">Entry Date</th>
                            <th scope="col">57F4 Type</th>
                            <th scope="col">Vendor Ch. No</th>
                            <th scope="col">Ch. Date</th>
                            <th scope="col">Code</th>
                            <th scope="col">Vendor Name</th>
                            <th scope="col">F4 Out No</th>
                            <th scope="col">Item Qty | Desc</th>
                            <th scope="col">User</th>
                            <th scope="col">View </th>
                            <th scope="col">QC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="14" className="text-center">
                                Loading...
                              </td>
                            </tr>
                          ) : pendingQcData.length > 0 ? (
                            pendingQcData.map((item, index) => (
                              <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.InwardF4No}</td>
                                <td>{item.InwardDate}</td>
                                <td>{item.InwardDate} {item.InwardTime}</td>
                                <td>
                                  <span className="ourf4"> Our_F4 </span>
                                </td>
                                <td>{item.ChallanNo}</td>
                                <td>{item.ChallanDate}</td>
                                <td></td>
                                <td>{item.SupplierName}</td>
                                <td>{item.InwardChallanTable && item.InwardChallanTable.length > 0 ? item.InwardChallanTable[0].OutNo : ''}</td>
                                <td>Total Item : ({item.TotalItem || 0}) 📝</td>
                                <td>{item.PreparedBy}</td>
                                <td className="text-center">
                                  <FaEye
                                    size={18}
                                    style={{ cursor: "pointer", color: "#0d6efd" }}
                                    onClick={() => handleViewPdf(item)}
                                    title="View PDF"
                                  />
                                </td>
                                <td>
                                  <Link to={"/SubconJobworkInwardQC"} state={{ grnData: item }} className="vndrbtn" >  ! </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="14" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          )}
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

export default PaddingQCInward;
