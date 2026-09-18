import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./VendorScrapInward.css";
import { saveVendorScrap } from "../../../Service/StoreApi.jsx"; // Import your API service
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorScrapInward = () => {
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

  const [formData, setFormData] = useState({
    InWardNo: "",
    InWardDate: "",
    InWardTime: "",
    ChallanNo: "",
    ChallonDate: "",
    GIN_No: "",
    InvoiceNo: "",
    InvoiceDate: "",
    PreparedBy: "",
    CheckedBy: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    Remark: "",
    DeliveryInTime: false, // Initially set to false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDeliveryChange = (e) => {
    setFormData({
      ...formData,
      DeliveryInTime: e.target.value === "yes", // Set true for "yes", false for "no"
    });
  };

  const handleSubmit = async () => {
    try {
      await saveVendorScrap(formData);
      toast.success("Data saved successfully!");
      console.log(formData, "data saved");
      setFormData({
        InWardNo: "",
        InWardDate: "",
        InWardTime: "",
        ChallanNo: "",
        ChallonDate: "",
        GIN_No: "",
        InvoiceNo: "",
        InvoiceDate: "",
        PreparedBy: "",
        CheckedBy: "",
        VehicleNo: "",
        LrNo: "",
        Transporter: "",
        Remark: "",
        DeliveryInTime: false, // Reset to false
      });
    } catch (error) {
      toast.error("Failed to save data!");
      console.error("Error:", error);
    }
  };


  return (
    <div className="NewStoreVendorScrap">
      <ToastContainer />
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
                <div className="VendorScrap-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-3 col-6">
                      <h5 className="header-title text-start">
                        Inward Vendor Scrap Challan
                      </h5>
                    </div>
                    <div className="col-md-2 col-6">
                      <input className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="VendorScrap-main mt-5">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="row ">
                          <div className="col-md-3 col-5">Supplier Name:</div>
                          <div className="col-md-6 col-7">
                            <input className="form-control" />
                          </div>
                          <div className="col-md-2 col-12 mt-2 mt-md-0">
                            <button type="button" className="btn">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="StoreSubconFooter"
                  
                  >
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-Gernal-Detail-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Gernal-Detail"
                          type="button"
                          role="tab"
                          aria-controls="pills-Gernal-Detail"
                          aria-selected="true"
                        >
                        General Detail
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent" style={{border:"none"}}>
                      <div
                        className="tab-pane fade show active"
                        id="pills-Gernal-Detail"
                        role="tabpanel"
                        aria-labelledby="pills-Gernal-Detail-tab"
                        tabindex="0"
                      >
                        <div className="StoreSubconstatus text-start">
                          <div className="container-fluid">
                            <div className="row">
                              {/* First Column Group */}
                              <div className="col-md-4 text-start">
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Inward No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InWardNo"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InWardDate"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Time:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InWardTime"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="ChallanNo"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="ChallonDate"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Second Column Group */}
                              <div className="col-md-4 text-start">
                                <div className="container mt-4">
                                  <div className="table-responsive text-start">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>GIN No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="GIN_No"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Invoice No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InvoiceNo"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Invoice Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InvoiceDate"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Prepared By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="PreparedBy"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Checked By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="CheckedBy"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Third Column Group */}
                              <div className="col-md-4 text-start">
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Vehical No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="VehicleNo"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Lr No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="LrNo"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Transporter:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="Transporter"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Remark:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="Remark"
                                              className="form-control"
                                              onChange={handleInputChange}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                  <th className="col-md-4">Delivery in Time:</th>
                  <td>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="deliveryYes"
                        name="DeliveryInTime"
                        value="yes"
                        checked={formData.DeliveryInTime === true}
                        onChange={handleDeliveryChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="deliveryYes"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="deliveryNo"
                        name="DeliveryInTime"
                        value="no"
                        checked={formData.DeliveryInTime === false}
                        onChange={handleDeliveryChange}
                      />
                      <label className="form-check-label" htmlFor="deliveryNo">
                        No
                      </label>
                    </div>
                  </td>
                </tr>
                                        <tr>
                                          <td
                                            colSpan="2"
                                            className="text-center"
                                          >
                                            <button
                                              className="btn"
                                              onClick={handleSubmit}
                                            >
                                              Save Challan
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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

export default VendorScrapInward;
