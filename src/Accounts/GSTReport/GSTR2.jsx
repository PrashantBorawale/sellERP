import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR2.css";
import { FaSearch, FaFileExcel, FaList } from "react-icons/fa";

const GSTR2 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [series, setSeries] = useState("ALL");

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
    { sr: 1, type: "EXP", postingNo: "262700058", postingDate: "08/05/2026", supplierCode: "000072", supplierName: "SAMARTHYA ENGINEERING", gstNo: "27", invoiceNo: "1093", invoiceDate: "03/04/2026", basicAmt: "117263.7", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "117263.7", igstPer: "0", igstAmt: "0", cgstPer: "9", cgstAmt: "10553.76", sgstPer: "9", sgstAmt: "10553.76", tdsPer: "0", tdsAmt: "0", adjAmt: "-0.22", totalAmt: "138371" },
    { sr: 2, type: "EXP", postingNo: "262700059", postingDate: "08/05/2026", supplierCode: "000085", supplierName: "TATA MOTORS LTD", gstNo: "27", invoiceNo: "1105", invoiceDate: "04/04/2026", basicAmt: "245000.0", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "245000.0", igstPer: "18", igstAmt: "44100", cgstPer: "0", cgstAmt: "0", sgstPer: "0", sgstAmt: "0", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "289100" },
    { sr: 3, type: "EXP", postingNo: "262700060", postingDate: "08/05/2026", supplierCode: "000102", supplierName: "RELIANCE INDUSTRIES", gstNo: "27", invoiceNo: "1112", invoiceDate: "05/04/2026", basicAmt: "56000.0", discAmt: "500", toc: "0", ntoc: "0", taxableAmt: "55500.0", igstPer: "0", igstAmt: "0", cgstPer: "9", cgstAmt: "4995", sgstPer: "9", sgstAmt: "4995", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "65490" },
    { sr: 4, type: "EXP", postingNo: "262700061", postingDate: "09/05/2026", supplierCode: "000145", supplierName: "ADANI ENTERPRISES", gstNo: "27", invoiceNo: "1120", invoiceDate: "06/04/2026", basicAmt: "89000.0", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "89000.0", igstPer: "18", igstAmt: "16020", cgstPer: "0", cgstAmt: "0", sgstPer: "0", sgstAmt: "0", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "105020" },
    { sr: 5, type: "EXP", postingNo: "262700062", postingDate: "09/05/2026", supplierCode: "000210", supplierName: "MAHINDRA & MAHINDRA", gstNo: "27", invoiceNo: "1135", invoiceDate: "07/04/2026", basicAmt: "125000.0", discAmt: "1000", toc: "0", ntoc: "0", taxableAmt: "124000.0", igstPer: "0", igstAmt: "0", cgstPer: "14", cgstAmt: "17360", sgstPer: "14", sgstAmt: "17360", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "158720" },
    { sr: 6, type: "EXP", postingNo: "262700063", postingDate: "09/05/2026", supplierCode: "000305", supplierName: "BAJAJ AUTO LTD", gstNo: "27", invoiceNo: "1140", invoiceDate: "08/04/2026", basicAmt: "45000.0", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "45000.0", igstPer: "12", igstAmt: "5400", cgstPer: "0", cgstAmt: "0", sgstPer: "0", sgstAmt: "0", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "50400" },
    { sr: 7, type: "EXP", postingNo: "262700064", postingDate: "09/05/2026", supplierCode: "000412", supplierName: "HERO MOTOCORP", gstNo: "27", invoiceNo: "1155", invoiceDate: "09/04/2026", basicAmt: "78000.0", discAmt: "200", toc: "0", ntoc: "0", taxableAmt: "77800.0", igstPer: "0", igstAmt: "0", cgstPer: "9", cgstAmt: "7002", sgstPer: "9", sgstAmt: "7002", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "91804" },
    { sr: 8, type: "EXP", postingNo: "262700065", postingDate: "10/05/2026", supplierCode: "000520", supplierName: "ASIAN PAINTS LTD", gstNo: "27", invoiceNo: "1160", invoiceDate: "10/04/2026", basicAmt: "32000.0", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "32000.0", igstPer: "28", igstAmt: "8960", cgstPer: "0", cgstAmt: "0", sgstPer: "0", sgstAmt: "0", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "40960" },
    { sr: 9, type: "EXP", postingNo: "262700066", postingDate: "10/05/2026", supplierCode: "000615", supplierName: "HDFC BANK", gstNo: "27", invoiceNo: "1175", invoiceDate: "11/04/2026", basicAmt: "15000.0", discAmt: "0", toc: "0", ntoc: "0", taxableAmt: "15000.0", igstPer: "18", igstAmt: "2700", cgstPer: "0", cgstAmt: "0", sgstPer: "0", sgstAmt: "0", tdsPer: "0", tdsAmt: "0", adjAmt: "0.00", totalAmt: "17700" },
    { sr: 10, type: "EXP", postingNo: "262700067", postingDate: "10/05/2026", supplierCode: "000725", supplierName: "LARSEN & TOUBRO", gstNo: "27", invoiceNo: "1180", invoiceDate: "12/04/2026", basicAmt: "500000.0", discAmt: "5000", toc: "0", ntoc: "0", taxableAmt: "495000.0", igstPer: "0", igstAmt: "0", cgstPer: "9", cgstAmt: "44550", sgstPer: "9", sgstAmt: "44550", tdsPer: "2", tdsAmt: "9900", adjAmt: "0.00", totalAmt: "584100" },
  ];

  return (
    <div className="gstr2-page">
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
                      <h5 className="header-title text-start mb-0">GSTR 2</h5>
                    </div>
                    <div className="col-md-6 text-end d-flex justify-content-end gap-2">
                      <button className="btn">
                        <FaList className="me-1 text-primary" /> GSTR2A
                      </button>
                      <button className="btn">
                        <FaFileExcel className="excel-icon me-1" /> Export To Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="header-section mb-3">
                  <div className="d-flex align-items-center flex-wrap gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">From Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">To Date :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">Series :</label>
                      <select
                        className="form-select form-select-sm"
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                        style={{ width: "150px" }}
                      >
                        <option value="ALL">ALL</option>
                      </select>
                    </div>
                    <button className="btn">
                      <FaSearch className="search-icon me-1" /> Search
                    </button>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-container">
                  <div className="table-responsive">
                    <table className="custom-table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Type</th>
                          <th>Posting No</th>
                          <th>Posting Date</th>
                          <th>SupplierCode</th>
                          <th>SupplierName</th>
                          <th>GstNo</th>
                          <th>InvoiceNo</th>
                          <th>InvoiceDate</th>
                          <th>Basic Amt</th>
                          <th>Disc Amt</th>
                          <th>TOC</th>
                          <th>NTOC</th>
                          <th>Taxable Amt</th>
                          <th>IGST Per</th>
                          <th>IGST Amt</th>
                          <th>CGST Per</th>
                          <th>CGST Amt</th>
                          <th>SGST Per</th>
                          <th>SGST Amt</th>
                          <th>TDS Per</th>
                          <th>TDSAmt</th>
                          <th>Adj Amt</th>
                          <th>Total Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="text-center">{row.sr}</td>
                            <td>{row.type}</td>
                            <td>{row.postingNo}</td>
                            <td>{row.postingDate}</td>
                            <td>{row.supplierCode}</td>
                            <td>{row.supplierName}</td>
                            <td>{row.gstNo}</td>
                            <td>{row.invoiceNo}</td>
                            <td>{row.invoiceDate}</td>
                            <td className="text-right">{row.basicAmt}</td>
                            <td className="text-right">{row.discAmt}</td>
                            <td className="text-right">{row.toc}</td>
                            <td className="text-right">{row.ntoc}</td>
                            <td className="text-right">{row.taxableAmt}</td>
                            <td className="text-center">{row.igstPer}</td>
                            <td className="text-right">{row.igstAmt}</td>
                            <td className="text-center">{row.cgstPer}</td>
                            <td className="text-right">{row.cgstAmt}</td>
                            <td className="text-center">{row.sgstPer}</td>
                            <td className="text-right">{row.sgstAmt}</td>
                            <td className="text-center">{row.tdsPer}</td>
                            <td className="text-right">{row.tdsAmt}</td>
                            <td className="text-right">{row.adjAmt}</td>
                            <td className="text-right fw-bold">{row.totalAmt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Footer Record Count */}
                  <div className="footer-summary">
                    Total Record: {tableData.length}
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

export default GSTR2;
