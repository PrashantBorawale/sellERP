import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import './PDIList.css';
import { TbMapNorth } from "react-icons/tb";
import { WiDirectionRight } from "react-icons/wi";

const PenddingInvoiceListPDI = () => {
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
                      <div className="col-md-6">
                        <h5 className="header-title">  Pending Invoice List For - Pre Dispatch Inspection </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="PDIList-filter mb-4">
                    <div className="row text-start">
                      
                      <div className="col-md-2">
                        <label>From Date :</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>To Date :</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-md-2 margin-5">
                        <label>Plant :</label>
                        <select className="form-select" >
                          <option value="SHARP">SHARP</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name : </label>
                        </div>
                        <input type="text"  placeholder="Cust Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Code : </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" />
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
                          <th>Plant</th>
                          <th>Inv Type</th>
                          <th>Inv No</th>
                          <th>Inv Date</th>
                          <th>CustomerName</th>
                          <th>Item No</th>
                          <th>Item Code</th>
                          <th>Item Desc</th>
                          <th>Inv. Qty</th>
                          <th>PDI Status</th>
                          <th>PDI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>1</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517348</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (I) </td>
                            <td>FG1168</td>
                            <td>F2BZ04402B</td>
                            <td>SPACER HUSQ 250</td>
                            <td>3000</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>2</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517347</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (I) </td>
                            <td>FG1177</td>
                            <td>F2DZ05702B</td>
                            <td>OIL LOOK COLLER (JF3T)</td>
                            <td>300</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>3</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517346</td>
                            <td>02/12/24</td>
                            <td>C0013 | PREWER ENGINEERS </td>
                            <td>FG1124</td>
                            <td>F2DZ025025_XC</td>
                            <td>BRAKE STOPPER (K74A)LH</td>
                            <td>660</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>4</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517346</td>
                            <td>02/12/24</td>
                            <td>C0013 | PREWER ENGINEERS </td>
                            <td>FG1125</td>
                            <td>F2DZ030020_XB</td>
                            <td>COVER MOUNT (K74A)RH</td>
                            <td>660</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>5</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517345</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (H) </td>
                            <td>FG1158</td>
                            <td>S2MX00212B</td>
                            <td>STEEL BUSH (212)</td>
                            <td>2000</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>6</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517344</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (U) </td>
                            <td>FG1106</td>
                            <td>550BZ05802</td>
                            <td>CAP OIL LOCK -PRFH006 (H)</td>
                            <td>2000</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>7</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517343</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (U) </td>
                            <td>FG1380</td>
                            <td>520PAD0102</td>
                            <td>UPPER LATTER</td>
                            <td>4000</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>8</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517342</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (U) </td>
                            <td>FG1092</td>
                            <td>520DZ00212</td>
                            <td>FORK BOLT K-60(D5181012)</td>
                            <td>3780</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>9</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517341</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (H) </td>
                            <td>FG1068</td>
                            <td>520MX00112</td>
                            <td>STEEL BUSH (R)</td>
                            <td>4000</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>10</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517340</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (H) </td>
                            <td>FG1152</td>
                            <td>5500Z05202</td>
                            <td>FORK BOLT PRFH-006</td>
                            <td>990</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>11</td>
                            <td>SHARP</td>
                            <td>GST</td>
                            <td>242517339</td>
                            <td>02/12/24</td>
                            <td>COOO5 | ENDURENCE TECHNOLOGIES LTD (H) </td>
                            <td>FG1152</td>
                            <td>5500Z05202</td>
                            <td>FORK BOLT PRFH-006</td>
                            <td>1980</td>
                            <td> <TbMapNorth /> </td>
                            <td> <WiDirectionRight /> </td>
                        </tr>
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

export default PenddingInvoiceListPDI