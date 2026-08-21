import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ProductionReport.css";
import { getAssemblyReport, getProductionFilterReport, getDailyProductionReport } from "../../Service/Production.jsx";
import { FaEdit, FaFileExcel, FaSitemap, FaPrint, FaSearch, FaEye } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const ProductionReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [view, setView] = useState("report"); // 'report' or 'query'
  const [activeTab, setActiveTab] = useState("query"); // 'query' or 'result'

  // Filter Query States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [useDateFilter, setUseDateFilter] = useState(false);
  const [operation, setOperation] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [prodNo, setProdNo] = useState("");
  const [useOperationFilter, setUseOperationFilter] = useState(false);
  const [useItemFilter, setUseItemFilter] = useState(false);
  const [useProdNoFilter, setUseProdNoFilter] = useState(false);
  const [queryResults, setQueryResults] = useState([]);
  const [queryLoading, setQueryLoading] = useState(false);
  
  // Daily Production Report Filter States
  const [reportFromDate, setReportFromDate] = useState("");
  const [reportToDate, setReportToDate] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

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

  const [assemblyData, setAssemblyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can change this number based on your requirements
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssemblyReport();
      console.log("Fetched Data:", data); // Check the structure of the data

      if (Array.isArray(data)) {
        setAssemblyData(data.sort((a, b) => b.id - a.id)); // Directly set the array if data is an array
        setTotalItems(data.length); // Set total items based on the array length
      } else {
        console.error("Data is not an array:", data);
      }
    };

    fetchData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchReport = async () => {
    if (!reportFromDate || !reportToDate) {
      alert("Please select both From and To dates.");
      return;
    }

    setReportLoading(true);
    try {
      const filters = {
        from_date: reportFromDate,
        to_date: reportToDate
      };
      
      const data = await getDailyProductionReport(filters);
      
      // Normalize data: mapping lowercase field names from API to CamelCase expected by table
      const normalizedData = data.map(item => ({
        ...item,
        id: item.id || item.prod_id || item.production_id || item.pk, // Fallback for different ID names
        Plant: "Produlink", // Hardcoded or derive from unit_machine if needed
        Prod_no: item.Prod_no || "-",
        Date: item.Date || "-",
        Time: item.Time || "-",
        Shift: item.shift || "-",
        Contractor: item.contractor || "-",
        Operator: item.operator || "-",
        FGItem: item.item || "-",
        ProdQty: item.prod_qty || "0",
        ReworkQty: item.rework_qty || "0",
        RejectQty: item.reject_qty || "0"
      }));

      setAssemblyData(normalizedData);
      setTotalItems(normalizedData.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching daily production report:", error);
      alert("Failed to fetch production report.");
    } finally {
      setReportLoading(false);
    }
  };

  const handleExecuteQuery = async () => {
    setQueryLoading(true);
    try {
      const filters = {};
      
      if (useDateFilter) {
        if (fromDate) filters.from_date = fromDate;
        if (toDate) filters.to_date = toDate;
      }
      
      if (useOperationFilter && operation) {
        filters.operation = operation;
      }
      
      if (useItemFilter && itemCode) {
        filters.item = itemCode;
      }

      if (useProdNoFilter && prodNo) {
        filters.Prod_no = prodNo;
      }
      
      const data = await getProductionFilterReport(filters);

      // 🔍 Frontend filter safeguard to ensure results strictly match the selected query criteria
      let processedData = data;
      
      if (useDateFilter) {
        if (fromDate) {
          processedData = processedData.filter(item => item.Date >= fromDate);
        }
        if (toDate) {
          processedData = processedData.filter(item => item.Date <= toDate);
        }
      }

      if (useOperationFilter && operation) {
        processedData = processedData.filter(item => {
          const opParts = (item.operation || "").split("|");
          return opParts[0] === operation;
        });
      }

      if (useItemFilter && itemCode) {
        processedData = processedData.filter(item => item.item === itemCode);
      }

      if (useProdNoFilter && prodNo) {
        processedData = processedData.filter(item => item.Prod_no === prodNo);
      }

      setQueryResults(processedData);
      setActiveTab("result");
    } catch (error) {
      console.error("Error executing query:", error);
      alert("Failed to fetch query results. Please try again.");
    } finally {
      setQueryLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (queryResults.length === 0) {
      alert("No data available to export");
      return;
    }

    const exportData = queryResults.map((item, index) => {
      const opParts = (item.operation || "N/A").split("|");
      const opNo = opParts[0];
      const opName = opParts[1] || "";
      
      return {
        "Sr. No.": index + 1,
        "ProdDate": item.Date || "",
        "OpName": item.operator || "",
        "Supervisor": item.Supervisor || "",
        "ProdNo": item.Prod_no || "",
        "ItemNo": item.item || "",
        "ItemDesc": item.ItemDescription || item.General || "-",
        "PartCode": item.ItemCode || item.Series || "-",
        "ProductionQty": item.prod_qty || "",
        "ShiftName": item.shift || "",
        "username": "admin",
        "MachineName": item.unit_machine || "",
        "MachineCode": item.unit_machine || "",
        "OPNo": opNo,
        "Remark": item.remark || "-",
        "OperationName": opName,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Production Results");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Production_Query_Report.xlsx");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assemblyData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="ProductionReportMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""} ${view === "query" ? "full-screen-view" : ""}`}>
                <div className="ProductionReport">
                  {view === "report" ? (
                    <>
                      <div className="ProductionReport-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <h5 className="header-title mb-0">
                              Daily Production Report
                            </h5>
                          </div>
                          <div className="col-md-8 text-end">
                            <button
                              type="button"
                              className={view === "report" ? "vndrbtn active me-2" : "vndrbtn me-2"}
                              onClick={() => setView("report")}
                            >
                              Production Report
                            </button>
                            <button
                              type="button"
                              className={view === "query" ? "vndrbtn active" : "vndrbtn"}
                              onClick={() => setView("query")}
                            >
                              Production - Query
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Filter Section */}
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="ProductionReport-filter">
                            <div className="row text-start align-items-end">
                          <div className="col-md-2">
                            <label>Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options as needed */}
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label>From Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              value={reportFromDate}
                              onChange={(e) => setReportFromDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label>To Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              value={reportToDate}
                              onChange={(e) => setReportToDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label>Series</label>
                            <select className="form-select">
                              <option value="ALL">ALL</option>
                              {/* Add more options as needed */}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Shift</label>
                            <select className="form-select">
                              <option value="ALL">ALL</option>
                              {/* Add more options as needed */}
                            </select>
                          </div>
                          <div className="col-md-2 mt-4">
                            <button 
                              className="vndrbtn w-100" 
                              onClick={handleSearchReport}
                              disabled={reportLoading}
                            >
                              {reportLoading ? "Searching..." : "Search"}
                            </button>
                          </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Table Section */}
                      <div className="ProductionReport-Main">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.</th>

                                <th>Plant</th>
                                <th>Prod No</th>
                                <th>Prod Date</th>
                                <th>Time</th>
                                <th>Shift</th>
                                <th>Contractor</th>
                                <th>Operator</th>
                                <th>FGItem</th>
                                <th>ProdQty</th>
                                <th>Rework</th>
                                <th>Reject</th>

                                <th>Edit</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.map((item, index) => (
                                <tr key={index}>
                                  <td>{indexOfFirstItem + index + 1}</td>

                                  <td>{item.Plant}</td>
                                  <td>{item.Prod_no}</td>
                                  <td>{item.Date}</td>
                                  <td>{item.Time}</td>

                                  <td>{item.Shift}</td>
                                  <td>{item.Contractor}</td>
                                  <td>{item.Operator}</td>
                                  <td>{item.FGItem}</td>

                                  <td>{item.ProdQty}</td>
                                  <td>{item.ReworkQty}</td>
                                  <td>{item.RejectQty}</td>

                                  <td>
                                    <Link
                                      to={`/ProductionEntryAss/${item.id}`}
                                      className="vndrbtn px-2 py-1"
                                      style={{ minWidth: 'auto', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                                    >
                                      <FaEdit />
                                    </Link>
                                  </td>

                                  <td>
                                    <a
                                      href={`https://sellerp-backend.onrender.com/Production/ProductionEntry/pdf/${item.id}/`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="vndrbtn px-2 py-1"
                                      style={{ minWidth: 'auto' }}
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="pagination">
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-light"
                          >
                            Previous
                          </button>

                          {pageNumbers.map((number) => (
                            <button
                              key={number}
                              onClick={() => paginate(number)}
                              className={`btn ${
                                currentPage === number ? "btn" : "btn-light"
                              }`}
                            >
                              {number}
                            </button>
                          ))}

                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === pageNumbers.length}
                            className="btn btn-sm btn-light"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="container-fluid p-0">
                      <div className="ProductionReport-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <h5 className="header-title mb-0">
                              Production Query
                            </h5>
                          </div>
                          <div className="col-md-8 text-end">
                            <div className="d-flex align-items-center justify-content-end">
                              <button className="vndrbtn me-2">
                                <FaSitemap className="me-1" /> Query Master
                              </button>
                              <button 
                                className="vndrbtn me-2"
                                onClick={handleExportExcel}
                                disabled={queryResults.length === 0}
                              >
                                <FaFileExcel className="me-1" /> Export Report
                              </button>
                              <button
                                className="vndrbtn"
                                onClick={() => setView("report")}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="custom-tabs-container">
                        <div className="tab-buttons">
                          <button
                            className={
                              activeTab === "query" ? "active" : "vndrbtn"
                            }
                            onClick={() => setActiveTab("query")}
                          >
                            Query
                          </button>
                          <button
                            className={
                              activeTab === "result" ? "active" : "vndrbtn"
                            }
                            onClick={() => setActiveTab("result")}
                          >
                            Result
                          </button>
                        </div>

                        <div className="tab-content mt-3">
                          {activeTab === "query" && (
                            <div className="tab-panel text-start">
                              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                                <div className="card-body">
                                  <div className="query-form-content">
                                {/* Plant */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2">
                                    <label className="form-label">Plant :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="SHARP">SHARP</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Date Range */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input 
                                      type="checkbox" 
                                      className="me-2" 
                                      checked={useDateFilter}
                                      onChange={(e) => setUseDateFilter(e.target.checked)}
                                    />
                                    <label className="form-label mb-0">Date Range :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="d-flex align-items-center">
                                      <input 
                                        type="date" 
                                        className="form-control form-control-sm me-2" 
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        disabled={!useDateFilter}
                                      />
                                      <span className="me-2">To :</span>
                                      <input 
                                        type="date" 
                                        className="form-control form-control-sm" 
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        disabled={!useDateFilter}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Shift */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2">
                                    <label className="form-label">Shift :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="ALL">ALL</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Prod No */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input 
                                      type="checkbox" 
                                      className="me-2" 
                                      checked={useProdNoFilter}
                                      onChange={(e) => setUseProdNoFilter(e.target.checked)}
                                    />
                                    <label className="form-label mb-0">Prod No :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm" 
                                      value={prodNo}
                                      onChange={(e) => setProdNo(e.target.value)}
                                      disabled={!useProdNoFilter}
                                    />
                                  </div>
                                </div>

                                {/* Heat Code */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Heat Code :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" className="form-control form-control-sm" />
                                  </div>
                                </div>

                                {/* Item Group */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Item Group :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="BLOCK">BUILDING (SHED)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Item Code */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input 
                                      type="checkbox" 
                                      className="me-2" 
                                      checked={useItemFilter}
                                      onChange={(e) => setUseItemFilter(e.target.checked)}
                                    />
                                    <label className="form-label mb-0">Item Code :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm" 
                                      placeholder="Item Code" 
                                      value={itemCode}
                                      onChange={(e) => setItemCode(e.target.value)}
                                      disabled={!useItemFilter}
                                    />
                                  </div>
                                </div>

                                {/* OP No */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input 
                                      type="checkbox" 
                                      className="me-2" 
                                      checked={useOperationFilter}
                                      onChange={(e) => setUseOperationFilter(e.target.checked)}
                                    />
                                    <label className="form-label mb-0">OP No :</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input 
                                      type="text" 
                                      className="form-control form-control-sm" 
                                      value={operation}
                                      onChange={(e) => setOperation(e.target.value)}
                                      disabled={!useOperationFilter}
                                    />
                                  </div>
                                </div>

                                {/* Operation Name */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Operation Name :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="ALL">ALL</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Operator Name */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Operator Name :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" className="form-control form-control-sm" />
                                  </div>
                                </div>

                                {/* Contractor Name */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Contractor Name :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="">Select</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Machine Name */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Machine Name :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="">Select</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Work Order */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Work Order :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" className="form-control form-control-sm" placeholder="Work Order" />
                                  </div>
                                </div>

                                {/* Machine Type */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    <label className="form-label mb-0">Machine Type :</label>
                                  </div>
                                  <div className="col-md-3">
                                    <select className="form-select form-select-sm">
                                      <option value="">Select</option>
                                    </select>
                                  </div>
                                </div>

                                {/* User Query Radio */}
                                <div className="row mb-2 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="radio" name="queryType" className="me-2" id="userQuery" defaultChecked />
                                    <label className="form-label mb-0" htmlFor="userQuery">User Query :</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-select form-select-sm">
                                      <option value="PRODUCTION">PRODUCTION</option>
                                    </select>
                                  </div>
                                </div>

                                {/* ERP Query Radio */}
                                <div className="row mb-4 align-items-center">
                                  <div className="col-md-2 d-flex align-items-center">
                                    <input type="radio" name="queryType" className="me-2" id="erpQuery" />
                                    <label className="form-label mb-0" htmlFor="erpQuery">ERP Query :</label>
                                  </div>
                                </div>

                                {/* Execute Button */}
                                <div className="row mt-4">
                                  <div className="col-md-2">
                                    <button 
                                      className="vndrbtn w-100"
                                      onClick={handleExecuteQuery}
                                      disabled={queryLoading}
                                    >
                                      {queryLoading ? "Loading..." : "Execute Query"}
                                    </button>
                                  </div>
                                </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "result" && (
                            <div className="tab-panel text-start p-0">
                              <div className="query-result-wrapper">
                                <table className="table table-bordered table-striped mb-0 text-center query-result-table" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                                  <thead>
                                    <tr>
                                      <th>Sr. No.</th>
                                      <th>ProdDate</th>
                                      <th>OpName</th>
                                      <th>Supervisor</th>
                                      <th>ProdNo</th>
                                      <th>ItemNo</th>
                                      <th>ItemDesc</th>
                                      <th>PartCode</th>
                                      <th>ProductionQty</th>
                                      <th>ShiftName</th>
                                      <th>username</th>
                                      <th>MachineName</th>
                                      <th>MachineCode</th>
                                      <th>OPNo</th>
                                      <th>Remark</th>
                                      <th>OperationName</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {queryResults.length > 0 ? (
                                      queryResults.map((item, index) => {
                                        const opParts = (item.operation || "N/A").split("|");
                                        const opNo = opParts[0];
                                        const opName = opParts[1] || "";
                                        
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Date}</td>
                                            <td>{item.operator}</td>
                                            <td>{item.Supervisor}</td>
                                            <td>{item.Prod_no}</td>
                                            <td>{item.item}</td>
                                            <td className="text-start" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                              {item.ItemDescription || item.General || "-"}
                                            </td>
                                            <td>{item.ItemCode || item.Series || "-"}</td>
                                            <td>{item.prod_qty}</td>
                                            <td>{item.shift}</td>
                                            <td>{"admin"}</td>
                                            <td>{item.unit_machine}</td>
                                            <td>{item.unit_machine}</td>
                                            <td>{opNo}</td>
                                            <td>{item.remark || "-"}</td>
                                            <td>{opName}</td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr>
                                        <td colSpan="16" className="py-4 text-muted">
                                          {queryLoading ? "Fetching data..." : "No data available"}
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="query-result-footer">
                                <span className="text-primary">Total :</span> {queryResults.length || 0}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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

export default ProductionReport;
