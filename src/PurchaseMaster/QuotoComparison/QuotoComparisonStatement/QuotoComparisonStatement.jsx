import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./QuotoComparisonStatement.css";
import { addQuote, getQuotes, deleteQuote, updateQuote }  from "../../../Service/PurchaseApi.jsx";
import { toast, ToastContainer } from "react-toastify"; // For notifications
import { useNavigate } from "react-router-dom";

const QuotoComparisonStatement = () => {
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

  const [formData, setFormData] = useState({
    SelectRFQ: '',
    Item: '',
    Make: '',
    MinPurchQty: '',
    OtherCharges: '',
    PaymentTerms: '',
    Date: '',
    Supplier: '',
    UOM: '',
    TaxApplicable: '',
    RemarkDetails: '',
    SuppQuotNo: '',
    BasicRate: '',
    DeliveryMode: '',
    QuoteDate: '',
    Discount: '',
    DeliveryTime: '',
  });

  const [quotes, setQuotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await updateQuote(currentId, formData);
        toast.success('Quote updated successfully');
      } catch (error) {
        toast.error('Error updating quote');
      }
    } else {
      try {
        await addQuote(formData);
        toast.success('Quote added successfully');
      } catch (error) {
        toast.error('Error adding quote');
      }
    }
    fetchQuotes();
    setFormData({
      SelectRFQ: '',
      Item: '',
      Make: '',
      MinPurchQty: '',
      OtherCharges: '',
      PaymentTerms: '',
      Date: '',
      Supplier: '',
      UOM: '',
      TaxApplicable: '',
      RemarkDetails: '',
      SuppQuotNo: '',
      BasicRate: '',
      DeliveryMode: '',
      QuoteDate: '',
      Discount: '',
      DeliveryTime: '',
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const fetchQuotes = async () => {
    try {
      const data = await getQuotes();
      setQuotes(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Error fetching quotes');
    }
  };

  const handleEdit = (quote) => {
    setFormData(quote);
    setEditMode(true);
    setCurrentId(quote.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuote(id);
      toast.success('Quote deleted successfully');
      fetchQuotes();
    } catch (error) {
      toast.error('Error deleting quote');
    }
  };

  return (
    <div className="NewQuoteStatement">
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
              <div className="QuoteStatement-header  text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                        Quoto Comparision Statement
                      </h5>
                    </div>
                    <div className="col-md-8 text-end">
                     
                          <button onClick={()=>{navigate('/Quoto-Comparison-Statement-List')}} className="btn">
                            Quote Comp Statement List
                          </button>
                        
                    </div>
                  </div>
                </div>
                <div className="QuoteStatement-main mt-5">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-Item-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Item-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-Item-Details"
                        aria-selected="true"
                      >
                        Quotation Comparison
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-GST-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-GST-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-GST-Details"
                        aria-selected="false"
                      >
                        Terms and Condition
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-Item-Details"
                      role="tabpanel"
                      aria-labelledby="pills-Item-Details-tab"
                      tabindex="0"
                    >
                      <div className="QuoteStatementstatus">
                        <div className="container-fluid mt-4">
                          <form>
                            <div className="row text-start">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Select RFQ</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="SelectRFQ"
                                        value={formData.SelectRFQ}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Item</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="Item"
                                        value={formData.Item}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Make</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="Make"
                                        value={formData.Make}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Minimum Purchase Quantity</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="MinPurchQty"
                                        value={formData.MinPurchQty}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Other Charges</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="OtherCharges"
                                        value={formData.OtherCharges}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Payment Terms</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="PaymentTerms"
                                        value={formData.PaymentTerms}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Date</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        className="form-control"
                                        name="Date"
                                        value={formData.Date}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Supplier</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="Supplier"
                                        value={formData.Supplier}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>UOM</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="UOM"
                                        value={formData.UOM}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Tax Applicable</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="TaxApplicable"
                                        value={formData.TaxApplicable}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Remark Details</label>
                                    </div>
                                    <div className="col-md-8">
                                      <textarea
                                        className="form-control"
                                        name="RemarkDetails"
                                        value={formData.RemarkDetails}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Supplier Quote No.</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="SuppQuotNo"
                                        value={formData.SuppQuotNo}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Basic Rate</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="BasicRate"
                                        value={formData.BasicRate}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Delivery Mode</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="DeliveryMode"
                                        value={formData.DeliveryMode}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Quote Date</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        className="form-control"
                                        name="QuoteDate"
                                        value={formData.QuoteDate}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Discount</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="Discount"
                                        value={formData.Discount}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label>Delivery Time</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="DeliveryTime"
                                        value={formData.DeliveryTime}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="row text-start">
                                    <div className="col-md-12 text-end">
                                      <button
                                        type="submit"
                                        className="btn"
                                        onClick={handleSubmit}
                                      >
                                        Add
                                      </button>
                                    </div>
                                    
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="Purchaseordertable">
                          <div className="container-fluid mt-4">
                            <div className="table-responsive">
                            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Select RFQ</th>
                  <th>Item</th>
                  <th>Make</th>
                  <th>Min Purch Qty</th>
                  <th>Other Charges</th>
                  <th>Payment Terms</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>UOM</th>
                  <th>Tax Applicable</th>
                  <th>Remark Details</th>
                  <th>Supp Quot No.</th>
                  <th>Basic Rate</th>
                  <th>Delivery Mode</th>
                  <th>Quote Date</th>
                  <th>Discount</th>
                  <th>Delivery Time</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.SelectRFQ}</td>
                    <td>{quote.Item}</td>
                    <td>{quote.Make}</td>
                    <td>{quote.MinPurchQty}</td>
                    <td>{quote.OtherCharges}</td>
                    <td>{quote.PaymentTerms}</td>
                    <td>{quote.Date}</td>
                    <td>{quote.Supplier}</td>
                    <td>{quote.UOM}</td>
                    <td>{quote.TaxApplicable}</td>
                    <td>{quote.RemarkDetails}</td>
                    <td>{quote.SuppQuotNo}</td>
                    <td>{quote.BasicRate}</td>
                    <td>{quote.DeliveryMode}</td>
                    <td>{quote.QuoteDate}</td>
                    <td>{quote.Discount}</td>
                    <td>{quote.DeliveryTime}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEdit(quote)}
                      >
                        <FaEdit/>
                      </button>
                      </td>
                      <td>
                      <button
                        className="btn  btn-sm"
                        onClick={() => handleDelete(quote.id)}
                      >
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-GST-Details"
                      role="tabpanel"
                      aria-labelledby="pills-GST-Details-tab"
                      tabindex="0"
                    >
                      <div className="QuoteStatementstatus1">
                        <div className="container-fluid mt-4">
                          <div className="row align-items-start">
                            <div className="col-md-2 d-flex align-items-start">
                              <label
                                htmlFor="costCenterCodeCheck"
                                className="form-label mb-0"
                              >
                                Term Name:
                              </label>
                            </div>
                            <div className="col-md-3 d-flex align-items-start">
                              <input
                                type="text"
                                id="costCenterCodeInput"
                                className="form-control"
                                placeholder="Enter Cost Center Code"
                              />
                            </div>
                            <div className="col-md-4 d-flex justify-content-start align-items-start">
                              <button className="btn">Search</button>
                            </div>
                          </div>
                        </div>

                        <div className="Purchaseordertable">
                          <div className="container-fluid mt-4">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>

                                    <th>Term Name</th>
                                    <th>Term Desc</th>
                                    <th>edit</th>
                                    <th>delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>{/* Data rows will go here */}</tr>
                                </tbody>
                              </table>
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
};

export default QuotoComparisonStatement;
