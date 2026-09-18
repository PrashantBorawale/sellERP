import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./Rfo.css";
import { Link } from "react-router-dom";

const RFONew = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    rfq_type: '',
    rfq_no: '',
    to_date: '',
    item: '',
    item_no: '',
    indent_no: '',
    quantity: '',
    unit: '',
    expected_date: '',
    delivery_location: '',
    payment_term: '',
    quality_terms: '',
    delivery_schedule: '',
    remark_details: '',
    project_name: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Unit choices from Django model
  const unitChoices = [
    { value: 'PCS', label: 'PCS' },
    { value: 'KGS', label: 'KGS' },
    { value: 'Box', label: 'Box' },
    { value: 'LTR', label: 'LTR' },
    { value: 'NOS', label: 'NOS' },
    { value: 'SQFT', label: 'SQFT' },
    { value: 'MTR', label: 'MTR' },
    { value: 'FOOT', label: 'FOOT' },
    { value: 'SQMTR', label: 'SQMTR' },
    { value: 'PAIR', label: 'PAIR' },
    { value: 'BAG', label: 'BAG' },
    { value: 'PACKET', label: 'PACKET' },
    { value: 'RIM', label: 'RIM' },
    { value: 'SET', label: 'SET' },
    { value: 'MT', label: 'MT' },
    { value: 'PER DAY', label: 'PER DAY' },
    { value: 'DOZEN', label: 'DOZEN' },
    { value: 'JOB', label: 'JOB' },
    { value: 'SQUINCH', label: 'SQUINCH' }
  ];

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.rfq_type) newErrors.rfq_type = 'RFQ Type is required';
    if (!formData.to_date) newErrors.to_date = 'To date is required';
    if (!formData.item) newErrors.item = 'Item type is required';
    if (!formData.item_no) newErrors.item_no = 'Item number is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (!formData.delivery_location) newErrors.delivery_location = 'Delivery location is required';
    if (!formData.payment_term) newErrors.payment_term = 'Payment term is required';
    if (!formData.quality_terms) newErrors.quality_terms = 'Quality terms are required';
    if (!formData.delivery_schedule) newErrors.delivery_schedule = 'Delivery schedule is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://sellerp-backend.onrender.com/Purchase/RFQ/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add CSRF token if needed
          // 'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        alert('RFQ created successfully!');
        // Reset form or redirect
        setFormData({
          rfq_type: '',
          rfq_no: '',
          to_date: '',
          item: '',
          item_no: '',
          indent_no: '',
          quantity: '',
          unit: '',
          expected_date: '',
          delivery_location: '',
          payment_term: '',
          quality_terms: '',
          delivery_schedule: '',
          remark_details: '',
          project_name: ''
        });
      } else {
        const errorData = await response.json();
        setErrors(errorData);
        alert('Error creating RFQ. Please check the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RFOMaster">
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
                <div className="RFO-header text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">
                        Request For Quotation (RFO)
                      </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <Link to={"/Rfo"} className="vndrbtn">RFO List</Link>
                    </div>
                  </div>
                </div>

                <div className="RFO-main mt-3">
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit} className="mb-3 text-start">

                      {/* RFQ Type */}
                      <div className="row mt-3">
                        <div className="col-md-2">
                          <div className="d-flex align-items-center">
                            <input
                              type="radio"
                              id="single"
                              name="rfq_type"
                              value="single"
                              checked={formData.rfq_type === 'single'}
                              onChange={handleInputChange}
                              className="me-2"
                            />
                            <label htmlFor="single" className="form-label mb-0">For Single:</label>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="d-flex align-items-center">
                            <input
                              type="radio"
                              id="enquiry"
                              name="rfq_type"
                              value="enquiry"
                              checked={formData.rfq_type === 'enquiry'}
                              onChange={handleInputChange}
                              className="me-2"
                            />
                            <label htmlFor="enquiry" className="form-label mb-0">Against Enquiry:</label>
                          </div>
                        </div>
                        {errors.rfq_type && <div className="col-12 text-danger">{errors.rfq_type}</div>}
                      </div>

                      {/* RFQ Number and To Date */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="rfq_no" className="form-label">RFQ No:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="rfq_no"
                            value={formData.rfq_no}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="to_date" className="form-label">To:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="date"
                            name="to_date"
                            value={formData.to_date}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                          {errors.to_date && <div className="text-danger">{errors.to_date}</div>}
                        </div>
                      </div>

                      {/* Item Type and Item Number */}
                      <div className="row mt-2">
                        <div className="col-md-2 d-flex align-items-center gap-2">
                          <label htmlFor="item" className="form-label">Item:</label>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="item"
                              id="itemNew"
                              value="new"
                              checked={formData.item === 'new'}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="itemNew">New</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="item"
                              id="itemExisting"
                              value="existing"
                              checked={formData.item === 'existing'}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="itemExisting">Existing</label>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <input
                            type="text"
                            name="item_no"
                            value={formData.item_no}
                            onChange={handleInputChange}
                            placeholder="Item No"
                            className="form-control"
                          />
                          {errors.item_no && <div className="text-danger">{errors.item_no}</div>}
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="indent_no" className="form-label">Indent No:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="indent_no"
                            value={formData.indent_no}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/* Quantity, Unit, Expected Date */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="quantity" className="form-label">Qty:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            step="0.01"
                            className="form-control"
                          />
                          {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="unit" className="form-label">Unit:</label>
                        </div>
                        <div className="col-md-2">
                          <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="">Select</option>
                            {unitChoices.map(unit => (
                              <option key={unit.value} value={unit.value}>
                                {unit.label}
                              </option>
                            ))}
                          </select>
                          {errors.unit && <div className="text-danger">{errors.unit}</div>}
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="expected_date" className="form-label">Expected Date:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="date"
                            name="expected_date"
                            value={formData.expected_date}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/* Delivery Location */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="delivery_location" className="form-label">Delivery Location:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="delivery_location"
                            value={formData.delivery_location}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                          {errors.delivery_location && <div className="text-danger">{errors.delivery_location}</div>}
                        </div>
                      </div>

                      {/* Payment Terms and Quality Terms */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="payment_term" className="form-label">Our Payment Term:</label>
                        </div>
                        <div className="col-md-2">
                          <textarea
                            name="payment_term"
                            value={formData.payment_term}
                            onChange={handleInputChange}
                            className="form-control"
                          ></textarea>
                          {errors.payment_term && <div className="text-danger">{errors.payment_term}</div>}
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="quality_terms" className="form-label">Quality Guarantee/ Warranty Terms:</label>
                        </div>
                        <div className="col-md-2">
                          <textarea
                            name="quality_terms"
                            value={formData.quality_terms}
                            onChange={handleInputChange}
                            className="form-control"
                          ></textarea>
                          {errors.quality_terms && <div className="text-danger">{errors.quality_terms}</div>}
                        </div>
                      </div>

                      {/* Delivery Schedule and Remarks */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="delivery_schedule" className="form-label">Delivery Schedule:</label>
                        </div>
                        <div className="col-md-2">
                          <textarea
                            name="delivery_schedule"
                            value={formData.delivery_schedule}
                            onChange={handleInputChange}
                            className="form-control"
                          ></textarea>
                          {errors.delivery_schedule && <div className="text-danger">{errors.delivery_schedule}</div>}
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="remark_details" className="form-label">Remark Details:</label>
                        </div>
                        <div className="col-md-2">
                          <textarea
                            name="remark_details"
                            value={formData.remark_details}
                            onChange={handleInputChange}
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      {/* Project Name */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="project_name" className="form-label">Project Name:</label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="row mt-3">
                        <div className="col-md-5" style={{ width: "200px" }}>
                          <button
                            type="submit"
                            className="vndrbtn"
                            style={{ width: "150px" }}
                            disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>

                    </form>
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

export default RFONew;