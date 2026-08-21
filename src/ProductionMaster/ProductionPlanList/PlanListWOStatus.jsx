import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link, useNavigate } from "react-router-dom";

const PlanListWOStatus = () => {
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

 const navigate = useNavigate();

    const handleClose = () => {
        navigate("/ProductionPlanList");
    };


  return (
    <div className="PRoWorkorderListMaster">
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
                <div className="  ">
                  <div className="PRoWorkorderList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Work Order Status</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link
                          type="button"
                          className="vndrbtn"
                          to="/"
                        >
                         Export To Excel
                        </Link>
                         <button
                                    className="vndrbtn  me-2"
                                    aria-label="Close"
                                    onClick={handleClose} >
                                    X </button>
                      </div>
                    </div>
                  </div>

                  <div className="PRoWorkorderList-Main mt-2">
                    <div className="container-fluid">
                      <div className="row text-start">
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

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-1 col-lg-2">
                          <label>Item Name:</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-2 mt-1">
                          <label></label>
                          <button
                            type="button"
                            className="vndrbtn w-100"
                          >
                            Search
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className=" PRoWorkorderListtable table-responsive mt-2">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">W.Order No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">WO Qty</th>
                          <th scope="col">Prod. Qty</th>
                          <th scope="col">Bal Qty</th>
                          <th scope="col">Close Remark</th>
                          <th scope="col">Batch Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>January</td>
                          <td>01/01/2024</td>
                          <td>31/01/2024</td>
                          <td>1</td>
                          <td>2024</td>
                          <td>1</td>
                          <td>January</td>
                          <td>01/01/2024</td>
                          <td>31/01/2024</td>
                          <td>1</td>
                        </tr>
                        {/* More rows can be added here */}
                      </tbody>
                    </table>
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

export default PlanListWOStatus;
