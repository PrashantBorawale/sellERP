import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./TCSRegister.css";
import { FaFileExcel, FaSearch } from "react-icons/fa";

const TCSRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [data, setData] = useState([
    { sr: 1, invNo: "262700653", invDate: "09/04/2026", customer: "S.K.TRADERS", gstNo: "27AEPPS9733M1ZF", panNo: "AEPPS9733M", subTotal: "244,160.00", gstTax: "43,948.80", tcsRate: "001.00", tcsAmt: "2,441.60", total: "290,550.40" },
    { sr: 2, invNo: "262702115", invDate: "27/04/2026", customer: "S.K.TRADERS", gstNo: "27AEPPS9733M1ZF", panNo: "AEPPS9733M", subTotal: "146,160.00", gstTax: "26,308.80", tcsRate: "001.00", tcsAmt: "1,461.60", total: "173,930.40" },
    { sr: 3, invNo: "262702776", invDate: "06/05/2026", customer: "S.K.TRADERS", gstNo: "27AEPPS9733M1ZF", panNo: "AEPPS9733M", subTotal: "230,720.00", gstTax: "41,529.60", tcsRate: "001.00", tcsAmt: "2,307.20", total: "274,556.80" },
    { sr: 4, invNo: "262702777", invDate: "07/05/2026", customer: "R.K. STEELS", gstNo: "27BBCCD9733M1ZF", panNo: "BBCCD9733M", subTotal: "100,000.00", gstTax: "18,000.00", tcsRate: "001.00", tcsAmt: "1,000.00", total: "119,000.00" },
    { sr: 5, invNo: "262702778", invDate: "08/05/2026", customer: "R.K. STEELS", gstNo: "27BBCCD9733M1ZF", panNo: "BBCCD9733M", subTotal: "150,000.00", gstTax: "27,000.00", tcsRate: "001.00", tcsAmt: "1,500.00", total: "178,500.00" },
    { sr: 6, invNo: "262702779", invDate: "09/05/2026", customer: "S.K.TRADERS", gstNo: "27AEPPS9733M1ZF", panNo: "AEPPS9733M", subTotal: "50,000.00", gstTax: "9,000.00", tcsRate: "001.00", tcsAmt: "500.00", total: "59,500.00" },
    { sr: 7, invNo: "262702780", invDate: "10/05/2026", customer: "V.P. INDUSTRIES", gstNo: "27CCDD9733M1ZF", panNo: "CCDD9733M", subTotal: "200,000.00", gstTax: "36,000.00", tcsRate: "001.00", tcsAmt: "2,000.00", total: "238,000.00" },
    { sr: 8, invNo: "262702781", invDate: "11/05/2026", customer: "V.P. INDUSTRIES", gstNo: "27CCDD9733M1ZF", panNo: "CCDD9733M", subTotal: "300,000.00", gstTax: "54,000.00", tcsRate: "001.00", tcsAmt: "3,000.00", total: "357,000.00" },
    { sr: 9, invNo: "262702782", invDate: "12/05/2026", customer: "S.K.TRADERS", gstNo: "27AEPPS9733M1ZF", panNo: "AEPPS9733M", subTotal: "120,000.00", gstTax: "21,600.00", tcsRate: "001.00", tcsAmt: "1,200.00", total: "142,800.00" },
    { sr: 10, invNo: "262702783", invDate: "13/05/2026", customer: "R.K. STEELS", gstNo: "27BBCCD9733M1ZF", panNo: "BBCCD9733M", subTotal: "80,000.00", gstTax: "14,400.00", tcsRate: "001.00", tcsAmt: "800.00", total: "95,200.00" },
  ]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  return (
    <div className="tcs-register">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header - Standardized */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0 text-start">TCS Register</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2 border">
                          <FaFileExcel className="text-success" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Standardized Flex Layout */}
                  <div className="header-section mb-4">
                    <div className="d-flex align-items-end gap-3 flex-nowrap mt-1 mb-2">
                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <label className="form-label mb-1 fw-bold">From Date:</label>
                        <input type="text" className="form-control" defaultValue="08/04/2026" />
                      </div>
                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <label className="form-label mb-1 fw-bold">To Date:</label>
                        <input type="text" className="form-control" defaultValue="09/05/2026" />
                      </div>
                      <div className="d-flex flex-column" style={{ minWidth: "300px" }}>
                        <label className="form-label mb-1 fw-bold">Customer Name:</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="text" className="form-control" placeholder="Search Customer..." />
                           <button className="btn ms-1 text-nowrap d-flex align-items-center gap-2">
                             <FaSearch size={12} /> Search
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section - Blue Headers */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr</th>
                          <th>Inv No.</th>
                          <th>Inv Date</th>
                          <th>Customer Name</th>
                          <th>GST No</th>
                          <th>PAN No</th>
                          <th>SubTotal</th>
                          <th>GST Tax</th>
                          <th>TCS Rate</th>
                          <th>TCS Amt</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sr}</td>
                            <td>{row.invNo}</td>
                            <td>{row.invDate}</td>
                            <td className="text-start">{row.customer}</td>
                            <td>{row.gstNo}</td>
                            <td>{row.panNo}</td>
                            <td className="text-end">{row.subTotal}</td>
                            <td className="text-end">{row.gstTax}</td>
                            <td className="text-end">{row.tcsRate}</td>
                            <td className="text-end">{row.tcsAmt}</td>
                            <td className="text-end">{row.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Section */}
                  <div className="d-flex align-items-center gap-3 mt-3 px-2">
                    <span className="pagination-box">
                      {currentPage}
                    </span>
                    <span 
                      className={`pagination-link ${currentPage === 1 ? 'disabled text-muted' : ''}`}
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
                    >
                      Previous
                    </span>
                    <span 
                      className={`pagination-link ${currentPage === totalPages ? 'disabled text-muted' : ''}`}
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                    >
                      Next
                    </span>
                  </div>

                  {/* Footer Section - Standardized Bottom Bar */}
                  <div className="footer-summary mt-3 shadow-sm">
                    <div className="fw-bold">Total Record's : {data.length}</div>
                    <div className="fw-bold">Total TCS Amt : 6,210.40</div>
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

export default TCSRegister;
