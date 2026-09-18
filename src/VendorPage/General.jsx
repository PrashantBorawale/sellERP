import React, { useState ,useEffect} from "react";
import "./VendorPage.css";
// import axios from "axios";
import { fetchStateData ,fetchStateDetails,fetchCountries } from "../Service/Api";
const General = ({ formData, onFormDataChange, onNextButtonClick }) => {
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);


const handleChange = (e) => {
  const { name, value } = e.target;

  onFormDataChange({ [name]: value });

  setErrors(prev => ({
    ...prev,
    [name]: "",   // 🔥 clear error immediately
  }));

  // field-specific validation
  let error = "";

  if (!value) {
    error = "This field is required";
  }

  if (name === "email" && value) {
    if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format";
    }
  }

  if (name === "contact_no" && value) {
    if (!/^\+?\d{10,15}$/.test(value)) {
      error = "Invalid contact number";
    }
  }

  if (name === "website" && value) {
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
      error = "Invalid website URL";
    }
  }

  if (name === "password" || name === "password2") {
    const password = name === "password" ? value : formData.password;
    const password2 = name === "password2" ? value : formData.password2;

    if (password && password2 && password !== password2) {
      error = "Passwords do not match";
    }
  }

  if (error) {
    setErrors(prev => ({ ...prev, [name]: error }));
  }
};



 const validateForm = () => {
  const newErrors = {};
  const requiredFields = [
    "company_name",
    "short_name",
    "website",
    "email",
    "password",
    "password2",
    "contact_no",
    "footer_message",
    "director_name",
    "address",
    "pin_code",
    "city",
    "country",
    "state",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]?.toString().trim()) {
      newErrors[field] = "This field is required";
    }
  });

  if (
    formData.password &&
    formData.password2 &&
    formData.password !== formData.password2
  ) {
    newErrors.password2 = "Passwords do not match";
  }

  console.log("VALIDATING FORM DATA:", formData);
  console.log("VALIDATION ERRORS:", newErrors);

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleNextButtonClick = (e) => {
    e.preventDefault();
    console.log("Form data before validation:", formData);
    if (validateForm()) {
      console.log("Validation passed");
      onNextButtonClick(); // Trigger tab change
    } else {
      console.log("Validation failed", errors);
    }
  };
  

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };




  useEffect(() => {
    // Fetch state data when the component mounts
    const loadStateData = async () => {
      try {
        const data = await fetchStateData();
        setStates(data);  // Assuming the response is an array of states
      } catch (error) {
        console.error("Error loading state data:", error);
      }
    };

    loadStateData();
  }, []);

  
const handleStateChange = async (e) => {
  const selectedState = e.target.value;

  onFormDataChange({ state: selectedState });
  setErrors(prev => ({ ...prev, state: "" }));

  try {
    const stateData = await fetchStateDetails(selectedState);
    if (stateData) {
      onFormDataChange({
        state_no_numeric: stateData.code,
        city: "",
      });
      setCities(stateData.cities || []);
    }
  } catch (error) {
    console.error(error);
  }
};



const handleCityChange = (e) => {
  const { name, value } = e.target;
  onFormDataChange({ [name]: value });
  setErrors(prev => ({ ...prev, [name]: "" }));
};



  // Country

  useEffect(() => {
    // Fetch country data when the component mounts
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);  // Assuming the response is an array of countries
      } catch (error) {
        console.error("Error loading country data:", error);
      }
    };

    loadCountries();
  }, []);


  return (
    <div className="VendorGeneral">
      <div className="container-fluid text-start" >
        <form onSubmit={handleGeneralSubmit} autoComplete="off">
          <div className="row text-start">
            <div className="col-md-6 text-start">
              <div className="form">
                <div className="row mb-3">
                  <label
                    htmlFor="company_name"
                    className="col-sm-4 col-form-label"
                  >
                    Company Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Sharp Engineers"
                    />
                    {errors.company_name && (
                      <div className="text-danger">{errors.company_name}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="short_name"
                    className="col-sm-4 col-form-label"
                  >
                    Short Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="short_name"
                      name="short_name"
                      value={formData.short_name}
                      onChange={handleChange}
                      placeholder="S E"
                    />
                    {errors.short_name && (
                      <div className="text-danger">{errors.short_name}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="website" className="col-sm-4 col-form-label">
                    username
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="vendererp"
                    />
                    {errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>
                </div>


                <div className="row mb-3">
                  <label htmlFor="website" className="col-sm-4 col-form-label">
                    Website
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/"
                    />
                    {errors.website && (
                      <div className="text-danger">{errors.website}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-4 col-form-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@sharp-engineers.com"
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="password" className="col-sm-4 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="*********"
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="password2" className="col-sm-4 col-form-label">
                    Confirm Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className="form-control"
                      id="password2"
                      name="password2"
                      value={formData.password2}
                      onChange={handleChange}
                      placeholder="*********"
                    />
                    {errors.password2 && (
                      <div className="text-danger">{errors.password2}</div>
                    )}
                  </div>
                </div>

                
                <div className="row mb-3">
                  <label
                    htmlFor="contact_no"
                    className="col-sm-4 col-form-label"
                  >
                    Contact Number
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="contact_no"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                    />
                    {errors.contact_no && (
                      <div className="text-danger">{errors.contact_no}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                <label htmlFor="pin_code" className="col-sm-4 col-form-label">
                  Pin Code
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="pin_code"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleChange}
                    placeholder="110001"
                  />
                  {errors.pin_code && (
                    <div className="text-danger">{errors.pin_code}</div>
                  )}
                </div>
              </div>
             
            
               
              </div>
            </div>
            <div className="col-md-6">
              
            
              
              <div className="row mb-3">
                <label
                  htmlFor="country"
                  className="col-sm-4 col-form-label"
                >
                  Country
                </label>
                <div className="col-sm-8">
                  <select
                      className="form-control"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Select Country"
                    >
                      <option value="" disabled>Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  {errors.country && (
                    <div className="text-danger">{errors.country}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="state" className="col-sm-4 col-form-label">
                  State
                </label>
                <div className="col-sm-8">
                  
                   <select
                      className="form-control"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      placeholder="Select State"
                    >
                      <option value="" disabled>Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>

                  {errors.state && (
                    <div className="text-danger">{errors.state}</div>
                  )}
                </div>
              </div>
              
           
              <div className="row mb-3">
                <label
                  htmlFor="state_no_numeric"
                  className="col-sm-4 col-form-label"
                >
                  State code
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                      className="form-control"
                      id="state_no_numeric"
                      name="state_no_numeric"
                      value={formData.state_no_numeric}
                      onChange={handleChange}
                      placeholder="State Code"
                      readOnly
                  />
                  {errors.state_no_numeric && (
                    <div className="text-danger">{errors.state_no_numeric}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="city" className="col-sm-4 col-form-label">
                  City
                </label>
                <div className="col-sm-8">
                <select
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleCityChange}
                      placeholder="Select City"
                    >
                      <option value="" disabled>Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="address" className="col-sm-4 col-form-label">
                  Address
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="1234 Main St"
                  />
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
              </div>
                <div className="row mb-3">
                  <label
                    htmlFor="director_name"
                    className="col-sm-4 col-form-label"
                  >
                    Director Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="director_name"
                      name="director_name"
                      value={formData.director_name}
                      onChange={handleChange}
                      placeholder="Mr. John Doe"
                    />
                    {errors.director_name && (
                      <div className="text-danger">{errors.director_name}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="footer_message"
                    className="col-sm-4 col-form-label"
                  >
                    Footer Message
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      id="footer_message"
                      name="footer_message"
                      value={formData.footer_message}
                      onChange={handleChange}
                      placeholder="Welcome to Sharp Engineers"
                    >
                      {" "}
                    </textarea>
                    {errors.footer_message && (
                      <div className="text-danger">{errors.footer_message}</div>
                    )}
                  </div>
                </div>
            
              <div className="row mb-3">
                <div className="col-md-12 text-end">
                  <button
                    className="gernal-update"
                    type="button"
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default General;
