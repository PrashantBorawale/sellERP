import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./PoList.css"
import { fetchPurchaseOrders, deletePurchaseOrder } from "../../../Service/PurchaseApi.jsx"
import { MdDeleteForever } from "react-icons/md";

const PoList = () => {
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
    const getPurchaseOrders = async () => {
      try {
        const data = await fetchPurchaseOrders()
        setPurchaseOrders(data)
      } catch (error) {
        console.error("Error fetching purchase orders:", error)
      }
    }

    getPurchaseOrders()
  }, [])

  

  

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

    alert("Purchase Order Deleted Successfully!");
  } catch (error) {
    alert("Failed to delete Purchase Order");
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
                      <h5 className="header-title mb-0">Purchase Order List</h5>
                      <div className="d-flex gap-2 flex-wrap">
                        <Link type="button" className="vndrbtn border-0">
                          Recently Po Approval List
                        </Link>
                        <Link type="button" className="vndrbtn border-0">
                          AMC Purchase Order List
                        </Link>
                        <Link type="button" className="vndrbtn border-0">
                          Purchase Order - Query
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
                                <td>{index + 1}</td>
                                <td>{order.PoDate ? new Date(order.PoDate).getFullYear() : "N/A"}</td>
                                <td>{order.Plant}</td>
                                <td>{order.PoNo}</td>
                                <td>{order.PoDate}</td>
                                <td>{order.Type}</td>
                                <td>{order.CodeNo}</td>
                                <td>{order.Supplier}</td>
                                <td>{order.User}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => handleViewPdf(order)}
                                    className="vndrbtn border-0"
                                    style={{ fontSize: '12px', padding: '4px 10px' }}
                                  >
                                    View
                                  </button>
                                </td>
                                <td>
                                  <Link
                                    to={`/new-purchase-order/${order.id}`}
                                    className="btn"
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    onClick={() => handleDelete(order.id)}
                                    className="btn"
                                  >
                                    <MdDeleteForever />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  <div className="d-flex justify-content-end mt-3 mb-3">
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={handlePrevPage}>Previous</button>
                        </li>
                        {[...Array(totalPages).keys()].map((num) => (
                          <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageClick(num + 1)}>
                              {num + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={handleNextPage}>Next</button>
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

export default PoList


