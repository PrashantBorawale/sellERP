import React from "react";

const Invoice = () => {
  return (
    <div className="VendorEinvoice">
      <div className="einvoice">
        <div className="container" autoComplete="off">
          <div className="row text-start">
            <div className="col-md-8">
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail31"
                  className="col-sm-4 col-form-label"
                >
                  SE GST NO:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail32"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail33"
                  className="col-sm-4 col-form-label"
                >
                  GSP APP ID:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail34"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail35"
                  className="col-sm-4 col-form-label"
                >
                  GSP APP Secret:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail36"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-5">
                <label
                  htmlFor="inputEmail37"
                  className="col-sm-4 col-form-label"
                >
                  Access Token:
                </label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail38"
                  className="col-sm-4 col-form-label"
                >
                  Access Token Date::
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail39"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail32"
                  className="col-sm-4 col-form-label"
                >
                  SE API UserName:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail1"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail2"
                  className="col-sm-4 col-form-label"
                >
                  SE API PassWord:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail8"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputEmail7"
                  className="col-sm-4 col-form-label"
                >
                  API Url:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 text-start">
          <button className="date-update">Update Setup</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
