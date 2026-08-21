import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTITC04.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";

const GSTITC04 = () => {
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
    { sr: 1, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701223", outDate: "08/05/2026", desc: "B3HF003020 PRIMARY PISTON FOR TMCTVS KING", uom: "NOS", qty: "600", tariff: "87141090", taxable: "120", cgst: "9", sgst: "9", igst: "0" },
    { sr: 2, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701223", outDate: "08/05/2026", desc: "B3SD001260 SPRING GUIDE SOCKET FACELIFT", uom: "NOS", qty: "2646", tariff: "87141090", taxable: "222.264", cgst: "9", sgst: "9", igst: "0" },
    { sr: 3, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701224", outDate: "08/05/2026", desc: "B3SD001260 SPRING GUIDE SOCKET FACELIFT", uom: "NOS", qty: "7797", tariff: "87141090", taxable: "654.948", cgst: "9", sgst: "9", igst: "0" },
    { sr: 4, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701224", outDate: "08/05/2026", desc: "520HF00102 PRIMARY PISTON FOR TMC", uom: "NOS", qty: "3009", tariff: "87141090", taxable: "571.71", cgst: "9", sgst: "9", igst: "0" },
    { sr: 5, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701224", outDate: "08/05/2026", desc: "B3HF003020 PRIMARY PISTON FOR TMCTVS KING", uom: "NOS", qty: "198", tariff: "87141090", taxable: "39.6", cgst: "9", sgst: "9", igst: "0" },
    { sr: 6, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701225", outDate: "08/05/2026", desc: "520HF00102 PRIMARY PISTON FOR TMC", uom: "NOS", qty: "2480", tariff: "87141090", taxable: "471.2", cgst: "9", sgst: "9", igst: "0" },
    { sr: 7, party: "G And D Industries", gstNo: "27AJEPG8421G1ZD", state: "27-MAHARASHTRA", outNo: "262701225", outDate: "08/05/2026", desc: "520HF00202 SECONDARY PISTON FOR TMC", uom: "KGS", qty: "1635", tariff: "87141090", taxable: "981", cgst: "9", sgst: "9", igst: "0" },
    { sr: 8, party: "GAURAV ENTERPRISES", gstNo: "27CYIPS2649F1Z1", state: "27", outNo: "262701226", outDate: "08/05/2026", desc: "520QJ00412 WHEEL CYL SLOTTED PISTONFRONT", uom: "NOS", qty: "5032", tariff: "87141090", taxable: "2767.6", cgst: "9", sgst: "9", igst: "0" },
    { sr: 9, party: "GAURAV ENTERPRISES", gstNo: "27CYIPS2649F1Z1", state: "27", outNo: "262701226", outDate: "08/05/2026", desc: "520QJ00312 WEEL CYLSLOTTED PISTONREAR", uom: "NOS", qty: "6151", tariff: "87141090", taxable: "4194.982", cgst: "9", sgst: "9", igst: "0" },
    { sr: 10, party: "GAURAV ENTERPRISES", gstNo: "27CYIPS2649F1Z1", state: "27", outNo: "262701227", outDate: "09/05/2026", desc: "520HF00102 PRIMARY PISTON FOR TMC", uom: "NOS", qty: "1200", tariff: "87141090", taxable: "1500", cgst: "9", sgst: "9", igst: "0" },
    { sr: 11, party: "GAURAV ENTERPRISES", gstNo: "27CYIPS2649F1Z1", state: "27", outNo: "262701227", outDate: "09/05/2026", desc: "B3SD001260 SPRING GUIDE SOCKET FACELIFT", uom: "NOS", qty: "850", tariff: "87141090", taxable: "450", cgst: "9", sgst: "9", igst: "0" },
    { sr: 12, party: "GAURAV ENTERPRISES", gstNo: "27CYIPS2649F1Z1", state: "27", outNo: "262701228", outDate: "09/05/2026", desc: "B3HF003020 PRIMARY PISTON FOR TMCTVS KING", uom: "NOS", qty: "340", tariff: "87141090", taxable: "125", cgst: "9", sgst: "9", igst: "0" },
  ];

  return (
    <div className="itc04-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* Header Section */}
                <div className="top-action-bar mb-3">
                  <h5 className="header-title text-start me-auto">GST ITC_04 Report</h5>
                  
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="companyHeader" />
                    <label className="form-check-label" htmlFor="companyHeader">With Company Header</label>
                  </div>

                  <div className="d-flex align-items-center gap-1 border-start ps-3">
                    <span className="action-label">Goods Sent To Jobwork :</span>
                    <button className="btn">
                      <FaFileExcel className="excel-icon" /> Export Excel Details
                    </button>
                    <button className="btn">
                      <FaFileExcel className="excel-icon" /> Export Excel Summary
                    </button>
                  </div>

                  <div className="d-flex align-items-center gap-1 border-start ps-3">
                    <span className="action-label">Goods Received From Jobwork :</span>
                    <button className="btn">
                      <FaFileExcel className="excel-icon" /> Export Excel
                    </button>
                    <button className="btn">
                      <FaFileExcel className="excel-icon" /> Export Excel Summary
                    </button>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="header-section mb-3">
                  <div className="d-flex align-items-end flex-wrap gap-4">
                    <div className="d-flex flex-column gap-1">
                      <label className="form-label fw-bold">From Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ width: "145px" }}
                      />
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <label className="form-label fw-bold">To Date :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ width: "145px" }}
                      />
                    </div>
                    <div className="d-flex flex-column gap-1">
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
                    <button className="btn mb-1">
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
                          <th>Party Name</th>
                          <th>GSTNo</th>
                          <th>StateCode</th>
                          <th>Out No</th>
                          <th>Out Date</th>
                          <th>Description</th>
                          <th>UOM</th>
                          <th>Qty</th>
                          <th>TariffHead No.</th>
                          <th>Taxable Value</th>
                          <th>CGST %</th>
                          <th>SGST %</th>
                          <th>IGST %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="text-center">{row.sr}</td>
                            <td>{row.party}</td>
                            <td>{row.gstNo}</td>
                            <td>{row.state}</td>
                            <td>{row.outNo}</td>
                            <td>{row.outDate}</td>
                            <td style={{ minWidth: "250px" }}>{row.desc}</td>
                            <td className="text-center">{row.uom}</td>
                            <td className="text-right">{row.qty}</td>
                            <td className="text-center">{row.tariff}</td>
                            <td className="text-right">{row.taxable}</td>
                            <td className="text-center">{row.cgst}</td>
                            <td className="text-center">{row.sgst}</td>
                            <td className="text-center">{row.igst}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Footer Section */}
                  <div className="footer-summary">
                    Total Record: 105
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

export default GSTITC04;
