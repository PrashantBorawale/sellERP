import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Login.css";
import { loginUser, getFinancialYears, getDefaultRoute } from "../Service/Erpsetting.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [year, setYear] = useState(""); // Selected year
  const [financialYears, setFinancialYears] = useState([]); // List of financial years
  const navigate = useNavigate();


  // Fetch financial years on component mount
  useEffect(() => {
    const fetchFinancialYears = async () => {
      try {
        const data = await getFinancialYears();
        setFinancialYears(data); // Populate the dropdown
      } catch (error) {
        console.error("Error fetching financial years:", error);
      }
    };

    fetchFinancialYears();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the loginUser function with username, password, and selected year
      const data = await loginUser(username, password, year);

      if (data.message === "Login successful") {
        // Store the full year and Shortyear in localStorage
        localStorage.setItem("accessToken", data.access);
        console.log(data)
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("username", data.username);
        localStorage.setItem("year", data.year);
        localStorage.setItem("Shortyear", data.Shortyear);
        localStorage.setItem("permissions", JSON.stringify(data.permissions));

        // Redirect to dashboard for admin or default tab route for restricted users
        const targetRoute = getDefaultRoute(data.permissions, data.username);
        navigate(targetRoute);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="home-login">
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="home-form">
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  <img src="/Logo.png" alt="Logo" style={{ maxHeight: '100px', width: 'auto' }} />
                </div>
                <p>
                  Enter your Username and <br /> Password to access the
                  admin panel.
                </p>
                <div className="form1">
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">
                      Year
                    </label>
                    <select
                      className="form-control"
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      {financialYears.map((fy) => (
                        <option key={fy.id} value={fy.ShortName}>
                          {fy.ShortName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button type="submit" className="homebtn w-100" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
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
  )
}

export default Login
