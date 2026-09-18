import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./DocumentStart.css";

const DocumentStart = () => {
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
    <div className="DocumentStart">
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
                <div className="Document ">
                  <div className="Document-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Document Start No.(18 - 19)
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="Document-Main mt-5">
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-4">
                            <label>Enquiry No:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Purchase Order:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Gate Entry Inward:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Purchase GRN:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>MRN No:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>57F4 Outward Challan:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Sales Order No:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Rework Production:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Packing Note:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Jobwork DC:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Sales Rate Diff. Debit Note:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-10">
                            <label>
                              Enq. Booking register / Purchase Enq No / RFQ FG
                              To FG Movement / RM Stock Transaction Shop Floor
                              To Store Transfer / Warehouse to Warehouse
                              Transfer Purchase QC / 57F4 QC / Inprocess QC /
                              Sales return QC Dispatch TC / PDI / MPI / FPI /
                              Setup Approval Hot Inspection / CAPA / Line
                              Inspection Machine Plan / Process Control Chart /
                              4M Line rejection / Fg rejection /Reject to ok
                              Machine Installation
                            </label>
                          </div>
                          <div className="col-md-2">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-4">
                            <label>Quotation No:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Jobwork Purchase Order:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Inter Store Transfer:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>DC GRN:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Material Issue Challan:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Delivery Challan:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>WorkOrder:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Billing Breakup:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Proforma Invoice:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>
                              Jobwork Invoice / CCI / DC+JW Invoice:
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Purchase Bill Passing:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-4">
                            <label>Indent No:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Purchase Schedule:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Inter Store GRN:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>57F4 Inward Challan</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Jobwork DC Return:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Production:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>GST / MEPL /Export Invoice</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>GST Sales Return:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Credit Note:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Jobwork Bill Passing:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>Purchase Debit Note:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <input className="form-control" type="text" />
                      </div>
                      <div className="col-md-8">
                        <button type="button" className="btn">
                          Set To All
                        </button>
                        <button type="button" className="btn">
                          Update All
                        </button>
                      </div>
                    </div>
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

export default DocumentStart;
