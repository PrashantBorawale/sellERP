import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";

import "./ViewItemMaster.css";
const ViewItemMaster = () => {
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

  const [records] = useState([
    {
      id: 1,
      type: "Visible",
      catType: "1",
      subGroupId: "True",
      itemNo: true,
      itemCode: true,
      itemDesc: true,
      revisionNo: true,
      unitCode: true,
      minLevel: true,
      maxLevel: true,
      tariffHeadNo: true,
      pcRate: true,
      qty: true,
    },
    {
      id: 2,
      type: "Compulsory",
      catType: "1",
      subGroupId: "False",
      itemNo: false,
      itemCode: false,
      itemDesc: false,
      revisionNo: false,
      unitCode: false,
      minLevel: false,
      maxLevel: false,
      tariffHeadNo: false,
      pcRate: false,
      qty: false,
    },
    {
      id: 3,
      type: "Visible",
      catType: "2",
      subGroupId: "True",
      itemNo: true,
      itemCode: true,
      itemDesc: true,
      revisionNo: true,
      unitCode: true,
      minLevel: true,
      maxLevel: true,
      tariffHeadNo: true,
      pcRate: true,
      qty: true,
    },
    {
      id: 4,
      type: "Compulsory",
      catType: "2",
      subGroupId: "False",
      itemNo: false,
      itemCode: false,
      itemDesc: false,
      revisionNo: false,
      unitCode: false,
      minLevel: false,
      maxLevel: false,
      tariffHeadNo: false,
      pcRate: false,
      qty: false,
    },
  ]);

  const handleSetDefault = () => {
    // Implementation for setting default records
    console.log("Setting default records");
  };

  const handleDelete = () => {
    // Implementation for deleting records
    console.log("Deleting records");
  };

  const handleClose = () => {
    // Implementation for closing the view
    console.log("Closing view");
  };

  return (
    <div className="Itemmastersetup">
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
                <div className="view-item-master">
                  <div className="ItemSetup-header mb-4 text-start">
                    <div className="row align-items-start">
                      <div className="view-header">
                        <h2 className="header-title">Item Master Setup View</h2>
                      </div>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button onClick={handleSetDefault}>
                      Set/Insert Default Record
                    </button>
                    <button onClick={handleDelete}>Delete Record</button>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>CatType</th>
                          <th>SubGroupId</th>
                          <th>ItemNo</th>
                          <th>ItemCode</th>
                          <th>ItemDesc</th>
                          <th>RevisionNo</th>
                          <th>UnitCode</th>
                          <th>MinLevel</th>
                          <th>MaxLevel</th>
                          <th>TariffHeadNo</th>
                          <th>PCRate</th>
                          <th>Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record) => (
                          <tr key={record.id}>
                            <td>{record.catType}</td>
                            <td>{record.subGroupId}</td>
                            <td>{record.itemNo ? "True" : "False"}</td>
                            <td>{record.itemCode ? "True" : "False"}</td>
                            <td>{record.itemDesc ? "True" : "False"}</td>
                            <td>{record.revisionNo ? "True" : "False"}</td>
                            <td>{record.unitCode ? "True" : "False"}</td>
                            <td>{record.minLevel ? "True" : "False"}</td>
                            <td>{record.maxLevel ? "True" : "False"}</td>
                            <td>{record.tariffHeadNo ? "True" : "False"}</td>
                            <td>{record.pcRate ? "True" : "False"}</td>
                            <td>{record.qty ? "True" : "False"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="close-button">
                    <button onClick={handleClose}>Close</button>
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

export default ViewItemMaster;
