import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./WorkOrderEntry.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { createWorkOrder,fetchNextWorkOrderNo } from "../../Service/Production.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchShifts,fetchUnitMachines } from "../../Service/Production.jsx";
import { Link } from "react-router-dom";

const WorkOrderEntry = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    wo_series: "",
    wo_no: "",
    customer: "",
    wo_type: "",
    wo_date: "",
    Purchase_order_detail: "",
    schedule_month: "",
    target_date: "",
    item: "",
    NewWorkOrderItem:[]
  });

  const [workOrders, setWorkOrders] = useState([]); // Store added work orders
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const shortYear = localStorage.getItem("Shortyear");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   // Fetch next Work Order Number when WO Series is selected
   useEffect(() => {
    const fetchWorkOrderNo = async () => {
      if (!formData.wo_series || !shortYear) return;
      try {
        const nextWoNo = await fetchNextWorkOrderNo(shortYear);
        setFormData((prev) => ({ ...prev, wo_no: nextWoNo }));
      } catch (error) {
        toast.error("Failed to fetch Work Order number.");
      }
    };

    if (formData.wo_series) {
      fetchWorkOrderNo();
    }
  }, [formData.wo_series, shortYear]);
  const handleTableInputChange = (index, field, value) => {
    const updatedWorkOrders = [...workOrders];
    updatedWorkOrders[index] = { ...updatedWorkOrders[index], [field]: value };
    setWorkOrders(updatedWorkOrders);
  };
  
  const handleAddToTable = () => {
    if (!formData.customer || !formData.item) {
      toast.error("Customer and Item are required.");
      return;
    }
  
    const newOrder = {
      ...formData,
      NewWorkOrderItem: formData.NewWorkOrderItem?.length > 0 ? formData.NewWorkOrderItem : [{
        Purchase_order_detail: formData.Purchase_order_detail,
        item: formData.item,
        Description: "",
        SO_Sch_Qty: "0",
        Bal_Qty: "0",
        Work_Order_Qty: "0",
        Remark: "",
        Machine: "",
        Shift: "",
        Process: "",
        Raw_Material: ""
      }]
    };
  
    if (editIndex !== null) {
      const updatedWorkOrders = [...workOrders];
      updatedWorkOrders[editIndex] = newOrder;
      setWorkOrders(updatedWorkOrders);
      setEditIndex(null);
    } else {
      setWorkOrders([...workOrders, newOrder]);
    }
  
    setFormData({
      wo_series: "",
      wo_no: "",
      customer: "",
      wo_type: "",
      wo_date: "",
      Purchase_order_detail: "",
      schedule_month: "",
      target_date: "",
      item: "",
      NewWorkOrderItem: []
    });
  };
  
  
  
 



  
  

  // Handle delete
  const handleDelete = (index) => {
    const updatedWorkOrders = workOrders.filter((_, i) => i !== index);
    setWorkOrders(updatedWorkOrders);
    toast.success("Work Order deleted!");
  };

  // Handle edit
  const handleEdit = (index) => {
    setFormData(workOrders[index]);
    setEditIndex(index);
  };


  const handleSubmit = async () => {
    if (workOrders.length === 0) {
      toast.error("No Work Orders to submit.");
      return;
    }
  
    // Ensure each work order has at least one item
    for (let order of workOrders) {
      if (!order.NewWorkOrderItem || order.NewWorkOrderItem.length === 0) {
        toast.error(`Work Order ${order.wo_no} is missing NewWorkOrderItem.`);
        return;
      }
    }
  
    setLoading(true);
    try {
      const payload = { 
        work_orders: workOrders.map(order => ({
          ...order,
          NewWorkOrderItem: order.NewWorkOrderItem?.length ? order.NewWorkOrderItem : [{
            Purchase_order_detail: order.Purchase_order_detail || "",
            item: order.item || "",
            Description: order.Description || "",
            SO_Sch_Qty: order.SO_Sch_Qty || "0",
            Bal_Qty: order.Bal_Qty || "0",
            Work_Order_Qty: order.Work_Order_Qty || "0",
            Remark: order.Remark || "",
            Machine: order.Machine || "",
            Shift: order.Shift || "",
            Process: order.Process || "",
            Raw_Material: order.Raw_Material || ""
          }]
        }))
      };
  
      console.log("Final Payload before submit:", JSON.stringify(payload, null, 2));
  
      await createWorkOrder(payload);
  
      toast.success("All Work Orders submitted successfully!");
      setWorkOrders([]); // Clear table after submission
    } catch (error) {
      console.error("Error submitting Work Orders:", error.response?.data || error.message);
      toast.error("Failed to submit Work Orders.");
    } finally {
      setLoading(false);
    }
  };
  
  
  


  // Unit Machine
    const [unitMachines, setUnitMachines] = useState([]);
    const [filteredUnitMachines, setFilteredUnitMachines] = useState([]);
    const [ setSearchTermUnitMachine] = useState("");
    const [dropdownVisibleUnitMachine, setDropdownVisibleUnitMachine] =
      useState(false);
  
    useEffect(() => {
      const loadUnitMachines = async () => {
        const data = await fetchUnitMachines();
        setUnitMachines(data);
        setFilteredUnitMachines(data);
      };
      loadUnitMachines();
    }, []);
  
    const handleSearchChangeUnitMachine = (event) => {
      const value = event.target.value;
      setSearchTermUnitMachine(value);
      setDropdownVisibleUnitMachine(true);
  
      const filtered = unitMachines.filter(
        (unit) =>
          unit.WorkCenterName.toLowerCase().includes(value.toLowerCase()) ||
          unit.WorkCenterCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUnitMachines(filtered);
    };
  
    const handleSelectUnitMachine = (unit, index) => {
      const updatedWorkOrders = [...workOrders];
      updatedWorkOrders[index] = { ...updatedWorkOrders[index], Machine: unit.WorkCenterCode };
      setWorkOrders(updatedWorkOrders);
      setDropdownVisibleUnitMachine(null);
    };
    

  // shift
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [ setSearchTermShift] = useState("");
  const [dropdownVisibleShift, setDropdownVisibleShift] = useState(false);
  

  useEffect(() => {
    const loadShifts = async () => {
      const data = await fetchShifts();
      setShifts(data.sort((a, b) => b.id - a.id));
      setFilteredShifts(data.sort((a, b) => b.id - a.id));
    };
    loadShifts();
  }, []);
  const handleSearchChangeShift = (event) => {
    const value = event.target.value;
    setSearchTermShift(value);
    setDropdownVisibleShift(true);

    const filtered = shifts.filter(
      (shift) =>
        shift.Shift_Name.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_From.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_Till.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredShifts(filtered);
  };

  const handleSelectShift = (shift, index) => {
    const updatedWorkOrders = [...workOrders];
    updatedWorkOrders[index] = {
      ...updatedWorkOrders[index],
      Shift: shift.Shift_Name,
      ShiftFrom: shift.Shift_From,
      ShiftTo: shift.Shift_Till,
      BreakFrom: shift.Break_Name || "",
      BreakTo: shift.Break_Till || "",
      BreakTotal: shift.Break_Time || "",
      ShiftTime: shift.Total_Hours || "",
    };
    setWorkOrders(updatedWorkOrders);
    setDropdownVisibleShift(null);
  };
  


  return (
    <div className="ProductionWorkOrderEntry">
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
                
                {/* Header Section */}
                <div className="WorkOrderEntry-header mb-4">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">
                        New Work Order
                      </h5>
                    </div>
                    <div className="col-md-8">
                      <div className="row align-items-center">
                        <label
                          htmlFor="seriesSelect"
                          className="col-md-3 form-label"
                        >
                          Plant:
                        </label>
                        <div className="col-md-2">
                          <select id="seriesSelect" className="form-select">
                            <option>Produlink</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <Link to="/WorkOrderList" className="btn">WorkOrder List</Link>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="WorkOrderEntry-main">
                  <div className="row text-start">
                    <div className="col-md-2">
                      <label className="form-label">WO Series:</label>
                      <select className="form-select" name="wo_series" value={formData.wo_series} onChange={handleChange}>
            <option value="">Select</option>
            <option value="WorkOrder">WorkOrder</option>
          </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">WO Type:</label>
                      <select
                        className="form-select"
                        name="wo_type"
                        value={formData.wo_type}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Sales Order">Sales Order</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Schedule Month:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="schedule_month"
                        value={formData.schedule_month}
                        placeholder="March"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">WO No:</label>
                      <input type="text" className="form-control" name="wo_no" value={formData.wo_no} readOnly />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">WO Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        name="wo_date"
                        value={formData.wo_date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Target Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        name="target_date"
                        value={formData.target_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row text-start">
                    <div className="col-md-2">
                      <label className="form-label">Select Customer:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Select PO:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Purchase_order_detail"
                        value={formData.Purchase_order_detail}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Select Item:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-2" style={{ marginTop: "30px" }}>
                    <button className="btn" onClick={handleAddToTable} disabled={loading}>
            {loading ? "Processing..." : editIndex !== null ? "Update Work Order" : "Add"}
          </button>

                    </div>
                    <div className="col-md-4 d-flex mt-4 justify-content-between">
                      <button className="btn ms-2">
                        Pending CustPO For WorkOrder
                      </button>
                      <button className="btn ms-2">
                        Production From Existing Stock
                      </button>
                    </div>
                   
                      
                  </div>
                </div>
                

                {/* Table Section */}
                <div className="WorkOrderEntry-table mt-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Sr No.</th>
                            <th>PO Details</th>
                            <th>Item No</th>
                            <th>Description</th>
                            <th>SO.Qty/Sch. Qty</th>
                            <th>Bal. Qty</th>
                            <th>Work Order Qty</th>
                            <th>Remark</th>
                            <th>Machine</th>
                            <th>Shift</th>
                            <th>Process</th>
                            <th>Raw Material</th>
                            <th>BOM</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                     <tbody>
  {workOrders.length === 0 ? (
    <tr>
      <td colSpan="15" className="text-center">No Work Orders Found</td>
    </tr>
  ) : (
    workOrders.map((order, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            type="text"
            value={order.Purchase_order_detail || ""}
            onChange={(e) => handleTableInputChange(index, "Purchase_order_detail", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={order.item || ""}
            onChange={(e) => handleTableInputChange(index, "item", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={order.Description || ""}
            onChange={(e) => handleTableInputChange(index, "Description", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            value={order.SO_Sch_Qty || ""}
            onChange={(e) => handleTableInputChange(index, "SO_Sch_Qty", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            value={order.Bal_Qty || ""}
            onChange={(e) => handleTableInputChange(index, "Bal_Qty", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            value={order.Work_Order_Qty || ""}
            onChange={(e) => handleTableInputChange(index, "Work_Order_Qty", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={order.Remark || ""}
            onChange={(e) => handleTableInputChange(index, "Remark", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search Machine"
              value={order.Machine || ""}
              onChange={(e) => handleSearchChangeUnitMachine(e, index)}
              onFocus={() => setDropdownVisibleUnitMachine(index)}
            />
            {dropdownVisibleUnitMachine === index && (
              <ul className="dropdown-menu show mt-2" style={{ width: "100%", maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}>
                {filteredUnitMachines.length > 0 ? (
                  filteredUnitMachines.map((unit, i) => (
                    <li
                      key={i}
                      className="dropdown-item"
                      onClick={() => handleSelectUnitMachine(unit, index)}
                      style={{ cursor: "pointer" }}
                    >
                      {`${unit.WorkCenterName} (${unit.WorkCenterCode})`}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">No results found</li>
                )}
              </ul>
            )}
          </div>
        </td>
        <td>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search Shift"
              value={order.Shift || ""}
              onChange={(e) => handleSearchChangeShift(e, index)}
              onFocus={() => setDropdownVisibleShift(index)}
            />
            {dropdownVisibleShift === index && (
              <ul className="dropdown-menu show mt-2" style={{ width: "100%", maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}>
                {filteredShifts.length > 0 ? (
                  filteredShifts.map((shift, i) => (
                    <li
                      key={i}
                      className="dropdown-item"
                      onClick={() => handleSelectShift(shift, index)}
                      style={{ cursor: "pointer" }}
                    >
                      {`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">No results found</li>
                )}
              </ul>
            )}
          </div>
        </td>
        <td>
          <input
            type="text"
            value={order.Process || ""}
            onChange={(e) => handleTableInputChange(index, "Process", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={order.Raw_Material || ""}
            onChange={(e) => handleTableInputChange(index, "Raw_Material", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={order.BOM || ""}
            onChange={(e) => handleTableInputChange(index, "BOM", e.target.value)}
            className="form-control"
          />
        </td>
        <td>
          <FaEdit className="text-primary" onClick={() => handleEdit(index)} />
        </td>
        <td>
          <FaTrash className="text-danger" onClick={() => handleDelete(index)} />
        </td>
      </tr>
    ))
  )}
</tbody>

                      </table>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="text-end mt-4">
                <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit Work Orders"}</button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderEntry;
