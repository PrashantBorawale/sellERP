import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MasterState.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";

const MasterState = ({ toggleSideNav, sideNavOpen }) => {
  const [formData, setFormData] = useState({
    state_id: "",
    state_no: "",
    state_name: "",
    state_code: "",
    searchTerm: "",
  });
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get("api/master/states/");
      setStates(response.data);
      setFilteredStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("api/master/states/", formData);
      fetchStates();
      setFormData({
        state_id: "",
        state_no: "",
        state_name: "",
        state_code: "",
        searchTerm: "",
      });
    } catch (error) {
      setError("Error submitting data");
      console.error("Error submitting data:", error);
    }
  };

  const handleSearch = () => {
    const searchTerm = formData.searchTerm;
    const filtered = states.filter(
      (state) =>
        (state.state_id?.toString() || "").includes(searchTerm) ||
        (state.state_no?.toString() || "").includes(searchTerm) ||
        (state.state_name?.toString() || "").includes(searchTerm) ||
        (state.state_code?.toString() || "").includes(searchTerm)
    );
    setFilteredStates(filtered);
  };

  const handleEdit = (stateId) => {
    const stateToEdit = states.find((state) => state.state_id === stateId);
    setFormData({
      state_id: stateToEdit.state_id,
      state_no: stateToEdit.state_no,
      state_name: stateToEdit.state_name,
      state_code: stateToEdit.state_code,
      searchTerm: "",
    });
  };

  const handleDelete = async (stateId) => {
    try {
      await axios.delete(`api/master/states/${stateId}`);
      fetchStates();
    } catch (error) {
      setError("Error deleting data");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="masterState">
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
                          <form
                            onSubmit={handleSubmit}
                            className="d-flex flex-wrap justify-content-between align-items-center form-container"
                          >
                            <div className="mb-3 col-md-6 col-lg-3">
                              <label htmlFor="state_id" className="form-label">
                                State ID
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="state_id"
                                name="state_id"
                                value={formData.state_id}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="state_no" className="form-label">
                                State No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="state_no"
                                name="state_no"
                                value={formData.state_no}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="state_name"
                                className="form-label"
                              >
                                State Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="state_name"
                                name="state_name"
                                value={formData.state_name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="state_code"
                                className="form-label"
                              >
                                State Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="state_code"
                                name="state_code"
                                value={formData.state_code}
                                onChange={handleChange}
                              />
                            </div>
                            <div
                              className="mb-3 d-flex align-items-end"
                              style={{ marginTop: "30px" }}
                            >
                              <button type="submit" className="masterState1">
                                Submit
                              </button>
                            </div>
                          </form>
                          {error && <p className="text-danger">{error}</p>}
                          <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-md-12">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  id="search-input"
                                  className="form-control"
                                  placeholder="Search..."
                                  name="searchTerm"
                                  value={formData.searchTerm}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  className="masterState1"
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
                                  <th>State ID</th>
                                  <th>State No.</th>
                                  <th>State Name</th>
                                  <th>State Code</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredStates.map((state) => (
                                  <tr key={state.state_id}>
                                    <td>{state.state_id}</td>
                                    <td>{state.state_no}</td>
                                    <td>{state.state_name}</td>
                                    <td>{state.state_code}</td>
                                    <td>
                                      <button
                                        className="masterState1icon me-2"
                                        onClick={() =>
                                          setFormData({
                                            state_id: "",
                                            state_no: "",
                                            state_name: "",
                                            state_code: "",
                                            searchTerm: "",
                                          })
                                        }
                                      >
                                        <i className="fas fa-plus"></i>
                                      </button>
                                      <button
                                        className="masterState1icon me-2"
                                        onClick={() =>
                                          handleEdit(state.state_id)
                                        }
                                      >
                                        <i className="fas fa-edit"></i>
                                      </button>
                                      <button
                                        className="masterState1icon me-2"
                                        onClick={() =>
                                          handleDelete(state.state_id)
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
export default MasterState;
