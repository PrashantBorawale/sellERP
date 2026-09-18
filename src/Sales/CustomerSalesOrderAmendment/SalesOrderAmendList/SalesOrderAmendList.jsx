import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./SalesOrderAmendList.css";
import { FaEye, FaSearch } from "react-icons/fa";
import { Search, FileSpreadsheet, BarChart } from "lucide-react";
import axios from "axios";

const initialRows = [
  {
    id: 1,
    type: "Rate",
    amdNo: "SOAMD242500123",
    amdDate: "02/12/24",
    refNo: "00000034",
    refDate: "12/12/24",
    custName: "C0005 ENDURANGE TECHNOLOGIES LTD (I)",
    soNo: "2223000135",
    soDate: "10/11/23",
    custPoNo: "19000008022",
    custPoDate: "09/01/23",
    user: "More",
    authStatus: "! More"
  }
];

const SalesOrderAmendList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
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
        const res = await axios.get("https://sellerp-backend.onrender.com/Sales/sales-order-amendment/");
        if (res.data && res.data.value && res.data.value.length > 0) {
          setData(res.data.value);
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching sales order amendment list:", err);
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
      const targetId = item?.id || item?.amdNo || item?.soNo || "1";
      window.open(`https://sellerp-backend.onrender.com/Sales/SalesOrderAmendment/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="SalesOrderAmendListMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`} style={{ paddingTop: '60px' }}>
                
                {/* Header Section */}
                <div className="SalesOrderAmendList-header d-flex justify-content-between align-items-center mb-2">
                  <h5 className="header-title mb-0">
                    Sales Order Amendment List
                  </h5>

                  <div className="d-flex gap-2">
                    <button type="button" className="vndrbtn mx-1 d-flex align-items-center gap-2">
                      <FileSpreadsheet size={16} />
                      SO Amendment Register
                    </button>
                    <div className="custom-dropdown">
                      <button 
                        className="vndrbtn mx-1 dropdown-toggle d-flex align-items-center gap-2" 
                        type="button" 
                        onClick={toggleMenu}
                      >
                        <BarChart size={16} />
                        Sales Order Amendment Menu
                      </button>
                      {menuOpen && (
                        <ul className="custom-dropdown-menu">
                          <li><Link className="dropdown-item" to="/CustPOAmend">SO Amendment</Link></li>
                          <li><Link className="dropdown-item" to="#">Item Addition (Regular)</Link></li>
                          <li><Link className="dropdown-item" to="#">Item Addition (Export)</Link></li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="SalesOrderAmendList-Main">
                  {/* Compact Filter Bar */}
                  <div className="compact-filter-bar">
                    <div className="filter-group">
                      <label>From:</label>
                      <input type="date" className="form-control" style={{ width: '110px' }} />
                    </div>

                    <div className="filter-group">
                      <label>To:</label>
                      <input type="date" className="form-control" style={{ width: '110px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="custCheck" />
                      <label htmlFor="custCheck">Customer:</label>
                      <input type="text" placeholder="Name..." className="form-control" style={{ width: '140px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="itemCheck" />
                      <label htmlFor="itemCheck">Item:</label>
                      <input type="text" placeholder="Name..." className="form-control" style={{ width: '140px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="amdCheck" />
                      <label htmlFor="amdCheck">Amd No:</label>
                      <input type="text" className="form-control" style={{ width: '60px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="poCheck" />
                      <label htmlFor="poCheck">Po No:</label>
                      <input type="text" className="form-control" style={{ width: '60px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="authCheck" />
                      <label htmlFor="authCheck">Auth Pending:</label>
                    </div>

                    <button type="button" className="vndrbtn ms-2">
                      <FaSearch size={11} /> Search
                    </button>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Type</th>
                            <th>Amd No</th>
                            <th>Amd Date</th>
                            <th>Ref No</th>
                            <th>Ref Date</th>
                            <th>Cust Name</th>
                            <th>SO No</th>
                            <th>SO Date</th>
                            <th>CustPo No</th>
                            <th>CustPo Date</th>
                            <th>User</th>
                            <th>Auth Status</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={item.id || index}>
                              <td className="text-center">{index + 1}</td>
                              <td>{item.type || "Rate"}</td>
                              <td>{item.amdNo || item.amd_no || "SOAMD242500123"}</td>
                              <td className="text-center">{item.amdDate || item.amd_date || "02/12/24"}</td>
                              <td>{item.refNo || item.ref_no || "00000034"}</td>
                              <td className="text-center">{item.refDate || item.ref_date || "12/12/24"}</td>
                              <td>{item.custName || item.cust_name || "C0005 ENDURANGE TECHNOLOGIES LTD (I)"}</td>
                              <td>{item.soNo || item.so_no || "2223000135"}</td>
                              <td className="text-center">{item.soDate || item.so_date || "10/11/23"}</td>
                              <td>{item.custPoNo || item.cust_po_no || "19000008022"}</td>
                              <td className="text-center">{item.custPoDate || item.cust_po_date || "09/01/23"}</td>
                              <td>{item.user || "More"}</td>
                              <td className="text-center">{item.authStatus || "! More"}</td>
                              <td className="text-center">
                                <FaEye
                                  className="view-icon"
                                  style={{ cursor: "pointer", color: "#0d6efd" }}
                                  onClick={() => handleViewPdf(item)}
                                  title="View PDF"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default SalesOrderAmendList;