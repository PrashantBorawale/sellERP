import React, { useState } from "react";
import PropTypes from "prop-types";

const Data2 = ({ formData = {}, handleChange, handleNextButtonClick1 }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // List of required fields
    const requiredFields = [
      "email",
      "company_name",
      "short_name",
     
      "password",

      "password2",

      "city",
      "country",
      "address",
      "website",
      "contact_no",
      "footer_message",
      "director_name",
      "pin_code",
      "state",
     
      "state_no_numeric",
      
      "VAT_TIN",
      "CST_TIN",
      "C_Excise_Range",
      "Commissionerate",
      "C_Excise_Reg_No",
      "PLA_No",
      "Service_Tax_No",
      "Import_Export_Code",
      "ARN_No",
      "Export_House_No",
      "Udyog_Aadhar_No",
      "Vat_Tin_Date",
      "Cst_Tin_Date",
      "Subject_To",
      "Division",
      "GST_No",
      "ECC_No",
      "PAN_No",
      "CIN_NO",
     
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log("Form data before validation:", formData);
    if (validateForm()) {
      console.log("Validation passed, proceeding to next step");
      handleNextButtonClick1(); // Call parent function to move to the next tab
    } else {
      console.log("Validation failed:", errors);
    }
  };
  

  return (
    <div className="Vendordata2">
      <form autoComplete="off">
        <div className="date-2">
          <div className="container-fluid">
            <div className="row text-start">
              <div className="col-md-6">
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">VAT TIN:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="VAT_TIN"
                      value={formData.VAT_TIN || ""}
                      onChange={handleChange}
                    />
                    {errors.VAT_TIN && (
                      <div className="text-danger">{errors.VAT_TIN}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">CST TIN:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="CST_TIN"
                      value={formData.CST_TIN || ""}
                      onChange={handleChange}
                    />
                    {errors.CST_TIN && (
                      <div className="text-danger">{errors.CST_TIN}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label className="col-sm-4 col-form-label">
                    C. Excise Range:
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      name="C_Excise_Range"
                      rows="3"
                      value={formData.C_Excise_Range || ""}
                      onChange={handleChange}
                    ></textarea>
                    {errors.C_Excise_Range && (
                      <div className="text-danger">{errors.C_Excise_Range}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Commissionerate:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Commissionerate"
                      value={formData.Commissionerate || ""}
                      onChange={handleChange}
                    />
                    {errors.Commissionerate && (
                      <div className="text-danger">
                        {errors.Commissionerate}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    C. Excise Reg No:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="C_Excise_Reg_No"
                      value={formData.C_Excise_Reg_No || ""}
                      onChange={handleChange}
                    />
                    {errors.C_Excise_Reg_No && (
                      <div className="text-danger">
                        {errors.C_Excise_Reg_No}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">P.L.A No.:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="PLA_No"
                      value={formData.PLA_No || ""}
                      onChange={handleChange}
                    />
                    {errors.PLA_No && (
                      <div className="text-danger">{errors.PLA_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Service Tax No:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Service_Tax_No"
                      value={formData.Service_Tax_No || ""}
                      onChange={handleChange}
                    />
                    {errors.Service_Tax_No && (
                      <div className="text-danger">{errors.Service_Tax_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Import/Export Code:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Import_Export_Code"
                      value={formData.Import_Export_Code || ""}
                      onChange={handleChange}
                    />
                    {errors.Import_Export_Code && (
                      <div className="text-danger">
                        {errors.Import_Export_Code}
                      </div>
                    )}
                  </div>
                </div>
             
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Export House No:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Export_House_No"
                      value={formData.Export_House_No || ""}
                      onChange={handleChange}
                    />
                    {errors.Export_House_No && (
                      <div className="text-danger">
                        {errors.Export_House_No}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Udyog Aadhar No/MSME No:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Udyog_Aadhar_No"
                      value={formData.Udyog_Aadhar_No || ""}
                      onChange={handleChange}
                    />
                    {errors.Udyog_Aadhar_No && (
                      <div className="text-danger">
                        {errors.Udyog_Aadhar_No}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    VAT TIN Date:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control"
                      name="Vat_Tin_Date"
                      value={formData.Vat_Tin_Date || ""}
                      onChange={handleChange}
                    />
                    {errors.Vat_Tin_Date && (
                      <div className="text-danger">{errors.Vat_Tin_Date}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    CST Tin Date:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control"
                      name="Cst_Tin_Date"
                      value={formData.Cst_Tin_Date || ""}
                      onChange={handleChange}
                    />
                    {errors.Cst_Tin_Date && (
                      <div className="text-danger">{errors.Cst_Tin_Date}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">Subject To:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Subject_To"
                      value={formData.Subject_To || ""}
                      onChange={handleChange}
                    />
                    {errors.Subject_To && (
                      <div className="text-danger">{errors.Subject_To}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">Division:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="Division"
                      value={formData.Division || ""}
                      onChange={handleChange}
                    />
                    {errors.Division && (
                      <div className="text-danger">{errors.Division}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">GST No:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="GST_No"
                      value={formData.GST_No || ""}
                      onChange={handleChange}
                    />
                    {errors.GST_No && (
                      <div className="text-danger">{errors.GST_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">ECC No:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="ECC_No"
                      value={formData.ECC_No}
                      onChange={handleChange}
                    />
                    {errors.ECC_No && (
                      <div className="text-danger">{errors.ECC_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">PAN No:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="PAN_No"
                      value={formData.PAN_No}
                      onChange={handleChange}
                    />
                    {errors.PAN_No && (
                      <div className="text-danger">{errors.PAN_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">CIN No:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="CIN_NO"
                      value={formData.CIN_NO}
                      onChange={handleChange}
                    />
                    {errors.CIN_NO && (
                      <div className="text-danger">{errors.CIN_NO}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">
                    Import/Export Date:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control"
                      name="Import_Export_Date"
                      value={formData.Import_Export_Date || ""}
                      onChange={handleChange}
                    />
                    {errors.Import_Export_Date && (
                      <div className="text-danger">
                        {errors.Import_Export_Date}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">ARN Date:</label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control"
                      name="ARN_Date"
                      value={formData.ARN_Date || ""}
                      onChange={handleChange}
                    />
                    {errors.ARN_Date && (
                      <div className="text-danger">{errors.ARN_Date}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">ARN No:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="ARN_No"
                      value={formData.ARN_No || ""}
                      onChange={handleChange}
                    />
                    {errors.ARN_No && (
                      <div className="text-danger">{errors.ARN_No}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-end">
            <button type="button" className="date-update" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Data2.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleNextButtonClick1: PropTypes.func.isRequired,
};

export default Data2;
