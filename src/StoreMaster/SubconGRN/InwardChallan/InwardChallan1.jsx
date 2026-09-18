import React, { useState, useEffect } from "react";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Clear as ClearIcon, AddCircleOutline as AddIcon, Calculate as CalculateIcon, Publish as PostIcon, Description as DocsIcon } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardChallan1.css";
import CachedIcon from "@mui/icons-material/Cached";
import { Link } from "react-router-dom";
import { saveInwardChallan } from "../../../Service/StoreApi.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCalculator } from "react-icons/fa";

const today = new Date().toISOString().split("T")[0];
const now = new Date();
const pad2 = (n) => n.toString().padStart(2, "0");

const currentTime = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;

const getInitialItem = () => ({
  item_code: "",
  type: "",
  description: "",
  store: "",
  suppRefNo: "",
  qtyNo: "",
  qtyKg: "",
  process: "",
  pkg: "",
  wRate: "",
});

// *** MODIFIED: Helper function to display all relevant BOM item details ***
// IMPORTANT: Adjust the 'bom.FieldName' parts below to match the actual field names from your new API response.
// *** UPDATED: Helper function to display all relevant BOM item details ***
const formatBomItemForDisplay = (bom) => {
  if (!bom) return "";

  // Parse OutAndInPart string to extract details
  // Format: "FGFG1009 | 53BPA002025 | Antina | OP:10 | BLACK PLATING | RM | RMRM1007"
  const outAndInParts = bom.OutAndInPart ? bom.OutAndInPart.split('|').map(s => s.trim()) : [];

  const partCode = outAndInParts[0] || "N/A";
  const operation = outAndInParts.find(part => part.startsWith('OP:')) || "N/A";
  const bomPartCode = bom.ItemName || "N/A";
  const qtyKg = bom.BOM_QtyKg || "0";
  const scrapCode = outAndInParts[outAndInParts.length - 1] || "N/A";
  const bomPartDesc = bom.ItemDescription || "No Description";

  return `Part: ${partCode} | Op: ${operation} | BOM Part: ${bomPartCode} | Qty: ${qtyKg}Kg | Scrap: ${scrapCode} | Desc: ${bomPartDesc}`;
};

const InwardChallan1 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [gateEntries, setGateEntries] = useState([]);
  const [selectedGateEntry, setSelectedGateEntry] = useState();
  const [challanNumbers, setChallanNumbers] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemList, setShowItemList] = useState(false);
  const [searchItemText, setSearchItemText] = useState("");
  const [selectedItem, setSelectedItem] = useState(getInitialItem());
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedOutWardChallan, setSelectedOutwardChallan] = useState();
  const [PO, setPO] = useState([]);

  const [selectedSeries, setSelectedSeries] = useState("");

  // States for BOM functionality
  const [bomItems, setBomItems] = useState([]);
  const [filteredBomItems, setFilteredBomItems] = useState([]);
  const [showBomList, setShowBomList] = useState(false);
  const [searchBomText, setSearchBomText] = useState("");
  const [selectedBomItem, setSelectedBomItem] = useState(null);

  const fetchGateEntries = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Store/gate-entry/57f4/");
      const resData = await res.json();
      console.log(resData);
      setGateEntries(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchGateEntries();
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  // inward challan
  const [formData, setFormData] = useState({
    InwardF4No: "",
    InwardDate: today,
    InwardTime: currentTime,
    ChallanNo: "",
    ChallanDate: today,
    GateEntryNo: "",
    SupplierName: "",
    OutwardChallanNo: "",
    InvoiceNo: "",
    InvoiceDate: "",
    EWayBillQty: "",
    EWayBillNo: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    PreparedBy: "",
    CheckedBy: "",
    TcNo: "",
    TcDate: "",
    Remark: "",
    DeliveryInTime: "",
    TotalItem: "",
    TotalQtyNo: "",
    TotalQtyKg: "",
    Store: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchInwardF4No = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Store/inward-no");
      if (!res.ok) {
        throw new Error("Failed to fetch Inward F4 No from API");
      }
      const data = await res.json();
      if (data && data.Inward_no) {
        setFormData((prev) => ({
          ...prev,
          InwardF4No: data.Inward_no,
        }));
        toast.success("Inward F4 No fetched successfully!");
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (err) {
      console.error("Error fetching Inward F4 No:", err);
      toast.error("Could not fetch Inward F4 No.");
    }
  };

  const handleSeriesChange = (e) => {
    const value = e.target.value;
    setSelectedSeries(value);

    if (value === "57F4" || value === "57F4 Return") {
      fetchInwardF4No();
    } else {
      setFormData((prev) => ({
        ...prev,
        InwardF4No: "",
      }));
    }
  };

  const handleCheckboxChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DeliveryInTime: value,
    }));
  };

  const handleChallanSelect = (e) => {
    const challanNo = e.target.value;
    const chlln = challanNumbers.find(
      (item) => item.challan_no === challanNo
    );
    setSelectedOutwardChallan(chlln);
    setItems(chlln?.items || []);
    setFormData((prev) => ({
      ...prev,
      OutwardChallanNo: challanNo,
    }));
  };

  // *** MAJOR CHANGE: Switched to the new BOM API and simplified logic ***
  const fetchBomItems = async (itemName) => {
    if (!itemName) return;

    // Reset previous BOM data
    setBomItems([]);
    setFilteredBomItems([]);

    try {
      // Use the new API with the itemName as a query parameter
      const res = await fetch(
        `https://sellerp-backend.onrender.com/Store/get-bom-jobwork/?q=${encodeURIComponent(
          itemName
        )}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch BOM items. Status: ${res.status}`);
      }

      const resData = await res.json();
      console.log("Fetched BOM Data from new API:", resData);

      // Assuming the API returns an array directly or an object with a key containing the array.
      // Adjust 'resData.bom_items' if your API returns the array under a different key.
      const itemsArray = Array.isArray(resData) ? resData : (resData.bom_items || []);

      if (itemsArray.length > 0) {
        toast.success(`${itemsArray.length} BOM items found for "${itemName}"`);
      } else {
        toast.warn(`No BOM items found for "${itemName}"`);
      }

      setBomItems(itemsArray);
      setFilteredBomItems(itemsArray);

    } catch (err) {
      console.error("Error fetching BOM items:", err);
      toast.error("Could not fetch BOM items.");
      setBomItems([]);
      setFilteredBomItems([]);
    }
  };


  const handleSelectItem = (item) => {
    console.log("Selected Main Item:", item);
    setSearchItemText(item?.type || "");
    setSelectedItem({ ...item });
    setShowItemList(false);

    // Reset BOM selection and fetch new BOMs for the selected item
    setBomItems([]);
    setFilteredBomItems([]);
    setSearchBomText("");
    setSelectedBomItem(null);

    // *** CHANGE: Extract only the first word before space or parenthesis ***
    if (item?.type) {
      // Extract first word (e.g., "Antina" from "Antina (RMRM1007 - 53BPA002025 - Antina)")
      const searchTerm = item.type.split(/[\s(]/)[0].trim();
      fetchBomItems(searchTerm);
    }
  };

  function handleItemChange(e) {
    setSearchItemText(e.target.value);
    if (e.target.value.length > 0) {
      const filtered = items.filter((item) => {
        return (
          item.type &&
          item.type.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setFilteredItems(filtered);
      setShowItemList(true);
    } else {
      setShowItemList(false);
    }
  }

  // --- Functions for BOM handling ---
  const handleBomInputFocus = () => {
    if (bomItems.length > 0) {
      setFilteredBomItems(bomItems);
      setShowBomList(true);
    }
  };

  const handleBomInputBlur = () => {
    setTimeout(() => {
      setShowBomList(false);
    }, 200);
  };

  function handleBomSearchChange(e) {
    const searchTerm = e.target.value;
    setSearchBomText(searchTerm);
    if (searchTerm) {
      const filtered = bomItems.filter((bom) => {
        const searchableText = `${bom.ItemDescription || ""} ${bom.ItemName || ""} ${bom.OutAndInPart || ""}`;
        return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredBomItems(filtered);
    } else {
      setFilteredBomItems(bomItems);
    }
    if (!showBomList) {
      setShowBomList(true);
    }
  }

  const handleSelectBomItem = (bomItem) => {
    console.log("Selected BOM Item:", bomItem);
    setSearchBomText(bomItem.ItemName ? `${bomItem.ItemName} - ${bomItem.ItemDescription}` : "Unknown"); // Show detailed data in input
    setSelectedBomItem(bomItem);
    setShowBomList(false);
  };

  const handleAddCombinedItem = () => {
    if (!selectedItem || !selectedItem.item_code) {
      toast.error("Please select a main 'Item Name' first.");
      return;
    }
    if (!selectedBomItem) {
      toast.error("Please select a BOM item from the 'Select' field.");
      return;
    }

    const bomItemString = selectedBomItem.ItemName ? `${selectedBomItem.ItemName} - ${selectedBomItem.ItemDescription}` : "Unknown";
    const combinedDescription = `${bomItemString} / ${selectedItem.description}`;

    const op10Item = bomItems.find(bom => bom.OutAndInPart && bom.OutAndInPart.replace(/\s/g, '').includes('OP:10'));
    const qtyToUse = op10Item ? op10Item.BOM_QtyKg : (selectedBomItem.BOM_QtyKg || "");

    const outAndInParts = selectedBomItem.OutAndInPart ? selectedBomItem.OutAndInPart.split('|').map(s => s.trim()) : [];
    const operation = outAndInParts.find(part => part.startsWith('OP:')) || "";

    const itemToAdd = {
      ...selectedItem,
      description: combinedDescription,
      bom_item_code: selectedBomItem.ItemName || "",
      bom_qty_kg: qtyToUse,
      bal_Qty: "",
      in_Qty: "",
      in_Qty_kg: "",
      op_no: operation,
    };

    const newCurrentItems = [...currentItems, itemToAdd];
    setCurrentItems(newCurrentItems);

    setFormData((prev) => ({
      ...prev,
      TotalItem: newCurrentItems.length.toString(),
    }));

    setSearchBomText("");
    setSelectedBomItem(null);
  };


  const handleAddItem = () => {
    if (!selectedItem || !selectedItem.item_code) return;

    const itemToAdd = {
      ...selectedItem,
      bom_qty_kg: 0,
      bal_Qty: "",
      in_Qty: "",
      in_Qty_kg: "",
    };

    setCurrentItems((prev) => [...prev, itemToAdd]);

    setFormData((prev) => ({
      ...prev,
      TotalItem: (currentItems.length + 1).toString(),
    }));

    setSearchItemText("");
    setSelectedItem(getInitialItem());
  };

  const handleItemDetailChange = (index, fieldName, value) => {
    const updatedItems = [...currentItems];
    const currentItem = updatedItems[index];
    let modifiedItem = { ...currentItem };

    if (fieldName === "bal_Qty") {
      let challanQtyValue = value;
      let challanQtyNum = parseFloat(value) || 0;

      const bomQtyKg = parseFloat(modifiedItem.bom_qty_kg) || 0;
      let calculatedInKg = 0;
      if (bomQtyKg > 0) {
        calculatedInKg = challanQtyNum * bomQtyKg;
      }

      const outQtyLimit = parseFloat(modifiedItem.qtyNo) || 0;

      if (outQtyLimit > 0 && calculatedInKg > outQtyLimit) {
        toast.error(`Calculated weight (${calculatedInKg.toFixed(3)} Kg) cannot exceed Out Qty limit (${outQtyLimit}). Adjusting Challan Qty.`);

        const maxAllowedChallanQty = bomQtyKg > 0 ? Math.floor(outQtyLimit / bomQtyKg) : 0;

        challanQtyValue = maxAllowedChallanQty.toString();

        calculatedInKg = maxAllowedChallanQty * bomQtyKg;
      }

      modifiedItem.bal_Qty = challanQtyValue;
      modifiedItem.in_Qty = challanQtyValue;
      modifiedItem.in_Qty_kg = calculatedInKg.toFixed(3);

    } else {
      modifiedItem[fieldName] = value;
    }

    updatedItems[index] = modifiedItem;
    setCurrentItems(updatedItems);

    const newTotalQtyNo = updatedItems.reduce(
      (sum, item) => sum + (parseFloat(item.bal_Qty) || 0), 0
    );
    const newTotalQtyKg = updatedItems.reduce(
      (sum, item) => sum + (parseFloat(item.in_Qty_kg) || 0), 0
    );

    setFormData((prev) => ({
      ...prev,
      TotalQtyNo: newTotalQtyNo.toString(),
      TotalQtyKg: newTotalQtyKg.toString(),
    }));
  };

  const handleChangeGateEntry = async (e) => {
    const selectedGE_No = e.target.value;
    const entryObj = gateEntries.find(
      (ent) => String(ent.GE_No) === selectedGE_No
    );
    setSelectedGateEntry(entryObj);

    const supplier = entryObj?.Supp_Cust?.replace(/^[^-]*-\s*/, "").trim();

    setFormData((prev) => ({
      ...prev,
      GateEntryNo: selectedGE_No,
      SupplierName: supplier || "",
    }));

    try {
      const res = await fetch(
        "https://sellerp-backend.onrender.com/Sales/supplierview/?supplier=" + supplier
      );
      const resData = await res.json();
      setChallanNumbers(resData.challans || []);

      const res2 = await fetch(
        "https://sellerp-backend.onrender.com/Store/newjobworkpodetails/?supplier=" + supplier
      );
      const resData2 = await res2.json();
      setPO(resData2.purchase_orders || []);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      toast.error("Error fetching supplier data");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.InwardF4No.trim()) {
      newErrors.InwardF4No = "Inward F4 No is required";
    }
    if (!formData.ChallanNo.trim()) {
      newErrors.ChallanNo = "Challan No is required";
    }
    if (!formData.DeliveryInTime) {
      newErrors.DeliveryInTime = "Please select Yes or No for Delivery In Time.";
    }
    if (currentItems.length === 0) {
      newErrors.items = "Please add at least one item before submitting.";
    }
    currentItems.forEach((item, index) => {
      if (!item.bal_Qty || parseFloat(item.bal_Qty) <= 0) {
        newErrors[`item_${index}_bal_qty`] = `Item ${index + 1
          }: Challan Qty is required and must be greater than 0.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function calculateTaxDetails(qty, rate, cgstRate, sgstRate, igstRate) {
    const quantity = Number(qty) || 0;
    const unitRate = Number(rate) || 0;
    const cgstPercent = Number(cgstRate) || 0;
    const sgstPercent = Number(sgstRate) || 0;
    const igstPercent = Number(igstRate) || 0;
    const amount = quantity * unitRate;
    const cgstAmount = (amount * cgstPercent) / 100;
    const sgstAmount = (amount * sgstPercent) / 100;
    const igstAmount = (amount * igstPercent) / 100;
    const totalTax = cgstAmount + sgstAmount + igstAmount;
    const totalAmount = amount + totalTax;
    return {
      amount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalTax,
      totalAmount,
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Use a single toast for multiple errors for cleaner UI
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    try {
      const submissionData = {
        ...formData,
        OutwardChallan: formData.OutwardChallanNo,
        InwardChallanTable: currentItems.map((item) => ({
          OutNo: selectedOutWardChallan?.challan_no || "",
          OutDate: selectedOutWardChallan?.challan_date || "",
          ItemDescription: item.description || "",
          opno: item.op_no || null,
          OutIn: "In",
          Unit: "NOS",
          OutQty: item.qtyNo || "0",
          BalQty: item.bal_Qty || item.qtyNo || "0",
          ChallanQty: item.bal_Qty || item.qtyNo || "0",
          InQtyNOS: item.bal_Qty || item.qtyNo || "0",
          InQtyKg: item.in_Qty_kg || item.qtyKg || "0",
          JwRate: item.wRate || "0",
          heat_no: item.store || "",
        })),
        InwardChallanGSTDetails: currentItems.map((item) => {
          const poItem = PO[0]?.Item_Detail_Enter?.find(
            (po) => po.Item === item.item_code
          );
          const gstDetail = PO[0]?.Gst_Details?.find(
            (gst) => gst.ItemCode === item.item_code
          );
          const qty = item.bal_Qty || item.qtyNo || "0";
          const rate = poItem?.Rate || item.wRate || "0";
          const { amount, cgstAmount, sgstAmount, igstAmount } =
            calculateTaxDetails(
              qty,
              rate,
              gstDetail?.CGST || 0,
              gstDetail?.SGST || 0,
              gstDetail?.IGST || 0
            );
          return {
            ItemCode: item.item_code || "",
            SACCode: "",
            PORate: rate.toString(),
            RateType: "NOS",
            Qty: qty.toString(),
            Discount: poItem?.disc || "0",
            PackAmt: gstDetail?.Packing || "0",
            TransAmt: gstDetail?.Transport || "0",
            AssValue: amount.toString(),
            CGST: cgstAmount.toString(),
            SGST: sgstAmount.toString(),
            IGST: igstAmount.toString(),
          };
        }),
      };

      console.log("Submission Data:", submissionData);
      const result = await saveInwardChallan(submissionData);
      console.log("API Response:", result);

      if (result) {
        toast.success("Data saved successfully!");
        // Reset form
        setFormData({
          InwardF4No: "",
          InwardDate: today,
          InwardTime: currentTime,
          ChallanNo: "",
          ChallanDate: today,
          GateEntryNo: "",
          SupplierName: "",
          OutwardChallanNo: "",
          InvoiceNo: "",
          InvoiceDate: "",
          EWayBillQty: "",
          EWayBillNo: "",
          VehicleNo: "",
          LrNo: "",
          Transporter: "",
          PreparedBy: "",
          CheckedBy: "",
          TcNo: "",
          TcDate: "",
          Remark: "",
          DeliveryInTime: "",
          TotalItem: "",
          TotalQtyNo: "",
          TotalQtyKg: "",
          Store: "",
        });
        setCurrentItems([]);
        setSelectedGateEntry(null);
        setSelectedOutwardChallan(null);
        setItems([]);
        setChallanNumbers([]);
        setPO([]);
        setErrors({});
        setSelectedSeries("");
        setSearchItemText("");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      let errorMessage = "An error occurred while saving data. Please check the console.";
      // Check if the error response has a specific message
      if (error.response && error.response.data) {
        // This structure depends on your backend's error response
        const errorData = error.response.data;
        const messages = Object.values(errorData).flat().join(' ');
        if (messages) {
          errorMessage = messages;
        }
      }
      toast.error(errorMessage);
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedItems = currentItems.filter(
      (_, index) => index !== indexToRemove
    );
    setCurrentItems(updatedItems);

    const newTotalQtyNo = updatedItems.reduce(
      (sum, item) => sum + (parseFloat(item.bal_Qty) || 0), 0
    );
    const newTotalQtyKg = updatedItems.reduce(
      (sum, item) => sum + (parseFloat(item.in_Qty_kg) || 0), 0
    );

    setFormData((prev) => ({
      ...prev,
      TotalItem: updatedItems.length.toString(),
      TotalQtyNo: newTotalQtyNo.toString(),
      TotalQtyKg: newTotalQtyKg.toString(),
    }));
  };

  const calculateGSTTotals = () => {
    let totalAssessableValue = 0;
    let totalCGSTAmount = 0;
    let totalSGSTAmount = 0;
    let totalIGSTAmount = 0;
    let totalAmount = 0;

    const calculatedItems = currentItems.map((item) => {
      const poItem = PO[0]?.Item_Detail_Enter?.find(
        (po) => po.Item === item.item_code
      );
      const gstDetail = PO[0]?.Gst_Details?.find(
        (gst) => gst.ItemCode === item.item_code
      );
      const qty = item.bal_Qty || item.qtyNo || 0;
      const rate = poItem?.Rate || item.wRate || 0;
      const cgstPct = gstDetail?.CGST || 0;
      const sgstPct = gstDetail?.SGST || 0;
      const igstPct = gstDetail?.IGST || 0;

      const {
        amount,
        cgstAmount,
        sgstAmount,
        igstAmount,
        totalAmount: itemTotal,
      } = calculateTaxDetails(qty, rate, cgstPct, sgstPct, igstPct);

      totalAssessableValue += amount;
      totalCGSTAmount += cgstAmount;
      totalSGSTAmount += sgstAmount;
      totalIGSTAmount += igstAmount;
      totalAmount += itemTotal;

      return {
        item,
        poItem,
        gstDetail,
        calculations: {
          amount,
          cgstAmount,
          sgstAmount,
          igstAmount,
          totalAmount: itemTotal,
        },
      };
    });

    return {
      items: calculatedItems,
      totals: {
        totalAssessableValue,
        totalCGSTAmount,
        totalSGSTAmount,
        totalIGST: totalIGSTAmount,
        totalAmount,
      },
    };
  };

  const { items: calculatedItems, totals } = calculateGSTTotals();

  const isRmSelected = Boolean(
    (searchItemText && searchItemText.toLowerCase().includes("rm")) ||
    (selectedItem?.type && selectedItem.type.toLowerCase().includes("rm")) ||
    (selectedItem?.item_code && selectedItem.item_code.toLowerCase().includes("rm")) ||
    (selectedItem?.description && selectedItem.description.toLowerCase().includes("rm"))
  );

  return (
    <div className="NewStoreStoreSubcon">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <div className="StoreSubcon-header mb-4 text-start mt-2">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto text-nowrap">
                      <h5 className="header-title text-start text-nowrap" style={{ fontWeight: 800, fontSize: "1.6rem", whiteSpace: "nowrap", background: "linear-gradient(90deg, #2563eb, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "16px" }}>57-F4 (InWard Challan)</h5>
                    </div>
                    <div className="col text-end">
                      <div className="row justify-content-end align-items-center">
                        <div className="col-auto mb-2">
                          <select id="routingSelect" className="form-select">
                            <option selected>Routing</option>
                            <option value="1">Option 1</option>
                          </select>
                        </div>
                        <div className="col-auto mb-2">
                          <select id="sharpSelect" className="form-select">
                            <option selected>VISHWA S.I.</option>
                          </select>
                        </div>
                        <div className="col-auto text-end px-0 mb-2">
                          <label htmlFor="seriesSelect" className="form-label mb-0 fw-bold">Series:</label>
                        </div>
                        <div className="col-auto mb-2">
                          <select id="seriesSelect" className="form-select" value={selectedSeries} onChange={handleSeriesChange}>
                            <option value="">Select</option>
                            <option value="57F4">57F4</option>
                            <option value="57F4 Return">57F4 Return</option>
                            <option value="Process Loss/Scrap">Process Loss/Scrap</option>
                          </select>
                        </div>
                        <div className="col-auto mb-2">
                          <input type="text" id="inputField" className="form-control" placeholder="Series No." value={formData.InwardF4No} readOnly />
                        </div>
                        <div className="col-auto d-flex mb-2">
                          <Link className="btn btn-primary w-100" to={"/Inward-challan-list"}>Inward Challan List</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StoreSubcon-main mt-4">
                  <div className="storesubcon-background">
                    <div className="container-fluid text-start">
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 fw-bold text-secondary" style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Gate Entry No:</div>
                            <div className="col-md-6">
                              <select
                                id="routingSelect"
                                className="form-select"
                                onChange={handleChangeGateEntry}
                                value={formData.GateEntryNo}
                              >
                                <option value="">Select</option>
                                {gateEntries.map((entry) => (
                                  <option
                                    key={entry.GE_No}
                                    value={entry.GE_No}
                                  >
                                    {entry.GE_No} | Supplier/Vendor :{" "}
                                    {entry.Supp_Cust || ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <CachedIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 fw-bold text-secondary" style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Supplier Name:</div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                value={selectedGateEntry?.Supp_Cust || ""}
                                readOnly
                              />
                            </div>
                            <div className="col-md-2">
                              <button type="button" className="btn btn-primary">Search</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row text-start">
                            <div className="col-md-4">Outward Challan:</div>
                            <div className="col-md-4">
                              <select
                                id="routingSelect"
                                className="form-select"
                                onChange={handleChallanSelect}
                              >
                                <option value="">Select</option>
                                {challanNumbers &&
                                  challanNumbers.length > 0 &&
                                  challanNumbers.map((challan, index) => (
                                    <option
                                      key={index}
                                      value={challan.challan_no}
                                    >
                                      {challan?.challan_no} {challan?.vender}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <button type="button" className="btn btn-primary">Search</button>
                            </div>
                            <div className="col-md-1">
                              <button type="button" className="btn btn-primary">Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <div className="row ">
                            <div className="col-md-4">Item Name :</div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={handleItemChange}
                                value={searchItemText}
                                placeholder="Search for main item..."
                                autoComplete="off"
                              />
                              {showItemList && items.length > 0 && (
                                <ul
                                  className="dropdown-menu show"
                                  style={{
                                    width: "22%",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    zIndex: 1000,
                                  }}
                                >
                                  {filteredItems.map((item, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() => handleSelectItem(item)}
                                      style={{
                                        padding: "2px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {item.type}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddItem}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {isRmSelected && (
                        <div className="row mt-2 ">
                          <div className="col-md-6">
                            <div className="row ">
                              <div className="col-md-4">Select :</div>
                              <div className="col-md-6 position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={handleBomSearchChange}
                                  onFocus={handleBomInputFocus}
                                  onBlur={handleBomInputBlur}
                                  value={searchBomText}
                                  placeholder="Click to select or search..."
                                  disabled={false}
                                  autoComplete="off"
                                />
                                {showBomList && (
                                  <ul
                                    className="dropdown-menu show"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      border: "1px solid #ccc",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredBomItems.length > 0 ? (
                                      filteredBomItems.map((bom, index) => (
                                        <li
                                          key={bom.id || index}
                                          className="dropdown-item"
                                          onMouseDown={() =>
                                            handleSelectBomItem(bom)
                                          }
                                          style={{
                                            padding: "8px 12px",
                                            cursor: "pointer",
                                            whiteSpace: "normal",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          {formatBomItemForDisplay(bom)}
                                        </li>
                                      ))
                                    ) : (
                                      <li
                                        className="dropdown-item disabled"
                                        style={{ padding: "8px 12px" }}
                                      >
                                        {bomItems.length === 0
                                          ? "No BOM items found"
                                          : "No results"}
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                              <div className="col-md-2">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleAddCombinedItem}
                                  disabled={!selectedBomItem}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="StoreSubconstatus mt-5" style={{ width: '100%' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm" style={{ width: '100%', wordBreak: 'break-word', fontSize: '0.85rem' }}>
                          <thead>
                            <tr>
                              <th style={{ width: '3%' }}>Sr no.</th>
                              <th>Out_Date</th>
                              <th>
                                Item Description
                              </th>
                              <th>OP No.</th>
                              <th>Out_In</th>
                              <th>Unit</th>
                              <th>Out_Qty</th>
                              <th>Balance.Qty</th>
                              <th>Challan.Qty</th>
                              <th>In Qty(nos)</th>
                              <th>In Qty(Kg)</th>
                              <th>JWT Rate</th>
                              <th>HC</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {selectedOutWardChallan?.challan_date || ""}
                                </td>
                                <td>
                                    <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                                      {item?.description || ""}
                                    </div>
                                  </td>
                                <td>{item?.op_no || item?.Op_No || item?.opNo || ""}</td>
                                <td>In</td>
                                <td>
                                  <select
                                    name="unit"
                                    className="form-select mb-2"
                                    style={{ width: "100%", minWidth: "60px", padding: "2px" }}
                                    defaultValue="NOS"
                                  >
                                    <option value="NOS">NOS</option>
                                  </select>
                                </td>
                                <td>{item?.qtyNo || ""}</td>
                                <td>{item?.qtyNo || ""}</td>
                                <td>
                                  <input
                                    type="number"
                                    name="bal_Qty"
                                    className="form-control"
                                    value={item.bal_Qty || ""}
                                    onChange={(e) => {
                                      handleItemDetailChange(
                                        index,
                                        "bal_Qty",
                                        e.target.value
                                      );
                                    }}
                                    style={{ width: "100%", minWidth: "60px", padding: "2px" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="in_Qty"
                                    className="form-control"
                                    value={item.in_Qty || ""}
                                    readOnly
                                    style={{ width: "100%", minWidth: "60px", backgroundColor: "#e9ecef", padding: "2px" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="in_Qty_kg"
                                    className="form-control"
                                    value={item.in_Qty_kg || ""}
                                    onChange={(e) => {
                                      handleItemDetailChange(
                                        index,
                                        "in_Qty_kg",
                                        e.target.value
                                      );
                                    }}
                                    style={{ width: "100%", minWidth: "60px", padding: "2px" }}
                                  />
                                </td>
                                <td>{item?.wRate || ""}</td>
                                <td>
                                  <FaCalculator size={20} />
                                </td>
                                <td>
                                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="StoreSubconFooter">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation"><button className="nav-link active" id="pills-Gernal-Detail-tab" data-bs-toggle="pill" data-bs-target="#pills-Gernal-Detail" type="button" role="tab" aria-controls="pills-Gernal-Detail" aria-selected="true" >General Detail</button></li>
                    <li className="nav-item" role="presentation"><button className="nav-link" id="pills-GST-Details-tab" data-bs-toggle="pill" data-bs-target="#pills-GST-Details" type="button" role="tab" aria-controls="pills-GST-Details" aria-selected="false">GST Details</button></li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">

                    <div
                      className="tab-pane fade show active"
                      id="pills-Gernal-Detail"
                      role="tabpanel"
                      aria-labelledby="pills-Gernal-Detail-tab"
                    >
                      <div className="StoreSubconstatus text-start">
                        <div className="container-fluid">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-4 text-start">
                                <div className="container-fluid mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        {/* First Column Group */}
                                        <tr>
                                          <th className="col-md-4">Inward F4 No:</th>
                                          <td>
                                            {/* *** MODIFIED ***: Input field is now readOnly */}
                                            <input
                                              type="text"
                                              name="InwardF4No"
                                              value={formData.InwardF4No}
                                              readOnly
                                              className="form-control"
                                              placeholder="Series series to generate..."
                                              required
                                            />
                                            {errors.InwardF4No && (
                                              <small className="text-danger">
                                                {errors.InwardF4No}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Inward Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InwardDate"
                                              value={formData.InwardDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InwardDate && (
                                              <small className="text-danger">
                                                {errors.InwardDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Inward Time:</th>
                                          <td>
                                            <input
                                              type="time"
                                              name="InwardTime"
                                              value={formData.InwardTime}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InwardTime && (
                                              <small className="text-danger">
                                                {errors.InwardTime}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Challan No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="ChallanNo"
                                              value={formData.ChallanNo}
                                              onChange={handleChange}
                                              className="form-control"
                                              required
                                            />
                                            {errors.ChallanNo && (
                                              <small className="text-danger">
                                                {errors.ChallanNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Challan Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="ChallanDate"
                                              value={formData.ChallanDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.ChallanDate && (
                                              <small className="text-danger">
                                                {errors.ChallanDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Gate Entry No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="GateEntryNo"
                                              value={formData.GateEntryNo}
                                              onChange={handleChange}
                                              className="form-control"
                                              readOnly
                                            />
                                            {errors.GateEntryNo && (
                                              <small className="text-danger">
                                                {errors.GateEntryNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Prepared By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="PreparedBy"
                                              value={formData.PreparedBy}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.PreparedBy && (
                                              <small className="text-danger">
                                                {errors.PreparedBy}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Checked By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="CheckedBy"
                                              value={formData.CheckedBy}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.CheckedBy && (
                                              <small className="text-danger">
                                                {errors.CheckedBy}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                {/* Second Column Group */}
                                <div className="container-fluid mt-4">
                                  <div className="table-responsive text-start">
                                    <div className="table-responsive"><table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th className="col-md-4">Invoice No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InvoiceNo"
                                              value={formData.InvoiceNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InvoiceNo && (
                                              <small className="text-danger">
                                                {errors.InvoiceNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Invoice Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InvoiceDate"
                                              value={formData.InvoiceDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InvoiceDate && (
                                              <small className="text-danger">
                                                {errors.InvoiceDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">E Way Bill Qty:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="EWayBillQty"
                                              value={formData.EWayBillQty}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.EWayBillQty && (
                                              <small className="text-danger">
                                                {errors.EWayBillQty}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">E Way Bill No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="EWayBillNo"
                                              value={formData.EWayBillNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.EWayBillNo && (
                                              <small className="text-danger">
                                                {errors.EWayBillNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Vehicle No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="VehicleNo"
                                              value={formData.VehicleNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.VehicleNo && (
                                              <small className="text-danger">
                                                {errors.VehicleNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Lr No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="LrNo"
                                              value={formData.LrNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.LrNo && (
                                              <small className="text-danger">
                                                {errors.LrNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">TC No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="TcNo"
                                              value={formData.TcNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.TcNo && (
                                              <small className="text-danger">
                                                {errors.TcNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">TC Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="TcDate"
                                              value={formData.TcDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.TcDate && (
                                              <small className="text-danger">
                                                {errors.TcDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-start">
                                {/* Third Column Group */}
                                <div className="container-fluid mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th className="col-md-4">Transporter:</th>
                                          <td>
                                            <textarea
                                              name="Transporter"
                                              value={formData.Transporter}
                                              onChange={handleChange}
                                              className="form-control"
                                              rows="2"
                                            ></textarea>

                                            {errors.Transporter && (
                                              <small className="text-danger">
                                                {errors.Transporter}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Remark:</th>
                                          <td>
                                            <textarea
                                              name="Remark"
                                              value={formData.Remark}
                                              onChange={handleChange}
                                              className="form-control"
                                              rows="2"
                                            ></textarea>

                                            {errors.Remark && (
                                              <small className="text-danger">
                                                {errors.Remark}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Delivery in Time:</th>
                                          <td>
                                            <div className="d-flex gap-3">
                                              <label>
                                                <input
                                                  type="radio"
                                                  name="DeliveryInTime"
                                                  value="yes"
                                                  checked={
                                                    formData.DeliveryInTime ===
                                                    "yes"
                                                  }
                                                  onChange={(e) =>
                                                    handleCheckboxChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />{" "}
                                                Yes
                                              </label>
                                              <label>
                                                <input
                                                  type="radio"
                                                  name="DeliveryInTime"
                                                  value="no"
                                                  checked={
                                                    formData.DeliveryInTime ===
                                                    "no"
                                                  }
                                                  onChange={(e) =>
                                                    handleCheckboxChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />{" "}
                                                No
                                              </label>
                                            </div>
                                            {errors.DeliveryInTime && (
                                              <small className="text-danger">
                                                {errors.DeliveryInTime}
                                              </small>
                                            )}
                                          </td>
                                        </tr>

                                        <tr>
                                          <th className="col-md-4">Total Item:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalItem"
                                              value={formData.TotalItem}
                                              onChange={handleChange}
                                              readOnly
                                            />
                                            {errors.TotalItem && (
                                              <span className="text-danger">
                                                {errors.TotalItem}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Total Qty (No):</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalQtyNo"
                                              value={formData.TotalQtyNo}
                                              onChange={handleChange}
                                              readOnly
                                            />
                                            {errors.TotalQtyNo && (
                                              <span className="text-danger">
                                                {errors.TotalQtyNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Total Qty (Kg):</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalQtyKg"
                                              value={formData.TotalQtyKg}
                                              onChange={handleChange}
                                              readOnly
                                            />
                                            {errors.TotalQtyKg && (
                                              <span className="text-danger">
                                                {errors.TotalQtyKg}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">Store:</th>
                                          <td>
                                            <select
                                              name="Store"
                                              value={formData.Store}
                                              onChange={handleChange}
                                              className="form-select"
                                            >
                                              <option value="">
                                                Select Store
                                              </option>
                                              <option value="Main Store">
                                                Main Store
                                              </option>
                                              <option value="Secondary Store">
                                                Secondary Store
                                              </option>
                                              <option value="Warehouse 1">
                                                Warehouse 1
                                              </option>
                                              <option value="Warehouse 2">
                                                Warehouse 2
                                              </option>
                                            </select>
                                            {errors.Store && (
                                              <span className="text-danger">
                                                {errors.Store}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-4 mb-3">
                              <div className="col-12 d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-primary px-4 py-2 fw-bold">
                                  Save Challan
                                </button>
                                <button type="button" className="btn btn-secondary px-4 py-2 fw-bold" onClick={() => window.location.reload()}>
                                  Clear
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-GST-Details"
                      role="tabpanel"
                      aria-labelledby="pills-GST-Details-tab"
                    >
                      <div className="StoreSubconstatus1">
                        <div className="row ">
                          <div className="col-md-8 d-flex align-items-center" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                            <div className="table-responsive" style={{ width: '100%', overflowX: 'hidden' }}>
                              <table className="table table-bordered" style={{ whiteSpace: 'nowrap', minWidth: '1500px' }}>
                                <thead>
                                  <tr>
                                    <th>Sr</th>
                                    <th>Item Code</th>
                                    <th>SAC Code</th>
                                    <th>PO Rate</th>
                                    <th>Rate Type</th>
                                    <th>Qty</th>
                                    <th>Discount</th>
                                    <th>Pack Amt</th>
                                    <th>TransAmt</th>
                                    <th>Ass Value</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>IGST</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {calculatedItems.map((itemData, index) => {
                                    const {
                                      item,
                                      poItem,
                                      gstDetail,
                                      calculations,
                                    } = itemData;

                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.item_code || ""}</td>
                                        <td></td>
                                        <td>
                                          {poItem?.Rate || item.wRate || ""}
                                        </td>
                                        <td>NOS</td>
                                        <td>
                                          {item?.bal_Qty || item?.qtyNo || "0"}
                                        </td>
                                        <td>{poItem?.disc || "0"}</td>
                                        <td>{gstDetail?.Packing || "0"}</td>
                                        <td>{gstDetail?.Transport || "0"}</td>
                                        <td>
                                          {calculations.amount.toFixed(2)}
                                        </td>
                                        <td>
                                          {calculations.cgstAmount.toFixed(2)}
                                        </td>
                                        <td>
                                          {calculations.sgstAmount.toFixed(2)}
                                        </td>
                                        <td>
                                          {calculations.igstAmount.toFixed(2)}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="Purchaseordertable">
                              <div className="row">
                                <div className="col-md-6 text-start">
                                  {/* Second Column Group */}
                                  <div className="container-fluid mt-4">
                                    <div className="table-responsive text-start">
                                      <div className="table-responsive"><table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th className="col-md-4">TDC Assessable Value:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={totals.totalAssessableValue.toFixed(
                                                  2
                                                )}
                                                readOnly
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">(TDC) Pack & Fwrd Charge:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">TransPort Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">Insurance:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">Installation Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">Other Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 text-start">
                                {/* Third Column Group */}
                                  <div className="container-fluid mt-4">
                                    <div className="table-responsive">
<table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th className="col-md-4">CGST:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                  totals?.totalCGSTAmount?.toFixed(
                                                    2
                                                  ) || "0.00"
                                                }
                                                readOnly
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">SGST:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                  totals?.totalSGSTAmount?.toFixed(
                                                    2
                                                  ) || "0.00"
                                                }
                                                readOnly
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">IGST:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                  totals?.totalIGST?.toFixed(
                                                    2
                                                  ) || "0.00"
                                                }
                                                readOnly
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">TCS:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="0.00"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">GR. Total:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={(
                                                  (totals?.totalAssessableValue ||
                                                    0) +
                                                  (totals?.totalCGSTAmount ||
                                                    0) +
                                                  (totals?.totalSGSTAmount ||
                                                    0) +
                                                  (totals?.totalIGST || 0)
                                                ).toFixed(2)}
                                                readOnly
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">Store:</th>
                                            <td>
                                              <select className="form-select">
                                                <option value="Main Store">
                                                  Main Store
                                                </option>
                                              </select>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <button className="btn btn-primary">
                                                DocTCUpload
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
}

export default InwardChallan1;
