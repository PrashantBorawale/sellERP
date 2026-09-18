import React, { useState, useEffect } from "react";
import {
  fetchPaymentTerms,
  addPaymentTerm,
  updatePaymentTerm,
  deletePaymentTerm,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const ToggleCardPayment1 = () => {
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [days, setDays] = useState("");
  const [editingTerm, setEditingTerm] = useState(null);
  const [editDays, setEditDays] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // Number of records per page

  useEffect(() => {
    const getPaymentTerms = async () => {
      try {
        const data = await fetchPaymentTerms();
        setPaymentTerms(data);
      } catch (error) {
        toast.error("Failed to fetch payment terms");
      }
    };

    getPaymentTerms();
  }, []);

  const handleAddPaymentTerm = async () => {
    if (!days.trim() || isNaN(days) || parseInt(days) <= 0) {
      toast.error("Days must be a positive integer");
      return;
    }
  
    try {
      const newTerm = await addPaymentTerm(parseInt(days));
      setPaymentTerms([
        ...paymentTerms,
        { id: newTerm.id, Days: newTerm.Days },
      ]);
      setDays("");
      toast.success("Payment term added successfully");
    } catch (error) {
      console.error("Error adding payment term:", error); // Log the error for debugging
      toast.error("Failed to add payment term");
    }
  };

  const handleEditPaymentTerm = (id, days) => {
    setEditingTerm(id);
    setEditDays(days);
  };

  const handleSaveEdit = async () => {
    if (!editDays.trim() || isNaN(editDays) || parseInt(editDays) <= 0) {
      toast.error("Days must be a positive integer");
      return;
    }
  
    try {
      await updatePaymentTerm(editingTerm, parseInt(editDays));
      setPaymentTerms(
        paymentTerms.map((pt) =>
          pt.id === editingTerm ? { ...pt, Days: parseInt(editDays) } : pt
        )
      );
      setEditingTerm(null);
      setEditDays("");
      toast.success("Payment term updated successfully");
    } catch (error) {
      console.error("Error updating payment term:", error); // Log error details
      toast.error("Failed to update payment term");
    }
  };
  

  const handleDeletePaymentTerm = async (id) => {
    try {
      await deletePaymentTerm(id);
      setPaymentTerms(paymentTerms.filter((pt) => pt.id !== id));
      toast.success("Payment term deleted successfully");
    } catch (error) {
      toast.error("Failed to delete payment term");
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = paymentTerms.slice(indexOfFirstRecord, indexOfLastRecord);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(paymentTerms.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="card-Payment1">
    <div className="container">
     
      <div className="card-body card-scrollable">

      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="days" className="form-label">
                Days:
              </label>
              <input
                type="text"
                className="form-control"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                onKeyPress={(e) => {
                  // Allow only numeric input
                  if (!/^[0-9]*$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn mt-4" onClick={handleAddPaymentTerm}>
              Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <div
      className="table-responsive"
      style={{
        maxHeight: "400px", // Set a fixed height for vertical scrolling
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
            <table className="table table-responsive" >
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Days</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((pt, index) => (
                  <tr key={pt.id}>
                    <td>{indexOfFirstRecord + index + 1}</td>
                    <td>
                      {editingTerm === pt.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editDays}
                          onChange={(e) => setEditDays(e.target.value)}
                          onKeyPress={(e) => {
                            // Allow only numeric input
                            if (!/^[0-9]*$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      ) : (
                        pt.Days
                      )}
                    </td>
                    <td>
                      {editingTerm === pt.id ? (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={() =>
                            handleEditPaymentTerm(pt.id, pt.Days)
                          }
                        >
                          <FaEdit />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="card11"
                        onClick={() => handleDeletePaymentTerm(pt.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* Pagination Controls */}
            <nav className="text-end">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${currentPage === number ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ToggleCardPayment1;
