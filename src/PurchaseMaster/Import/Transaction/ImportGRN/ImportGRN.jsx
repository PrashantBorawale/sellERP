import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../../NavBar/NavBar";
import SideNav from "../../../../SideNav/SideNav";
import "./ImportGRN.css";
import { Link } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";

const ImportGRN = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

 const [showTransaction, setShowTransaction] = useState(false);
    const [showReports, setShowReports] = useState(false);
  
        const toggleTransaction = () => {
            setShowTransaction(!showTransaction);
        };
        const toggleReports = () => {
            setShowReports(!showReports);
        }; 


  return (
    <div className="Report">
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
                <div className="Reportrmaster">
                    <div className="content-area">
                        <div className="row text-start">

                            <div className="col-lg-2 col-md-4 col-12 submenu">
                                     <h4 className="header-title mb-3">Import</h4>
                                      <div>
                                                    <h6 className="portal-login" onClick={toggleTransaction} style={{ cursor: 'pointer' }}>
                                                      Transaction
                                                    </h6>
                          
                                                    {showTransaction && (
                                                      <ul className="submenu-links">
                                                        <li><Link to="/ImportPO">Import PO</Link></li>
                                                        <li><Link to="/POConsignment">PO Consignment</Link></li>
                                                        <li><Link to="/ImportGRN">Import GRN</Link></li>
                                                      </ul>
                                                    )}
                                      </div>
                          
                                     <div>
                                                    <h6 className="portal-login" onClick={toggleReports} style={{ cursor: 'pointer' }}>
                                                      Reports
                                                    </h6>
                          
                                                    {showReports && (
                                                                                                       <ul className="submenu-links">
                                                                                                          <li><Link to="/ImportPOList"> PO List</Link></li>
                                                                                                          <li><Link to="/POConsignmentList">PO Consignment List</Link></li>
                                                                                                          <li><Link to="/ImportGRNList">GRN List</Link></li>
                                                                                                       </ul>
                                                                                                      )}
                                     </div>
                             </div>

                            <div className="col-lg-10 col-md-8 col-12 content">
                                  <div className="order mt-1">
                                    <div className="order-header mb-2 text-start">
                                      <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <h5 className="header-title"> New Import GRN </h5>
                                        </div>
                                           <div className="col-md-2">
                                              <input type="text" className="form-control" />
                                          </div>
                                            <div className="col-md-6 text-end">
                                                <Link className="vndrbtn" to={"/ImportGRNList"}>Import GRN List</Link>
                                          </div>
                                      </div>
                                    </div>
                                  </div>

                                   <div className="ReportMain">
                                      <div className="container-fluid">

                                              <div className="ReportMain3 mt-2 " style={{padding:"10px"}} >

                                                <div className="row text-start Reportselect3">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        GST Entry No :
                                                      </label>
                                                      <div className="col-sm-2">
                                                          <select name="" className="form-control" id="" >
                                                             <option value=""> Select</option>
                                                          </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> <GrPowerReset />  </button> 
                                                      </div>
                                                  </div>
                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Select COnsignment  :
                                                      </label>
                                                      <div className="col-sm-4">
                                                        <select name="" className="form-control" id="" >
                                                             <option value=""> Select  </option>
                                                          </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> Search </button> 
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> Clear </button> 
                                                      </div>
                                                  </div>

                                                  <table className="table table-bordered table-responsive-sm mt-3">
                                                        <thead>
                                                          <tr>
                                                            <th>Sr.</th>
                                                            <th>PO No.</th>
                                                            <th>Date</th>
                                                            <th>Item No Code</th>
                                                            <th>Description</th>
                                                            <th>Rate </th>
                                                            <th>PO Qty</th>
                                                            <th>Bal Qty</th>
                                                            <th>Chal Qty</th>
                                                            <th>GRN Qty</th>
                                                            <th>Short Excess Qty</th>
                                                            <th>Unit Code</th>
                                                            <th> Total</th>
                                                            <th>HeatCode</th>
                                                            <th>HC</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>1</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td> <input type="text" className="form-control" placeholder=" 0 " name="" id="" /></td>
                                                            <td> 0 </td>
                                                            <td></td>
                                                            <td> <input type="text" className="form-control" name="" id="" /></td>
                                                            <td> <input type="text" className="form-control" name="" id="" /></td>
                                                            <td> <input type="text" className="form-control" name="" id="" /></td>
                                                            <td> <input type="text" className="form-control" name="" id="" /></td>
                                                            <td> </td>
                                                            <td> <input type="text" className="form-control" name="" id="" /></td>
                                                            <td> </td>

                                                          </tr>
                                                        </tbody>
                                                  </table>
                                                 
                                                </div>

<hr />

                                                 <div className="row text-start">
                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                GST No :
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                GIT No :
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                Vehical No:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                Remark:
                                                            </label>
                                                         <textarea className="form-control" name="" id=""></textarea>
                                                        </div>
                                                        
                                                 </div>

                                                 <div className="row mt-2 text-start">
                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                GST Date :
                                                            </label>
                                                          <input type="date" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                Invoice No:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                LR No :
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>                       
                                                 </div>

                                                 <div className="row mt-2 text-start">
                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                GST Time :
                                                            </label>
                                                          <input type="time" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                Inv Date:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-sm-3 col-form-label">
                                                                Transporter:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>                       
                                                 </div>

                                                 <div className="row mt-2 text-start">
                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className=" col-form-label">
                                                                ChlnNO:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-form-label">
                                                               Way BillNo:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-form-label">
                                                               Prepared by:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>                       
                                                 </div>

                                                 <div className="row mt-2 text-start">
                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-form-label">
                                                                Challan Date:
                                                            </label>
                                                          <input type="date" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-form-label">
                                                               Way Bill Qty:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>

                                                        <div className="col-sm-3"> 
                                                            <label htmlFor="" className="col-form-label">
                                                               Checked by:
                                                            </label>
                                                          <input type="text" className="form-control" name="" id="" />
                                                        </div>  
                                                         <div className="col-sm-3"> 
                                                           <button className="vndrbtn" style={{marginTop:"33px"}}> Save</button>
                                                        </div>                       
                                                 </div>

                                              </div>
                                      </div>

                                     

                                    </div>
                                 
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


export default ImportGRN;