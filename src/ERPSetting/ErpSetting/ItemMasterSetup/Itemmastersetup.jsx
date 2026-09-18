import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Tab, Tabs } from "react-bootstrap"; // Import Tabs and Tab
import "./Itemmastersetup.css";
import { Link } from "react-router-dom";

const Itemmastersetup = () => {
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

  const formFields = {
    column1: [
      { id: "mainGroup", label: "Main Group" },
      { id: "itemPartNo", label: "Item / Part No" },
      { id: "unitCode", label: "Unit Code" },
      { id: "tdc", label: "TDC" },
      { id: "itemPartCode", label: "Item/Part Code" },
      { id: "cutWeight", label: "Cut Weight (Kg)" },
      { id: "revisionNo", label: "Revision No" },
      { id: "itemSize", label: "Item Size" },
      { id: "heatTreatment", label: "Heat Treatment" },
      { id: "colorCode", label: "Color Code" },
      { id: "minRate", label: "Min Rate" },
      { id: "vaRate1", label: "VA Rate 1" },
      { id: "length", label: "Length (MM)" },
      { id: "shape", label: "Shape" },
    ],
    column2: [
      { id: "itemGroup", label: "Item Group" },
      { id: "nameDescription", label: "Name / Description" },
      { id: "storeLocation", label: "Store Location" },
      { id: "route", label: "ROUTE" },
      { id: "parentFGCode", label: "Parent FG Code" },
      { id: "finishWeight", label: "Finish Weight( Kg)" },
      { id: "sacCode", label: "SAC Code" },
      { id: "itemSection", label: "Item Section" },
      { id: "hardness", label: "Hardness (BHN)" },
      { id: "make", label: "Make" },
      { id: "maxRate", label: "Max Rate" },
      { id: "vaRate2", label: "VA Rate 2" },
      { id: "thickness", label: "Thickness" },
      { id: "diameter", label: "Diameter" },
    ],
    column3: [
      { id: "grade", label: "Grade" },
      { id: "subgroup", label: "Subgroup" },
      { id: "hsnSacCode", label: "HSN/SAC Code" },
      { id: "toolDieLife", label: "Tool/Die Life" },
      { id: "parentToolCode", label: "Parent Tool Code" },
      { id: "grossWeight", label: "Gross Weight(Kg)" },
      { id: "sector", label: "Sector" },
      { id: "resharpening", label: "No of Resharpening/Reconditioning" },
      { id: "itemClass", label: "Item Class" },
      { id: "qcApplicable", label: "QC Applicable" },
      { id: "jommy", label: "Jommy (for RM)" },
      { id: "microstructure", label: "Microstructure" },
      { id: "drawingNo", label: "Drawing No" },
      { id: "oldErpCode", label: "Old ERP Code" },
    ],

    column4: [
      { id: "maxGrnQty", label: "Max GRN Qty Limit" },
      { id: "scrapRate", label: "Scrap Rate" },
      { id: "machine", label: "Machine" },
      { id: "itemShelfLife", label: "Item Shelf Life" },
      { id: "itemWipWt", label: "Item Wip Wt" },
      { id: "minLevel", label: "Min Level" },
      { id: "inventory", label: "Inventory / Non Inventory Service" },
      { id: "cpcCode", label: "CPC Code" },
      { id: "auxFactor", label: "Auxiliary Factor" },
      { id: "department", label: "Department" },
      { id: "mechStdRef", label: "Mechanical Std Reference" },
      { id: "toolLayout", label: "Tool Layout No" },
      { id: "salesConversion", label: "Sales Conversion Factor" },
      { id: "purchaseGL", label: "Purchase GL" },
      { id: "salesGL", label: "Sales GL" },
      { id: "perShiftQty", label: "Per Shift Qty" },
    ],
    column5: [
      { id: "qtyPacking", label: "Qty. Packing" },
      { id: "itemCategory", label: "Item Category" },
      { id: "machinedWeight", label: "Machined Weight" },
      { id: "bufferQty", label: "Buffer Qty %" },
      { id: "moq", label: "MOQ" },
      { id: "maxLevel", label: "Max Level" },
      { id: "bomType", label: "BOM Type" },
      { id: "productCategory", label: "Product Category" },
      { id: "overHeadRate", label: "Over Head Rate" },
      { id: "valuationMethod", label: "Valuation Method" },
      { id: "dimStdRef", label: "Dimensional Std Reference" },
      { id: "rawMaterialGrade", label: "Raw Material Grade" },
      { id: "grnConversion", label: "GRN Conversion Factor" },
      { id: "packingCost", label: "Packing Cost" },
      { id: "rmTolerance", label: "RM Tolerance" },
      { id: "scrapItem", label: "Scrap Item" },
    ],
    column6: [
      { id: "projectName", label: "Project Name" },
      { id: "department2", label: "Department" },
      { id: "batchSize", label: "Economical Batch Size" },
      { id: "safetyStock", label: "Safety Stock" },
      { id: "reorderLevel", label: "Re-Order Level" },
      { id: "cutWeight2", label: "Cut Weight 2" },
      { id: "bomInputType", label: "Bom Input Type" },
      { id: "costRef", label: "CostRef" },
      { id: "seDrawingNo", label: "SE Drawing No" },
      { id: "seRevNo", label: "SE Rev. No" },
      { id: "isService", label: "Is Service" },
      { id: "designCost", label: "Design Cost" },
      { id: "transportCost", label: "Transport Cost" },
      { id: "fgStdCavity", label: "FG Std Cavity" },
      { id: "scrapQty", label: "Scrap Qty" },
    ],
  };

  return (
    <div className="Itemmastersetup">
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
                <div className="Itemmaster mt-5">
                  <div className="ItemSetup-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">Item Master Setup</h5>
                      </div>
                      <div className="col-md-2">
                        <label>Select Main Group</label>
                      </div>
                      <div className="col-md-1">
                        <select  style={{marginTop:"5px",marginLeft:"-70px"}}>
                          <option value="">Select</option>
                          <option value="group1">Group 1</option>
                          <option value="group2">Group 2</option>
                        </select>
                      </div>
                      <div className="col-md-7 text-end">
                        <Link type="button" className="btn" to='/ViewItemMaster'>
                          View Item Master Setup
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <Tabs defaultActiveKey="general" className="mb-3">
                    {/* First Tab: General */}
                    <Tab eventKey="general" title="General">
                      <div className="tab-content">
                        <div className="form-container">
                          <div className="form-columns">
                            <div className="form-column">
                              {formFields.column1.map((field) => (
                                <div key={field.id} className="form-field">
                                  <input
                                    type="checkbox"
                                    id={`mandatory-${field.id}`}
                                  />
                                  <label htmlFor={`mandatory-${field.id}`}>
                                    Mandatory
                                  </label>
                                  <span className="field-label">
                                    {field.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="form-column">
                              {formFields.column2.map((field) => (
                                <div key={field.id} className="form-field">
                                  <input
                                    type="checkbox"
                                    id={`mandatory-${field.id}`}
                                  />
                                  <label htmlFor={`mandatory-${field.id}`}>
                                    Mandatory
                                  </label>
                                  <span className="field-label">
                                    {field.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="form-column">
                              {formFields.column3.map((field) => (
                                <div key={field.id} className="form-field">
                                  <input
                                    type="checkbox"
                                    id={`mandatory-${field.id}`}
                                  />
                                  <label htmlFor={`mandatory-${field.id}`}>
                                    Mandatory
                                  </label>
                                  <span className="field-label">
                                    {field.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    {/* Second Tab: General Part-2 */}
                    <Tab eventKey="general-part-2" title="General Part-2">
                      <div className="tab-content">
                        <div className="form-container">
                          <div className="form-row text-start">
                            <div className="form-group">
                              <div className="checkbox-group">
                                <input
                                  type="checkbox"
                                  id="specificGravityMandatory"
                                  name="specificGravityMandatory"
                                />
                                <label htmlFor="specificGravityMandatory">
                                  Mandatory
                                </label>
                              </div>
                              <label className="field-label">
                                Specific Gravity
                              </label>
                            </div>

                            <div className="form-group">
                              <div className="checkbox-group">
                                <input
                                  type="checkbox"
                                  id="finishMandatory"
                                  name="finishMandatory"
                                />
                                <label htmlFor="finishMandatory">
                                  Mandatory
                                </label>
                              </div>
                              <label className="field-label">Finish</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    {/* Third Tab: Data-2 */}
                    <Tab eventKey="data-2" title="Data-2">
                      <div className="tab-content">
                        <div className="form-container">
                          <div className="form-columns">
                            <div className="form-column">
                              {formFields.column4.map((field) => (
                                <div key={field.id} className="form-field">
                                  <div className="checkbox-group">
                                    <input
                                      type="checkbox"
                                      id={`${field.id}Mandatory`}
                                      name={`${field.id}Mandatory`}
                                    />
                                    <label htmlFor={`${field.id}Mandatory`}>
                                      Mandatory
                                    </label>
                                  </div>
                                  <label className="field-label">
                                    {field.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <div className="form-column">
                              {formFields.column5.map((field) => (
                                <div key={field.id} className="form-field">
                                  <div className="checkbox-group">
                                    <input
                                      type="checkbox"
                                      id={`${field.id}Mandatory`}
                                      name={`${field.id}Mandatory`}
                                    />
                                    <label htmlFor={`${field.id}Mandatory`}>
                                      Mandatory
                                    </label>
                                  </div>
                                  <label className="field-label">
                                    {field.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <div className="form-column">
                              {formFields.column6.map((field) => (
                                <div key={field.id} className="form-field">
                                  <div className="checkbox-group">
                                    <input
                                      type="checkbox"
                                      id={`${field.id}Mandatory`}
                                      name={`${field.id}Mandatory`}
                                    />
                                    <label htmlFor={`${field.id}Mandatory`}>
                                      Mandatory
                                    </label>
                                  </div>
                                  <label className="field-label">
                                    {field.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemmastersetup;
