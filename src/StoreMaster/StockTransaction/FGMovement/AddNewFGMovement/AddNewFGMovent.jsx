import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./AddNewFGMovement.css";
import Cached from "@mui/icons-material/Cached.js";

const AddNewFGMovent = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemList, setShowItemList] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState();
  const [heatNumbers, setHeatNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  function filterItems(items, searchString) {
    // split the input on whitespace, drop empty strings, lowercase
    const keywords = searchString
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    // if no keywords, hide list and return full list (or empty if you prefer)
    if (keywords.length === 0) {
      setShowItemList(false);
      return items;
    }

    // filter
    const filtered = items.filter((item) => {
      const partNo = item.part_no.toLowerCase();
      const desc = item.Name_Description.toLowerCase();
      // include this item if ANY keyword matches part_no OR description
      return keywords.some((kw) => partNo.includes(kw) || desc.includes(kw));
    });

    // hide when there's nothing to show
    setShowItemList(filtered.length > 0);

    return filtered;
  }

  const fetchItems = async () => {
    const res = await fetch(
      "https://sellerp-backend.onrender.com/All_Masters/api/item/summary/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const resData = await res.json();
    console.log(resData);
    setItems(resData);
  };

  const fetchHeatNumbers = async (code) => {
    try {
      const res = await fetch(
        `https://sellerp-backend.onrender.com/Store/grn/heat-numbers/?item_code=${code}`
      );
      const resData = await res.json();
      setHeatNumbers(resData.heat_numbers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    setInputValue(item.part_no); // Set the input value to the selected item
    setShowItemList(false);
    fetchHeatNumbers(item.part_no); // Pass the part_no instead of the whole item
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // If user clears the input, also clear the selected item
    if (value === "") {
      setSelectedItem(null);
      setHeatNumbers([]);
    }

    const fItems = filterItems(items, value);
    setFilteredItems(fItems);
  };

  return (
    <div className="NewStoreFgMoventAdd">
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
                <div className="FgMoventAdd-header mb-4 mt-2 p-3 bg-white rounded-3 shadow-sm border">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <h5 className="header-title mb-0" style={{ fontWeight: 800, fontSize: "1.8rem", background: "linear-gradient(90deg, #2563eb, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      Add New FG Movement
                    </h5>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <select className="form-select" style={{ height: "34px", width: "auto" }}>
                        <option>Produlink</option>
                      </select>
                      <Link className="btn btn-primary" to="/FGToFGStock" style={{ height: "34px", display: "flex", alignItems: "center" }}>
                        New FG TO FG Movement (ShopFloor)
                      </Link>
                      <Link className="btn btn-primary" to="/FG-Movement" style={{ height: "34px", display: "flex", alignItems: "center" }}>
                        FG Movement Report
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="FgMoventAdd-main p-4 bg-white rounded-3 shadow-sm border mt-3">
                  <div className="container-fluid text-start p-0">
                    <div className="row g-4">
                      {/* Column 1 */}
                      <div className="col-lg-5 col-md-12 border-end border-secondary-subtle pe-lg-4">
                        <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom">Movement Details</h6>
                        
                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Trn No:</label>
                          </div>
                          <div className="col-sm-6">
                            <input className="form-control form-control-sm" placeholder="Trn No" />
                          </div>
                          <div className="col-sm-2 text-center">
                            <Cached className="text-primary" style={{ cursor: "pointer" }} />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center position-relative">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">FG Item:</label>
                          </div>
                          <div className="col-sm-6 position-relative">
                            <input
                              type="text"
                              name="SelectItem"
                              className="form-control form-control-sm"
                              value={inputValue}
                              onChange={handleInputChange}
                              autoComplete="off"
                              placeholder="Search FG Item..."
                            />
                            {showItemList && (
                              <ul
                                className="dropdown-menu show shadow-sm border rounded-2 p-1"
                                style={{
                                  width: "100%",
                                  maxHeight: "220px",
                                  overflowY: "auto",
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  zIndex: 1050,
                                  backgroundColor: "#fff",
                                }}
                              >
                                {filteredItems.map((item) => (
                                  <li
                                    key={item.part_no}
                                    className="dropdown-item py-2 px-3 rounded-1 text-truncate"
                                    style={{ fontSize: "0.85rem", cursor: "pointer" }}
                                    onClick={() => {
                                      handleSelectItem(item);
                                    }}
                                  >
                                    <span className="fw-bold">{item.part_no}</span> - {item.Part_Code} - {item.Name_Description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-sm w-100 p-1">
                              Select
                            </button>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Operation:</label>
                          </div>
                          <div className="col-sm-8">
                            <input className="form-control form-control-sm" placeholder="Operation" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Ok Qty:</label>
                          </div>
                          <div className="col-sm-8">
                            <input type="number" className="form-control form-control-sm" placeholder="0" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Rework Qty:</label>
                          </div>
                          <div className="col-sm-8">
                            <input type="number" className="form-control form-control-sm" placeholder="0" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Reject Qty:</label>
                          </div>
                          <div className="col-sm-8">
                            <input type="number" className="form-control form-control-sm" placeholder="0" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-start">
                          <div className="col-sm-4 pt-1">
                            <label className="form-label fw-semibold text-secondary mb-0">Remark:</label>
                          </div>
                          <div className="col-sm-8">
                            <textarea className="form-control form-control-sm" rows="2" placeholder="Enter remarks..."></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="col-lg-3 col-md-6 border-end border-secondary-subtle px-lg-4">
                        <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom">Schedule / Reference</h6>
                        
                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Date:</label>
                          </div>
                          <div className="col-sm-8">
                            <input type="date" className="form-control form-control-sm" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Ref:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Reference</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="col-lg-4 col-md-6 ps-lg-4">
                        <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom">Stock & Heat Information</h6>
                        
                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Stock View:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option>All</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Heat Code:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Heat Code</option>
                              {heatNumbers.length > 0 &&
                                heatNumbers.map((heat, index) => (
                                  <option key={index} value={heat.heat_no}>
                                    {heat.heat_no}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 pt-3 border-top">
                      <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-success px-5 py-2 fw-bold shadow-sm">
                          Save Movement
                        </button>
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

export default AddNewFGMovent;