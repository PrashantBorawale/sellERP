import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./ItermCrossReference.css";
import { postItemCrossReference ,searchCrossRefSupplier ,searchItemCrossItem } from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCrossReference = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    ItemName: "",
    Cust_Supp_Name: "",
    Cross_Ref_Item_No: "",
    Cross_Ref_Item_Desc: "",
    Remark: "",
    Model: "",
    ModelNo: "",
    DrawingNo: "",
    RevNo: "",
    Min_Order_Qty: "",
    Packing_Qty: "",
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    // Check only the required fields
    if (!formData.ItemName) tempErrors.ItemName = "This field is required.";
    if (!formData.Cust_Supp_Name) tempErrors.Cust_Supp_Name = "This field is required.";
    if (!formData.Cross_Ref_Item_No) tempErrors.Cross_Ref_Item_No = "This field is required.";
    if (!formData.Cross_Ref_Item_Desc) tempErrors.Cross_Ref_Item_Desc = "This field is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSearchCustSuppName = async () => {
    if (formData.Cust_Supp_Name) {
      try {
        const response = await searchCrossRefSupplier(formData.Cust_Supp_Name);
        const supplier = response.data.find(supplier => supplier.Name === formData.Cust_Supp_Name);
        if (supplier) {
          setFormData({
            ...formData,
            Cross_Ref_Item_No: supplier.Code_No || ""
          });
        } else {
          toast.error("Supplier not found.");
        }
      } catch (error) {
        toast.error("Error fetching supplier data.");
      }
    }
  };

  const handleSearchSEItem = async () => {
    if (formData.ItemName) {
      try {
        const response = await searchItemCrossItem(formData.ItemName);
        const item = response.data.find(item => item.SE_Item === formData.ItemName);
        if (item) {
          setFormData({
            ...formData,
            Cross_Ref_Item_Desc: item.Name_Description || ""
          });
        } else {
          toast.error("Item not found.");
        }
      } catch (error) {
        toast.error("Error fetching item data.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await postItemCrossReference(formData);
        toast.success("Data saved successfully!");
      } catch (error) {
        toast.error(`Error saving data: ${error.message}`);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleClear = () => {
    setFormData({
      ItemName: "",
      Cust_Supp_Name: "",
      Cross_Ref_Item_No: "",
      Cross_Ref_Item_Desc: "",
      Remark: "",
      Model: "",
      ModelNo: "",
      DrawingNo: "",
      RevNo: "",
      Min_Order_Qty: "",
      Packing_Qty: "",
    });

    setErrors({});
  };

  return (
    <div className="erp-page Crossreference">
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
                <div className="Crossrefer overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Item Cross Reference</h5>
                      <div className="d-flex gap-2">
                        <button className="vndrbtn">Export To Excel</button>
                      </div>
                    </div>
                  </div>
            
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-4 text-start">
                            <label className="form-label mb-1">SE_Item:</label>
                            <div className="d-flex gap-1">
                              <input
                                type="text"
                                className="form-control"
                                name="ItemName"
                                placeholder="Please Enter Item Name"
                                value={formData.ItemName}
                                onChange={handleChange}
                              />
                              <button className="vndrbtn" type="button" onClick={handleSearchSEItem}>
                                Search
                              </button>
                            </div>
                            {errors.ItemName && <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>{errors.ItemName}</div>}
                          </div>

                          <div className="col-md-4 text-start">
                            <label className="form-label mb-1">Cust / Supp Name:</label>
                            <div className="d-flex gap-1">
                              <input
                                type="text"
                                className="form-control"
                                name="Cust_Supp_Name"
                                placeholder="Please Enter Cust Name"
                                value={formData.Cust_Supp_Name}
                                onChange={handleChange}
                              />
                              <button className="vndrbtn" type="button" onClick={handleSearchCustSuppName}>
                                Search
                              </button>
                            </div>
                            {errors.Cust_Supp_Name && <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>{errors.Cust_Supp_Name}</div>}
                          </div>

                          <div className="col-md-4 text-start">
                            <label className="form-label mb-1">Cross Ref-Item No: <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              name="Cross_Ref_Item_No"
                              value={formData.Cross_Ref_Item_No}
                              onChange={handleChange}
                            />
                            {errors.Cross_Ref_Item_No && <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>{errors.Cross_Ref_Item_No}</div>}
                          </div>

                          <div className="col-md-4 text-start">
                            <label className="form-label mb-1">Name Desc:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Cross_Ref_Item_Desc"
                              value={formData.Cross_Ref_Item_Desc}
                              onChange={handleChange}
                            />
                            {errors.Cross_Ref_Item_Desc && <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>{errors.Cross_Ref_Item_Desc}</div>}
                          </div>

                          <div className="col-md-8 text-start">
                            <label className="form-label mb-1">Remark:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Remark"
                              placeholder="Remark"
                              value={formData.Remark}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Model:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Model"
                              placeholder="Model"
                              value={formData.Model}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Model No:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ModelNo"
                              placeholder="Model No"
                              value={formData.ModelNo}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Drawing No:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="DrawingNo"
                              placeholder="Drawing No"
                              value={formData.DrawingNo}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Rev No:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="RevNo"
                              placeholder="Rev No"
                              value={formData.RevNo}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Min Order Qty:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Min_Order_Qty"
                              value={formData.Min_Order_Qty}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-3 text-start">
                            <label className="form-label mb-1">Packing Qty:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Packing_Qty"
                              value={formData.Packing_Qty}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-12 text-end d-flex gap-2 justify-content-end">
                            <button className="vndrbtn" type="submit">
                              Save
                            </button>
                            <button
                              className="vndrbtn erp-btn-outline"
                              type="button"
                              onClick={handleClear}
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-3 align-items-center">
                    <div className="col-md-6 text-start">
                      <span className="record-count text-primary fw-bold" style={{ fontSize: "0.9rem" }}>Total : 00</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ItemCrossReference;
