import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";


const ToolConsumptionReport = () => {

  const [sideNavOpen, setSideNavOpen] = useState(false);
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
    <div className="ProductionEntryMasterList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ProductionEntryList">
                  <div className="ProductionEntryList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Tool Consumption Report
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button
                          type="button"
                          className="vndrbtn"
                          to="/"
                        >
                          Export - Excel
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ProductionEntryList-Main mt-2">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">

                        {/* From Date */}
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Item Name :</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-1 mt-4">
                          <button
                            type="button"
                            className="vndrbtn w-100"
                            style={{ marginTop: "15px" }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ProductionEntryList-table mt-2">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Item No</th>
                            <th scope="col">Item Code </th>
                            <th scope="col">Item Desc</th>
                            <th scope="col">StoreStock </th>
                            <th scope="col">OP Qty</th>
                            <th scope="col">Mat. Issue Qty</th>
                            <th scope="col">Prod Con Qty</th>
                            <th scope="col">( Issue Qty - Con Qty )</th>
                            <th scope="col">Balance Qty</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                  <button className="vndrbtn">View</button>
                                </td>
                              </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {/* <div className="d-flex justify-content-end mt-3">
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handlePrevPage}>Previous</button>
                          </li>

                          {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                              </button>
                            </li>
                          ))}

                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handleNextPage}>Next</button>
                          </li>
                        </ul>
                      </nav>
                    </div> */}

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

export default ToolConsumptionReport;
