import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchItemFields,
  addTransaction,
  getTransaction,
} from "../../../Service/Api";

import axios from "axios";

const JobWorkitemdetail = ({
  data,
  updateData,
  supplierCode,
  updateGstData,
  updateScheduleData,
}) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    SelectItem: "",
    SelectedItemName: "",
    ItemDescription: "",
    Out: "",
    In: "",
    Rm: "",
    Rate: "",
    RType: "",
    Disc: "",
    PoQty: "",
    Unit: "",
    Particular_Process: "",
    SAC: "",
    rmDetails: {},
  });
  const [editingItem, setEditingItem] = useState(null);

  // FG states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // RM states
  const [rmSearchQuery, setRmSearchQuery] = useState("");
  const [rmSearchResults, setRmSearchResults] = useState([]);
  const [showRmDropdown, setShowRmDropdown] = useState(false);
  const [rmLoading, setRmLoading] = useState(false);
  const [bomItems, setBomItems] = useState([]);

  // ======================= FIX START: State to hold Parent FG Name for RM selections =======================
  const [parentFgName, setParentFgName] = useState("");
  // ======================= FIX END =======================


  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setItems(data);
    }
  }, [data]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? value : "" });
    } else {
      // Find the selected item from bomItems to store its full details
      if (name === "Rm" && formData.SelectItem === "RM") {
        const selectedRmItem = bomItems.find((item) => item.PartCode === value);
        if (selectedRmItem) {
          setFormData({
            ...formData,
            Rm: value,
            rmDetails: { ...selectedRmItem },
          });
        } else {
          setFormData({ ...formData, Rm: value, rmDetails: {} });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // FG search function
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const results = await fetchItemFields(query);
      setSearchResults(results || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error searching items:", error);
      toast.error("Error searching items");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // FG item select function
  const handleSelectItem = (item) => {
    const bomItemsList = item.bom_items || [];
    setBomItems(bomItemsList);

    setFormData({
      ...formData,
      SelectedItemName: `${item.part_no || ""} - ${item.Part_Code || ""} - ${item.Name_Description || ""
        }`,
      ItemDescription: item.Name_Description || "",
      Unit: item.Unit_Code || "",
      SAC: item.SAC || "",
    });

    setShowDropdown(false);
    setSearchQuery(item.part_no);
  };

  // RM search function
  const handleRmSearch = async (e) => {
    const query = e.target.value;
    setRmSearchQuery(query);

    if (query.trim().length < 2) {
      setRmSearchResults([]);
      setShowRmDropdown(false);
      return;
    }

    setRmLoading(true);
    try {
      const results = await fetchRmItemsSearch(query);
      setRmSearchResults(results || []);
      setShowRmDropdown(true);
    } catch (error) {
      console.error("Error searching RM items:", error);
      toast.error("Error searching RM items");
      setRmSearchResults([]);
    } finally {
      setRmLoading(false);
    }
  };

  // ======================= FIX START: UPDATED RM SELECTION LOGIC =======================
  /**
   * When an RM is selected, this function now does the following:
   * 1. Fetches the parent FG to get its BOM for the 'Part Code' dropdown.
   * 2. Stores the parent FG's name in a separate state `parentFgName` for later use in the table's "Part Details".
   * 3. Sets the "Item Name" and "Item Description" fields to the selected RM's own details.
   */
  const handleSelectRmItem = async (item) => {
    const parentPartNo = item.part_no;
    if (!parentPartNo) {
      toast.error("Selected RM item does not have a parent FG reference.");
      return;
    }

    setShowRmDropdown(false);
    setRmSearchQuery(`${item.BomPartCode} - ${item.BomPartDesc}`);
    setLoading(true);

    try {
      const parentFgResults = await fetchItemFields(parentPartNo);

      if (!parentFgResults || parentFgResults.length === 0) {
        toast.error(`Could not find parent FG details for Part No: ${parentPartNo}`);
        return;
      }

      const parentFgData = parentFgResults[0];
      const bomItemsList = parentFgData.bom_items || [];
      setBomItems(bomItemsList);

      // Store the full name of the parent FG for the "Part Details" column
      const fullParentFgName = `${parentFgData.part_no || ""} - ${parentFgData.Part_Code || ""} - ${parentFgData.Name_Description || ""}`;
      setParentFgName(fullParentFgName);

      // Populate the form fields with the selected RM's details
      setFormData({
        ...formData,
        SelectedItemName: `${item.BomPartCode || ""} - ${item.BomPartDesc || ""}`,
        ItemDescription: item.BomPartDesc || "",
        // We can still take Unit and SAC from the parent as a default
        Unit: parentFgData.Unit_Code || "",
        SAC: parentFgData.SAC || "",
        Rm: "",
        rmDetails: {}
      });

    } catch (error) {
      console.error("Error fetching parent FG for RM:", error);
      toast.error("Failed to fetch details for the parent Finished Good.");
    } finally {
      setLoading(false);
    }
  };
  // ======================= FIX END: UPDATED RM SELECTION LOGIC =======================


  // RM items search API call
  const fetchRmItemsSearch = async (searchQuery) => {
    try {
      const url = `https://sellerp-backend.onrender.com/Purchase/jobwork/RM/items/?q=${encodeURIComponent(
        searchQuery
      )}`;
      const res = await axios.get(url);
      return res.data && Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("Error fetching RM search data:", error);
      throw error;
    }
  };

  const validate = () => {
    const requiredFields = ["SelectItem", "SelectedItemName", "Rate", "PoQty"];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill ${field}`);
        return false;
      }
    }

    if (formData.SelectItem === "FG" && (!formData.Out || !formData.In)) {
      toast.error("Please select both Out and In for FG items");
      return false;
    }

    if (formData.SelectItem === "RM" && !formData.Rm) {
      toast.error(
        "Please search and select an RM item and then a Part Code from the dropdown"
      );
      return false;
    }

    return true;
  };

  const handleAdd = async () => {
    if (validate()) {
      try {
        const newId = Date.now();

        // ======================= FIX START: Construct Part Details using parentFgName =======================
        const outAndInPart = formData.SelectItem === "FG"
          ? `${formData.Out}-${formData.In}`
          : formData.SelectItem === "RM" && formData.rmDetails.PartCode
            ? `${parentFgName} | OP:${formData.rmDetails.OPNo} | ${formData.rmDetails.Operation} | ${formData.rmDetails.PartCode}`
            : formData.Rm;
        // ======================= FIX END =======================

        const transactionData = {
          item_type: formData.SelectItem,
          item_name: formData.SelectedItemName,
          item_description: formData.ItemDescription,
          out_and_in_part: outAndInPart,
          rate: Number.parseFloat(formData.Rate) || 0,
          disc: Number.parseInt(formData.Disc) || 0,
          qty: Number.parseInt(formData.PoQty) || 0,
          unit: formData.Unit || "",
          particular: formData.Particular_Process || "",
          version: "v1.0",
          item_status: "Pending",
          cs_code: "-",
          note: "",
          supplier_id: Number.parseInt(supplierCode) || 5,
          rm_part_no: formData.SelectItem === "RM" ? (formData.rmDetails.part_no || "") : null,
          rm_part_code: formData.SelectItem === "RM" ? (formData.rmDetails.PartCode || "") : null,
          rm_bom_part_code: formData.SelectItem === "RM" ? (formData.rmDetails.BomPartCode || "") : null,
          rm_bom_part_desc: formData.SelectItem === "RM" ? (formData.rmDetails.BomPartDesc || "") : null,
          rm_operation: formData.SelectItem === "RM" ? (formData.rmDetails.Operation || "") : null,
          rm_op_no: formData.SelectItem === "RM" ? (formData.rmDetails.OPNo || "") : null,
          rm_bom_part_type: formData.SelectItem === "RM" ? (formData.rmDetails.BOMPartType || "") : null,
        }

        const newItem = {
          ...formData,
          id: newId,
          transactionId: newId,
          ItemName: formData.SelectedItemName,
          item_type: formData.SelectItem,
          ItemDescription: formData.ItemDescription,
          Qty: formData.PoQty,
          Rate: formData.Rate,
          Disc: formData.Disc,
          Unit: formData.Unit,
          Particular: formData.Particular_Process,
          OutAndInPart: outAndInPart,
          Version: "v1.0",
          ItemStatus: "Active",
          CSCode: "",
          Note: ""
        };

        const updatedItems = [...items, newItem]
        setItems(updatedItems)
        updateData(updatedItems)

        try {
          const addResponse = await addTransaction(transactionData)
          if (addResponse && addResponse.id) {
            const updatedItemsWithApiId = updatedItems.map((item) =>
              item.id === newId ? { ...item, id: addResponse.id, transactionId: addResponse.id } : item,
            )
            setItems(updatedItemsWithApiId)
            updateData(updatedItemsWithApiId)
            try {
              const getResponse = await getTransaction(addResponse.id)
              if (getResponse && getResponse.data) {
                const transactionDataFromDb = getResponse.data
                const finalUpdatedItems = updatedItemsWithApiId.map((item) =>
                  item.id === addResponse.id
                    ? {
                      ...item,
                      ...transactionDataFromDb,
                      SelectedItemName: transactionDataFromDb.item_name || item.SelectedItemName,
                      ItemDescription: transactionDataFromDb.item_description || item.ItemDescription,
                    }
                    : item
                )
                setItems(finalUpdatedItems)
                updateData(finalUpdatedItems)
                if (transactionDataFromDb.GST_Details && updateGstData) {
                  updateGstData(transactionDataFromDb.GST_Details)
                }
                if (transactionDataFromDb.Schedule_Line && transactionDataFromDb.Schedule_Line.length > 0 && updateScheduleData) {
                  updateScheduleData(transactionDataFromDb.Schedule_Line)
                }
              }
            } catch (getError) {
              console.error("Error fetching updated transaction:", getError)
            }
            toast.success("Item added successfully!")
          } else {
            throw new Error("No ID returned from add transaction")
          }
        } catch (apiError) {
          console.error("API error:", apiError)
          toast.warning("Item added locally, but API call failed: " + (apiError.message || "Unknown error"))
        }
        clearForm()
      } catch (error) {
        console.error("Error adding item:", error)
        toast.error("Failed to add item: " + (error.message || "Unknown error"))
      }
    }
  }

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditingItem(item.id);
  };

  const handleUpdate = async () => {
    if (validate()) {
      try {
        const outAndInPart = formData.SelectItem === "FG"
          ? `${formData.Out}-${formData.In}`
          : (formData.SelectItem === "RM" && formData.rmDetails.PartCode
            ? `${parentFgName || formData.SelectedItemName} | OP:${formData.rmDetails.OPNo} | ${formData.rmDetails.Operation} | ${formData.rmDetails.PartCode}`
            : formData.Rm);

        const updatedItem = {
          ...formData,
          id: editingItem,
          ItemName: formData.SelectedItemName,
          item_type: formData.SelectItem,
          ItemDescription: formData.ItemDescription,
          Qty: formData.PoQty,
          Rate: formData.Rate,
          Disc: formData.Disc,
          Unit: formData.Unit,
          Particular: formData.Particular_Process,
          OutAndInPart: outAndInPart,
        };

        const updatedItems = items.map((item) =>
          item.id === editingItem ? updatedItem : item
        );

        setItems(updatedItems);
        updateData(updatedItems);

        toast.success("Item updated successfully!");
        clearForm();
        setEditingItem(null);
      } catch (error) {
        console.error("Error updating item:", error);
        toast.error("Failed to update item");
      }
    }
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateData(updatedItems);
    toast.success("Item deleted successfully!");
  };

  const clearForm = () => {
    setFormData({
      SelectItem: "",
      SelectedItemName: "",
      ItemDescription: "",
      Out: "",
      In: "",
      Rm: "",
      Rate: "",
      RType: "",
      Disc: "",
      PoQty: "",
      Unit: "",
      Particular_Process: "",
      SAC: "",
      rmDetails: {},
    });
    setSearchQuery("");
    setRmSearchQuery("");
    setRmSearchResults([]);
    setShowRmDropdown(false);
    setBomItems([]);
    setShowDropdown(false);
    setEditingItem(null);
    setParentFgName(""); // Reset parent FG name
  };

  useEffect(() => {
    if (formData.SelectItem) {
      setSearchQuery("");
      setRmSearchQuery("");
      setBomItems([]);
      setParentFgName("");
      setFormData(prev => ({
        ...prev,
        SelectedItemName: "",
        ItemDescription: "",
        Out: "",
        In: "",
        Rm: "",
        SAC: "",
        Unit: ""
      }));
    }
  }, [formData.SelectItem]);

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="table table-borderless table-hover mb-0" style={{ minWidth: '1200px' }}>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap', width: '220px', minWidth: '220px', padding: '8px 6px' }}>
                      <div className="d-flex justify-content-center align-items-center" style={{ gap: '8px' }}>
                        <span>Select Item:</span>
                        <div className="d-flex align-items-center" style={{ gap: '3px' }}>
                          <input
                            type="radio"
                            name="SelectItem"
                            value="FG"
                            id="fg"
                            checked={formData.SelectItem === "FG"}
                            onChange={handleChange}
                            style={{ cursor: 'pointer', margin: 0 }}
                          />
                          <label htmlFor="fg" className="m-0" style={{ cursor: 'pointer' }}>FG</label>
                        </div>
                        <div className="d-flex align-items-center" style={{ gap: '3px' }}>
                          <input
                            type="radio"
                            name="SelectItem"
                            value="RM"
                            id="rm"
                            checked={formData.SelectItem === "RM"}
                            onChange={handleChange}
                            style={{ cursor: 'pointer', margin: 0 }}
                          />
                          <label htmlFor="rm" className="m-0" style={{ cursor: 'pointer' }}>RM</label>
                        </div>
                      </div>
                    </th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '120px', maxWidth: '200px' }}>Item/Desc</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '100px', maxWidth: '150px' }}>Part Code:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>SAC</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>Rate:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>RType</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>Disc %:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>PO QTY:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '60px', maxWidth: '100px' }}>Unit:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordWrap: 'break-word', minWidth: '100px', maxWidth: '180px' }}>Particular/Process:</th>
                    <th className="text-secondary text-center fw-bold text-uppercase align-middle" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap', minWidth: '60px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-middle">
                    <td className="border-end position-relative" style={{ fontSize: '11px', padding: '8px', minWidth: '180px', maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                      {formData.SelectItem === 'FG' && (
                        <>
                          <textarea name="searchQuery" className="form-control form-control-sm" placeholder="Search FG items..." value={searchQuery} onChange={handleSearch} disabled={loading} rows="3" style={{ resize: 'none', overflowY: 'auto' }} />
                          {loading && <div className="p-1">Loading...</div>}
                          {showDropdown && searchResults.length > 0 && (
                            <ul className="dropdown-menu show" style={{ width: "300px", maxHeight: "200px", overflowY: "auto", whiteSpace: 'normal' }}>
                              {searchResults.map((item) => (
                                <li key={item.part_no} className="dropdown-item py-1" onClick={() => handleSelectItem(item)} style={{ cursor: "pointer", whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                  {item.part_no} - {item.Part_Code} - {item.Name_Description}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                      {formData.SelectItem === 'RM' && (
                        <>
                          <textarea name="rmSearchQuery" className="form-control form-control-sm" placeholder="Search by BomPartCode..." value={rmSearchQuery} onChange={handleRmSearch} disabled={rmLoading || loading} autoComplete="off" rows="3" style={{ resize: 'none', overflowY: 'auto' }} />
                          {(rmLoading || loading) && <div className="p-1">Loading...</div>}
                          {showRmDropdown && rmSearchResults.length > 0 && (
                            <ul className="dropdown-menu show" style={{ width: "350px", maxHeight: "200px", overflowY: "auto", whiteSpace: 'normal' }}>
                              {rmSearchResults.map((item, index) => (
                                <li key={`${item.BomPartCode}-${index}`} className="dropdown-item py-2 border-bottom" onClick={() => handleSelectRmItem(item)} style={{ cursor: "pointer", whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                  <div className="fw-bold">{item.BomPartCode} - {item.BomPartDesc}</div>
                                  <div className="text-muted" style={{ fontSize: "12px" }}>Parent FG: {item.part_no}</div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </td>
                    <td className="border-end position-relative" style={{ fontSize: '11px', padding: '8px', minWidth: '120px', maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                      <textarea
                        className="form-control form-control-sm mt-2"
                        name="ItemDescription"
                        value={formData.ItemDescription}
                        onChange={handleChange}
                        rows="3"
                        style={{ resize: 'none', overflowY: 'auto' }}
                        placeholder="Item description...">
                      </textarea>
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      {formData.SelectItem === "FG" && (
                        <>
                          <select className="form-select form-select-sm mb-2" name="Out" value={formData.Out} onChange={handleChange}>
                            <option value="">Select Out</option>
                            {bomItems.map((item, index) => (<option key={index} value={item.PartCode}>{item.OPNo} | {item.Operation} | {item.PartCode}</option>))}
                          </select>
                          <select className="form-select form-select-sm" name="In" value={formData.In} onChange={handleChange}>
                            <option value="">Select In</option>
                            {bomItems.map((item, index) => (<option key={index} value={item.PartCode}>{item.OPNo} | {item.Operation} | {item.PartCode}</option>))}
                          </select>
                        </>
                      )}
                      {formData.SelectItem === "RM" && (
                        <select className="form-select form-select-sm" name="Rm" value={formData.Rm} onChange={handleChange}>
                          <option value="">{bomItems.length === 0 ? "Search item first" : "Select Part Code"}</option>
                          {bomItems.map((item, index) => (
                            <option key={`${item.PartCode}-${index}`} value={item.PartCode}>
                              {item.PartCode} | {item.OPNo} | {item.Operation}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="text" className="form-control form-control-sm" name="SAC" value={formData.SAC} onChange={handleChange} placeholder="SAC" />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="number" className="form-control form-control-sm" name="Rate" value={formData.Rate} onChange={handleChange} placeholder="Rate" required />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="text" className="form-control form-control-sm" name="RType" value={formData.RType} onChange={handleChange} />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="number" className="form-control form-control-sm" name="Disc" value={formData.Disc} onChange={handleChange} placeholder="Disc %" />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="number" className="form-control form-control-sm" name="PoQty" value={formData.PoQty} onChange={handleChange} placeholder="Qty" required />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <input type="text" className="form-control form-control-sm" name="Unit" value={formData.Unit} onChange={handleChange} placeholder="Unit" />
                    </td>

                    <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}>
                      <textarea className="form-control form-control-sm" name="Particular_Process" value={formData.Particular_Process} onChange={handleChange} rows="2" placeholder="Particulars..."></textarea>
                    </td>

                    <td className="text-center align-middle" style={{ fontSize: '11px', padding: '8px' }}>
                      <button type="button" className="btn btn-sm text-success" onClick={editingItem ? handleUpdate : handleAdd} style={{ backgroundColor: '#ecfdf5' }}>
                        <i className={`fas fa-${editingItem ? 'check' : 'plus'}`}></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card shadow-sm border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div className="table-responsive" style={{ maxHeight: 400 }}>
              <table className="table table-borderless table-hover mb-0">
                <thead className="bg-light border-bottom sticky-top">
                  <tr>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '40px' }}>Sr</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '70px' }}>Item Type</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '180px' }}>Item Name</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '180px' }}>Item Description</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '120px' }}>Part</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '100px' }}>Details</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>SAC</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>Rate</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>RType</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>Disc %</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>QTY</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>Unit</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '120px' }}>Particular</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '60px' }}>Version</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '80px' }}>ItemStatus</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '80px' }}>CS Code</th>
                    <th className="text-secondary text-center fw-bold text-uppercase" style={{ fontSize: '0.65rem', whiteSpace: 'normal', wordBreak: 'break-all', width: '70px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={item.id || index} className="align-middle">
                        <td className="border-end text-center" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '40px' }}>{index + 1}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '70px' }}>{item.item_type || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '180px' }}>{item.ItemName || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '180px' }}>{item.ItemDescription || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px' }}><pre style={{ margin: 0, width: "120px", whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'inherit', fontSize: '12px' }}>{item.OutAndInPart || '-'}</pre></td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '100px' }}>{item.Details || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.SAC || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.Rate || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.RType || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.Disc || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.Qty || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '50px' }}>{item.Unit || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '120px' }}>{item.Particular || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '60px' }}>{item.Version || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '80px' }}>{item.ItemStatus || "-"}</td>
                        <td className="border-end" style={{ fontSize: '11px', padding: '8px', whiteSpace: 'normal', wordBreak: 'break-all', width: '80px' }}>{item.CSCode || "-"}</td>
                        <td className="text-center" style={{ fontSize: '11px', padding: '8px', width: '70px' }}>
                          <div className="d-flex justify-content-center gap-1">
                            <button type="button" className="btn btn-sm text-primary" onClick={() => handleEdit(item)} style={{ backgroundColor: '#eff6ff', padding: '4px' }}>
                              <FaEdit size={14} />
                            </button>
                            <button type="button" className="btn btn-sm text-danger" onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#fef2f2', padding: '4px' }}>
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="17" className="text-center p-4 text-muted">No items added yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkitemdetail;