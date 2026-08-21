import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ACPurchaseRegister.css";
import { FaSearch, FaFileExcel, FaEye, FaCog, FaCheckCircle } from "react-icons/fa";

const ACPurchaseRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-04-12");
  const [toDate, setToDate] = useState("2026-05-13");
  const [plant, setPlant] = useState("SHARP");
  const [type, setType] = useState("ALL");
  const [acPost, setAcPost] = useState("ALL");

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

  // Demo data based on the provided image
  const tableData = [
    { id: 1, year: "26-27", ap: false, grnNo: "GRN 262700756", grnDate: "09/05/2026", billNo: "PUR262700105", billDate: "13/05/2026", groupName: "Purchase", challanNo: "3048010010691", challanDate: "09/05/2026", custName: "TUBE INVESTMENT OF INDIA LTD", grandTotal: "249855.52", userName: "admin" },
    { id: 2, year: "26-27", ap: false, grnNo: "GRN 262700697", grnDate: "06/05/2026", billNo: "PUR262700104", billDate: "06/05/2026", groupName: "Purchase", challanNo: "262700361", challanDate: "04/05/2026", custName: "SHAKAMBHARI ENTERPRISES", grandTotal: "2292416.34", userName: "more" },
    { id: 3, year: "26-27", ap: false, grnNo: "GRN 262700641", grnDate: "04/05/2026", billNo: "PUR262700103", billDate: "04/05/2026", groupName: "Purchase", challanNo: "262700354", challanDate: "03/05/2026", custName: "SHAKAMBHARI ENTERPRISES", grandTotal: "625313", userName: "more" },
    { id: 4, year: "26-27", ap: false, grnNo: "GRN 262700623", grnDate: "02/05/2026", billNo: "PUR262700102", billDate: "04/05/2026", groupName: "Purchase", challanNo: "278", challanDate: "02/05/2026", custName: "VISHWA SAMRUDHI INDUSTRIES", grandTotal: "147871.7", userName: "more" },
    { id: 5, year: "26-27", ap: false, grnNo: "GRN 262700452", grnDate: "27/04/2026", billNo: "PUR262700101", billDate: "04/05/2026", groupName: "Purchase", challanNo: "3048010010490", challanDate: "25/04/2026", custName: "TUBE INVESTMENT OF INDIA LTD", grandTotal: "219247.29", userName: "more" },
    { id: 6, year: "26-27", ap: false, grnNo: "GRN 262700356", grnDate: "21/04/2026", billNo: "PUR262700100", billDate: "04/05/2026", groupName: "Purchase", challanNo: "3048010010423", challanDate: "21/04/2026", custName: "TUBE INVESTMENT OF INDIA LTD", grandTotal: "511564.45", userName: "more" },
    { id: 7, year: "26-27", ap: false, grnNo: "GRN 262700635", grnDate: "03/05/2026", billNo: "PUR262700099", billDate: "04/05/2026", groupName: "Purchase", challanNo: "skf/26-27/00122", challanDate: "03/05/2026", custName: "S K FASTENERS", grandTotal: "34574", userName: "more" },
    { id: 8, year: "26-27", ap: false, grnNo: "GRN 262700627", grnDate: "03/05/2026", billNo: "PUR262700098", billDate: "04/05/2026", groupName: "Purchase", challanNo: "26-27/0229", challanDate: "03/05/2026", custName: "VISHWA SAMRUDHI INDUSTRIES", grandTotal: "866102.3", userName: "more" },
    { id: 9, year: "26-27", ap: false, grnNo: "GRN 262700150", grnDate: "09/04/2026", billNo: "PUR262700097", billDate: "04/05/2026", groupName: "Purchase", challanNo: "3048010010208", challanDate: "09/04/2026", custName: "TUBE INVESTMENT OF INDIA LTD", grandTotal: "450916.26", userName: "more" },
  ];

  return (
    <div className="purchase-register-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* Header Section */}
                <div className="WorkOrderEntry-header mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title text-start">Purchase Register</h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <button className="btn ms-auto">
                        <FaFileExcel className="excel-icon" /> Export To Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="header-section mb-3">
                  <div className="d-flex align-items-center flex-wrap gap-4">
                    
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold mb-0">Plant :</label>
                      <select
                        className="form-select form-select-sm"
                        value={plant}
                        onChange={(e) => setPlant(e.target.value)}
                        style={{ width: "120px" }}
                      >
                        <option value="SHARP">SHARP</option>
                      </select>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold mb-0">From:</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold mb-0">To :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold mb-0">Type :</label>
                      <select
                        className="form-select form-select-sm"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: "120px" }}
                      >
                        <option value="ALL">ALL</option>
                      </select>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold mb-0">A/c Post :</label>
                      <select
                        className="form-select form-select-sm"
                        value={acPost}
                        onChange={(e) => setAcPost(e.target.value)}
                        style={{ width: "120px" }}
                      >
                        <option value="ALL">ALL</option>
                      </select>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn">
                        <FaSearch className="search-icon" /> Search
                      </button>
                      <button className="btn">
                        <FaCog /> Search Option
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-container">
                  <div className="table-responsive">
                    <table className="custom-table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Year</th>
                          <th className="text-center">
                            AP<br/>
                            <input type="checkbox" className="form-check-input mt-1" />
                          </th>
                          <th>GRN No</th>
                          <th>GRN Date</th>
                          <th>Bill No</th>
                          <th>Bill Date</th>
                          <th>GroupName</th>
                          <th>ChallanNo</th>
                          <th>ChallanDate</th>
                          <th>CustName</th>
                          <th>GrandTotal</th>
                          <th>UserName</th>
                          <th className="text-center">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row) => (
                          <tr key={row.id}>
                            <td className="text-center">{row.id}</td>
                            <td className="text-center">{row.year}</td>
                            <td className="text-center">
                              <input type="checkbox" className="form-check-input" checked={row.ap} readOnly />
                            </td>
                            <td>{row.grnNo}</td>
                            <td>{row.grnDate}</td>
                            <td>{row.billNo}</td>
                            <td>{row.billDate}</td>
                            <td>{row.groupName}</td>
                            <td>{row.challanNo}</td>
                            <td>{row.challanDate}</td>
                            <td>{row.custName}</td>
                            <td className="text-right">{row.grandTotal}</td>
                            <td className="text-center">{row.userName}</td>
                            <td className="text-center">
                              <FaEye className="view-icon" title="View Details" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Bottom Action Bar */}
                  <div className="bottom-action-bar">
                    <button className="btn">
                      <FaCheckCircle className="text-success" /> Post To A/c
                    </button>
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

export default ACPurchaseRegister;
