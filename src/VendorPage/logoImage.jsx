import React, { useState } from "react";
import PropTypes from "prop-types";

const LogoImage = ({ formData, onFormDataChange, onSubmit, isSubmitting }) => {
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      // Validate file size (25 KB limit)
      if (file.size > 25 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "File size must be less than 25 KB",
        }));
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "Only JPG, JPEG, PNG, and GIF files are allowed",
        }));
        return;
      }

      // Update formData with the selected file
      onFormDataChange({
        // ...formData,
        [id]: file,
      });

      // Set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [id]: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    const newErrors = {};
    ["login_logo", "home_logo", "company_logo", "Tuv_logo"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="VendorLogoImages">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="logo-image">
          <div className="container">
            <div className="row text-start">
              <div className="col-md-12">
                <div className="row mb-5">
                  <label htmlFor="login_logo" className="col-sm-4 col-form-label">
                    ERP Login Page:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      className="form-control"
                      id="login_logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      disabled={isSubmitting}
                    />
                    {errors.login_logo && (
                      <div className="text-danger">{errors.login_logo}</div>
                    )}
                    {imagePreviews.login_logo && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.login_logo}
                          alt="ERP Login Page"
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label htmlFor="home_logo" className="col-sm-4 col-form-label">
                    ERP Home Page Header:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      className="form-control"
                      id="home_logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      disabled={isSubmitting}
                    />
                    {errors.home_logo && (
                      <div className="text-danger">{errors.home_logo}</div>
                    )}
                    {imagePreviews.home_logo && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.home_logo}
                          alt="ERP Home Page Header"
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label htmlFor="company_logo" className="col-sm-4 col-form-label">
                    Company Logo Print on document:
                    <br />
                    (e.g., Gast Invoice/Purchase Order etc.)
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      className="form-control"
                      id="company_logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      disabled={isSubmitting}
                    />
                    {errors.company_logo && (
                      <div className="text-danger">{errors.company_logo}</div>
                    )}
                    {imagePreviews.company_logo && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.company_logo}
                          alt="Company Logo"
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Tuv_logo" className="col-sm-4 col-form-label">
                    TUV Logo Print on Document:
                    <br />
                    (e.g., Gast Invoice/Purchase Order etc.)
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      className="form-control"
                      id="Tuv_logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      disabled={isSubmitting}
                    />
                    {errors.Tuv_logo && (
                      <div className="text-danger">{errors.Tuv_logo}</div>
                    )}
                    {imagePreviews.Tuv_logo && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.Tuv_logo}
                          alt="TUV Logo"
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-end">
            <button 
              type="submit" 
              className="date-update"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

LogoImage.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormDataChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

LogoImage.defaultProps = {
  isSubmitting: false,
};

export default LogoImage;