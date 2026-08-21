
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTSalesReturnList.css";
import {  FaEye, FaRegEdit} from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { MdDeleteForever, MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const GSTSalesReturnList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [salesReturns, setSalesReturns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/GSTSalesReturn'); 
        };

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
    const fetchSalesReturns = async () => {
      try {
        const response = await axios.get("https://sellerp-backend.onrender.com/Sales/Gstsalesretun/");
        setSalesReturns(response.data);
      } catch (error) {
        console.error("Error fetching sales returns:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalesReturns();
  }, []);

  const handleViewPdf = (id) => {
    const url = `https://sellerp-backend.onrender.com/Sales/sales-return-pdf/${id}/`;
    window.open(url, "_blank");
  };

  return (
    <div className="GSTSalesReturnListMaster">
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
              <div className="GSTSalesReturnList mt-5">
                <div className="GSTSalesReturnList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title"> GST Sales Return List </h5>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className="btn" to="#/" onClick={handleButtonClick}>
                        New GST Sales Return
                        </button>
                        <button type="button" className="btn" to="#/">
                         GST Sales Return - Query
                        </button>   
                        
                    </div>


                  </div>
                </div>
               
                <div className="GSTSalesReturnList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start mt-3">  

                       <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control" id="">
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Party Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Inv.No: </label>
                        </div>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cancel: </label>
                        </div>
                        <select name="" className="form-control" id="">
                            <option value="">All</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                      </div>


                      <div className="col-6 col-md-1 mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
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
                          <th scope="col">Return No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Item Qty Desc</th>
                          <th scope="col">Amount</th>
                          <th scope="col">User</th>
                          <th scope="col">Info</th>
                          <th scope="col">IRN</th>
                          <th scope="col">Cancel </th>
                          <th scope="col">View </th>
                          <th scope="col">Edit </th>
                          <th scope="col">Doc </th>
                          <th scope="col">Del </th>

                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="17" className="text-center">Loading...</td>
                          </tr>
                        ) : salesReturns.length > 0 ? (
                          salesReturns.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>24-25</td>
                              <td>{item.plant}</td>
                              <td>{item.sales_return_no}</td>
                              <td>{item.sales_return_date}</td>
                              <td>{item.items[0]?.item_code}</td>
                              <td>{item.cust_name}</td>
                              <td>
                                Rate : {item.items[0]?.rate} | Qty : {item.items[0]?.return_qty} | {item.items[0]?.item_code}
                              </td>
                              <td>
                                {item.items.reduce((sum, i) => sum + parseFloat(i.grand_total || 0), 0).toFixed(2)}
                              </td>
                              <td> - </td>
                              <td>{item.remark}</td>
                              <td>{item.for_e_invoice === "YES" ? "Yes" : "-"}</td>
                              <td> <MdCancel /> </td>
                              <td> <FaEye style={{ cursor: 'pointer' }} onClick={() => handleViewPdf(item.id)} /></td>
                              <td> <FaRegEdit /></td>
                              <td> <IoDocuments /></td>
                              <td> <MdDeleteForever /></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="17" className="text-center">No records found</td>
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
  )
}

export default GSTSalesReturnList