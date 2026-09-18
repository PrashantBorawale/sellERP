import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import Cached from "@mui/icons-material/Cached.js";

const FGTOFGMovement = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems1, setFilteredItems1] = useState([]);
  const [filteredItems2, setFilteredItems2] = useState([]);
  const [showItem1List, setShowItem1List] = useState(false);
  const [showItem2List, setShowItem2List] = useState(false);
  const [selectedItem1, setSelectedItem1] = useState();
  const [selectedItem2, setSelectedItem2] = useState();
  const [heatNumbers1, setHeatNumbers1] = useState([]);
  const [heatNumbers2, setHeatNumbers2] = useState([]);

  const [item1Data, setItem1Data] = useState({
    item_code: "",
    part_code: "",
  });
  const [item2Data, setItem2Data] = useState({
    item_code: "",
    part_code: "",
  });

  function filterItems(items, searchString, itemNumber) {
    // split the input on whitespace, drop empty strings, lowercase
    const keywords = searchString
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    // if no keywords, hide list and return full list (or empty if you prefer)
    if (keywords.length === 0) {
      if (itemNumber === 1) {
        setShowItem1List(false);
      } else {
        setShowItem2List(false);
      }
      return items;
    }

    // filter
    const filtered = items.filter((item) => {
      const partNo = item.part_no.toLowerCase();
      const desc = item.Name_Description.toLowerCase();
      // include this item if ANY keyword matches part_no OR description
      return keywords.some((kw) => partNo.includes(kw) || desc.includes(kw));
    });

    // show/hide based on item number
    if (itemNumber === 1) {
      setShowItem1List(filtered.length > 0);
    } else {
      setShowItem2List(filtered.length > 0);
    }

    return filtered;
  }

  const fetchHeatNumbers = async (code, itemNumber) => {
    try {
      const res = await fetch(
        `https://sellerp-backend.onrender.com/Store/grn/heat-numbers/?item_code=${code}`
      );
      const resData = await res.json();
      if (itemNumber === 1) {
        setHeatNumbers1(resData.heat_numbers);
      } else {
        setHeatNumbers2(resData.heat_numbers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://sellerp-backend.onrender.com/All_Masters/api/item/summary/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      setItems(resData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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

  const handleItem1Select = (item) => {
    setItem1Data((prev) => {
      return { ...prev, item_code: item.part_no, part_code: item.Part_Code };
    });
    fetchHeatNumbers(item.part_no, 1);
    setSelectedItem1(item);
    setShowItem1List(false);
  };

  const handleItem2Select = (item) => {
    setItem2Data((prev) => {
      return { ...prev, item_code: item.part_no, part_code: item.Part_Code };
    });
    fetchHeatNumbers(item.part_no, 2);
    setSelectedItem2(item);
    setShowItem2List(false);
  };

  return (
    <div className="NewStoreFgMoventStock">
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
                <div className="FgMoventStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title text-start">
                        FG To FG Stock Movement
                      </h5>
                    </div>
                    <div className="col-md-8 text-start">
                      <div className="row">
                        <div className="col-md-2 d-flex flex-wrap">
                          <select>
                            <option>VISHWA S.I.</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FgMoventStock-main">
                  <div className="container-fluid text-start">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Trn No:</label>
                          </div>
                          <div className="col-md-4">
                            <input />
                          </div>
                          <div className="col-md-4">
                            <Cached />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Tran. Date:</label>
                          </div>
                          <div className="col-md-4">
                            <input type="date" />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Item Code:</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="Item"
                              value={item1Data.item_code}
                              onChange={(e) => {
                                setItem1Data((prev) => {
                                  return { ...prev, item_code: e.target.value };
                                });
                                const filtered = filterItems(
                                  items,
                                  e.target.value,
                                  1
                                );
                                console.log(filtered);
                                setFilteredItems1(filtered);
                              }}
                              className="form-control"
                              autoComplete="off"
                            />
                            {/* <button className="pobtn ms-2">Search</button> */}
                            {showItem1List && (
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  width: "30%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  border: "1px solid #ccc",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredItems1.map((item) => (
                                  <li
                                    key={item.part_no}
                                    className="dropdown-item"
                                    onClick={() => handleItem1Select(item)}
                                    style={{
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {item.part_no} - {item.Part_Code} -{" "}
                                    {item.Name_Description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Part Code:</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              <option>{selectedItem1?.Part_Code || ""} </option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Heat No:</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              {heatNumbers1.length > 0 && 
                                heatNumbers1.map((heat, index) => {
                                  return <option key={index}>{heat.heat_no}</option>
                                })
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="FGMovementSelect">
                      <div className="row flex-nowrap align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title text-start">
                            Select Item to Transfer Stock
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Item Code:</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              name="Item"
                              value={item2Data.item_code}
                              onChange={(e) => {
                                setItem2Data((prev) => {
                                  return { ...prev, item_code: e.target.value };
                                });
                                const filtered = filterItems(
                                  items,
                                  e.target.value,
                                  2
                                );
                                console.log(filtered);
                                setFilteredItems2(filtered);
                              }}
                              className="form-control"
                              autoComplete="off"
                            />
                            {/* <button className="pobtn ms-2">Search</button> */}
                            {showItem2List && (
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  width: "30%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  border: "1px solid #ccc",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredItems2.map((item) => (
                                  <li
                                    key={item.part_no}
                                    className="dropdown-item"
                                    onClick={() => handleItem2Select(item)}
                                    style={{
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {item.part_no} - {item.Part_Code} -{" "}
                                    {item.Name_Description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Part Code:</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              <option>{selectedItem2?.Part_Code || ""}</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Heat No:</label>
                          </div>
                          <div className="col-md-4">
                            <select>
                              {heatNumbers2.length > 0 && 
                                heatNumbers2.map((heat, index) => {
                                  return <option key={index}>{heat.heat_no}</option>
                                })
                              }
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label>FGToFGMovement:</label>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Transfer Qty:</label>
                          </div>
                          <div className="col-md-4">
                            <input />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Remark:</label>
                          </div>
                          <div className="col-md-8">
                            <textarea></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-end mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="pobtn">
                          Save
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

export default FGTOFGMovement;