import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { FaEdit, FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./QuotoComparisonStatement.css"

const QuoteStatementList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [quotationComparisons, setQuotationComparisons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    item: '',
    enquiryNo: ''
  })

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

  // Fetch quotation comparison data
  const fetchQuotationComparisons = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://sellerp-backend.onrender.com/Purchase/Quote_Comparison_Statement/')
      if (!response.ok) {
        throw new Error('Failed to fetch quotation comparisons')
      }
      const data = await response.json()
      setQuotationComparisons(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching quotation comparisons:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotationComparisons()
  }, [])

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Filter data based on filters
  const filteredData = quotationComparisons.filter(item => {
    const matchesFromDate = !filters.fromDate || new Date(item.Date) >= new Date(filters.fromDate)
    const matchesToDate = !filters.toDate || new Date(item.Date) <= new Date(filters.toDate)
    const matchesItem = !filters.item || item.Item.toLowerCase().includes(filters.item.toLowerCase())
    const matchesEnquiryNo = !filters.enquiryNo || item.SelectRFQ.includes(filters.enquiryNo)
    
    return matchesFromDate && matchesToDate && matchesItem && matchesEnquiryNo
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
  }

  // Handle edit
  const handleEdit = (item) => {
    // Navigate to edit page or open edit modal
    console.log('Edit item:', item)
  }

  // Handle view
  const handleView = (item) => {
    // Navigate to view page or open view modal
    console.log('View item:', item)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

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
                  <div className="POList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Quote Comparison Statement List</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link type="button" className="vndrbtn">
                          Print Report
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="POList-Main mt-3">
                    <div className="container-fluid">
                      <div className="row text-start">
                        {/* From Date */}
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            value={filters.fromDate}
                            onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                          />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To Date:</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            value={filters.toDate}
                            onChange={(e) => handleFilterChange('toDate', e.target.value)}
                          />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Item:</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={filters.item}
                            onChange={(e) => handleFilterChange('item', e.target.value)}
                            placeholder="Search by item"
                          />
                        </div>

                        <div className="col-sm-1 col-md-1" style={{ marginTop: "24px" }}>
                          <button type="button" className="vndrbtn" onClick={handleSearch}>
                            Search
                          </button>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Enquiry No:</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={filters.enquiryNo}
                            onChange={(e) => handleFilterChange('enquiryNo', e.target.value)}
                            placeholder="Search by RFQ"
                          />
                        </div>
                        
                        <div className="col-sm-1 col-md-3" style={{ marginTop: "23px" }}>
                          <button type="button" className="vndrbtn">
                            View Quotations Compare Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="PoListTable mt-3 table-responsive">
                    {loading ? (
                      <div className="text-center p-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="alert alert-danger" role="alert">
                        Error: {error}
                      </div>
                    ) : (
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">RFQ No</th>
                            <th scope="col">Item</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Quote Date</th>
                            <th scope="col">Basic Rate</th>
                            <th scope="col">Discount</th>
                            <th scope="col">UOM</th>
                            <th scope="col">Min Qty</th>
                            <th scope="col">Payment Terms</th>
                            <th scope="col">Delivery Time</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan="12" className="text-center">
                                No data found
                              </td>
                            </tr>
                          ) : (
                            currentItems.map((item, index) => (
                              <tr key={item.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{item.SelectRFQ}</td>
                                <td>{item.Item}</td>
                                <td>{item.Supplier}</td>
                                <td>{formatDate(item.QuoteDate)}</td>
                                <td>₹{item.BasicRate}</td>
                                <td>{item.Discount}%</td>
                                <td>{item.UOM}</td>
                                <td>{item.MinPurchQty}</td>
                                <td>{item.PaymentTerms}</td>
                                <td>{item.DeliveryTime} days</td>
                                <td>
                                  <div className="d-flex gap-1">
                                    <button 
                                      type="button" 
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => handleEdit(item)}
                                      title="Edit"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button 
                                      type="button" 
                                      className="btn btn-sm btn-outline-info"
                                      onClick={() => handleView(item)}
                                      title="View"
                                    >
                                      <FaEye />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}

                    {/* Pagination Controls */}
                    {filteredData.length > 0 && (
                      <div className="row text-center">
                        <div className="col-md">
                          <div className="pagination">
                            <button
                              className="vndrbtn btn-sm btn-secondary me-2"
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>

                            {[...Array(totalPages).keys()].map((num) => (
                              <button
                                key={num + 1}
                                onClick={() => handlePageClick(num + 1)}
                                className={currentPage === num + 1 ? "active" : "vndrbtn"}
                              >
                                {num + 1}
                              </button>
                            ))}

                            <button
                              className="vndrbtn"
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </div>
                          <div className="mt-2">
                            <small className="text-muted">
                              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                            </small>
                          </div>
                        </div>
                      </div>
                    )}
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

export default QuoteStatementList