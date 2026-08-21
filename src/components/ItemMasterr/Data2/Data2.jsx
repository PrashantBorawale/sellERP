import CachedIcon from "@mui/icons-material/Cached";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewCardQtyPack from "../ItemGernalCard/NewCardQtyPack.jsx";
import { getQtyPacks } from "../../../Service/Api.jsx";
const Data2 = ({onDataChange}) => {
  const [showNewCardQtypack, setShowNewCardQtypack] = useState(false);

  const handleNewButtonQtypack = (e) => {
    e.preventDefault();
    setShowNewCardQtypack(!showNewCardQtypack);
  };

  const [formData, setFormData] = useState({
    Max_GRN_Qty: "",
    Scrap_Rate: "",
    Machine: "",
    Item_Shelf_Life: "",
    Item_Wip_Wt: "",
    Min_Level: "",
    Inventry_Service: "",
    CPC_Code: "",
    Auxiliary_Factor: "",
    Department: "",
    Mechanical_Std: "",
    Tool_Layout_No: "",
    Is_Service: "",
    Sales_Conversion_Factor: "",
    GRN_Conversion_Factor: "",
    Packing_Cost: "",
    Production_Lead_Time: "",
    Buyer: "",
    Qty_Packing: "",
    Item_Category: "",
    Machine_Weight: "",
    Buffer_Qty: "",
    MOQ: "",
    Max_Level: "",
    BOM_Type: "",
    Product_Category: "",
    Over_Head_Rate: "",
    Valuation_Method: "",
    Dimensional_Std_Reference: "",
    Raw_Material_Grade: "",
    RM_Tolerance: "",
    FG_Std_Cavity: "",
    Design_Cost: "",
    Transport_Cost: "",
    Purchase_Lead_Time: "",
    Business_Head: "",
    Project_Name: "",
    Eoonomical_Batch_Size: "",
    Re_Order_Level: "",
    Pre_Shift_Qty: "",
    Scrap_Item: "",
    Scrap_Qty: "",
    Purchase_GL: "",
    Business_Associate: "",
  });

  const [errors, setErrors] = useState({});

  const [qtyPacks, setQtyPacks] = useState([]);



    // Pass data to parent component whenever it changes
    useEffect(() => {
      if (onDataChange) {
        onDataChange(formData)
      }
    }, [formData, onDataChange])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };



  useEffect(() => {
    fetchQtyPacks();
  }, []);

  const fetchQtyPacks = async () => {
    try {
      const response = await getQtyPacks();
      setQtyPacks(response);
    } catch (error) {
      console.error("Error fetching qty packs:", error);
    }
  };

  return (
    <div className="data-2 gerneral p-3">
      <ToastContainer />
      <div className="container-fluid p-0">
        <form>
          <div className="row">
            <div className="col-sm-4">
              <div className="row text-start">
                <div className="row mb-3">
                  <label
                    htmlFor="Max_GRN_Qty"
                    className="col-sm-5 col-form-label"
                  >
                    Max GRN Qty Limit:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Max_GRN_Qty"
                      name="Max_GRN_Qty"
                      className="form-control"
                      value={formData.Max_GRN_Qty}
                      onChange={handleChange}
                    />
                    {errors.Max_GRN_Qty && (
                      <div className="text-danger">{errors.Max_GRN_Qty}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Scrap_Rate"
                    className="col-sm-5 col-form-label"
                  >
                    Scrap Rate:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Scrap_Rate"
                      name="Scrap_Rate"
                      className="form-control"
                      value={formData.Scrap_Rate}
                      onChange={handleChange}
                    />
                    {errors.Scrap_Rate && (
                      <div className="text-danger">{errors.Scrap_Rate}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Machine" className="col-sm-5 col-form-label">
                    Machine:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Machine"
                      type="text"
                      name="Machine"
                      className="form-select"
                      value={formData.Machine}
                      onChange={handleChange}
                    >
                      <option value="">Select ..</option>
                      <option value="Machine_1">AY CGR 1</option>
                      <option value="Machine_2">Centerless</option>
                      <option value="Machine_3">Grinding 1</option>
                      <option value="Machine_1">AY CGR 2</option>
                      <option value="Machine_2">Centerless</option>
                      <option value="Machine_3">Grinding 2</option>
                      {/* Add other options here */}
                    </select>
                    {errors.Machine && (
                      <div className="text-danger">{errors.Machine}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Item_Shelf_Life"
                    className="col-sm-5 col-form-label text-nowrap"
                  >
                    Item Shelf Life:
                  </label>
                  <div className="col-sm-7 d-flex gap-2 align-items-center">
                    <input
                      id="Item_Shelf_Life"
                      name="Item_Shelf_Life"
                      className="form-control"
                      value={formData.Item_Shelf_Life}
                      onChange={handleChange}
                      type="text"
                    />
                    <span className="text-nowrap" style={{ minWidth: '40px' }}>Days</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Item_Wip_Wt"
                    className="col-sm-5 col-form-label"
                  >
                    Item Wip Wt:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Item_Wip_Wt"
                      className="form-control"
                      name="Item_Wip_Wt"
                      value={formData.Item_Wip_Wt}
                      onChange={handleChange}
                     
                    />
                    {errors.Item_Wip_Wt && (
                      <div className="text-danger">{errors.Item_Wip_Wt}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Min_Level"
                    className="col-sm-5 col-form-label"
                  >
                    Min Level:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      id="Min_Level"
                      name="Min_Level"
                      value={formData.Min_Level}
                      onChange={handleChange}
                     
                    />
                    {errors.Min_Level && (
                      <div className="text-danger">{errors.Min_Level}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    for="Inventry_Service"
                    className="col-sm-5 col-form-label"
                  >
                    Inventry / Non Inventry Service:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      id="Inventry_Service"
                      name="Inventry_Service"
                      value={formData.Inventry_Service}
                      onChange={handleChange}
                     
                    />
                    {errors.Inventry_Service && (
                      <div className="text-danger">
                        {errors.Inventry_Service}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="CPC_Code" className="col-sm-5 col-form-label">
                    CPC Code:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className=" form-control"
                      id="CPC_Code"
                      name="CPC_Code"
                      value={formData.CPC_Code}
                      onChange={handleChange}
                     
                    />
                    {errors.CPC_Code && (
                      <div className="text-danger">{errors.CPC_Code}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    for="Auxiliary_Factor"
                    className="col-sm-5 col-form-label"
                  >
                    Auxiliary Factor:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      id="Auxiliary_Factor"
                      name="Auxiliary_Factor"
                      value={formData.Auxiliary_Factor}
                      onChange={handleChange}
                     
                    />
                    {errors.Auxiliary_Factor && (
                      <div className="text-danger">
                        {errors.Auxiliary_Factor}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    for="Mechanical_Std"
                    className="col-sm-5 col-form-label"
                  >
                    Mechanical Std Reference:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="Mechanical_Std"
                      id="Mechanical_Std"
                      value={formData.Mechanical_Std}
                      onChange={handleChange}
                     
                    />
                    {errors.Mechanical_Std && (
                      <div className="text-danger">{errors.Mechanical_Std}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    for="Tool_Layout_No"
                    className="col-sm-5 col-form-label"
                  >
                    Tool Layout No:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="Tool_Layout_No"
                      id="Tool_Layout_No"
                      value={formData.Tool_Layout_No}
                      onChange={handleChange}
                     
                    />
                    {errors.Tool_Layout_No && (
                      <div className="text-danger">{errors.Tool_Layout_No}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="Is_Service" className="col-sm-5 col-form-label">
                    Is Service:
                  </label>
                  <div className="col-sm-7">
                  <select
                      id="Is_Service"
                      type="text"
                      name="Is_Service"
                      className="form-select"
                      value={formData.Is_Service}
                      onChange={handleChange}
                    >
                      <option selected>Select</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                     
                    </select>
              
                    {errors.Is_Service && (
                      <div className="text-danger">{errors.Is_Service}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Sales_Conversion_Factor"
                    className="col-sm-5 col-form-label text-nowrap"
                  >
                    Sales Conversion Factor:
                  </label>
                  <div className="col-sm-7 d-flex gap-1 align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: '60px' }}
                      name="Sales_Conversion_Factor"
                      id="Sales_Conversion_Factor"
                      value={formData.Sales_Conversion_Factor}
                      onChange={handleChange}
                    />
                    <select
                      id="Sales_Conversion_Factor_Select"
                      type="text"
                      className="form-select flex-grow-1"
                      value={formData.Sales_Conversion_Factor}
                      onChange={handleChange}
                    >
                      <option value="">Select Unit</option>
                      <option value="PCS">PCS</option>
                      <option value="KGS">KGS</option>
                      <option value="BOX">BOX</option>
                      <option value="LTR">LTR</option>
                      <option value="NOS">NOS</option>
                      <option value="SQFT">SQFT</option>
                      <option value="MTR">MTR</option>
                      <option value="FOOT">FOOT</option>
                      <option value="SQMTR">SQMTR</option>
                      <option value="PAIR">PAIR</option>
                      <option value="BAG">BAG</option>
                      <option value="PACKET">PACKET</option>
                      <option value="RIM">RIM</option>
                      <option value="SET">SET</option>
                      <option value="MT">MT</option>
                      <option value="PER DAY">PER DAY</option>
                      <option value="DOZEN">DOZEN</option>
                      <option value="JOB">JOB</option>
                      <option value="SQINCH">SQINCH</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-sm-5 col-form-label text-nowrap"
                    htmlFor="GRN_Conversion_Factor"
                  >
                    GRN Conversion Factor:
                  </label>
                  <div className="col-sm-7 d-flex gap-1 align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: '60px' }}
                      name="GRN_Conversion_Factor"
                      id="GRN_Conversion_Factor"
                      onClick={handleChange}
                      value={formData.GRN_Conversion_Factor}
                    />
                    <select
                      id="GRN_Conversion_Factor_Select"
                      type="text"
                      className="form-select flex-grow-1"
                      value={formData.GRN_Conversion_Factor}
                      onChange={handleChange}
                    >
                      <option value="">Select Logic</option>
                      <option value="1">Standard</option>
                      <option value="2">Alternate</option>
                      <option value="3">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Buyer" className="col-sm-5 col-form-label">
                    Buyer:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="input"
                      className="form-control"
                      name="Buyer"
                      id="Buyer"
                      value={formData.Buyer}
                      onChange={handleChange}
                     
                    />
                    {errors.Buyer && (
                      <div className="text-danger">{errors.Buyer}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row text-start">
                <div className="row mb-3">
                  <label
                    htmlFor="Qty_Packing"
                    className="col-sm-5 col-form-label text-nowrap"
                  >
                    Qty Packing:
                  </label>
                  <div className="col-sm-7 d-flex gap-1 align-items-center">
                    <select
                      id="Qty_Packing"
                      name="Qty_Packing"
                      value={formData.Qty_Packing}
                      onChange={handleChange}
                      className="form-select flex-grow-1"
                    >
                      <option value="">Select ..</option>
                      {qtyPacks.map((item) => (
                        <option key={item.id} value={item.EnterUnit_Name}>
                          {item.EnterUnit_Name}
                        </option>
                      ))}
                      <option value="FG">FG</option>
                      <option value="RM">RM</option>
                    </select>
                    <button
                      className="vndrbtn"
                      type="button"
                      onClick={handleNewButtonQtypack}
                    >
                      New
                    </button>
                    <button
                      type="button"
                      className="vndrbtn ms-2"
                      onClick={fetchQtyPacks}
                      title="Refresh qty packs"
                    >
                      <CachedIcon />
                    </button>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Item_Category"
                    className="col-sm-5 col-form-label"
                  >
                    Item Category:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Item_Category"
                      name="Item_Category"
                      value={formData.Item_Category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select ..</option>
                      <option value="1">All</option>
                      <option value="2">Jobwork</option>
                      <option value="3">Purchase</option>
                      <option value="4">Production</option>
                    </select>
                    {errors.Item_Category && (
                      <div className="text-danger">{errors.Item_Category}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Machine_Weight"
                    className="col-sm-5 col-form-label"
                  >
                    Sales Conversion Factor Weight:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Machine_Weight"
                      name="Machine_Weight"
                      value={formData.Machine_Weight}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Machine_Weight && (
                      <div className="text-danger">{errors.Machine_Weight}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Buffer_Qty"
                    className="col-sm-5 col-form-label"
                  >
                    Buffer Qty %:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Buffer_Qty"
                      name="Buffer_Qty"
                      value={formData.Buffer_Qty}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Buffer_Qty && (
                      <div className="text-danger">{errors.Buffer_Qty}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="MOQ" className="col-sm-5 col-form-label">
                    MOQ:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="MOQ"
                      name="MOQ"
                      value={formData.MOQ}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.MOQ && (
                      <div className="text-danger">{errors.MOQ}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Max_Level"
                    className="col-sm-5 col-form-label"
                  >
                    Max Level:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Max_Level"
                      name="Max_Level"
                      value={formData.Max_Level}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Max_Level && (
                      <div className="text-danger">{errors.Max_Level}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="BOM_Type" className="col-sm-5 col-form-label">
                    BOM Type:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="BOM_Type"
                      name="BOM_Type"
                      value={formData.BOM_Type}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.BOM_Type && (
                      <div className="text-danger">{errors.BOM_Type}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Product_Category"
                    className="col-sm-5 col-form-label"
                  >
                    Product Category:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Product_Category"
                      name="Product_Category"
                      value={formData.Product_Category}
                      onChange={handleChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select ..</option>
                      <option value="1">Standard</option>
                      <option value="2">Special</option>
                    </select>
                    {errors.Product_Category && (
                      <div className="text-danger">
                        {errors.Product_Category}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Over_Head_Rate"
                    className="col-sm-5 col-form-label"
                  >
                    Over Head Rate:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Over_Head_Rate"
                      name="Over_Head_Rate"
                      value={formData.Over_Head_Rate}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Over_Head_Rate && (
                      <div className="text-danger">{errors.Over_Head_Rate}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Valuation_Method"
                    className="col-sm-5 col-form-label"
                  >
                    Valuation Method:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Valuation_Method"
                      name="Valuation_Method"
                      value={formData.Valuation_Method}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Valuation_Method && (
                      <div className="text-danger">
                        {errors.Valuation_Method}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Dimensional_Std_Reference"
                    className="col-sm-5 col-form-label"
                  >
                    Dimensional Std Reference:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Dimensional_Std_Reference"
                      name="Dimensional_Std_Reference"
                      value={formData.Dimensional_Std_Reference}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Dimensional_Std_Reference && (
                      <div className="text-danger">
                        {errors.Dimensional_Std_Reference}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Raw_Material_Grade"
                    className="col-sm-5 col-form-label"
                  >
                    Raw Material Grade:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Raw_Material_Grade"
                      name="Raw_Material_Grade"
                      value={formData.Raw_Material_Grade}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Raw_Material_Grade && (
                      <div className="text-danger">
                        {errors.Raw_Material_Grade}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="RM_Tolerance"
                    className="col-sm-5 col-form-label"
                  >
                    RM Tolerance:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="RM_Tolerance"
                      name="RM_Tolerance"
                      value={formData.RM_Tolerance}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.RM_Tolerance && (
                      <div className="text-danger">{errors.RM_Tolerance}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="FG_Std_Cavity"
                    className="col-sm-5 col-form-label"
                  >
                    FG Std Cavity:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="FG_Std_Cavity"
                      name="FG_Std_Cavity"
                      value={formData.FG_Std_Cavity}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.FG_Std_Cavity && (
                      <div className="text-danger">{errors.FG_Std_Cavity}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Design_Cost"
                    className="col-sm-5 col-form-label"
                  >
                    Design Cost:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Design_Cost"
                      name="Design_Cost"
                      value={formData.Design_Cost}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Design_Cost && (
                      <div className="text-danger">{errors.Design_Cost}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Transport_Cost"
                    className="col-sm-5 col-form-label"
                  >
                    Transport Cost:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Transport_Cost"
                      name="Transport_Cost"
                      value={formData.Transport_Cost}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Transport_Cost && (
                      <div className="text-danger">{errors.Transport_Cost}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row text-start">
                <div className="row mb-3">
                  <label
                    htmlFor="Project_Name"
                    className="col-sm-5 col-form-label"
                  >
                    Project Name:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Project_Name"
                      name="Project_Name"
                      className="form-select"
                      value={formData.Project_Name}
                      onChange={handleChange}
                    >
                      <option value="">select ..</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    {errors.Project_Name && (
                      <div className="text-danger">{errors.Project_Name}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Department"
                    className="col-sm-5 col-form-label"
                  >
                    Department:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Department"
                      name="Department"
                      className="form-select"
                      value={formData.Department}
                      onChange={handleChange}
                    >
                      <option value="">Common Square</option>
                      <option value="1">Ayush</option>
                      <option value="2">Production</option>
                      <option value="3">Purchase</option>
                      <option value="4">Quality</option>
                      <option value="5">Shakambari</option>
                      <option value="6">Store</option>
                    </select>
                    {errors.Department && (
                      <div className="text-danger">{errors.Department}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label
                    htmlFor="Eoonomical_Batch_Size"
                    className="col-sm-5 col-form-label"
                  >
                    Eoonomical Batch Size:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Eoonomical_Batch_Size"
                      name="Eoonomical_Batch_Size"
                      className="form-control"
                     
                      value={formData.Eoonomical_Batch_Size}
                      onChange={handleChange}
                    />
                    {errors.Eoonomical_Batch_Size && (
                      <div className="text-danger">
                        {errors.Eoonomical_Batch_Size}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label
                    htmlFor="Re_Order_Level"
                    className="col-sm-5 col-form-label"
                  >
                    Re-Order Level:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Re_Order_Level"
                      name="Re_Order_Level"
                      className="form-control"
                     
                      value={formData.Re_Order_Level}
                      onChange={handleChange}
                    />
                    {errors.Re_Order_Level && (
                      <div className="text-danger">{errors.Re_Order_Level}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Pre_Shift_Qty"
                    className="col-sm-5 col-form-label"
                  >
                    Pre Shift Qty:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Pre_Shift_Qty"
                      name="Pre_Shift_Qty"
                      className="form-control"
                     
                      value={formData.Pre_Shift_Qty}
                      onChange={handleChange}
                    />
                    {errors.Pre_Shift_Qty && (
                      <div className="text-danger">{errors.Pre_Shift_Qty}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Scrap_Item"
                    className="col-sm-5 col-form-label"
                  >
                    Scrap Item:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Scrap_Item"
                      name="Scrap_Item"
                      className="form-control"
                     
                      value={formData.Scrap_Item}
                      onChange={handleChange}
                    />
                    {errors.Scrap_Item && (
                      <div className="text-danger">{errors.Scrap_Item}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label
                    htmlFor="Scrap_Qty"
                    className="col-sm-5 col-form-label"
                  >
                    Scrap Qty:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Scrap_Qty"
                      name="Scrap_Qty"
                      className="form-control"
                     
                      value={formData.Scrap_Qty}
                      onChange={handleChange}
                    />
                    {errors.Scrap_Qty && (
                      <div className="text-danger">{errors.Scrap_Qty}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Purchase_GL"
                    className="col-sm-5 col-form-label"
                  >
                    Purchase GL:
                  </label>
                  <div className="col-sm-7">
                    <select
                      id="Purchase_GL"
                      name="Purchase_GL"
                      className="form-select"
                      value={formData.Purchase_GL}
                      onChange={handleChange}
                    >
                      <option value="">select ..</option>
                      <option value="1">Services Purchase 18%|16</option>
                      <option value="2">Services Purchase 18%|09</option>
                      <option value="3">Services Purchase|17</option>
                      <option value="4">Purchase RM 28%|02</option>
                    </select>
                    {errors.Purchase_GL && (
                      <div className="text-danger">{errors.Purchase_GL}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Business_Associate"
                    className="col-sm-5 col-form-label"
                  >
                    Business Associate:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Business_Associate"
                      name="Business_Associate"
                      className="form-control"
                     
                      value={formData.Business_Associate}
                      onChange={handleChange}
                    />
                    {errors.Business_Associate && (
                      <div className="text-danger">
                        {errors.Business_Associate}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Purchase_Lead_Time"
                    className="col-sm-5 col-form-label"
                  >
                    Purchase Lead Time (in Days):
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Purchase_Lead_Time"
                      name="Purchase_Lead_Time"
                      value={formData.Purchase_Lead_Time}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Purchase_Lead_Time && (
                      <div className="text-danger">
                        {errors.Purchase_Lead_Time}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="Business_Head"
                    className="col-sm-5 col-form-label"
                  >
                    Business Head:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Business_Head"
                      name="Business_Head"
                      value={formData.Business_Head}
                      onChange={handleChange}
                      className="form-control"
                     
                    />
                    {errors.Business_Head && (
                      <div className="text-danger">{errors.Business_Head}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="Packing_Cost" className="col-sm-5 col-form-label">
                    Packing Cost:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Packing_Cost"
                      value={formData.Packing_Cost}
                      onChange={handleChange}
                      className="form-control"
                      name="Packing_Cost"
                     
                    />
                    {errors.Packing_Cost && (
                      <div className="text-danger">{errors.Packing_Cost}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <label
                    htmlFor="Production_Lead_Time"
                    className="col-sm-5 col-form-label"
                  >
                    Eoonomical Batch Size:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      id="Production_Lead_Time"
                      name="Production_Lead_Time"
                      className="form-control"
                     
                      value={formData.Production_Lead_Time}
                      onChange={handleChange}
                    />
                    {errors.Production_Lead_Time && (
                      <div className="text-danger">
                        {errors.Production_Lead_Time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </form>
      </div>
      {showNewCardQtypack && (
        <div className="RouteCard">
          <div className="new-card-overlay">
            <div className="new-card">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-6 text-start">
                      <h5 className="card-title text-start">
                        Item Sector Master
                      </h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <button
                        className="btn-cl justify-content-end"
                        style={{
                          margin: "5px",
                          color: "gray",
                          border: "none",
                          padding: "10px",
                        }}
                        onClick={handleNewButtonQtypack}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
                <NewCardQtyPack />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Data2;
