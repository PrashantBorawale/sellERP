import React, { useEffect, useState } from "react";
import "./AddNewItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import CachedIcon from "@mui/icons-material/Cached";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchMainGroupData, getUnitCode } from "../../../Service/Api.jsx";

const AddNewItem = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const [unitCodes, setUnitCodes] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [mainGroups, setMainGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the main group data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchMainGroupData(); // Call API to fetch main group data
        setMainGroups(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching main group data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGroup(selectedValue);

    // Navigate based on selected value
    if (mainGroups.some((group) => group.name === selectedValue)) {
      navigate("/item-master-gernal");
    }
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    const fetchUnitCodes = async () => {
      try {
        const data = await getUnitCode();
        setUnitCodes(data);
      } catch (error) {
        console.error("Error fetching unit codes:", error);
      }
    };

    fetchUnitCodes();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  return (
    <div className="AddNewItemPage">
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
                <div className="assd">
                  <div className="top-but2">
                    <div className="row align-items-center">
                      <div className="col-md-2 mt-4 text-start">
                        <p style={{ color: "blue" }}>Item List</p>
                      </div>
                      <div className="col-md-10 text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <label htmlFor="input" className="me-2">
                            Search Item For Copy
                          </label>
                          <input type="text" id="input" className="me-2" />
                          <button className="btn-uper me-2">Copy Item</button>
                          <button className="btn-uper me-2">
                            Section Group Master
                          </button>
                          <Link to={"/item-master"} className="btn-uper">
                            Item List
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="AddNewMain">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <ul
                            className="nav nav-pills mb-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                General
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Date-2
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                              >
                                Technical Specification
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-about-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-about"
                                type="button"
                                role="tab"
                                aria-controls="pills-about"
                                aria-selected="false"
                              >
                                NPD
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabIndex="0"
                            >
                              <div className="addnewitemmmmm">
                               
                                <div className="container">
                                  <div className="row text-start">
                                    <div className="col-md-4">
                                      <div className="row">
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="mainGroup"
                                            className="col-sm-4 col-form-label"
                                          >
                                            Main Group:
                                          </label>
                                          <div className="col-sm-5">
                                            <select
                                              id="mainGroup"
                                              className="form-select"
                                              onChange={handleDropdownChange}
                                              value={selectedGroup}
                                            >
                                              <option
                                                style={{ color: "black" }}
                                              >
                                                Select ..
                                              </option>
                                              {mainGroups.map((group) => (
                                                <option
                                                  key={group.id}
                                                  value={group.name}
                                                >
                                                  {group.name}
                                                </option>

                                              ))}
                                              
                                            </select>
                                          </div>
                                          <div className="col-sm-2">
                                            <button className="btn">New</button>
                                          </div>
                                          <div className="col-sm-1">
                                            <button
                                              className="btn"
                                              style={{ fontSize: "10px" }}
                                            >
                                              <CachedIcon />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="inputEmail3"
                                            className="col-sm-5 col-form-label"
                                          >
                                            Part No:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="input"
                                              className="
                                        form-control"
                                              style={{ width: "115%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="unitCode"
                                            className="col-sm-4 col-form-label"
                                          >
                                            Unit Code:
                                          </label>
                                          <div className="col-sm-5">
                                            <select
                                              id="unitCode"
                                              className="form-select"
                                              value={selectedUnit}
                                              onChange={handleSelectChange}
                                            >
                                              <option value="">
                                                Select ..
                                              </option>
                                              {unitCodes.map((unit, index) => (
                                                <option
                                                  key={index}
                                                  value={unit.name}
                                                >
                                                  {unit.name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          <div className="col-sm-2">
                                            <button className="btn">New</button>
                                          </div>
                                          <div className="col-sm-1">
                                            <button
                                              className="btn"
                                              style={{ fontSize: "10px" }}
                                            >
                                              <CachedIcon />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="row">
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="inputEmail3"
                                            className="col-sm-4 col-form-label"
                                          >
                                            Item Group:
                                          </label>
                                          <div className="col-sm-5">
                                            <select
                                              id="inputState"
                                              className="form-select"
                                            >
                                              <option selected>
                                                Select ..
                                              </option>
                                              <option selected>ALl</option>
                                              <option value="BEARING">BEARING</option>
                            <option value="BELTS">BELTS</option>
                            <option value="CAMS">CAMS</option>
                            <option value="COLLETS & HOLDERS">COLLETS & HOLDERS</option>
                            <option value="COMPUTER">COMPUTER</option>
                            <option value="CUTTING TOOL">CUTTING TOOL</option>
                            <option value="ELECTRICS PARTS">ELECTRICS PARTS</option>
                            <option value="END PIEC">END PIECE</option>
                            <option value="FIXCTURE">FIXCTURE</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-2">
                                            <button className="btn">New</button>
                                          </div>
                                          <div className="col-sm-1">
                                            <button
                                              className="btn"
                                              style={{ fontSize: "10px" }}
                                            >
                                              <CachedIcon />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="inputEmail3"
                                            className="col-sm-5 col-form-label"
                                          >
                                            Name/Description:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="input"
                                              className="
                                        form-control"
                                              style={{ width: "115%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="inputEmail3"
                                            className="col-sm-4 col-form-label"
                                          >
                                            Store Location:
                                          </label>
                                          <div className="col-sm-5">
                                            <select
                                              id="inputState"
                                              className="form-select"
                                            >
                                              <option selected>
                                                Select ..
                                              </option>
                                              <option value="Store">STORE</option>
                                              <option value="Maintenace">MAINTENANCE</option>
                                              <option value="FG">FG</option>
                                              <option value="SFG">SFG</option>
                                              <option value="RAW Material">RAW MATERIAL</option>
                                              <option value="Consumerable">CONSUMABLE</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-2">
                                            <button className="btn">New</button>
                                          </div>
                                          <div className="col-sm-1">
                                            <button
                                              className="btn"
                                              style={{ fontSize: "10px" }}
                                            >
                                              <CachedIcon />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="row">
                                        <div className="row mb-3">
                                          <label
                                            htmlFor="inputEmail3"
                                            className="col-sm-5 col-form-label"
                                          >
                                            SE Item/Part No:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="input"
                                              className="
                                        form-control"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                               
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabIndex="0"
                            >
                              <p>tab2</p>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabIndex="0"
                            >
                              <p>tab3</p>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-about"
                              role="tabpanel"
                              aria-labelledby="pills-about-tab"
                              tabIndex="0"
                            >
                              <p>tab4</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ color: "blue" }}>
                    <div className="col-md-1 text-start">
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Active:
                      </label>
                    </div>
                    <div className="col-md-1 text-start">
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
                          Save
                        </label>
                      </div>
                    </div>

                    <div className="col-md-1 text-start">
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
                          Purchase
                        </label>
                      </div>
                    </div>

                    <div className="col-md-7 text-start"></div>
                    <div className="col-md-1 text-end">
                      <button className="bjkd">Save</button>
                    </div>
                    <div className="col-md-1 text-end">
                      <button className="bjkd">Clear</button>
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

export default AddNewItem;
