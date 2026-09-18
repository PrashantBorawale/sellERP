import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import './PDIList.css';

const PDIList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState); // Toggle modal visibility
  };


  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/PenddingInvoiceListPDI");
  };
  // Handle navigation when the 'New PDI' button is clicked
  const handleNewPDI = () => {
    navigate("/NewListPDI"); // Replace with the actual path of the New PDI page
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="PDIListMaster">
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
                <div className="PDIList mt-5">
                  <div className="PDIList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> ( PDI ) - Pre Dispatch Inspection </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleNewPDI}>
                          New PDI
                        </button>
                        <button type="button" className="btn" onClick={toggleModal}>
                          PDI Summary
                        </button>
                        <button type="button" className="btn" onClick={handleNavigate}>
                          Pending Invoice List PDI
                        </button>
                      </div>
                    </div>
                  </div>

<div  className={`modal ${showModal ? "show" : ""}`}
  style={{ display: showModal ? "block" : "none" }}
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden={!showModal}
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          PDI Summary 
        </h5>
        <button type="button" className="btn-close" onClick={toggleModal} > </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="row">
            {/* Plant */}
            <div className="col-md-12 mb-3">
              <label htmlFor="plant" className="form-label">
                Plant:
              </label>
              <select className="form-select" id="plant">
                <option>SHARP</option>
              </select>
            </div>

            {/* From Date & To Date in one line */}
            <div className="col-md-6 mb-3">
              <label htmlFor="from" className="form-label">
                From:
              </label>
              <input type="date" className="form-control" id="from" />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="to" className="form-label">
                To:
              </label>
              <input type="date" className="form-control" id="to" />
            </div>
          </div>

          <div className="row">
            {/* Supplier Name */}
            <div className="col-md-12 mb-3">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Item Name: </label>
                        </div>
                        <input type="text"  placeholder="Item Name" className="form-control"/>
             </div> 
         </div>
           
          <div className="row">
          <div className="col-md-12 mb-3">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text"  placeholder="Cust Name" className="form-control"/>
             </div>
          </div>

          <div className="row">
            <div className="col-4 mb-3">
              <button type="button" className="btn btn-primary w-100">
                 Daywise Report
              </button>
            </div>
            <div className="col-4 mb-3">
              <button type="button" className="btn btn-primary w-100">
                 Monthwise Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


                  {/* Filter Section */}
                  <div className="PDIList-filter mb-4">
                    <div className="row text-start">
                      
                      <div className="col-md-1">
                        <label>From Date</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-1">
                        <label>To Date</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-md-1 margin-5">
                        <label>Plant</label>
                        <select className="form-select">
                          <option value="SHARP">SHARP</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text"  placeholder="Cust Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Code: </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">PDI No: </label>
                        </div>
                        <input type="text" placeholder=" " className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv. No: </label>
                        </div>
                        <input type="text" placeholder=" " className="form-control" />
                      </div>   
            
                

                      <div className="col-md-1 mt-4">               
                         <button className="btn btn-primary">Search</button>          
                      </div>

                    </div>
                   
                  </div>

                  {/* Table Section */}
                  <div className="PDIList-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Plant</th>
                          <th>PDI No</th>
                          <th>PDI Date</th>
                          <th>Cust Code</th>
                          <th>Cust Name</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Inv. No</th>
                          <th>Inv. Date</th>
                          <th>Inv. Qty</th>
                          <th>User</th>
                          <th>Auth</th>
                          <th>QC Status</th>
                          <th>Email</th>
                          <th>Edit</th>
                          <th>Doc</th>
                          <th>Del</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        
                          <td>
                            <button className="btn btn-sm btn-light">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                        {/* Additional rows can be added dynamically here */}
                      </tbody>
                    </table>
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

export default PDIList