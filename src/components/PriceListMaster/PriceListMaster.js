import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./PriceListMaster.css";
import { ToastContainer, toast } from "react-toastify";
import { savePriceList } from "../../Service/Api.jsx";
import { Link } from "react-router-dom";

const PriceListMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  // Add Price NEw
  const [showAddCard, setShowAddCard] = useState(false);
  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const [showAddCardItemRate, setShowAddCardItemRate] = useState(false);
  const [activeTab, setActiveTab] = useState("query");
  const toggleAddCardItemRate = () => {
    setShowAddCardItemRate(!showAddCardItemRate);
  };

  const [showAddCardPricereport, setShowAddCardPricereport] = useState(false);
  // const [activeTabPricereport, setActiveTabPricereport] = useState("query");
  const toggleAddCardPricereport = () => {
    setShowAddCardPricereport(!showAddCardPricereport);
  };

  const [formData, setFormData] = useState({
    Select_Customer: "",
    Select_Address: "",
    Price_List_Code: "",
    Price_List_Name: "",
    Effective_From_Date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(formData).some((field) => field === "")) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await savePriceList(formData);
      toast.success("Price List saved successfully!");
      console.log("data saved", formData);
      setFormData({
        Select_Customer: "",
        Select_Address: "",
        Price_List_Code: "",
        Price_List_Name: "",
        Effective_From_Date: "",
      });
      toggleAddCard();
    } catch (error) {
      toast.error("Failed to save data");
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="erp-page PriceListMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="PriceListMaster1 overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Price List Master</h5>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button
                          className="vndrbtn"
                          onClick={toggleAddCard}
                        >
                          Add Price List
                        </button>
                        <button
                          className="vndrbtn"
                          onClick={toggleAddCardItemRate}
                        >
                          Item Rate Rev Report
                        </button>
                        <button
                          className="vndrbtn"
                          onClick={toggleAddCardPricereport}
                        >
                          Price List Report
                        </button>
                        <Link to={"/PriceListQueryMaster"} className="vndrbtn text-decoration-none">
                          Price List Query
                        </Link>
                        <button className="vndrbtn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
                  {showAddCard && (
                    <div className="Add-price overlay">
                      <div className="AddPriceListCard card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 className="text-start" style={{ color: "blue" }}>
                            Price List New
                          </h5>
                          <button
                            className="Closepricebtn"
                            onClick={toggleAddCard}
                          >
                            X
                          </button>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSave}>
                            <div className="mb-3">
                              <div className="row text-start">
                                <label
                                  htmlFor="Select_Customer"
                                  className="form-label col-sm-4"
                                >
                                  Select Customer
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="Select_Customer"
                                    name="Select_Customer"
                                    value={formData.Select_Customer}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-sm-3">
                                  <button
                                    className="PriceListcardbtn"
                                    type="button"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="row text-start">
                                <label
                                  htmlFor="Select_Address"
                                  className="form-label col-sm-4"
                                >
                                  Select Address
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="Select_Address"
                                    name="Select_Address"
                                    value={formData.Select_Address}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <button
                                    className="PriceListcardbtn"
                                    type="button"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="row text-start">
                                <label
                                  htmlFor="Price_List_Code"
                                  className="form-label col-sm-4"
                                >
                                  Price List Code
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="Price_List_Code"
                                    name="Price_List_Code"
                                    value={formData.Price_List_Code}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="row text-start">
                                <label
                                  htmlFor="Price_List_Name"
                                  className="form-label col-sm-4"
                                >
                                  Price List Name
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="Price_List_Name"
                                    name="Price_List_Name"
                                    value={formData.Price_List_Name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="row text-start">
                                <label
                                  htmlFor="Effective_From_Date"
                                  className="form-label col-sm-4"
                                >
                                  Effective From Date
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="Effective_From_Date"
                                    name="Effective_From_Date"
                                    value={formData.Effective_From_Date}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <button
                                    type="submit"
                                    className="PriceListcardbtn"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  {showAddCardItemRate && (
                    <div className="Itemrate-overlay">
                      <div className="ItemRate-card card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 className="text-start" style={{ color: "blue" }}>
                            Item Rate Report
                          </h5>
                          <button
                            className="CloseItemRatebtn"
                            onClick={toggleAddCardItemRate}
                          >
                            X
                          </button>
                        </div>
                        <div className="card-body">
                          <ul
                            className="nav nav-tabs mb-3"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  activeTab === "query" ? "active" : ""
                                }`}
                                id="query-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#query"
                                type="button"
                                role="tab"
                                aria-controls="query"
                                aria-selected={activeTab === "query"}
                                onClick={() => setActiveTab("query")}
                              >
                                Query
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  activeTab === "result" ? "active" : ""
                                }`}
                                id="result-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#result"
                                type="button"
                                role="tab"
                                aria-controls="result"
                                aria-selected={activeTab === "result"}
                                onClick={() => setActiveTab("result")}
                              >
                                Result
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className={`tab-pane fade ${
                                activeTab === "query" ? "show active" : ""
                              }`}
                              id="query"
                              role="tabpanel"
                              aria-labelledby="query-tab"
                            >
                              <form>
                                <div className="mb-3">
                                  <div className="row text-start">
                                    <label
                                      htmlFor="effectiveDat"
                                      className="form-label col-sm-4"
                                    >
                                      Eff Date:
                                    </label>
                                    <div className="col-sm-8">
                                      <input
                                        type="date"
                                        className="form-control"
                                        id="effectiveDate"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <div className="row text-start">
                                    <div className="col-sm-4">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="flexCheckDefault"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="flexCheckDefault"
                                        >
                                          From Customer:
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-sm-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <div className="row text-start">
                                    <div className="col-sm-3">
                                      <button
                                        className="PriceListcardbtn"
                                        type="button"
                                      >
                                        Execute
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div
                              className={`tab-pane fade ${
                                activeTab === "result" ? "show active" : ""
                              }`}
                              id="result"
                              role="tabpanel"
                              aria-labelledby="result-tab"
                            >
                              <div className="row text-start">
                                <div className="col-md-4">
                                  <button className="itemratetablebtn">
                                    Export To Excel
                                  </button>
                                </div>
                              </div>
                              <div className="row text-start">
                                <div className="col-md-12">
                                  <div className="itemratetable table-responsive">
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Sr No</th>
                                          <th>Code</th>
                                          <th>Customer Name</th>
                                          <th>PL Code</th>
                                          <th>Item No</th>
                                          <th>Item Code</th>
                                          <th>Item Desc</th>
                                          <th>Eff. From</th>
                                          <th>Eff. To</th>
                                          <th>Rate</th>
                                          <th>Disc</th>
                                          <th>Qty</th>
                                          <th>PO No</th>
                                          <th>PO Date</th>
                                          <th>AMD No</th>
                                          <th>AMD Date</th>
                                          <th>Line No</th>
                                          <th>Type</th>
                                          <th>Block</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* Placeholder rows, replace with actual data rendering logic */}
                                        <tr>
                                          <td>1</td>
                                          <td>Code</td>
                                          <td>Customer Name</td>
                                          <td>PL Code</td>
                                          <td>Item No</td>
                                          <td>Item Code</td>
                                          <td>Item Desc</td>
                                          <td>2024-07-01</td>
                                          <td>2024-07-31</td>
                                          <td>100</td>
                                          <td>10%</td>
                                          <td>1</td>
                                          <td>PO123</td>
                                          <td>2024-07-02</td>
                                          <td>AMD001</td>
                                          <td>2024-07-03</td>
                                          <td>123</td>
                                          <td>Type A</td>
                                          <td>Yes</td>
                                        </tr>
                                        {/* Add more rows as needed */}
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
                  )}
                  {showAddCardPricereport && (
                    <div className="Pricereport-overlay overlay">
                      <div className="Pricereport-card card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 className="text-start" style={{ color: "blue" }}>
                            Price Rate Report
                          </h5>
                          <button
                            className="ClosePricereportbtn"
                            onClick={toggleAddCardPricereport}
                          >
                            X
                          </button>
                        </div>
                        <div className="card-body">
                          {/* Add tab navigation */}
                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  activeTab === "query" ? "active" : ""
                                }`}
                                id="query-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#query"
                                type="button"
                                role="tab"
                                aria-controls="query"
                                aria-selected={activeTab === "query"}
                                onClick={() => setActiveTab("query")}
                              >
                                Query
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  activeTab === "result" ? "active" : ""
                                }`}
                                id="result-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#result"
                                type="button"
                                role="tab"
                                aria-controls="result"
                                aria-selected={activeTab === "result"}
                                onClick={() => setActiveTab("result")}
                              >
                                Result
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  activeTab === "resultv2" ? "active" : ""
                                }`}
                                id="resultv2-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#resultv2"
                                type="button"
                                role="tab"
                                aria-controls="resultv2"
                                aria-selected={activeTab === "resultv2"}
                                onClick={() => setActiveTab("resultv2")}
                              >
                                Result v2
                              </button>
                            </li>
                          </ul>

                          {/* Tab content */}
                          <div className="tab-content" id="myTabContent">
                            <div
                              className={`tab-pane fade ${
                                activeTab === "query" ? "show active" : ""
                              }`}
                              id="query"
                              role="tabpanel"
                              aria-labelledby="query-tab"
                            >
                              {/* Query content */}
                              <form>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Eff Date:
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="customerName"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              From Customer:
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="addressCode"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Add Code:
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="priceListCode"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Price List Code:
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="priceListName"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Item Name:
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-sm-8">
                                          <input
                                            type="date"
                                            className="form-control"
                                            id="effectiveDate"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <div className="col-md-4">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              History:
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <label
                                          htmlFor="customerName"
                                          className="form-label col-sm-4"
                                        >
                                          To
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="date"
                                            className="form-control"
                                            id="effectiveDate"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <label
                                          htmlFor="addressCode"
                                          className="form-label col-sm-4"
                                        >
                                          To
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="addressCode"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <label
                                          htmlFor="priceListCode"
                                          className="form-label col-sm-4"
                                        >
                                          To
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="priceListCode"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <label
                                          htmlFor="priceListName"
                                          className="form-label col-sm-4"
                                        >
                                          To
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="priceListName"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="row text-start">
                                        <label
                                          htmlFor="effectiveDat"
                                          className="form-label col-sm-4"
                                        >
                                          To
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="priceListName"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <button
                                      type="submit"
                                      className="PriceListcardbtn"
                                    >
                                      Execute
                                    </button>
                                  </div>
                                  <div className="col-sm-6">
                                    <button
                                      type="submit"
                                      className="PriceListcardbtn"
                                    >
                                      Execute V2
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div
                              className={`tab-pane fade ${
                                activeTab === "result" ? "show active" : ""
                              }`}
                              id="result"
                              role="tabpanel"
                              aria-labelledby="result-tab"
                            >
                              <div className="row text-start">
                                <div className="col-md-4">
                                  <button className="itemratetablebtn">
                                    Export To Excel
                                  </button>
                                </div>
                              </div>
                              <div className="row text-start">
                                <div className="col-md-12">
                                  <div className="Pricereporttable table-responsive">
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Sr No</th>
                                          <th>Code</th>
                                          <th>Customer Name</th>
                                          <th>PL Code</th>
                                          <th>Item No</th>
                                          <th>Item Code</th>
                                          <th>Item Desc</th>
                                          <th>Eff. From</th>
                                          <th>Eff. To</th>
                                          <th>Rate</th>
                                          <th>Disc</th>
                                          <th>Qty</th>
                                          <th>PO No</th>
                                          <th>PO Date</th>
                                          <th>AMD No</th>
                                          <th>AMD Date</th>
                                          <th>Line No</th>
                                          <th>Type</th>
                                          <th>Block</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* Placeholder rows, replace with actual data rendering logic */}
                                        <tr>
                                          <td>1</td>
                                          <td>Code</td>
                                          <td>Customer Name</td>
                                          <td>PL Code</td>
                                          <td>Item No</td>
                                          <td>Item Code</td>
                                          <td>Item Desc</td>
                                          <td>2024-07-01</td>
                                          <td>2024-07-31</td>
                                          <td>100</td>
                                          <td>10%</td>
                                          <td>1</td>
                                          <td>PO123</td>
                                          <td>2024-07-02</td>
                                          <td>AMD001</td>
                                          <td>2024-07-03</td>
                                          <td>123</td>
                                          <td>Type A</td>
                                          <td>Yes</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`tab-pane fade ${
                                activeTab === "resultv2" ? "show active" : ""
                              }`}
                              id="resultv2"
                              role="tabpanel"
                              aria-labelledby="resultv2-tab"
                            >
                              <div className="row text-start">
                                <div className="col-md-4">
                                  <button className="itemratetablebtn">
                                    Export To Excel
                                  </button>
                                </div>
                              </div>
                              <div className="row text-start">
                                <div className="col-md-12">
                                  <div className="Pricereport1table table-responsive">
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Sr No</th>
                                          <th>Code</th>
                                          <th>Customer Name</th>
                                          <th>PL Code</th>
                                          <th>Item No</th>
                                          <th>Item Code</th>
                                          <th>Item Desc</th>
                                          <th>Eff. From</th>
                                          <th>Eff. To</th>
                                          <th>Rate</th>
                                          <th>Disc</th>
                                          <th>Qty</th>
                                          <th>PO No</th>
                                          <th>PO Date</th>
                                          <th>AMD No</th>
                                          <th>AMD Date</th>
                                          <th>Line No</th>
                                          <th>Type</th>
                                          <th>Block</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* Placeholder rows, replace with actual data rendering logic */}
                                        <tr>
                                          <td>1</td>
                                          <td>Code</td>
                                          <td>Customer Name</td>
                                          <td>PL Code</td>
                                          <td>Item No</td>
                                          <td>Item Code</td>
                                          <td>Item Desc</td>
                                          <td>2024-07-01</td>
                                          <td>2024-07-31</td>
                                          <td>100</td>
                                          <td>10%</td>
                                          <td>1</td>
                                          <td>PO123</td>
                                          <td>2024-07-02</td>
                                          <td>AMD001</td>
                                          <td>2024-07-03</td>
                                          <td>123</td>
                                          <td>Type A</td>
                                          <td>Yes</td>
                                        </tr>
                                        {/* Add more rows as needed */}
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
                  )}

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-3 col-sm-6">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              id="checkCustomerName"
                            />
                            <label className="form-check-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }} htmlFor="checkCustomerName">
                              Customer Name:
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              id="checkAddressCode"
                            />
                            <label className="form-check-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }} htmlFor="checkAddressCode">
                              Address code:
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              id="checkItem"
                            />
                            <label className="form-check-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }} htmlFor="checkItem">
                              Item:
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 mt-auto">
                          <button className="vndrbtn w-100">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive mt-4">
                          <table className="table table-bordered table-striped">
                            <thead className="table-primary">
                              <tr>
                                <th>Sr.</th>
                                <th>Cust Code</th>
                                <th>Cust_Name</th>
                                <th>Add Code</th>
                                <th>Price List Code</th>
                                <th>Price List Name</th>
                                <th>Eff.Date</th>
                                <th>isActive</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Item Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
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
                              </tr>
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
  );
};

export default PriceListMaster;
