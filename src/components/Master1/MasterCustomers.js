import "./MasterCustomers.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import axios from "axios";

const MasterCustomers = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_type: "",
    preference_string: "",
  });
  const [customers, setCustomers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/master/customers/", formData);
      console.log("Data posted:", response.data);
      fetchData(); // Refresh the data after adding a new customer
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("api/master/customers/");
      setCustomers(response.data);
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      const response = await axios.delete(
        `api/master/customers/${customerId}/`
      );
      console.log("Customer deleted:", response.data);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEdit = async (customerId) => {
    try {
      const response = await axios.get(`api/master/customers/${customerId}/`);
      console.log("Editing customer:", response.data);
      const { customer_id, customer_type, preference_string } = response.data;
      setFormData({
        customer_id,
        customer_type,
        preference_string,
      });
    } catch (error) {
      console.error("Error fetching customer for edit:", error);
    }
  };
  const handleSearch = () => {
    const { customer_id } = formData;
    if (customer_id.trim() === "") {
      setSearchResults(customers);
    } else {
      const filtered = customers.filter((customer) =>
        String(customer.customer_id)
          .toLowerCase()
          .includes(customer_id.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="mastercus">
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
                              <label
                                htmlFor="customer_id"
                                className="form-label"
                              >
                                Customer ID
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="customer_id"
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3 col-md-6 col-lg-3">
                              <label
                                htmlFor="customer_type"
                                className="form-label"
                              >
                                Customer Type
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="customer_type"
                                name="customer_type"
                                value={formData.customer_type}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3 col-md-6 col-lg-3">
                              <label
                                htmlFor="preference_string"
                                className="form-label"
                              >
                                Preference String
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="preference_string"
                                name="preference_string"
                                value={formData.preference_string}
                                onChange={handleChange}
                              />
                            </div>
                            <div
                              className="mb-3 d-flex align-items-end col-md-6 col-lg-1"
                              style={{ marginTop: "30px" }}
                            >
                              <button
                                type="submit"
                                className="mastercustomer me-2"
                                style={{
                                  padding: "8px",
                                  width: "100%",
                                }}
                              >
                                Submit
                              </button>
                            </div>
                          </form>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  id="mastercustomersearch"
                                  className="form-control"
                                  placeholder="Search..."
                                  name="customer_id"
                                  value={formData.customer_id}
                                  onChange={handleChange}
                                />

                                <button
                                  type="button"
                                  className="mastercustomer"
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
                                  <th>Customer ID</th>
                                  <th>Customer Type</th>
                                  <th>Preference String</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(searchResults.length > 0
                                  ? searchResults
                                  : customers
                                ).map((customer) => (
                                  <tr key={customer.customer_id}>
                                    <td>{customer.customer_id}</td>
                                    <td>{customer.customer_type}</td>
                                    <td>{customer.preference_string}</td>
                                    <td>
                                      <button className="masterState1icon me-2">
                                        <i className="fas fa-plus"></i>
                                      </button>
                                      <button
                                        className="masterState1icon me-2"
                                        onClick={() =>
                                          handleEdit(customer.customer_id)
                                        }
                                      >
                                        <i className="fas fa-edit"></i>
                                      </button>
                                      <button
                                        className="masterState1icon"
                                        onClick={() =>
                                          handleDelete(customer.customer_id)
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

export default MasterCustomers;
