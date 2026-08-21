import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ItemAssetMaster.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemAssetMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    label: "",
    column: ""
  });

  const openModal = (type) => {
    if (type === "assetCategory") {
      setModalConfig({
        title: "Add New Asset Category",
        label: "Asset Category Name",
        column: "Category Name"
      });
    } else if (type === "timeUnit") {
      setModalConfig({
        title: "Add New Time Unit",
        label: "Time Unit",
        column: "Time Unit"
      });
    } else if (type === "operationUnit") {
      setModalConfig({
        title: "Add New Operation Unit",
        label: "Operation Unit",
        column: "Operation Unit"
      });
    }
    setShowModal(true);
  };

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

  return (
    <div className="itemassetmaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          Item Asset Master
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <Link to="/asset-list" className="btn ">
                          Item Asset List
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="header-section">
                    {/* Row 1 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Plant :</label></div>
                      <div className="col-md-3"><select className="form-select"><option>Sharp</option></select></div>
                      <div className="col-md-2 text-end"></div>
                      <div className="col-md-3"></div>
                    </div>

                    {/* Row 2 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Machine Name :</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Supplier Name:</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                    </div>

                    {/* Row 3 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Department:</label></div>
                      <div className="col-md-3"><select className="form-select"><option>selected</option></select></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Purchase Date:</label></div>
                      <div className="col-md-3"><input type="date" className="form-control" /></div>
                    </div>

                    {/* Row 4 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Purchase Value :</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Fixed Asset Category:</label></div>
                      <div className="col-md-4">
                        <div className="d-flex">
                          <select className="form-select"><option></option></select>
                          <button className="btn ms-1" type="button" onClick={() => openModal("assetCategory")}>New</button>
                        </div>
                      </div>
                    </div>

                    {/* Row 5 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Bill No.:</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Bill Date:</label></div>
                      <div className="col-md-3"><input type="date" className="form-control" /></div>
                    </div>

                    {/* Row 6 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Total Life (Time):</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Time Unit:</label></div>
                      <div className="col-md-4">
                        <div className="d-flex">
                          <select className="form-select"><option></option></select>
                          <button className="btn ms-1" type="button" onClick={() => openModal("timeUnit")}>New</button>
                        </div>
                      </div>
                    </div>

                    {/* Row 7 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Total Life (OPeration):</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Operation Unit:</label></div>
                      <div className="col-md-4">
                        <div className="d-flex">
                          <select className="form-select"><option></option></select>
                          <button className="btn ms-1" type="button" onClick={() => openModal("operationUnit")}>New</button>
                        </div>
                      </div>
                    </div>

                    {/* Row 8 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">From :</label></div>
                      <div className="col-md-3"><input type="date" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">To :</label></div>
                      <div className="col-md-3"><input type="date" className="form-control" /></div>
                    </div>

                    {/* Row 9 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Powe Consumption/Hr:</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Remark :</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                    </div>

                    {/* Row 10 */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2 text-end"><label className="form-label mb-0">Asset Code:</label></div>
                      <div className="col-md-3"><input type="text" className="form-control" /></div>
                      <div className="col-md-2 text-end"></div>
                      <div className="col-md-3"></div>
                    </div>

                    {/* Row 11 (Footer) */}
                    <div className="row mt-4 mb-2 align-items-center">
                      <div className="col-md-2"></div>
                      <div className="col-md-3 text-start">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaCheck /> Save Asset
                        </button>
                      </div>
                      <div className="col-md-2 text-end"></div>
                      <div className="col-md-3"></div>
                    </div>

                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Master Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalConfig.title}</h5>
                <button type="button" className="close-btn-custom" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="row mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">{modalConfig.label}</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-2">
                    <button className="btn w-100">SAVE</button>
                  </div>
                </div>

                <div className="table-responsive" style={{ maxHeight: "300px" }}>
                  <table className="table table-bordered table-hover user-list-table">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>{modalConfig.column}</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-muted">No Data Found !!!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemAssetMaster;
