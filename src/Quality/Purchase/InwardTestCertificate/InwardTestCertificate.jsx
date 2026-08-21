import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardTestCertificate.css";
import { FaEdit, FaEnvelope, FaEye } from "react-icons/fa";
import axios from "axios";


const InwardTestCertificate = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPurchasePoSearch = async () => {
      try {
        const response = await axios.get("https://sellerp-backend.onrender.com/Quality/purchase-po-search/");
        if (response.data && response.data.results) {
          setData(response.data.results);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Quality/purchase-po-search:", error);
      }
    };
    fetchPurchasePoSearch();
  }, []);

  const handleViewPdf = (item) => {
    const viewPath =
      item?.PDF_Link ||
      item?.View ||
      item?.pdf ||
      item?.file ||
      item?.document ||
      item?.Upload_Doc ||
      item?.upload_doc ||
      item?.Document ||
      item?.doc ||
      item?.Doc ||
      item?.File ||
      item?.TC_File ||
      item?.Tc_File ||
      item?.tc_file ||
      item?.Certificate ||
      item?.certificate ||
      item?.Attachment ||
      item?.attachment ||
      item?.url ||
      item?.link;

    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (item?.id || item?.PoNo) {
      const targetId = item?.id || item?.PoNo;
      window.open(`https://sellerp-backend.onrender.com/Quality/purchase-po-search/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF document available for this record.");
    }
  };

  return (
    <div className="InwardTestCertificateMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="InwardTestCertificate">
                  <div className="InwardTestCertificate-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0"> Inward Test Certificate List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="vndrbtn" onClick={toggleModal} to="#/">
                          Inward Test Cert. - Query
                        </button>
                      </div>
                    </div>
                  </div>
  
  
  
                  {/* Modal */}
                  <div
                    className={`modal ${showModal ? "show" : ""}`}
                    style={{ display: showModal ? "block" : "none" }}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!showModal}
                  >
                    <div className="modal-dialog modal-lg"> {/* Use modal-lg for larger modal */}
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Inward Test Certificate Query
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={toggleModal} // Close the modal on button click
                            aria-label="Close"
                          >X</button>
                        </div>
                        <div className="modal-body">
                          {/* Form content */}
                          <form>
                            <div className="row g-3 text-start align-items-end mb-3">
                              {/* Plant */}
                              <div className="col-md-6">
                                <label htmlFor="plant" className="form-label">
                                  Plant:
                                </label>
                                <select className="form-select" id="plant">
                                  <option>SHARP</option>
                                </select>
                              </div>
  
                              {/* From Date & To Date in one line */}
                              <div className="col-md-3">
                                <label htmlFor="from" className="form-label">
                                  From:
                                </label>
                                <input type="date" className="form-control" id="from" />
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="to" className="form-label">
                                  To:
                                </label>
                                <input type="date" className="form-control" id="to" />
                              </div>
                            </div>
  
                            <div className="row g-3 text-start align-items-end mb-3">
                              {/* QC No */}
                              <div className="col-md-3">
                                <label htmlFor="qcNo" className="form-label">
                                  QC No:
                                </label>
                                <input type="text" className="form-control" id="qcNo" />
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="to2" className="form-label">
                                  To:
                                </label>
                                <input type="text" className="form-control" id="to2" />
                              </div>
  
                              {/* Supplier Name */}
                              <div className="col-md-6">
                                <label htmlFor="supplierNameModal" className="form-label">
                                  Supplier Name:
                                </label>
                                <input type="text" className="form-control" id="supplierNameModal" />
                              </div>
                            </div>
  
                            <div className="row g-3 text-start align-items-end mb-3">
                              {/* Item Name */}
                              <div className="col-md-6">
                                <label htmlFor="itemName" className="form-label">
                                  Item Name:
                                </label>
                                <input type="text" className="form-control" id="itemName" />
                              </div>
  
                              {/* Item Group */}
                              <div className="col-md-6">
                                <label htmlFor="itemGroupModal" className="form-label">
                                  Item Group:
                                </label>
                                <select className="form-select" id="itemGroupModal">
                                  <option>Select</option>
                                  <option>Group 1</option>
                                  <option>Group 2</option>
                                </select>
                              </div>
                            </div>
  
                            <div className="row g-3 text-start align-items-end mb-3">
                              {/* Query Name */}
                              <div className="col-md-6">
                                <label htmlFor="queryName" className="form-label">
                                  Query Name:
                                </label>
                                <select className="form-select" id="queryName">
                                  <option>Select</option>
                                  <option>Inward</option>
                                </select>
                              </div>
                            </div>
  
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="button" className="vndrbtn w-100">
                                  Execute - Export Report
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
  
  
  
  
                  <div className="InwardTestCertificate-Main">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        {/* First Search Form */}
                        <div className="row g-3 text-start align-items-end">
                          {/* From Date */}
                          <div className="col-md-2">
                            <label htmlFor="fromDate" className="form-label">From:</label>
                            <input type="date" id="fromDate" className="form-control" />
                          </div>
  
                          {/* To Date */}
                          <div className="col-md-2">
                            <label htmlFor="toDate" className="form-label">To Date:</label>
                            <input type="date" id="toDate" className="form-control" />
                          </div>
  
                          {/* Plant */}
                          <div className="col-md-2">
                            <label htmlFor="plantMain" className="form-label">Plant :</label>
                            <select id="plantMain" className="form-select">
                              <option>SHARP</option>
                            </select>
                          </div>
  
                          {/* Supplier Name */}
                          <div className="col-md-2">
                            <label htmlFor="supplierName" className="form-label">Supplier Name:</label>
                            <input type="text" id="supplierName" placeholder="Name..." className="form-control" />
                          </div>
  
                          {/* Item Group */}
                          <div className="col-md-2">
                            <label htmlFor="itemGroup" className="form-label">Item Group :</label>
                            <select id="itemGroup" className="form-select">
                              <option>Select</option>
                              <option>FG</option>
                              <option>RM</option>
                              <option>Tools</option>
                              <option>Instrument</option>
                              <option>Machine</option>
                              <option>Consumable</option>
                              <option>Safety Equ</option>
                              <option>Service</option>
                              <option>Asset</option>
                              <option>F4</option>
                              <option>Scrap</option>
                              <option>SF</option>
                              <option>BO</option>
                              <option>DI</option>
                            </select>
                          </div>
  
                          {/* Item */}
                          <div className="col-md-2">
                            <label htmlFor="item" className="form-label">Item :</label>
                            <input type="text" id="item" placeholder="Enter Code | Name..." className="form-control" />
                          </div>
  
                          {/* QC Type */}
                          <div className="col-md-2">
                            <label htmlFor="qcType" className="form-label">QC Type:</label>
                            <select id="qcType" className="form-select">
                              <option>All</option>
                              <option>Regular</option>
                              <option>HoldToDk</option>
                            </select>
                          </div>
  
                          {/* Lot Status */}
                          <div className="col-md-2">
                            <label htmlFor="lotStatus" className="form-label">Lot Status :</label>
                            <select id="lotStatus" className="form-select">
                              <option>All</option>
                              <option>Accept</option>
                              <option>Reject</option>
                              <option>Hold</option>
                            </select>
                          </div>
  
                          {/* Search Button */}
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
  
                          {/* Search By */}
                          <div className="col-md-2">
                            <label htmlFor="searchBy" className="form-label">Search By :</label>
                            <select id="searchBy" className="form-select">
                              <option>All</option>
                              <option>IIR No</option>
                              <option>GRN No</option>
                              <option>LOT No</option>
                              <option>HEAT Code No</option>
                            </select>
                          </div>
  
                          {/* No */}
                          <div className="col-md-2">
                            <label htmlFor="no" className="form-label">No :</label>
                            <input type="text" id="no" placeholder="No..." className="form-control" />
                          </div>
  
                          {/* Search Button */}
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Inward No</th>
                          <th scope="col">Type</th>
                          <th scope="col">Date</th>
                          <th scope="col">GRN No</th>
                          <th scope="col">Supplier Name</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Heat No </th>
                          <th scope="col">Status</th>
                          <th scope="col">QC Type</th>
                          <th scope="col">User</th>
                          <th scope="col">Action</th>
                          <th scope="col">Email</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data && data.length > 0 ? (
                          data.map((item, index) => {
                            const itemDetail = item.Item_Detail_Enter && item.Item_Detail_Enter.length > 0 ? item.Item_Detail_Enter[0] : {};

                            const formattedDate = item.PoDate
                              ? new Date(item.PoDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                              : "-";

                            const year = item.PoDate
                              ? `${new Date(item.PoDate).getFullYear().toString().slice(-2)}-${(new Date(item.PoDate).getFullYear() + 1).toString().slice(-2)}`
                              : "24-25";

                            return (
                              <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{year}</td>
                                <td>{item.Plant || "-"}</td>
                                <td>{item.PoNo || "-"}</td>
                                <td>{item.field || item.Type || "-"}</td>
                                <td>{formattedDate}</td>
                                <td>{item.PoNo || "-"}</td>
                                <td>
                                  {(item.CodeNo && item.Supplier) ? `${item.CodeNo} - ${item.Supplier}` : (item.Supplier || "-")}
                                </td>
                                <td>{itemDetail.Item || "-"}</td>
                                <td>{itemDetail.ItemDescription || "-"}</td>
                                <td>{itemDetail.Qty || "0"}</td>
                                <td>-</td>
                                <td>{item.Approved_Status || "-"}</td>
                                <td>Regular</td>
                                <td>{item.PreparedBy || "-"}</td>
                                <td className="text-center">
                                  <FaEdit className="action-icon edit" />
                                </td>
                                <td className="text-center">
                                  <FaEnvelope className="action-icon mail" />
                                </td>
                                <td className="text-center">
                                  <FaEye className="action-icon view" style={{ cursor: "pointer" }} onClick={() => handleViewPdf(item)} />
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="18" className="text-center">No records found</td>
                          </tr>
                        )}
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


export default InwardTestCertificate;