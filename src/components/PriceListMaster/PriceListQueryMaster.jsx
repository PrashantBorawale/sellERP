import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PriceListMaster.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const PriceListQueryMaster = () => {
   const navigate = useNavigate();
      
        const handleClose = () => {
          navigate("/price-list-master");
        };

  return (
    <div className="container mt-4">
      <div className="top-but3-header mb-4 text-start">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h5 className="header-title">Price List Query</h5>
          </div>
          <div className="col-md-8 text-end">
            <div className="d-flex align-items-center justify-content-end">
              <Link className="vndrbtn me-2" to={"/PriceListQuery"}>
                Query Master
              </Link>
              <button
                            className="vndrbtn  me-2"
                            aria-label="Close"
                            onClick={handleClose} >
                X </button>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-tabs-container">
        <div className="tab-content">
          <div className="tab-panel">
            <div className="mb-3">
              {/* Eff Date */}
              <div className="row">
                <div className="col-md-2">
                  <label className="form-label">Eff Date:</label>
                </div>
                <div className="col-md-2">
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>To :</label>
                </div>
                <div className="col-md-2">
                  <input type="date" className="form-control" />
                </div>
              </div>

              {/* Type */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Type:</label>
                </div>
                <div className="col-md-2">
                  <select className="form-select">
                    <option value="">All</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>

              {/* Cust/Supp */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Cust/Supp:</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>To :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" placeholder="Name" className="form-control" />
                </div>
              </div>

              {/* Add Code */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Add Code:</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>To :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
              </div>

              {/* Price List Code */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Price List Code :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>To :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
              </div>

              {/* Item Name */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Item Name :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>To :</label>
                </div>
                <div className="col-md-2">
                  <input type="text" placeholder="Item Code" className="form-control" />
                </div>
              </div>

              {/* Query Name */}
              <div className="row mt-2">
                <div className="col-md-2">
                  <label className="form-label">Query Name:</label>
                </div>
                <div className="col-md-2">
                  <input type="text" className="form-control" />
                </div>
              </div>

              {/* Execute Button */}
              <div className="row mt-3">
                <div className="col-md-5">
                  <button className="vndrbtn btn-primary">Execute 🌿 Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceListQueryMaster;