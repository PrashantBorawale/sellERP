"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./MaterialIssueChallan.css";
import {
  postNewMaterialIssue,
  searchEmployeeDept,
} from "../../Service/StoreApi.jsx";
import { fetchUnitMachines } from "../../Service/Production.jsx";

import { toast, ToastContainer } from "react-toastify";

const MaterialIssueChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemsList, setShowItemList] = useState(false);
  // const [selectedItem, setSelectedItem] = useState();

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  function filterItems(items, searchString) {
    const keywords = searchString
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    if (keywords.length === 0) {
      setShowItemList(false);
      return items;
    }

    const filtered = items.filter((item) => {
      const partNo = (item.part_no || item.item_code || "").toLowerCase();
      const desc = (item.Name_Description || item.description || "").toLowerCase();
      return keywords.some((kw) => partNo.includes(kw) || desc.includes(kw));
    });

    setShowItemList(filtered.length > 0);

    return filtered;
  }

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      /* 
      // Old API
      const res = await fetch(
        "https://sellerp-backend.onrender.com/All_Masters/api/item/summary/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      setItems(resData);
      */

      // New API
      const res = await fetch(
        "https://sellerp-backend.onrender.com/Store/jobworkinward/rm/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      
      const newItems = Array.isArray(resData) ? resData : (resData.data || []);
      setItems(newItems);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [series, setSeries] = useState("");
  const [challanNo, setChallanNo] = useState("");



  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
    setSeries(selectedSeries);
    setFormData({ ...formData, Series: selectedSeries });

    if (selectedSeries === "Material Issue") {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          "https://sellerp-backend.onrender.com/Store/generate-challan/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const newChallanNo = data.challan_no;

        // Update challanNo state
        setChallanNo(newChallanNo);

        // Update formData with the new challan number
        setFormData((prev) => ({
          ...prev,
          ChallanNo: newChallanNo
        }));

        console.log("Challan Number Generated:", newChallanNo);
        toast.success(`Challan No. ${newChallanNo} generated successfully!`);
      } catch (error) {
        console.error("Error fetching challan number:", error);
        toast.error("Failed to generate challan number");
        setChallanNo("");
        setFormData((prev) => ({ ...prev, ChallanNo: "" }));
      }
    } else {
      setChallanNo("");
      setFormData((prev) => ({ ...prev, ChallanNo: "" }));
    }
  };

  const [plant, setPlant] = useState("");
  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    MaterialChallanTable: [],
    Plant: "",
    ChallanNo: "",
    Series: "",
    Type: "",
    Item: "",
    ItemDescription: "",
    Available: "",
    Stock: "",
    Machine: "",
    StoreName: "",
    Qty: "",
    Unit: "",
    Remark: "",
    MrnNo: "",
    Employee: "",
    Dept: "",
    MaterialIssueDate: "", // format: "YYYY-MM-DD"
    MaterialIssueTime: "", // format: "HH:mm AM/PM"
    Contractor: "",
    AvailableStock: "",
    HeatNo: "",
  });

  const [materialChallanTable, setMaterialChallanTable] = useState([]);
  const [heatNoStock, setHeatNoStock] = useState([]);

  const handleItemSelect = (item) => {
    setShowItemList(false);

    const partNo = item.part_no || item.item_code || "";
    const partCode = item.Part_Code || item.item_no || "";
    const description = item.Name_Description || item.description || "";
    const unitCode = item.Unit_Code || item.unit || "Pcs";

    setFormData((prev) => ({
      ...prev,
      Item: `${partNo} - ${partCode} - ${description}`,
      ItemDescription: description,
      Unit: unitCode,
      AvailableStock: "",
    }));

    setHeatNoStock([]);

    if (item.variants && Array.isArray(item.variants) && item.variants.length > 0) {
      setHeatNoStock(item.variants);
    } else {
      const fetchHeatNoData = async (selectedItem) => {
        const combinedItemCode = `${partNo} - ${partCode} - ${description}`;
        console.log(`Fetching stock for combined item code: ${combinedItemCode}`);

        try {
          const token = localStorage.getItem("accessToken");
          const apiUrl = `https://sellerp-backend.onrender.com/Store/heat-no/?item_code=${encodeURIComponent(combinedItemCode)}`;
          console.log("Calling API URL:", apiUrl);
          const res = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const resData = await res.json();
            console.log("API Response Data:", resData);
            if (resData && Array.isArray(resData.data) && resData.data.length > 0) {
              setHeatNoStock(resData.data);
              console.log("Stock data updated in state.");
            } else {
              console.log("API returned no stock data in 'data' array.");
              setHeatNoStock([]);
              toast.warn(`No stock found for item: ${combinedItemCode}`);
            }
          } else {
            console.error("API request failed with status:", res.status);
            toast.error(`API request failed with status: ${res.status}`);
            setHeatNoStock([]);
          }
        } catch (err) {
          console.error("Error fetching heat number stock:", err);
          toast.error("An error occurred while fetching stock.");
          setHeatNoStock([]);
        }
      };

      if (partNo && description) {
        fetchHeatNoData(item);
      }
    }
  };

  const handleAddEntry = () => {
    // Validation 1: Check karein ki stock select hua hai ya nahi
    if (!formData.AvailableStock) {
      toast.error("Please select a Heat No / Stock first.");
      return; // Function ko yahin rok dein
    }

    // Validation 2: Check karein ki Qty daali gayi hai ya nahi
    if (
      !formData.Qty ||
      isNaN(parseFloat(formData.Qty)) ||
      parseFloat(formData.Qty) <= 0
    ) {
      toast.error("Please enter a valid quantity.");
      return; // Function ko yahin rok dein
    }

    // Selected value se heatNo aur stockValue alag karein
    const [heatNo, stockValue] = formData.AvailableStock.split("|");

    const enteredQty = parseFloat(formData.Qty);
    const availableStock = parseFloat(stockValue);

    // Validation 3: Check karein ki entered Qty available stock se zyada na ho
    if (enteredQty > availableStock) {
      toast.error(
        `Quantity (${enteredQty}) cannot be more than available stock (${availableStock}).`
      );
      return; // Function ko yahin rok dein
    }

    // Sab kuch theek hai to new entry banayein
    const newEntry = {
      ItemDescription: formData.ItemDescription || "",
      Stock: stockValue, // Sirf stock ki value
      HeatNo: heatNo, // Heat code alag se
      Qty: formData.Qty || "",
      Machine: searchTerm || "",
      Remark: formData.Remark || "",
      MrnNo: formData.MrnNo || "",
      CoilNo: formData.CoilNo || "",
      Employee: formData.Employee || "",
      Dept: formData.Dept || "",
    };

    console.log("Adding entry:", newEntry);

    setMaterialChallanTable([...materialChallanTable, newEntry]);

    // Form fields ko reset karein
    setFormData({
      ...formData,
      ItemDescription: "",
      AvailableStock: "",
      Qty: "",
      MrnNo: "",
      Employee: "",
      Dept: "",
      Remark: "", // Remark bhi clear karein
      CoilNo: "",
    });

    setSearchTerm(""); // Machine search reset karein
  };

  const handleDelete = (index) => {
    const updatedTable = [...materialChallanTable];
    updatedTable.splice(index, 1);
    setMaterialChallanTable(updatedTable);
  };

  const handleEdit = (index) => {
    const entry = materialChallanTable[index];
    setFormData({
      ...formData,
      ItemDescription: entry.ItemDescription,
      AvailableStock: entry.Stock,
      Qty: entry.Qty,
      Machine: entry.Machine,
      NatureOfWork: entry.Remark,
      MrnNo: entry.MrnNo,
      CoilNo: entry.CoilNo,
      Employee: entry.Employee,
      Dept: entry.Dept,
    });

    // Remove from table for re-adding after edit
    const updatedTable = [...materialChallanTable];
    updatedTable.splice(index, 1);
    setMaterialChallanTable(updatedTable);
  };

  // Add a new state to track form submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update the handleSave function to set isSubmitted to true after successful save
  const handleSave = async () => {
    const payload = {
      ...formData,
      MaterialChallanTable: materialChallanTable,
      ChallanNo: challanNo,
      Series: series,
      Type: type,
      Plant: plant,
      MaterialIssueDate:
        formData.MaterialIssueDate || new Date().toISOString().split("T")[0],
      MaterialIssueTime:
        formData.MaterialIssueTime ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    };

    console.log("Saving payload:", payload); // Add this to debug

    try {
      await postNewMaterialIssue(payload);
      toast.success("Saved successfully!");
      setIsSubmitted(true); // Set submitted to true after successful save
      // Don't clear the form immediately so the user can see what was submitted
      handleClear(); // Clear the form after save
    } catch (error) {
      console.error("Error saving!", error);
      toast.error("Error saving!");
    }
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleEmployeeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, Employee: value });

    if (value.length >= 2) {
      const results = await searchEmployeeDept(value);
      setSearchResults(results);
      setShowEmployeeDropdown(true); // <-- FIX
    } else {
      setSearchResults([]);
      setShowEmployeeDropdown(false); // <-- FIX
    }
  };

  const handleSelectEmployee = (employee) => {
    setFormData({
      ...formData,
      Employee: `${employee.Code} - ${employee.Name}`,
      Dept: employee.Department || "", // Default to empty if null
    });
    setShowEmployeeDropdown(false); // <-- FIX
  };

  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);

  const [showMachineDropdown, setShowMachineDropdown] = useState(false); // ADD THIS
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false); // ADD THIS

  useEffect(() => {
    const loadMachines = async () => {
      const data = await fetchUnitMachines();
      setMachines(data);
    };
    loadMachines();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const filtered = machines.filter((m) =>
        `${m.WorkCenterCode} ${m.WorkCenterName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredMachines(filtered);
      setShowMachineDropdown(true); // <-- FIX
    } else {
      setFilteredMachines([]);
      setShowMachineDropdown(false); // <-- FIX
    }
  }, [searchTerm, machines]);

  const handleMachineSelect = (machine) => {
    setFormData({
      ...formData,
      Machine: `${machine.WorkCenterCode} - ${machine.WorkCenterName}`,
    });
    setSearchTerm(`${machine.WorkCenterCode} - ${machine.WorkCenterName}`);
    setShowMachineDropdown(false); // <-- FIX
  };

  const handleClear = () => {
    // ... other code
    setSearchResults([]);
    // setShowDropdown(false); // REMOVE THIS
    setShowMachineDropdown(false); // ADD THIS
    setShowEmployeeDropdown(false); // ADD THIS
    setIsSubmitted(false);
    setHeatNoStock([]);
  };

  return (
    <div className="NewStoreNewMaterialIssue">
      <ToastContainer />
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
                <div className="NewMaterialIssue-header mb-4 text-start mt-2">
  <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
    <h5 className="header-title text-start mb-0" style={{ fontWeight: 800, fontSize: '1.8rem', background: 'linear-gradient(90deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      New Material Issue
    </h5>
    <div className="d-flex gap-2">
      <Link className="btn btn-primary btn-sm" to="/Work-Order-Material" style={{ background: 'linear-gradient(to right, #3b82f6, #4f46e5)', border: 'none' }}>
        WorkOrder Material Issue Report
      </Link>
      <Link className="btn btn-primary btn-sm" to="/Material-Issue" style={{ background: 'linear-gradient(to right, #3b82f6, #4f46e5)', border: 'none' }}>
        Material Issue WorkOrder Only
      </Link>
    </div>
  </div>
  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
    <div className="card-body">
      <div className="row g-3 align-items-end text-start">
        <div className="col-md-2">
          <label htmlFor="sharpSelect" className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Plant</label>
          <select
            id="sharpSelect"
            className="form-select form-select-sm"
            value={plant}
            onChange={(e) => {
              setPlant(e.target.value);
              setFormData({ ...formData, Plant: e.target.value });
            }}
          >
            <option value="VISHWA S.I.">VISHWA S.I.</option>
          </select>
        </div>
        
        <div className="col-md-2">
          <label htmlFor="seriesSelect" className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Series</label>
          <select
            id="seriesSelect"
            className="form-select form-select-sm"
            onChange={handleSeriesChange}
            value={series}
          >
            <option value="">Select</option>
            <option value="Material Issue">Material Issue</option>
          </select>
        </div>

        <div className="col-md-2">
          <label htmlFor="inputField" className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Challan No.</label>
          <input
            type="text"
            id="inputField"
            className="form-control form-control-sm"
            placeholder="Challan No."
            value={challanNo}
            readOnly
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="typeSelect" className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Type</label>
          <select
            id="typeSelect"
            className="form-select form-select-sm"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setFormData({ ...formData, Type: e.target.value });
            }}
          >
            <option value="">Select</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Buttons moved to header */}
      </div>
    </div>
  </div>

  {series === "Material Issue" && challanNo && isSubmitted && (
    <div className="col-12 mt-3">
      <div className="alert alert-success">
        <h5>Material Issue Challan Created Successfully</h5>
        <p>Challan Number: {challanNo}</p>
        <div className="mt-3">
          <Link
            to={`/material-issue-details/${challanNo}`}
            className="btn btn-primary me-2"
          >
            View Details
          </Link>
          <button
            className="btn btn-secondary me-2"
            onClick={() => window.print()}
          >
            Print Challan
          </button>
          <button
            className="btn btn-info"
            onClick={handleClear}
          >
            Create New
          </button>
        </div>
      </div>
    </div>
  )}
</div>

<div className="NewMaterialIssue-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Item Description</th>
                                <th>Available Stock</th>
                                <th>Machine</th>
                                <th>Store Name</th>
                                <th>Qty / Unit</th>
                                <th>Remark</th>
                                <th>MRN No.</th>
                                <th>Employee</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    name="Item"
                                    value={formData.Item || ""}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        Item: e.target.value,
                                      });
                                      const filtered = filterItems(
                                        items,
                                        e.target.value
                                      );
                                      console.log(filtered);
                                      setFilteredItems(filtered);
                                    }}
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                  {/* <button className="pobtn ms-2">Search</button> */}
                                  {showItemsList && (
                                    <ul
                                      className="dropdown-menu show"
                                      style={{
                                        width: "30%",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        border: "1px solid #ccc",
                                        zIndex: 1000,
                                      }}
                                    >
                                      {filteredItems.map((item) => (
                                        <li
                                          key={item.part_no || item.item_code}
                                          className="dropdown-item"
                                          onClick={() => handleItemSelect(item)}
                                          style={{
                                            padding: "5px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {item.part_no || item.item_code} - {item.Part_Code || item.item_no || ""} -{" "}
                                          {item.Name_Description || item.description}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </td>
                                <td>
                                  <textarea
                                    name="ItemDescription"
                                    value={formData.ItemDescription || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        ItemDescription: e.target.value,
                                      })
                                    }
                                    rows="1"
                                    className="form-control"
                                  ></textarea>
                                </td>

                                <td>
                                  {heatNoStock.length > 0 ? (
                                    <select
                                      name="AvailableStock"
                                      value={formData.AvailableStock}
                                      onChange={(e) => {
                                        setFormData({
                                          ...formData,
                                          // Yahan hum combined value save kar rahe hain (e.g., "HEAT123|100.5")
                                          AvailableStock: e.target.value,
                                        });
                                      }}
                                      className="form-select"
                                    >
                                      <option value="">
                                        Select Heat No / Stock
                                      </option>
                                      {heatNoStock.map((stockItem, index) => {
                                        const hNo = stockItem.HeatNo || stockItem.heat_no;
                                        const qty = stockItem.GRNQty !== undefined ? stockItem.GRNQty : stockItem.stock;
                                        return (
                                          <option
                                            key={index}
                                            value={`${hNo}|${qty}`}
                                          >
                                            {`${hNo} | Stock : ${qty}`}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      name="AvailableStock"
                                      value=""
                                      placeholder="No stock available"
                                      className="form-control"
                                      disabled
                                    />
                                  )}
                                </td>

                                {/* ======================= START: Machine TD (Final Version) ======================= */}
                                <td>
                                  {/* Use Bootstrap's "dropdown" class. This class adds position: relative automatically. */}
                                  <div className="dropdown">
                                    <input
                                      type="text"
                                      value={searchTerm}
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                      placeholder="Search Machine"
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                    {showMachineDropdown &&
                                      filteredMachines.length > 0 && (
                                        // NO INLINE STYLES NEEDED. Bootstrap's "show" class will handle it.
                                        // We also add "w-100" to make its width 100% of the parent.
                                        <div className="dropdown-menu show w-100">
                                          {filteredMachines.map(
                                            (machine, index) => (
                                              // Using an <a> tag is better for Bootstrap dropdown items
                                              <a
                                                key={index}
                                                href="#!" // Prevents page from jumping
                                                className="dropdown-item"
                                                style={{ cursor: "pointer" }}
                                                onClick={(e) => {
                                                  e.preventDefault(); // Important for <a> tags
                                                  handleMachineSelect(machine);
                                                }}
                                              >
                                                {machine.WorkCenterCode} -{" "}
                                                {machine.WorkCenterName}
                                              </a>
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                </td>
                                {/* ======================= END: Machine TD (Final Version) ======================= */}

                                <td>
                                  <input
                                    type="text"
                                    name="StoreName"
                                    value={formData.StoreName || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        StoreName: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="Qty"
                                    value={formData.Qty || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Qty: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                  <select
                                    name="Unit"
                                    value={formData.Unit || "Pcs"}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Unit: e.target.value,
                                      })
                                    }
                                    className="form-select mt-2"
                                  >
                                    <option value="Pcs">Pcs</option>
                                    <option value="Kg">Kg</option>
                                  </select>
                                </td>
                                <td>
                                  <textarea
                                    name="Remark"
                                    value={formData.Remark || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Remark: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  ></textarea>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="MrnNo"
                                    value={formData.MrnNo || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        MrnNo: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>

                                {/* ======================= START: Employee TD (Final Version) ======================= */}
                                <td>
                                  {/* Use Bootstrap's "dropdown" class for correct positioning context. */}
                                  <div className="dropdown">
                                    <input
                                      type="text"
                                      name="Employee"
                                      placeholder="code, employee"
                                      value={formData.Employee}
                                      onChange={handleEmployeeChange}
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                    {showEmployeeDropdown &&
                                      searchResults.length > 0 && (
                                        // NO INLINE STYLES. Just Bootstrap classes.
                                        <div className="dropdown-menu show w-100">
                                          {searchResults.map((emp, index) => (
                                            <a
                                              key={index}
                                              href="#!"
                                              className="dropdown-item"
                                              style={{ cursor: "pointer" }}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleSelectEmployee(emp);
                                              }}
                                            >
                                              {emp.Code} - {emp.Name} (
                                              {emp.Department})
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                  </div>

                                  <input
                                    type="text"
                                    name="Dept"
                                    value={formData.Dept}
                                    placeholder="Department"
                                    readOnly
                                    className="form-control mt-1"
                                  />
                                </td>
                                {/* ======================= END: Employee TD (Final Version) ======================= */}

                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm text-nowrap"
                                    onClick={handleAddEntry}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="NewMaterialIssuetable">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Desc</th>
                              <th>BOM | WO | Req. Qty</th>
                              <th>Issued | Bal Qty</th>
                              <th>Stock</th>

                              <th>Qty </th>
                              <th>Machine </th>
                              <th>Nature of Work</th>
                              <th>MRN No: Cail No:</th>
                              <th>Employee: </th>

                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialChallanTable.map((entry, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>{entry.ItemDescription}</td>
                                <td>
                                  BOM Qty : <br></br> WO Qty : <br></br>Tot Req.
                                  Qty :
                                </td>
                                <td>
                                  Issued Qty:
                                  <br></br>Bal Qty:
                                </td>
                                <td>
                                  Stock : {entry.Stock} <br />
                                  Heat No: {entry.HeatNo}
                                </td>
                                <td>{entry.Qty}</td>
                                <td>{entry.Machine}</td>
                                <td>{entry.Remark}</td>
                                <td>
                                  {entry.MrnNo} <br></br>
                                  {entry.CoilNo}
                                </td>

                                <td>
                                  {entry.Employee} <br />
                                  {entry.Dept}
                                </td>

                                <td>
                                  <FaEdit
                                    className="text-primary me-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(index)}
                                  />
                                </td>

                                <td>
                                  <FaTrash
                                    className="text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDelete(index)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="NewgrnFooter">
                    <div className="container-fluid">
                      {/* Input Fields */}
                      <div className="row g-2 align-items-center py-2">
                        {/* M Issue No */}
                        <div className="col-auto d-flex align-items-center gap-2">
                          <label className="small fw-bold mb-0 text-nowrap">M Issue No:</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            style={{ width: '120px' }}
                            value={challanNo}
                            readOnly
                          />
                        </div>

                        {/* M Issue Date */}
                        <div className="col-auto d-flex align-items-center gap-2">
                          <label className="small fw-bold mb-0 text-nowrap">M Issue Date:</label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            style={{ width: '130px' }}
                            value={formData.MaterialIssueDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                MaterialIssueDate: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* M Issue Time */}
                        <div className="col-auto d-flex align-items-center gap-2">
                          <label className="small fw-bold mb-0 text-nowrap">M Issue Time:</label>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                            style={{ width: '110px' }}
                            value={formData.MaterialIssueTime}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                MaterialIssueTime: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Contractor */}
                        <div className="col-auto d-flex align-items-center gap-2">
                          <label className="small fw-bold mb-0 text-nowrap">Contractor:</label>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: '140px' }}
                            value={formData.Contractor}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                Contractor: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="Savi">Savi</option>
                            <option value="Maxwell">Maxwell</option>
                            <option value="Prime Works">Prime Works</option>
                          </select>
                        </div>

                        {/* Save & Clear Buttons */}
                        <div className="col ms-auto d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-success px-4"
                            onClick={handleSave}
                          >
                            Save Challan
                          </button>
                          <button
                            className="btn btn-sm btn-secondary px-4"
                            onClick={handleClear}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
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

export default MaterialIssueChallan;
