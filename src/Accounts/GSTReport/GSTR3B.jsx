import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR3B.css";
import { FaSearch } from "react-icons/fa";

const GSTR3B = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");

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
  const outwardData = [
    { id: 1, nature: "(a) Outward Taxable supplies (other than zero rated, nil rated and exempted)", taxableValue: "3400188.94", igst: "140937.35", cgst: "235548.34", sgst: "235548.34", cess: "0", total: "612034.03" },
    { id: 2, nature: "(b) Outward Taxable supplies (zero rated )", taxableValue: "0", igst: "0", cgst: "", sgst: "", cess: "0", total: "0" },
    { id: 3, nature: "(c) Other Outward Taxable supplies (Nil rated, exempted)", taxableValue: "0", igst: "", cgst: "", sgst: "", cess: "", total: "0" },
    { id: 4, nature: "(d) Inward supplies (liable to reverse charge)", taxableValue: "0", igst: "0", cgst: "0", sgst: "0", cess: "0", total: "0" },
    { id: 5, nature: "(e) Non-GST Outward supplies", taxableValue: "0", igst: "", cgst: "", sgst: "", cess: "", total: "0" },
    { id: "", nature: "Total", taxableValue: "3400188.94", igst: "140937.35", cgst: "235548.34", sgst: "235548.34", cess: "0", total: "612034.03", isTotal: true },
  ];

  const inwardData = [
    { id: 1, details: "Eligible ITC", taxableValue: "117263.7", igst: "0", cgst: "10553.76", sgst: "10553.76", cess: "0", total: "21107.52" },
    { id: 2, details: "Import of Goods", taxableValue: "50000.00", igst: "9000", cgst: "0", sgst: "0", cess: "0", total: "59000.00" },
    { id: 3, details: "Import of Services", taxableValue: "25000.00", igst: "4500", cgst: "0", sgst: "0", cess: "0", total: "29500.00" },
    { id: 4, details: "Inward supplies from ISD", taxableValue: "0", igst: "0", cgst: "0", sgst: "0", cess: "0", total: "0" },
    { id: 5, details: "All other ITC", taxableValue: "10000.00", igst: "0", cgst: "900", sgst: "900", cess: "0", total: "11800.00" },
    { id: 6, details: "Reversal of ITC", taxableValue: "5000.00", igst: "0", cgst: "450", sgst: "450", cess: "0", total: "5900.00" },
    { id: 7, details: "Net ITC Available", taxableValue: "197263.70", igst: "13500.00", cgst: "11003.76", sgst: "11003.76", cess: "0", total: "232771.22" },
  ];

  const diffData = [
    { id: 1, details: "Total Outward", taxableValue: "3400188.94", igst: "140937.35", cgst: "235548.34", sgst: "235548.34", cess: "0", total: "612034.03" },
    { id: 2, details: "Total Inward", taxableValue: "117263.7", igst: "0", cgst: "10553.76", sgst: "10553.76", cess: "0", total: "21107.52" },
    { id: 3, details: "Difference", taxableValue: "3282925.24", igst: "140937.35", cgst: "224994.58", sgst: "224994.58", cess: "0", total: "590926.51" },
    { id: 4, details: "Adjustment", taxableValue: "0", igst: "0", cgst: "0", sgst: "0", cess: "0", total: "0" },
    { id: 5, details: "Final Payable", taxableValue: "3282925.24", igst: "140937.35", cgst: "224994.58", sgst: "224994.58", cess: "0", total: "590926.51" },
    { id: 6, details: "Cash Paid", taxableValue: "0", igst: "0", cgst: "0", sgst: "0", cess: "0", total: "0" },
  ];

  return (
    <div className="gstr3b-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

                {/* Header Section */}
                <div className="WorkOrderEntry-header mb-3">
                  <h5 className="header-title text-start">GSTR 3B</h5>
                </div>

                {/* Filter Section */}
                <div className="header-section mb-3">
                  <div className="d-flex align-items-end flex-wrap gap-4">

                    {/* Date Inputs */}
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

                    {/* Outward Checkboxes */}
                    <div className="filter-group d-flex flex-column gap-1">
                      <div className="checkbox-group-title">Outward :</div>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Invoice</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">LB Invoice</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Sales Rate Diff</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Purchase Rate Diff</label>
                        </div>
                      </div>
                    </div>

                    <div className="filter-divider"></div>

                    {/* Inward Checkboxes */}
                    <div className="filter-group d-flex flex-column gap-1">
                      <div className="checkbox-group-title">Inward :</div>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Purchase</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Jobwork</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Credit Note</label>
                        </div>
                      </div>
                    </div>

                    <button className="btn">
                      <FaSearch className="search-icon me-1" /> Search
                    </button>
                  </div>
                </div>

                {/* Table 1: Outward */}
                <div className="table-label-header">Outward</div>
                <div className="table-responsive">
                  <table className="custom-table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th style={{ minWidth: "400px" }}>Nature of Supplies</th>
                        <th>Total Taxable value</th>
                        <th>Integrated Tax</th>
                        <th>Central Tax</th>
                        <th>State/UT Tax</th>
                        <th>Cess</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outwardData.map((row) => (
                        <tr key={row.id} className={row.isTotal ? "fw-bold" : ""}>
                          <td className="text-center">{row.id}</td>
                          <td>{row.nature}</td>
                          <td className="text-right">{row.taxableValue}</td>
                          <td className="text-right">{row.igst}</td>
                          <td className="text-right">{row.cgst}</td>
                          <td className="text-right">{row.sgst}</td>
                          <td className="text-center">{row.cess}</td>
                          <td className="text-right fw-bold text-primary">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table 2: Inward */}
                <div className="table-label-header">Inward</div>
                <div className="table-responsive">
                  <table className="custom-table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th style={{ minWidth: "400px" }}>Details</th>
                        <th>Total Taxable value</th>
                        <th>Integrated Tax</th>
                        <th>Central Tax</th>
                        <th>State/UT Tax</th>
                        <th>Cess</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inwardData.map((row) => (
                        <tr key={row.id}>
                          <td className="text-center">{row.id}</td>
                          <td>{row.details}</td>
                          <td className="text-right">{row.taxableValue}</td>
                          <td className="text-right">{row.igst}</td>
                          <td className="text-right">{row.cgst}</td>
                          <td className="text-right">{row.sgst}</td>
                          <td className="text-center">{row.cess}</td>
                          <td className="text-right fw-bold text-primary">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table 3: Diff */}
                <div className="table-label-header">Outward / Inward Diff</div>
                <div className="table-responsive">
                  <table className="custom-table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th style={{ minWidth: "400px" }}>Details</th>
                        <th>Total Taxable value</th>
                        <th>Integrated Tax</th>
                        <th>Central Tax</th>
                        <th>State/UT Tax</th>
                        <th>Cess</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diffData.map((row) => (
                        <tr key={row.id}>
                          <td className="text-center">{row.id}</td>
                          <td>{row.details}</td>
                          <td className="text-right">{row.taxableValue}</td>
                          <td className="text-right">{row.igst}</td>
                          <td className="text-right">{row.cgst}</td>
                          <td className="text-right">{row.sgst}</td>
                          <td className="text-center">{row.cess}</td>
                          <td className="text-right fw-bold text-primary">{row.total}</td>
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
  );
};

export default GSTR3B;
