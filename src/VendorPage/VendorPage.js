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
    <>
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="Vendor">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="VendorPage">
                <SideNav
                  sideNavOpen={sideNavOpen}
                  toggleSideNav={toggleSideNav}
                />
                <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                  <div className="Vendorpage1">
                    <div className="container-fluid">
                      <div className="Vender-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-8 text-start">
                            <button className="btn" type="button">
                              Company Setup
                            </button>
                            <button className="btn" type="button">
                              Last Updated By Admin
                            </button>
                            <button className="btn" type="button">
                              On D1 12/07/2022 2:57 PM
                            </button>
                          </div>
                          <div className="col-md-4 col-12 text-end">
                            <button className="btn">General Setting</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="VendorPageMain">
                      <div className="container-fluid text-start" id="shivi">
                        <div className="row">
                          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "general" ? "active" : ""}`}
                                id="pills-general-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-general"
                                type="button"
                                role="tab"
                                aria-controls="pills-general"
                                aria-selected={activeTab === "general"}
                                onClick={() => setActiveTab("general")}
                              >
                                General
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "data2" ? "active" : ""}`}
                                id="pills-data2-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-data2"
                                type="button"
                                role="tab"
                                aria-controls="pills-data2"
                                aria-selected={activeTab === "data2"}
                                onClick={() => setActiveTab("data2")}
                              >
                                Data-2
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "logoImage" ? "active" : ""}`}
                                id="pills-logoImage-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-logoImage"
                                type="button"
                                role="tab"
                                aria-controls="pills-logoImage"
                                aria-selected={activeTab === "logoImage"}
                                onClick={() => setActiveTab("logoImage")}
                              >
                                Logo/Images
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${activeTab === "eInvoice" ? "active" : ""}`}
                                id="pills-Invoice-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-Invoice"
                                type="button"
                                role="tab"
                                aria-controls="pills-Invoice"
                                aria-selected={activeTab === "eInvoice"}
                                onClick={() => setActiveTab("eInvoice")}
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
                </main>
                <ToastContainer position="top-right" autoClose={5000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorPage;