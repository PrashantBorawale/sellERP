import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";
import { postRequest } from "../Service/Api.jsx"; // Importing the API service

function Home() {
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { email_id, password };

    try {
      const response = await postRequest("/Erp_admin/api/auth/login/", data); // Using the postRequest function

      if (response.error) {
        console.error("Admin Login error:", response.error);
        throw new Error("Admin Login failed");
      }

      console.log("Admin Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Admin Login error:", error);
    }
  };

  return (
    <div className="home-login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="home-form">
              <form onSubmit={handleSubmit}>
                <h6>Produlink</h6>
                <p>
                  Enter your email address and <br /> password to access the
                  admin panel.
                </p>
                <div className="form1">
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email
                    </label>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      className="form-control"
                      id="emailInput"
                      value={email_id}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <input
                      placeholder="Enter your password"
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button type="submit" className="homebtn w-100">
                    Log In
                  </button>
                </div>
              </form>
              <div className="outer text-center">
                <p>Powered by Clumpcoder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
