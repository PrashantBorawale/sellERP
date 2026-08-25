import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";
import "./VendorPage.css";
import General from "./General";
import Data2 from "./Data2";
import LogoImage from "./logoImage";
import Invoice from "./Invoice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorPage = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    short_name: "",
    username: "",
    password: "",
    password2: "",
    city: "",
    country: "India",
    address: "",
    website: "",
    contact_no: "",
    footer_message: "",
    director_name: "",
    pin_code: "",
    state: "",
    state_no_numeric: "",
    VAT_TIN: "",
    CST_TIN: "",
    C_Excise_Range: "",
    Commissionerate: "",
    C_Excise_Reg_No: "",
    PLA_No: "",
    Service_Tax_No: "",
    Import_Export_Code: "",
    ARN_No: "",
    Export_House_No: "",
    Udyog_Aadhar_No: "",
    Vat_Tin_Date: "",
    Cst_Tin_Date: "",
    Subject_To: "",
    Division: "",
    GST_No: "",
    ECC_No: "",
    PAN_No: "",
    CIN_NO: "",
    Import_Export_Date: "",
    ARN_Date: "",
    login_logo: null,
    home_logo: null,
    company_logo: null,
    Tuv_logo: null,
  });

  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const handleFormDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextButtonClick = () => {
    setActiveTab("data2");
  };

  const handleNextButtonClick1 = () => {
    setActiveTab("logoImage");
  };

  const handleLogoSubmit = async () => {
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Authentication token missing. Please login again.");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "https://sellerp-backend.onrender.com/vendor/register/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Vendor created successfully");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Vendor create error:", error);

      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
      } else {
        toast.error("Failed to create vendor");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="erp-page VendorPage">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Vendorpage1 p-4">
                  
                  {/* Header */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-8 text-start">
                        <h5 className="header-title mb-0">Company Setup</h5>
                        <small className="text-muted d-block mt-1">Last Updated By Admin On D1 12/07/2022 2:57 PM</small>
                      </div>
                      <div className="col-md-4 col-12 text-end">
                        <button className="btn btn-outline-primary btn-sm rounded-pill fw-bold" style={{ fontSize: '0.75rem' }}>General Setting</button>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <div className="VendorPageMain">
                    <div className="container-fluid text-start p-0">
                      <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                          <ul className="nav nav-tabs nav-tabs-custom mb-4" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "general" ? "active fw-bold" : ""}`}
                                id="pills-general-tab"
                                type="button"
                                role="tab"
                                onClick={() => setActiveTab("general")}
                                style={{ fontSize: '0.85rem' }}
                              >
                                General
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "data2" ? "active fw-bold" : ""}`}
                                id="pills-data2-tab"
                                type="button"
                                role="tab"
                                onClick={() => setActiveTab("data2")}
                                style={{ fontSize: '0.85rem' }}
                              >
                                Data-2
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "logoImage" ? "active fw-bold" : ""}`}
                                id="pills-logoImage-tab"
                                type="button"
                                role="tab"
                                onClick={() => setActiveTab("logoImage")}
                                style={{ fontSize: '0.85rem' }}
                              >
                                Logo/Images
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "eInvoice" ? "active fw-bold" : ""}`}
                                id="pills-Invoice-tab"
                                type="button"
                                role="tab"
                                onClick={() => setActiveTab("eInvoice")}
                                style={{ fontSize: '0.85rem' }}
                              >
                                E-Invoice
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className={`tab-pane fade ${activeTab === "general" ? "show active" : ""}`}
                              id="pills-general"
                              role="tabpanel"
                              aria-labelledby="pills-general-tab"
                            >
                              <General
                                formData={formData}
                                onFormDataChange={handleFormDataChange}
                                onNextButtonClick={handleNextButtonClick}
                              />
                            </div>
                            <div
                              className={`tab-pane fade ${activeTab === "data2" ? "show active" : ""}`}
                              id="pills-data2"
                              role="tabpanel"
                              aria-labelledby="pills-data2-tab"
                            >
                              <Data2
                                formData={formData}
                                handleChange={handleChange}
                                handleNextButtonClick1={handleNextButtonClick1}
                              />
                            </div>
                            <div
                              className={`tab-pane fade ${activeTab === "logoImage" ? "show active" : ""}`}
                              id="pills-logoImage"
                              role="tabpanel"
                              aria-labelledby="pills-logoImage-tab"
                            >
                              <LogoImage
                                formData={formData}
                                onFormDataChange={handleFormDataChange}
                                onSubmit={handleLogoSubmit}
                                isSubmitting={isSubmitting}
                              />
                            </div>
                            <div
                              className={`tab-pane fade ${activeTab === "eInvoice" ? "show active" : ""}`}
                              id="pills-Invoice"
                              role="tabpanel"
                              aria-labelledby="pills-Invoice-tab"
                            >
                              <Invoice />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <ToastContainer position="top-right" autoClose={5000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;