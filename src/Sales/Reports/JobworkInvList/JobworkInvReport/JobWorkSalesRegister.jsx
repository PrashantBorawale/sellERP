
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./JobWorkSalesRegister.css";


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const JobWorkSalesRegister = () => {
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
    <div className="JobWorkSalesRegisterMaster">
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
                <div className="JobWorkSalesRegister">
                  <div className="JobWorkSalesRegister-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Jobwork Invoice List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" to="#/" >
                          PDF
                        </button>
                        <button type="button" className=" vndrbtn" to="#/" >
                          Excel
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="JobWorkSalesRegister-Main">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Plant:</label>
                          <select name="" className="form-control mt-2" id="">
                            <option value="">Produlink</option>
                          </select>
                        </div>

                        <div className="col-6 col-md-2 col-lg-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>

                      </div>

                      <div className="row g-3 mt-1 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Customer Name :</label>
                          <input type="text" className="form-control mt-2" />
                        </div>
                        <div className="col-6 col-md-2 col-lg-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Invoice No :</label>
                          <input type="text" className="form-control mt-2" />
                        </div>
                        <div className="col-6 col-md-2 col-lg-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="JobWorkSalesRegister-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                        </tr>
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
  )
}


export default JobWorkSalesRegister