import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PoList.css"
import { deletePurchaseOrder } from "../../../Service/PurchaseApi.jsx"
import { MdDeleteForever } from "react-icons/md";

const RecentApprovalPO = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [purchaseOrders, setPurchaseOrders] = useState([])
 

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open")
    } else {
      document.body.classList.remove("side-nav-open")
    }
  }, [sideNavOpen])

  useEffect(() => {
    const fetchRecentApprovedPO = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Purchase/recent-approved-purchase-po/");
        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort((a, b) => b.id - a.id);
          setPurchaseOrders(sortedData);
        } else {
          console.error("Failed to fetch recent approved POs");
        }
      } catch (error) {
        console.error("Error fetching recent approved POs:", error);
      }
    };
    fetchRecentApprovedPO();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set number of items per page

  // Calculate indexes for slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const totalPages = Math.ceil(purchaseOrders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this Purchase Order?")) {
    return;
  }

  try {
    await deletePurchaseOrder(id);

    // Remove deleted PO from state
    setPurchaseOrders((prev) => prev.filter((item) => item.id !== id));

    toast.success("Purchase Order Deleted Successfully!");
  } catch (error) {
    toast.error("Failed to delete Purchase Order");
  }
};

  const handleViewPdf = (order) => {
    if (order?.id) {
      window.open(`https://sellerp-backend.onrender.com/Purchase/PoOrder/pdf/${order.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF available for PO: ${order?.PoNo || "this order"}`);
    }
  };

  return (
    <div className="POListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="POList">
                  {/* Golden UI Header */}
                  <div className="erp-header mb-4 mt-2">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="header-title mb-0">Recently Approved PO List</h5>
                      <div className="d-flex gap-2 flex-wrap">
                        <Link to="/purchase-order-list" type="button" className="vndrbtn border-0 text-decoration-none">
                          Purchase Order List
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Filter Card */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant:</label>
                          <select className="form-select">
                            <option value="select">Select All</option>
                            <option value="VISHWA S.I.">VISHWA S.I.</option>
                          </select>
                        </div>

                        {/* From Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Supplier Name:</label>
                          <input type="text" className="form-control" />
                        </div>

                        {/* PO Type */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>PO Type:</label>
                          <select className="form-select">
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Series:</label>
                          <select className="form-select">
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Item Group */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item Group:</label>
                          <select className="form-select">
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Po Status */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Po Status:</label>
                          <select className="form-select">
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* All User */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>All User:</label>
                          <select className="form-select">
                            <option>Select All</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1 d-flex align-items-end">
                          <button type="button" className="vndrbtn w-100 border-0">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Card */}
                  <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
                          <colgroup>
                            <col style={{ width: "4%" }} />
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "6%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "22%" }} />
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "5%" }} />
                          </colgroup>
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Sr.</th>
                              <th scope="col">Year</th>
                              <th scope="col">Plant</th>
                              <th scope="col">Po No</th>
                              <th scope="col">Po Date</th>
                              <th scope="col">Po Type</th>
                              <th scope="col">Code No</th>
                              <th scope="col">Supplier/Vendor Name</th>
                              <th scope="col">User</th>
                              <th scope="col">View</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>                
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((order, index) => (
                              <tr key={order.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{order.PoDate ? new Date(order.PoDate).getFullYear() : "N/A"}</td>
                                <td>{order.Plant}</td>
                                <td>{order.PoNo}</td>
                                <td>{order.PoDate}</td>
                                <td>{order.Type || order.PoType || "N/A"}</td>
                                <td>{order.CodeNo}</td>
                                <td>{order.Supplier}</td>
                                <td>{localStorage.getItem("username") || order.User || order.created_by || "N/A"}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => handleViewPdf(order)}
                                    className="vndrbtn border-0"
                                    style={{ fontSize: "12px", padding: "4px 10px" }}
                                  >
                                    View
                                  </button>
                                </td>
                                <td>
                                  <Link to={`/EditPo/${order.id}`}>
                                    <FaEdit style={{ color: "black", cursor: "pointer", fontSize: "18px" }} />
                                  </Link>
                                </td>
                                <td>
                                  <MdDeleteForever onClick={() => handleDelete(order.id)} style={{ color: "red", cursor: "pointer", fontSize: "20px" }} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Custom Pagination */}
                  <div className="d-flex justify-content-between align-items-center mt-3 p-3 bg-white shadow-sm rounded">
                    <span className="text-muted fw-bold">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, purchaseOrders.length)} of {purchaseOrders.length} entries
                    </span>
                    <nav>
                      <ul className="pagination mb-0 gap-2">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button className="page-link rounded-circle shadow-sm fw-bold" onClick={handlePrevPage}>
                            &laquo; Prev
                          </button>
                        </li>
                        
                        <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`}>
                          <button className="page-link rounded-circle shadow-sm fw-bold" onClick={handleNextPage}>
                            Next &raquo;
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default RecentApprovalPO;
