import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTsales1.css";
import "../../../styles/erp-global.css";

const GSTsales1 = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedCancelId, setSelectedCancelId] = useState(null);
    const [cancelReasonCode, setCancelReasonCode] = useState("1");
    const [cancelRemark, setCancelRemark] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [cancelInvoices, setCancelInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cancelCurrentPage, setCancelCurrentPage] = useState(1);
    const [irnMode, setIrnMode] = useState("GenerateIRN");
    const itemsPerPage = 15;

    // Pagination logic for Generate IRN
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = invoices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(invoices.length / itemsPerPage);

    // Pagination logic for Cancel IRN
    const cancelIndexOfLastItem = cancelCurrentPage * itemsPerPage;
    const cancelIndexOfFirstItem = cancelIndexOfLastItem - itemsPerPage;
    const currentCancelInvoices = cancelInvoices.slice(cancelIndexOfFirstItem, cancelIndexOfLastItem);
    const cancelTotalPages = Math.ceil(cancelInvoices.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleCancelPageChange = (pageNumber) => {
      setCancelCurrentPage(pageNumber);
    };

    useEffect(() => {
      fetchInvoices();
      fetchCancelInvoices();
    }, []);

    const fetchInvoices = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/api/invoices/empty-irn/");
        const result = await response.json();
        if (result.status && result.data) {
          setInvoices(result.data);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    const fetchCancelInvoices = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/active-irn-invoices/");
        const result = await response.json();
        if (Array.isArray(result)) {
          setCancelInvoices(result);
        }
      } catch (error) {
        console.error("Error fetching cancel invoices:", error);
      }
    };

    const handleGenerateIRN = async (id) => {
      try {
        const response = await fetch(`https://sellerp-backend.onrender.com/Sales/api/einvoice/generate-irn-and-ewaybill/${id}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        if (response.ok) {
          alert("IRN Generated Successfully!");
          fetchInvoices();
        } else {
          alert("Failed to generate IRN: " + (result.message || JSON.stringify(result)));
        }
      } catch (error) {
        console.error("Error generating IRN:", error);
        alert("An error occurred while generating IRN.");
      }
    };

    const openCancelModal = (id) => {
      setSelectedCancelId(id);
      setCancelReasonCode("1");
      setCancelRemark("");
      setShowCancelModal(true);
    };

    const handleCancelIRN = async () => {
      if (!selectedCancelId) return;
      if (cancelReasonCode === "4" && !cancelRemark.trim()) {
        alert("Remark is required when reason is 'Others'");
        return;
      }

      try {
        const payload = {
          reason_code: cancelReasonCode
        };
        if (cancelReasonCode === "4") {
          payload.remark = cancelRemark;
        }

        const response = await fetch(`https://sellerp-backend.onrender.com/Sales/api/einvoice/cancel-irn/${selectedCancelId}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (response.ok) {
          alert("IRN Cancelled Successfully!");
          setShowCancelModal(false);
          setSelectedCancelId(null);
          fetchInvoices();
          fetchCancelInvoices();
        } else {
          alert("Failed to cancel IRN: " + (result.message || JSON.stringify(result)));
        }
      } catch (error) {
        console.error("Error cancelling IRN:", error);
        alert("An error occurred while cancelling IRN.");
      }
    };

    const toggleSideNav = () => {
        setSideNavOpen((prevState) => !prevState);
      };
    
      const toggleModal = () => {
        setShowModal((prevState) => !prevState); // Toggle modal visibility
      };
    
      useEffect(() => {
        if (sideNavOpen) {
          document.body.classList.add("side-nav-open");
        } else {
          document.body.classList.remove("side-nav-open");
        }
      }, [sideNavOpen]);
    

  return (
      <div className="erp-page GSTsalesMaster">
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
                <div className="GSTsales mt-3">
                      <div className="GSTsales-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <h5 className="header-title mb-0">Pending Invoice List For E-Invoice</h5>
                          </div>
                      <div className="col-md-1 generateirn d-flex align-items-center">
                        <input type="radio" id="GenerateIRN" name="brand" value="GenerateIRN" checked={irnMode === "GenerateIRN"} onChange={(e) => setIrnMode(e.target.value)}/>
                        <label htmlFor="GenerateIRN">GenerateIRN</label>
                      </div>
                      <div className="col-md-2 d-flex align-items-center">
                        <label className="checkbox-label mb-0">
                          <input type="checkbox" id="general" className="me-1" />
                          IRN WIth Eway
                        </label>
                      </div>
                      <div className="col-md-1 cancelirn d-flex align-items-center">       
                      <input type="radio" id="CancelIRN" name="brand" value="CancelIRN" checked={irnMode === "CancelIRN"} onChange={(e) => setIrnMode(e.target.value)}/>
                        <label htmlFor="CancelIRN">CancelIRN</label>
                      </div>

                      <div className="col-md-4 text-end">
                        <button type="button" className="vndrbtn me-2" onClick={toggleModal}>
                          E-Invoice Log
                        </button>
                        <button type="button" className="vndrbtn">
                          IRN Lookup Table
                        </button>
                      </div>
                      </div>
                    </div>
                </div>


 <div  className={`modal fade ${showModal ? "show d-block" : ""}`} style={{ display: showModal ? "block" : "none", backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} >
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
           E Invoice Logs  :
        </h5>
          <button type="button" className="btn-close" onClick={toggleModal} > <i class="fa fa-times" aria-hidden="true"></i> </button>        
      </div>

      <div className="modal-body">
        <form>
        <div className="GSTsales-header mb-4 text-start">
        <div className="row align-items-center">
            {/* Plant */}
             <div className="col-md-2 mb-3">
                       <label htmlFor="" className="">From : </label>    
                       <input type="date"  placeholder=" " className="form-control"/>
             </div>
             <div className="col-md-2 mb-3">
                       <label htmlFor="" className="">To : </label>    
                       <input type="date"  placeholder=" " className="form-control"/>
             </div>
             
             <div className="col-md-2">
                     <button type="button" className="vndrbtn w-100">
                       Search
                    </button>
             </div>
          </div>
          </div>
          </form>
                  <br />
                  <br />
                  <br />
                  <br />
      </div>
    </div>
  </div>
</div>

{/* Cancel IRN Modal */}
<div className={`modal fade ${showCancelModal ? "show d-block" : ""}`} style={{ display: showCancelModal ? "block" : "none", backgroundColor: showCancelModal ? "rgba(0,0,0,0.5)" : "transparent" }} tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Cancel IRN</h5>
        <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
      </div>
      <div className="modal-body text-start">
        <div className="mb-3">
          <label className="form-label fw-bold">Reason Code <span className="text-danger">*</span></label>
          <select 
            className="form-select" 
            value={cancelReasonCode}
            onChange={(e) => setCancelReasonCode(e.target.value)}
          >
            <option value="1">Duplicate</option>
            <option value="2">Data Entry Mistake</option>
            <option value="3">Order Cancelled</option>
            <option value="4">Others</option>
          </select>
        </div>
        
        {cancelReasonCode === "4" && (
          <div className="mb-3">
            <label className="form-label fw-bold">Remark <span className="text-danger">*</span></label>
            <textarea 
              className="form-control" 
              rows="3" 
              value={cancelRemark}
              onChange={(e) => setCancelRemark(e.target.value)}
              placeholder="Enter cancellation remark..."
            ></textarea>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>Close</button>
        <button type="button" className="btn btn-danger" onClick={handleCancelIRN}>Cancel IRN</button>
      </div>
    </div>
  </div>
</div>

            <div className="centerMain mt-3 text-start">
                <div className="row g-2 align-items-end">
                     <div className="col-sm-6 col-md-2 col-lg-1">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Type:</label>
                            <select name="" id="" className="form-select form-select-sm">
                               <option value="">Domestic</option>
                           </select>
                      </div> 
                     <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">From:</label>
                            <input type="date" className="form-control form-control-sm"/>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Plant:</label>
                            <select name="" id="" className="form-select form-select-sm">
                               <option value="">Sharp</option>
                           </select>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Customer:</label>                        
                            <input type="text" placeholder="Name" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Item:</label>                        
                            <input type="text" placeholder="Enter Code | Name" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Invoice:</label>                        
                            <input type="text" placeholder="No" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-12 col-md-2 col-lg-1 ms-auto">
                            <button type="button" className="vndrbtn bg-primary border-primary w-100" >
                              Search
                           </button> 
                        </div>
                     </div>
                  </div>

                      <div className="GSTsales-tabs mt-3 text-start">
          {irnMode === "GenerateIRN" ? (
            <>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button  className="nav-link active"  id="shift-tab"  data-bs-toggle="pill"  data-bs-target="#shift"  type="button"  role="tab"  >
                            Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="machine-idle-tab" data-bs-toggle="pill" data-bs-target="#machineIdle" type="button" role="tab" >
                            Generate IRN
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4"  id="GSTsalesTabsContent">

                        <div  className="tab-pane fade show active" id="shift" role="tabpanel" >
                           <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="table-dark">
                                <tr>
                                  <th className="">
                                    Sr
                                  </th>
                                  <th className="">
                                    Plant
                                  </th>
                                  <th className="">
                                    Invoice No.
                                  </th>
                                  <th className="">
                                    Invoice Date
                                  </th>
                                  <th className="">
                                    Cust Po No
                                  </th>
                                  <th className="">
                                    Type
                                  </th>
                                  <th className="">
                                    Cust Code
                                  </th>
                                  <th className="">
                                    Cust Name
                                  </th>
                                  <th className=" ">
                                    Item Qty | Desc
                                  </th>
                                  <th className=" ">
                                    Qty
                                  </th>
                                  <th className=" ">
                                   Ass Act
                                </th>
                                  <th className=" ">
                                    Total
                                  </th>
                                  <th className=" ">
                                    User
                                  </th>
                                  <th className=" ">
                                    View 
                                  </th>
                                  <th className=" ">
                                    IRN
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {currentInvoices.map((inv, index) => {
                                  const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : {};
                                  const gstDetail = inv.GSTdetails && inv.GSTdetails.length > 0 ? inv.GSTdetails[0] : {};
                                  
                                  const billToParts = inv.bill_to ? inv.bill_to.split('|') : ["-", "-"]
                                  const custName = billToParts[0] ? billToParts[0].trim() : "-";
                                  const custCode = billToParts[1] ? billToParts[1].trim() : "-";

                                  return (
                                    <tr key={inv.id || index}>
                                      <td>{indexOfFirstItem + index + 1}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "100px" }}>{firstItem.plant || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{inv.invoice_no || "-"}</td>
                                      <td>{inv.invoice_Date || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{firstItem.po_no || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "100px" }}>{firstItem.invoice_type || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{custCode}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "200px" }}>{custName}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "200px" }}>
                                        {inv.items && inv.items.map((itm, i) => (
                                          <div key={i}>{itm.part_code || itm.part_no} | {itm.description}</div>
                                        ))}
                                      </td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                        {inv.items && inv.items.map((itm, i) => (
                                          <div key={i}>{itm.inv_qty}</div>
                                        ))}
                                      </td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{gstDetail.assessble_value !== undefined ? gstDetail.assessble_value : "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{gstDetail.grand_total !== undefined ? gstDetail.grand_total : "-"}</td>
                                      <td>-</td>
                                      <td><button className="btn btn-sm btn-outline-primary" onClick={() => window.open(`https://sellerp-backend.onrender.com/Sales/invoice-pdf/${inv.id}/`, '_blank')}><i className="fa fa-eye"></i></button></td>
                                      <td><button className="btn btn-sm btn-outline-success" onClick={() => handleGenerateIRN(inv.id)}>Generate IRN</button></td>
                                    </tr>
                                  );
                                })}
                                {invoices.length === 0 && (
                                  <tr>
                                    <td colSpan="15" className="text-center">No pending invoices found</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            {totalPages > 1 && (
                              <div className="d-flex justify-content-center mt-3">
                                <ul className="pagination">
                                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                  </li>
                                  {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                    </li>
                                  ))}
                                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                  </li>
                                </ul>
                              </div>
                            )}
                           </div>
                        </div>

                        <div className="tab-pane fade" id="machineIdle" role="tabpanel" >
                              <div className="GSTsales-header mb-4 text-start">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                        <h5 className="header-title cllllr">Pending Invoice List For E-Invoice</h5>
                                        </div>     
                                    </div>

                                    <div className="row align-items-center mt-4">  
                                       <div className="col-md-2">
                                        <button type="button" className="vndrbtn w-100" >
                                            Generate IRN
                                        </button> 
                                        </div>
                                        <div className="col-md-2">
                                        <button type="button" className="vndrbtn w-100" >
                                            Cancel IRN
                                        </button> 
                                        </div>
                                   </div>

                                   <div className="row align-items-center mt-4">  
                                       <div className="col-md-12">
                                         <label htmlFor="">Result</label>
                                         <textarea name="result" id="result"></textarea>
                                        </div>
                                   </div>

                             </div>
                        </div>
                      </div>
            </>
          ) : (
            <>
            <ul className="nav nav-pills mb-3" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" type="button" role="tab">
                            Cancel IRN
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4">
                        <div className="tab-pane fade show active" role="tabpanel">
                           <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="table-dark">
                                <tr>
                                  <th className="">
                                    Sr
                                  </th>
                                  <th className="">
                                    Plant
                                  </th>
                                  <th className="">
                                    Invoice No.
                                  </th>
                                  <th className="">
                                    Invoice Date
                                  </th>
                                  <th className="">
                                    Cust Po No
                                  </th>
                                  <th className="">
                                    Type
                                  </th>
                                  <th className="">
                                    Cust Code
                                  </th>
                                  <th className="">
                                    Cust Name
                                  </th>
                                  <th className=" ">
                                    Item Qty | Desc
                                  </th>
                                  <th className=" ">
                                    Qty
                                  </th>
                                  <th className=" ">
                                   Ass Act
                                </th>
                                  <th className=" ">
                                    Total
                                  </th>
                                  <th className=" ">
                                    User
                                  </th>
                                  <th className=" ">
                                    View 
                                  </th>
                                  <th className=" ">
                                    IRN
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {currentCancelInvoices.map((inv, index) => {
                                  const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : {};
                                  const gstDetail = inv.GSTdetails && inv.GSTdetails.length > 0 ? inv.GSTdetails[0] : {};
                                  
                                  const billToParts = inv.bill_to ? inv.bill_to.split('|') : ["-", "-"]
                                  const custName = billToParts[0] ? billToParts[0].trim() : "-";
                                  const custCode = billToParts[1] ? billToParts[1].trim() : "-";

                                  return (
                                    <tr key={inv.id || index}>
                                      <td>{cancelIndexOfFirstItem + index + 1}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "100px" }}>{firstItem.plant || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{inv.invoice_no || "-"}</td>
                                      <td>{inv.invoice_Date || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{firstItem.po_no || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "100px" }}>{firstItem.invoice_type || "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{custCode}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "200px" }}>{custName}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "200px" }}>
                                        {inv.items && inv.items.map((itm, i) => (
                                          <div key={i}>{itm.part_code || itm.part_no} | {itm.description}</div>
                                        ))}
                                      </td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                        {inv.items && inv.items.map((itm, i) => (
                                          <div key={i}>{itm.inv_qty}</div>
                                        ))}
                                      </td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{gstDetail.assessble_value !== undefined ? gstDetail.assessble_value : "-"}</td>
                                      <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{gstDetail.grand_total !== undefined ? gstDetail.grand_total : "-"}</td>
                                      <td>-</td>
                                      <td><button className="btn btn-sm btn-outline-primary" onClick={() => window.open(`https://sellerp-backend.onrender.com/Sales/invoice-pdf/${inv.id}/`, '_blank')}><i className="fa fa-eye"></i></button></td>
                                      <td><button className="btn btn-sm btn-outline-danger" onClick={() => openCancelModal(inv.id)}>Cancel IRN</button></td>
                                    </tr>
                                  );
                                })}
                                {cancelInvoices.length === 0 && (
                                  <tr>
                                    <td colSpan="15" className="text-center">No active IRN invoices found</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            {cancelTotalPages > 1 && (
                              <div className="d-flex justify-content-center mt-3">
                                <ul className="pagination">
                                  <li className={`page-item ${cancelCurrentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handleCancelPageChange(cancelCurrentPage - 1)}>Previous</button>
                                  </li>
                                  {[...Array(cancelTotalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${cancelCurrentPage === i + 1 ? 'active' : ''}`}>
                                      <button className="page-link" onClick={() => handleCancelPageChange(i + 1)}>{i + 1}</button>
                                    </li>
                                  ))}
                                  <li className={`page-item ${cancelCurrentPage === cancelTotalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handleCancelPageChange(cancelCurrentPage + 1)}>Next</button>
                                  </li>
                                </ul>
                              </div>
                            )}
                           </div>
                        </div>
                      </div>
            </>
          )}
                    </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GSTsales1
