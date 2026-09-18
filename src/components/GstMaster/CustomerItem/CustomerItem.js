import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import { uploadFile } from "../../../Service/Api.jsx"; // Adjust path as necessary
import "./CustomerItem.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CustomerItem = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Access the first selected file
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before submitting.");
      return;
    }

    try {
      const data = await uploadFile(selectedFile);
      console.log("File uploaded successfully:", data);
      setUploadResult(`File uploaded successfully! File ID: ${data.id}`); // Update result
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploadResult("Error during file upload: " + error.message); // Update result
      toast.error("Error during file upload: " + error.message);
    }
  };

  return (
    <div className="GstCustomer">
      <ToastContainer/>
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
                <div className="cusgst">
               
                  <div className="cusgstheader-header mb-4 text-start mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Customer-Item Wise -GST Rate Excel Upload</h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <button className="btn">
                        Download Excel Template
                      </button>
                    </div>
                    </div>
                  </div>
                  <div className="cusgstmain mt-5">
                    <div className="container-fluid">
                      <div className="row mb-3 text-start">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-1 col-form-label"
                        >
                          Excel Name:
                        </label>
                        <div className="col-sm-4">
                          <div className="input-group mb-3">
                            <input
                              type="file"
                              className="form-control"
                              id="inputGroupFile01"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <button
                            className="cusmainbtn"
                            onClick={handleFileUpload}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      {/* <div className="row text-start">
                        <div className="col-sm-2">
                          <button className="cusmainniche">Upload</button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="row text-start" style={{ marginTop: "5px" }}>
                    <div className="col-md-12">
                      <h5 style={{ color: "blue" }}>
                        Customer Gst Rate Upload Result:
                      </h5>
                      <p>{uploadResult}</p> {/* Display upload result */}
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

export default CustomerItem;
