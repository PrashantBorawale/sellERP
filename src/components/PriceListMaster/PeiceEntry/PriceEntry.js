import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./PriceEntry.css";

import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  fetchPriceListEntries,
  savePriceListEntry,
  updatePriceListEntry,
  deletePriceListEntry,
} from "../../../Service/Api.jsx";

const PriceEntry = () => {
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

  const [priceEntries, setPriceEntries] = useState([]);
  const [formData, setFormData] = useState({
    Qty: "",
    Rate: "",
    Disk: "",
    Weff_Date: "",
    Po_No: "",
    Po_Date: "",
    Amd_No: "",
    Amd_Date: "",
    Po_Line_No: "",
    Po_Type: "",
    Cust_Eff_Date: "",
    Remark: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPriceListEntries()
      .then((data) => setPriceEntries(data.sort((a, b) => b.id - a.id)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (Object.values(formData).some((field) => field === "")) {
      toast.error("All fields are required!");
      return;
    }

    try {
      if (editId) {
        await updatePriceListEntry(editId, formData);
        toast.success("Price List Entry updated successfully!");
      } else {
        await savePriceListEntry(formData);
        toast.success("Price List Entry saved successfully!");
      }
      setFormData({
        Qty: "",
        Rate: "",
        Disk: "",
        Weff_Date: "",
        Po_No: "",
        Po_Date: "",
        Amd_No: "",
        Amd_Date: "",
        Po_Line_No: "",
        Po_Type: "",
        Cust_Eff_Date: "",
        Remark: "",
      });
      setEditId(null);
      const updatedEntries = await fetchPriceListEntries();
      setPriceEntries(updatedEntries);
    } catch (error) {
      toast.error("Failed to save data");
    }
  };

  const handleEdit = (id) => {
    const entry = priceEntries.find((item) => item.id === id);
    setFormData(entry);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePriceListEntry(id);
      toast.success("Price List Entry deleted successfully!");
      const updatedEntries = await fetchPriceListEntries();
      setPriceEntries(updatedEntries);
    } catch (error) {
      toast.error("Failed to delete data");
    }
  };

  return (
    <div className="PriceentryMaster">
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
                <div className="PriceentryMaster1">
                <div className="Priceentry-header mb-4 text-start mt-5">
                       <div className="row align-items-center">
                        <div className="col-md-6">
                         <h5 className="header-title">Price Entry Master</h5>
                        </div>
                        <div className="col-md-6 text-end">
                          <button className="btn">
                            Export To Excel
                          </button>
                        </div>
                      </div>
                  
                  </div>
                  <div className="PriceentryMain mt-5">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-5">
                          <div className="mb-3">
                            <div className="row text-start">
                              <label
                                htmlFor="customerName"
                                className="form-label col-sm-4"
                              >
                                Select Customer:
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="customerName"
                                />
                              </div>
                              <div className="col-sm-3">
                                <button
                                  className="btn"
                                  type="button"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="mb-3">
                            <div className="row text-start">
                              <label
                                htmlFor="customerName"
                                className="form-label col-sm-4"
                              >
                                Price List Code:
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="customerName"
                                />
                              </div>
                              <div className="col-sm-3">
                                <button
                                  className="btn"
                                  type="button"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="mb-3">
                            <div className="row text-start">
                              <label
                                htmlFor="customerName"
                                className="form-label col-sm-4"
                              >
                                Item No/Code:
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="customerName"
                                />
                              </div>
                              <div className="col-sm-3">
                                <button
                                  className="btn"
                                  type="button"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-6">
                              <button className="btn">
                                Cancel
                              </button>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="activeItemCheckbox"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="activeItemCheckbox"
                                    >
                                      Active Item
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="companyHeaderCheckbox"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="companyHeaderCheckbox"
                                    >
                                      Company Header
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                  <button className="btn">
                                    Export to Excel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
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
                                  Pay Term:
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
                          <div className="row text-start">
                            <div className="col-md-4">
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Disc:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="customerName"
                              />
                            </div>
                            <div className="col-sm-8">
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                %
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option selected>select...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                          <button className="btn">
                            Upload Price List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Priceentrytable mt-5">
                    <table className="table table-bordered table-responsive">
                      <thead>
                        <tr>
                          <th>Qty</th>

                          <th>Rate</th>
                          <th>Disc %</th>
                          <th>WEff date</th>
                          <th>PO No</th>
                          <th>PO Date</th>
                          <th>AMD No</th>
                          <th>AMD Date</th>
                          <th>PoLine No</th>
                          <th>Po Type</th>
                          <th>Cust EFf Date</th>
                          <th>Remark</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="Qty"
                              value={formData.Qty}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Rate"
                              value={formData.Rate}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Disk"
                              value={formData.Disk}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="Weff_Date"
                              value={formData.Weff_Date}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Po_No"
                              value={formData.Po_No}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="Po_Date"
                              value={formData.Po_Date}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Amd_No"
                              value={formData.Amd_No}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="Amd_Date"
                              value={formData.Amd_Date}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Po_Line_No"
                              value={formData.Po_Line_No}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Po_Type"
                              value={formData.Po_Type}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="Cust_Eff_Date"
                              value={formData.Cust_Eff_Date}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Remark"
                              value={formData.Remark}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <button
                              style={{
                                border: "none",
                                padding: "5px",
                                margin: "5px",
                              }}
                              onClick={handleSave}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                        {priceEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.Qty}</td>
                            <td>{entry.Rate}</td>
                            <td>{entry.Disk}</td>
                            <td>{entry.Weff_Date}</td>
                            <td>{entry.Po_No}</td>
                            <td>{entry.Po_Date}</td>
                            <td>{entry.Amd_No}</td>
                            <td>{entry.Amd_Date}</td>
                            <td>{entry.Po_Line_No}</td>
                            <td>{entry.Po_Type}</td>
                            <td>{entry.Cust_Eff_Date}</td>
                            <td>{entry.Remark}</td>
                            <td>
                              <button
                                style={{
                                  border: "none",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                onClick={() => handleEdit(entry.id)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                style={{
                                  border: "none",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                onClick={() => handleDelete(entry.id)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="Priceentrybottom mt-5">
                    <div className="row text-start">
                      <div className="col-6">
                        <button className="btn">Save</button>
                        <button className="btn">
                          Price History
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

export default PriceEntry;
