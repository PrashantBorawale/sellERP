import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardQCList.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { MdMarkEmailRead, MdDeleteForever } from "react-icons/md";
import axios from "axios";

const InwardQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchInwardQcList = async () => {
      try {
        const response = await axios.get("https://sellerp-backend.onrender.com/Quality/inward-qc-list/");
        if (response.data && response.data.value) {
          setData(response.data.value);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Quality/inward-qc-list:", error);
      }
    };
    fetchInwardQcList();
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
    } else if (item?.id || item?.InwardF4No) {
      const targetId = item?.id || item?.InwardF4No;
      window.open(`https://sellerp-backend.onrender.com/Quality/inward-qc-list/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF document available for this record.");
    }
  };

  return (
    <div className="InwardQCListMaster">
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
                <div className="InwardQCList">
                  <div className="InwardQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0">Inward 57F4 QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="vndrbtn me-2" to="#/">
                          Jobwork QC Query
                        </button>
                        <button
                          type="button"
                          className="vndrbtn"
                          to="/PaddingQCInward"
                        >
                          Padding QC List
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="InwardQCList-Main">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          <div className="col-md-2">
                            <label className="form-label">From:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">To Date:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Plant :</label>
                            <select className="form-select">
                              <option>SHARP</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Type :</label>
                            <select className="form-select">
                              <option>All</option>
                              <option>Our_F4</option>
                              <option>Vendor_F4</option>
                              <option>Non Returnable</option>
                              <option>Vendor_Scrap</option>
                              <option>Cust_Rework_In</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Status :</label>
                            <select className="form-select">
                              <option>All</option>
                              <option>Accpet</option>
                              <option>Reject</option>
                              <option>Hold</option>
                              <option>AUD</option>
                            </select>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Item Group :</label>
                            <select className="form-select">
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
  
                          <div className="col-md-2">
                            <label className="form-label">Vendor Name:</label>
                            <input type="text" placeholder="Enter Name" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Item :</label>
                            <input type="text" placeholder="Enter Code" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Lot No :</label>
                            <input type="text" placeholder="" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Search By:</label>
                            <select className="form-select mb-2">
                              <option>57F4 GRN No :</option>
                              <option>IIR (QC) No</option>
                              <option>Vendor Challan NO</option>
                            </select>
                            <input type="text" placeholder="No." className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="table-responsive" style={{ width: '100%', overflowX: 'hidden' }}>
                    <table className="table table-bordered table-striped table-sm" style={{ width: '100%', wordBreak: 'break-word', fontSize: '0.85rem' }}>
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Type</th>
                          <th scope="col">Plant</th>
                          <th scope="col">QC No</th>
                          <th scope="col">QC Date</th>
                          <th scope="col">Entry Date</th>
                          <th scope="col">Vendor Name</th>
                          <th scope="col">In/Ch No</th>
                          <th scope="col">In/Ch Date</th>
                          <th scope="col">Item | Part Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">QC Qty</th>
                          <th scope="col">OK Qty</th>
                          <th scope="col">Rew.</th>
                          <th scope="col">Rej.</th>
                          <th scope="col">Lot Status .</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit </th>
                          <th scope="col">Doc </th>
                          <th scope="col">View </th>
                          <th scope="col">Email </th>
                          <th scope="col">Del</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data && data.length > 0 ? (
                          data.map((item, index) => {
                            const inwardChallan = item.InwardChallanTable && item.InwardChallanTable.length > 0 ? item.InwardChallanTable[0] : {};

                            const formattedInwardDate = item.InwardDate
                              ? new Date(item.InwardDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                              : "-";

                            const formattedChallanDate = item.ChallanDate
                              ? new Date(item.ChallanDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                              : "-";

                            const year = item.InwardDate
                              ? `${new Date(item.InwardDate).getFullYear().toString().slice(-2)}-${(new Date(item.InwardDate).getFullYear() + 1).toString().slice(-2)}`
                              : "24-25";

                            // Extract item code and desc from ItemDescription pattern: "Part: FGFG1001 - 1 - CAP OIL LOCK DF | ..."
                            let itemCode = "-";
                            let itemDesc = inwardChallan.ItemDescription || "-";
                            if (inwardChallan.ItemDescription && inwardChallan.ItemDescription.includes("Part:")) {
                              const parts = inwardChallan.ItemDescription.split("|");
                              const partInfo = parts[0].replace("Part:", "").trim();
                              const firstDash = partInfo.indexOf("-");
                              if (firstDash > -1) {
                                itemCode = partInfo.substring(0, firstDash).trim();
                                itemDesc = partInfo.substring(firstDash + 1).trim();
                              } else {
                                itemCode = partInfo;
                                itemDesc = partInfo;
                              }
                            }

                            return (
                              <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{year}</td>
                                <td>
                                  <span className="ourf4"> Our_F4 </span>
                                </td>
                                <td>SHARP</td>
                                <td>{item.id}</td>
                                <td>{formattedInwardDate}</td>
                                <td>
                                  {formattedInwardDate} <br /> {item.InwardTime || "00:00"}
                                </td>
                                <td>
                                  {item.SupplierName || "-"}
                                </td>
                                <td>
                                  {" "}
                                  <span className="nummmr">
                                    {item.InwardF4No || "-"}
                                  </span> <br /> {item.ChallanNo || "-"}
                                </td>
                                <td>
                                  {formattedInwardDate} <br /> {formattedChallanDate}
                                </td>
                                <td>
                                  {itemCode}
                                </td>
                                <td>
                                  <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                                      {itemDesc}
                                  </div>
                                </td>
                                <td>{inwardChallan.InQtyNOS || inwardChallan.OutQty || "0"}</td>
                                <td>{inwardChallan.InQtyNOS || inwardChallan.OutQty || "0"}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>Accept</td>
                                <td>{item.PreparedBy || "mobin"}</td>
                                <td>
                                  <FaEdit />
                                </td>
                                <td>
                                  <HiDocumentArrowDown />
                                </td>
                                <td className="text-center">
                                  <FaEye
                                    size={18}
                                    style={{ cursor: "pointer", color: "#0d6efd" }}
                                    onClick={() => handleViewPdf(item)}
                                    title="View PDF"
                                  />
                                </td>
                                <td>
                                  <MdMarkEmailRead />
                                </td>
                                <td>
                                  {" "}
                                  <MdDeleteForever />{" "}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="23" className="text-center">No records found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default InwardQCList;
