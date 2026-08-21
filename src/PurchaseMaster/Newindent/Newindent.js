import "./Newindent.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNextIndentNo, postIndent } from "../../Service/PurchaseApi";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";

const Newindent = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

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

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; 
    const time = now.toTimeString().split(" ")[0].substring(0, 5); 

    setCurrentDate(date);
    setCurrentTime(time);
  }, []);

  const [series, setSeries] = useState("");
  const [indentNo, setIndentNo] = useState("");

  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
    setSeries(selectedSeries);

    if (selectedSeries === "Purchase Indent") {
      const shortYear = localStorage.getItem("Shortyear");
      try {
        const indent = await getNextIndentNo(shortYear);
        if (indent) {
          setIndentNo(indent);
          console.log("Fetched Indent No:", indent);
        }
      } catch (error) {
        console.error("Error fetching indent number:", error);
      }
    } else {
      setIndentNo("");
    }
  };

  const [formData, setFormData] = useState({
    Plant: '',
    Series: 'IND-2025',
    IndentNo: '',
    Date: '',
    Time: '',
    Category: '',
    CPCCode: '',
    WorkOrder: '',
    Remark: '',
    New_Indent: [],
  });

  const [itemRow, setItemRow] = useState({
    ItemNoCpcCode: '',
    Description: '',
    AvailableStock: '',
    Unit: '',
    MachineAndDepartment: '',
    Qty: '',
    Type: '',
    Remark: '',
    UseFor: '',
    MoRef: '',
    SchDate: '',
  });
  
  const [newIndentTable, setNewIndentTable] = useState([]);

  const handleAddItem = () => {
    if (!itemRow.ItemNoCpcCode || !itemRow.Qty) return alert("Fill required fields: Item and Qty");
  
    setNewIndentTable((prev) => [...prev, itemRow]);
    setItemRow({
      ItemNoCpcCode: '',
      Description: '',
      AvailableStock: '',
      Unit: '',
      MachineAndDepartment: '',
      Qty: '',
      Type: '',
      Remark: '',
      UseFor: '',
      MoRef: '',
      SchDate: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name in itemRow) {
      setItemRow((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveIndent = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      IndentNo: indentNo,
      Date: currentDate,
      Time: currentTime,
      New_Indent: newIndentTable,
    };
  
    try {
      await postIndent(payload);
      toast.success("Indent saved successfully");
  
      setFormData({
        Plant: '', Series: 'IND-2025', IndentNo: '', Date: '', Time: '', Category: '', CPCCode: '', WorkOrder: '', Remark: '', New_Indent: [],
      });
      setNewIndentTable([]);
    } catch (err) {
      toast.error("Failed to save indent. Check console for details.");
    }
  };

  const handleDeleteItem = (index) => {
    setNewIndentTable(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="erp-page new-indent">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="new-indent-master overflow-hidden p-4">
                  
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <h5 className="header-title mb-0">New Indent</h5>
                      <div className="d-flex gap-2">
                        <button className="vndrbtn" onClick={() => navigate('/ListIndent')}>
                          <i className="fas fa-list-alt me-2"></i> Indent List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Control Panel Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Plant</label>
                          <select className="form-select" name="Plant" value={formData.Plant} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Produlink">Produlink</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Series</label>
                          <select className="form-select" value={series} onChange={handleSeriesChange}>
                            <option value="">Purchase...</option>
                            <option value="Purchase Indent">Purchase Indent</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Indent No</label>
                          <input type="text" className="form-control bg-light" value={indentNo} readOnly />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Date</label>
                          <input type="date" className="form-control" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Time</label>
                          <input type="time" className="form-control" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Category</label>
                          <select className="form-select" name="Category" value={formData.Category} onChange={handleChange}>
                            <option value="">Office</option>
                            <option value="factory">Factory</option>
                            <option value="option2">Option 2</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Item Details Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                      <h6 className="mb-0 fw-bold text-secondary">Add Item Details</h6>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Item & CPC Code</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Description</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Stock</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Unit</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Machine/Dept</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Qty</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Type</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Remark</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Use For</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>MD Ref</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px' }}>Sch. Date</th>
                              <th style={{ fontSize: '0.75rem', padding: '6px 4px', width: '80px' }} className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ padding: '4px' }}>
                                <div className="d-flex gap-1">
                                  <input type="text" className="form-control form-control-sm" name="ItemNoCpcCode" value={itemRow.ItemNoCpcCode} onChange={handleChange} placeholder="Item" />
                                  <button className="btn btn-sm btn-outline-primary p-1">
                                    <FaSearch size={12} />
                                  </button>
                                </div>
                              </td>
                              <td style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" name="Description" value={itemRow.Description} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" name="AvailableStock" value={itemRow.AvailableStock} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}>
                                <select className="form-select form-select-sm" name="Unit" value={itemRow.Unit} onChange={handleChange}>
                                  <option value="">Unit</option>
                                  <option value="PCS">PCS</option>
                                  <option value="KGS">KGS</option>
                                  <option value="BOX">BOX</option>
                                </select>
                              </td>
                              <td style={{ padding: '4px' }}>
                                <select className="form-select form-select-sm" name="MachineAndDepartment" value={itemRow.MachineAndDepartment} onChange={handleChange}>
                                  <option value="">Dept</option>
                                  <option value="TATA Puchase">TATA</option>
                                  <option value="Pencil Store">Pencil</option>
                                </select>
                              </td>
                              <td style={{ padding: '4px' }}><input type="number" className="form-control form-control-sm" name="Qty" value={itemRow.Qty} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}>
                                <select className="form-select form-select-sm" name="Type" value={itemRow.Type} onChange={handleChange}>
                                  <option value="">Type</option>
                                  <option value="Regular">Reg</option>
                                </select>
                              </td>
                              <td style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" name="Remark" value={itemRow.Remark} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" name="UseFor" value={itemRow.UseFor} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}><input type="text" className="form-control form-control-sm" name="MoRef" value={itemRow.MoRef} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }}><input type="date" className="form-control form-control-sm" name="SchDate" value={itemRow.SchDate} onChange={handleChange} /></td>
                              <td style={{ padding: '4px' }} className="text-center">
                                <div className="d-flex justify-content-center gap-1">
                                  <button className="btn btn-sm text-success border-0 p-0" title="Add Item" onClick={handleAddItem}>
                                    <FaPlus size={16} />
                                  </button>
                                  <button className="btn btn-sm text-danger border-0 p-0" title="Clear/Reset" onClick={() => setItemRow({ ItemNoCpcCode: '', Description: '', AvailableStock: '', Unit: '', MachineAndDepartment: '', Qty: '', Type: '', Remark: '', UseFor: '', MoRef: '', SchDate: '' })}>
                                    <FaTrashAlt size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Added Items Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive" style={{ maxHeight: '40vh' }}>
                        <table className="table table-bordered table-striped mb-0">
                          <thead className="table-primary sticky-top">
                            <tr>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Sr.</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Item & CPC</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Desc.</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Unit</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Mach/Dept</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Qty</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Type</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Remark</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Use For</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>MD Ref</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }}>Date</th>
                              <th style={{ fontSize: '0.75rem', padding: '8px 4px' }} className="text-center">Act.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newIndentTable.length > 0 ? (
                              newIndentTable.map((item, index) => (
                                <tr key={index}>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center' }}>{index + 1}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.ItemNoCpcCode}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.Description}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center' }}>{item.Unit}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.MachineAndDepartment}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{item.Qty}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center' }}>{item.Type}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.Remark}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.UseFor}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px' }}>{item.MoRef}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center' }}>{item.SchDate}</td>
                                  <td style={{ fontSize: '0.75rem', padding: '6px 4px', textAlign: 'center' }}>
                                    <button className="btn btn-sm text-danger border-0 p-0" title="Delete Item" onClick={() => handleDeleteItem(index)}>
                                      <FaTrashAlt size={14} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={12} className="text-center py-4 text-muted">
                                  No indent items found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-3">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>CPC Code</label>
                          <input type="text" className="form-control" name="CPCCode" value={formData.CPCCode} onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Work Order</label>
                          <input type="text" className="form-control" name="WorkOrder" value={formData.WorkOrder} onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Remark</label>
                          <input type="text" className="form-control" name="Remark" value={formData.Remark} onChange={handleChange} />
                        </div>
                        <div className="col-md-3 mt-auto">
                          <button className="vndrbtn w-100" onClick={handleSaveIndent}>
                            <i className="fas fa-save me-2"></i> Save Indent
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

export default Newindent;
