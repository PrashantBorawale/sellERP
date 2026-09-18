import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./DocumentMAnagement.css";
const DocumentManagement = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  // const [docName, setDocName] = useState("");
  const [specNo, setSpecNo] = useState("");
  const [description, setDescription] = useState("");
  const [remark, setRemark] = useState("");
  const [formatNo, setFormatNo] = useState("");
  const [retentionPeriod, setRetentionPeriod] = useState("");
  // const [file, setFile] = useState(null);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const handleClear = () => {
    setDate("");
    setCategory("");
    // setDocName("");
    setSpecNo("");
    setDescription("");
    setRemark("");
    setFormatNo("");
    setRetentionPeriod("");
    // setFile(null);
  };

  const handleSave = () => {
    // Handle save document logic here
  };

  return (
    <div className="Document">
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
                <div className="Documentrmaster">
                <div className="Document1-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Document Management</h5>
                        </div>
                        <div className="col-md-6 text-md-end text-start mt-2 mt-md-0">
                          <button className="btn">
                            Export To Excel
                          </button>
                        </div>
                      </div>
                    </div>
               
                  <div className="DocumentMain mt-5">
                    <div className="container-fluid">
                      <div className="DocumentMain">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>
                                Category{" "}
                                <span>
                                  <button
                                    className="btn"
                                    onClick={() => setShowCategoryOverlay(true)}
                                  >
                                    Add
                                  </button>
                                </span>
                              </th>
                              <th>Doc. Name</th>
                              <th>Spec. No</th>
                              <th>Description</th>
                              <th>Remark</th>
                              <th>Format No</th>
                              <th>Retention Period</th>
                              <th>Alert Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                              </td>
                              <td>
                                <select
                                  className="form-select"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                                >
                                  <option value="">Select Category</option>
                                  <option value="category1">Category 1</option>
                                  <option value="category2">Category 2</option>
                                </select>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="text"
                                    className="form-control"
                                    // value={docName}
                                    // onChange={(e) => setDocName(e.target.value)}
                                  />
                                  <input
                                    type="file"
                                    className="form-control ms-2"
                                    // onChange={(e) => setFile(e.target.files[0])}
                                  />
                                  <button
                                    type="button"
                                    className="btn ms-2"
                                    // onClick={() => setFile(null)}
                                  >
                                    Clear
                                  </button>
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={specNo}
                                  onChange={(e) => setSpecNo(e.target.value)}
                                />
                              </td>
                              <td>
                                <textarea
                                  className="form-control"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <textarea
                                  className="form-control"
                                  value={remark}
                                  onChange={(e) => setRemark(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formatNo}
                                  onChange={(e) => setFormatNo(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={retentionPeriod}
                                  onChange={(e) =>
                                    setRetentionPeriod(e.target.value)
                                  }
                                />
                              </td>
                              <td></td>
                              <td>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={handleSave}
                                >
                                  Save Doc
                                </button>
                                <button
                                  type="button"
                                  className="btn ms-2"
                                  onClick={handleClear}
                                >
                                  Clear
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {showCategoryOverlay && (
                    <div className="cateoverlay">
                      <div className="card">
                        <div className="card-header">
                          <h5>Document Category</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setShowCategoryOverlay(false)}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="container">
                            <div className="row mb-3">
                              <label className="col-form-label col-sm-3">
                                Category Name:
                              </label>
                              <div className="col-sm-6">
                                <input type="text" className="form-control" />
                              </div>
                              <div className="col-sm-3">
                                <button type="button" className="btn">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="container">
                            <div className="row text-start">
                              <table>
                                <thead>
                                  <tr>
                                    <th>No Found Data !!</th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn mt-3"
                            onClick={() => setShowCategoryOverlay(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="DocumentTable mt-5">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="table-primary">
                            <tr>
                              <th scope="col">Sr</th>
                              <th scope="col">Document No.</th>
                              <th scope="col">Rev No.</th>
                              <th scope="col">Date</th>
                              <th scope="col">Category</th>
                              <th scope="col">Spec. No</th>
                              <th scope="col">Description</th>
                              <th scope="col">Remark</th>
                              <th scope="col">Format No</th>
                              <th scope="col">Retention Period</th>
                              <th scope="col">Alert Date</th>
                              <th scope="col">User</th>
                              <th scope="col">Revision</th>
                              <th scope="col">Download</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td></td> <td></td> <td></td> <td></td> <td></td>{" "}
                              <td></td> <td></td> <td></td> <td></td> <td></td>{" "}
                              <td></td> <td></td> <td></td> <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
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

export default DocumentManagement;
