import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./OutwardChallan.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modals/Modal.jsx";
import VehicleModal from "../../components/modals/VehicleModal.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const initialItem = {
  item_code: "",
  type: "",
  description: "",
  store: "",
  stock: 0,
  suppRefNo: "",
  qtyNo: "",
  qtyKg: "",
  process: "",
  pkg: "",
  wRate: "",
  wValue: "",
  due_date: "",
  due_days: "",
  challan_due_date: "",
};

const initialFooter = {
  item_code: "",
  Transport_name: "",
  EWay_bill_no: "",
  Eway_bill_Qty: "",
  challan_date: "",
  vehical_no: "",
  eway_bill_date: "",
  remarks: "",
  challan_time: "",
  Estimated_value: "",
  rev_ch_amt: "",
  DC_no: "",
  DC_date: "",
  rev_charges: "N",
  plant: "",
  series: "",
  vender: "",
  due_date: "",
  due_days: "",
  challan_due_date: "",
};

const OutwardChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanNumber, setChallanNumber] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [showTrasportDataModel, setShowTrasportDataModel] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [venders, setVenders] = useState([]);
  const [showVenderList, setShowVenderList] = useState(false);
  const [heatNoData, setHeatNoData] = useState([]);
  const [showHeatNoDropdown, setShowHeatNoDropdown] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("FG");
  const [currentItem, setCurrentItem] = useState({ ...initialItem });
  const [items, setItems] = useState([]);
  const [footerData, setFooterData] = useState({ ...initialFooter });
  const [venderItems, setVenderItems] = useState({
    all_details: [],
  });

  // --- STATE VARIABLES ---
  const [selectedSeries, setSelectedSeries] = useState("Select");
  const [seriesInputValue, setSeriesInputValue] = useState("");
  const [fgFullResponse, setFgFullResponse] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [fgOperations, setFgOperations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showOperationDropdown, setShowOperationDropdown] = useState(false);

  const handleResetAll = () => {
    setCurrentItem(initialItem);
    setItems([]);
    setFooterData(initialFooter);
    setVenderItems({ all_details: [] });
    setSelectedItemType("FG");
    setHeatNoData([]);
    setShowHeatNoDropdown(false);
    setFgOperations([]);
    setShowOperationDropdown(false);
    setSelectedSeries("Select");
    setSeriesInputValue("");
    setChallanNumber("");
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  function filterItemsByKeyword(itemsToFilter = [], keyword) {
    if (!Array.isArray(itemsToFilter) || !keyword) {
      return [];
    }
    const lowercasedKeyword = keyword.toLowerCase();
    return itemsToFilter.filter(
      (item) =>
        (item.ItemName &&
          item.ItemName.toLowerCase().includes(lowercasedKeyword)) ||
        (item.ItemDescription &&
          item.ItemDescription.toLowerCase().includes(lowercasedKeyword)) ||
        (item.item_code &&
          item.item_code.toLowerCase().includes(lowercasedKeyword)) ||
        (item.description &&
          item.description.toLowerCase().includes(lowercasedKeyword)) ||
        (item.OutAndInPart &&
          item.OutAndInPart.toLowerCase().includes(lowercasedKeyword))
    );
  }

  const fetchVenders = async (e) => {
    const query = e.target.value;
    setFooterData((prev) => ({ ...prev, vender: query }));
    if (query.trim().length === 0) {
      setShowVenderList(false);
      setVenders([]);
      return;
    }
    try {
      const res = await fetch(
        `https://sellerp-backend.onrender.com/Purchase/Fetch_Supplier_Code/?search=${query}`
      );
      const json = await res.json();
      setVenders(json);
      setShowVenderList(json.length > 0);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setShowVenderList(false);
    }
  };

  const handleSeriesChange = async (e) => {
    const series = e.target.value;
    setSelectedSeries(series);
    setSeriesInputValue("");
    setChallanNumber("");

    let url = "";
    let numberKey = "";

    const keyMapping = {
      Rework: {
        url: "https://sellerp-backend.onrender.com/Sales/genrate-rework-no",
        key: "Rework_no",
      },
      "57F5": {
        url: "https://sellerp-backend.onrender.com/Sales/generate-challan-no/",
        key: "Challan_no",
      },
      Maintenance: {
        url: "https://sellerp-backend.onrender.com/Sales/generate-challan-no/",
        key: "Challan_no",
      },
    };

    if (keyMapping[series]) {
      url = keyMapping[series].url;
      numberKey = keyMapping[series].key;
    }

    if (url) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`API call failed with status ${res.status}`);
        }
        const data = await res.json();
        const generatedNo = data[numberKey];

        if (generatedNo) {
          setSeriesInputValue(`57(F4) No : ${generatedNo}`);
          setChallanNumber(generatedNo);
          toast.success(`${series} number generated: ${generatedNo}`);
        } else {
          toast.error(`API '${numberKey}' key No number.`);
          console.error("API response missing key:", data);
        }
      } catch (error) {
        console.error("Error fetching series number:", error);
        toast.error("Number generate error.");
      }
    }
  };

  const fetchTransportData = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/transportdetails/");
      const resData = await res.json();
      setTransportData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVehicleDetails = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/vehicaldetails/");
      const resData = await res.json();
      setVehicleData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItemsForVendor = async (vendorName) => {
    if (!vendorName) return;

    try {
      let url = "";
      if (selectedItemType === "FG") {
        url = `https://sellerp-backend.onrender.com/Purchase/jobworkpo/FG/items/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      } else if (selectedItemType === "RM") {
        url = `https://sellerp-backend.onrender.com/Sales/inwardchallanview/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      } else {
        url = `https://sellerp-backend.onrender.com/Sales/inwardchallanview/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      }

      console.log("Fetching items from URL:", url);
      const res = await fetch(url);

      // ✅ FIX: Agar 404 ya koi error aaye to yahi rook jao
      if (!res.ok) {
        console.warn(`Vendor data not found or API error. Status: ${res.status}`);
        setVenderItems({ all_details: [] });
        return;
      }

      const resData = await res.json();
      console.log("API Response for vendor:", resData);

      let finalData = [];
      if (selectedItemType === "FG" && Array.isArray(resData)) {
        finalData = resData.map((item) => ({
          ...item,
          ItemDescription: item.OutAndInPart,
          ItemName: item.ItemName,
          
          type: "FG",
          item_type: "FG",
          Qty: item.Qty,
        }));
      } else if (resData && Array.isArray(resData.all_details)) {
        finalData = resData.all_details;
      } else if (Array.isArray(resData)) {
        finalData = resData;
      }

      setVenderItems({ all_details: finalData });
    } catch (err) {
      console.error("Error fetching items from vendor:", err);
      setVenderItems({ all_details: [] });
    }
  };

  // ✅ FIX: RM API Call (Uses Store Endpoint)
  const fetchHeatNoDataRM = async (itemCode) => {
    if (!itemCode) return;
    try {
      console.log("Fetching RM HeatNo for:", itemCode);

      // ✅ URL Change: Sales hatakar Store kiya hai
      const res = await fetch(
        `https://sellerp-backend.onrender.com/Store/heat-no/?item_code=${encodeURIComponent(itemCode)}`
      );

      if (!res.ok) {
        console.warn("RM API Error or 404");
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        return;
      }

      const resData = await res.json();
      console.log("RM Heat No API Response:", resData);

      // Backend response structure check (kabhi data me hota hai, kabhi direct array)
      const finalData = resData.data || resData;

      if (Array.isArray(finalData) && finalData.length > 0) {
        setHeatNoData(finalData);
        setShowHeatNoDropdown(true);
      } else {
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        toast.warning("No Heat No found for this RM item");
      }
    } catch (err) {
      console.error("Error fetching RM heat no data:", err);
      setHeatNoData([]);
      setShowHeatNoDropdown(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    fetchTransportData();
    fetchVehicleDetails();
  }, [sideNavOpen]);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemSearchChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const searchText = currentItem.type;
    if (!searchText || searchText.trim() === "") {
      setShowFilterDropDown(false);
      return;
    }

    const baseItems =
      venderItems && Array.isArray(venderItems.all_details)
        ? venderItems.all_details
        : [];

    let itemsByType = [];
    if (selectedItemType === "RM") {
      itemsByType = baseItems.filter(
        (item) =>
          item.item_type === "RM" ||
          (item.item_type === null && item.ItemName === "RM")
      );
    } else if (selectedItemType === "FG") {
      itemsByType = baseItems.filter(
        (item) =>
          item.item_type === "FG" ||
          item.ItemType === "FG" ||
          item.type === "FG"
      );
    } else if (selectedItemType === "ITEMMASTER") {
      itemsByType = baseItems;
    }

    const filtered = filterItemsByKeyword(itemsByType, searchText);
    setFilteredItemData(filtered);
    setShowFilterDropDown(filtered.length > 0);
  }, [currentItem.type, selectedItemType, venderItems]);

  const handleAddItem = () => {
    const newItem = {
      ...currentItem,
      item_code: currentItem.item_code || currentItem.type || "",
      type: currentItem.type || currentItem.item_code || "",
      description: currentItem.description || "",
      store: currentItem.store || "",
      pkg: currentItem.pkg || "Y",
      process: currentItem.process || "Y",
      qtyKg: currentItem.qtyKg || "",
      suppRefNo: currentItem.suppRefNo || "",
      wRate: currentItem.wRate || "0.00",
      wValue: currentItem.wValue || "0.00",
    };

    console.log("ADDING ITEM:", newItem);

    // Add into table
    setItems((prev) => [...prev, newItem]);

    toast.success("Item Added Successfully");

    // Reset form
    setCurrentItem({ ...initialItem });

    setHeatNoData([]);
    setShowHeatNoDropdown(false);
    setFgOperations([]);
    setShowOperationDropdown(false);
  };

  const handleDeleteItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleFooterChange = (e) => {
    let { name, value } = e.target;
    if (name === "rev_charges") {
      value = e.target.value === "true" ? "Y" : "N";
    }
    setFooterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChallan = async () => {
    if (items.length <= 0) {
      return toast.error("Add at least one item to create a challan!");
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const nowTimeStr = new Date().toLocaleTimeString("en-GB");

    const formattedItems = items.map((item) => {
      const itemQty = item.qtyNo || item.qtyKg || "0.00";
      const itemStock = item.stock && Number(item.stock) > 0 ? String(item.stock) : String(itemQty || "1000.00");

      return {
        item_code: item.item_code || item.type || "",
        type: item.type || item.item_code || "",
        description: item.description || "",
        store: item.store || item.heat_no || item.HeatNo || "",
        stock: itemStock,
        suppRefNo: String(item.suppRefNo || ""),
        qtyNo: String(item.qtyNo || "0.00"),
        qtyKg: String(item.qtyKg || "0.00"),
        process: item.process || "Y",
        pkg: item.pkg || "Y",
        wRate: String(item.wRate || "0.00"),
        wValue: String(item.wValue || "0.00"),
      };
    });

    const payload = {
      challan_no: challanNumber || footerData.challan_no || "",
      challan_date: footerData.challan_date || todayStr,
      challan_time: footerData.challan_time || nowTimeStr,
      DC_no: footerData.DC_no || "",
      Transport_name: footerData.Transport_name || "",
      vehical_no: footerData.vehical_no || "",
      Estimated_value: String(footerData.Estimated_value || ""),
      DC_date: footerData.DC_date || todayStr,
      EWay_bill_no: footerData.EWay_bill_no || "",
      eway_bill_date: footerData.eway_bill_date || todayStr,
      rev_charges: footerData.rev_charges || "N",
      rec_ch_amt: footerData.rec_ch_amt || footerData.rev_ch_amt || "",
      Eway_bill_Qty: String(footerData.Eway_bill_Qty || ""),
      remarks: footerData.remarks || "",
      plant: footerData.plant || "",
      series: selectedSeries !== "Select" ? selectedSeries : footerData.series || "",
      vender: footerData.vender || "",
      items: formattedItems,
    };

    console.log("Payload to save:", payload);
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/onward-challans/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Backend Validation Error Details:", responseData);
        let errorMsg = `Status ${res.status}`;
        if (responseData) {
          if (typeof responseData === "object") {
            const formatError = (dataObj) => {
              if (Array.isArray(dataObj)) {
                return dataObj.map((item) => (typeof item === "object" ? formatError(item) : String(item))).join(", ");
              }
              if (typeof dataObj === "object" && dataObj !== null) {
                return Object.entries(dataObj)
                  .map(([k, v]) => `${k}: ${formatError(v)}`)
                  .join(" | ");
              }
              return String(dataObj);
            };
            errorMsg = formatError(responseData);
          } else if (typeof responseData === "string") {
            errorMsg = responseData;
          }
        }
        throw new Error(errorMsg);
      }

      console.log("Saved Challan:", responseData);
      toast.success("Challan saved successfully!");
      handleResetAll();
    } catch (err) {
      toast.error(`Save failed: ${err.message || "Failed to save challan"}`);
      console.error("Save failed:", err);
    }
  };

  // --- FIX: Complete fetchAndMapFGData Function ---
  const fetchAndMapFGData = async (itemCode, currentOpNo, firstPartCode) => {
    if (!itemCode) return;

    try {
      const url = `https://sellerp-backend.onrender.com/Sales/heat/?part_no=${encodeURIComponent(itemCode)}`;
      console.log("API URL:", url);

      const res = await fetch(url);
      const resData = await res.json();
      console.log("API RESPONSE:", resData);

      let finalStockData = [];
      const keys = Object.keys(resData);
      if (keys.length > 0) {
        let targetKey = null;
        if (firstPartCode) {
          targetKey = keys.find(k => k.toLowerCase().includes(firstPartCode.toLowerCase()));
        } else {
          targetKey = keys[0];
        }

        if (targetKey) {
          const heatObject = resData[targetKey];
          if (heatObject) {
            Object.entries(heatObject).forEach(([heatNo, stock]) => {
              finalStockData.push({
                heat_no: heatNo,
                stock: stock,
              });
            });
          }
        }
      }

      console.log("FINAL HEAT DATA:", finalStockData);

      if (finalStockData.length > 0) {
        setHeatNoData(finalStockData);
        setShowHeatNoDropdown(true);
        toast.success(`Heat numbers loaded: ${finalStockData.length}`);
      } else {
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        toast.warning("No Heat No Found");
      }
    } catch (err) {
      console.error("Error fetching FG heat data:", err);
      setHeatNoData([]);
      toast.error("Failed to fetch heat data");
    }
  };

  const handleSelectItemFromDropdown = async (item) => {
    if (item) {
      console.log("Raw Item Selected:", item);
      console.log("Selected Item Type:", selectedItemType);

      let cleanCode = "";
      let currentOpNo = 10;

      // --- RM LOGIC ---
      if (selectedItemType === "RM") {

        cleanCode = item.item_code || item.ItemName || "";
        console.log("RM Clean Code:", cleanCode);

        // State Update
        setCurrentItem((prev) => ({
          ...prev,
          type: `${item.ItemDescription || item.description} (${item.ItemName || item.item_code})`,
          description: item.ItemDescription || item.description,
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || item.rate || "",
          process: "",
          store: "",
          stock: ""
        }));

        setShowFilterDropDown(false);


        if (cleanCode) {
          console.log("Calling fetchHeatNoDataRM for:", cleanCode);
          await fetchHeatNoDataRM(cleanCode);
        }
      }
      // --- FG LOGIC ---
      else if (selectedItemType === "FG") {
        console.log("FULL ITEM DATA:", item);
        let rawCode = item.item_code || item.ItemName || "";
        // Extract only the part number (e.g. "FGFG1006" from "FGFG1006 - Toll - CoilPart")
        let cleanCode = rawCode.split(/[\s\-]/)[0].trim();
        let currentOpNo = 10;

        // ===== OP NUMBER =====
        if (item.ItemName && item.ItemName.includes("OP:")) {
          const opMatch = item.ItemName.match(/OP:(\d+)/);
          if (opMatch) {
            currentOpNo = parseInt(opMatch[1]);
          }
        }

        console.log("FINAL ITEM ID FOR API:", cleanCode);
        
        // Get item description (e.g. "chFGFG1006-ADFGFG1006") and extract first part code
        const itemDesc = item.ItemDescription || item.description || item.OutAndInPart || "";
        const firstPartCode = itemDesc.split('-')[0].trim();

        setCurrentItem((prev) => ({
          ...prev,
          type: item.ItemName || item.item_code || "",
          description: item.ItemDescription || item.description || item.ItemName || "",
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || item.rate || "",
          process: `OP ${currentOpNo}`,
          store: "",
          stock: ""
        }));

        setShowFilterDropDown(false);

        // ===== API CALL =====
        if (cleanCode !== "" && cleanCode !== null && cleanCode !== undefined) {
          console.log("FINAL ITEM ID FOR API:", cleanCode);
          await fetchAndMapFGData(cleanCode, currentOpNo, firstPartCode);
        } else {
          console.log("ID extraction failed");
          toast.error("Unable to fetch item id");
        }
      }
      // --- ITEM MASTER LOGIC ---
      else {
        cleanCode = item.item_code || item.ItemName || "";

        setCurrentItem((prev) => ({
          ...prev,
          type: `${item.ItemDescription || item.description} (${item.ItemName || item.item_code})`,
          description: item.ItemDescription || item.description,
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || item.rate || "",
        }));

        setShowFilterDropDown(false);
      }
    }
  };

  const handleSelectVendor = (vendor) => {
    setFooterData((prev) => ({ ...prev, vender: vendor.Name }));
    setShowVenderList(false);
    setVenderItems({ all_details: [] });
    setCurrentItem(initialItem);
    fetchItemsForVendor(vendor.Name);
  };

  const handleHeatChange = (e) => {
    const heatNo = e.target.value;
    const selectedData = heatNoData.find((item) => item.heat_no === heatNo);
    if (selectedData) {
      setCurrentItem((prev) => ({
        ...prev,
        store: selectedData.heat_no,
        stock: selectedData.stock,
      }));
    } else {
      setCurrentItem((prev) => ({
        ...prev,
        store: "",
        stock: "",
      }));
    }
  };

  const handleSelectHeatNo = (item) => {
    setCurrentItem({
      ...currentItem,
      store: item.heat_no,
      stock: item.stock,
      qcStock: item.qc_stock,
    });
    setShowHeatNoDropdown(false);
  };

  const handleStoreFieldClick = async () => {
    if (selectedItemType === "FG") {
      if (heatNoData.length > 0) setShowHeatNoDropdown(true);
      return;
    }

    if (!currentItem.store || currentItem.store.trim() === "") {
      console.warn("Store input is empty, skipping API call");
      return;
    }

    try {
      const query = encodeURIComponent(currentItem.store);
      const response = await axios.get(
        `https://sellerp-backend.onrender.com/Store/heat-no/?selected_value=${query}`
      );
      setHeatNoData(response.data.data || []);
      setShowHeatNoDropdown(true);
    } catch (error) {
      console.error("Error fetching Heat No:", error);
    }
  };

  const handleSelectTransportName = (item) => {
    if (item) {
      setFooterData((prev) => ({
        ...prev,
        Transport_name: item.transport_name,
      }));
      setShowTrasportDataModel(false);
    }
  };

  const handleSelectVehicle = (item) => {
    setFooterData((prev) => ({ ...prev, vehical_no: item.vehical_no }));
    setShowVehicleModal(false);
  };

  const handleTransportSaveButtonClick = (transport_name, eway_bill_no) => {
    if (transport_name && eway_bill_no) {
      setFooterData((prev) => ({
        ...prev,
        Transport_name: transport_name,
        EWay_bill_no: eway_bill_no,
      }));
    }
    setShowTrasportDataModel(false);
  };

  const handleVehicleSave = (data) => {
    if (data) {
      setFooterData((prev) => ({ ...prev, vehical_no: data }));
    }
    setShowVehicleModal(false);
  };

  const handleQtyChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setCurrentItem((prev) => ({ ...prev, qtyNo: "" }));
      return;
    }

    const enteredQty = Number(value);
    const availableStock = Number(currentItem.stock || 0);

    if (availableStock <= 0) {
      toast.warning("Stock is not available or the Heat Number has not been selected.");
      return;
    }

    if (enteredQty > availableStock) {
      toast.error(`Quantity available stock (${availableStock}) It cannot be more than that !!`);
      return;
    }
    setCurrentItem((prev) => ({ ...prev, qtyNo: value }));
  };

  // Updated function to handle operation selection and map data correctly
  // eslint-disable-next-line no-unused-vars
  const handleSelectOperation = (selectedOp) => {
    console.log("User Selected:", selectedOp);

    let finalStockData = [];

    if (!fgFullResponse) return;

    if (selectedOp.source === "heat_qty_summary") {
      // Case: OP 10 selected
      finalStockData = fgFullResponse.heat_qty_summary.map((item) => ({
        heat_no: item.HeatNo,
        stock: item.Qty,
        qc_stock: 0,
      }));
    } else if (selectedOp.sourceKey) {
      // Case: OP 20, 30, 45, etc. selected
      // Use the key we stored earlier (e.g., "10|...")
      const dataList = fgFullResponse.production_summary[selectedOp.sourceKey];

      if (dataList && Array.isArray(dataList)) {
        finalStockData = dataList.map((item) => ({
          heat_no: item.lot_no || item.HeatNo || "N/A",
          stock: item.prod_qty || item.Qty || 0,
          qc_stock: 0,
        }));
      }
    }

    // Update State to show Heat No Dropdown
    if (finalStockData.length > 0) {
      setHeatNoData(finalStockData);
      setShowHeatNoDropdown(true);

      // Auto-fill input with the selected Operation Name
      setCurrentItem((prev) => ({
        ...prev,
        process: selectedOp.label, // e.g., "OP 20"
        store: "", // Clear old values
        stock: "",
      }));

      toast.success(`${selectedOp.label} Stock Loaded`);
    } else {
      setHeatNoData([]);
      setShowHeatNoDropdown(false);
      toast.warning(`No stock data in ${selectedOp.label}`);
    }

    setShowOperationDropdown(false);
  };

  // --- NEW CODE START ---
  useEffect(() => {
    if (footerData.vender) {
      console.log("Type changed to:", selectedItemType, "- Refetching items...");
      setVenderItems({ all_details: [] });
      setCurrentItem((prev) => ({ ...prev, type: "", description: "" }));
      fetchItemsForVendor(footerData.vender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemType]);

  return (
    <div className="OutwardChallanMaster">
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
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="OutwardChallan">
                  <div className="OutwardChallan-header mb-3 text-start">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="header-title mb-0">Outward Challan</h5>
                      <div className="d-flex gap-2 align-items-center">
                          <Link
                            type="button"
                            className="vndrbtn"
                            to="/OutwardChallanList"
                          >
                            OutwardChallanList
                          </Link>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-4">
                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Plant:</label>
                          <select
                            className="form-select form-select-sm header-plant-select"
                            style={{ width: "100px" }}
                          >
                            <option>ProduLink</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label htmlFor="series-select" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>
                            Series:
                          </label>
                          <select
                            id="series-select"
                            className="form-select form-select-sm"
                            value={selectedSeries}
                            onChange={handleSeriesChange}
                            style={{ width: "130px" }}
                          >
                            <option value="Select">Select</option>
                            <option value="57F5">57F4</option>
                            <option value="Rework">Rework</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="OPEN">OPEN</option>
                            <option value="Not For Bill">Not For Bill</option>
                            <option value="Tool And Die">Tool And Die</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>No:</label>
                          <input
                            type="text"
                            placeholder="##"
                            className="form-control form-control-sm bg-light"
                            value={seriesInputValue}
                            readOnly
                            style={{ width: "80px" }}
                          />
                        </div>

                        <div className="d-flex flex-column gap-1 align-items-start position-relative">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Vendor:</label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="text"
                              placeholder="Enter Name"
                              className="form-control form-control-sm"
                              onChange={fetchVenders}
                              value={footerData.vender}
                              autoComplete="off"
                              style={{ width: "180px" }}
                            />
                            {showVenderList && venders && venders.length > 0 && (
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  width: "250px",
                                  maxHeight: "250px",
                                  overflowY: "auto",
                                  border: "1px solid #ced4da",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                  zIndex: 1050,
                                  position: "absolute",
                                  top: "100%",
                                  left: "0",
                                  padding: "4px 0",
                                  backgroundColor: "#fff"
                                }}
                              >
                                {venders.map((item) => (
                                  <li
                                    key={item.id || item.Number}
                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                    onClick={() => handleSelectVendor(item)}
                                    style={{
                                      padding: "10px 15px",
                                      cursor: "pointer",
                                      fontSize: "13px",
                                      borderBottom: "1px solid #f8f9fa",
                                      transition: "background-color 0.2s"
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f7ff")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                  >
                                    <div>
                                      <div style={{ fontWeight: "600", color: "#333" }}>{item.Name}</div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <button
                              type="button"
                              className="vndrbtn"
                            >
                              Select
                            </button>
                            <button
                              type="button"
                              className="vndrbtn"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="OutwardChallan-main">
                    <div className="OutwardChallan-tabs">
                      <div
                        className="tab-content"
                        id="productionEntryTabsContent"
                      >
                        <div className="d-flex align-items-center gap-4 mb-2 p-2 bg-light border rounded">
                          <span className="fw-bold text-secondary" style={{ fontSize: "13px" }}>Select Item Type:</span>
                          <div className="d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              id="fg"
                              name="itemTypeSelection"
                              value="FG"
                              checked={selectedItemType === "FG"}
                              onChange={(e) =>
                                setSelectedItemType(e.target.value)
                              }
                            />
                            <label htmlFor="fg" className="mb-0" style={{ fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>FG</label>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              id="rm"
                              name="itemTypeSelection"
                              value="RM"
                              checked={selectedItemType === "RM"}
                              onChange={(e) =>
                                setSelectedItemType(e.target.value)
                              }
                            />
                            <label htmlFor="rm" className="mb-0" style={{ fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>RM</label>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <input
                              type="radio"
                              id="itemmaster"
                              name="itemTypeSelection"
                              value="ITEMMASTER"
                              checked={
                                selectedItemType === "ITEMMASTER"
                              }
                              onChange={(e) =>
                                setSelectedItemType(e.target.value)
                              }
                            />
                            <label htmlFor="itemmaster" className="mb-0 text-nowrap" style={{ fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                              ITEM MASTER
                            </label>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="align-middle text-start">
                                  Item Code
                                </th>
                                <th className="align-middle text-start">
                                  Item Desc.
                                </th>
                                <th className="align-middle text-start">
                                  Store
                                </th>
                                <th className="align-middle text-start">
                                  Quantity
                                </th>
                                <th className="align-middle text-start">
                                  Process/Operation
                                </th>
                                <th className="align-middle text-start">
                                  Package
                                </th>
                                <th className="align-middle text-start">
                                  Value
                                </th>
                                <th className="align-middle text-start"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    name="type"
                                    className="form-control form-control-sm"
                                    placeholder="Enter Item Name | Code"
                                    value={currentItem.type}
                                    onChange={handleItemSearchChange}
                                    autoComplete="off"
                                  />
                                  {showFilterDropDown &&
                                    filteredItemData.length > 0 && (
                                      <ul
                                        className="dropdown-menu show"
                                        style={{
                                          width: "30%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          border: "1px solid #ccc",
                                          zIndex: 1000,
                                          position: "absolute",
                                        }}
                                      >
                                        {filteredItemData.map((item, index) => (
                                          <li
                                            key={
                                              item.id || item.ItemName || index
                                            }
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleSelectItemFromDropdown(item)
                                            }
                                            style={{
                                              padding: "8px",
                                              cursor: "pointer",
                                              borderBottom: "1px solid #f0f0f0",
                                            }}
                                          >
                                            <strong>
                                               {item.ItemName || item.item_code}
                                            </strong>
                                            <br />
                                            <small>
                                              Code:{" "}
                                               {item.ItemDescription || item.description}
                                            </small>
                                            <br />
                                            <small>
                                              Rate:{" "}
                                              {item.Rate || item.rate || "N/A"}
                                            </small>
                                            {item.Qty && (
                                              <>
                                                <br />
                                                <small>Qty: {item.Qty}</small>
                                              </>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </td>
                                <td>
                                  <textarea
                                    name="description"
                                    className="form-control form-control-sm"
                                    value={currentItem.description}
                                    onChange={handleItemChange}
                                    readOnly
                                  />
                                </td>

                                <td className="position-relative">
                                   {(selectedItemType === "RM" || selectedItemType === "FG") ? (
                                     <div>
                                       <select
                                         name="store"
                                         className="form-control form-control-sm mb-1"
                                         value={currentItem.store}
                                         onChange={handleHeatChange}
                                       >
                                         <option value="">Select Heat No</option>
                                         {heatNoData.map((item, index) => (
                                           <option key={index} value={item.heat_no}>
                                             {item.heat_no} : {item.stock}
                                           </option>
                                         ))}
                                       </select>
                                       <input
                                         type="text"
                                         name="stock"
                                         className="form-control form-control-sm mb-1"
                                         placeholder="Stock"
                                         value={currentItem.stock}
                                         readOnly
                                       />
                                     </div>
                                   ) : (
                                     <div>
                                       <input
                                         type="text"
                                         name="store"
                                         className="form-control form-control-sm mb-1"
                                         placeholder="Store/Code"
                                         value={currentItem.store}
                                         onChange={handleItemChange}
                                       />
                                       <input
                                         type="text"
                                         name="stock"
                                         className="form-control form-control-sm mb-1"
                                         placeholder="Stock"
                                         value={currentItem.stock}
                                         onChange={handleItemChange}
                                       />
                                     </div>
                                   )}
                                  <div className="mt-2">
                                    <label>Supp. Ref. No:</label>
                                    <input
                                      type="text"
                                      name="suppRefNo"
                                      className="form-control form-control-sm"
                                      value={currentItem.suppRefNo}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <div className="mb-2">
                                    <label>No:</label>
                                    <input
                                      type="text"
                                      name="qtyNo"
                                      className="form-control form-control-sm"
                                      value={currentItem.qtyNo}
                                      onChange={handleQtyChange}
                                    />
                                  </div>
                                  <div>
                                    <label>Kg:</label>
                                    <input
                                      type="text"
                                      name="qtyKg"
                                      className="form-control form-control-sm"
                                      value={currentItem.qtyKg}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <textarea
                                    name="process"
                                    className="form-control form-control-sm"
                                    value={currentItem.process}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name="pkg"
                                    className="form-control form-control-sm"
                                    value={currentItem.pkg}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <div className="mb-2">
                                    <label>W. Rate:</label>
                                    <input
                                      type="text"
                                      name="wRate"
                                      className="form-control form-control-sm"
                                      value={currentItem.wRate}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                  <div>
                                    <label>W. Value:</label>
                                    <input
                                      type="text"
                                      name="wValue"
                                      className="form-control form-control-sm"
                                      value={currentItem.wValue}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="vndrbtn"
                                    onClick={handleAddItem}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive">
                          <table className="table compact-table">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Heat Code</th>
                                <th>Qty</th>
                                <th>WIP Wt.</th>
                                <th>Total Wt.</th>
                                <th>Process Name</th>
                                <th>Pkg</th>
                                <th>Value</th>
                                <th>Del</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((it, idx) => (
                                <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>{it.item_code}</td>
                                  <td style={{ maxWidth: "300px", wordBreak: "break-all", whiteSpace: "normal" }}>
                                    {it.type} <br />
                                    {it.description}
                                  </td>
                                  <td className="text-start">
                                    Heat-Code : {it.store} <br />
                                    Supp. Ref. NO : {it.suppRefNo}
                                  </td>
                                  <td>{it.qtyNo}</td>
                                  <td>{it.qtyKg}</td>
                                  <td></td>
                                  <td>{it.process}</td>
                                  <td>{it.pkg}</td>
                                  <td>
                                    Rate: {it.wRate}
                                    <br />
                                    Value: {it.wValue}
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        border: "1px solid black",
                                        padding: "2px 6px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleDeleteItem(idx)}
                                    >
                                      X
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              {items.length === 0 && (
                                <tr>
                                  <td>1</td>
                                  <td></td>
                                  <td>
                                    <span>HSN Code :</span>{" "}
                                  </td>
                                  <td className="text-start">
                                    Supp. Ref. NO :
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span
                                      style={{
                                        border: "1px solid black",
                                        padding: "2px 6px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      X
                                    </span>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table 
                              className="table mb-0 compact-table" 
                              style={{ 
                                tableLayout: "auto", 
                                width: "100%" 
                              }}
                            >
                              <tbody style={{ verticalAlign: "middle" }}>
                                <tr>
                                  <td>Challan No:</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={challanNumber}
                                      readOnly
                                    />
                                  </td>
                                  <td>Transport Name:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="Transport_name"
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.Transport_name}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowTrasportDataModel(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill No:</td>
                                  <td>
                                    <input
                                      name="EWay_bill_no"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={footerData.EWay_bill_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>EWay Bill Qty:</td>
                                  <td>
                                    <input
                                      name="Eway_bill_Qty"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={footerData.Eway_bill_Qty}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Challan Due Date :</td>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control form-control-sm"
                                      name="challan_due_date"
                                      value={footerData.challan_due_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>Challan Date:</td>
                                  <td>
                                    <input
                                      name="challan_date"
                                      type="date"
                                      className="form-control form-control-sm"
                                      value={footerData.challan_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Vehicle No:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="vehical_no"
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.vehical_no}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowVehicleModal(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill Date:</td>
                                  <td>
                                    <input
                                      name="eway_bill_date"
                                      type="date"
                                      className="form-control form-control-sm"
                                      value={footerData.eway_bill_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td rowSpan="2">Remarks / Note:</td>
                                  <td rowSpan="2">
                                    <textarea
                                      name="remarks"
                                      className="form-control form-control-sm"
                                      value={footerData.remarks}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td rowSpan="2">Select Work Order:</td>
                                  <td rowSpan="2">
                                    <select className="form-control form-control-sm">
                                      <option> Select Work Order </option>
                                    </select>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Challan Time:</td>
                                  <td>
                                    <input
                                      name="challan_time"
                                      type="time"
                                      className="form-control form-control-sm"
                                      value={footerData.challan_time}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Estimated Value:</td>
                                  <td>
                                    <input
                                      name="Estimated_value"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={footerData.Estimated_value}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev. Charges:</td>
                                  <td>
                                    <select
                                      name="rev_charges"
                                      className="form-control form-control-sm"
                                      value={
                                        footerData.rev_charges === "Y"
                                          ? "true"
                                          : "false"
                                      }
                                      onChange={handleFooterChange}
                                    >
                                      <option value="false">No</option>
                                      <option value="true">Yes</option>
                                    </select>
                                  </td>
                                </tr>

                                <tr>
                                  <td> D.C No:</td>
                                  <td>
                                    <input
                                      name="DC_no"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={footerData.DC_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>DC Date:</td>
                                  <td>
                                    <input
                                      name="DC_date"
                                      type="date"
                                      className="form-control form-control-sm"
                                      value={footerData.DC_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev.Ch.Amt:</td>
                                  <td>
                                    <input
                                      name="rev_ch_amt"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={footerData.rev_ch_amt}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Ship To Add Code :</td>
                                  <td>
                                    <select className="form-select">
                                      <option> </option>
                                    </select>
                                  </td>
                                  <td colSpan={2}>
                                    <button
    className="vndrbtn"
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={handleSaveChallan}
  >
                                      Save Challan
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-5 text-start">
                        <div className="col-md-3">
                          <label htmlFor=" "> Assessable Value : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.assessable_value}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> CGST :</label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.cgst}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> SGST :</label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.sgst}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> IGST : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.igst}
                            onChange={handleFooterChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-2 text-start">
                        <div className="col-md-3">
                          <label htmlFor=" "> Grand Total : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.grand_total}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> LR No. : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.lr_no}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> LR Date : </label>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-control form-control-sm"
                            name="Vendor"
                            value={footerData.lr_date}
                            onChange={handleFooterChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <Modal
            isOpen={showTrasportDataModel}
            items={transportData}
            onClose={() => setShowTrasportDataModel(false)}
            handleSelect={handleSelectTransportName}
            handleButtonClick={handleTransportSaveButtonClick}
          ></Modal>

          <VehicleModal
            isOpen={showVehicleModal}
            items={vehicleData}
            onClose={() => setShowVehicleModal(false)}
            handleSelect={handleSelectVehicle}
            handleButtonClick={handleVehicleSave}
          ></VehicleModal>
        </div>
      </div>
    </div>
  );
};

export default OutwardChallan;
