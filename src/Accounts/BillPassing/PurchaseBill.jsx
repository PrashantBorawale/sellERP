import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseBill.css";
import { FaEye, FaCheck, FaExclamationTriangle, FaFileExcel, FaSearch, FaCogs } from "react-icons/fa";
import * as XLSX from "xlsx";

const PurchaseBill = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirmToGstBill = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one entry.");
      return;
    }
    const selectedData = reportData.filter((item) => selectedIds.includes(item.id));
    
    // Ensure all selected items have the same supplier Name
    const firstSupplier = selectedData[0].supplier;
    const hasDifferentSupplier = selectedData.some((item) => item.supplier !== firstSupplier);
    
    if (hasDifferentSupplier) {
      alert("Select same Supplier Name");
      return;
    }

    navigate("/direct-bill", { state: { selectedInvoices: selectedData } });
  };

  const handleViewPdf = async (id) => {
    if (!id) {
      alert("Invalid ID for PDF generation.");
      return;
    }
    const cleanId = String(id).split('-')[0];
    
    // Open a new tab immediately to prevent popup blocker
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><head><title>Loading PDF...</title></head><body style="font-family: sans-serif; padding: 20px;">Loading PDF securely...</body></html>');
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://sellerp-backend.onrender.com/Account/purchasebillpdf/${cleanId}/`, {
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

  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://sellerp-backend.onrender.com/Account/purchase-po-date-filter/?from_date=${fromDate}&to_date=${toDate}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Purchase Bill API Response:", response.data);

      const rawData = Array.isArray(response.data) ? response.data : 
                      (response.data?.data ? response.data.data : []);

      if (Array.isArray(rawData)) {
        const mappedData = rawData.flatMap((item) => {
          const items = Array.isArray(item.NewGrnList) ? item.NewGrnList : (Array.isArray(item.item_details) ? item.item_details : []);
          const gstDetails = Array.isArray(item.GrnGstTDC) ? item.GrnGstTDC : (Array.isArray(item.gst_details) ? item.gst_details : []);

          console.log(`Mapping item ${item.GrnNo || item.PoNo || item.id}`, { items, gstDetails });

          // If no items, return at least one row for the master data
          if (items.length === 0) {
            const gst = gstDetails[0] || {};
            return [{
              id: item.id,
              year: "",
              grnNo: item.GrnNo || item.PoNo || item.no || "",
              grnDate: item.GrnDate || item.PoDate || item.challan_date || "",
              challanNo: item.ChallanNo || item.PoNo || item.challan_no || "",
              challanDate: item.ChallanDate || item.PoDate || item.challan_date || "",
              invoiceNo: item.InvoiceNo || item.PoNo || item.invoice_no || "",
              invoiceDate: item.InvoiceDate || item.PoDate || item.invoice_Date || "",
              supplier: item.SelectSupplier || item.Supplier || item.supplier_name || "",
              supplierCode: item.SelectSupplier ? item.SelectSupplier.split(" - ")[0] : (item.CodeNo || ""),
              poNo: item.SelectPO || item.PoNo || "",
              total: gst.grand_total || item.GR_Total || item.net_total || item.total || "0",
              user: item.PreparedBy || item.created_by_username || "",
              description: "",
              hsnCode: item.hsnCode || item.hsn_code || item.HSN || item.hsn || "",
              qty: 0,
              dis: parseFloat(item.Disc || item.disc || item.Discount || item.discount || item.dis || 0),
              taxableValue: 0,
              cgst: parseFloat(gst.cgst || item.TOC_CGST || item.cgst || item.cgst_per || item.cgstPer || 0),
              sgst: parseFloat(gst.sgst || item.TOC_SGST || item.sgst || item.sgst_per || item.sgstPer || 0),
              igst: parseFloat(gst.igst || item.TOC_IGST || item.igst || item.igst_per || item.igstPer || 0),
            }];
          }

          return items.map((detail, idx) => {
            const gst = gstDetails[idx] || gstDetails[0] || {};
            const rate = parseFloat(detail.Rate || detail.rate || gst.Rate || 0);
            const qty = parseFloat(detail.Qty || detail.grn_qty || gst.Qty || detail.GrnQty || 0);
            
            const mappedItem = {
              id: `${item.id}-${idx}`,
              year: "",
              grnNo: item.GrnNo || item.PoNo || item.no || "",
              grnDate: item.GrnDate || item.PoDate || item.challan_date || "",
              challanNo: item.ChallanNo || item.PoNo || item.challan_no || "",
              challanDate: item.ChallanDate || item.PoDate || item.challan_date || "",
              invoiceNo: item.InvoiceNo || item.PoNo || item.invoice_no || "",
              invoiceDate: item.InvoiceDate || item.PoDate || item.invoice_Date || "",
              supplier: item.SelectSupplier || item.Supplier || item.supplier_name || "",
              supplierCode: item.SelectSupplier ? item.SelectSupplier.split(" - ")[0] : (item.CodeNo || ""),
              poNo: detail.PoNo || item.SelectPO || item.PoNo || "",
              user: item.PreparedBy || item.created_by_username || "",
              description: (detail.Item || detail.ItemNoCode || detail.item_code || gst.ItemCode) && (detail.Description || detail.ItemDescription || detail.item_description)
                ? `${detail.Item || detail.ItemNoCode || detail.item_code || gst.ItemCode} - ${detail.Description || detail.ItemDescription || detail.item_description}` 
                : (detail.Item || detail.ItemNoCode || detail.item_code || gst.ItemCode || detail.Description || detail.ItemDescription || detail.item_description || ""),
              hsnCode: gst.HSN || detail.HSN || detail.HSNCode || detail.hsn_code || detail.HSN_SAC_Code || detail.hsn_sac_code || detail.hsnSacCode || detail.Hsn || detail.hsn || "",
              dis: parseFloat(detail.Disc || detail.disc || gst.Discount || detail.Discount || detail.discount || detail.dis || detail.dis_per || detail.discount_percent || detail.disc_per || 0),
              qty: qty,
              taxableValue: parseFloat(gst.assessable_value || gst.AssValue || (rate * qty)),
              cgst: parseFloat(gst.cgst || gst.CGST || gst.cgst_per || gst.cgst || detail.CGST || detail.cgst_per || detail.cgst || detail.cgstPer || detail.cgst_percent || item.TOC_CGST || item.cgst || 0),
              sgst: parseFloat(gst.sgst || gst.SGST || gst.sgst_per || gst.sgst || detail.SGST || detail.sgst_per || detail.sgst || detail.sgstPer || detail.sgst_percent || item.TOC_SGST || item.sgst || 0),
              igst: parseFloat(gst.igst || gst.IGST || gst.igst_per || gst.igst || detail.IGST || detail.igst_per || detail.igst || detail.igstPer || detail.igst_percent || item.TOC_IGST || item.igst || 0),
              total: detail.Total || gst.Total || gst.grand_total || item.GR_Total || item.net_total || item.total || (rate * qty).toFixed(2),
              
              // Master Level Data (Footer/Header)
              paymentTerms: item.PaymentTermDay || item.PaymentTerms || "",
              poDate: detail.Date || item.PoDate || "",
              challanNo: item.ChallanNo || item.PoNo || item.no || "",
              challanDate: item.ChallanDate || item.PoDate || item.challan_date || "",
              packCharges: parseFloat(gst.packing_forwarding_charges || item.TOC_PackCharges || 0),
              transCharges: parseFloat(gst.transport_charges || item.TOC_TransportCost || 0),
              insCharges: parseFloat(gst.insurance || item.TOC_Insurance || 0),
              instCharges: parseFloat(gst.installation_charges || item.TOC_InstallationCharges || 0),
              otherCharges: parseFloat(gst.other_charges || item.TOC_OtherCharges || 0),
              tdsPer: parseFloat(gst.Tds || item.TOC_TDS || 0),
            };

            console.log(`Mapped Item Row for DirectBill:`, mappedItem);
            return mappedItem;
          });
        });
        setReportData(mappedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching Purchase Bill report:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = reportData.map((data, index) => ({
      "Sr No.": index + 1,
      "Year": data.year || "",
      "GRN No.": data.grnNo || "",
      "GRN Date": data.grnDate || "",
      "Challan No.": data.challanNo || "",
      "Challan Date": data.challanDate || "",
      "Invoice No.": data.invoiceNo || "",
      "Invoice Date": data.invoiceDate || "",
      "Supplier Name": data.supplier || "",
      "PO No.": data.poNo || "",
      "Total": data.total || "",
      "User": data.user || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Bill");

    // Auto-size columns
    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Purchase_Bill.xlsx");
  };

  return (
    <div className="erp-page purchase-bill">
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
                        <h5 className="header-title mb-0">Pending BILL GRN List</h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                            <span className="me-2 small fw-bold text-secondary">Purchase GRN Auth-Pending Bill :</span>
                            <span className="badge" style={{ backgroundColor: '#3b82f6' }}>225</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                            <span className="me-2 small fw-bold text-secondary">Bill Passing (Purchase) :</span>
                            <span className="badge" style={{ backgroundColor: '#3b82f6' }}>225</span>
                        </div>
                        <button className="vndrbtn" onClick={handleExportExcel}>
                          <FaFileExcel className="me-2" /> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">

                    <div className="row align-items-end g-3">
                      <div className="col-auto d-flex align-items-center gap-3 pe-4">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="poGrn" defaultChecked />
                          <label className="form-check-label fw-bold small" htmlFor="poGrn">PO GRN</label>
                        </div>
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="directGrn" />
                          <label className="form-check-label fw-bold small" htmlFor="directGrn">Direct GRN</label>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold text-start d-block">Plant :</label>
                        <select className="form-select form-select-sm" >
                            <option value="SHARP">SHARP</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                         <label className="form-label mb-1 small fw-bold text-start d-block">From :</label>
                         <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)}  />
                      </div>

                      <div className="col-md-2">
                         <label className="form-label mb-1 small fw-bold text-start d-block">To :</label>
                         <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)}  />
                      </div>

                      <div className="col-md-3 d-flex gap-2">
                        <button className="vndrbtn bg-success border-success" onClick={handleSearch} disabled={loading}>
                          <FaSearch className="me-2" /> {loading ? "Searching..." : "Search"}
                        </button>
                        <button className="vndrbtn bg-secondary border-secondary">
                          <FaCogs className="me-2" /> Search Option
                        </button>
                      </div>
                    </div>
                  
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                        <table className="table table-bordered align-middle mb-0" style={{ tableLayout: "fixed", width: "100%" }}>

                      <thead className="table-light">
                        <tr>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "3%" }}>Sr.</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4%" }}>Year</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>GRN No.</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>GRN Date</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>Challan No.</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>Challan Date</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>Invoice No.</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>Invoice Date</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "21%" }}>Supplier Name</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>PO No.</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>Total</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5%" }}>User</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "3%" }}>View</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}>Auth1</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}>Auth2</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}>QC</th>
                          <th style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4%" }}>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                         {Array.isArray(reportData) && reportData.map((data, index) => (
                          <tr key={data.id}>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "3%" }}>{index + 1}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4%" }}>{data.year}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>
                              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minWidth: 0 }}>{data.grnNo}</div>
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>{data.grnDate}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>
                              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minWidth: 0 }}>{data.challanNo}</div>
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>{data.challanDate}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>
                              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minWidth: 0 }}>{data.invoiceNo}</div>
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5.5%" }}>{data.invoiceDate}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "21%" }}>
                              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minWidth: 0 }}>{data.supplier}</div>
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>
                              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minWidth: 0 }}>{data.poNo}</div>
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "6%" }}>{data.total}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "5%" }}>{data.user}</td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "3%" }}>
                              <FaEye 
                                className="text-primary cursor-pointer" 
                                onClick={() => handleViewPdf(data.id)} 
                                title="View PDF"
                              />
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4.5%" }}>
                                {index % 3 === 0 ? 
                                    <div className="badge bg-success p-1"><FaCheck /></div> : 
                                    <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                                }
                            </td>
                            <td style={{ fontSize: "0.70rem", padding: "4px 2px", textAlign: "center", color: "#475569", whiteSpace: "normal", wordBreak: "break-all", overflowWrap: "anywhere", width: "4%" }}>
                              <input 
                                type="checkbox" 
                                checked={selectedIds.includes(data.id)}
                                onChange={() => handleCheckboxChange(data.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="footer-actions mt-3 text-end">
                    <button className="vndrbtn bg-success border-success" onClick={handleConfirmToGstBill}>
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

export default PurchaseBill;
