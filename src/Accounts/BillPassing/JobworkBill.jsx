import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./JobworkBill.css";
import axios from "axios";
import { FaEye, FaCheck, FaPlus, FaTrash, FaFileExcel, FaSearch, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import * as XLSX from "xlsx";

const JobworkBill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selectedGrns, setSelectedGrns] = useState(location.state?.selectedGrns || []);
  const [loading, setLoading] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const formatDateToISO = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const parts = dateStr.split(/[/-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  const handleSearch = async (type = 'date') => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      let url = `https://sellerp-backend.onrender.com/Account/inwardchllan-date-fillter/`;
      let params = {};

      if (type === 'supplier') {
        params = { supplier_name: vendorName };
      } else {
        if (!fromDate || !toDate) {
          alert("Please select both From and To dates.");
          setLoading(false);
          return;
        }
        params = { from_date: fromDate, to_date: toDate };
      }

      const response = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && Array.isArray(response.data.data)) {
        const mappedData = response.data.data.flatMap((item) => {
          const nestedItems = item.InwardChallanTable || item.item_details || [item];
          
          return nestedItems.map((detail, idx) => ({
            id: `${item.id}-${idx}`,
            masterId: item.id,
            year: item.Series || item.series || item.Year || item.Series_No || "",
            grnNo: item.InwardF4No || item.no || item.Inward_no || item.No || item.PoNo || "",
            grnDate: item.InwardDate || item.challan_date || item.Date || item.PoDate || "",
            type: item.Series || item.bill_type || "Our_F4",
            vendChNo: item.ChallanNo || item.challan_no || item.Invoice_No || item.invoice_no || "",
            chDate: formatDateToISO(item.ChallanDate || item.challan_no_date || item.challan_date || item.Date || ""),
            code: item.CodeNo || item.SupplierCode || item.supplier_code || item.Code || item.Supp_Code || "",
            vendor: item.SupplierName || item.supplier_name || item.Supplier || item.vendor_name || "",
            f4Out: item.OutwardChallan || item.OutwardChallanNo || item.f4_out_no || item.Outward_no || "",
            qtyDesc: (() => {
              const qty = detail.InQtyNOS || detail.InQtyKg || item.TotalQtyNo || "0";
              const desc = detail.ItemDescription || detail.description || "";
              const cleanDesc = desc.split('| Qty:')[0].trim();
              return `Qty: ${qty} | ${cleanDesc}`;
            })(),
            qty: detail.InQtyNOS || detail.InQtyKg || item.TotalQtyNo || 0,
            itemNo: (() => {
              const base = detail.ItemNo || detail.item_no || detail.PartNo || "";
              if (base) return base;
              const desc = detail.ItemDescription || detail.description || detail.ItemName || "";
              const partMatch = desc.match(/Part:\s*[^-\|]+-\s*([^-\|]+)/i);
              if (partMatch) return partMatch[1].trim();
              return "1";
            })(),
            itemCode: (() => {
              const base = detail.ItemCode || detail.item_code || detail.Code || "";
              if (base) return base;
              const desc = detail.ItemDescription || detail.description || detail.ItemName || "";
              const partMatch = desc.match(/Part:\s*([^-\|]+)/i);
              if (partMatch) return partMatch[1].trim();
              const wordMatch = desc.match(/^([A-Z0-9]+)/i);
              return wordMatch ? wordMatch[1].trim() : "";
            })(),
            itemDesc: detail.ItemDescription || detail.description || detail.ItemName || "",
            hsnCode: detail.HSNCode || detail.hsn_code || "998898",
            rate: detail.Rate || detail.rate || 0,
            poNo: item.PoNo || detail.PoNo || item.PO_No || item.Po_No || "",
            poDate: item.PoDate || detail.PoDate || "",
            cgst: detail.CGST_P || detail.cgst || 0,
            sgst: detail.SGST_P || detail.sgst || 0,
            igst: detail.IGST_P || detail.igst || 0,
            user: item.PreparedBy || item.created_by_username || item.User || "Admin"
          }));
        });
        setReportData(mappedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching Inward Challan data:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // handleSearch() removed to avoid automatic selection/search on load
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleAddGrn = (grn) => {
    if (selectedGrns.length === 0) {
      setSelectedGrns([grn]);
      return;
    }
    if (selectedGrns.some(item => item.id === grn.id)) {
      alert("Already added to the list.");
      return;
    }
    const firstVendor = selectedGrns[0].vendor;
    if (grn.vendor !== firstVendor) {
      alert("Select same Supplier Name");
      return;
    }
    setSelectedGrns([...selectedGrns, grn]);
  };

  const handleRemoveGrn = (grnId) => {
    setSelectedGrns(selectedGrns.filter(item => item.id !== grnId));
  };

  const handleViewPdf = async (masterId) => {
    // Open a new tab immediately to prevent popup blocker
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><head><title>Loading PDF...</title></head><body style="font-family: sans-serif; padding: 20px;">Loading PDF securely...</body></html>');
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://sellerp-backend.onrender.com/Account/generate-jobworkbill-pdf/${masterId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      if (newWindow) {
        newWindow.location.href = fileURL;
      } else {
        window.open(fileURL, '_blank');
      }
    } catch (error) {
      if (newWindow) newWindow.close();
      console.error("Error viewing PDF:", error);
      alert("Failed to load PDF. Make sure you have permission or the record exists.");
    }
  };

  const fetchSuppliers = async (search) => {
    if (!search) {
      setSupplierList([]);
      return;
    }
    try {
      const response = await axios.get(`https://sellerp-backend.onrender.com/Purchase/Fetch_Supplier_Code/`, {
        params: { search }
      });
      console.log("Supplier Suggestion API Response:", response.data);
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      if (Array.isArray(data)) {
        setSupplierList(data);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleVendorChange = (e) => {
    const value = e.target.value;
    setVendorName(value);
    fetchSuppliers(value);
  };

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = reportData.map((data, index) => ({
      "Sr No.": index + 1,
      "Year": data.year || "",
      "57F4 GRNNo": data.grnNo || "",
      "GRN Date": data.grnDate || "",
      "57F4Type": data.type || "",
      "Vend Ch.No": data.vendChNo || "",
      "Ch. Date": data.chDate || "",
      "Code": data.code || "",
      "Vendor Name": data.vendor || "",
      "f4 out no": data.f4Out || "",
      "Item Qty | Desc": data.qtyDesc || "",
      "User": data.user || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork Bill");

    // Auto-size columns
    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_Bill.xlsx");
  };

  return (
    <div className="erp-page jobwork-bill">
      <style>{`
        .jobwork-bill .table th, .jobwork-bill .table td {
          white-space: nowrap;
        }
        .jobwork-bill .table .wrap-text {
          white-space: normal !important;
          word-wrap: break-word !important;
          width: auto; /* Take up remaining space */
          min-width: 150px;
        }
      `}</style>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h5 className="header-title mb-0">Pending Bill Inward Challan List</h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                          <span className="me-2 small fw-bold text-secondary">57F4 GRN Auth-Pending Bill :</span>
                          <span className="badge" style={{ backgroundColor: '#3b82f6' }}>1193</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                          <span className="me-2 small fw-bold text-secondary">Bill Passing (JobWork) :</span>
                          <span className="badge" style={{ backgroundColor: '#3b82f6' }}>1193</span>
                        </div>
                        <button className="vndrbtn" onClick={handleExportExcel}>
                          <FaFileExcel className="me-2" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">

                    <div className="row align-items-end g-3 mb-2">
                      <div className="col-md-1">
                        <label className="form-label mb-1 small fw-bold text-start d-block">Plant :</label>
                        <select className="form-select form-select-sm" >
                          <option value="SHARP">SHARP</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold text-start d-block">From Date :</label>
                        <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)}  />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold text-start d-block">To Date :</label>
                        <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)}  />
                      </div>
                      <div className="col-auto">
                        <button className="vndrbtn bg-success border-success" onClick={() => handleSearch('date')} disabled={loading}>
                          <FaSearch className="me-2" /> {loading ? "Searching..." : "Search"}
                        </button>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold text-start d-block">Vendor Name :</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm" 
                          placeholder="Enter Name ..." 
                          value={vendorName} 
                          onChange={handleVendorChange} 
                          list="vendor-suggestions"
                        />
                        <datalist id="vendor-suggestions">
                          {supplierList.map((sup, idx) => (
                            <option 
                              key={idx} 
                              value={typeof sup === 'string' ? sup : (sup.Name || sup.supplier_name || sup.Supplier || sup.supplier || "")} 
                            />
                          ))}
                        </datalist>
                      </div>
                      <div className="col-auto">
                        <button className="vndrbtn bg-success border-success" onClick={() => handleSearch('supplier')} disabled={loading}>
                          <FaSearch className="me-2" /> {loading ? "Searching..." : "Search Supplier"}
                        </button>
                      </div>
                      <div className="col-md-2 ms-auto text-end">
                        <div className="d-flex align-items-end justify-content-end gap-1">
                          <div className="flex-grow-1 text-start" style={{ maxWidth: '150px' }}>
                            <select className="form-select form-select-sm fw-bold border-bottom-0 rounded-bottom-0 mb-0" style={{ fontSize: '0.75rem', padding: '2px 8px', height: '26px' }}>
                              <option>57F4 GRN No</option>
                            </select>
                            <input type="text" className="form-control form-control-sm rounded-top-0" placeholder="No..." style={{ height: '26px', fontSize: '0.75rem', padding: '2px 8px' }} />
                          </div>
                          <button className="vndrbtn bg-success border-success d-flex align-items-center justify-content-center" style={{ height: '52px', width: '40px', padding: 0 }}>
                            <FaSearch />
                          </button>
                        </div>
                      </div>
                    </div>
                  
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-bordered align-middle mb-0">

                      <thead className="table-light">
                        <tr>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Sr.</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Year</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>57F4 GRNNo</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>GRN Date</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>57F4Type</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Vend Ch.No</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Ch. Date</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Code</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Vendor Name</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>f4 out no</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Item Qty | Desc</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>User</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Auth1</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Auth2</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>QC</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>View</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((data, index) => (
                          <tr key={data.id}>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{index + 1}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.year}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.grnNo}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.grnDate}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.type}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.vendChNo}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.chDate}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.code}</td>
                            <td className="wrap-text" style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.vendor}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.f4Out}</td>
                            <td className="wrap-text" style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <span className={data.qtyDesc.includes('Qty') ? 'text-warning' : ''}>
                                {data.qtyDesc}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.user}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              {index % 3 === 0 ? (
                                <div className="badge bg-success p-1"><FaCheck /></div>
                              ) : (
                                <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                              )}
                            </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <FaEye 
                                className="text-primary cursor-pointer" 
                                onClick={() => handleViewPdf(data.masterId)}
                                title="View PDF"
                              />
                            </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <button className="btn btn-sm" onClick={() => handleAddGrn(data)}>
                                <FaPlus />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="sub-table-header mt-4 mb-2">
                    <h6 className="fw-bold mb-0">List Of GRN for Bill :</h6>
                  </div>
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
  <div className="card-body p-0">
    <div className="table-responsive">
      <table className="table table-bordered align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>No.</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>57F4 GRNNo</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>GRN Date</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>57F4 Type</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Vend Ch.No</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Ch. Date</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Code</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Vendor Name</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>f4 out no</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Item Qty | Desc</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>User</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Select</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedGrns.map((data, index) => (
                          <tr key={data.id}>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{index + 1}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.grnNo}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.grnDate}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.type}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.vendChNo}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.chDate}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.code}</td>
                            <td className="wrap-text" style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.vendor}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.f4Out}</td>
                            <td className="wrap-text" style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <span className={data.qtyDesc.includes('Qty') ? 'text-warning' : ''}>
                                {data.qtyDesc}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{data.user}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="checkbox" checked readOnly /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <button className="btn btn-sm text-danger" onClick={() => handleRemoveGrn(data.id)}>
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                          </table>
    </div>
  </div>
</div>

                  <div className="footer-actions mt-3 text-end">
                    <button className="vndrbtn bg-success border-success" onClick={() => {
                        if (selectedGrns.length === 0) {
                          alert("Please select at least one GRN.");
                          return;
                        }
                        navigate("/accounts/bill-passing/confirm-gst-bill", { state: { selectedInvoices: selectedGrns } });
                      }}>
                      <FaCheck className="me-2" /> Confirm To GST Bill
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

export default JobworkBill;
