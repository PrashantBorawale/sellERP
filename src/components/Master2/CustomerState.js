import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CustomerState.css";
import axios from "axios";

const CustomerState = () => {
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

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_id: "",
    type: "",
    preference: "",
    state_id: "",
    state_no: "",
    code: "",
  });
  const [searchId, setSearchId] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("api/master/customer_state/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await axios.get(
          `api/master/customer_state/${searchId}/`
        );
        setData([response.data]); // Show only the search result
      } catch (error) {
        console.error("Error searching data", error);
      }
    } else {
      fetchData(); // Reset to show all data
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("api/master/customer_state/", formData);
      fetchData();
      setFormData({
        customer_name: "",
        customer_id: "",
        type: "",
        preference: "",
        state_id: "",
        state_no: "",
        code: "",
      });
    } catch (error) {
      console.error("Error adding data", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `api/master/customer_state/${formData.customer_id}/`,
        formData
      );
      fetchData();
      setEditMode(false);
      setFormData({
        customer_name: "",
        customer_id: "",
        type: "",
        preference: "",
        state_id: "",
        state_no: "",
        code: "",
      });
    } catch (error) {
      console.error("Error editing data", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/master/customer_state/${id}/`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleEditClick = (item) => {
    setFormData(item);
    setEditMode(true);
  };
  return (
    <div className="customer">
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
                <div className="Middle">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="container mt-5">
                          <div className="row text-start">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <label>Customer Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="customer_name"
                                      value={formData.customer_name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <label>Customer ID</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="customer_id"
                                      value={formData.customer_id}
                                      onChange={handleChange}
                                      readOnly={editMode}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-1">
                                  <div className="form-group">
                                    <label>Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="type"
                                      value={formData.type}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <label>Preference</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="preference"
                                      value={formData.preference}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-1">
                                  <div className="form-group">
                                    <label>State ID</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="state_id"
                                      value={formData.state_id}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-1">
                                  <div className="form-group">
                                    <label>State No.</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="state_no"
                                      value={formData.state_no}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-1">
                                  <div className="form-group">
                                    <label>Code</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="code"
                                      value={formData.code}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <button
                                      type="button"
                                      className="customerStateadd"
                                      onClick={
                                        editMode ? handleEdit : handleAdd
                                      }
                                    >
                                      {editMode ? "Update" : "Add"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container mt-5">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  id="customersearch"
                                  className="form-control"
                                  placeholder="Search by Customer ID..."
                                  name="searchId"
                                  value={searchId}
                                  onChange={(e) => setSearchId(e.target.value)}
                                />
                                <button
                                  type="button"
                                  className="customerState"
                                  onClick={handleSearch}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container mt-5 table-container">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Customer Name</th>
                                  <th>Customer ID</th>
                                  <th>Type</th>
                                  <th>Preference</th>
                                  <th>State ID</th>
                                  <th>State No.</th>
                                  <th>Code</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item) => (
                                  <tr key={item.customer_id}>
                                    <td>{item.customer_name}</td>
                                    <td>{item.customer_id}</td>
                                    <td>{item.type}</td>
                                    <td>{item.preference}</td>
                                    <td>{item.state_id}</td>
                                    <td>{item.state_no}</td>
                                    <td>{item.code}</td>
                                    <td>
                                      <button
                                        className="customerStateicon me-2"
                                        onClick={() => handleEditClick(item)}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </button>
                                      <button
                                        className="customerStateicon"
                                        onClick={() =>
                                          handleDelete(item.customer_id)
                                        }
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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

export default CustomerState;
