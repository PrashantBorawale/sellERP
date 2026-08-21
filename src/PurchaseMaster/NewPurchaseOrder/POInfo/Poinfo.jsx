import React, { useState, useEffect } from "react";
import "./Poinfo.css";
import { FaPlus, FaSync, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchNextCode } from "../../../Service/PurchaseApi";

const Poinfo = ({ updateFormData, paymentTermsFromSupplier ,poInfoData = {}, isEditMode = false}) => {
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsFromSupplier || "");
  const [currentTime, setCurrentTime] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("select");
  const [PoNo, setPoNo] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    field: "",
    PoNo: "",
    EnquiryNo: "",
    QuotNo: "",
    PaymentTerms: "",
    DeliveryDate: "",
    AMC_PO: "",
    ModeOfShipment: "",
    PreparedBy: "",
    PoNote: "",
    PoSpecification: "",
    PoDate: "",
    EnquiryDate: "",
    QuotDate: "",
    PaymentRemark: "",
    DeliveryType: "",
    DeliveryNote: "",
    IndentNo: "",
    ApprovedBy: "",
    InspectionTerms: "",
    PF_Charges: "",
    Time: "",
    PoFor: "",
    Freight: "",
    PoRateType: "",
    ContactPerson: "",
    PoValidityDate: "",
    PoEffectiveDate: "",
    TransportName: "",
    PoValidity_WarrantyTerm: "",
    GstTaxes: "",
  });

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Load existing PO info data when in edit mode
  useEffect(() => {
    if (isEditMode && poInfoData) {
      const timeVal = poInfoData.Time || getCurrentTime();
      setFormData({
        field: poInfoData.field || "",
        PoNo: poInfoData.PoNo || "",
        EnquiryNo: poInfoData.EnquiryNo || "",
        QuotNo: poInfoData.QuotNo || "",
        PaymentTerms: poInfoData.PaymentTerms || "",
        DeliveryDate: poInfoData.DeliveryDate || "",
        AMC_PO: poInfoData.AMC_PO || "",
        ModeOfShipment: poInfoData.ModeOfShipment || "",
        PreparedBy: poInfoData.PreparedBy || "",
        PoNote: poInfoData.PoNote || "",
        PoSpecification: poInfoData.PoSpecification || "",
        PoDate: poInfoData.PoDate || "",
        EnquiryDate: poInfoData.EnquiryDate || "",
        QuotDate: poInfoData.QuotDate || "",
        PaymentRemark: poInfoData.PaymentRemark || "",
        DeliveryType: poInfoData.DeliveryType || "",
        DeliveryNote: poInfoData.DeliveryNote || "",
        IndentNo: poInfoData.IndentNo || "",
        ApprovedBy: poInfoData.ApprovedBy || "",
        InspectionTerms: poInfoData.InspectionTerms || "",
        PF_Charges: poInfoData.PF_Charges || "",
        Time: timeVal,
        PoFor: poInfoData.PoFor || "",
        Freight: poInfoData.Freight || "",
        PoRateType: poInfoData.PoRateType || "",
        ContactPerson: poInfoData.ContactPerson || "",
        PoValidityDate: poInfoData.PoValidityDate || "",
        PoEffectiveDate: poInfoData.PoEffectiveDate || "",
        TransportName: poInfoData.TransportName || "",
        PoValidity_WarrantyTerm: poInfoData.PoValidity_WarrantyTerm || "",
        GstTaxes: poInfoData.GstTaxes || "",
      });

      setSelectedSeries(poInfoData.Series || "select");
      setPoNo(poInfoData.PoNo || "");
      setPaymentTerms(poInfoData.PaymentTerms || "");
    }
  }, [isEditMode, poInfoData]);

  useEffect(() => {
    if (!isEditMode) {
      const time = getCurrentTime();
      setCurrentTime(time);
      setFormData((prev) => ({
        ...prev,
        Time: prev.Time || time,
      }));
      updateFormData("Time", time);
    }
  }, [isEditMode, updateFormData]);

  const handleAddClick = () => {
    setShowCard(true);
  };

  const handleRefreshClick = () => {
    console.log("Data refreshed");
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  useEffect(() => {
    setPaymentTerms(paymentTermsFromSupplier);
  }, [paymentTermsFromSupplier]);


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update local state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    // Update only if the field is payment terms
    if (name === "paymentTerms") {
      setPaymentTerms(value);
    }
  
    // Update parent state
    updateFormData(name, value);
  };
  
  const handleSeriesChange = async (e) => {
    const seriesValue = e.target.value;
    setSelectedSeries(seriesValue);
    setFormData((prevState) => ({
      ...prevState,
      field: seriesValue,
    }));
    updateFormData("field", seriesValue);

    if (seriesValue === "select") {
      setPoNo("");
      setFormData((prevState) => ({
        ...prevState,
        PoNo: "",
      }));
      updateFormData("PoNo", "");
      return;
    }

    setLoading(true);
    try {
      const year = localStorage.getItem("Shortyear");
      const response = await fetchNextCode(seriesValue, year);
      const nextCode = response?.next_code || "";
      setPoNo(nextCode);
      setFormData((prevState) => ({
        ...prevState,
        PoNo: nextCode,
      }));
      updateFormData("PoNo", nextCode);
    } catch (error) {
      console.error("Error fetching PO number:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const time = getCurrentTime();
    setFormData({
      field: "",
      PoNo: "",
      EnquiryNo: "",
      QuotNo: "",
      PaymentTerms: "",
      DeliveryDate: "",
      AMC_PO: "",
      ModeOfShipment: "",
      PreparedBy: "",
      PoNote: "",
      PoSpecification: "",
      PoDate: "",
      EnquiryDate: "",
      QuotDate: "",
      PaymentRemark: "",
      DeliveryType: "",
      DeliveryNote: "",
      IndentNo: "",
      ApprovedBy: "",
      InspectionTerms: "",
      PF_Charges: "",
      Time: time,
      PoFor: "",
      Freight: "",
      PoRateType: "",
      ContactPerson: "",
      PoValidityDate: "",
      PoEffectiveDate: "",
      TransportName: "",
      PoValidity_WarrantyTerm: "",
      GstTaxes: "",
    });
    updateFormData("Time", time);
    setErrors({});
    setErrors({});
    setSelectedSeries("select");
    setPoNo("");
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4 p-3" style={{ borderRadius: '12px' }}>
        <h6 className="mb-3 fw-bold text-secondary">PO Information</h6>
        <div className="container-fluid px-0">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="row text-start">
                  <div className="col-md-3">
                    <div className="form-group mb-3">
                      <label htmlFor="PoNo">PO No:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group mb-3">
<select
                        className="form-select form-select-sm"
                        value={selectedSeries}
                        onChange={handleSeriesChange}
                      >
                        <option value="select">Select</option>
                        <option value="RM">RM</option>
                        <option value="CONSUMABLE">CONSUMABLE</option>
                        <option value="ASSET">ASSET</option>
                        <option value="SERVICE">SERVICE</option>
                      </select>
                      {errors.field && <p className="error text-danger small mb-0">{errors.field}</p>}
                    
                  
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
{selectedSeries !== "select" && PoNo && (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={loading ? "Loading..." : PoNo}
                          readOnly
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              PoNo: e.target.value,
                            }));
                            updateFormData("PoNo", e.target.value);
                          }}
                        />
                      )}
                      {errors.PoNo && <p className="error text-danger small mb-0">{errors.PoNo}</p>}
                    
                  
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="EnquiryNo">Enquiry No:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="EnquiryNo"
                        name="EnquiryNo"
                        className="form-control"
                        placeholder="Enter Enquiry Number"
                        value={formData.EnquiryNo}
                        onChange={handleChange}
                      />
                      {errors.EnquiryNo && (
                        <p className="error">{errors.EnquiryNo}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="PaymentTerms">Payment Terms:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="PaymentTerms"
                        name="PaymentTerms"
                        className="form-control"
                        placeholder="Enter Payment Terms"
                        value={paymentTerms}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="DeliveryDate">Delivery Date:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="date"
                        id="DeliveryDate"
                        name="DeliveryDate"
                        className="form-control"
                        value={formData.DeliveryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="AMC_PO">AMC PO:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="AMC_PO"
                        name="AMC_PO"
                        className="form-control"
                        placeholder="Enter AMC PO"
                        value={formData.AMC_PO}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="ModeOfShipment">Mode of Shipment:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="ModeOfShipment"
                        name="ModeOfShipment"
                        className="form-control"
                        placeholder="Enter Mode of Shipment"
                        value={formData.ModeOfShipment}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="PreparedBy">Prepared by:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="PreparedBy"
                        name="PreparedBy"
                        className="form-control"
                        placeholder="Enter Prepared by"
                        value={formData.PreparedBy}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="PoDate">PO Date:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="Date"
                        name="PoDate"
                        className="form-control"
                        id="PoDate"
                        value={formData.PoDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="EnquiryDate">Enquiry Date:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="date"
                        id="EnquiryDate"
                        name="EnquiryDate"
                        className="form-control"
                        placeholder="Select Enquiry Date"
                        value={formData.EnquiryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="QuotDate">Quot Date:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="date"
                        id="QuotDate"
                        name="QuotDate"
                        className="form-control"
                        placeholder="Select Quot Date"
                        value={formData.QuotDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="ApprovedBy">Approved by:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="ApprovedBy"
                        name="ApprovedBy"
                        className="form-control"
                        placeholder="Enter Approved by"
                        value={formData.ApprovedBy}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="Time">Time:</label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="time"
                        id="Time"
                        name="Time"
                        className="form-control"
                        value={formData.Time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label
                        className="form-check-label"
                        htmlFor="PoEffectiveDate"
                      >
                        PO Effective Date:
                      </label>
                      <span className="text-danger">*</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="date"
                        id="PoEffectiveDate"
                        name="PoEffectiveDate"
                        className="form-control"
                        placeholder="Select PO Effective Date"
                        value={formData.PoEffectiveDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row text-start">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label
                        className="form-check-label"
                        htmlFor="TransportName"
                      >
                        Transport Name:
                      </label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        id="TransportName"
                        name="TransportName"
                        className="form-control"
                        placeholder="Enter Transport Name"
                        value={formData.TransportName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4 mb-3">
                <label htmlFor="PoNote" className="form-label">
                  PO Note
                </label>
                <textarea
                  id="PoNote"
                  className="form-control"
                  name="PoNote"
                  rows="3"
                  placeholder="Enter PO Note"
                  value={formData.PoNote}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="InspectionTerms" className="form-label">
                  Inspection Terms
                </label>
                <textarea
                  id="InspectionTerms"
                  className="form-control"
                  name="InspectionTerms"
                  rows="3"
                  placeholder="Enter Inspection Terms"
                  value={formData.InspectionTerms}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="PoValidity_WarrantyTerm" className="form-label">
                  PO Validity/Warranty Terms
                </label>
                <textarea
                  id="PoValidity_WarrantyTerm"
                  className="form-control"
                  rows="3"
                  name="PoValidity_WarrantyTerm"
                  placeholder="Enter PO Validity"
                  value={formData.PoValidity_WarrantyTerm}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-6 mb-3">
                <label htmlFor="PoSpecification" className="form-label">
                  PO Specification/Schedule/Documents Required/Transit Insurance
                </label>
                <textarea
                  id="PoSpecification"
                  className="form-control"
                  rows="3"
                  name="PoSpecification"
                  placeholder="Enter Specification/Schedule/Documents Required/Transit Insurance"
                  value={formData.PoSpecification}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="PF_Charges" className="form-label">
                  P&F Changes Note
                </label>
                <textarea
                  id="PF_Charges"
                  className="form-control"
                  name="PF_Charges"
                  rows="3"
                  placeholder="Enter P&F Changes Note"
                  value={formData.PF_Charges}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="GstTaxes" className="form-label">
                  GST (Taxes) Note/Other Charges
                </label>
                <textarea
                  id="GstTaxes"
                  className="form-control"
                  name="GstTaxes"
                  rows="3"
                  placeholder="Enter GST Note/Other Charges"
                  value={formData.GstTaxes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row text-end mt-3 mb-2">
              <div className="col-md-12">
                <button type="button" className="vndrbtn bg-secondary border-secondary" onClick={handleClear}>
                  Cancel
                </button>
              </div>
            </div>
            {showCard && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <h5 className="modal-title text-primary">
                            Freight Master
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="freightName">
                            Enter Freight Name:
                          </label>
                          <input
                            type="text"
                            id="freightName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <button type="button" className="btn mt-4">
                            Save
                          </button>
                        </div>
                      </div>
                      <table className="table mt-4">
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Freight Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Example Freight</td>
                            <td>
                              <button className="btn">
                                <FaEdit />
                              </button>
                            </td>
                            <td>
                              <button className="btn">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleCloseCard}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Poinfo;
