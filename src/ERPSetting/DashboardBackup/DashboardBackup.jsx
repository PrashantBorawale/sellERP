import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./DashboardBackup.css";
import { Link } from "react-router-dom";

const DashboardBackup = () => {
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
    <div className="DashboardBackup">
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="main-container">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
        <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="PRoWorkorderList mt-5">
            <div className="PRoWorkorderList-header mb-4 text-start">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <h5 className="header-title">Database Backup</h5>
                </div>
                <div className="col-md-8 mt-2">
                  Folder Path Setting Value:{" "}
                  <strong>D:\MANUAL BACKUP FROM ERP</strong>
                </div>
                <div className="col-md-2 text-end mt-2">
                  <button type="button" className="btn">
                    Backup Database
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped backup-table text-start">
              <thead>
                <tr>
                  <th>Database</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ERP\Produlink20240225_30Mar2024_14_27_16.bak</td>
                  <td>66 MB</td>
                  <td>
                    <Link href="#" className="download-link">
                      .bak Download
                    </Link>
                    <Link href="#" className="download-link">
                      .Zip Download
                    </Link>
                    <Link href="#" className="delete-link">
                      Delete
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>ERP\Produlink_LIVE_01042024.bak</td>
                  <td>53 MB</td>
                  <td>
                    <Link href="#" className="download-link">
                      .bak Download
                    </Link>
                    <Link href="#" className="download-link">
                      .Zip Download
                    </Link>
                    <Link href="#" className="delete-link">
                      Delete
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>ERP\Produlink_Live_2582024_15_42_48.bak</td>
                  <td>63 MB</td>
                  <td>
                    <Link href="#" className="download-link">
                      .bak Download
                    </Link>
                    <Link href="#" className="download-link">
                      .Zip Download
                    </Link>
                    <Link href="#" className="delete-link">
                      Delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer>
            <p>
              Step 1: Set Backup Path , Company Setting , Parameter Setting
              ,General Setting , DB Backup Path
            </p>
            <p>Step 2: Set Folder Access Permission</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardBackup;
