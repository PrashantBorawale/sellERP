import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PaddingSalesQC.css";
import { useNavigate } from "react-router-dom";
import { fetchSalesReturns } from "../../../Service/Api.jsx";
import * as XLSX from "xlsx";

const PaddingSalesQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    plant: "SHARP",
    fromDate: "2025-01-01",
    toDate: "2026-03-03",
    custName: "Ram kumawat",
    itemCode: "",
    returnNo: ""
  });
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

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const data = await fetchSalesReturns(filters.fromDate, filters.toDate, filters.custName);
      const flattenedData = data.flatMap(mainItem => {
        if (!mainItem.items || mainItem.items.length === 0) {
          return [{
            year: "-",
            plant: mainItem.plant || "SHARP",
            returnNo: mainItem.sales_return_no,
            returnDate: mainItem.sales_return_date,
            customerName: mainItem.cust_name,
            itemCode: "-",
            itemDesc: "-",
            returnQty: "-",
            user: "Admin",
            rawItem: mainItem
          }];
        }
        return mainItem.items.map(subItem => ({
          year: "-", // If needed, can be derived
          plant: mainItem.plant || "SHARP",
          returnNo: mainItem.sales_return_no,
          returnDate: mainItem.sales_return_date,
          customerName: mainItem.cust_name,
          itemCode: subItem.item_code,
          itemDesc: subItem.item_desc || "-",
          returnQty: subItem.return_qty,
          user: "Admin",
          rawItem: { ...mainItem, ...subItem }
        }));
      });
      setQcList(flattenedData);
    } catch (error) {
      console.error("Failed to fetch sales returns", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleSearch = () => {
    fetchReturns();
  };
  
  const handleQCClick = (item) => {
    navigate("/RejectionMaterialQC", { state: item });
  };

  const handleExportExcel = () => {
    if (qcList.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = qcList.map((item, index) => {
      return {
        "Sr no": index + 1,
        "Year": item.year,
        "Plant": item.plant,
        "Return No": item.returnNo,
        "Return Date": item.returnDate,
        "Customer Name": item.customerName,
        "Item Code": item.itemCode,
        "Item Desc": item.itemDesc,
        "Return Qty": item.returnQty,
        "User": item.user || "Togre"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Sales Return QC");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Pending_Sales_Return_QC_List.xlsx");
  };

  return (
    <div className="PaddingSalesQCMaster">
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
                <div className="PaddingSalesQC">
                  <div className="PaddingSalesQC-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0">Pending Sales Return QC List</h5>
                      </div>
                      <div className="col-md-8 d-flex justify-content-md-end mt-3 mt-md-0">
                        <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>
  
                  {/* Filter Section */}
                  <div className="PaddingSalesQC-filter">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          <div className="col-md-2">
                            <label className="form-label">Plant</label>
                            <select className="form-select" value={filters.plant} onChange={(e) => setFilters({ ...filters, plant: e.target.value })}>
                              <option>SHARP</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" value={filters.fromDate} onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" value={filters.toDate} onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="custNameCheckbox" />
                              <label htmlFor="custNameCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Cust Name: </label>
                            </div>
                            <input type="text" placeholder="Cust Name" className="form-control" value={filters.custName} onChange={(e) => setFilters({ ...filters, custName: e.target.value })} />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="itemCodeCheckbox" />
                              <label htmlFor="itemCodeCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Item Code: </label>
                            </div>
                            <input type="text" placeholder="Item Code" className="form-control" value={filters.itemCode} onChange={(e) => setFilters({ ...filters, itemCode: e.target.value })} />
                          </div>
  
                          <div className="col-md-2">
                            <div className="form-check mb-1">
                              <input type="checkbox" className="form-check-input" id="returnNoCheckbox" />
                              <label htmlFor="returnNoCheckbox" className="form-check-label fw-bold" style={{ fontSize: "0.85rem", color: "#475569" }}> Sales-Return-No: </label>
                            </div>
                            <input type="text" placeholder="" className="form-control" value={filters.returnNo} onChange={(e) => setFilters({ ...filters, returnNo: e.target.value })} />
                          </div>
  
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100" onClick={handleSearch} disabled={loading} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {loading ? "Searching..." : "Search"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="PaddingSalesQC-table table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Year</th>
                        <th>Plant</th>
                        <th>Return No</th>
                        <th>Return Date</th>
                        <th>Customer Name</th>
                        <th>Item Code</th>
                        <th>Item Desc</th>
                        <th>Return Qty</th>
                        <th>User</th>
                        <th>QC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qcList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>   {/* Sr No */}
                          <td>{item.year}</td>
                          <td>{item.plant}</td>
                          <td>{item.returnNo}</td>
                          <td>{item.returnDate}</td>
                          <td>{item.customerName}</td>
                          <td>{item.itemCode}</td>
                          <td>{item.itemDesc}</td>
                          <td>{item.returnQty}</td>
                          <td>{item.user || "Togre"}</td>
                          <td
                            className="text-center text-danger fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleQCClick(item)}
                          >
                            !
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaddingSalesQC;